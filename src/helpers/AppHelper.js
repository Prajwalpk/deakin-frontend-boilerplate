import { history } from 'helpers/router';

class AppHelper {
  developerModeLoginUser = (loggedIn) => {
    window.localStorage.setItem("loggedIn", loggedIn);
    window.localStorage.setItem("developerMode", loggedIn);
    window.localStorage.setItem("admin", false)
    history.push('/userhome') // Change this if you have to
  }

  loginUser = (loggedIn, accessToken) => {
    window.localStorage.setItem("loggedIn", loggedIn);
    window.localStorage.setItem("accessToken", accessToken);
    history.push('/home') // Change this if you have to
  }

  basicLoginUser = (loggedIn, name, userRole, userId) => {
    window.localStorage.setItem("loggedIn", loggedIn);
    window.localStorage.setItem("developerMode", loggedIn);
    window.localStorage.setItem("userRole", userRole);
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("userName", name);
    if(userRole === 'ADMIN') {
      window.localStorage.setItem("admin", true)
      history.push("/home");
    } else {
      window.localStorage.setItem("admin", false);
      history.push("/userhome");
    } 
  }

  logoutUser = () => {
    window.localStorage.setItem("loggedIn", false);
    window.localStorage.setItem("developerMode", false);
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("admin");
    window.localStorage.removeItem("userRole");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("conversationId");
    window.sessionStorage.removeItem("conversationId");
    history.push('/')
  }

  /*
    Returns if there's a valid login in localStorage. 
    For a valid login, either of the two should be satisfied in localStorage:
    1. loggedIn is true + accessToken is not false or null or "".
        Should return token as a valid accessToken which is not the string 'true'
    2. loggedIn is true + developerMode is true.
        Should return token as the string 'true'

    Else, returns false

  */
  isUserLocalStorageLoggedIn = () => {
    let token = "";
    if ((this.getUserLoggedIn() && ((token = this.getUserAccessToken()) !== "")) ||
        (this.getUserLoggedIn() && (this.getDeveloperMode()))) {
      token = "" + ( (this.getUserAccessToken()) || this.getDeveloperMode() ); // this is wrong!
      return token;
    }
    else
      return false;
  }

  getUserLoggedIn = () => {
    let value = window.localStorage.getItem("loggedIn");
    return ( value !== 'false' && value !== null );
  }

  getUserAccessToken = () => {
    let value = window.localStorage.getItem("accessToken");
    return ( value !== 'false' && value !== null && value !== "" ) ? value : "" ;
  }

  getUserRole = () => {
    let value = window.localStorage.getItem("userRole");
    return ( value !== 'false' && value !== null && value !== "" ) ? value : "" ;
  }

  getUserId = () => {
    let value = window.localStorage.getItem("userId");
    return ( value !== 'false' && value !== null && value !== "" ) ? value : "" ;
  }

  getUserName = () => {
    let value = window.localStorage.getItem("userName");
    return ( value !== '' && value !== null ) ? value : "" ;
  }

  getDeveloperMode = () => {
    let value = window.localStorage.getItem("developerMode");
    return ( value !== 'false' && value !== null );
  }

}

const instance = new AppHelper();
export default instance;
