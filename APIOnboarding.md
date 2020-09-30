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
