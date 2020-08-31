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

            cy.get('#createBlog-button').click()
            cy.wait(100)
            cy.get('#title').type('Default test blog')
            cy.get('#author').type('Tommy Testman')
            cy.get('#url').type('www.test.fi')
            cy.get('#submit-Blog-button').click()
        })
    
        it('A blog can be created', function() {
          cy.get('#createBlog-button').click()
          cy.wait(100)
          cy.get('#title').type('Testing blog creation')
          cy.get('#author').type('Tommy Testman')
          cy.get('#url').type('www.test.fi')
          cy.get('#submit-Blog-button').click()

          cy.get('.blogs').should('contain', 'Testing blog creation')
        })

        it('Test if a blog can be liked', function() {
            cy.get('.blogs')
                .contains('Default test blog')
                .contains('show').click()
                .get('.like-button').click()
                
            cy.get('.like').should('contain', 1)            
        })
        
        it('Test if blogs are put in like order', function() {
            cy.get('#createBlog-button').click()
            cy.wait(100)
            cy.get('#title').type('Second test blog')
            cy.get('#author').type('Tommy Testman')
            cy.get('#url').type('www.test.fi')
            cy.get('#submit-Blog-button').click()

            cy.get('#createBlog-button').click()
            cy.wait(100)
            cy.get('#title').type('Third test blog')
            cy.get('#author').type('Tommy Testman')
            cy.get('#url').type('www.test.fi')
            cy.get('#submit-Blog-button').click()

            cy.get('.blogs')
            .contains('Default test blog')
            .contains('show').click()
            for(let n = 0; n < 10; n++){
                cy.get('.like-button').click()
                cy.wait(500)
            }
            cy.contains('hide').click()

            cy.get('.blogs')
            .contains('Second test blog')
            .contains('show').click()
            for(let n = 0; n < 15; n++){
                cy.get('.like-button').click()
                cy.wait(500)
            }

            cy.get('.blogs').first().contains('Second test blog')
            cy.get('.blogs').eq(1).contains('Default test blog')
            cy.get('.blogs').eq(2).contains('Third test blog')
        })
      })

      describe('Delete test', function() {
        beforeEach(function() {
            cy.get('#username').type('batman')
            cy.get('#password').type('catwoman')
            cy.get('#login-button').click()

            cy.get('#createBlog-button').click()
            cy.get('#title').type('Default test blog')
            cy.get('#author').type('Tommy Testman')
            cy.get('#url').type('www.test.fi')
            cy.get('#submit-Blog-button').click()
        })

        it('Test if user can delet blog', function() {
            cy.get('.blogs')
                .contains('Default test blog')
                .contains('show').click()
                .get('.like-button').click()
                
            cy.get('.delete-button').click()
            cy.contains('Default test blog was deleted')      
        })
    })

})