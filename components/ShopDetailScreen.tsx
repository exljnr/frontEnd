import React, { useState } from "react";
import PrintPage from "./PrintScreen";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "./Loader";
import Modal from "./Modal";
import { ApiResponse } from "../server/apiTypes";
import { login } from "../server/login";

function ShopDetailPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPrintScreen, setShowPrintScreen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });
  const router = useRouter();

  const handleViewDetailsClick = () => {
    setShowConfirmation(true);
  };
  const closeModal = () => {
    setModalData({ title: "", message: "", isOpen: false, isSuccess: false });
  };

  useEffect(() => {
    const storedUserDataString = localStorage.getItem("savedData");
    if (storedUserDataString !== null) {
      const storedUserData = JSON.parse(storedUserDataString);
      setUserData(storedUserData);
    }
  }, []);

  const handleNoClick = () => {
    // Handle 'No' button click logic here
    setShowConfirmation(false); // Close the confirmation dialog
  };

  const handlePrint = () => {
    setShowPrintScreen(true);
    setTimeout(() => {
      window.print();
      setShowPrintScreen(false);
    }, 1500); // Adjust the timeout as needed
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const apiResponse: ApiResponse = await login(
        userData?.outletPhoneNumber,
        userData?.outletPassword
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
    <div>
      {showPrintScreen ? (
        <PrintPage />
      ) : (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 mx-auto max-w-lg rounded-md p-4">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl"></h1>

            <div className="mb-0 mt-33 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8">
              <p className="text-center text-white text-lg font-bold">
                Congratulations !
              </p>
              <p className="mx-auto mt-4 max-w-md text-center text-white">
                You have suceesfully created an account for your shop. Here is
                your unique <a className=" text-brandPrimary">QR Code</a>
              </p>
              <div
                className="text-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img width={200} height={200} src={userData?.outletUrl} />
              </div>

              <div className="flex justify-center items-center space-x-4">
                <button
                  className="inline-block rounded border border-brandPrimary px-12 py-3 text-sm  text-white focus:outline-none bg-brandPrimary"
                  onClick={handleLogin}
                >
                  Go to Dashboard
                </button>

                <a
                  onClick={handleViewDetailsClick}
                  className="cursor-pointer inline-block rounded border border-brandPrimary px-12 py-3 text-sm  text-white focus:outline-none bg-brandPrimary"
                >
                  View Details
                </a>
              </div>

              {showConfirmation && (
                <div className="rounded-lg bg-white p-8 shadow-1xl">
                  <h2 className="text-lg font-bold">Shop Details</h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Shope Name: {userData?.outletName}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Full Name: {userData?.outletOwnerName}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Phone Number: {userData?.outletPhoneNumber}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="rounded bg-red-700 px-4 py-2 text-sm font-medium text-white"
                      onClick={handleNoClick}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

export default ShopDetailPage;
