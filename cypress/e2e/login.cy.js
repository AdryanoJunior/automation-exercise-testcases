import userData from '../fixtures/user-data.json'

describe('Casos de Teste - Login', () => {

    it('Deve fazer login com sucesso', () => {
        cy.visit('login')
        cy.get('[data-qa="login-email"]').type(userData.userSuccess.username)
        cy.get('[data-qa="login-password"]').type(userData.userSuccess.password)
        cy.get('[data-qa="login-button"]').click()
        cy.get('body').should('contain', 'Logged in as UserTest')
    });

    it('Deve impedir o login e aparecer uma mensagem de erro ao inserir dados inválidos', () => {
        cy.visit('login')
        cy.get('[data-qa="login-email"]').type(userData.userFail.username)
        cy.get('[data-qa="login-password"]').type(userData.userFail.password)
        cy.get('[data-qa="login-button"]').click()
        cy.get('body').should('contain', 'Your email or password is incorrect!')
    });

    it('Deve aparecer una mensagem de erro ao tentar fazer o login sem inserir o email', () => {
        cy.visit('login')
        cy.get('[data-qa="login-password"]').type(userData.userSuccess.password)
        cy.get('[data-qa="login-button"]').click()
        cy.get('[data-qa="login-email"]')
        .then(($imput) =>{
            expect($imput[0].validationMessage).to.eq('Preencha este campo.')
        })
    });

    it('Deve aparecer una mensagem de erro ao tentar fazer o login sem inserir a senha', () => {
        cy.visit('login')
        cy.get('[data-qa="login-email"]').type(userData.userFail.username)
        cy.get('[data-qa="login-button"]').click()
        cy.get('[data-qa="login-password"]')
         .then(($imput) =>{
            expect($imput[0].validationMessage).to.eq('Preencha este campo.')
         })
    });

    it.only('Deve deslogar com sucesso', () => {
        cy.visit('login')
        cy.get('[data-qa="login-email"]').type(userData.userSuccess.username)
        cy.get('[data-qa="login-password"]').type(userData.userSuccess.password)
        cy.get('[data-qa="login-button"]').click()
        cy.get('body').should('contain', 'Logged in as UserTest')
        cy.get("[href='/logout']").click()
        cy.get('body').should('contain', 'Login to your account')
    });
});