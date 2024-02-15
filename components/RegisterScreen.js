function RegisterPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
    <div className="bg-zinc-900 mx-auto max-w-lg rounded-md p-4">
      <form
        action="#"
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
              type="text"
              className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
              placeholder="Shop Name"
              required
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
              className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
              placeholder="Full Name"
              required
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
              className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
              placeholder="Phone Number"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="email"
              className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
              placeholder="Email"
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
              type="password"
              className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
              placeholder="Password"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmpassword" className="sr-only">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type="password"
              className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
              placeholder="Comfirm password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="block w-full rounded-lg bg-brandPrimary px-5 py-3 text-sm font-medium text-white"
        >
          Sign in
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account? {" "}
          <a className="underline text-brandPrimary" href="/login">
            Log In
          </a>
        </p>
      </form>
    </div>
  </div>
  );
}

export default RegisterPage;
