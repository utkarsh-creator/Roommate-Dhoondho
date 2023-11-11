import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import DisplayRoommateListingCard from "../DisplayRoommateListingCard/DisplayRoommateListingCard";
import DisplayRoomListingCard from "../DisplayRoomListingCard/DisplayRoomListingCard";
import { toast } from "react-toastify";

const Profilepage = () => {
  const profileData = JSON.parse(localStorage.getItem("profile"));
  const [additionalData, setAdditionalData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regnum, setRegNumber] = useState("");
  const [gender, setGender] = useState("");
  const [rank, setRank] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState(null);
  const [changesMade, setChangesMade] = useState(true);
  const [notification, setNotification] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [formEvent, setFormEvent] = useState(null);
  const [showInfoLabel, setShowInfoLabel] = useState(true);
  const [isGenderEditable, setIsGenderEditable] = useState(
    profileData.user.gender === null
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleConfirmationOpen = (e) => {
    e.preventDefault();
    console.log("Opening confirmation dialog");
    setFormEvent(e);
    setOpenConfirmation(true);
  };

  const handleConfirmationClose = (confirmed) => {
    setOpenConfirmation(false);
    if (confirmed && formEvent && gender) {
      submituserRegistrationForm(formEvent, gender);
    }
  };  

  console.log("user specific data: ", profileData);

  useEffect(() => {
    axios
      .get(
        `https://roommate-finder-theta.vercel.app/user/${profileData.user._id}`
      )
      .then((response) => {
        const data = response.data;
        setAdditionalData(data);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setRegNumber(data.regnum);
        setGender(data.gender);
        setRank(data.rank);
        setContactNumber(data.mobile);
        setEmail(data.username);

        setFields({
          firstname: data.firstname,
          lastname: data.lastname,
          regnum: data.regnum,
          gender: data.gender,
          emailid: data.username,
          mobileno: data.mobile,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching additional data:", error);
        setIsLoading(false);
      });
  },[]);
  
  const [fields, setFields] = useState({});

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const validateForm = () => {
    let newErrors = {};
    let formIsValid = true;

    if (!fields["firstname"]) {
      formIsValid = false;
      newErrors["firstname"] = "*Please enter your firstname.";
    }

    if (typeof fields["firstname"] !== "undefined") {
      if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        newErrors["firstname"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["lastname"]) {
      formIsValid = false;
      newErrors["lastname"] = "*Please enter your lastname.";
    }

    if (typeof fields["lastname"] !== "undefined") {
      if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        newErrors["lastname"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["regnum"]) {
      formIsValid = false;
      newErrors["regnum"] = "*Please enter your registration number.";
    }

    if (typeof fields["regnum"] !== "undefined") {
      const pattern2 = /^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/;

      if (!pattern2.test(fields["regnum"])) {
        formIsValid = false;
        newErrors["regnum"] = "*Please enter a valid registration number.";
      }
    }

    // if (!fields["emailid"]) {
    //   formIsValid = false;
    //   newErrors["emailid"] = "*Please enter your email-ID.";
    // }

    // if (typeof fields["emailid"] !== "undefined") {
    //   const emailPattern =
    //     /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

    //   if (!emailPattern.test(fields["emailid"])) {
    //     formIsValid = false;
    //     newErrors["emailid"] = "*Please enter valid email-ID.";
    //   }
    // }

    if (!fields["mobileno"]) {
      formIsValid = false;
      newErrors["mobileno"] = "*Please enter your contact no.";
    }

    if (typeof fields["mobileno"] !== "undefined") {
      const mobilePattern = /^[0-9]{10}$/;

      if (!mobilePattern.test(fields["mobileno"])) {
        formIsValid = false;
        newErrors["mobileno"] = "*Please enter valid contact no.";
      }
    }
    if (!fields["gender"]) {
      formIsValid = false;
      newErrors["gender"] = "*Please select your gender.";
    }
    setErrors(newErrors);
    return formIsValid;
  };

  const submituserRegistrationForm = (e, gender) => {
    e.preventDefault();
    console.log("submitting form", gender);
    if (validateForm()) {
      const updatedData = {
        currentUserId: profileData.user._id,
        username: email,
        firstname: firstName,
        lastname: lastName,
        regnum: regnum,
        gender: gender,
        rank: rank,
        mobile: contactNumber,
        currentUserAdminStatus: false,
      };

      axios
        .put(
          `https://roommate-finder-theta.vercel.app/user/${profileData.user._id}`,
          updatedData
        )
        .then((response) => {
          // console.log("Profile updated successfully:", response.data);
          setChangesMade(true);
          toast.success("Changes saved successfully!");
          // setNotification("Changes saved successfully!");
          const updatedProfileData = { ...profileData, user: response.data };
          localStorage.setItem("profile", JSON.stringify(updatedProfileData));
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          setNotification("Error saving changes. Please try again.");
        });
    }
  };
  return (
    <>
      <div>
        <Navbar />
      </div>
      {isLoading ? (
        <div className="loading-indicator-container">
          <CircularProgress disableShrink color="primary" size={40} />
        </div>
        ) : (
        <div>
          <div className="profile">
            <div className="profiletab-main">
              <div className="profile-buttons">
                <button className="activeprofile">
                  <p className="profile-text">Profile</p>
                </button>
              </div>
              <div className="profiletab-hr">
                <hr />
              </div>
            </div>
            <div>
              <div>
                <div id="main-registration-container">
                  <div id="register">
                  <form
                    method="post"
                    name="userRegistrationForm"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (validateForm()) {
                        if (profileData.user.gender === null) {
                          handleConfirmationOpen(e);
                        } else {
                          submituserRegistrationForm(e);
                        }
                      }
                    }}
                  >
                    {showInfoLabel && (
                      <Alert severity="info" onClose={() => setShowInfoLabel(false)}>
                        You can set your gender only ONCE. Once set, it can't be changed. 
                        Email id cannot be changed.
                      </Alert>
                    )}
                      <div className="form-section-1">
                        <div className="form-section-1a">
                          <label>First Name*</label>
                          <input
                            type="text"
                            name="firstname"
                            value={firstName}
                            onChange={(e) => {
                              handleChange(e);
                              setFirstName(e.target.value);
                              setChangesMade(true);
                            }}
                          />
                          <div className="errorMsg">{errors.firstname}</div>
                        </div>
                        <div className="form-section-1b">
                          <label>Last Name*</label>
                          <input
                            type="text"
                            name="lastname"
                            value={lastName}
                            onChange={(e) => {
                              handleChange(e);
                              setLastName(e.target.value);
                              setChangesMade(true);
                            }}
                          />
                          <div className="errorMsg">{errors.lastname}</div>
                        </div>
                      </div>
                      <div className="form-section-3">
                        <div className="input-group">
                          <div className="flex">
                            <label>Gender*</label>
                            {/* <span className="form-section-3-border">
                              <div
                                data-gender="M"
                                name="gender"
                                className={`mr-6  bg-[#D9D9D9] rounded-[10px] py-2 px-8 text-center cursor-pointer female ${
                                  fields.gender === "M"
                                    ? "border-2 border-black"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  handleChange({
                                    target: { name: "gender", value: "M" },
                                  });
                                  setGender("M");
                                  setChangesMade(true);
                                }}
                              >
                                M
                              </div>
                              <div
                                data-gender="F"
                                name="gender"
                                className={`bg-[#D9D9D9] rounded-[10px] py-2 px-8 text-center cursor-pointer female ${
                                  fields.gender === "F"
                                    ? "border-2 border-black"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  handleChange({
                                    target: { name: "gender", value: "F" },
                                  });
                                  setGender("F");
                                  setChangesMade(true);
                                }}
                              >
                                F
                              </div>
                            </span> */}
                            <span className="form-section-3-border">
                              <div
                                data-gender="M"
                                name="gender"
                                className={`mr-6  bg-[#D9D9D9] rounded-[10px] py-2 px-8 text-center cursor-pointer female ${
                                  fields.gender === "M" ? "border-2 border-black" : ""
                                }`}
                                onClick={(e) => {
                                  if (isGenderEditable) {
                                    handleChange({
                                      target: { name: "gender", value: "M" },
                                    });
                                    setGender("M");
                                    setChangesMade(true);
                                  }
                                }}
                              >
                                M
                              </div>
                              <div
                                data-gender="F"
                                name="gender"
                                className={`bg-[#D9D9D9] rounded-[10px] py-2 px-8 text-center cursor-pointer female ${
                                  fields.gender === "F" ? "border-2 border-black" : ""
                                }`}
                                onClick={(e) => {
                                  if (isGenderEditable) {
                                    handleChange({
                                      target: { name: "gender", value: "F" },
                                    });
                                    setGender("F");
                                    setChangesMade(true);
                                  }
                                }}
                              >
                                F
                              </div>
                            </span>
                          </div>
                          <div className="errorMsg">{errors.gender}</div>
                        </div>

                        <div className="form-section-3b">
                          <label>Registration Number*</label>
                          <input
                            type="text"
                            name="regnum"
                            value={regnum}
                            onChange={(e) => {
                              handleChange(e);
                              setRegNumber(e.target.value);
                              setChangesMade(true);
                            }}
                          />
                          <div className="errorMsg">{errors.regnum}</div>
                        </div>
                      </div>
                      <div className="form-section-2">
                        <div className="form-section-2a">
                          <label>Email*</label>
                          <input
                            type="label"
                            name="emailid"
                            value={email}
                            onChange={(e) => {
                              // handleChange(e);
                              // setEmail(e.target.value);
                              setChangesMade(true);
                            }}
                          />
                          {/* <div className="errorMsg">{errors.emailid}</div> */}
                        </div>
                        <div className="form-section-2b">
                          <label>Contact Number*</label>
                          <input
                            type="text"
                            name="mobileno"
                            value={contactNumber}
                            onChange={(e) => {
                              handleChange(e);
                              setContactNumber(e.target.value);
                              setChangesMade(true);
                            }}
                          />
                          <div className="errorMsg">{errors.mobileno}</div>
                        </div>
                      </div>
                      <div className="form-section-4">
                        {changesMade && (
                          <button className="mx-auto bg-[#06105A] px-[2.5rem] py-[0.75rem] text-white rounded-[8px] self-start disabled:hover:cursor-not-allowed">
                            Submit
                          </button>
                        )}
                      </div>
                      {notification && (
                        <div
                          className={
                            notification.startsWith("Error")
                              ? "error-notification"
                              : "success-notification"
                          }
                        >
                          {notification}
                        </div>
                      )}
                    </form>
                    <div className="form-section-5">
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="listing">
            <div className="listing-buttons">
              <button className="activelisting">
                <p className="listing-text">Your Listing</p>
              </button>
            </div>
            <div className="tab-content">
              <div className="cards">
                <DisplayRoommateListingCard />
                <DisplayRoomListingCard />
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <Footer />
      </div>
      <Dialog
        open={openConfirmation}
        onClose={() => handleConfirmationClose(false)}
      >
        <DialogTitle>WARNING</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set your gender only ONCE. Once set, it can't be changed. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmationClose(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleConfirmationClose(true)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profilepage;
