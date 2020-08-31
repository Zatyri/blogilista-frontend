import React, { useState } from 'react'
import blogService from '../services/blogs'

const Createblog = ({ handleMessage, updateBlogs, hide }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    hide.current.toggleVisibility()

    try{
      const request = await blogService.post({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      updateBlogs()
      handleMessage(`A blog "${request.title}" by ${request.author} was created`)
    } catch(ex) {
      console.log(ex.message)
      handleMessage('Error posting blog')
    }
  }

  return (

    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>Title: <input id="title" type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)}></input></div>
        <div>Author: <input id='author' type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)}></input></div>
        <div>URL: <input id='url' type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)}></input></div>
        <button id='submit-Blog-button' type="submit">Create</button>
      </form>
    </div>

  )
}

export default Createblog
