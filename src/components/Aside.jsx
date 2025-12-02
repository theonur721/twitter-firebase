import React from "react";

const trends = [
  {
    title: "#reactjs",
    category: "Türkiye gündeminde",
    tweets: "12,3 B Tweet",
  },
  {
    title: "#javascript",
    category: "Teknoloji · Gündem",
    tweets: "8,7 B Tweet",
  },
  {
    title: "#firebase",
    category: "Yazılım · Gündem",
    tweets: "3,1 B Tweet",
  },
  {
    title: "#tailwindcss",
    category: "Frontend · Gündem",
    tweets: "2,4 B Tweet",
  },
  {
    title: "#twitterclone",
    category: "Senin için gündem",
    tweets: "987 Tweet",
  },
];

const Aside = () => {
  return (
    <aside className="hidden lg:block px-4 py-2">
      {/* Arama kutusu */}
      <div className="sticky top-0 bg-black/80 backdrop-blur pb-2 z-10">
        <div className="bg-zinc-900 rounded-full px-4 py-2 flex items-center gap-2">
          <span className="text-zinc-500 text-sm">Ara</span>
          <input
            type="text"
            placeholder="Twitter'da ara"
            className="bg-transparent outline-none text-sm text-zinc-200 placeholder:text-zinc-500 w-full"
          />
        </div>
      </div>

      {/* Gündemler kutusu */}
      <div className="mt-4 bg-zinc-900 rounded-2xl overflow-hidden">
        <h2 className="text-xl font-bold px-4 py-3">
          İlgini çekebilecek gündemler
        </h2>

        {trends.map((trend, index) => (
          <div
            key={trend.title + index}
            className="px-4 py-3 hover:bg-zinc-800/80 cursor-pointer transition flex flex-col gap-1"
          >
            <span className="text-xs text-zinc-500">{trend.category}</span>
            <span className="text-sm font-semibold">{trend.title}</span>
            <span className="text-xs text-zinc-500">{trend.tweets}</span>
          </div>
        ))}

        <button className="w-full text-left text-sm text-sky-500 hover:bg-zinc-800/80 px-4 py-3 transition">
          Daha fazla göster
        </button>
      </div>

      {/* Alt telif / linkler */}
      <div className="mt-4 text-xs text-zinc-500 flex flex-wrap gap-x-3 gap-y-1 px-2">
        <span>Şartlar</span>
        <span>Gizlilik</span>
        <span>Çerezler</span>
        <span>Reklam bilgisi</span>
        <span>Daha fazla ·</span>
        <span>© {new Date().getFullYear()} Twitter Clone</span>
      </div>
    </aside>
  );
};

export default Aside;
