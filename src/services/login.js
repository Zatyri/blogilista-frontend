import axios from 'axios'

const url = '/api/login'

const login = async credentials => {
  const respons = await axios.post(url, credentials)
  return respons.data
}

export default { login }