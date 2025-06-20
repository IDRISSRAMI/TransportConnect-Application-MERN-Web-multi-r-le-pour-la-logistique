import { useEffect, useState } from 'react'
import TrajetCard from '../components/TrajetCard'
import api from '../services/api'

const TrajetsDisponibles = () => {
  const [trajets, setTrajets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTrajets = async () => {
      try {
        const { data } = await api.get('/trajets')
        setTrajets(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement des trajets')
      } finally {
        setLoading(false)
      }
    }
    fetchTrajets()
  }, [])

  if (loading) return <div className="text-center py-8">Chargement...</div>
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Trajets Disponibles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trajets.map(trajet => (
          <TrajetCard key={trajet._id} trajet={trajet} />
        ))}
      </div>
      
      {trajets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun trajet disponible pour le moment
        </div>
      )}
    </div>
  )
}

export default TrajetsDisponibles