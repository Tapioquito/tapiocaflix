export default function HomeBanner() {
  return (
    <div className="h-sreen w-screen relative">
      <img
        className="w-full h-full"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/893a42ad-6a39-43c2-bbc1-a951ec64ed6d/4cd34f21-a67b-4f81-96d1-40c4e81f8728/BR-pt-20231002-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="background"
      />
      <div className="absolute h-full w-full bg-black bg-opacity-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-bold text-5xl">
            Unlimited movies, TV Shows and more!
          </h1>
          <p className=" text-white text-3xl mt-3">
            Watch anywhere, Cancel Anytime
          </p>
          <div className="mt-8">
            <a
              className="bg-red-700 mt-8 text-white p-4 px-16 text-lg rounded font-semi-bold"
              href="/login"
            >
              Signup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
