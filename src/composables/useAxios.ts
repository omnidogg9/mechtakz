import axios from 'axios'
export default function useAxios() {
  const instance = axios.create()

  const get = async <T>(url: string): Promise<T> => {
    const response = await instance.get(url)
    return response.data
  }

  const post = async <T>(url: string): Promise<T> => {
    const response = await instance.post(url)
    return response.data
  }

  return {
    get,
    post
  }
}
