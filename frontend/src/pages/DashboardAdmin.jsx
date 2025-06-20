import { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import api from '../services/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const DashboardAdmin = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats')
        setStats(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement des statistiques')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) return <div className="text-center py-8">Chargement...</div>
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>

  const barData = {
    labels: ['Annonces', 'Demandes', 'Utilisateurs'],
    datasets: [
      {
        label: 'Statistiques',
        data: [stats.nbAnnonces, stats.nbDemandes, stats.nbUtilisateurs],
        backgroundColor: ['#FFD600', '#E53935', '#000000'],
      },
    ],
  }

  const pieData = {
    labels: ['Actifs', 'Inactifs'],
    datasets: [
      {
        data: [stats.nbActifs, stats.nbUtilisateurs - stats.nbActifs],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord Admin</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Activité globale</h2>
          <Bar data={barData} />
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Statut des utilisateurs</h2>
          <Pie data={pieData} />
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Statistiques clés</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="font-bold text-yellow-800">Taux d'acceptation</h3>
            <p className="text-2xl font-bold">{stats.tauxAccept}%</p>
          </div>
          
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="font-bold text-red-800">Demandes totales</h3>
            <p className="text-2xl font-bold">{stats.nbDemandes}</p>
          </div>
          
          <div className="bg-black text-white p-4 rounded-lg">
            <h3 className="font-bold">Utilisateurs actifs</h3>
            <p className="text-2xl font-bold">{stats.nbActifs}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin