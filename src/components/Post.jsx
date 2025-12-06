import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import user from "../assets/user.jpg";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRetweet } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import moment from "moment";
import "moment/locale/tr";

moment.locale("tr");

const Post = ({ tweet }) => {
  const [isLiked, setIsliked] = useState(false);
  const date = tweet?.createdAt?.toDate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const found = tweet?.likes?.find(
      (userId) => userId === auth.currentUser.uid
    );
    setIsliked(!!found);
  }, [tweet]);

  const toggleLike = () => {
    const tweetRef = doc(db, "tweets", tweet.id);
    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  const handleDelete = () => {
    const tweetRef = doc(db, "tweets", tweet.id);
    deleteDoc(tweetRef);
    setShowMenu(false);
  };

  const username = tweet?.user?.name ? tweet.user.name.toLowerCase() : "userss";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-3 p-3 border-b border-zinc-800 hover:bg-zinc-900/60 transition-colors relative">
      <img
        className="w-11 h-11 rounded-full object-cover"
        src={tweet?.user?.picture || user}
        alt="profile"
      />

      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm">{tweet?.user?.name}</p>
            <p className="text-xs text-gray-400">@{username}</p>
            <p className="text-xs text-gray-500">{moment(date).fromNow()}</p>
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <div ref={menuRef} className="relative">
              <BsThreeDots
                onClick={() => setShowMenu(!showMenu)}
                className="text-sm text-gray-400 hover:text-white cursor-pointer"
              />

              {showMenu && (
                <div className="absolute right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl w-32 overflow-hidden">
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-zinc-800 text-sm"
                  >
                    Sil
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-2 mb-3">
          <p className="text-[15px] leading-relaxed">{tweet?.tweetContent}</p>

          {tweet?.image && (
            <img
              src={tweet.image}
              alt="tweet"
              className="mt-2 rounded-2xl border border-zinc-800 max-h-96 w-full object-cover"
            />
          )}
        </div>

        <div className="flex justify-between w-full pr-6 text-gray-400">
          <div className="hover:bg-sky-900/20 hover:text-sky-500 p-2 rounded-full cursor-pointer flex items-center">
            <BiMessageRounded className="text-[18px]" />
          </div>

          <div className="hover:bg-emerald-900/20 hover:text-emerald-500 p-2 rounded-full cursor-pointer flex items-center">
            <FaRetweet className="text-[18px]" />
          </div>

          <div
            onClick={toggleLike}
            className="hover:bg-rose-900/20 hover:text-rose-500 p-2 rounded-full cursor-pointer flex items-center gap-1"
          >
            {isLiked ? (
              <FcLike className="text-[18px]" />
            ) : (
              <AiOutlineHeart className="text-[18px]" />
            )}
            {tweet.likes.length > 0 && (
              <span className="text-xs">{tweet.likes.length}</span>
            )}
          </div>

          <div className="hover:bg-zinc-800 hover:text-sky-500 p-2 rounded-full cursor-pointer flex items-center">
            <FiShare2 className="text-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
