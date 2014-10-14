var TABS = function(selector) {
    var container = $(selector),
	
	     
		moveToTab = function (tabId, tab) {
		    if (typeof tabId === 'string') {
			    tabId = (tabId.indexOf("#") < 0 ) ? "#" + tabId : tabId;
				if(!tab) {
				
				    tab = $('[href=' + tabId + ']');
				
				
				}
				
			
			}else {
			     tab = $(tabId);
				 tabId = tab.attr("href");
			}
			
			$('.body div' , container).removeClass("current").filter(tabId).addClass('current');
			$(".head li a", container).removeClass("current").filter(tab).addClass("current");
			
		};
		
	$('.head li a', container).live('click', function() {
	
	    var id= $(this).attr("href");
		moveToTab(id);
	
	});
	
	return{
	    moveToTab : moveToTab
	
	}
	
	
	}
		
		
		