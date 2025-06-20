import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const AnnoncesConducteur = () => {
  const [formData, setFormData] = useState({
    depart: '',
    etapes: '',
    destination: '',
    dimensionsMax: '',
    typeMarchandise: '',
    capaciteDisponible: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const etapesArray = formData.etapes.split(',').map(item => item.trim())
      
      await api.post('/trajets', {
        ...formData,
        etapes: etapesArray
      })
      
      setSuccess('Annonce créée avec succès!')
      setError('')
      setTimeout(() => navigate('/mes-trajets'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création')
      setSuccess('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Créer une annonce de trajet</h1>
      
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}
      
      <form onSubmit={handleSubmit} className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Lieu de départ</label>
            <input
              type="text"
              name="depart"
              value={formData.depart}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Destination finale</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Étapes intermédiaires (séparées par des virgules)</label>
          <input
            type="text"
            name="etapes"
            value={formData.etapes}
            onChange={handleChange}
            className="input-field"
            placeholder="Ville 1, Ville 2, Ville 3"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Dimensions maximales acceptées</label>
            <input
              type="text"
              name="dimensionsMax"
              value={formData.dimensionsMax}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Type de marchandise</label>
            <input
              type="text"
              name="typeMarchandise"
              value={formData.typeMarchandise}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-1">Capacité disponible (kg)</label>
          <input
            type="number"
            name="capaciteDisponible"
            value={formData.capaciteDisponible}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        
        <button type="submit" className="btn-primary py-2 px-4 rounded">
          Publier l'annonce
        </button>
      </form>
    </div>
  )
}

export default AnnoncesConducteur