import { Application } from 'express';
import { assert } from 'chai';
import { User } from '../src/entity/User';
import { userInterface } from '../src/interface/User';
import { createConnection, getConnectionOptions } from 'typeorm';
import supertest from 'supertest';
import { Server } from '../src/server';
import { dbConnection } from '../src/dbServer';

let app: Application;

before(async () => {
  try {
    await dbConnection();
    app = new Server().app;
    await app.listen(4000);
  } catch (err) {
    console.log(err);
  }
});
// import 'module-alias/register';

describe('Testing user component', () => {
  const testUser: userInterface = User.mockTestBoard();
  let testUserModified: userInterface;

  describe('POST /users', () => {
    it('responds with status 400', (done) => {
      supertest(app)
        .post('/users')
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done());
    });

    it('responds with new user', (done) => {
      supertest(app)
        .post('/users')
        .send(testUser)
        .set('Accept', 'application/json')
        .end((err, res) => {
          try {
            if (err) throw err;
            const status = res.statusCode;
            const user: User = res.body;
            // Assert status
            assert(status === res.status, 'status does not match');

            // Assert user
            assert.isObject(user, 'user should be an object');
            assert(user.username === testUser.username, 'username does not match');
            assert(user.mobile_number === testUser.mobile_number, 'mobile number does not match');
            testUserModified = user;
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

});
