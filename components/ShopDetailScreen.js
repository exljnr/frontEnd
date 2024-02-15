import React, { useState } from 'react';
import PrintPage from './PrintScreen';

function ShopDetailPage() {

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPrintScreen, setShowPrintScreen] = useState(false);

  const handleViewDetailsClick = () => {
    setShowConfirmation(true);
  };


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


  return (
    <diV>
      {showPrintScreen ? (
        <PrintPage/>
      ): (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-zinc-900 mx-auto max-w-lg rounded-md p-4">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl"></h1>
  
          <form
            action="#"
            className="mb-0 mt-33 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8"
          >
            <p className="text-center text-white text-lg font-bold">
              Congratulations !
            </p>
            <p className="mx-auto mt-4 max-w-md text-center text-white">
              You have suceesfully created an account for your shop. Here is your
              unique <a className=" text-brandPrimary">QR Code</a>
            </p>
            <div
              className="text-center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                width={200}
                height={200}
                src="https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png"
              />
            </div>
  
            <div className="flex justify-center items-center space-x-4">
              <a
                className="inline-block rounded border border-brandPrimary px-12 py-3 text-sm  text-white focus:outline-none bg-brandPrimary"
                href="/login"
              >
                Go to Dashboard
              </a>
  
              <a
              onClick={handleViewDetailsClick}
                className="cursor-pointer inline-block rounded border border-brandPrimary px-12 py-3 text-sm  text-white focus:outline-none bg-brandPrimary"
              >
                View Details
              </a>
            </div>
  
            {showConfirmation && (
          <div className="rounded-lg bg-white p-8 shadow-1xl">
            <h2 className="text-lg font-bold">
              Shop Details
            </h2>
  
            <p className="mt-2 text-sm text-gray-500">
              Shope Name: Eazy Printing Shop
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Full Name: Essel Atta
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Email: atta@gmail.com
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Phone Number: 90675432256
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
  
  
          </form>
        </div>
      </div>
      )}

    </diV>

  );
}

export default ShopDetailPage;
