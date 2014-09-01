function jsonpRequest(src, cb, cbKey){
	if(src && cb) request(src, cb, cbKey);
	else errorResponse();
	
	function request(src, cb, cbKey){ if(!cbKey) cbKey = 'callback'; cycle(src, cb, cbKey); }
	function cycle(src, cb, cbKey){ var target = initScript(src, cb, cbKey); addScript(target); }
	function errorResponse(){
		console.error('Well shoot, it looks like I\'m missing some essential arguments. Please try again!');
	}
	
	function addScript(target){ var head = getDocumentHead(); head.appendChild(target); }
	function removeScript(target){ var head = getDocumentHead(); head.removeChild(target); target = null; }
	function initScript(src, cb, cbKey){
		var target = document.createElement('script');
		target.type = 'text/javascript';
		target.src = src + getCallback(cb, cbKey, target);
		return target;
	}
	
	function getDocumentHead(){ return document.head || document.getElementsByTagName('head')[0]; }
	function getCallback(cb, cbKey, target){
		var cbName = 'jsonPCallback' + (new Date().getTime()),
		    closure = getClosure(cb, cbName, target);
		window[cbName] = closure;
		return '&' + cbKey + '=' + cbName;
	}
	function getClosure(cb, cbName, target){
		var closure = function(cb, cbName, target){
			return function(e){
				cb(e); window[cbName] = undefined; removeScript(target);
			}
		    }(cb, cbName, target);
		return closure;
	}
};
