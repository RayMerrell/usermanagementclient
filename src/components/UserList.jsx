import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserState } from "../context/context";
import { Spinner } from "react-bootstrap";
import { getUserList } from "../utils/userRoutines";
import { getCookie } from "../utils/cookieCode";
import { Navigate } from "react-router-dom";
import EditUser from "./EditUser";

function UserList() {
  const INITIAL_WELCOME = "Please choose an account";
  const [welcomeMessage, setWelcomeMessage] = useState(INITIAL_WELCOME);
  const [busy, setBusy] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [userList, setUserList] = useState();
  const [firstRun, setFirstRun] = useState(true);

  const setDesiredUser = (id) => {
    const action = {
      type: "CHANGE_DESIRED_USER",
      payload: {
        id: id,
      },
    };
    console.log("Desired user changed", id);
    userDispatch(action);
    setWelcomeMessage("");
    setFirstRun(false);
  };
  useEffect(() => {
    console.log("Use effect");
    //check if user logged in
    if (currentUser.id === 0) {
      console.log("no user");
      setLoggedIn(false);
      return;
    }
    setBusy(true);
    (async () => {
      const userData = await getUserList(getCookie("JWT_Token"));
      console.log("UserList", userData.userList);
      if (!userData.userList) {
        setWelcomeMessage("No permissions");
        setUserList([]);
      } else {
        userData.userList.sort(function (a, b) {
          let x = a.userName.toLowerCase();
          let y = b.userName.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        //console.log("Sorted List", sortedList);
        setUserList(userData.userList);
      }

      setBusy(false);
    })();
    return () => {
      const action = {
        type: "CHANGE_DESIRED_USER",
        payload: {
          id: 0,
          userName: "",
          administrator: "",
          password: "",
        },
      };
      console.log("dispatched data3", action);
      userDispatch(action);
    };
  }, []);

  const {
    userState: { currentUser, desiredUser },
    userDispatch,
    componentVariants,
  } = UserState();

  if (loggedIn) {
    return (
      <motion.div
        className="mainContentItem userListWrapper"
        variants={componentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="userList">
          {!busy && (
            <ListGroup as="ul">
              {userList.map((user) => {
                return (
                  <ListGroup.Item
                    className="userListItem"
                    as="li"
                    key={user.id}
                    onClick={() => {
                      setDesiredUser(user.id);
                    }}
                  >
                    {user.userName || "Unknown"}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </div>
        <div className="userListDetail">
          {welcomeMessage && (
            <h2 className="contentHeader">{welcomeMessage}</h2>
          )}
          {busy && <Spinner animation="border" variant="danger" />}
          {!firstRun && <EditUser />}
        </div>
      </motion.div>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
}

export default UserList;
