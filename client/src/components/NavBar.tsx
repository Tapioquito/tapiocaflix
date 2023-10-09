import { useEffect, useState } from "react";

const tabs = [
  "Home",
  "Series",
  "Films",
  "New & Popular",
  "My List",
  "Browse by Languages",
];

export default function NavBar() {
  const [showBackground, setShowBackground] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 504) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    });
  }, []);
  return (
    <nav className="w-full  fixed z-40">
      <div
        className={`px-16 py-6 flex items-center ${
          showBackground ? "bg-black bg-opacity-90" : null
        }`}
      >
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
