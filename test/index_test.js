'use strict'

const nunjucks = require('nunjucks');
const SetAsyncExtension = require('./../index');

let assert = require('assert');
describe('SetAsyncExtension', function() {
  describe('setAsync', function() {
    it('should render the template with My async content using setAsync without parens', function(done) {
      let env = new nunjucks.Environment();
      env.addExtension('SetAsyncExtension', new SetAsyncExtension());
      env.addGlobal('test', function(cb) {
        setTimeout(_ => {
          cb(null, 'My async content');
        }, 50);
      });
      env.renderString("{% setAsync 'name', test, [] %}{{name}}", (err, content) => {
        assert.equal('My async content', content)
        done();
      })
    });

    it('should render the template with My async content using setAsync with parens', function(done) {
      let env = new nunjucks.Environment();
      env.addExtension('SetAsyncExtension', new SetAsyncExtension());
      env.addGlobal('test', function(cb) {
        setTimeout(_ => {
          cb(null, 'My async content');
        }, 50);
      });
      env.renderString("{% setAsync ('name', test, []) %}{{name}}", (err, content) => {
        assert.equal('My async content', content)
        done();
      })
    });
  });
});
