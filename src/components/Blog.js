import React, {useState} from 'react'

const Blog = ({ blog }) => {

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
  
  const showAll = () => (
    <>
      <p>{blog.url}</p>
      <p>{blog.likes} <button>like</button></p>
      <p>{blog.user.name}</p>
    </>
  )

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={handleClick}>{visible?"hide":"show"}</button>
    {visible?showAll():''}
  </div>
  )
}

export default Blog
