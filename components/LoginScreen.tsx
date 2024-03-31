import React, { useEffect, useState } from "react";
import { ApiResponse } from "../server/apiTypes";
import { login } from "../server/login";
import Loader from "./Loader";
import Modal from "./Modal";
import { useRouter } from "next/router";

interface Data {
  outletName: string;
  outletOwner: string;
  outletPhoneNumber: string;
  outletPassword: string;
}

function LoginPage() {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });
  const router = useRouter();
  const { query } = router;

  const initialState: Data = {
    outletName: "",
    outletPhoneNumber: "",
    outletOwner: "",
    outletPassword: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleToggleLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const closeModal = () => {
    setModalData({ title: "", message: "", isOpen: false, isSuccess: false });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const outletPhoneNumber = formData.get("outletPhoneNumber") as string;
    const outletPassword = formData.get("outletPassword") as string;
    setIsLoading(true);
    try {
      const apiResponse: ApiResponse = await login(
        outletPhoneNumber,
        outletPassword
      );
      if (apiResponse.success) {
        // Save user data in local storage
        localStorage.setItem("userData", JSON.stringify(apiResponse.body));

        // Redirect to the login page
        router.push("/dashboard/recieved");
      } else {
        const errorMessage = apiResponse["body"]["error"];
        setModalData({
          title: "Error",
          message: errorMessage,
          isSuccess: false,
          isOpen: true,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-zinc-900 mx-auto max-w-lg rounded-md p-4">
        <form
              onSubmit={handleLogin}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 m:p-6 lg:p-8"
        >
          <p className="text-center text-white text-lg font-medium">
            Sign in to your account
          </p>

          <div>
            <label htmlFor="email" className="sr-only">
              Phone Number
            </label>

            <div className="relative">
              <input
                type="digit"
                name="outletPhoneNumber"
                maxLength={10}
                minLength={10}
                pattern="^[6789]\d{9}$"
                title="Enter a Valid 10-Digit Phone Number"
                required
                className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
                placeholder="Enter Phone Number"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type={showLoginPassword ? "text" : "password"}
                name="outletPassword"
                placeholder="Enter Password"
                maxLength={10}
                minLength={8}
                pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Please enter a valid password with at least 8 characters(include a letter, a number, and a special character)."
                required
                className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
              />
            </div>
          </div>
          <div className='flex items-center text-white'>
        <div className='ml-auto flex flex-grow items-center'>
          <input
            type='checkbox'
            id='showLoginPassword'
            checked={showLoginPassword}
            onChange={handleToggleLoginPassword}
            className='mr-2 text-darkGreen'
          />
          <label htmlFor='showPassword'>Show Password</label>
        </div>
      </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-brandPrimary px-5 py-3 text-sm font-medium text-white"
          >
            Log in
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?{" "}
            <a className="underline text-brandPrimary" href="/register">
              Sign up
            </a>
          </p>
        </form>
      </div>
      {isLoading && <Loader />}
      {modalData.isOpen && (
        <Modal
          title={modalData.title}
          message={modalData.message}
          onClose={closeModal}
          isSuccess={modalData.isSuccess}
        />
      )}
    </div>
  );
}

export default LoginPage;
