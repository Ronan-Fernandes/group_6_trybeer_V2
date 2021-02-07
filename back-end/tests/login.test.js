const frisby = require('frisby');
const shell = require('shelljs');

const PORT = process.env.PORT || 3001;

const url = 'http://localhost:3001'; // Modify to .env
// const url = `http://localhost:${PORT}`; // Modify to .env

describe('Must exist endpoint POST `/login`', () => {
  beforeEach(async () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    await frisby
      .post(`${url}/login`, {
        email: 'zebirita@gmail.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        console.log('result :', result.data.role);
        expect(result.data.role).toBe('client');
      });
  });

  it('Será validado que não é possível fazer login sem o campo `email`', async () => {
    await frisby
      .post(`${url}/login`, {
        password: '123456',
      })
      .expect('status', 500)
      .then((response) => {
        const { body } = response;
        expect(body).toBe('"email" is required');
      });
  });

  it('test that it is not possible to login with an empty password', async () => {
    await frisby
      .post(`${url}/login`, {
        email: 'user1@gmail.com',
      })
      .expect('status', 500)
      .then((response) => {
        const { body } = response;
        // const result = JSON.parse(body);
        console.log('result 3 :', body);

        expect(body).toBe('"password" is required');
      });
  });

  it('test that it is not possible to login with a user that does not exist', async () => {
    await frisby
      .post(`${url}/login`, {
        email: 'notvalid@gmail.com',
        password: '123456',
      })
      .expect('status', 500)
      .then((response) => {
        const { body } = response;
        console.log('result 4:', body);

        // const result = JSON.parse(body);
        expect(body).toBe('Login ou senha inválido');
      });
  });
});
