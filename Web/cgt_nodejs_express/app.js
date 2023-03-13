const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoEnv = (process.env.NODE_ENV === 'dev') ? '54.204.248.179' : 'localhost';
const uri = `mongodb://${mongoEnv}:27017/caregiver_tracker`;
const client = new MongoClient(uri);
app.use(cors())
.use(bodyParser.json());
const privateKey = fs.readFileSync('./private.key');

app.get('/', (req, res) => {
    res.send('Caregiver Tracker Express server running!')
})

app.post('/add-users', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = db.collection("cgt_users");
        const hashedPasswords = await bcrypt.hash(req.body.password, 10);
        const signUpUser = await collection.insertOne({
            user_email: req.body.email,
            user_fullname: req.body.fullname,
            user_password: hashedPasswords,
            user_signup_time: moment().format('DD/MM/YYYY HH:mm:ss')
        });
        if(signUpUser.acknowledged){
            const jwToken = jwt.sign({}, privateKey, {
                algorithm: 'RS256', 
                allowInsecureKeySizes: true,
                expiresIn: 3600,
                subject: req.body.email,
            });
            res.status(200).json({
                'access_token': jwToken,
                'message': 'User created successfully!'
            });
        } else {
            res.status(404).send('Unable to add user. Please try again!');
        }
    } catch (err) {
        console.log(err);
    }
});

app.post('/login-user', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = db.collection("cgt_users");
        const userPassword = await collection.findOne( { user_email: req.body.email });
        const verifyPassword = await bcrypt.compare(req.body.password, userPassword.user_password);
        if(verifyPassword){
            const jwToken = jwt.sign({}, privateKey, {
                algorithm: 'RS256', 
                allowInsecureKeySizes: true,
                expiresIn: 3600,
                subject: req.body.email,
            });
            res.status(200).json({
                'access_token': jwToken,
                'message': 'User signed in successfully!'
            });
        } else {
            res.status(404).send('Incorrect password!');
        }
    }catch (err) {
        console.log(err);
    }
});

app.get('/is-first-login', async (req, res) => {
try {
    await client.connect();
    const db = client.db("caregiver_tracker");
    const collection = await db.collection("cgt_roles");
    const firstLogin = await collection.findOne( { care_giver: req.query.email });
    if(firstLogin && Object.keys(firstLogin).length > 0) {
        res.send(false);
    } else {
        res.send(true);
    }
} catch (err) {
    console.log(err);
}
});

app.post('/add-role', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = db.collection("cgt_roles");
        const addRole = await collection.insertOne({
            care_giver: req.body.care_giver,
            care_taken_of: req.body.care_taken_of,
            care_taken_name: req.body.care_taken_name,
            care_taken_dob: req.body.care_taken_dob,
            care_taken_gender: req.body.care_taken_gender,
            care_taken_added_time: moment().format('DD/MM/YYYY HH:mm:ss'),
            care_last_accessed: true,
        });
        if(addRole.acknowledged){
            res.status(200).json({ message: `Care can now be provided to ${req.body.care_taken_name}`});
        } else {
            res.status(404).json({ message: 'Unable to add details. Please try later!' });
        }
    } catch (err) {
        console.log(err);
    }
});

app.get('/get-role-details', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = db.collection("cgt_roles");
        const getRoleDetails = await collection.findOne( { care_giver: req.query.giver_email, care_last_accessed: true });
        if(getRoleDetails && Object.keys(getRoleDetails).length > 0){
            res.status(200).json(getRoleDetails);
        } else {
            res.status(404).json({ message: 'No matching records found' });
        }
    } catch (err) {
        console.log(err);
    }
});

app.post('/save-tracking-feed', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = db.collection("cgt_feeding");
        let addTrackedFeed;
        let feedEndTime = moment().format('DD/MM/YYYY HH:mm:ss');
        let feedStartTime = moment(feedEndTime, 'DD/MM/YYYY HH:mm:ss').subtract(req.body.feedTime, 'seconds').format('DD/MM/YYYY HH:mm:ss');
        let insertQuery = {
            feed_giver: req.body.feedGiver,
            feed_taker_name: req.body.feedTaker.name,
            feed_taker_id: req.body.feedTaker.id,
            feed_taken_type: req.body.feedType,
            feed_taken_mode: req.body.feedMode,
            feed_taken_side: req.body.feedSide,
            feed_taken_time: req.body.feedTime,
            feed_quantity: req.body.feedQuantity,
            feed_start_time: feedStartTime,
            feed_end_time: feedEndTime,
            is_pumped_feed: false,
            is_feed_given: true,
        };
        if(req.body.feedType === 'Breast Milk' && req.body.feedMode === 'Pumped Milk'){
            insertQuery.is_pumped_feed = true;
            addTrackedFeed = await collection.updateOne({ _id: ObjectId(req.body.pumpedFeedId) }, { "$set": insertQuery }); 
        } else {
            addTrackedFeed = await collection.insertOne(insertQuery);
        }
        if(addTrackedFeed.acknowledged){
            res.status(200).json({ message: `Feed of type ${req.body.feedType} given to ${req.body.feedTaker.name} added!` });
        } else {             
            res.status(404).json({ message:  'Unable to add tracked feed. Please try later!' });
        }
    } catch (err) {
        console.log(err);
    }
});


app.post('/save-pumping-feed', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = db.collection("cgt_feeding");
        let feedEndTime = moment().format('DD/MM/YYYY HH:mm:ss');
        let feedStartTime = moment(feedEndTime, 'DD/MM/YYYY HH:mm:ss').subtract(req.body.feedTime, 'seconds').format('DD/MM/YYYY HH:mm:ss');
        let insertQuery = {
            pumped_by: req.body.feedGiver,
            pumped_for_name: req.body.feedTaker.name,
            pumped_for_id: req.body.feedTaker.id,
            pumped_mode: req.body.feedMode,
            pumped_side: req.body.feedSide,
            pumped_time: req.body.feedTime,
            pumped_quantity: req.body.feedQuantity,
            pump_start_time: feedStartTime,
            pump_end_time: feedEndTime,
            is_pumped_feed: true,
            is_feed_given: false,
        };
        const addPumpedFeed = await collection.insertOne(insertQuery);
        if(addPumpedFeed.acknowledged){
            res.status(200).json({ message: `Pumping for ${req.body.feedTaker.name} completed!` });
        } else {
            res.status(404).json({ message: 'Unable to add tracked pumping. Please try later!' });
        }
    } catch (err) {
        console.log(err);
    }
});

app.get('/get-feed-details', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = db.collection("cgt_feeding");
        const getFeedDetails = await collection.find( { $or: [{ $and: [ { feed_giver: req.query.feed_giver, feed_taker_id: req.query.feed_taker } ] }, { $and: [ { pumped_by: req.query.feed_giver, pumped_for_id: req.query.feed_taker } ] } ]}).limit(10).sort({ _id: -1 }).toArray();
        if(getFeedDetails && getFeedDetails.length > 0){
            res.status(200).json(getFeedDetails);
        } else {
            res.status(404).json({ message: 'No matching feeds found' });
        }
    } catch (err) {
        console.log(err);
    }
});

app.get('/get-pumped-feeds', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = db.collection("cgt_feeding");
        const getPumpedFeed = await collection.find( { pumped_by: req.query.feed_giver, pumped_for_id: req.query.feed_taker, is_pumped_feed: true, is_feed_given: false }).sort({ _id: -1 }).toArray();
        if(getPumpedFeed && getPumpedFeed.length > 0){
            res.status(200).json(getPumpedFeed);
        } else {
            res.status(404).json({ message: 'No matching pumped feeds found' });
        }
    } catch (err) {
        console.log(err);
    }
});

app.delete('/delete-feed/:feedId', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = db.collection("cgt_feeding");
        const deleteFeed = await collection.deleteOne( { "_id": ObjectId(req.params.feedId) } );
        if(deleteFeed.acknowledged && deleteFeed.deletedCount === 1){
            res.status(200).json({ message: 'Feed deleted successfully'} );
        } else {
            res.status(404).json({ message: 'Unable to delete feed. Please try again later!' });
        }
    } catch (err) {
        console.log(err);
    }
});

app.get('/get-feed-for-id/:feedId', async(req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = await db.collection("cgt_feeding");
        const getFeedForId = await collection.findOne({ "_id": ObjectId(req.params.feedId)});
        if(getFeedForId && Object.keys(getFeedForId).length > 0) {
            res.status(200).json(getFeedForId);
        } else {
            res.status(404).json({ message: 'Unable to get feed. Please try again later!' });
        }
    } catch(err) {
        console.log(err);
    }
});

app.post('/save-edited-feed', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = await db.collection("cgt_feeding");
        const feedTimeTaken = moment(req.body.feedEnd, "DD/MM/YYYY HH:mm:ss").diff(moment(req.body.feedStart, "DD/MM/YYYY HH:mm:ss"), 'seconds');
        const updateQuery = {
            feed_quantity: req.body.feedQuantity,
            feed_start_time: req.body.feedStart,
            feed_end_time: req.body.feedEnd,
            feed_taken_time: feedTimeTaken
        }
        const saveEditedFeed = await collection.updateOne({ _id: ObjectId(req.body.feedId) }, { "$set": updateQuery }); 
        if(saveEditedFeed.acknowledged){
            res.status(200).json({ message: `Feed edited!` });
        } else {             
            res.status(404).json({ message:  'Unable to edit feed. Please try later!' });
        }
    } catch(err) {
        console.log(err);
    }
});

app.post('/save-tracked-excretion', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = await db.collection("cgt_excretion");
        let excTime = moment().format('DD/MM/YYYY HH:mm:ss');
        const insertQuery = {
            care_giver: req.body.careGiver,
            care_taken_of_name: req.body.careTakenOf.name,
            care_taken_of_id: req.body.careTakenOf.id,
            excretion_type: req.body.excretionType,
            napkin_type: req.body.napkinType,
            diaper_count: req.body.diaperCount,
            diaper_brand: req.body.diaperBrand,
            excretion_time: excTime
        }
        const saveTrackedExc = await collection.insertOne(insertQuery);
        if(saveTrackedExc.acknowledged){
            res.status(200).json({ message: `Excretion of ${req.body.careTakenOf.name} noted!` });
        } else {
            res.status(404).json({ message: 'Unable to add tracked excretion. Please try later!' });
        }
    } catch(err) {
        console.log(err);
    }
});

app.get('/get-excretion-details', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = db.collection("cgt_excretion");
        const getTrackedExcretion = await collection.find( { care_giver: req.query.careGiver, care_taken_of_id: req.query.careTakenId }).sort({ _id: -1 }).toArray();
        if(getTrackedExcretion && getTrackedExcretion.length > 0){
            res.status(200).json(getTrackedExcretion);
        } else {
            res.status(404).json({ message: 'No tracked excretions found' });
        }
    } catch (err) {
        console.log(err);
    }
});

app.delete('/delete-exc/:excId', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = db.collection("cgt_excretion");
        const deleteExc = await collection.deleteOne( { "_id": ObjectId(req.params.excId) } );
        if(deleteExc.acknowledged && deleteExc.deletedCount === 1){
            res.status(200).json({ message: 'Tracked excretion deleted successfully'} );
        } else {
            res.status(404).json({ message: 'Unable to delete tracked excretion. Please try again later!' });
        }
    } catch (err) {
        console.log(err);
    }
});

app.get('/get-exc-for-id/:excId', async(req, res) => {
    try {
        await client.connect();
        const db = client.db("caregiver_tracker");
        const collection = await db.collection("cgt_excretion");
        const getExcForId = await collection.findOne({ "_id": ObjectId(req.params.excId)});
        if(getExcForId && Object.keys(getExcForId).length > 0) {
            res.status(200).json(getExcForId);
        } else {
            res.status(404).json({ message: 'Unable to get tracked excretion. Please try again later!' });
        }
    } catch(err) {
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log(`Caregiver tracker listening on port 3000!`);
});