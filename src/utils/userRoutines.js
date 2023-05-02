import { writeCookie, getCookie } from "./cookieCode";

export const getUserByID = async (id, token) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/users/getUserData/" + id, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    
    console.error("getUserByIDError", error);
  }
};
export const loginUser = async (userName, password) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/users/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      writeCookie("JWT_Token", data.user.token, 7);
    }
    return data;
  } catch (error) {
    console.error("loginUserError", error);
  }
};
export const registerUser = async (userName, password, admin) => {
  try {
    console.log("Gonna fetch");
    const response = await fetch("http://127.0.0.1:5000/users/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        administrator: admin,
      }),
    });
    console.log("Did fetch");
    const data = await response.json();
    if (response.status === 200 || response.status === 201) {
      writeCookie("JWT_Token", data.user.token, 7);
    }
    return data;
  } catch (error) {
    console.error("registerUserError", error);
  }
};

export const deleteUser = async (id, token) => {
  try {
    console.log("Gonna fetch");
    const response = await fetch("http://127.0.0.1:5000/users/deleteuser", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",        
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id:id,
      }),
    });
    console.log("Did fetch");
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Delete user client error", error);
  }
};

export const verifyUser = async (jwtToken) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/users/verifyUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await response.json();
    console.log("User data", data);
    return data.user.userName;
  } catch (error) {
    console.error("Verify user client error", error);
  }
};
export const authenticateUser = async (token) => {
  try {
    console.log("Authenticate user Fetch");
    const response = await fetch("http://127.0.0.1:5000/users/authCheck", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return data.user;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("authenticate user error", error);
  }
};

export const updateUser = async (
  id,
  userName,
  password,
  administrator,
  token
) => {
  try {
    const headers = {
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      "requestedUser": id,
      "userName": userName,
      "password": password,
      "administrator": administrator,
    });
    const response = await fetch("http://127.0.0.1:5000/users/updateUser", {
      method: "PUT",
      headers: headers,
      body: body,
    });
    if (response.status === 200){
      return (1)
    }else{
      return (0)
    };

  } catch (error) {
    console.error("Update User Client Error", error);
  }
};

export const getUserList = async (jwtToken) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/users/getUserList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await response.json();
    console.log("User data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
