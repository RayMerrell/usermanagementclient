import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserState } from "../context/context.js";
import { Navigate } from "react-router-dom";
import { cookieCheck } from "../utils/cookieCode.js";

const Home = () => {  
  const [loggedIn, setLoggedIn] = useState(true);
  const {
    userState: { currentUser },
    userDispatch,
    componentVariants,
  } = UserState();

  useEffect(() => {
    if (currentUser.id !== 0) return;
    (async () => {
      const userLoggedIn = await cookieCheck();
      if (!userLoggedIn) {
        setLoggedIn(false);        
        return;
      }
      const action = {
        type: "CHANGE_USER",
        payload: {
          id: userLoggedIn.id,
          userName: userLoggedIn.userName,
          administrator: userLoggedIn.administrator,
        },
      };
      userDispatch(action);
    })();
  }, []);  

  console.log("Home");
    if (loggedIn){
      return (<motion.div
        className="mainContentItem home"
        variants={componentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1>Welcome back {currentUser.userName}</h1>
        <h2>Please choose an option on the left</h2>
      </motion.div> );
    }else{
      return (<Navigate to="/login" replace={true}/>);
    }
};
export default Home;
