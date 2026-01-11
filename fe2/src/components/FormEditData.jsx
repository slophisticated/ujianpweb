import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function FormEditData() {
  const [nama_barang, setNama_barang] = useState("");
  const [kd_barang, setKd_barang] = useState("");
  const [harga, setHarga] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/read_by_id.php/${id}`);
        setNama_barang(response.data.data.npm);
        setKd_barang(response.data.data.nama);
        setHarga(response.data.data.kelas);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };

    if (id) getData();
  }, [id]);

  const updateBarang = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/update.php/${id}`, {
        nama_barang: nama_barang,
        kd_barang: kd_barang,
        harga: harga,
      });
      window.location.href = "/data_barang";
    } catch (error) {
      console.error("Error updating data: ", error);
      if (error.response) {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-gray-100">
      <div className="p-4 lg:w-1/2 w-full">
        <form
          onSubmit={updateBarang}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Edit Data Mahasiwa
          </h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nama_barang"
            >
              Nama
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nama_barang"
              type="text"
              placeholder="Masukkan Nama"
              value={nama_barang || ""}
              onChange={(e) => setNama_barang(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="kd_barang"
            >
              NPM
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="kd_barang"
              type="text"
              placeholder="Masukkan NPMs"
              value={kd_barang || ""}
              onChange={(e) => setKd_barang(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="harga"
            >
              Kelas
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="harga"
              type="text"
              placeholder="Masukkan Kelas"
              value={harga || ""}
              onChange={(e) => setHarga(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200"
              type="submit"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = "/data_barang")}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormEditData;
