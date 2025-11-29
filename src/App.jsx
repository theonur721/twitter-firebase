import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

const App = () => {
  const navigate = useNavigate();
  // kullanıcının oturumunu izleme
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Feed />} />
    </Routes>
  );
};

export default App;
