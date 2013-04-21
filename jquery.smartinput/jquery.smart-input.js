/**

	Smart Inputs
	By: Hot Project Consulting - Leland Cope
	Copyright 2011 Hot Project Consulting. Must get permission to use.
	
**/

(function($)
{
	
	$.fn.smartinputs = function(options)
	{
		var defaults = {
				defaultTextColor:'#afafaf',
				cleanFormBeforeSubmit:true
		}
		
		var options = $.extend(defaults, options);
		
		if(this.length > 0) $(this[0].form).submit(cleaninputs);
		
		var elements = this;
	
		return this.each(function()
		{
			var $obj = $(this);
			var defText = $obj.attr('defaulttext');
			var curColor = $obj.css('color');
			
			if($(this).val() == defText) 
			{
				$(this).css('color', options.defaultTextColor);
			}
			else if($(this).val() == '')
			{
				$(this).val(defText);
				$(this).css('color', options.defaultTextColor);
			} 
			
			$obj.focus(function()
			{
				if($(this).val() == defText) $(this).val("").css('color', curColor);
			});
			
			$obj.bind('blur', function()
			{
				if($(this).val() == "") $(this).val(defText).css('color', options.defaultTextColor);
			});
		});
		
		function cleaninputs(e)
		{
			elements.each(function()
			{
				var defText = $(this).attr('defaulttext');
			
				if($(this).val() == defText) $(this).val("");
			})
		}
	}
	
})(jQuery);