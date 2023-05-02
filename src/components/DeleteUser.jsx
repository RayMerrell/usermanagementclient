import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { UserState } from "../context/context";
import { Navigate } from "react-router-dom";
import { deleteUser, getUserByID } from "../utils/userRoutines";
import { getCookie } from "../utils/cookieCode";
import { Button, FloatingLabel, Form, FormLabel, Spinner } from "react-bootstrap";

const DeleteUser = () => {
  const {
    userState: { currentUser, desiredUser },
    userDispatch,
    componentVariants,
  } = UserState();

  const INITIAL_WELCOME = "Delete user?";
  const [welcomeMessage, setWelcomeMessage] = useState(INITIAL_WELCOME);
  const [id, setID] = useState(0);
  const [userName, setUserName] = useState("");
  const [administrator, setAdministrator] = useState("");
  const [busy, setBusy] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  const setStates = (userObject) => {
    setID(userObject.id);
    setUserName(userObject.userName);
    setAdministrator(userObject.administrator);
  };

  useEffect(() => {
    console.log("use effect");
    if (currentUser.id === 0) {
      console.log("no user");
      setLoggedIn(false);
      return;
    }
    if (desiredUser.id > 0) {
      (async () => {
        const userData = await getUserByID(
          desiredUser.id,
          getCookie("JWT_Token")
        );
        const action = {
          type: "CHANGE_DESIRED_USER",
          payload: {
            id: userData.id,
            userName: userData.userName,
            administrator: userData.administrator,
          },
        };
        console.log("dispatched data2", action);
        userDispatch(action);
        setStates(userData);
      })();
    } else {
      setStates(currentUser);
    }
    setBusy(false);
    return () => {
      resetUser("desired");
    };
  }, []);

const resetUser = (type)=>{
  const requestType= type="desired"?("CHANGE_DESIRED_USER"):("CHANGE_USER");
  const action = {
    type: requestType,
    payload: {
      id: 0,
      userName: "",
      administrator: "",
      password: "",
    },
  };
  console.log("dispatched data3", action);
  userDispatch(action);
}
  const submitHandler = async (e) => {
    e.preventDefault();
    let message = "";
    setWelcomeMessage(`Please wait`);
    setBusy(true);
    const result = await deleteUser(id, getCookie("JWT_Token"));
    console.log("result", result);
    if (result.recordsDeleted > 0) {
      message = `The ${userName} account has been deleted`;
      resetUser("current");
      setLoggedIn(false);
    } else {
      message = "Details not deleted, please try again";
    }
    setWelcomeMessage(message);
    setBusy(false);
  };

  if (loggedIn) {
    return (
      <motion.div
        className="mainContentItem"
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
              disabled
                key="userNameInput"
                type="text"
                placeholder="Enter User Name"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              ></Form.Control>
            </FloatingLabel>
              <Form.Check
              disabled
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
                Delete account
              </Button>
            </div>
          </Form>
        )}
      </motion.div>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};
export default DeleteUser;
