

function PrintPage() {
  return (
      <div className=' bg-white mb-40'>
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-lg'>
            <h1 className='text-center text-2xl font-bold text-darkPurple sm:text-3xl'>
              File Share
            </h1>
  
            <p className='mx-auto mt-4 max-w-md  text-center text-lg font-medium'>
              Shop Name :  Easy Print Shop
            </p>
            <p className='mx-auto mt-1 max-w-md  text-center text-lg font-medium'>
              Shop Phone Number : <span className='text-darkGreen'> 9086653432</span>
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
                width={300}
                height={300}
                src="https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png"
              />
            </div>
  
              <p className='mx-auto mt-4 max-w-md px-4 text-center text-lg  font-semibold'>
                Scan QR Code with Google Lens or Apple Camera to Share files
              </p>
              <p className='mx-auto max-w-md  text-center text-lg font-semibold'>
                OR
              </p>
              <p className='mx-auto mt-4 w-3/6 text-center text-lg font-semibold'>
              Visit :www.bit.ly.com to share files
              </p>
            </div>
          </div>
        </div>
    );
  };

export default PrintPage;
