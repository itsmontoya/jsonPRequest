### jsonPRequest ###

#### Overview ####
jsonPRequest is a simple JSONP request manager which takes in a source URL, a callback function, and callback key. Under the hood, jsonPRequest will create a temporary window-level function which references the provided callback. One request completion, the JSONP script will be removed from the DOM, and the window-level function reference will be set to null. 

#### Example ####
```js
var PageController = function(){

	// Will send a JSONP request to '/api/page?callback=jsonPRequest[random number sequence]
	jsonpRequest('/api/page', load, 'callback');


	function load(data){
		//JSONP request is complete. Begin load procedures
	}
};
```
