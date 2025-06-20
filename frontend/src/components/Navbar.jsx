import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import NotificationBell from './NotificationBell'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActivePath = (path) => location.pathname === path

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo simple */}
          <Link to="/" className="text-lg font-bold">
            TransportConnect
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  to="/" 
                  className={`${isActivePath('/') ? 'text-white border-b-2 border-white pb-1' : 'text-gray-300 hover:text-white'}`}
                >
                  Accueil
                </Link>
                
                {user.role === 'conducteur' && (
                  <Link 
                    to="/mes-trajets" 
                    className={`${isActivePath('/mes-trajets') ? 'text-white border-b-2 border-white pb-1' : 'text-gray-300 hover:text-white'}`}
                  >
                    Mes Trajets
                  </Link>
                )}
                
                {user.role === 'expediteur' && (
                  <Link 
                    to="/mes-demandes" 
                    className={`${isActivePath('/mes-demandes') ? 'text-white border-b-2 border-white pb-1' : 'text-gray-300 hover:text-white'}`}
                  >
                    Mes Demandes
                  </Link>
                )}
                
                <Link 
                  to="/evaluations" 
                  className={`${isActivePath('/evaluations') ? 'text-white border-b-2 border-white pb-1' : 'text-gray-300 hover:text-white'}`}
                >
                  Évaluations
                </Link>
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`${isActivePath('/admin') ? 'text-white border-b-2 border-white pb-1' : 'text-gray-300 hover:text-white'}`}
                  >
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/trajets" className="text-gray-300 hover:text-white">
                  Rechercher
                </Link>
              </>
            )}
          </div>

          {/* Actions utilisateur */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <NotificationBell />
                <span className="text-gray-300">|</span>
                <span className="text-sm">{user.prenom} {user.nom}</span>
                <Link to="/profile" className="text-gray-300 hover:text-white text-sm">
                  Profil
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-white text-black px-3 py-1 text-sm hover:bg-gray-200"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-black px-4 py-2 hover:bg-gray-200"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 -mx-4 px-4 py-3">
            {user ? (
              <div className="space-y-3">
                <div className="text-white font-medium border-b border-gray-700 pb-2">
                  {user.prenom} {user.nom}
                </div>
                
                <Link to="/" className="block text-gray-300 hover:text-white">Accueil</Link>
                
                {user.role === 'conducteur' && (
                  <Link to="/mes-trajets" className="block text-gray-300 hover:text-white">Mes Trajets</Link>
                )}
                
                {user.role === 'expediteur' && (
                  <Link to="/mes-demandes" className="block text-gray-300 hover:text-white">Mes Demandes</Link>
                )}
                
                <Link to="/evaluations" className="block text-gray-300 hover:text-white">Évaluations</Link>
                <Link to="/profile" className="block text-gray-300 hover:text-white">Profil</Link>
                
                <button 
                  onClick={handleLogout}
                  className="block text-gray-300 hover:text-white"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/trajets" className="block text-gray-300 hover:text-white">Rechercher</Link>
                <Link to="/login" className="block text-gray-300 hover:text-white">Connexion</Link>
                <Link to="/register" className="block text-gray-300 hover:text-white">Inscription</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar