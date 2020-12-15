# JobsApi.DefaultApi

All URIs are relative to *http://127.0.0.1:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getBlsTransitions**](DefaultApi.md#getBlsTransitions) | **GET** /api/v1/jobs/transitions-extended/ | 
[**listSocLists**](DefaultApi.md#listSocLists) | **GET** /api/v1/jobs/soc-list/ | 
[**listStateNames**](DefaultApi.md#listStateNames) | **GET** /api/v1/jobs/state/ | 



## getBlsTransitions

> [BlsTransition] getBlsTransitions(opts)



### Example

```javascript
import JobsApi from 'JobsAPI';

let apiInstance = new JobsApi.DefaultApi();
let opts = {
  'areaTitle': "areaTitle_example", // String | Location
  'soc': "soc_example", // String | Source SOC Code
  'minTransitionProbability': 3.4 // Number | Minimum transition probability
};
apiInstance.getBlsTransitions(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **areaTitle** | **String**| Location | [optional] 
 **soc** | **String**| Source SOC Code | [optional] 
 **minTransitionProbability** | **Number**| Minimum transition probability | [optional] 

### Return type

[**[BlsTransition]**](BlsTransition.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listSocLists

> SocLists listSocLists(opts)



### Example

```javascript
import JobsApi from 'JobsAPI';

let apiInstance = new JobsApi.DefaultApi();
let opts = {
  'limit': 56, // Number | Number of results to return per page.
  'offset': 56, // Number | The initial index from which to return the results.
  'socs': "socs_example" // String | socs
};
apiInstance.listSocLists(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Number of results to return per page. | [optional] 
 **offset** | **Number**| The initial index from which to return the results. | [optional] 
 **socs** | **String**| socs | [optional] 

### Return type

[**SocLists**](SocLists.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listStateNames

> StateNames listStateNames(opts)



### Example

```javascript
import JobsApi from 'JobsAPI';

let apiInstance = new JobsApi.DefaultApi();
let opts = {
  'limit': 56, // Number | Number of results to return per page.
  'offset': 56 // Number | The initial index from which to return the results.
};
apiInstance.listStateNames(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Number of results to return per page. | [optional] 
 **offset** | **Number**| The initial index from which to return the results. | [optional] 

### Return type

[**StateNames**](StateNames.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

