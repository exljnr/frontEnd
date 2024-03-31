import React from "react";

function Header() {
  return (
    <div>
      <section className="bg-zinc-900">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
            Send Files for Printing with Fast and Secure File Transfer
            </h2>

            <p className="hidden text-white sm:mt-4 sm:block">
            Transfer your files securely and efficiently for printing. 
            Whether it's documents, images, or designs, ensure they reach their destination with speed and reliability. Experience hassle-free file transfer today.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
              <div className="flex justify-center">
                {" "}
                {/* Centering container */}
                <div className="flex space-x-10 text-center">
                  <a
                    href="/login"
                    type="submit"
                    className="group mt-4 flex items-center justify-center gap-2 rounded-md bg-brandPrimary px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
                  >
                    <span className="text-sm font-medium">Log In</span>
                  </a>

                  <a
                    href="/register"
                    type="submit"
                    className="group mt-4 flex items-center justify-center gap-2 rounded-md bg-brandPrimary px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
                  >
                    <span className="text-sm font-medium">Sign Up</span>
                  </a>
                </div>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
