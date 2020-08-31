/* eslint-disable no-undef */
describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
          username:'batman',
          name:'Bruce Wayne',
          password:'catwoman'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {      
      cy.contains('Login')        
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('batman')
            cy.get('#password').type('catwoman')
            cy.get('#login-button').click()

            cy.contains('Bruce Wayne is logged in' )
            
            })
        
            it('fails with wrong credentials', function() {
            cy.get('#username').type('batman')
            cy.get('#password').type('robin')
            cy.get('#login-button').click()

            cy.contains('Wrong username or password' )
        })
    })
    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('batman')
            cy.get('#password').type('catwoman')
            cy.get('#login-button').click()
        })
    
        it('A blog can be created', function() {
          cy.get('#createBlog-button').click()
          cy.get('#title').type('This is a test blog')
          cy.get('#author').type('Tommy Testman')
          cy.get('#url').type('www.test.fi')
          cy.get('#submit-Blog-button').click()

          cy.contains('This is a test blog')
        })
      })
})