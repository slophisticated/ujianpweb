import React, { useState, useEffect, useCallback } from "react";
import Layout from "./Layout";
import bgImage from "../assets/maja.webp";
import axios from "axios";

const DataBarangPage = () => {
  // -------------------- STATE --------------------
  const [barangData, setBarangData] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------- FUNGSI --------------------

  // Fetch data dari API
  const fetchData = useCallback(() => {
    setLoading(true);
    axios
      .get("/api/read.php")
      .then((response) => {
        if (response.data && response.data.status === "success") {
          setBarangData(response.data.data);
        } else {
          console.error("Data structure invalid:", response.data);
          setBarangData([]);
        }
      })
      .catch((error) => {
        console.error("Error connecting to the backend:", error);
        setBarangData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch data saat komponen pertama kali dimount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  // Handle delete data
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      axios
        .delete(`/api/delete.php/${id}`)
        .then(() => {
          alert("Data berhasil dihapus");
          // Refresh data setelah hapus
          setBarangData((prev) => prev.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
          alert("Gagal menghapus data");
        });
    }
  };

  // -------------------- RENDER --------------------
  return (
    <Layout>
      <div
        className="flex flex-col justify-center items-center min-h-screen p-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-2xl text-center w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Daftar Data Barang
          </h1>

          {/* Navigasi & Kontrol */}
          <div className="flex justify-between items-center mb-6">
            <a
              href="/"
              className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              ← Kembali ke Homepage
            </a>
            <a
              href="/tambah_data"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition duration-200"
            >
              + Tambah Data Baru
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
              <table className="table-auto w-full border-collapse bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 border border-gray-700">No</th>
                    <th className="px-4 py-3 border border-gray-700">NPM</th>
                    <th className="px-4 py-3 border border-gray-700">
                      Nama Mahasiswa
                    </th>
                    <th className="px-4 py-3 border border-gray-700">Kelas</th>
                  </tr>
                </thead>

                <tbody>
                  {barangData.length > 0 ? (
                    barangData.map((item, index) => (
                      <tr
                        key={item.id || index}
                        className="hover:bg-gray-50 transition duration-150"
                      >
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-left font-medium">
                          {item.kd_barang}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-mono text-sm">
                          {item.nama_barang}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          {item.harga}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center space-x-2">
                          <a
                            href={`/edit_data/${item.id}`}
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition duration-200"
                          >
                            Edit
                          </a>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition duration-200"
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
                        className="border border-gray-300 px-4 py-10 text-center font-semibold text-gray-500 bg-gray-50"
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
    </Layout>
  );
};

export default DataBarangPage;
