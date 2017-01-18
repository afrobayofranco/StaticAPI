// Requires,
require('dotenv').config();
const expect = require('chai').expect;
const functions = require('../src/library/functions');
const api = require('../src/models/api');
const debugTool = require('andydebugtool');

// Tests, starts by calling the API from Models.
describe('Models_API', () => {
  // Stores the response from url_shortener after origTestUrl was sent.
  const origTestUrl = 'www.facebook.com';
  const testUrls = functions.url_shortener(origTestUrl);
  // Test for CREATE
  it('Should CREATE record in db', (done) => {
    // Calls API Create and brings data stored in testUrls to compore with data.
    api.create(testUrls, (data) => {
      // Stores id for short_url after create to be available leater on.
      testUrls.id = data.dataValues.id;
      // Comparisons, if passed test passes.
      expect(testUrls.original_url).to.be.equal(data.dataValues.original_url);
      expect(testUrls.shortened_url).to.be.equal(data.dataValues.shortened_url);
      done();
      debugTool.debug('CREATE test passed to create url in db', 'success');
    }, () => {
      debugTool.debug('CREATE test failed to create url in db', 'error');
    });
  });

  // Test for GET ALL
  it('Should GET ALL from db', (done) => {
    // Calls API getall and brings all data
    api.getAll((data) => {
      // Comparison, data lenght should be more than 0.
      expect(data.length).to.be.above(0);
      done();
      debugTool.debug('GET ALL passed to get all urls in db', 'success');
    }, () => {
      debugTool.debug('GET ALL fail to get all urls in db', 'error');
    });
  });

  // Test for Get by Id
  it('Should GET by ID from db', (done) => {
    // Calls API Create and brings data stored in testUrls to compore with data.
    api.getbyId(testUrls, (data) => {
      // Comparisons, if passed test passes.
      expect(testUrls.id).to.be.equal(data.dataValues.id);
      expect(testUrls.original_url).to.be.equal(data.dataValues.original_url);
      expect(testUrls.shortened_url).to.be.equal(data.dataValues.shortened_url);
      done();
      debugTool.debug('GET by Id passed to get by Id url in db', 'success');
    }, () => {
      debugTool.debug('GET by Id fail to get by Id url in db', 'error');
    });
  });

  // Test for UPDATE
  it('Should UPDATE record by ID in db', (done) => {
    // Stores the response from url_shortener after updatTestUrl was sent.
    const updatTestUrl = 'www.andytest.com';
    const newUrls = functions.url_shortener(updatTestUrl);
    // Stores new values coming from newUrl
    testUrls.original_url = newUrls.original_url;
    testUrls.shortened_url = newUrls.shortened_url;
    // Calls API updatebyId and passes testUrls were if updated response should be [1]
    api.updatebyId(testUrls, (data) => {
      // Compare if record updated response is [1], test passed
      expect(data[0]).to.be.equal(1);
      done();
      debugTool.debug('UPDATE by Id passed to update url in db', 'success');
    }, () => {
      debugTool.debug('UPDATE by Id fail to update url in db', 'error');
    });
  });

  // Test for GO
  it('Should GET original URL by shortened_url (GO)', (done) => {
    // Call API getbyshortUrl, passes the shortened url and brings data.
    api.getbyshortURL(testUrls.shortened_url, (data) => {
      // Compares the sent originalUrl to the data recieved originalUrl
      expect(testUrls.original_url).to.be.equal(data.dataValues.original_url);
      done();
      debugTool.debug('(GO) passed to get original url by shortenes url', 'success');
    }, () => {
      debugTool.debug('(GO) Fail to get original url by shortenes url', 'error');
    });
  });

  // Test for DELETE
  it('Should DELETE record by ID in db', (done) => {
    // Calls API delete by Id and sends the testUrl to be deleted, brings data
    api.deletebyId(testUrls, (data) => {
      // Compares data to 1, which is correct response for mySql deleted record.
      expect(data).to.be.equal(1);
      done();
      debugTool.debug('DELETE passed to delete url in db', 'success');
    }, () => {
      debugTool.debug('DELETE fail to delete url in db', 'error');
    });
  });
});
