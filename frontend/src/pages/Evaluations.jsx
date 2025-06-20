import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import api from '../services/api'

const Evaluations = () => {
  const [evaluations, setEvaluations] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { userId } = useParams()

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const endpoint = userId ? `/evaluations/user/${userId}` : '/evaluations/recues'
        const { data } = await api.get(endpoint)
        setEvaluations(data)
        
        if (!userId) {
          const avgRes = await api.get('/evaluations/average/' + userId)
          setAverageRating(avgRes.data.averageRating)
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement')
      } finally {
        setLoading(false)
      }
    }
    
    fetchEvaluations()
  }, [userId])

  if (loading) return <div className="text-center py-8">Chargement...</div>
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {userId ? 'Évaluations de l\'utilisateur' : 'Mes Évaluations'}
      </h1>
      
      {!userId && (
        <div className="card mb-6 p-4 flex items-center">
          <div className="mr-6">
            <h3 className="text-lg font-semibold">Note moyenne</h3>
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}/5</div>
          </div>
          <Rating rating={Math.round(averageRating)} editable={false} />
        </div>
      )}
      
      <div className="space-y-4">
        {evaluations.length > 0 ? (
          evaluations.map(evaluation => (
            <div key={evaluation._id} className="card p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">
                  {evaluation.evaluateur?.prenom} {evaluation.evaluateur?.nom}
                </h3>
                <Rating rating={evaluation.note} editable={false} />
              </div>
              <p className="text-gray-700">{evaluation.commentaire}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(evaluation.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucune évaluation pour le moment
          </div>
        )}
      </div>
    </div>
  )
}

export default Evaluations