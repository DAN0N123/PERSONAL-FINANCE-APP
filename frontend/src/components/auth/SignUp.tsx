import { useState } from "react";
import Icon from "../reusable/Icon";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(name: string, email: string, password: string) {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    } else {
      navigate("/login");
    }

    return await response.json();
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
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            registerUser(name, email, password);
          }}
        >
          <p className="text-preset-1 text-grey-900"> Sign Up </p>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <label
                htmlFor="name"
                className="text-preset-5-bold text-grey-500"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
                className="w-full border-[1px] border-beige-500 rounded-[8px] h-[45px] p-[8px] focus:outline-none focus:shadow-lg"
              />
            </div>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                Create Password
              </label>
              <div className="relative before:absolute before:bottom-[0] before:translate-y-[100%] before:right-0 before:content-password-msg before:text-preset-5 before:text-grey-500 ">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  autoComplete="off"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full border-[1px] border-beige-500 rounded-[8px] h-[45px] p-[8px] focus:outline-none focus:shadow-lg"
                />
                {showPassword ? (
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
            <button
              className="text-white text-preset-4-bold bg-grey-900 w-full rounded-[8px] h-[45px] mt-[40px]"
              type="submit"
            >
              Sign up
            </button>
            <div className="flex gap-[8px] self-center">
              <p className="text-preset-4 text-grey-500">
                Already have an account?{" "}
              </p>
              <Link
                to="/login"
                className="text-preset-4-bold text-grey-900 relative before:absolute before:w-full before:h-[2px] before:content-[''] before:bg-grey-900 before:bottom-0"
              >
                {" "}
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
