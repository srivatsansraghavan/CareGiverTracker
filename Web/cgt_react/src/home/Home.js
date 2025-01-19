import homestyle from "./Home.module.css";
import Modal from "../shared/Modal";
import { useState, useEffect } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Tabs,
  Tab,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import FeedingTracker from "./FeedingTracker/FeedingTracker";
import ExcretionTracker from "./ExcretionTracker/ExcretionTracker";
import MedicationTracker from "./MedicationTracker/MedicationTracker";
import InventoryTracker from "./InventoryTracker/InventoryTracker";
import { useSelector, useDispatch } from "react-redux";
import {
  getCareTaken,
  addCareTaken,
  changeCareTaken,
} from "../store/care-taken-actions";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function Home() {
  const emailParam = useParams();
  const loggedInUser = emailParam.userId;
  // const loggedInEmail = localStorage.getItem("logged_in_email");
  const loaderData = useLoaderData();
  const isFirstLogin = loaderData.firstLogin;
  let careTakenDetail = {};
  if (!isFirstLogin) {
    careTakenDetail = {
      care_giver: loaderData.care_giver,
      care_taken_id: loaderData.id,
      care_taken_name: loaderData.name,
      care_taken_type: loaderData.type,
      care_taken_dob: loaderData.dob,
      care_taken_gender: loaderData.gender,
    };
  }
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [showFirstLoginModal, setShowFirstLoginModal] = useState(
    isFirstLogin ? true : false
  );
  const [firstLoginCareTakenName, setFirstLoginCareTakenName] = useState("");
  const [firstLoginCareTakenType, setFirstLoginCareTakenType] = useState("");
  const [firstLoginCareTakenDOB, setFirstLoginCareTakenDOB] = useState("");
  const [firstLoginCareTakenGender, setFirstLoginCareTakenGender] =
    useState("");
  const [isFLFormNotValid, setIsFLFormNotValid] = useState(true);
  const [careTakenDetails, setCareTakenDetails] = useState([]);
  const [showAddCareTakenModal, setShowAddCareTakenModal] = useState(false);
  const [addCareTakenName, setAddCareTakenName] = useState("");
  const [addCareTakenType, setAddCareTakenType] = useState("");
  const [addCareTakenDOB, setAddCareTakenDOB] = useState("");
  const [addCareTakenGender, setAddCareTakenGender] = useState("");
  const [isAddFormNotValid, setIsAddFormNotValid] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCareTaken(loggedInUser));
  }, [dispatch, loggedInUser]);
  const careTakenPersonDetail = useSelector((state) => state.caretakenperson);
  const careTakenPerson =
    careTakenPersonDetail.id !== "" ? careTakenPersonDetail : careTakenDetail;
  useEffect(() => {
    axiosClient
      .get(`/caretaken/get-care-taken-details?care_giver=${loggedInUser}`)
      .then((response) => {
        if (response.status === 200) {
          setCareTakenDetails(response.data);
        }
      });
  }, [loggedInUser, careTakenPerson]);

  const tabChange = (event, newValue) => {
    setValue(newValue);
  };
  const TabPanel = ({ value, index, children }) => {
    return <div> {value === index && <Container>{children}</Container>}</div>;
  };

  const firstLoginLater = () => {
    setShowFirstLoginModal(false);
    navigate("/logout");
  };

  const firstLoginFormFields = [
    {
      fieldLabel: "Care Taken Name",
      fieldType: "text",
      fieldId: "careTakenName",
      fieldName: "careTakenName",
      fieldState: firstLoginCareTakenName,
      fieldSetState: (value) => {
        setFirstLoginCareTakenName(value);
      },
    },
    {
      fieldLabel: "Care Taken Type",
      fieldType: "dropdown",
      fieldId: "careTakenType",
      fieldName: "careTakenType",
      fieldItems: [
        { value: "child", text: "Child" },
        { value: "infant", text: "Infant" },
        { value: "toddler", text: "Toddler" },
        { value: "spouse", text: "Spouse" },
      ],
      fieldState: firstLoginCareTakenType,
      fieldSetState: (value) => {
        setFirstLoginCareTakenType(value);
      },
    },
    {
      fieldLabel: "Care taken Date of birth",
      fieldType: "date",
      fieldId: "careTakenDOB",
      fieldName: "careTakenDOB",
      fieldState: firstLoginCareTakenDOB,
      fieldSetState: (value) => {
        setFirstLoginCareTakenDOB(value);
      },
    },
    {
      fieldLabel: "Care taken Gender",
      fieldType: "dropdown",
      fieldId: "careTakenGender",
      fieldName: "careTakenGender",
      fieldItems: [
        { value: "female", text: "Female" },
        { value: "male", text: "Male" },
        { value: "transgender", text: "Transgender" },
      ],
      fieldState: firstLoginCareTakenGender,
      fieldSetState: (value) => {
        setFirstLoginCareTakenGender(value);
      },
    },
  ];

  const firstLoginFormButtons = [
    {
      type: "submit",
      text: "Save",
      buttonId: "firstLoginSubmit",
      isNotValid: isFLFormNotValid,
    },
    {
      type: "button",
      text: "Later",
      onClick: firstLoginLater,
      buttonId: "signUpClose",
      isNotValid: false,
    },
  ];

  const closeAddCareTakenModal = () => {
    setShowAddCareTakenModal(false);
  };

  const addCareTakenFormFields = [
    {
      fieldLabel: "Care Taken Name",
      fieldType: "text",
      fieldId: "careTakenName",
      fieldName: "careTakenName",
      fieldState: addCareTakenName,
      fieldSetState: (value) => {
        setAddCareTakenName(value);
      },
    },
    {
      fieldLabel: "Care Taken Type",
      fieldType: "dropdown",
      fieldId: "careTakenType",
      fieldName: "careTakenType",
      fieldItems: [
        { value: "child", text: "Child" },
        { value: "infant", text: "Infant" },
        { value: "toddler", text: "Toddler" },
        { value: "spouse", text: "Spouse" },
      ],
      fieldState: addCareTakenType,
      fieldSetState: (value) => {
        setAddCareTakenType(value);
      },
    },
    {
      fieldLabel: "Care taken Date of birth",
      fieldType: "date",
      fieldId: "careTakenDOB",
      fieldName: "careTakenDOB",
      fieldState: addCareTakenDOB,
      fieldSetState: (value) => {
        setAddCareTakenDOB(value);
      },
    },
    {
      fieldLabel: "Care taken Gender",
      fieldType: "dropdown",
      fieldId: "careTakenGender",
      fieldName: "careTakenGender",
      fieldItems: [
        { value: "female", text: "Female" },
        { value: "male", text: "Male" },
        { value: "transgender", text: "Transgender" },
      ],
      fieldState: addCareTakenGender,
      fieldSetState: (value) => {
        setAddCareTakenGender(value);
      },
    },
  ];

  const addCareTakenFormButtons = [
    {
      type: "submit",
      text: "Save",
      buttonId: "careTakenSubmit",
      isNotValid: isAddFormNotValid,
    },
    {
      type: "button",
      text: "Close",
      onClick: closeAddCareTakenModal,
      buttonId: "addCareTakenClose",
      isNotValid: false,
    },
  ];

  useEffect(() => {
    if (
      firstLoginCareTakenName !== "" &&
      firstLoginCareTakenType !== "" &&
      firstLoginCareTakenDOB !== "" &&
      firstLoginCareTakenGender !== ""
    ) {
      setIsFLFormNotValid(false);
    } else {
      setIsFLFormNotValid(true);
    }
  }, [
    firstLoginCareTakenName,
    firstLoginCareTakenType,
    firstLoginCareTakenDOB,
    firstLoginCareTakenGender,
  ]);

  useEffect(() => {
    if (
      addCareTakenName !== "" &&
      addCareTakenType !== "" &&
      addCareTakenDOB !== "" &&
      addCareTakenGender !== ""
    ) {
      setIsAddFormNotValid(false);
    } else {
      setIsAddFormNotValid(true);
    }
  }, [addCareTakenName, addCareTakenType, addCareTakenDOB, addCareTakenGender]);

  const addCareTakenModal = () => {
    setShowAddCareTakenModal(true);
  };

  const saveCareTakenDetails = () => {
    axiosClient
      .post("/caretaken/add-care-taken", {
        care_giver: loggedInUser,
        care_taken_of: firstLoginCareTakenType,
        care_taken_name: firstLoginCareTakenName,
        care_taken_dob: new Date(firstLoginCareTakenDOB),
        care_taken_gender: firstLoginCareTakenGender,
      })
      .then((response) => {
        if (response.status === 200) {
          //  setAddUserResponse(response.data.message);
          setShowFirstLoginModal(false);
          navigate(`/home/${loggedInUser}`);
        } else {
          // setAddUserResponse(response.data.message);
        }
      });
  };

  const addCareTakenDetails = () => {
    dispatch(
      addCareTaken(
        loggedInUser,
        addCareTakenName,
        addCareTakenType,
        new Date(addCareTakenDOB),
        addCareTakenGender
      )
    );
    setShowAddCareTakenModal(false);
  };

  return (
    <>
      {isFirstLogin ? (
        <Modal
          show={showFirstLoginModal}
          title="First time login?"
          formId="firstlogin"
          formFields={firstLoginFormFields}
          formFooter={firstLoginFormButtons}
          onAction={saveCareTakenDetails}
        />
      ) : (
        <div className={homestyle.mainContainer}>
          <div className={homestyle.tabContainer}>
            <Tabs value={value} onChange={tabChange} textColor="primary">
              <Tab label="Feeding Tracker" />
              <Tab label="Excretion Tracker" />
              <Tab label="Medication Tracker" />
              <Tab label="Inventory Tracker" />
            </Tabs>
            <TabPanel value={value} index={0} className={homestyle.tabHeader}>
              <FeedingTracker user={loggedInUser} caretaken={careTakenPerson} />
            </TabPanel>
            <TabPanel value={value} index={1} className={homestyle.tabHeader}>
              <ExcretionTracker
                user={loggedInUser}
                caretaken={careTakenPerson}
              />
            </TabPanel>
            <TabPanel value={value} index={2} className={homestyle.tabHeader}>
              <MedicationTracker
                user={loggedInUser}
                caretaken={careTakenPerson}
              />
            </TabPanel>
            <TabPanel value={value} index={3} className={homestyle.tabHeader}>
              <InventoryTracker
                user={loggedInUser}
                caretaken={careTakenPerson}
              />
            </TabPanel>
          </div>
          <div className={homestyle.ctdContainer}>
            {careTakenDetails.map((ctd) => (
              <Card
                sx={
                  ctd.care_last_accessed
                    ? {
                        width: 400,
                        height: 200,
                        margin: "10%",
                        cursor: "pointer",
                        backgroundColor: "green",
                      }
                    : {
                        width: 400,
                        height: 200,
                        margin: "10%",
                        cursor: "pointer",
                      }
                }
                onClick={() =>
                  dispatch(changeCareTaken(ctd.care_giver, ctd._id))
                }
              >
                <CardContent sx={{ padding: "10%" }}>
                  <Typography component="p">
                    Name: {ctd.care_taken_name}
                  </Typography>
                  <Typography component="p">
                    Type: {ctd.care_taken_of}
                  </Typography>
                  <Typography component="p">
                    Date of Birth: {ctd.care_taken_dob}
                  </Typography>
                  <Typography component="p">
                    Gender: {ctd.care_taken_gender}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="contained"
              size="medium"
              onClick={addCareTakenModal}
              sx={{ marginLeft: "20%" }}
            >
              Add Care Taken
            </Button>
            {showAddCareTakenModal && (
              <Modal
                show={showAddCareTakenModal}
                title="Add care taken"
                formId="caretaken"
                formFields={addCareTakenFormFields}
                formFooter={addCareTakenFormButtons}
                onAction={addCareTakenDetails}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;

export async function firstTimeLogin({ params }) {
  const response = await axiosClient.get(
    `/caretaken/is-first-login?giver_user=${params.userId}`
  );
  if (response.status === 200) {
    if (response.data === true) {
      return {
        firstLogin: true,
      };
    } else {
      const getCtd = await axiosClient.get(
        `/caretaken/get-selected-care-taken-detail?care_giver=${params.userId}`
      );
      if (getCtd.status === 200) {
        return {
          firstLogin: false,
          id: getCtd.data._id,
          name: getCtd.data.care_taken_name,
          type: getCtd.data.care_taken_of,
          dob: getCtd.data.care_taken_dob,
          gender: getCtd.data.care_taken_gender,
          care_giver: getCtd.data.care_giver,
        };
      } else {
        return {
          firstLogin: false,
        };
      }
    }
  } else {
    return response;
  }
}
