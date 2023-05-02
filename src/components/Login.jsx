import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { loginUser } from "../utils/userRoutines.js";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { UserState } from "../context/context.js";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const INITIAL_WELCOME = "Enter your details to log in";
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [busy, setBusy] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(INITIAL_WELCOME);
  const navigate = useNavigate();
  const {
    userState: { currentUser, desiredUser },
    userDispatch,
    componentVariants,
  } = UserState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBusy(true);
    const data = await loginUser(userName, password);
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
      userDispatch(action);
      setWelcomeMessage(`Welcome back ${data.user.userName}`);
    } else {
      setWelcomeMessage("Incorrect credentials");
    }
    setBusy(false);
  };
  console.log("Current User", currentUser);
  if (currentUser.id !== 0 && welcomeMessage === INITIAL_WELCOME) {
    setWelcomeMessage(`Welcome back ${currentUser.userName}`);
  }
  return (
    <motion.div
      className="mainContentItem login"
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
          <FloatingLabel
            controlId="floatingUserNameInput"
            label="User Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Enter User Name"
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
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </FloatingLabel>
          <div className="formSubmit">
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      )}
    </motion.div>
  );
};

export default Login;
