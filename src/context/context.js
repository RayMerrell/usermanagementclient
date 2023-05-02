import { React, createContext, useContext, useReducer } from "react";
//import { faker } from "@faker-js/faker";
import { userReducer } from "./reducer";

const User = createContext();
const Context = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, {
    currentUser: {
      id: 0,
      userName: "",
      administrator: false,
    },
    desiredUser: {
      id: 0,
      userName: "",
      administrator: false,
    },
  });
  const componentVariants = {
    hidden: { opacity: 0, x: "100vw" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ease: "linear", delay: 0.31, duration: 0.35 },
    },
    exit: {
      opacity: 0,
      x: "-100vw",
      transition: { ease: "linear", duration: 0.3 },
    },
  };
  return (
    <User.Provider value={{ userState, userDispatch, componentVariants }}>
      {children}
    </User.Provider>
  );
};
export default Context;
export const UserState = () => {
  return useContext(User);
};
