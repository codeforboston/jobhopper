/**
 * Jobhopper API
 * Jobhopper Swagger API Docs
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.JobsApi);
  }
}(this, function(expect, JobsApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new JobsApi.DefaultApi();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('DefaultApi', function() {
    describe('getBlsTransitions', function() {
      it('should call getBlsTransitions successfully', function(done) {
        //uncomment below and update the code to test getBlsTransitions
        //instance.getBlsTransitions(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listSocLists', function() {
      it('should call listSocLists successfully', function(done) {
        //uncomment below and update the code to test listSocLists
        //instance.listSocLists(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listStateNames', function() {
      it('should call listStateNames successfully', function(done) {
        //uncomment below and update the code to test listStateNames
        //instance.listStateNames(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
