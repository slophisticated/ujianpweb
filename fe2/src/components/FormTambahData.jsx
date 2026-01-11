import React, { useState } from "react";
import axios from "axios";

export default function FormTambahData() {
  const [nama_mahasiswa, setNamahasiswa] = useState("");
  const [Npm, setnpm] = useState("");
  const [kelas, setkelas] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const saveData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Nama_mhs", nama_mahasiswa);
    formData.append("Npm", Npm);
    formData.append("kelas", kelas);

    try {
      await axios.post("/api/create.php", formData);
      setMsg("Data berhasil ditambahkan!");
      setIsError(false);
      window.location.href = "/data_barang";
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMsg("Data gagal ditambahkan. Pastikan semua data benar.");
      setIsError(true);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="p-4 lg:w-1/2">
        <form
          onSubmit={saveData}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {/* KOLOM NAMA */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              NPM
            </label>
            <input
              id="Npm"
              type="text"
              placeholder="Masukkan NPM"
              value={Npm}
              onChange={(e) => setnpm(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* KOLOM NPM */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama Mahasiswa
            </label>
            <input
              id="nama_mahasiswa"
              type="text"
              placeholder="Masukkan nama mahasiswa"
              value={nama_mahasiswa}
              onChange={(e) => setNamahasiswa(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* KOLOM KELAS */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              kelas
            </label>
            <input
              id="harga"
              type="text"
              placeholder="Masukkan Kelas"
              value={kelas}
              onChange={(e) => setkelas(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* TOMBOL SUBMIT */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Tambah Data
            </button>
          </div>

          {/* MESSAGE */}
          {msg && (
            <p
              className={isError ? "text-red-500 mt-4" : "text-green-600 mt-4"}
            >
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
