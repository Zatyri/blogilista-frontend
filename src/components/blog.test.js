import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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