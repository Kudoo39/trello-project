import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// we can also use Interceptors from axios to centralized error handling
export const fetchBoardDetailsAPI = async (boardId) => {
  try {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  } catch (error) {
    return error
  }
}