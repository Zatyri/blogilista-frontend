import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Createblog from './Createblog'

const blog = {
  title: 'this is a test blog',
  author: 'Bruce Wayne',
  url: 'www.test.io',
  likes: 10,
  user: {
    name: 'Batman'
  }
}

describe('Test Blog component', () => {
  test('Test that only title and author is shown initially', () => {

    const component = render(
      <Blog blog={blog}/>
    )

    expect(component.container).toHaveTextContent('this is a test blog')
    expect(component.container).toHaveTextContent('Bruce Wayne')
    expect(component.container).not.toHaveTextContent('www.test.io')
    expect(component.container).not.toHaveTextContent(10)
    expect(component.container).not.toHaveTextContent('Batman')
  })

  test('Test that likes, url and poster is shown on "show" button', () => {
    const component = render(
      <Blog blog={blog}/>
    )

    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('this is a test blog')
    expect(component.container).toHaveTextContent('Bruce Wayne')
    expect(component.container).toHaveTextContent('www.test.io')
    expect(component.container).toHaveTextContent(10)
    expect(component.container).toHaveTextContent('Batman')

  })

  test('Test that likebutton works', async () => {

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleLike={mockHandler}/>
    )

    const showButton = component.getByText('show')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})

describe('Blog form tests', () => {
  const mockHandler = jest.fn()
  test('test create blog', () => {
    const component = render(
      <Createblog createblog={mockHandler} />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    const title = 'testing form'
    const author = 'Tommy Testman'
    const url = 'www.testing.io'

    fireEvent.change(inputTitle, {
      target: { value: title }
    })
    fireEvent.change(inputAuthor, {
      target: { value: author }
    })
    fireEvent.change(inputUrl, {
      target: { value: url }
    })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].content).toBe('testing form' )

  })
})