import React, { useEffect, useState } from 'react';
import PrintPage from "./PrintScreen";

function SavedPage() {

  const [dataArray, setDataArray] = useState([
    {
      id: 1,
      filename: "File1.txt",
      username: "User1",
    },
    {
      id: 2,
      filename: "File2.txt",
      username: "User2",
    },
    {
      id: 2,
      filename: "File2.txt",
      username: "User2",
    },
    {
      id: 2,
      filename: "File2.txt",
      username: "User2",
    },
    {
      id: 2,
      filename: "File2.txt",
      username: "User2",
    },
    {
      id: 2,
      filename: "File2.txt",
      username: "User2",
    },
    {
      id: 2,
      filename: "File2.txt",
      username: "User2",
    },

  ]);

  const [showPrintScreen, setShowPrintScreen] = useState(false);



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
          <div className='p-5'>
            <div className='mt-4 grid grid-cols-1 lg:grid-cols-3'>
              <div className='h-16 items-center space-x-4 p-2 text-center'>
              <button
                  className='inline-block rounded-sm bg-brandPrimary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none'
                >
                 View QR Code
                </button>
                <button
                  className='inline-block rounded-sm bg-gray-400 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none'
                >
                  Refresh List
                </button>
              </div>

              <div className='h-16 text-center font-medium text-white'>
                <p>Easy Print Shop</p>
                <p>Febuary, 2023 23:00:78</p>
              </div>

              <div className='h-16 items-center space-x-4 p-2 text-center'>

                <button
                  className='inline-block rounded-sm bg-brandPrimary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none'
                >
                 Received
                </button>
                <button
                  className='inline-block rounded-sm bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none '
                >
                  LogOut
                </button>
              </div>
            </div>
            <div className='flex min-h-96 flex-col items-center justify-center'>
              {dataArray.length === 0 ? (
                <>
                  <p className='mb-10 mt-20 text-lg text-white '>
                    No Received Files Found for Easy Files
                  </p>
                  <button
                    className='inline-block rounded-sm bg-brandPrimary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none'
                  >
                    Load All Received Files
                  </button>
                </>
              ) : (
                <div className='container mx-auto mt-5 h-full w-full p-5 text-center'>
                  {/* Header row */}
                  <div className='flex p-2'>
                    <div className='flex-1 text-center font-semibold text-white'>
                      Received Files
                    </div>
                    <div className='flex-1 text-center font-semibold text-white'>
                      Sent By
                    </div>
                    <div className='flex-1 text-center font-semibold text-white'>
                      Actions
                    </div>
                  </div>

                  {/* Scrollable container */}
                  <div className='h-full overflow-auto '>
                    {/* Row 1 */}
                    {dataArray.map((data, index) => (
                      <div className='mb-2 mt-2 flex  bg-zinc-900 p-2 '>
                        <div className='flex-1 p-2 text-white'> {data.filename}</div>
                        <div className='flex-1 p-2 text-white'>{data.username}</div>
                        <div className='flex flex-1 items-center justify-center space-x-2'>
                          <button 
                          className='inline-block rounded-sm bg-green-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none'>
                            Download
                          </button>
                          <button
                            className='inline-block rounded-sm bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none'
                          >
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
    </div>
  );
}

export default SavedPage;