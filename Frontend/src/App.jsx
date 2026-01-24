import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import OpportunityDetails from "./pages/OpportunityDetails";
import MainLayout from "./MainLayout";
import OrganizationsPage from "./pages/OrganisationPage";
import OrganizationDetails from "./pages/OrganizationDetails";
import AuthPage from "./pages/AuthPage";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import CertificatePreview from "./pages/certificatePreview";

function App() {
  return (
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/opportunities" element={<ProtectedRoute><OpportunitiesPage /></ProtectedRoute>} />
          <Route path="/organizations" element={<ProtectedRoute><OrganizationsPage /></ProtectedRoute>} />
        </Route>
        <Route path="/myprofile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
        <Route path="/authentication" element={<AuthPage />} />
        <Route path="/opportunities/:uid" element={<ProtectedRoute><OpportunityDetails /></ProtectedRoute>} />
        <Route path="/organizations/:uid" element={<ProtectedRoute><OrganizationDetails/></ProtectedRoute>} />
        <Route path="/certificate" element={<CertificatePreview />}/>    
      </Routes>
  );
}

export default App;
