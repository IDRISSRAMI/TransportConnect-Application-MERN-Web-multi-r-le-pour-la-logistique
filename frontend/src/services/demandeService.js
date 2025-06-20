import api from './api'

export const createDemande = async (demandeData) => {
  const response = await api.post('/demandes', demandeData)
  return response.data
}

export const getDemandesForConducteur = async () => {
  const response = await api.get('/demandes/conducteur')
  return response.data
}

export const getMesDemandes = async () => {
  const response = await api.get('/demandes/mes-demandes')
  return response.data
}

export const updateDemandeStatus = async (id, statut) => {
  const response = await api.put(`/demandes/${id}`, { statut })
  return response.data
}

export const deleteDemande = async (id) => {
  const response = await api.delete(`/demandes/${id}`)
  return response.data
}

export const getHistoriqueDemandes = async () => {
  const response = await api.get('/demandes/historique')
  return response.data
}

export const getDemandesRecues = async () => {
  const response = await api.get('/demandes/recues')
  return response.data
}