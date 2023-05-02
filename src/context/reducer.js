export const userReducer = (state, action) => {
  try {
    switch (action.type) {
      case "CHANGE_USER":
        console.log("user state", state);
        const newUser = {
          id: action.payload.id,
          userName: action.payload.userName,
          administrator: action.payload.administrator,
          password: action.payload.password,
        };
        return { currentUser: newUser, desiredUser: state.desiredUser };
      case "CHANGE_DESIRED_USER":
        console.log(state);
        const wantedUser = {
          id: action.payload.id,
          userName: action.payload.userName,
          administrator: action.payload.administrator,
          password: action.payload.password,
        };
        return { currentUser: state.currentUser, desiredUser: wantedUser };
      case "RESET_DESIRED_USER":
        console.log(state);
        const emptyUser = {
          id: 0,
          userName: "",
          administrator: "",
          password: "",
        };
        return { currentUser: state.currentUser, desiredUser: emptyUser };
      default:
        return state;
    }
  } catch (error) {
    console.error("userReducer error", error);
  }
};
