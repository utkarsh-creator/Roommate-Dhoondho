import * as AuthApi from "../api/AuthRequests";
import { toast } from "react-toastify";

export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    toast.success("Logged in successfully.");
    console.log("data: ", data);
    if(data?.user?.gender !== null){
      navigate("../home", { replace: true });
    }
    else{
      navigate("../profile", { replace: true });
    }
  } catch (error) {
    //console.log(error.response.data);
    throw new Error(error.response.data);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_FAIL", data: data });
    toast.success("Please verify your email. Verification mail sent.");
    navigate("../", { replace: true });
  } catch (error) {
    // console.log(error);
    toast.error("Error. Account may already exist. Try resetting password.");
    dispatch({ type: "AUTH_FAIL" });
    navigate("../", { replace: true });
  }
};


export const logout = ()=> async(dispatch)=> {
  dispatch({type: "LOG_OUT"})
}
