import { useRouter } from "next/router";
import React, { useState } from "react";
import { ApiResponse } from "../server/apiTypes";
import { useEffect } from "react";
import API_URLS from "../utils/baseUrls";
import Modal from "./Modal";
import Loader from "./Loader";
import { register } from "../server/register";

interface Data {
  outletName: string;
  outletPhoneNumber: string;
  outletOwner: string;
  outletPassword: string;
}

function VerificationScreen() {
  const router = useRouter();
  const { query } = router;
  const userName = (query.userName as string) || "";
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });

  const initialState: Data = {
    outletName: "",
    outletPhoneNumber: "",
    outletOwner: "",
    outletPassword: "",
  };

  const [Data, setData] = useState(initialState);

  useEffect(() => {
    const storedUserDataString = localStorage.getItem("registrationData");
    if (storedUserDataString !== null) {
      const storedUserData = JSON.parse(storedUserDataString);
      setData(storedUserData);
    }
  }, []);

  const [resendCountdown, setResendCountdown] = useState(30); //15000
  const closeModal = () => {
    setModalData({ title: "", message: "", isOpen: false, isSuccess: false });
  };

  useEffect(() => {
    let countdownInterval;

    if (resendCountdown > 0) {
      countdownInterval = setInterval(() => {
        setResendCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [resendCountdown]);

  const handleResendOTP = async () => {
    setResendCountdown(30);
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
          phoneNumber: Data.outletPhoneNumber,
          code: otpCode,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setIsLoading(false);
        setModalData({
          title: "Success",
          message: "OTP Successfully Sent via SMS",
          isSuccess: true,
          isOpen: true,
        });
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

  const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const otpInput = formData.get("otpInput") as string;
    setIsLoading(true);

    const storedOtpCode = localStorage.getItem("otpCode");

    if (otpInput === storedOtpCode) {
      console.log("Success! OTP matched.");

      const baseUrl = "https://filesharing-mpqa9pzlc-exljnrs-projects.vercel.app/upload"; //Remember to change localhost to production
      let qrData = `${baseUrl}?phoneNumber=${Data.outletPhoneNumber}`;
      let qrSize = "250x250";
      let charsetSource = "ISO-8859-1";
      let charsetTarget = "UTF-8";
      let format = "svg";
      let margin = "2";
      let qZone = "2";
      let url = `https://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=${qrSize}&charset-source=${charsetSource}&charset-target=${charsetTarget}&format=${format}&margin=${margin}&qzone=${qZone}`;

      // Use fetch to get the QR code image
      fetch(url)
        .then(async (response) => {
          if (response.status == 200) {
            const url = response.url;
            try {
              const apiResponse: ApiResponse = await register(
                Data.outletName,
                Data.outletOwner,
                Data.outletPhoneNumber,
                Data.outletPassword,
                url
              );
              if (apiResponse.success) {
                localStorage.setItem(
                  "savedData",
                  JSON.stringify(apiResponse.body)
                );
                router.push("/shop-details");
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
          } else {
            setModalData({
              title: "Error",
              message: "An error occurred while generating QR Code. Try Agin.",
              isSuccess: false,
              isOpen: true,
            });
          }
        })
        .catch((error) => {
          console.error("An error occurred while generating QR Code", error);
        });
    } else {
      console.error("Error! OTP does not match.");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-zinc-900 mx-auto max-w-lg rounded-md p-4">
        <form
          onSubmit={handleVerify}
          className="mb-0  space-y-4 rounded-lg p-4  sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium text-white">
            Account Verification
          </p>
          <p className="mx-auto mt-4 max-w-md text-center text-white">
            A verification Code has been sent to{" "}
            <a className="underline text-brandPrimary">{userName}</a> .Enter the
            code to verify your account.
          </p>

          <div>
            <label htmlFor="verify" className="sr-only">
              Verification
            </label>

            <div className="relative">
              <input
                type="digit"
                name="otpInput"
                maxLength={6}
                minLength={6}
                pattern="^\d{6}$"
                required
                className="text-center bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
                placeholder="Enter Verification Code"
              />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-end font-medium text-white">
            {resendCountdown === 0 ? (
              <button onClick={handleResendOTP}>Resend OTP</button>
            ) : (
              <span className="text-gray-400">
                Resend OTP in {Math.floor(resendCountdown / 60)}:
                {(resendCountdown % 60).toString().padStart(2, "0")}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-brandPrimary px-5 py-3 text-sm font-medium text-white"
          >
            Verify Shop
          </button>
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

export default VerificationScreen;
