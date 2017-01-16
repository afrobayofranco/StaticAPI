// Requires,
const request = require('supertest');
const debugTool = require('../src/library/debugTool');

// Array with objects containing each of the endpoints information.
// description, route and Http method
const routes = [
  {
    descrip: 'API Status: /status',
    route: '/status',
    method: 'Get',
  },
  {
    descrip: 'Create a new record: /api/v1/urls',
    route: '/api/v1/urls',
    method: 'Post',
  },
  {
    descrip: 'Get all records: /api/v1/urls',
    route: '/api/v1/urls',
    method: 'Get',
  },
  {
    descrip: 'Get record by Id: /api/v1/urls/:id',
    route: '/api/v1/urls/:id',
    method: 'Get',
  },
  {
    descrip: 'Update record by Id: /api/v1/urls/:id',
    route: '/api/v1/urls/:id',
    method: 'Post',
  },
  {
    descrip: 'Delete record by Id: /api/v1/urls/:id',
    route: '/api/v1/urls/:id',
    method: 'Delete',
  },
  {
    descrip: 'Go to url by short Id: /go/:shortId',
    route: '/go/:shortId',
    method: 'Get',
  },
];

// Tests, starts by calling all within ROUTES.
describe('Routes', () => {
  // Stores the server instance while the Test is run
  let server;
  // Starts the server before each test by calling it
  beforeEach(() => {
    server = require('../src/server.js');
  });
  // Closes the server after each test
  afterEach(() => {
    server.close();
  });

  // for Each Loop to go through the array
  routes.forEach((route) => {
    // Switch starts bringing in the route method
    switch (route.method) {
      // First case: POST
      case 'Post':
        it(route.descrip, (done) => {
          request(server)
            .post(route.route)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
          debugTool.debug('POST Test working on __Routes_api ' + route.route, 'success');
        });
        break;
      // Second case: GET
      case 'Get':
        it(route.descrip, (done) => {
          request(server)
            .get(route.route)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
          debugTool.debug('GET Test working on __Routes_api ' + route.route, 'success');
        });
        break;
      // Third case: UPDATE
      case 'Delete':
        it(route.descrip, (done) => {
          request(server)
            .delete(route.route)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
          debugTool.debug('DELETE Test working on __Routes_api ' + route.route, 'success');
        });
        break;
      default:
    }
  });
});
