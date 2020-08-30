import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('Test Blog component', () => {
  test('Test that only title and author is shown initially', () => {
    const blog = {
      title: 'this is a test blog',
      author: 'Bruce Wayne',
      url: 'www.test.io',
      likes: 10,
      user: {
        name: 'Batman'
      }
    }
    const component = render(
      <Blog blog={blog}/>
    )

    expect(component.container).toHaveTextContent('this is a test blog')
    expect(component.container).toHaveTextContent('Bruce Wayne')
    expect(component.container).not.toHaveTextContent('www.test.io')
    expect(component.container).not.toHaveTextContent(10)
    expect(component.container).not.toHaveTextContent('Batman')
  })
})