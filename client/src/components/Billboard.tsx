import BillboardButton from "./BillboardButton";
import aidoru from "../assets/aidoru.mp4";
export default function BillBoard() {
  return (
    <div className="relative h-screen">
      <video
        src={aidoru}
        className="w-full h-full object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted
        loop
      ></video>
      <div className="absolute top-[40%] left-[15px]" ml-16>
        <p className="text-white mt-8 mb-5 drop-shadow-x text-7xl">
          Watch Anime
        </p>
        <div className="flex items-center mt-4 gap-3">
          <BillboardButton text="Play" theme="light" />
          <BillboardButton text="More Info" theme="dark" />
        </div>
      </div>
    </div>
  );
}
