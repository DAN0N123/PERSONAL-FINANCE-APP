import { useContext, useState } from "react";
import Icon from "../reusable/Icon";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { UserContext } from "../misc/UserContext";
export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext is not provided");
  }
  const { setUser } = userContext;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  async function loginUser(email: string, password: string) {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    } else {
      setUser(data.user);
      navigate("/");
    }
  }

  return (
    <div className="relative bg-[#F8F4F0] flex items-center justify-center h-full w-full overflow-hidden">
      <div className="absolute top-0 w-full bg-grey-900 rounded-b-[16px] grid place-content-center h-[70px] xl:hidden">
        <Icon variant="logo-large" width="122px" color="white" />
      </div>
      <span className="relative flex justify-start w-fit h-min rounded-t-[16px] hidden xl:block p-[16px]">
        <img
          src="../../mentor-starter-code/assets/images/logo-large.svg"
          width="122px"
          color="white"
          className="absolute top-[50px] left-[40px] mt-[16px]"
        />
        <img
          src="../../mentor-starter-code/assets/images/illustration-authentication.svg"
          className="min-h-[90vh] w-auto"
        />
        <div className="flex flex-col absolute bottom-[70px] gap-[16px] left-[40px] w-[70%]">
          <p className="text-preset-1 text-white">
            {" "}
            Keep track of your money and save for your future
          </p>
          <p className="text-preset-4 text-white">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </span>
      <div className="flex justify-center items-center w-full pl-[20px] pr-[20px] md:pl-[100px] md:pr-[100px] xl:flex-1 xl:pl-[10%] xl:pr-[10%] xl:max-w-[1200px]">
        <form
          className="w-full h-fit bg-white rounded-[12px] pl-[20px] pr-[20px] pt-[24px] pb-[24px] flex flex-col gap-[32px]"
          onSubmit={(e) => {
            e.preventDefault();
            loginUser(email, password);
          }}
        >
          <p className="text-preset-1 text-grey-900"> Login </p>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <label
                htmlFor="email"
                className="text-preset-5-bold text-grey-500"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full border-[1px] border-beige-500 rounded-[8px] h-[45px] p-[8px] focus:outline-none focus:shadow-lg"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label
                htmlFor="password"
                className="text-preset-5-bold text-grey-500"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  autoComplete="off"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full border-[1px] border-beige-500 rounded-[8px] h-[45px] p-[8px] focus:outline-none focus:shadow-lg"
                />
                {showPassword ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(false);
                    }}
                  >
                    <img
                      src="../../mentor-starter-code/assets/images/icon-show-password.svg"
                      className="absolute right-[20px] top-1/2 translate-y-[-50%]"
                    />
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(true);
                    }}
                  >
                    <img
                      src="../../mentor-starter-code/assets/images/icon-hide-password.svg"
                      className="absolute right-[20px] top-1/2 translate-y-[-50%]"
                    />
                  </button>
                )}
              </div>
            </div>
            <button className="text-white text-preset-4-bold bg-grey-900 w-full rounded-[8px] h-[45px]">
              Login
            </button>
            <div className="flex gap-[8px] self-center">
              <p className="text-preset-4 text-grey-500">
                Need to create an account?{" "}
              </p>
              <Link
                to="/signup"
                className="text-preset-4-bold text-grey-900 relative before:absolute before:w-full before:h-[2px] before:content-[''] before:bg-grey-900 before:bottom-0"
              >
                {" "}
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
