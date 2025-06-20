import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import TrajetsDisponibles from './pages/TrajetsDisponibles'
import MesDemandes from './pages/MesDemandes'
import MesTrajets from './pages/MesTrajets'
import Evaluations from './pages/Evaluations'
import DashboardAdmin from './pages/DashboardAdmin'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import Notifications from './pages/Notifications'
import AnnoncesConducteur from './pages/AnnoncesConducteur'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Routes protégées */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<TrajetsDisponibles />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mes-demandes" element={<MesDemandes />} />
            <Route path="/mes-trajets" element={<MesTrajets />} />
            <Route path="/evaluations" element={<Evaluations />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/annonces" element={<AnnoncesConducteur />} />
            
            {/* Routes admin */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<DashboardAdmin />} />
            </Route>
          </Route>
          
          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

export default App