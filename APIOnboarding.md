# How to Use Postman 

Postman makes it easy to explore and test APIs. In order to use it, follow these steps:

First, download Postman from [https://www.postman.com/](https://www.postman.com/) and sign up for a free account. 

## Testing an API in Postman
Once you have postman installed and the API collection imported, you can run [postman tests](https://learning.postman.com/docs/writing-scripts/test-scripts/) to ensure everything is working properly.
Tests can be defined either at the collection level to run on each api, or on the API level to test each API individually.

To test a collection as a whole, you can expand the collection options and click `Run`.
To add tests, edit the collection and write tests in Javascript in the Tests tab.

To test an individual API, there is a `Tests` tab in the same section where you are defining your API,
and to run you can simply click `Send` and review the test results in the `Test Results` section of the response panel.

## Creating a simple get request from postman from a publicly available API
---
We can set up a sample GET request with the publicly available BLS API (v. 1.0) to demonstrate how to use Postman. 

* First, navigate to the `APIs` tab on Postman. For this demo, we will pull data from the Consumer Price Index (series `CUUR0000SA0`) and Chained Consumer Price Index (series `SUUR0000SA0`) from 2011 to 2014 from the BLS API.
* Set the request type to `GET`
* Input the API endpoint for the request: `https://api.bls.gov/publicAPI/v1/timeseries/data/`
* We can specify the data we want to pull by sending BLS API-specific parameters in the body of our request. Navigate to the `Body` tab in the Postman request, and input the following: `{"seriesid": ["CUUR0000SA0","SUUR0000SA0"],"startyear":"2011", "endyear":"2014"}`
* We'll also specify the response format via the request header. Navigate to the `Headers` tab in the Postman request. Add `Content-type` as a key, with value `"application/json"`. 
* Finally, hit the `Send` button and make sure that response returned is as expected.

For more information on the BLS API used in this example, see: https://www.bls.gov/developers/api_signature.htm#single
