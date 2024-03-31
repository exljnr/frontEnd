import React, { useEffect, useState } from "react";
import PrintPage from "./PrintScreen";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Loader from "./Loader";
import Modal from "./Modal";
import { deletesavedFile } from "../server/deletesavedFile";
import { getsavedFiles } from "../server/getsavedFiles";
import API_URLS from "../utils/baseUrls";
import { ApiResponse } from "../server/apiTypes";

const DynamicDateTimeComponent = dynamic(
  () => import("../components/DateTime"),
  {
    ssr: false,
  }
);

interface UserData {
  outletName: string;
  outletPhoneNumber: string;
  outletOwnerName: string;
}

function SavedPage() {
  const [userData, setUserData] = useState<UserData>(() => ({
    outletName: "",
    outletPhoneNumber: "",
    outletOwnerName: "",
  }));

  const [showPrintScreen, setShowPrintScreen] = useState(false);
  const [savedArray, setSavedArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    isOpen: false,
    isSuccess: false,
  });
  const router = useRouter();

  useEffect(() => {
    const storedUserDataString = localStorage.getItem("userData");
    const storedUserData =
      storedUserDataString !== null ? JSON.parse(storedUserDataString) : {};
    // Check if userData exists in local storage
    if (!storedUserData.outletName) {
      // Redirect to the login page if userData is not present
      router.push("/outlet-auth");
    } else {
      setUserData(storedUserData);

      const fetchData = async () => {
        setIsLoading(true);

        try {
          const apiResponse = await getsavedFiles(
            storedUserData.outletPhoneNumber
          );
          if (apiResponse.success) {
            setSavedArray(apiResponse.body);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [router]);

  const handleDownloadFile = (fileId: any) => async () => {
    // Open a new tab and navigate to the download endpoint
    const popup = window.open(
      `${API_URLS.base}/download_saved_file?phoneNumber=${userData?.outletPhoneNumber}&file_id=${fileId}`,
      "_blank"
    );

    // Close the pop-up after a short delay (adjust timing as needed)
    setTimeout(() => {
      if (popup && !popup.closed) {
        popup.close();
      }
    }, 5000); // Close after 5 seconds (adjust as needed)
  };
  const handleDeleteFile = (fileId: string, filename: any) => async () => {
    setIsLoading(true);
    try {
      // Perform delete operation using fileId
      const apiResponse = await deletesavedFile(
        userData?.outletPhoneNumber,
        fileId
      );
      if (apiResponse.success) {
        try {
          const apiResponse: ApiResponse = await getsavedFiles(
            userData?.outletPhoneNumber
          );
          if (apiResponse.success) {
            setSavedArray(apiResponse.body);
            setModalData({
              title: "Success",
              message: `File with ID ${filename} deleted successfully`,
              isSuccess: true,
              isOpen: true,
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setModalData({
          title: "Error",
          message: `Failed to delete file with ID ${fileId}`,
          isSuccess: false,
          isOpen: true,
        });
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const closeModal = () => {
    setModalData({ title: "", message: "", isOpen: false, isSuccess: false });
  };

  const handleReceivedFiles = () => {
    router.push("/dashboard/recieved");
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push({
      pathname: "/login",
    });
  };

  const handlePrint = () => {
    setShowPrintScreen(true);
    setTimeout(() => {
      window.print();
      setShowPrintScreen(false);
    }, 1500); // Adjust the timeout as needed
  };

  return (
    <div>
      {showPrintScreen ? (
        <PrintPage />
      ) : (
        <div>
          <div className="p-5">
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3">
              <div className="h-16 items-center space-x-4 p-2 text-center">
                <button
                  onClick={handlePrint}
                  className="inline-block rounded-sm bg-brandPrimary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none"
                >
                  View QR Code
                </button>
                <button
                  onClick={handleReceivedFiles}
                  className="inline-block rounded-sm bg-gray-400 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none"
                >
                  Refresh List
                </button>
              </div>

              <div className="h-16 text-center font-medium text-white">
                <p>{userData?.outletName}</p>
                <DynamicDateTimeComponent />
              </div>

              <div className="h-16 items-center space-x-4 p-2 text-center">
                <button
                  onClick={handleReceivedFiles}
                  className="inline-block rounded-sm bg-brandPrimary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none"
                >
                  Received
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-block rounded-sm bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none "
                >
                  LogOut
                </button>
              </div>
            </div>
            <div className="flex min-h-96 flex-col items-center justify-center">
              {savedArray.length === 0 ? (
                <>
                  <p className="mb-10 mt-20 text-lg text-white ">
                    No Received Files Found for {userData?.outletName}
                  </p>
                  <button className="inline-block rounded-sm bg-brandPrimary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none">
                    Load All Received Files
                  </button>
                </>
              ) : (
                <div className="container mx-auto mt-5 h-full w-full p-5 text-center">
                  {/* Header row */}
                  <div className="flex p-2">
                    <div className="flex-1 text-center font-semibold text-white">
                      Received Files
                    </div>
                    <div className="flex-1 text-center font-semibold text-white">
                      Sent By
                    </div>
                    <div className="flex-1 text-center font-semibold text-white">
                      Actions
                    </div>
                  </div>

                  {/* Scrollable container */}
                  <div className="h-full overflow-auto ">
                    {/* Row 1 */}
                    {savedArray.map((data, index) => (
                      <div className="mb-2 mt-2 flex  bg-zinc-900 p-2 ">
                        <div className="flex-1 p-2 text-white">
                          {" "}
                          {data.filename}
                        </div>
                        <div className="flex-1 p-2 text-white">
                          {data.username}
                        </div>
                        <div className="flex flex-1 items-center justify-center space-x-2">
                          <button 
                          onClick={handleDownloadFile(data.file_id)}
                          className="inline-block rounded-sm bg-green-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none">
                            Download
                          </button>
                          <button 
                            onClick={handleDeleteFile(data.file_id,data.filename)}
                          className="inline-block rounded-sm bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
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

export default SavedPage;
