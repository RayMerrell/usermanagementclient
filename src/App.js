import "./App.css";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserData from "./components/UserData";
import EditUser from "./components/EditUser";
import DeleteUser from "./components/DeleteUser";
import UserList from "./components/UserList";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Header />
      <div className="mainContainer">
        <div className="mainMenu">
          <Menu />
        </div>
        <div className="mainContent">
          <AnimatePresence>
            <Routes location={location} key={location.key}>
              <Route path="/" element={<Home />} exact />
              <Route path="/register" element={<Register />} exact />
              <Route path="/login" element={<Login />} exact />
              <Route path="/userData" element={<UserData />}
                exact
              />
              <Route
                path="/editUser"
                element={<EditUser />}
                exact
              />
              <Route path="/deleteUser" element={<DeleteUser />} exact />
              <Route path="/userList" element={<UserList />} exact />{" "}
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
