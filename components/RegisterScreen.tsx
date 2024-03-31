import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Modal from "./Modal";
import { useRouter } from "next/router";
import API_URLS from "../utils/baseUrls";

interface Data {
  outletName: string;
  outletOwner: string;
  outletPhoneNumber: string;
  outletPassword: string;
}

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });
  const router = useRouter();
  const { query } = router;

  const [editedOutletName, setEditedOutletName] = useState("");
  const [editedOutletOwner, setEditedOutletOwner] = useState("");
  const [editedOutletPhoneNumber, setEditedOutletPhoneNumber] = useState("");

  // Extract user data from query
  useEffect(() => {
    if (typeof query.outletName === "string") {
      setEditedOutletName(query.outletName);
    }
    if (typeof query.outletPhoneNumber === "string") {
      setEditedOutletPhoneNumber(query.outletPhoneNumber);
    }
    if (typeof query.outletOwner === "string") {
      setEditedOutletOwner(query.outletOwner);
    }
  }, [query]);

  const initialState: Data = {
    outletName: "",
    outletPhoneNumber: "",
    outletOwner: "",
    outletPassword: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const closeModal = () => {
    setModalData({ title: "", message: "", isOpen: false, isSuccess: false });
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const outletName = formData.get("outletName");
    const outletOwner = formData.get("outletOwner");
    const outletPhoneNumber = formData.get("outletPhoneNumber");
    const outletPassword = formData.get("outletPassword");

    const registrationData = {
      outletName,
      outletOwner,
      outletPhoneNumber,
      outletPassword,
    };

    setIsLoading(true);

    try {
      // Generate a 6-digit random code
      const otpCode = Math.floor(100000 + Math.random() * 900000);

      // Call your backend API to send OTP using fetch
      const response = await fetch(API_URLS.base + "/send_otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: outletPhoneNumber,
          code: otpCode,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setIsLoading(false);
        router.push({
          pathname: '/verify',
          query: { userName: outletPhoneNumber },
        });
        localStorage.setItem(
          "registrationData",
          JSON.stringify(registrationData)
        );
        localStorage.setItem("otpCode", JSON.stringify(otpCode));
      } else {
        setIsLoading(false);
        setModalData({
          title: "Error",
          message: "OTP request Failed. Kindly Try Again",
          isSuccess: false,
          isOpen: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle other errors
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-zinc-900 mx-auto max-w-lg rounded-md p-4">
        <form
            onSubmit={handleRegistration}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium text-white">
            Create an Account for your Shop
          </p>

          <div>
            <label htmlFor="shopename" className="sr-only">
              Shop Name
            </label>

            <div className="relative">
              <input
                name="outletName"
                id="outletName"
                value={editedOutletName}
                onChange={(e) => setEditedOutletName(e.target.value)}
                required
                maxLength={25}
                minLength={5}
                type="text"
                className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
                placeholder="Shop Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="fullname" className="sr-only">
              Full Name
            </label>

            <div className="relative">
              <input
                type="text"
                name="outletOwner"
                id="outletOwner"
                value={editedOutletOwner}
                onChange={(e) => setEditedOutletOwner(e.target.value)}
                required
                maxLength={25}
                minLength={5}
                className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
                placeholder="Full Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="sr-only">
              Phone Number
            </label>

            <div className="relative">
              <input
                type="digit"
                name="outletPhoneNumber"
                id="outletPhoneNumber"
                value={editedOutletPhoneNumber}
                onChange={(e) => setEditedOutletPhoneNumber(e.target.value)}
                maxLength={10}
                minLength={10}
                pattern="^[6789]\d{9}$"
                title="Enter a Valid 10-Digit Phone Number"
                className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
                placeholder="Phone Number"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="outletPassword"
                maxLength={10}
                minLength={8}
                pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Please enter a valid password with at least 8 characters (include a letter, a number, and a special character)."
                required
                className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
                placeholder="Create Password"
              />
            </div>
          </div>
          <div className='flex items-center text-white'>
                <div className='flex flex-grow items-center'>
                  <input
                    type='checkbox'
                    id='showPassword'
                    checked={showPassword}
                    onChange={handleTogglePassword}
                    className='mr-2'
                  />
                  <label htmlFor='showPassword '>Show Password</label>
                </div>
              </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-brandPrimary px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a className="underline text-brandPrimary" href="/login">
              Log In
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

export default RegisterPage;
