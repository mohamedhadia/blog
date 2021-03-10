import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import { GoogleLogout } from "react-google-login";

const Navbar = () => {
  const dispatch = useDispatch();

  const logout = (response) => {
    dispatch(setUserData(null));
    dispatch(setSignedIn(false));
  };
  const [inputValue, setInputValue] = useState("tech");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };
  return (
    <div className="bg-gray-900">
      <div className=" px-4 h-36  flex flex-wrap md:flex-nowrap md:h-20  items-center container mx-auto">
        {/* head title */}
        <div className=" w-1/2">
          <h1 className="text-xl font-black text-gray-100">AxudaStudio</h1>
        </div>

        {/* login details */}

        <div className="w-1/2 md:order-3">
          {isSignedIn ? (
            <div className="justify-end items-center flex">
              <div className="text-gray-100 flex">
                <img
                  className="w-10 h-10 rounded-full border-green-500 border-2"
                  src={userData?.imageUrl}
                  alt={userData?.name}
                />
                <h3 className="m-2">{userData?.givenName}</h3>
              </div>

              <GoogleLogout
                clientId="728152257178-vn0091asfjkgv9kd26p6m5g08flvp0ql.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    className="bg-gray-800 text-gray-100 px-4 py-2 rounded"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Logout
                  </button>
                )}
                buttonText="Logout"
                onLogoutSuccess={logout}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        {/* search input */}

        <div className="w-full ">
          {isSignedIn && (
            <div className="flex-grow relative md:p-20 justify-center flex">
              <input
                className="flex-grow w-full rounded shadow-sm text-gray-100 bg-gray-800 border-none focus:ring-gray-800"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="absolute right-2 md:right-24 mt-1 bg-gray-900 p-1 text-gray-100 rounded border-none focus:ring-gray-800"
                onClick={handleClick}
              >
                Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
