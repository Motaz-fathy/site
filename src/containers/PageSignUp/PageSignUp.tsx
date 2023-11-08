import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAddLogin } from "hooks/DataSend/useLogin";
import useInput from "hooks/useInput";
import { useAddSignup } from "hooks/DataSend/useSignUp";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  IResolveParams
} from "reactjs-social-login";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { AppContext } from "components/context/AppContext";
import classes from "./PageSignUp.module.css";
import OtpInput from "react-otp-input";
export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "continueWithFacebook",
    href: "#",
    icon: facebookSvg
  },
  {
    name: "continueWithGoogle",
    href: "#",
    icon: googleSvg
  }
];

const REDIRECT_URI = "https://www.telefreik.com/login";
const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {

	const handleApi = async () =>  {
	
	}

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);
  const navigate = useNavigate();
  let userAgent = window.navigator.userAgent;
  const { token } = useContext(AppContext);
  const { t } = useTranslation();
  const {
    value: phone,
    isValid: PhoneISValid,
    hasError: phoneHasError,
    inputBlurHandler: phoneBlur,
    valueChangeHandler: phoneChange,
    reset: resetPhone
  } = useInput((value: any) => value.length <= 11);
  const {
    value: password,
    isValid: passwordISValid,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlur,
    valueChangeHandler: passwordChange
  } = useInput((value: any) => value.length === 6);
  const {
    value: confirmPassword,
    isValid: confirmPasswordISValid,
    hasError: confirmPasswordHasError,
    inputBlurHandler: confirmPasswordBlur,
    valueChangeHandler: confirmPasswordChange
  } = useInput((value: any) => value === password);
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputBlurHandler: emailBlur,
    valueChangeHandler: emailChange,
    reset: resetEmail
  } = useInput((value: string) => value.includes("@"));
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    inputBlurHandler: nameBlur,
    valueChangeHandler: nameChange,
    reset: resetName
  } = useInput((value: any) => value.trim() !== 0);
  const { mutate } = useAddSignup();
//   console.log("mutate" , mutate)
  const FormValid = PhoneISValid && emailIsValid && nameIsValid;
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState<any>();
  const submitHandler = (event: any) => {
    const data = new FormData();
    event.preventDefault();
    if (FormValid) {
      data.append("mobile", phone);
      data.append("email", email);
      data.append("name", name);
      data.append(
        "firebase_token",
        "crddWjPVRJlOXzxoCQKrTtX:APA91bFYJDe5PtVjXqg6KHQiO8z645454bTEqXNRi2TUVAKg5Szwvv4zOLAFpvpGm9o0Y3qY9X_IveKbLw2of0aNBwZLVgAhiwYuARVhfX3ZbchUA3cS1dzL3lKCc76oqK-q0FphIb4EtWy6c"
      );
      data.append("os_system", userAgent);
      data.append("os_version", "v10");
      data.append("phonecode", "20");
      data.append("password", password);
      data.append("password_confirmation", confirmPassword);

      mutate(data);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    }
  };
  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);
  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);


  return (
    <div
      className={`flex items-center justify-center  ${classes.Form}`}
    >
      <form className={`  ${classes.FormCard} `} onSubmit={submitHandler}>
        <div className=" flex w-full flex-col items-center">
          <div
            className={`   ${classes.actions} max-sm:flex  max-sm:justify-around max-sm:items-center`}
          >
            <button
              onClick={() => navigate("/login")}
              className="  max-sm:mt-2 max-sm:text-[20px] "
            >
           <span>  {t("login")}{" "}</span>
            </button>
            <button
              onClick={() => navigate("/signup")}
              className={`max-sm:mt-0 ${classes.active}   `}
            >
             <span> {t("Sign up")}</span>
            </button>

          </div>
          <div className={classes.element}>
            <span >{t("Full Name")} *</span>
            <Input
              type="text"
              placeholder={t("userName")!}
              className="mt-1"
              value={name}
              onChange={nameChange}
              onBlur={nameBlur}
            />
            {nameHasError && (
              <p className="mt-1 text-red-900">{t("validName")}</p>
            )}
          </div>

          <div className={classes.element}>
            <span >{t("Email")} *</span>
            <Input
              type="text"
              placeholder="email@yahoo.com"
              className="mt-1"
              value={email}
              onChange={emailChange}
              onBlur={emailBlur}
            />
            {emailHasError && (
              <p className="mt-1 text-red-900">{t("validEmail")}</p>
            )}
          </div>

          <div className={classes.element}>
            <span >{t("Phone number")} *</span>
            <Input
              type="text"
              placeholder="0105478...."
              className="mt-1"
              value={phone}
              onChange={phoneChange}
              onBlur={phoneBlur}
            />
            {phoneHasError && (
              <p className="mt-1 text-red-900">
                {t("Enter a valid phone number")}
              </p>
            )}
          </div>
        
          {screenSize.width <= 666 ? (
            <>
              <div className={"w-[90%] translate-x-[-10px]"}>
                <span className="">{t("Password")} *</span>
                <OtpInput
                  value={password}
                  inputStyle={{
                    height: "2rem",
                    width: "1.9rem",
                    border: "1px solid rgb(67,56,202)",
                    borderRadius: 4,
                    color: "text-neutral-800 dark:text-neutral-200",
                    fontWight: "bolder",
                    fontSize: "0.9rem",
                    marginTop: "0.5rem"
                  }}
                  hasErrored={password?.length <= 6}
                  onChange={(e: any) => {
                    const event: any = {
                      target: {
                        value: e
                      }
                    };
                    passwordChange(event);
                  }}
                  placeholder="------"
                  isInputNum={true}
                  numInputs={6}
                  separator={<div style={{ marginInline: "0.5rem" }} />}
                  containerStyle={{ direction: "ltr" }}
                />
                {passwordHasError && (
                  <p className="mt-1 text-red-900">{t("inValidPassword")}</p>
                )}
              </div>

              <div className={"w-[90%] translate-x-[-10px]"}>
                <span >{t("Confirm password")} *</span>
                <OtpInput
                  value={confirmPassword}
                  inputStyle={{
                    height: "2rem",
                    width: "1.9rem",
                    border: "1px solid rgb(67,56,202)",
                    borderRadius: 4,
                    color: "text-neutral-800 dark:text-neutral-200",
                    fontWight: "bolder",
                    fontSize: "0.9rem",
                    marginTop: "0.5rem"
                  }}
                  hasErrored={password?.length <= 6}
                  onChange={(e: any) => {
                    const event: any = {
                      target: {
                        value: e
                      }
                    };
                    confirmPasswordChange(event);
                  }}
                  placeholder="------"
                  isInputNum={true}
                  numInputs={6}
                  separator={<div style={{ marginInline: "0.5rem" }} />}
                  containerStyle={{ direction: "ltr" }}
                />
                {!!password && confirmPasswordHasError && (
                  <p className="mt-1 text-red-900">{t("notMatchedPassword")}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className={classes.element}>
                <span >{t("Password")} *</span>
                <OtpInput
                  value={password}
                  inputStyle={{
                    height: "3.5rem",
                    width: "3.5rem",
                    border: "1px solid rgb(67,56,202)",
                    borderRadius: 4,
                    color: "text-neutral-800 dark:text-neutral-200",
                    fontWight: "bolder",
                    fontSize: "1.5rem",
                    marginTop: "0.5rem"
                  }}
                  hasErrored={password?.length <= 6}
                  onChange={(e: any) => {
                    const event: any = {
                      target: {
                        value: e
                      }
                    };
                    passwordChange(event);
                  }}
                  placeholder="------"
                  isInputNum={true}
                  numInputs={6}
                  separator={<div style={{ marginInline: "0.5rem" }} />}
                  containerStyle={{ direction: "ltr" }}
                />
                {passwordHasError && (
                  <p className="mt-1 text-red-900">{t("inValidPassword")}</p>
                )}
              </div>

              <div className={classes.element}>
                <span>{t("Confirm password")} *</span>
                <OtpInput
                  value={confirmPassword}
                  inputStyle={{
                    height: "3.5rem",
                    width: "3.5rem",
                    border: "1px solid rgb(67,56,202)",
                    borderRadius: 4,
                    color: "text-neutral-800 dark:text-neutral-200",
                    fontWight: "bolder",
                    fontSize: "1.5rem",
                    marginTop: "0.5rem"
                  }}
                  hasErrored={password?.length <= 6}
                  onChange={(e: any) => {
                    const event: any = {
                      target: {
                        value: e
                      }
                    };
                    confirmPasswordChange(event);
                  }}
                  placeholder="------"
                  isInputNum={true}
                  numInputs={6}
                  separator={<div style={{ marginInline: "0.5rem" }} />}
                  containerStyle={{ direction: "ltr" }}
                />
                {!!password && confirmPasswordHasError && (
                  <p className="mt-1 text-red-900">{t("notMatchedPassword")}</p>
                )}
              </div>
            </>
          )}

          <button className={"btn-hover w-[50%] h-[50px] rounded-[20px] text-white max-sm:w-[100%] max-sm:h-[40px] max-sm:mt-[20px] max-sm:btn-hover "} type="submit">
            {t("continue")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageSignUp;
