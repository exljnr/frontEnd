
import React, { useState,useEffect } from 'react';


interface Data {
  outletName: string;
  outletPhoneNumber: string;
  outletOwner: string;
  outletPassword: string;
  landMark: string;
  outletUrl:string;
}

interface UserData {
  outletName: string;
  outletPhoneNumber: string;
  outletOwnerName: string;
  outletPassword: string;
  outletUrl:string;
}

function PrintPage() {

  const [Data, setData] = useState<Data>(() => ({
    outletName: '',
    outletPhoneNumber: '',
    outletOwner: '',
    outletPassword: '',
    landMark: '',
    outletUrl: ''
  }));

  const [userData, setUserData] = useState<UserData>(() => ({
    outletName: '',
    outletPhoneNumber: '',
    outletOwnerName: '',
    outletPassword:'',
    outletUrl:''
  }));



  useEffect(() => {
    const storedUserData =
      JSON.parse(localStorage.getItem('savedData')) || {};
    setData(storedUserData);
  }, []);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};
    setUserData(storedUserData);
  }, []);

  
  return (
      <div className=' bg-white mb-40'>
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-lg'>
            <h1 className='text-center text-2xl font-bold text-darkPurple sm:text-3xl'>
              File Share
            </h1>
  
            <p className='mx-auto mt-4 max-w-md  text-center text-lg font-medium'>
            Shop Name :  {Data?.outletName || userData?.outletName}
            </p>
            <p className='mx-auto mt-1 max-w-md  text-center text-lg font-medium'>
            Shop Phone Number : <span className='text-brandPrimary'> {Data?.outletPhoneNumber ||userData?.outletPhoneNumber}</span>
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
                width={400}
                height={400}
                src={Data?.outletUrl || userData?.outletUrl}
              />
            </div>
  
              <p className='mx-auto mt-8 max-w-md px-4 text-center text-2xl  font-semibold'>
                Scan QR Code with Google Lens or Apple Camera to Share files
              </p>

            </div>
          </div>
        </div>
    );
  };

export default PrintPage;

