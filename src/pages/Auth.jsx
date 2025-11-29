import React, { useState } from "react";
import googlelogo from "../assets/googlelogo.png";
import { auth, provider } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup, // 👈 POPUP EKLEDİK
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (signUp) {
      // KAYIT OL
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/home");
        })
        .catch((err) => toast.error(err.code));
    } else {
      // GİRİŞ YAP
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setIsError(false);
          navigate("/home");
        })
        .catch((err) => {
          console.log("LOGIN ERROR:", err);
          toast.error(err.code);
          if (err.code === "auth/invalid-credential") {
            setIsError(true);
          }
        });
    }
  };

  // Google ile giriş
  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // 👈 POPUP
      console.log("GOOGLE USER:", result.user);
      navigate("/home");
    } catch (err) {
      console.log("GOOGLE LOGIN ERROR:", err);
      toast.error(err.code);
    }
  };

  // Şifre sıfırlama
  const handleReset = () => {
    if (!email) {
      toast.info("Lütfen önce email alanını doldurun.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Şifre sıfırlama e-postası gönderildi.");
      })
      .catch((err) => {
        console.log("RESET ERROR:", err);
        toast.error(err.code);
      });
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-black text-white flex flex-col gap-8 py-10 px-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <img className="h-[60px]" src="/twitterlogo.png" alt="Twitter Logo" />
        </div>

        {/* Başlık */}
        <h1 className=" text-center text-3xl font-bold">
          Twitter&apos;a giriş yapın
        </h1>

        {/* Google ile devam */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full border border-zinc-600 rounded-full py-2 px-4 flex items-center justify-center gap-3 hover:bg-zinc-900 transition"
          >
            <img className="h-[20px]" src={googlelogo} alt="Google Logo" />
            <span className="text-sm font-semibold">Google ile devam et</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-zinc-400">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              className="w-full bg-black border border-zinc-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-zinc-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full bg-black border border-zinc-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-sky-500 hover:bg-sky-600 transition py-2 text-sm font-semibold"
          >
            {signUp ? "Kayıt Ol" : "Giriş Yap"}
          </button>

          <p className="text-sm text-zinc-400 text-center mt-2">
            Hesabınız yok mu?{" "}
            <button
              type="button"
              onClick={() => {
                setSignUp(!signUp);
                setIsError(false);
              }}
              className="text-sky-500 cursor-pointer hover:underline"
            >
              {signUp ? "Giriş Yap" : "Kayıt Ol"}
            </button>
          </p>

          {/* Şifre sıfırlama */}
          {!signUp && isError && (
            <button
              type="button"
              className="text-red-400 cursor-pointer hover:underline text-sm mx-auto"
              onClick={handleReset}
            >
              Şifremi unuttum ?
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
