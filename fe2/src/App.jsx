import HomePage from "./pages/HomePage";
import DataBarangPage from "./pages/DataBarangPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TambahDataPage from "./pages/TambahDataPage";
import EditDataPage from "./pages/EditDataPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/data_barang" element={<DataBarangPage />} />
        <Route path="/tambah_data" element={<TambahDataPage />} />
        <Route path="/edit_data/:id" element={<EditDataPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
