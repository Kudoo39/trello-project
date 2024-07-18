import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// we can also use Interceptors from axios to centralized error handling
// Board
export const fetchBoardDetailsAPI = async (boardId) => {
  try {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  } catch (error) {
    return error
  }
}

export const updateBoardDetailsAPI = async (boardId, updatedBoard) => {
  try {
    const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updatedBoard)
    return response.data
  } catch (error) {
    return error
  }
}

// Column
export const createNewColumnAPI = async (newColumnData) => {
  try {
    const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
    return response.data
  } catch (error) {
    return error
  }
}

export const updateColumnDetailsAPI = async (columnId, updatedColumn) => {
  try {
    const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updatedColumn)
    return response.data
  } catch (error) {
    return error
  }
}

// Card
export const createNewCardAPI = async (newCardData) => {
  try {
    const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
    return response.data
  } catch (error) {
    return error
  }
}