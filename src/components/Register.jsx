import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { registerUser } from "../utils/userRoutines";
import { UserState } from "../context/context";

const Register = () => {
  const INITIAL_WELCOME = "Enter your details to create an account";
  const [welcomeMessage, setWelcomeMessage] = useState(INITIAL_WELCOME);
  const { userDispatch, componentVariants } = UserState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [administrator, setAdministrator] = useState(false);

  const [busy, setBusy] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const reset = () => {
    setBusy(false);
    setAllDone(false);
    setUserName("");
    setPassword("");
    setAdministrator(false);
    setWelcomeMessage(INITIAL_WELCOME);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    let message = "";

    setWelcomeMessage(`Please wait`);
    setBusy(true);
    const data = await registerUser(userName, password, administrator);
    console.log("data", data);
    if (data.user) {
      const action = {
        type: "CHANGE_USER",
        payload: {
          id: data.user.id,
          userName: data.user.userName,
          administrator: data.user.administrator,
        },
      };
      message = `Thank you for joining us ${data.user.userName}, please choose an option on the left`;
      userDispatch(action);
    } else {
      message = "Incorrect credentials";
    }
    setWelcomeMessage(message);
    setBusy(false);
    setAllDone(true);
  };
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
        <>
          <Spinner animation="border" variant="danger" />
        </>
      ) : (
        <></>
      )}
      {!allDone && !busy && (
        <Form onSubmit={submitHandler}>
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
          {administrator ? (
            <Form.Check
              checked
              reverse
              type="switch"
              id="administratorSwitch"
              label="Administrator Priviledges"
              onChange={(e) => {
                setAdministrator(e.target.checked);
              }}
            />
          ) : (
            <Form.Check
              reverse
              type="switch"
              id="administratorSwitch"
              label="Administrator Priviledges"
              onChange={(e) => {
                setAdministrator(e.target.checked);
              }}
            />
          )}
          <div className="formSubmit">
            <Button variant="primary" type="submit">
              Create Account
            </Button>
          </div>
        </Form>
      )}
      {allDone && !busy && (
        <Button variant="primary" type="submit" onClick={reset}>
          Add another account
        </Button>
      )}
    </motion.div>
  );
};

export default Register;
