require('dotenv').config();
const expect = require('chai').expect;
const functions = require('../src/library/functions');
const api = require('../src/models/api');
const debugTool = require('../src/library/debugTool');

describe('Models_API', () => {
  const testUrls = functions.url_shortener('www.facebook.com');
  it('Should CREATE record in db', (done) => {
    api.create(testUrls, (data) => {
      testUrls.id = data.dataValues.id;
      expect(testUrls.original_url).to.be.equal(data.dataValues.original_url);
      expect(testUrls.shortened_url).to.be.equal(data.dataValues.shortened_url);
      done();
    }, () => {
      debugTool.debug('Fail to create url in db', 'error');
    });
  });

  it('Should GET ALL from db', (done) => {
    api.getAll((data) => {
      expect(data.length).to.be.above(0);
      done();
    }, () => {
      debugTool.debug('Fail to get all urls in db', 'error');
    });
  });

  it('Should GET by ID from db', (done) => {
    api.getbyId(testUrls, (data) => {
      expect(testUrls.id).to.be.equal(data.dataValues.id);
      expect(testUrls.original_url).to.be.equal(data.dataValues.original_url);
      expect(testUrls.shortened_url).to.be.equal(data.dataValues.shortened_url);
      done();
    }, () => {
      debugTool.debug('Fail to get all urls in db', 'error');
    });
  });

  it('Should UPDATE record by ID in db', (done) => {
    const newUrls = functions.url_shortener('www.andytest.com');
    testUrls.original_url = newUrls.original_url;
    testUrls.shortened_url = newUrls.shortened_url;
    api.updatebyId(testUrls, (data) => {
      expect(testUrls.id).to.be.equal(data.dataValues.id);
      expect(testUrls.original_url).to.be.equal(data.dataValues.original_url);
      expect(testUrls.shortened_url).to.be.equal(data.dataValues.shortened_url);
      done();
    }, () => {
      debugTool.debug('Fail to update url in db', 'error');
    });
  });

  it('Should DELETE record by ID in db', (done) => {
    api.deletebyId(testUrls, (data) => {
      expect(data).to.be.equal(1);
      done();
    }, () => {
      debugTool.debug('Fail to delete url in db', 'error');
    });
  });
});
