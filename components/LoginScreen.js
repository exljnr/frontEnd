function LoginPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-zinc-900 mx-auto max-w-lg rounded-md p-4">


        <form
          action="#"
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 m:p-6 lg:p-8"
        >
          <p className="text-center text-white text-lg font-medium">
            Sign in to your account
          </p>

          <div>
            <label htmlFor="email" className="sr-only">
              Phone Number
            </label>

            <div className="relative">
              <input
                type="email"
                required
                className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
                placeholder="Enter Phone Number"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
              required
                type="password"
                className=" bg-black text-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring focus:ring-brandPrimary"
                placeholder="Enter Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-brandPrimary px-5 py-3 text-sm font-medium text-white"
          >
            Log in
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?{" "}
            <a className="underline text-brandPrimary" href="/register">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
