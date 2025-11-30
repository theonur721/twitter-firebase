import React from "react";
import { auth, db } from "../firebase/config";
import user from "../assets/user.jpg";
import { BsCardImage } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const TweetForm = () => {
  const tweetsCol = collection(db, "tweets");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tweet gönderme işlemleri burada yapılacak
    const tweetContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // koleksiyona döküman ekler
    addDoc(tweetsCol, {
      tweetContent,
      createdAt: serverTimestamp(),
      user: {
        id: auth?.currentUser?.uid,
        name: auth?.currentUser?.displayName,
        picture: auth?.currentUser?.photoURL
          ? auth?.currentUser?.photoURL
          : user,
      },
      likes: [],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-3 border-b border-zinc-800"
    >
      <img
        className="rounded-full h-[40px] w-[40px] object-cover"
        src={auth?.currentUser?.photoURL ? auth?.currentUser?.photoURL : user}
        alt=""
      />

      <div className="w-full">
        <input
          className="w-full my-1 text-base text-gray-300 bg-black outline-none placeholder:text-zinc-500"
          placeholder="Neler oluyor?"
          type="text"
        />

        <div className="flex justify-between items-center mt-2">
          {/* Sol kısım (ikon veya dosya yükleme alanı) */}
          <div className="hover:bg-gray-800 transition p-2 cursor-pointer rounded-full">
            <label htmlFor="file-input" className="cursor-pointer">
              <BsCardImage className="text-lg" />
            </label>
            <input
              id="file-input"
              type="file"
              className="hidden text-xs text-zinc-500 file:text-sky-500 file:cursor-pointer file:bg-transparent file:border-none"
            />
          </div>

          {/* Tweet butonu */}
          <button
            className="bg-sky-500 hover:bg-sky-600 transition px-3 py-1 rounded-full cursor-pointer font-semibold text-xs"
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
