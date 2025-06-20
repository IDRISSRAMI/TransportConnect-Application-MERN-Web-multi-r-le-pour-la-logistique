import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
      <p className="text-gray-600 mb-6">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link 
        to="/" 
        className="btn-primary px-6 py-2 rounded inline-block"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}

export default NotFound