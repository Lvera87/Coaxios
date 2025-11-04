import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Layout from './components/Layout';
import RegistroPage from './pages/onboarding/RegistroPage';
import EmpresaPage from './pages/onboarding/EmpresaPage';
import ResumenPage from './pages/onboarding/ResumenPage';
import CertificacionesPage from './pages/onboarding/CertificacionesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding Routes */}
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/onboarding/empresa" element={<EmpresaPage />} />
        <Route path="/onboarding/resumen" element={<ResumenPage />} />
        <Route path="/onboarding/certificaciones" element={<CertificacionesPage />} />

        {/* Main App */}
        <Route
          path="/*"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
