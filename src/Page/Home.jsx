import React, { useEffect, useState } from "react";
import CreateComponent from "../Components/CreateComponent";
import JoinRoom from "../Components/JoinRoom";
import { useNavigate } from "react-router-dom";
// import { getBrowserMetadata, getLocationMetadata, getNetworkMetadata, getScreenMetadata } from '../utils/Helper'

const Home = () => {
  const navigate = useNavigate();
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [isOpenJoimRoom, setIsOpenJoinRoom] = useState(false);
  return (
    <>
      <div className="w-screen h-screen bg-black/90 relative">
        {/* {JSON.stringify(metaData)} */}
        <div className="w-full h-full relative">
          <div className="w-1/4 h-1/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row gap-2">
            <div className="w-full h-full flex justify-center items-center">
              <p onClick={() => setIsOpenCreateRoom(true)} className="text-center px-5 py-2 text-white font-bold text-xl rounded-xl hover:cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg shadow-pink-500  mix-blend-multiply bg-blend-multiply">
                Create Room
              </p>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <p onClick={() => setIsOpenJoinRoom(true)} className="text-center px-5 py-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600  shadow-lg shadow-indigo-500  text-white font-bold text-xl rounded-xl hover:cursor-pointer">
                Join Room
              </p>
            </div>
          </div>
        </div>
      {isOpenCreateRoom && <CreateComponent setIsOpenCreateRoom={setIsOpenCreateRoom} />}
      {isOpenJoimRoom && <JoinRoom setIsOpenJoinRoom={setIsOpenJoinRoom} />}
      <div onClick={() => navigate('/documents')} className="hover:bg-gradient-to-t hover:from-red-700 hover:via-orange-600 hover:to-yellow-500 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 font-bold  absolute bottom-0 right-0 transform -translate-x-1/2 -translate-y-1/2 text-center px-5 py-2 text-white font-bold text-xl rounded-xl shadow-lg shadow-orange-500 hover:cursor-pointer">
        All Docs
      </div>
      </div>
    </>
  );
};

export default Home;
