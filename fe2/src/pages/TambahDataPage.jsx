import React from "react";
import FormTambahData from "../components/FormTambahData";
import Layout from "./Layout";
import bgImage from "../assets/njz.jpg";

export default function TambahDataPage() {
  return (
    <Layout>
      <div
        className="flex flex-col justify-center items-center min-h-screen p-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
            Tambah Data Mahasiswa
          </h1>
          <FormTambahData />
        </div>
      </div>
    </Layout>
  );
}
