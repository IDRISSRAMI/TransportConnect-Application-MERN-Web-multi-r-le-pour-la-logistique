import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section principale */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  TransportConnect
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                La plateforme moderne de transport collaboratif. Connectez conducteurs et expéditeurs 
                pour un transport intelligent, sécurisé et économique.
              </p>
              
              {/* Réseaux sociaux */}
              <div className="flex space-x-4 mt-6">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center group transition-all duration-200"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center group transition-all duration-200"
                  aria-label="Twitter"
                >
                  <svg className="h-5 w-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center group transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center group transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C10.797 15.937 9.746 16.988 8.449 16.988zM12.017 7.45c-2.51 0-4.537 2.028-4.537 4.537c0 2.51 2.028 4.538 4.537 4.538c2.51 0 4.538-2.028 4.538-4.538C16.555 9.478 14.527 7.45 12.017 7.45z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation rapide */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/trajets" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                    Rechercher un trajet
                  </Link>
                </li>
                <li>
                  <Link to="/annonces" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                    Publier une annonce
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                    À propos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support et légal */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/help" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                    Nous contacter
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                    Conditions d'utilisation
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-200"></div>

        {/* Section bottom */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-gray-500 text-sm">
                © {currentYear} TransportConnect. Tous droits réservés.
              </p>
              <div className="hidden md:flex items-center space-x-1 text-xs text-gray-400">
                <span>Fait avec</span>
                <svg className="h-3 w-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>en France</span>
              </div>
            </div>

            {/* Langue et région */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span>Français</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Badges de confiance */}
              <div className="flex items-center space-x-2">
                <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  ✓ Sécurisé
                </div>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  ✓ RGPD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        aria-label="Retour en haut"
      >
        <svg className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  )
}

export default Footer