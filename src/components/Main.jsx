import React, { useEffect, useState } from "react";
import TweetForm from "./TweetForm";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import Post from "./Post";

const Main = () => {
  const [tweets, setTweets] = useState(null);

  const tweetsCol = collection(db, "tweets");
  useEffect(() => {
    // koleksiyondaki değişiklikleri dinle
    onSnapshot(tweetsCol, (snapshot) => {
      // canlı tweetleri saklamak için dizi
      const liveTweets = [];
      // snapshot içindeki her dokümanı liveTweets dizisine ekle
      snapshot.forEach((doc) => liveTweets.push({ ...doc.data(), id: doc.id }));
      setTweets(liveTweets);
    });
  }, []);

  return (
    <main>
      <header className="font-semibold text-l p-4 border border-zinc-800 text-center">
        Anasayfa
      </header>
      <TweetForm />

      {/* Yükleniyor durumu */}
      <div>{!tweets && <p className="p-4 text-zinc-500">Yükleniyor...</p>}</div>

      {/* atılan Tweet listesi */}
      {tweets?.map((tweet) => (
        <Post tweet={tweet} />
      ))}
    </main>
  );
};

export default Main;
