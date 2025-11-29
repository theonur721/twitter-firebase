import React from "react";
import TweetForm from "./TweetForm";

const Main = () => {
  return (
    <main>
      <header className="font-bold p-4 border border-zinc-800">Anasayfa</header>
      <TweetForm />

      {/* atılan Tweet listesi */}
      <div>tweets</div>
    </main>
  );
};

export default Main;
