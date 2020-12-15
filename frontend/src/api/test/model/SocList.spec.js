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
    instance = new JobsApi.SocList();
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

  describe('SocList', function() {
    it('should create an instance of SocList', function() {
      // uncomment below and update the code to test SocList
      //var instane = new JobsApi.SocList();
      //expect(instance).to.be.a(JobsApi.SocList);
    });

    it('should have the property socCode (base name: "soc_code")', function() {
      // uncomment below and update the code to test the property socCode
      //var instane = new JobsApi.SocList();
      //expect(instance).to.be();
    });

    it('should have the property socTitle (base name: "soc_title")', function() {
      // uncomment below and update the code to test the property socTitle
      //var instane = new JobsApi.SocList();
      //expect(instance).to.be();
    });

  });

}));
