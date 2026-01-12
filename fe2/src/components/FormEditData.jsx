import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function FormEditData() {
  const [nama, setNama] = useState("");
  const [npm, setNpm] = useState("");
  const [kelas, setKelas] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/read_by_id.php/${id}`);
        setNama(response.data.data.nama);
        setNpm(response.data.data.npm);
        setKelas(response.data.data.kelas);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };

    if (id) getData();
  }, [id]);

  const updateMahasiswa = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/update.php/${id}`,
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
      console.log("Update response:", response.data);
      if (response.data.status === "success") {
        alert("Data berhasil diperbarui!");
        window.location.href = "/data_mhs";
      } else {
        alert(response.data.message || "Gagal update data.");
      }
    } catch (error) {
      console.error("Error updating data: ", error);
      alert(
        error.response?.data?.message ||
          "Gagal mengupdate data. Periksa console."
      );
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={updateMahasiswa}
        className="ios-form-container rounded-2xl px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-white">
          Edit Data Mahasiswa
        </h2>

        <div className="mb-4">
          <label
            className="block text-white/90 text-sm font-bold mb-2"
            htmlFor="nama"
          >
            Nama
          </label>
          <input
            className="ios-form-input w-full"
            id="nama"
            type="text"
            placeholder="Masukkan Nama"
            value={nama || ""}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white/90 text-sm font-bold mb-2"
            htmlFor="npm"
          >
            NPM
          </label>
          <input
            className="ios-form-input w-full"
            id="npm"
            type="text"
            placeholder="Masukkan NPM"
            value={npm || ""}
            onChange={(e) => setNpm(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-white/90 text-sm font-bold mb-2"
            htmlFor="kelas"
          >
            Kelas
          </label>
          <input
            className="ios-form-input w-full"
            id="kelas"
            type="text"
            placeholder="Masukkan Kelas"
            value={kelas || ""}
            onChange={(e) => setKelas(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            className="ios-button-submit font-bold py-2 px-6 rounded-lg transition duration-200"
            type="submit"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = "/data_mhs")}
            className="ios-button-secondary font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Batal
          </button>
        </div>
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

            .ios-button-secondary {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: white;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            }

            .ios-button-secondary:hover {
              background: rgba(255, 255, 255, 0.15);
              border-color: rgba(255, 255, 255, 0.3);
              box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            }
          `}
      </style>
    </div>
  );
}

export default FormEditData;
