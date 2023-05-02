import React, { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserState } from "../context/context";
import { FloatingLabel, Form, FormLabel } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { getUserByID } from "../utils/userRoutines";
import { getCookie } from "../utils/cookieCode";

const UserData = () => {
  const {
    userState: { currentUser, desiredUser },
    userDispatch,
    componentVariants,
  } = UserState();

  const [id, setID] = useState();
  const [userName, setUserName] = useState();
  const [administrator, setAdministrator] = useState();
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
            id: userData.user.id,
            userName: userData.user.userName,
            administrator: userData.user.administrator,
          },
        };
        console.log("dispatched data2", action);
        userDispatch(action);
        setStates(userData.user);
      })();
    } else {
      setStates(currentUser);
    }
    
  }, [currentUser, desiredUser.id, userDispatch]);

  if (loggedIn) {
    return (
      <motion.div
        className="mainContentItem"
        variants={componentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="contentHeader">View Account</h2>
        <Form className="userForm">
          <FormLabel className="mb-3 userID">User I.D. {id}</FormLabel>
          <FloatingLabel
            controlId="floatingUserNameInput"
            label="User Name"
            className="mb-3"
          >
            <Form.Control
              disabled
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
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
      
        </Form>
      </motion.div>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default UserData;
