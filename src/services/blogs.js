import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data.sort((prev, current) => (prev.likes < current.likes)?1:-1)
}

const post = async newBlog => {
  const setAuth = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, setAuth)
  return response.data
}

const put = async newBlog => {
  const url = `${baseUrl}/${newBlog.id}`
  const response = await axios.put(url, newBlog)
  return response
}

const delBlog = async blog => {
  const confirmation = window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)
  if(!confirmation){
    return null
  }

  const setAuth = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.delete(url, setAuth)
  return response


}

export default { getAll, post, setToken, put, delBlog }