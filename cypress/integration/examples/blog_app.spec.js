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
  })