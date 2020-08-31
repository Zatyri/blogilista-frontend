import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, message, update, handleLike }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    visible?setVisible(false):setVisible(true)
  }

  const handleAddLike = () => {
    handleLike(blog)
  }

  const handleDelete = async () => {
    const blogToDelete = blog
    try {
      await blogService.delBlog(blogToDelete)
      message(`Blog ${blogToDelete.title} was deleted`)
      update()
    } catch (error) {
      message(error.message)
    }

  }

  const showAll = () => (
    <>
      <p>{blog.url}</p>
      <p className='like'>{blog.likes} <button className='like-button'onClick={handleAddLike}>like</button></p>
      <p>{blog.user.name}</p>
      <button className='delete-button' onClick={handleDelete}>delete</button>
    </>
  )

  return (
    <div style={blogStyle} className='blogs'>
      {blog.title} {blog.author} <button className='showButton' onClick={handleClick}>{visible?'hide':'show'}</button>
      {visible?showAll():''}
    </div>
  )
}

export default Blog
