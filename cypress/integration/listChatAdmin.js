import {
  verifyContainsText,
  clickButton,
  login,
  verifyElementVisible,
  verifyElementContainsText,
  clientSendMessage,
  verifyContainsUrl,
} from '../actions/actionBase';

describe('Criar funcionalidade de lista de conversas de chat na visão de administrador', () => {
  beforeEach( () => {
    cy.exec('cd back-end && npx sequelize-cli db:drop');
    cy.exec('cd back-end && npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    cy.exec('cd back-end && npx sequelize-cli db:seed:all $');
    cy.task('deleteCollection', 'messages');
    cy.visit.skip(`${Cypress.config().baseUrl}/login`);
  });

  it.skip('Será validado que ao entrar na tela de `admin/chats` e não houver conversas e validado se contém o texto `Nenhuma conversa por aqui`', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    verifyContainsText('Nenhuma conversa por aqui');
  });

  it.skip('Será validado que ao entrar na tela de `admin/chats` e existir uma conversa verifico se contém o card', () => {
    clientSendMessage();
    cy.visit.skip(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    cy.reload();
    verifyElementVisible('[data-testid="containerChat"]');
  });

  it.skip('Será validado que ao entrar na tela de `admin/chats` e existir uma conversa verifico se dentro do card contem o email do cliente', () => {
    clientSendMessage();
    cy.visit.skip(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    cy.reload();
    verifyElementVisible('[data-testid="profile-name"]');
    verifyElementContainsText('[data-testid="profile-name"]', 'zebirita@gmail.com');
  });

  it.skip('Será validado que ao entrar na tela de `admin/chats` e existir uma conversa verifico se dentro do card contem data da ultima mensagem', () => {
    clientSendMessage();
    cy.visit.skip(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    cy.reload();
    verifyElementVisible('[data-testid="last-message"]');
  });

  it.skip('Será validado que ao clicar no card da conversa e redirecionado pra conversa', () => {
    clientSendMessage();
    cy.visit.skip(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    cy.reload();
    clickButton('[data-testid="profile-name"]');
    verifyContainsUrl('http://localhost:3000/admin/chat');
  });
});
