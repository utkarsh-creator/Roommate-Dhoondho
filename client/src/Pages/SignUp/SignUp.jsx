import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUp } from "../../actions/AuthActions.js";
import Header from "../../Components/Header/Header";
import "./SignUp.css";

let initialFormState = {
  email: "",
  password: "",
  agree: false,
  firstName: "",
  lastName: "",
  phone: "",
  gender: "male",
};
let verifyInitialFormState = { code: "" };
function SignUP() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [verifyForm, setVerifyForm] = useState(verifyInitialFormState);
  const [formError, setFormError] = useState({ email: null, password: null });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVerification, setIsVerification] = useState(false);

  function hideOnClickHandler() {
    setShowPassword((prev) => !prev);
  }

  function formOnChangeHandler(e, bool) {
    let name = e.target.name;
    if (name === "email") {
      validateEmail(e.target.value);
    } else if (name === "password") {
      validatePassword(e.target.value);
    } else if (name === "phone") {
      validateContactNumber(e.target.value);
    }
    let change = {};
    if (e.target.name === "agree") {
      setForm((prev) => {
        return { ...prev, agree: !prev.agree };
      });
      return;
    }
    change[e.target.name] = e.target.value;
    setForm((prev) => {
      return { ...prev, ...change };
    });
  }

  function verifyFormOnChangeHandler(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    setVerifyForm((prev) => {
      return { ...prev, ...change };
    });
  }

  function validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let isEmailValid = emailRegex.test(email);
    if (!isEmailValid) {
      setFormError((prev) => {
        return { ...prev, email: "Please enter a valid email" };
      });
    } else {
      setFormError((prev) => {
        return { ...prev, email: null };
      });
    }
    return isEmailValid;
  }

  function validatePassword(password) {
    const passwordRegex =
      /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isPasswordValid = passwordRegex.test(password);
    if (!isPasswordValid) {
      setFormError((prev) => {
        return {
          ...prev,
          password:
            "Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.",
        };
      });
    } else {
      setFormError((prev) => {
        return { ...prev, password: null };
      });
    }
    return isPasswordValid;
  }

  function validateContactNumber(number) {
    let numberRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/;
    const isNumberValid = numberRegex.test(number);
    if (!isNumberValid) {
      setFormError((prev) => {
        return {
          ...prev,
          phone: "Enter a vaild contact number",
        };
      });
    } else {
      setFormError((prev) => {
        return { ...prev, phone: null };
      });
    }
  }

  async function signUpClickHandler() {
    // setIsVerification(true);
    let data = {
      username: form.email,
      password: form.password,
    };
    dispatch(signUp(data, navigate));
    setForm(initialFormState);
  }

  function verifyCodeClickHandler() {
    console.log("verifyform", verifyForm);
    setIsVerification(false);
    setVerifyForm(initialFormState);
    toast.success("You have successfully signed in!");
    navigate("/");
  }
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow h-auto">
        <div className="hidden md:inline-block md:w-[45%] bg-[#D9D9D9]"></div>
        <div className="w-[100%] md:w-[55%] flex justify-center">
          {!isVerification ? (
            <div className="flex flex-col pt-[2rem] items-center w-[80%]">
              <h1 className="text-[#333] text-[1.75rem] font-[600] w-full">
                Sign Up
              </h1>
              <p className="mb-5 text-[#3C4242] text-[14px] w-full">
                Sign up for free to access any of our products
              </p>
              <button className="flex justify-center items-center font-[600] text-[#06105A] w-[100%]  mr-2 rounded-[8px] border-[#06105A] border-[1.75px] px-[2rem] py-[0.75rem]">
                <FcGoogle size={25} className="mr-2" /> Continue with Google
              </button>

              <div className="flex items-center w-full box-border mt-6 mb-8">
                <div className="flex-grow h-[1px] bg-[#666666]"></div>
                <span className="text-[#666666] pl-2 pr-2">OR</span>
                <div className="flex-grow h-[1px] bg-[#666666]"></div>
              </div>

              <div className="w-full flex justify-between mb-6">
                <div className="w-[45%]">
                  <span className="text-[#3C4242] text-[16px]">
                    First Name *
                  </span>
                  <input
                    value={form.firstName}
                    name="firstName"
                    onChange={formOnChangeHandler}
                    placeholder="First Name"
                    className=" mt-2 rounded-[8px] border-[#3C4242] border-[1px] w-full p-[0.75rem] "
                  />
                  {formError?.firstName ? (
                    <p className="text-[14px] mt-1 text-[#EE1D52]">
                      {formError.firstName}
                    </p>
                  ) : null}
                </div>
                <div className="w-[45%]">
                  <span className="text-[#3C4242] text-[16px]">
                    Last Name *
                  </span>
                  <input
                    value={form.lastName}
                    name="lastName"
                    onChange={formOnChangeHandler}
                    placeholder="Last Name"
                    className=" mt-2 rounded-[8px] border-[#3C4242] border-[1px] w-full p-[0.75rem] "
                  />
                  {formError?.lastName ? (
                    <p className="text-[14px] mt-1 text-[#EE1D52]">
                      {formError.lastName}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="w-full mb-6 hidden">
                <span className="text-[#3C4242] text-[16px] block"> *</span>
                <div className="flex gap-8 text-[18px] mt-2">
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="mr-1"
                      // checked={gender === "male"}
                      // onChange={handleGenderChange}
                    />
                    <label>Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="mr-1"
                      // checked={gender === "female"}
                      // onChange={handleGenderChange}
                    />
                    <label>Female</label>
                  </div>
                </div>
                {formError?.phone ? (
                  <p className="text-[14px] mt-1 text-[#EE1D52]">
                    {formError.phone}
                  </p>
                ) : null}
              </div>
              <div className="w-full">
                <span className="text-[#3C4242] text-[16px] block">Gender</span>
                <div className="flex gap-8 w-full mb-6 mt-2 rounded-[8px] border-[#3C4242] border-[1px] p-[0.75rem]">
                  <div
                    onClick={() => {
                      setForm((prev) => {
                        return { ...prev, gender: "male" };
                      });
                    }}
                    className={`cursor-pointer rounded-[16px] text-[#807D7E] border-[0.3px] py-[0.75rem] px-[3.5rem] ${
                      form.gender === "male"
                        ? "border-[#3C4242] border-[1.5px] text-[black]"
                        : ""
                    }`}
                  >
                    <span>Male</span>
                  </div>
                  <div
                    onClick={() => {
                      setForm((prev) => {
                        return { ...prev, gender: "female" };
                      });
                    }}
                    className={`cursor-pointer rounded-[16px] border-[#807D7E] text-[#807D7E] border-[0.3px] py-[0.75rem] px-[3.5rem] ${
                      form.gender === "female"
                        ? "border-[#3C4242] border-[1.5px] text-[black]"
                        : ""
                    }`}
                  >
                    <span>Female</span>
                  </div>
                </div>
                {formError?.gender ? (
                  <p className="text-[14px] mt-1 text-[#EE1D52]">
                    {formError.gender}
                  </p>
                ) : null}
              </div>

              <div className="w-full mb-6">
                <span className="text-[#3C4242] text-[16px]">
                  Contact Number *
                </span>
                <input
                  value={form.phone}
                  name="phone"
                  onChange={formOnChangeHandler}
                  placeholder="Contact Number"
                  className=" mt-2 rounded-[8px] border-[#3C4242] border-[1px] w-full p-[0.75rem] "
                />
                {formError?.phone ? (
                  <p className="text-[14px] mt-1 text-[#EE1D52]">
                    {formError.phone}
                  </p>
                ) : null}
              </div>

              <div className="w-full mb-6">
                <span className="text-[#3C4242] text-[16px]">
                  Email Address *
                </span>
                <input
                  value={form.email}
                  name="email"
                  onChange={formOnChangeHandler}
                  placeholder="mfc.vit2023@vitstudent.ac.in"
                  className=" mt-2 rounded-[8px] border-[#3C4242] border-[1px] w-full p-[0.75rem] "
                />
                {formError?.email ? (
                  <p className="text-[14px] mt-1 text-[#EE1D52]">
                    {formError.email}
                  </p>
                ) : null}
              </div>

              <div className="w-full mb-6 flex flex-col">
                <div className="flex justify-between">
                  <span className="text-[#3C4242] text-[16px]">Password</span>
                  <span
                    className="flex items-center mb-[-5px] cursor-pointer"
                    onClick={hideOnClickHandler}
                  >
                    <span className="mr-2">
                      {" "}
                      {showPassword ? (
                        <BsEyeFill size={20} color={"#807D7E"} />
                      ) : (
                        <BsEyeSlashFill size={20} color={"#807D7E"} />
                      )}
                    </span>{" "}
                    {showPassword ? "Show" : "Hide"}
                  </span>
                </div>
                <input
                  value={form.password}
                  onChange={formOnChangeHandler}
                  name="password"
                  type={showPassword ? "password" : ""}
                  className="mt-2 rounded-[8px] border-[#3C4242] border-[1px] w-full p-[0.75rem] "
                />

                <span className="text-[#807D7E] text-[14px] mt-1 hidden">
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </span>
                {formError?.password ? (
                  <p className="text-[14px] mt-1 text-[#EE1D52]">
                    {formError.password}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center text-[#807D7E] text-[14px] w-full mb-10">
                <input
                  name="agree"
                  checked={form.agree}
                  onChange={(e) => formOnChangeHandler(e, !form.agree)}
                  className="mr-2"
                  type="checkbox"
                />
                <label>Agree to our Terms of use and Privacy Policy </label>
              </div>

              <button
                onClick={signUpClickHandler}
                disabled={
                  formError.email ||
                  formError.password ||
                  !form.agree ||
                  formError.phone ||
                  !form.firstName ||
                  !form.lastName
                    ? true
                    : false
                }
                className="bg-[#06105A] px-[2rem] py-[0.75rem] text-white rounded-[8px] self-start disabled:hover:cursor-not-allowed"
              >
                {" "}
                Sign Up
              </button>
              <span className="text-[#3C4242] text-[14px] mt-2 self-start">
                Already have an account?{" "}
                <Link to="/">
                  <span className="underline">Log In</span>
                </Link>
              </span>
            </div>
          ) : null}
          {isVerification ? (
            <div className="flex flex-col pt-[2rem] items-center w-[80%]">
              <h1 className="text-[#333] text-[1.75rem] font-[600] w-full">
                Verification
              </h1>
              <p className="mb-5 text-[#3C4242] text-[14px] w-full">
                Verify your code
              </p>

              <div className="w-full mb-6">
                <span className="text-[#3C4242] text-[16px]">
                  Verification Code
                </span>
                <input
                  name="code"
                  value={verifyForm.code}
                  onChange={verifyFormOnChangeHandler}
                  className=" mt-2 rounded-[8px] border-[#3C4242] border-[1px] w-full p-[0.75rem] "
                />
              </div>

              <button
                onClick={verifyCodeClickHandler}
                className="bg-[#06105A] px-[2rem] py-[0.75rem] text-white rounded-[8px] self-start"
              >
                {" "}
                VerifyCode
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SignUP;