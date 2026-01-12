import React from "react";
import FormEditData from "../components/FormEditData";
import Layout from "./Layout";
import bgImage from "../assets/njz.jpg";

const EditDataPage = () => {
  return (
    <Layout>
      <div
        className="flex flex-col justify-center items-center min-h-screen p-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
            Edit Data Mahasiswa
          </h1>
          <FormEditData />
        </div>
      </div>
    </Layout>
  );
};

export default EditDataPage;
