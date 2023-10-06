const tabs = [
  "Home",
  "Series",
  "Films",
  "New & Popular",
  "My List",
  "Browse by Languages",
];

export default function NavBar() {
  return (
    <nav className="w-full  fixed z-40">
      <div className="px-16 py-6 flex items-center  ">
        <img
          className="h-12"
          src="https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png"
          alt="netflix-logo"
        />
        <div className=" flex gap-7 ml-8">
          {tabs.map((tab) => (
            <div
              key={tab}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
