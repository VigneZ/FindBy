
console.clear();
console.log("jQSF - Generates jQuery Selctor for selected element");

var target;
var JQSelectors = new Array();

window.addEventListener("contextmenu", getTarget);
function getTarget(e) {
	target = e.target;
	var onclkValElement=target.getAttribute("onclick");
	elePar=$(target).parents()[0];
	var onclkValParent=elePar.getAttribute("onclick");
	if (onclkValElement==null || onclkValElement==""){
		onclkValElement=" ";
	}
	if (onclkValParent==null || onclkValParent==""){
		onclkValParent=" ";
	}

	// Show the popup only if context menu is disabled
	
	if ( (onclkValElement.indexOf("false")>=0)  || (onclkValParent.indexOf("false")>=0) ){
		LoadjQSFPopup(target);
	}

}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == "FindBy") {
		//genjQS();
		LoadjQSFPopup(target);
	}
});


//Utility functions
function addTextSelector(eleSelected) {
	strText = $(eleSelected).text().trim();
	if (!isEmpty(strText) && !isBlank(strText)) {
		return strText;
	}
	return null;
}
function addJQS(strJQS) {
	//console.log("In addJQS with param " + strJQS);

	JQSelectors[JQSelectors.length] = strJQS;
}

function isEmpty(str) {
	return (!str || 0 === str.length);
}

function isBlank(str) {
	return (!str || /^\s*$/.test(str));
}
function isBlankAndEmpty(str) {
	return (!str || /^\s*$/.test(str)) && (!str || 0 === str.length);
}
