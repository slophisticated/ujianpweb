import React, { useState } from "react";
import axios from "axios";

export default function FormTambahData() {
  const [nama, setNama] = useState("");
  const [npm, setNpm] = useState("");
  const [kelas, setKelas] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const saveData = async (e) => {
    e.preventDefault();

    if (!nama || !npm || !kelas) {
      setMsg("Semua field harus diisi!");
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post(
        "/api/create.php",
        {
          nama: nama,
          npm: npm,
          kelas: kelas,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Create response:", response.data);
      if (response.data.status === "success") {
        setMsg("Data berhasil ditambahkan!");
        setIsError(false);
        setTimeout(() => {
          window.location.href = "/data_mhs";
        }, 1000);
      } else {
        setMsg(response.data.message || "Data gagal ditambahkan.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Create error:", error);
      setMsg(
        error.response?.data?.message ||
          "Data gagal ditambahkan. Periksa console."
      );
      setIsError(true);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={saveData}
        className="ios-form-container rounded-2xl px-8 pt-6 pb-8 mb-4"
      >
        {/* KOLOM NPM */}
        <div className="mb-4">
          <label className="block text-white/90 text-sm font-bold mb-2">
            NPM
          </label>
          <input
            id="npm"
            type="text"
            placeholder="Masukkan NPM"
            value={npm}
            onChange={(e) => setNpm(e.target.value)}
            required
            className="ios-form-input w-full"
          />
        </div>

        {/* KOLOM NAMA */}
        <div className="mb-4">
          <label className="block text-white/90 text-sm font-bold mb-2">
            Nama Mahasiswa
          </label>
          <input
            id="nama"
            type="text"
            placeholder="Masukkan nama mahasiswa"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="ios-form-input w-full"
          />
        </div>

        {/* KOLOM KELAS */}
        <div className="mb-6">
          <label className="block text-white/90 text-sm font-bold mb-2">
            Kelas
          </label>
          <input
            id="kelas"
            type="text"
            placeholder="Masukkan Kelas"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            required
            className="ios-form-input w-full"
          />
        </div>

        {/* TOMBOL SUBMIT */}
        <div className="flex items-center justify-between">
          <button
            className="ios-button-submit font-bold py-2 px-6 rounded-lg transition duration-200"
            type="submit"
          >
            Tambah Data
          </button>
        </div>

        {/* MESSAGE */}
        {msg && (
          <p className={isError ? "text-red-400 mt-4" : "text-green-400 mt-4"}>
            {msg}
          </p>
        )}
      </form>

      <style>
        {`
            .ios-form-container {
              background: rgba(255, 255, 255, 0.08);
              backdrop-filter: blur(40px) saturate(180%);
              -webkit-backdrop-filter: blur(40px) saturate(180%);
              border: 1px solid rgba(255, 255, 255, 0.18);
              box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
            }

            .ios-form-input {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: white;
              padding: 0.75rem 1rem;
              border-radius: 0.5rem;
            }

            .ios-form-input::placeholder {
              color: rgba(255, 255, 255, 0.5);
            }

            .ios-form-input:focus {
              outline: none;
              background: rgba(255, 255, 255, 0.15);
              border-color: rgba(59, 130, 246, 0.5);
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }

            .ios-button-submit {
              background: rgba(59, 130, 246, 0.5);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(59, 130, 246, 0.6);
              color: white;
              box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
            }

            .ios-button-submit:hover {
              background: rgba(59, 130, 246, 0.7);
              border-color: rgba(59, 130, 246, 0.8);
              box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
            }
          `}
      </style>
    </div>
  );
}
