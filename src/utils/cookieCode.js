import { authenticateUser } from "./userRoutines";

export const writeCookie = (key, value, days) => {
  //key = name
  //value = jwt token
  //days = when the cookie expires
  let expiryDate = new Date();
  days = days || 365;
  expiryDate.setDate(expiryDate.getDate() + days);
  let cookie = (document.cookie =
    key + "=" + value + "; expires=" + expiryDate.toGMTString() + "; path=/");
  return cookie;
};
export const getCookie = (cookieName) => {
  const regExp = new RegExp(`(?<=${cookieName}=)[^;]*`);
  try {
    let cookie = document.cookie.match(regExp)[0]; //will cause typeError if cookie not found
    return cookie;
  } catch (error) {
    console.log("Cookie not found...", error);
    return false;
  }
};

export const cookieCheck = async () => {
  try {
    const cookie = getCookie("JWT_Token");
    if (!cookie) {
      return false;
    }
    const ourUserData = await authenticateUser(cookie);
    if (!ourUserData) {
      return false;
    }
    console.log("changing user");
    return ourUserData;
  } catch (error) {
    console.error("cookie check error", error);
  }
};
