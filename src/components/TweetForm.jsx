import React from "react";
import { auth, db } from "../firebase/config";
import user from "../assets/user.jpg";
import { BsCardImage } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Cloudinary ayarları
const CLOUD_NAME = "djbqdfttj"; //  cloud name'in
const UPLOAD_PRESET = "twitter_unsigned"; //  Cloudinary'de oluşturulan unsigned preset adı
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const TweetForm = () => {
  const tweetsCol = collection(db, "tweets");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tweetContent = e.target[0].value.trim();
    const imageFile = e.target[1].files[0];

    // Hem text hem foto boşsa hiçbir şey yapma
    if (!tweetContent && !imageFile) return;

    let imageURL = null;

    // Fotoğraf seçilmişse önce Cloudinary'e yükle
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(UPLOAD_URL, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.secure_url) {
          imageURL = data.secure_url;
        } else {
          console.error("Cloudinary yükleme hatası:", data);
        }
      } catch (err) {
        console.error("Cloudinary upload error:", err);
      }
    }

    // Tweeti Firestore'a kaydet
    try {
      await addDoc(tweetsCol, {
        tweetContent,
        image: imageURL, // foto varsa url, yoksa null
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

      // Formu temizle
      e.target[0].value = "";
      e.target[1].value = "";
    } catch (err) {
      console.error("Tweet kaydetme hatası:", err);
    }
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
