const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/caregiver_tracker';
const client = new MongoClient(uri);
app.use(cors())
.use(bodyParser.json());
const privateKey = fs.readFileSync('./private.key');

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
        let feedEndTime = moment().format('DD/MM/YYYY HH:mm:ss');
        let feedStartTime = moment(feedEndTime, 'DD/MM/YYYY HH:mm:ss').subtract(req.body.feedTime, 'seconds').format('DD/MM/YYYY HH:mm:ss');
        const addTrackedFeed = await collection.insertOne({
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
        });
        if(addTrackedFeed.acknowledged){
            res.status(200).json({ message: `Feed of type ${req.body.feedType} given to ${req.body.feedTaker.name} added!`});
        } else {
            res.status(404).json({ message: 'Unable to add feed. Please try later!' });
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
        const getFeedDetails = await collection.find( { feed_giver: req.query.feed_giver, feed_taker_id: req.query.feed_taker }).limit(10).sort({ _id: -1 }).toArray();
        if(getFeedDetails && getFeedDetails.length > 0){
            res.status(200).json(getFeedDetails);
        } else {
            res.status(404).json({ message: 'No matching records found' });
        }
    } catch (err) {
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log(`Caregiver tracker listening on port 3000!`);
});