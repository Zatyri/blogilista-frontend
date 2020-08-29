import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      setUser(user)
      window.localStorage.setItem(
        'userLogin', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (ex) {
      console.log('wrong username or password');
    }
  }

  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('userLogin')
    if(userLoggedIn){
      const user = JSON.parse(userLoggedIn)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('userLogin')
    setUser('')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    await blogService.post({title, author, url})
    setTitle('')
    setAuthor('')
    setUrl('')
    blogService.getAll().then(blogs =>
      setBlogs( blogs ))
  }



  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}>
        </input>
      </div>
      <div>
        Password:
        <input type="text" value={password} onChange={({ target }) => setPassword(target.value)}>
        </input>
      </div>
      <button type="submit">Login</button>
    </form>
  )
  
  const showBlogs = () => (
    <div>
        <h2>blogs</h2>
        {createBlog()}
        <p>{user.name} is logged in <button onClick={handleLogout}>Logout</button></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createBlog = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>Title: <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)}></input></div>
        <div>Author: <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)}></input></div>
        <div>URL: <input type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)}></input></div>
        <button type="submit">Create</button>
      </form>
    </div>
  )

  return (
    <div>
      {user?showBlogs():loginForm()}
    </div>
  )
}

export default App