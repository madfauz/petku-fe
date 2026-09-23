import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AuthInitializer,
  ProtectedRoute,
  GuestRoute,
} from "./routes/AuthGuards";
import Dashboard from "./pages/Dashboard";
import Konsultasi from "./pages/Konsultasi/Konsultasi";
import DetailKonsultasi from "./pages/Konsultasi/DetailKonsultasi";
import KonfirmasiKonsultasi from "./pages/Konsultasi/KonfirmasiKonsultasi";
import SelesaiKonsultasi from "./pages/Konsultasi/SelesaiKonsultasi";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Search from "./pages/Search";
import Setting from "./pages/Setting";
import Hewan from "./pages/Animal/Hewan";
import HewanEdit from "./pages/Animal/HewanEdit";
import Praktek from "./pages/Praktek/Praktek";
import PraktekEdit from "./pages/Praktek/PraktekEdit";
import PenilaianDetail from "./pages/Penilaian/PenilaianDetail";
import RekamMedisDetail from "./pages/RekamMedis/RekamMedisDetail";
import RiwayatPembayaran from "./pages/Praktek/RiwayatPembayaran";
import DetailJadwalRekam from "./pages/Jadwal/DetailJadwalRekam";
import Artikel from "./pages/Artikel/Artikel";
import ArtikelDetail from "./pages/Artikel/ArtikelDetail";

function App() {
  return (
    <div className="w-full h-full">
      <AuthInitializer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/praktek" element={<Praktek />} />
            <Route path="/konsultasi" element={<Konsultasi />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/artikel/:id" element={<ArtikelDetail />} />

            <Route path="/rekam" element={<RekamMedisDetail />} />
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/konsultasi/:id" element={<DetailKonsultasi />} />
              <Route
                path="/konsultasi/:id/selesai"
                element={<SelesaiKonsultasi />}
              />
              <Route
                path="/konsultasi/:id/penilaian-detail"
                element={<PenilaianDetail />}
              />
              <Route path="/setting" element={<Setting />} />
              <Route path="/hewan" element={<Hewan />} />
              <Route
                path="/riwayat-pembayaran"
                element={<RiwayatPembayaran />}
              />

              <Route path="/jadwal-rekam/:id" element={<DetailJadwalRekam />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["pelanggan"]} />}>
              <Route path="/hewan/edit" element={<HewanEdit />} />
              <Route
                path="/konsultasi/:id/konfirmasi"
                element={<KonfirmasiKonsultasi />}
              />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["dokter"]} />}>
              <Route path="/praktek/edit" element={<PraktekEdit />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthInitializer>
    </div>
  );
}

export default App;
