function VerificationScreen() {
  return (
  
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-zinc-900 mx-auto max-w-lg rounded-md p-4">
        <form
          action="#"
          className="mb-0  space-y-4 rounded-lg p-4  sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium text-white">
            Account Verification
          </p>
          <p className="mx-auto mt-4 max-w-md text-center text-white">
            A verification Code has been sent to{" "}
            <a className="underline text-brandPrimary">
              nanakwameadjeipeprah@gmail.com
            </a>{" "}
            .Enter the code to verify your account.
          </p>

          <div>
            <label htmlFor="verify" className="sr-only">
              Verification
            </label>

            <div className="relative">
              <input
                type="digit"
                className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
                placeholder="Enter Verification Code"
              />
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-brandPrimary px-5 py-3 text-sm font-medium text-white"
          >
            Verify Shop
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerificationScreen;
