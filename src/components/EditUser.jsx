import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormLabel,
  Spinner,
} from "react-bootstrap";
import { UserState } from "../context/context";
import { deleteUser, getUserByID, updateUser } from "../utils/userRoutines";
import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookieCode";

const EditUser = () => {
  console.log("Edit user");
  const {
    userState: { currentUser, desiredUser },
    userDispatch,
    componentVariants,
  } = UserState();

  const INITIAL_WELCOME = "Edit user details";
  const [welcomeMessage, setWelcomeMessage] = useState(INITIAL_WELCOME);
  const [id, setID] = useState(0);
  const [userName, setUserName] = useState("");
  const [administrator, setAdministrator] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  const setStates=(userObject)=>{
    setID(userObject.id || 0);
    setUserName(userObject.userName || "");
    setAdministrator(userObject.administrator || "");
  }

  useEffect(() => {
    console.log("Use effect");
    //check if user logged in
    if (currentUser.id === 0) {
      console.log("no user");
      setLoggedIn(false);
      return;
    }
    if (desiredUser.id > 0) {
      (async ()=>{
        const userData = await getUserByID(desiredUser.id, getCookie("JWT_Token"));
        const action = {
          type: "CHANGE_DESIRED_USER",
          payload: {
            id: userData.user.id,
            userName: userData.user.userName,
            administrator: userData.user.administrator,
          },
        };
        console.log("dispatched data2", action);
        userDispatch(action);
        setStates(userData.user)
      })()
    }else{
      setStates(currentUser);
    }
    setBusy(false);
  }, [currentUser, desiredUser.id, userDispatch]);

  const deleteAccount = async ()=>{
    setBusy(true);
    const result = await deleteUser(id, getCookie("JWT_Token"));
    console.log("result", result);
    let message="";
    if (result.recordsDeleted > 0 ) {
      const action = {
        type: "CHANGE_DESIRED_USER",
        payload: {
          id:0,
          userName:"",
          administrator:"",
        },
      };
      console.log("dispatched data2", action);
      userDispatch(action);
      setStates({});
      message="User Deleted"
    } else {
      message = "Details not deleted, please try again";
    }
    setWelcomeMessage(message);
    setBusy(false);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    let message = "";
    setWelcomeMessage(`Please wait`);
    setBusy(true);
    const token = getCookie("JWT_Token");
    const result = await updateUser(id, userName, password, administrator, token);
    console.log("result", result);
    if (result) {
      message = `Details of ${userName} have been edited`;
      if (id === currentUser.id){
        const action = {
          type: "CHANGE_USER",
          payload: {
            id:id,
            userName:userName,
            administrator: administrator,
          },
        };
        userDispatch(action);
      }
    } else {
      message = "Details not edited, please try again";
    }
    setWelcomeMessage(message);
    setBusy(false);
  };
  if (loggedIn) {
    return (
      <motion.div
        className="mainContentItem register"
        variants={componentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="contentHeader">{welcomeMessage}</h2>
        {busy ? (
          <Spinner animation="border" variant="danger" />
        ) : (
          <Form onSubmit={submitHandler}>
            <FormLabel className="mb-3 userID">User I.D. {id}</FormLabel>
            <FloatingLabel
              controlId="floatingUserNameInput"
              label="User Name"
              className="mb-3"
            >
              <Form.Control
                key="userNameInput"
                type="text"
                placeholder="Enter User Name"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              ></Form.Control>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPasswordInput"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                key="passwordInput"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Form.Control>
            </FloatingLabel>
              <Form.Check
                checked={administrator}
                reverse
                type="switch"
                id="administratorSwitch"
                label="Administrator Priviledges"
                onChange={(e) => {
                  setAdministrator(e.target.checked);
                }}
              />
            <div className="formSubmit">
              <Button variant="primary" type="submit">
                Submit
              </Button>
              {desiredUser.id>0 && (
                <Button variant="primary" type="button" onClick={deleteAccount}>
                  Delete Account
                </Button>
              )}
            </div>
          </Form>
        )}
      </motion.div>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default EditUser;
