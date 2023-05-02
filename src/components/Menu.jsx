import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = () => {

  return (
    <div className="menu">
      <ListGroup variant="flush">
        <ListGroup.Item action>
          <Link className="menuLink" to={"/login"}>Login</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
        <Link className="menuLink" to={"/editUser"}>Edit user data</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
        <Link className="menuLink" to={"/register"}>Register a new user</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
        <Link className="menuLink" to={"/userData"}>View user data</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
        <Link className="menuLink" to={"/deleteUser"}>Delete a user</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
        <Link className="menuLink" to={"/userList"}>User List</Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Menu;
