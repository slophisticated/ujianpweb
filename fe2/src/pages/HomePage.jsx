import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import bgImage from "../assets/njz.jpg";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/read.php");
        console.log("HomePage fetch response:", response.data);
        if (response.data && response.data.status === "success") {
          setData(response.data.data);
        } else {
          console.error("Data structure invalid:", response.data);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 md:p-8"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full max-w-5xl">
          {/* iOS-style Glass Container */}
          <div className="ios-glass-container relative overflow-hidden rounded-3xl p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
              <span className="text-white">Data Mahasiswa</span>
            </h1>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-white mt-4">Sedang memuat data...</p>
              </div>
            ) : data.length === 0 ? (
              <p className="text-center text-white py-20">
                Belum ada data mahasiswa.
              </p>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {data.map((item, index) => (
                    <div
                      key={item.id}
                      className="ios-card group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <h2 className="text-2xl font-semibold text-white mb-3">
                        {item.nama}
                      </h2>
                      <p className="text-white/80 mb-1">NPM: {item.npm}</p>
                      <p className="text-white/80">Kelas: {item.kelas}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <a
                    href="/data_mhs"
                    className="ios-button group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300"
                  >
                    <span>Lihat Data Mahasiswa</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          /* iOS-style Glass Container */
          .ios-glass-container {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(40px) saturate(180%);
            -webkit-backdrop-filter: blur(40px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 
              0 8px 32px 0 rgba(0, 0, 0, 0.37),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
          }

          /* iOS Glass Cards */
          .ios-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 1rem;
            padding: 1.5rem;
            transition: all 0.3s ease;
            animation: slideUp 0.6s ease-out forwards;
            opacity: 0;
            transform: translateY(20px);
            box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.25);
          }

          @keyframes slideUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .ios-card:hover {
            transform: translateY(-4px);
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.35);
          }

          /* iOS Button */
          .ios-button {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.3);
          }

          .ios-button:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.25);
            box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.35);
            transform: translateY(-2px);
          }
        `}
      </style>
    </Layout>
  );
};

export default HomePage;
