import React, { useState, useEffect, useCallback } from "react";
import Layout from "./Layout";
import bgImage from "../assets/njz.jpg";
import axios from "axios";

const DataMahasiswaPage = () => {
  // -------------------- STATE --------------------
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------- FUNGSI --------------------

  // Fetch data dari API
  const fetchData = useCallback(() => {
    setLoading(true);
    axios
      .get("/api/read.php")
      .then((response) => {
        console.log("Fetch response:", response.data);
        if (response.data && response.data.status === "success") {
          setdata(response.data.data);
        } else {
          console.error("Data structure invalid:", response.data);
          alert(
            "Gagal memuat data: " + (response.data?.message || "Unknown error")
          );
          setdata([]);
        }
      })
      .catch((error) => {
        console.error("Error connecting to the backend:", error);
        alert("Gagal terhubung ke backend: " + error.message);
        setdata([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle delete data
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      axios
        .delete(`/api/delete.php/${id}`)
        .then((response) => {
          console.log("Delete response:", response.data);
          if (response.data.status === "success") {
            alert("Data berhasil dihapus");
            setdata((prev) => prev.filter((item) => item.id !== id));
          } else {
            alert(response.data.message || "Gagal menghapus data");
          }
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
          alert(
            error.response?.data?.message ||
              "Gagal menghapus data. Periksa console."
          );
        });
    }
  };

  return (
    <Layout>
      <div
        className="flex flex-col justify-center items-center min-h-screen p-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="ios-glass-container w-full max-w-5xl rounded-3xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
            Daftar Data Mahasiswa
          </h1>

          {/* Navigasi & Kontrol */}
          <div className="flex justify-between items-center mb-8 gap-2">
            <a
              href="/"
              className="ios-button-small px-4 py-2 rounded-lg text-white font-semibold transition duration-200"
            >
              ← Kembali
            </a>
            <a
              href="/tambah_data"
              className="ios-button-primary px-6 py-2 rounded-lg text-white font-semibold transition duration-200"
            >
              + Tambah Data
            </a>
          </div>

          {/* Tabel Data */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-10">
                <p className="text-lg font-semibold text-gray-600 animate-pulse">
                  Sedang memuat data...
                </p>
              </div>
            ) : (
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="px-4 py-3 text-left">No</th>
                    <th className="px-4 py-3 text-left">NPM</th>
                    <th className="px-4 py-3 text-left">Nama</th>
                    <th className="px-4 py-3 text-left">Kelas</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr
                        key={item.id || index}
                        className="border-b border-white/10 hover:bg-white/5 transition duration-150"
                      >
                        <td className="px-4 py-3 text-center">{index + 1}</td>
                        <td className="px-4 py-3">{item.npm}</td>
                        <td className="px-4 py-3">{item.nama}</td>
                        <td className="px-4 py-3">{item.kelas}</td>
                        <td className="px-4 py-3 text-center space-x-2">
                          <a
                            href={`/edit_data/${item.id}`}
                            className="ios-button-small-edit inline-block px-3 py-1 rounded text-sm transition duration-200"
                          >
                            Edit
                          </a>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="ios-button-small-delete px-3 py-1 rounded text-sm transition duration-200"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-10 text-center font-semibold text-white/60"
                      >
                        Data Mahasiswa tidak ditemukan atau kosong.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          .ios-glass-container {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(40px) saturate(180%);
            -webkit-backdrop-filter: blur(40px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          }

          .ios-button-small {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.3);
          }

          .ios-button-small:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.25);
            box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.35);
          }

          .ios-button-primary {
            background: rgba(34, 197, 94, 0.4);
            backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(34, 197, 94, 0.5);
            box-shadow: 0 4px 16px 0 rgba(34, 197, 94, 0.2);
          }

          .ios-button-primary:hover {
            background: rgba(34, 197, 94, 0.5);
            border-color: rgba(34, 197, 94, 0.7);
            box-shadow: 0 6px 20px 0 rgba(34, 197, 94, 0.3);
          }

          .ios-button-small-edit {
            background: rgba(59, 130, 246, 0.4);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(59, 130, 246, 0.5);
            color: white;
          }

          .ios-button-small-edit:hover {
            background: rgba(59, 130, 246, 0.6);
            border-color: rgba(59, 130, 246, 0.8);
          }

          .ios-button-small-delete {
            background: rgba(239, 68, 68, 0.4);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(239, 68, 68, 0.5);
            color: white;
          }

          .ios-button-small-delete:hover {
            background: rgba(239, 68, 68, 0.6);
            border-color: rgba(239, 68, 68, 0.8);
          }
        `}
      </style>
    </Layout>
  );
};

export default DataMahasiswaPage;
