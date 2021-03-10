import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";

export const Homepage = () => {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    dispatch(setUserData(response.profileObj));
    dispatch(setSignedIn(true));
  };
  const responseGoogleerr = (response) => {
    console.error(response);
  };

  const isSignedIn = useSelector(selectSignedIn);
  return (
    <div>
      {!isSignedIn ? (
        <div className="flex flex-col h-screen justify-center items-center">
          <div>
            <h2 className="text-center text-4xl">📕</h2>
            <h1 className="text-7xl font-black text-center">
              A readers
              <br /> Favourite Place!
            </h1>
            <p className="text-2xl my-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              quidem.
            </p>
          </div>

          <GoogleLogin
            clientId="728152257178-vn0091asfjkgv9kd26p6m5g08flvp0ql.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className="bg-gray-900 text-gray-100 mt-4 px-4 py-2 rounded"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogleerr}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
