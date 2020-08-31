import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Createblog from './components/Createblog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const createBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem(
        'userLogin', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (ex) {
      handleMessage('Wrong username or password')
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

  const updateBlogs = () => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }

  const handleMessage = (text) => {
    setMessage(text)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const handleAddLike = async (blog) => {

    const newBlog = { ...blog }
    newBlog.likes += 1
    newBlog.user = blog.user.id
    try {
      await blogService.put(newBlog)
      updateBlogs()
    } catch (error) {
      message(error.message)
    }
  }


  const loginForm = () => (
    <>
      <p>{message}</p>
      <form onSubmit={handleLogin}>
        <div>
        Username:
          <input id='username' type="text" value={username} onChange={({ target }) => setUsername(target.value)}>
          </input>
        </div>
        <div>
        Password:
          <input id='password' type="text" value={password} onChange={({ target }) => setPassword(target.value)}>
          </input>
        </div>
        <button id='login-button' type="submit">Login</button>
      </form>
    </>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>{message}</p>
      <p>{user.name} is logged in <button onClick={handleLogout}>Logout</button></p>
      <Togglable buttonLabel="Show create blog form" ref={createBlogRef}>
        <Createblog handleMessage={handleMessage} updateBlogs={updateBlogs} hide={createBlogRef}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} message={handleMessage} update={updateBlogs} handleLike={handleAddLike}/>
      )}
    </div>
  )

  return (
    <div>

      {user?showBlogs():loginForm()}
    </div>
  )
}

export default App