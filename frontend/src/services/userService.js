import api from './api'

export const getAllUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

export const updateUser = async (userData) => {
  const response = await api.put('/users/update', userData)
  return response.data
}

export const updateUserById = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData)
  return response.data
}

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`)
  return response.data
}

export const setVerifiedBadge = async (id) => {
  const response = await api.put(`/users/${id}/verify`)
  return response.data
}

export const suspendUser = async (id) => {
  const response = await api.put(`/users/${id}/suspend`)
  return response.data
}

export const activateUser = async (id) => {
  const response = await api.put(`/users/${id}/activate`)
  return response.data
}