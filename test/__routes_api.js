const expect = require('chai').expect;
const request = require('supertest');
const debugTool = require('../src/library/debugTool');

describe('Routes', () => {
  let server;
  // var url;

  beforeEach(() => {
    server = require('../src/server.js');
  });
  afterEach(() => {
    server.close();
  });

  it('Check for status', (done) => {
    request(server)
      .get('/status')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    debugTool.debug('Success', 'success');
  });

  it('Create Post on /api/v1/urls', (done) => {
    request(server)
      .post('/api/v1/urls')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    debugTool.debug('Success', 'success');
  });

  it('Get all on /api/v1/urls', (done) => {
    request(server)
      .get('/api/v1/urls')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    debugTool.debug('Success', 'success');
  });

  it('Get by Id on /api/v1/urls/:id', (done) => {
    request(server)
      .get('/api/v1/urls/:id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    debugTool.debug('Success', 'success');
  });

  it('Update by Id on /api/v1/urls/:id', (done) => {
    request(server)
      .post('/api/v1/urls/:id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    debugTool.debug('Success', 'success');
  });

  it('Go to by short url on /go/:shortURL', (done) => {
    request(server)
      .get('/go/:shortURL')
      .set('Accept', 'application/json')
      .expect('Content-Type', /html/)
      .expect(200, done);
    debugTool.debug('Success', 'success');
  });

  it('Delete by Id on /api/v1/urls/:id', (done) => {
    request(server)
      .delete('/api/v1/urls/:id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    debugTool.debug('Success', 'success');
  });
});



/*
        } else if (routes[i].method === 'Post') {
          request(server)
            .post(routes[i].route)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done());
          debugTool.debug('sucess on post', 'sucess');
        } else {
          request(server)
            .delete(routes[i].route)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done());
          debugTool.debug('sucess on delete', 'sucess');
        }
*/

/*
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
  {
    descrip: 'Route Test',
    route: '/api/v1/short',
    method: 'Get',
  },
];
*/
