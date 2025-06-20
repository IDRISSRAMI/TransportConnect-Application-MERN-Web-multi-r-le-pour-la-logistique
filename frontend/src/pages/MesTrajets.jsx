import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const MesTrajets = () => {
  const [trajets, setTrajets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTrajets = async () => {
      try {
        const { data } = await api.get('/trajets/mes-trajets')
        setTrajets(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement')
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrajets()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce trajet?')) {
      try {
        await api.delete(`/trajets/${id}`)
        setTrajets(trajets.filter(trajet => trajet._id !== id))
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors de la suppression')
      }
    }
  }

  if (loading) return <div className="text-center py-8">Chargement...</div>
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Trajets</h1>
        <Link 
          to="/annonces" 
          className="btn-primary px-4 py-2 rounded"
        >
          + Nouveau trajet
        </Link>
      </div>
      
      <div className="space-y-4">
        {trajets.length > 0 ? (
          trajets.map(trajet => (
            <div key={trajet._id} className="card p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">
                  {trajet.depart} → {trajet.destination}
                </h3>
                <div className="flex space-x-2">
                  <Link 
                    to={`/trajet/${trajet._id}/edit`}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    Modifier
                  </Link>
                  <button 
                    onClick={() => handleDelete(trajet._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-gray-600">Type marchandise: {trajet.typeMarchandise}</p>
                  <p className="text-gray-600">Capacité: {trajet.capaciteDisponible} kg</p>
                </div>
                <div>
                  <p className="text-gray-600">Dimensions max: {trajet.dimensionsMax}</p>
                  <p className="text-gray-600">
                    Demandes: {trajet.demandesAssociees?.length || 0}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">
                  Créé le: {new Date(trajet.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Vous n'avez aucun trajet pour le moment
          </div>
        )}
      </div>
    </div>
  )
}

export default MesTrajets