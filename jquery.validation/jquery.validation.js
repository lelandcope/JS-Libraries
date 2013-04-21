/**

	Validation
	By: Hot Project Consulting - Leland Cope
	Copyright 2012 Hot Project Consulting. Must get permission to use.
	
	Ver. 1.5
		Added a helper function so you can call multiple at once. This is great if you have more then one form or section that needs validation
	
	Ver. 1.4
		Added the ability to use validateWith attribute with email
**/


(function($)
{	
	$.validate = function(form)
	{
		var isOk = true;
			
		$('.input-error').removeClass('input-error');
		$('.select-error').removeClass('select-error');
		
		form.find('.validate').each(function()
		{
			var $this = $(this);
			var validation = $this.attr('validation');
			
			if(validation == null || validation == undefined) return;
			
			if(validation == 'string')
			{
				if($this.val() == '' || $this.val() == $this.attr('default-text') || $this.val() == $this.attr('defaulttext'))
				{
					$this.parent().addClass('input-error');
					isOk = false;
				}
			}
			
			if(validation == 'email')
			{
				if($this.attr('validatewith') != '' && $this.attr('validatewith') != undefined)
				{
					$('#'+$this.attr('validatewith')).parent().removeClass('input-error');
					
					if($this.val() != $('#'+$this.attr('validatewith')).val() || $this.val().length == 0)
					{
						$this.parent().addClass('input-error');
						$('#'+$this.attr('validatewith')).parent().addClass('input-error');
						isOk = false;
					}
				}
				
				if($this.val().search(/[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,5}$/g) == -1)
				{
					$this.parent().addClass('input-error');
					isOk = false;
				}
			}
			
			if(validation == 'phone')
			{
				var naObj = /^(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
				var iObj = /^\+(?:[0-9] ?){6,14}[0-9]$/;
				
				console.log(naObj.test($this.val()));
				
				if(!naObj.test($this.val()) && !iObj.test($this.val()))
				{
					$this.parent().addClass('input-error');
					isOk = false;
				}
			}
			
			if(validation == 'password')
			{
				$('#'+$this.attr('validatewith')).parent().removeClass('input-error');
			
				if($this.val() != $('#'+$this.attr('validatewith')).val() || $this.val().length == 0)
				{
					$this.parent().addClass('input-error');
					$('#'+$this.attr('validatewith')).parent().addClass('input-error');
					isOk = false;
				}
			}
			
			if(validation == 'select')
			{
				if($this.val() == '')
				{
					$this.parent().addClass('select-error');
					isOk = false;
				}
			}
			
			if(validation == 'cc')
			{
				var ccObj = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
				
				if(!ccObj.test($this.val()))
				{
					$this.parent().addClass('input-error');
					isOk = false;
				}
			}
			
			if(validation == 'number')
			{
				if(isNaN($this.val()) || $this.val() == '')
				{
					$this.parent().addClass('input-error');
					isOk = false;
				}
			}
		});
		
		return isOk;
	}
	
	$.fn.validate = function()
	{
		var isOk = true;
		
		$(this).each(function()
		{
			if(!$.validate($(this))) isOk = false;
		});
		
		return isOk;
	}
	
})(jQuery)