import React from "react";
import { auth } from "../firebase/config";
import user from "../assets/user.jpg";
import { BsCardImage } from "react-icons/bs";

const TweetForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Tweet gönderme işlemleri burada yapılacak
    const tweetContent = e.target[0].value;
    const imageContent = e.target[1].files[0];
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 p-4 border-b border-zinc-800"
    >
      <img
        className="rounded-full h-[48px] w-[48px] object-cover"
        src={auth?.currentUser?.photoURL ? auth?.currentUser?.photoURL : user}
        alt=""
      />

      <div className="w-full">
        <input
          className="w-full my-2 text-xl text-gray-300 bg-black outline-none placeholder:text-zinc-500"
          placeholder="Neler oluyor?"
          type="text"
        />

        <div className="flex justify-between items-center mt-3">
          {/* Sol kısım (ikon veya dosya yükleme alanı) */}

          <div className="hover:bg-gray-800 transition p-4 cursor-pointer rounded-full">
            <label htmlFor="file-input" className="cursor-pointer">
              <BsCardImage />
            </label>
            <input
              id="file-input"
              type="file"
              className="hidden text-xs text-zinc-500 file:text-sky-500 file:cursor-pointer file:bg-transparent file:border-none"
            />
          </div>

          {/* Tweet butonu */}
          <button
            className="bg-sky-500 hover:bg-sky-600 transition px-4 py-1.5 rounded-full cursor-pointer font-semibold text-sm"
            type="submit"
          >
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
