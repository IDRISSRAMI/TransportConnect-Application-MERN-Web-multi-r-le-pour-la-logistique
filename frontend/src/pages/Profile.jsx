import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import api from '../services/api'

const Profile = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put('/users/update', formData)
      setSuccess('Profil mis à jour avec succès!')
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour')
      setSuccess('')
    }
  }

  if (!user) return <div className="text-center py-8">Chargement...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
      
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}
      
      <div className="card mb-6 p-4">
        <div className="flex items-center mb-4">
          <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
            {user.prenom.charAt(0)}{user.nom.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.prenom} {user.nom}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {user.badgeVerifie && (
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
              Vérifié
            </span>
          )}
          <span className="bg-black text-white px-2 py-1 rounded text-xs font-bold">
            {user.role}
          </span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field bg-gray-100"
            disabled
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-1">Téléphone</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        
        <button type="submit" className="btn-primary py-2 px-4 rounded">
          Mettre à jour
        </button>
      </form>
    </div>
  )
}

export default Profile