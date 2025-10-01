import { faker } from '@faker-js/faker';

describe('Casos de Teste - Cadastro de Usuário', () => {

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.visit('login')
    cy.get('[data-qa="signup-name"]').type('UserTest')
    cy.get('[data-qa="signup-email"]').type(faker.internet.email({ firstName: 'TestingQA'}))
    cy.get('[data-qa="signup-button"]').click()
    cy.location('pathname').should('eq', '/signup')
    cy.get('#id_gender1').click()
    cy.get('[data-qa="password"]').type('Test12345$')
    cy.get('[data-qa="days"]').select('28')
    cy.get('[data-qa="months"]').select('November')
    cy.get('[data-qa="years"]').select('1999')
    cy.get('[name="newsletter"]').click()
    cy.get('[name="optin"]').click()
    cy.get('[data-qa="first_name"]').type(faker.person.firstName('female'))
    cy.get('[data-qa="last_name"]').type(faker.person.lastName('female'))
    cy.get('[data-qa="company"]').type(faker.company.name())
    cy.get('[data-qa="address"]').type(faker.location.streetAddress(true))
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type(faker.location.state())
    cy.get('[data-qa="city"]').type(faker.location.city())
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
    cy.get('[data-qa="mobile_number"]').type(faker.phone.number({ style: 'national' }))
    cy.get('[data-qa="create-account"]').click()
    cy.location('pathname').should('eq', '/account_created')
    cy.get('body').should('contain', 'Congratulations! Your new account has been successfully created!')
    cy.get('body').should('contain', 'You can now take advantage of member privileges to enhance your online shopping experience with us.')
    cy.get('[data-qa="continue-button"]').click()
  })

  it('Deve aparecer uma mensagem de erro ao tentar cadastrar sem preencher o campo de email', () => {
    cy.visit('login')
    cy.get('[data-qa="signup-name"]').type('UserTest')
    cy.get('[data-qa="signup-button"]').click()
    cy.get('[data-qa="signup-email"]')
      .then(($input) => {
        expect($input[0].validationMessage).to.eq('Preencha este campo.')
  });
  })

  it('Deve aparecer uma mensagem de erro ao tentar cadastrar sem preencher o campo de usuário', () => {
     cy.visit('login')
     cy.get('[data-qa="signup-email"]').type(faker.internet.email({ firstName: 'TestingQA'}))
     cy.get('[data-qa="signup-button"]').click()
     cy.get('[data-qa="signup-name"]')
     .then(($input) =>{
      expect($input[0].validationMessage).to.eq('Preencha este campo.')
     })
  });
})
