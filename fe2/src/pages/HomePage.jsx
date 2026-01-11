import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import bgImage from "../assets/maja.webp";
import slide1 from "../assets/badut.jpg";
import slide2 from "../assets/meme.jpg";
import slide3 from "../assets/pp1.jpg";

const HomePage = () => {
  const [barang, setBarang] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dataBarang");

      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setBarang(parsed);
        } else {
          setBarang([]);
        }
      } else {
        setBarang([]);
      }
    } catch (err) {
      console.error("Error parsing dataBarang:", err);
      setBarang([]);
    }
  }, []);

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-5xl w-full bg-slate-900/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8">

          <div className="relative w-full h-40 md:h-52 lg:h-60 overflow-hidden rounded-xl mb-10">
            <div className="absolute inset-0 flex slider-track">
              <img
                src={slide1}
                className="w-1/3 h-full object-contain bg-black flex-shrink-0"
              />
              <img
                src={slide2}
                className="w-1/3 h-full object-contain bg-black flex-shrink-0"
              />
              <img
                src={slide3}
                className="w-1/3 h-full object-contain bg-black flex-shrink-0"
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center text-purple-400 mb-8">
            Data Budak Talon
          </h1>

          {barang.length === 0 && (
            <p className="text-center text-slate-300">
              Belum ada data barang.
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {barang.map((item) => (
              <div
                key={item}
                className="bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition"
              >
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {item.nama}
                </h2>
                <p className="text-slate-300">Nama_barang: {item.nama_barang}</p>
                <p className="text-slate-300">Harga: {item.harga}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/data_barang"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Lihat Data Barang
            </a>
          </div>

        </div>
      </div>

      <style>
        {`
          .slider-track {
            width: 300%;
            animation: slide 25s linear infinite;
          }

          @keyframes slide {
            0% { transform: translateX(0%); }
            33% { transform: translateX(-100%); }
            66% { transform: translateX(-200%); }
            100% { transform: translateX(0%); }
          }
        `}
      </style>
    </Layout>
  );
};

export default HomePage;
