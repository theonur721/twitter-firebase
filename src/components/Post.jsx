import React from "react";
import { BsThreeDots } from "react-icons/bs";
import user from "../assets/user.jpg";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRetweet } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

const Post = ({ tweet }) => {
  const username = tweet?.user?.name ? tweet.user.name.toLowerCase() : "userss";

  return (
    <div className="flex gap-3 p-3 border-b border-zinc-800 hover:bg-zinc-900/60 transition-colors">
      <img
        className="w-11 h-11 rounded-full object-cover"
        src={tweet?.user?.picture || user}
        alt="profile"
      />

      <div className="w-full">
        {/* Üst kısım */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm">{tweet?.user?.name}</p>
            <p className="text-xs text-gray-400">@{username}</p>
            <p className="text-xs text-gray-500">1 saat önce</p>
          </div>

          <div className="hover:bg-zinc-800 p-2 transition rounded-full cursor-pointer">
            <BsThreeDots className="text-sm text-gray-400" />
          </div>
        </div>

        {/* Tweet içeriği */}
        <div className="mt-2 mb-3">
          <p className="text-[15px] leading-relaxed">{tweet?.tweetContent}</p>
        </div>

        {/* Aksiyon ikonları */}
        <div className="flex justify-between w-full pr-6 text-gray-400">
          <div className="hover:bg-sky-900/20 hover:text-sky-500 p-2 transition rounded-full cursor-pointer flex items-center">
            <BiMessageRounded className="text-[18px]" />
          </div>

          <div className="hover:bg-emerald-900/20 hover:text-emerald-500 p-2 transition rounded-full cursor-pointer flex items-center">
            <FaRetweet className="text-[18px]" />
          </div>

          <div className="hover:bg-rose-900/20 hover:text-rose-500 p-2 transition rounded-full cursor-pointer flex items-center">
            <AiOutlineHeart className="text-[18px]" />
          </div>

          <div className="hover:bg-zinc-800 hover:text-sky-500 p-2 transition rounded-full cursor-pointer flex items-center">
            <FiShare2 className="text-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
