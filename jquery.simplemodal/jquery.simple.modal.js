(function($)
{
	var defaults = {
		showOverlay:true
	}

	$(document).ready(function()
	{
		$('a.modal').click(function(e)
		{
			e.preventDefault();
			
			var $this = $(e.currentTarget);
			var id = $this.attr('href');
			
			$.showModal(id, ($(this).is('.no-slide')? false : true));
		});
		
		$('.modal-window, .modal-window-close').click(closeModal);
	})
	
	function closeModal(e)
	{
		if(e != undefined) e.preventDefault();
		
		$.closeModal();
	}
	
	$.showModal = function(id, slideup)
	{
		if($(id).attr('data-options') != null && $(id).attr('data-options') != '') var options = eval('({'+$(id).attr('data-options')+'})');
		else options = defaults;
		
		options = $.extend(defaults, options);
	
		var maskHeight = $(window).height();
		var maskWidth = $(window).width();
		
		if(options.showOverlay == true)
		{
			var mask = $('<div class="modal-mask"></div>').css({ width:maskWidth, height:maskHeight, display:'none' });
			$('body').append(mask);
			
			if(!$.browser.msie || ($.browser.msie && $.browser.version >= 9)) mask.fadeTo(500, 0.7);
			else mask.css({ display:'block', opacity:0.7 });
		}
		
		
		var winHeight = $(window).height();
		var winWidth = $(window).width();
		
		$(id).addClass('modal-closeable').addClass('modal-open').css({ top:winHeight/2-$(id).height()/2, left:winWidth/2-$(id).width()/2 });
		
		setTimeout(function(){ $($(id).find('input')[0]).focus(); }, 550);
		
		if(!$.browser.msie || ($.browser.msie && $.browser.version >= 9)) $(id).fadeIn(500);
		else $(id).css('display', 'block');
		
		$('.modal-mask, .modal-window-close').click(closeModal);
		
		if(slideup != false) $('body, html').animate({ scrollTop:0 }, 500);
		
		$(id).find('.set-focus').focus();
		
		$(window).resize(reposition);
	}
	
	$.closeModal = function()
	{
		$('.modal-window, .modal-mask, .modal-closeable').trigger('simpleModalClosing');
		
		$('.modal-mask').addClass('modal-mask-remove');
		
		if(!$.browser.msie || ($.browser.msie && $.browser.version >= 9)) $('.modal-window, .modal-mask, .modal-closeable').fadeOut(500, function(e){ $('.modal-mask-remove, .modal-remove-on-close').remove(); });
		else 
		{
			$('.modal-window, .modal-mask, .modal-closeable').css('display', 'none');
			$('.modal-mask-remove, .modal-remove-on-close').remove();
		}
	}
	
	
	function reposition(e)
	{
		var maskHeight = $(window).height();
		var maskWidth = $(window).width();
		
		var mask = $('.modal-mask').css({ width:maskWidth, height:maskHeight});
		
		var winHeight = $(window).height();
		var winWidth = $(window).width();
		
		$('.modal-open').each(function()
		{
			$(this).css({ top:winHeight/2-$(this).height()/2, left:winWidth/2-$(this).width()/2 });
		})
	}

})(jQuery)