import React from "react";
import Nav from "../components/Nav";
import Aside from "../components/Aside";
import Main from "../components/Main";

const Feed = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto flex">
        {/* Sol Nav  */}
        <div className="w-56 shrink-0">
          <Nav />
        </div>

        {/* Orta Feed  */}
        <div className="flex-1 max-w-3xl border-x border-zinc-800">
          <Main />
        </div>

        {/* Sağ Aside  */}
        <div className="hidden lg:block w-72 shrink-0">
          <Aside />
        </div>
      </div>
    </div>
  );
};

export default Feed;
