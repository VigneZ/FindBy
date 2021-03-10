console.log("Hello JQSF - BG Script");


chrome.contextMenus.create({
	"id":"FindBy",
	"title":"@FindBy",
	"contexts":["all"]
});


chrome.contextMenus.onClicked.addListener(function (clickData){
	 
	
	if (clickData.menuItemId=="FindBy"){
		
		 
		chrome.tabs.query({active:true,currentWindow:true},function (tabs){
				chrome.tabs.sendMessage(tabs[0].id,{action:"FindBy"});
				
	
		});
	}

 } ); 