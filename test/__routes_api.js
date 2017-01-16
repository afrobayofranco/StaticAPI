const request = require('supertest');
const debugTool = require('../src/library/debugTool');

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


describe('Routes', () => {
  let server;

  beforeEach(() => {
    server = require('../src/server.js');
  });
  afterEach(() => {
    server.close();
  });

  routes.forEach((route) => {
    switch (route.method) {
      case 'Post':
        it(route.descrip, (done) => {
          request(server)
            .post(route.route)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
          debugTool.debug('Success', 'success');
        });
        break;
      case 'Get':
        it(route.descrip, (done) => {
          request(server)
            .get(route.route)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
          debugTool.debug('Success', 'success');
        });
        break;
      case 'Delete':
        it(route.descrip, (done) => {
          request(server)
            .delete(route.route)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
          debugTool.debug('Success', 'success');
        });
        break;
      default:
    }
  });
});
