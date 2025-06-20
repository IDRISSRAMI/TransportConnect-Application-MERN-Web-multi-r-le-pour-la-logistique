import api from './api'

export const createEvaluation = async (evaluationData) => {
  const response = await api.post('/evaluations', evaluationData)
  return response.data
}

export const getEvaluationsByUser = async (userId) => {
  const response = await api.get(`/evaluations/user/${userId}`)
  return response.data
}

export const getAverageRating = async (userId) => {
  const response = await api.get(`/evaluations/average/${userId}`)
  return response.data
}

export const updateEvaluation = async (evaluationId, evaluationData) => {
  const response = await api.put(`/evaluations/${evaluationId}`, evaluationData)
  return response.data
}

export const deleteEvaluation = async (evaluationId) => {
  const response = await api.delete(`/evaluations/${evaluationId}`)
  return response.data
}

export const getAllEvaluations = async () => {
  const response = await api.get('/evaluations')
  return response.data
}

export const getEvaluationsRecues = async () => {
  const response = await api.get('/evaluations/recues')
  return response.data
}

export const getEvaluationsDonnees = async () => {
  const response = await api.get('/evaluations/donnees')
  return response.data
}