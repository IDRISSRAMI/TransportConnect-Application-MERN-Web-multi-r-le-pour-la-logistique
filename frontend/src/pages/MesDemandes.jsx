import { useState, useEffect } from 'react'
import api from '../services/api'

const MesDemandes = () => {
  const [demandes, setDemandes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const { data } = await api.get('/demandes/mes-demandes')
        setDemandes(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement')
      } finally {
        setLoading(false)
      }
    }
    
    fetchDemandes()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'acceptee': return 'bg-green-100 text-green-800'
      case 'refusee': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  if (loading) return <div className="text-center py-8">Chargement...</div>
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mes Demandes</h1>
      
      <div className="space-y-4">
        {demandes.length > 0 ? (
          demandes.map(demande => (
            <div key={demande._id} className="card p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">
                  Trajet: {demande.trajet?.depart} → {demande.trajet?.destination}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(demande.statut)}`}>
                  {demande.statut.replace('_', ' ')}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-gray-600">Conducteur: {demande.trajet?.conducteur?.prenom} {demande.trajet?.conducteur?.nom}</p>
                  <p className="text-gray-600">Type de colis: {demande.typeColis}</p>
                </div>
                <div>
                  <p className="text-gray-600">Dimensions: {demande.dimensions}</p>
                  <p className="text-gray-600">Poids: {demande.poids}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                Créée le: {new Date(demande.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Vous n'avez aucune demande pour le moment
          </div>
        )}
      </div>
    </div>
  )
}

export default MesDemandes