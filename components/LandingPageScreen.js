function LandingPage() {
  return (
    <>

<section className="text-white">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="text-white bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        File Share System

      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
        numquam ea!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="rounded-md border-2 border-brandPrimary w-28 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandPrimary"
          href="/login"
        >
          Log In
        </a>

        <a
          className="block w-full rounded border border-brandPrimary px-12 py-3 text-sm font-medium text-white hover:bg-brandPrimary focus:outline-none focus:ring active:bg-brandPrimary sm:w-auto"
          href="#"
        >
          Register
        </a>
      </div>
    </div>
  </div>
</section>

    </>
  );
}

export default LandingPage
