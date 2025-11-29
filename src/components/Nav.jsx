import React from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { NavSections } from "../utils/NavSections";
import user from "../assets/user.jpg";

const Nav = () => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="flex flex-col justify-between h-[100vh] p-4 text-white">
      {/* Üst Nav Alanı */}
      <div className="flex flex-col gap-2">
        {/* Twitter Logo */}
        <img className="w-12 mb-4 ml-2" src="/twitterlogo.png" />

        {/* Navigasyon Elemanları */}
        {NavSections.map((section, i) => (
          <div
            key={i}
            className="flex items-center gap-4 text-xl py-3 px-4 rounded-full hover:bg-zinc-900 cursor-pointer transition-all"
          >
            <span className="text-2xl">{section.icon}</span>
            <span className="font-medium">{section.name}</span>
          </div>
        ))}
      </div>

      {/* Kullanıcı Kartı */}
      <div className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-zinc-900 cursor-pointer transition-all">
        {/* Profil Fotoğrafı */}
        <img
          className="rounded-full w-12 h-12 object-cover"
          src={auth?.currentUser?.photoURL ? auth?.currentUser?.photoURL : user}
          alt="profile-picture"
        />

        {/* Kullanıcı Bilgileri */}
        <div className="flex flex-col leading-none">
          <span className="font-semibold">
            {auth?.currentUser?.displayName}
          </span>
          <span className="text-sm text-zinc-400">
            @
            {auth?.currentUser?.displayName?.toLowerCase()
              ? auth?.currentUser?.displayName?.toLowerCase()
              : "user"}
          </span>
        </div>

        {/* Çıkış Yap */}
        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:text-red-500 hover:underline transition"
        >
          Çıkış
        </button>
      </div>
    </nav>
  );
};

export default Nav;
