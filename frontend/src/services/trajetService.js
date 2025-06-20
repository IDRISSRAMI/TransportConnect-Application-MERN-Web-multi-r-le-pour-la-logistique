import api from './api'

export const createTrajet = async (trajetData) => {
  const response = await api.post('/trajets', trajetData)
  return response.data
}

export const getTrajets = async () => {
  const response = await api.get('/trajets')
  return response.data
}

export const getMyTrajets = async () => {
  const response = await api.get('/trajets/mes-trajets')
  return response.data
}

export const deleteTrajet = async (id) => {
  const response = await api.delete(`/trajets/${id}`)
  return response.data
}

export const getTrajetDetails = async (id) => {
  const response = await api.get(`/trajets/${id}`)
  return response.data
}