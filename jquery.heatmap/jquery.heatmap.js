/*!
 * jQuery Heatmap
 * Original author: @lelandcope
 * Version: 1.0
 * © 2013 Leland Cope All Rights Reserved
 */

(function( $ )
{ 
  var addLocationsAllowed = true;
  var showingLocations = false;
 
  $.fn.heatmap = function( method ) 
  { 
  	var methods = $.heatmap.methods;
  	
    // Method calling logic 
    if ( methods[method] ) 
    { 
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 )); 
    } else if ( typeof method === 'object' || ! method ) 
    { 
      return methods.init.apply( this, arguments ); 
    } else 
    { 
      $.error( 'Method ' +  method + ' does not exist on jQuery.heatmap' ); 
    }     
   
  }; 
   
   
  $.heatmap = 
  { 
	methods : { 
		init : function(options) 
		{ 
			var options = $.extend($.heatmap.defaults, options);
			
			if(options.url == undefined)
			{
		  		$.error( 'You must supply a url to save the data to. jQuery.heatmap' );
		  		return;
			}
			
			return this.each(function()
			{
			    var current = $(options.offsetObject);
			       
			    $(this).click(function(e)
			    {
			    	if(!addLocationsAllowed) return;
			    
			       if(e.hasOwnProperty('originalEvent') && e.pageX >= current.offset().left && e.pageX <= current.offset().left+current.width())
			       {
			       	   $.ajax({
				       	   url : options.url,
				       	   type : 'post',
				       	   data : { 'heatmap[heatmap_click_x]':e.pageX, 'heatmap[heatmap_click_y]':e.pageY, 'heatmap[heatmap_click_offset]':current.offset().left, 'heatmap[heatmap_click_location]':window.location.href },
				       	   async : true
			       	   });
			       	   
			       	   
			       	   addLocation(e.pageX, e.pageY, current.offset().left);
				    }
			    });
			       
			       
			    
			    $(window).resize(function()
			    {
			        $('.heatmapdot').each(function()
			        {			        	
				       var orgOffset = $(this).attr('data-offset');
				       var newOffset = current.offset().left;
				       
				       var x = $(this).offset().left - (orgOffset-newOffset);
				       
				       $(this).css({ left : x }).attr('data-offset', newOffset); 
			        });
			    });
			    
			});
		},
      
		addLocations : function(locations, options)
		{
			var defaults = { offsetObject : 'body' };
			options = $.extend(defaults, options);
			
			var current = $(options.offsetObject);
			
			$(locations).each(function()
			{
				var orgOffset = this.offset;
				var newOffset = current.offset().left;
				
				var x = this.x - (orgOffset-newOffset);
			
				addLocation(x, this.y, newOffset);
			});
			
			return this;
		},
		
		
		showLocations : function()
		{
			var dots = $('.heatmapdot');
			
			if(dots.length > 0)
			{
				addLocationsAllowed = false;
				
				dots.css({ visibility:'visible' });
				
				$(dots[0]).before($('<div/>', { css : { background:'#000', opacity:0.75, position:'fixed', width:'100%', height:'100%', top:0, left:0, zIndex:999998 }, 'class':'heatmapbg', click:$.heatmap.methods.toggleLocations }));
			}
			
			return this;
		},
		
		
		hideLocations : function()
		{
			addLocationsAllowed = true;
			
			$('.heatmapdot').css({ visibility:'hidden' });
			$('.heatmapbg').remove();
			
			return this;
		},
		
		toggleLocations : function()
		{
			if(showingLocations) $(this).heatmap('hideLocations');
			else $(this).heatmap('showLocations');
			
			showingLocations = !showingLocations;
		}
    },
	
     
    addMethods : function(newMethods) 
    { 
      $.heatmap.methods = $.extend($.heatmap.methods, newMethods); 
    }, 
    
    defaults : {
	    offsetObject : 'body',
	    color : '#00ff00',
    }
  }; 
  
  
  function addLocation(x, y, offset)
  {
	  $('body').append($('<div/>', { 
			css : {
	   		width : 6+'px',
	   		height : 6+'px',
	   		background : $.heatmap.defaults.color,
	   		position : 'absolute',
	   		top : (y-3)+'px',
	   		left : 	(x-3)+'px',
	   		opacity : 0.18,
	   		borderRadius : 3+'px',
	   		visibility : 'hidden',
	   		zIndex : 999999,
			},
			
			'class' : 'heatmapdot',
	
			'data-offset' : offset,
	}));
  }
 
})( jQuery );