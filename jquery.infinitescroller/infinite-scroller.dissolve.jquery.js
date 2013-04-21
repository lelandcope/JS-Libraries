/**
 * Auto Rotate Extension for Infinite Scroll jQuery Plugin
 *
 * Requires infiniteScroller plugin by Leland Cope
 *
 * @author Leland Cope
 * @link hotprojectconsulting.com
 * @copyright Copyright &copy; Must get permission to use
 * @version 1.0
 */


(function($)
{
	$.infiniteScroller.addMethod({
		
		dissolve : function($options)
		{
			var defaults = {
				speed : 500
			};
			
			var options = $.extend(defaults, options);
			
			return this.each(function()
			{
				var container = $(this);
				var slides = $(this).children();
				var totalSlides = slides.length;
				var cur = totalSlides*10000;
				var isAnimating = false;
				
				$(slides).css({ display:'none', position:'absolute', left:0, top:0, opacity:0, zIndex:2 });
				$(slides[0]).css({ display:'block', opacity:1, left:0, zIndex:3 });
				
				
				container.bind('ISNext', next);
				container.bind('ISBack', back);
				container.bind('ISJumpTo', jumpTo);
				
				function next(e)
				{
					if(isAnimating || totalSlides <= 1) return;
					
					isAnimating = true;
					
					container.trigger('ISStartedHidingAndShowing');
					
					container.trigger('ISBeforeHiding', [cur%totalSlides]);
					$(slides[cur%totalSlides]).css({ display:'block', opacity:1 }).animate({ opacity:0 }, options.speed);
					container.trigger('ISHiding', [cur%totalSlides]);
					
					
					cur++;
					
					
					container.trigger('ISBeforeShowing', [cur%totalSlides]);
					$(slides[cur%totalSlides]).css({ display:'block', opacity:0 }).animate({ opacity:1 }, options.speed);
					container.trigger('ISShowing', [cur%totalSlides]);
					
					setTimeout(function()
					{
						container.trigger('ISFinishedHidingAndShowing');
						
						$(slides[(cur-1)%totalSlides]).css({ display:'none', zIndex:2 });
						$(slides[cur%totalSlides]).css({ zIndex:3 });
						
						isAnimating = false;
						
					}, options.speed);
				}
				
				function back(e)
				{
					if(isAnimating) return;
					
					isAnimating = true;
					
					container.trigger('ISStartedHidingAndShowing');
					
					container.trigger('ISBeforeHiding', [cur%totalSlides]);
					$(slides[cur%totalSlides]).css({ display:'block', opacity:1 }).animate({ opacity:0 }, options.speed);
					container.trigger('ISHiding', [cur%totalSlides]);
					
					
					cur--;
					
					
					container.trigger('ISBeforeShowing', [cur%totalSlides]);
					$(slides[cur%totalSlides]).css({ display:'block', opacity:0 }).animate({ opacity:1 }, options.speed);
					container.trigger('ISShowing', [cur%totalSlides]);
					
					setTimeout(function()
					{
						container.trigger('ISFinishedHidingAndShowing');
						
						$(slides[(cur+1)%totalSlides]).css({ display:'none', zIndex:2 });
						$(slides[cur%totalSlides]).css({ zIndex:3 });
						
						isAnimating = false;
						
					}, options.speed);
				}
				
				function jumpTo(e, num)
				{
					if(isAnimating || num == cur%totalSlides) return;
					
					isAnimating = true;
					
					container.trigger('ISStartedHidingAndShowing');
					
					container.trigger('ISBeforeHiding', [cur%totalSlides]);
					$(slides[cur%totalSlides]).css({ display:'block', opacity:1 }).animate({ opacity:0 }, options.speed);
					container.trigger('ISHiding', [cur%totalSlides]);
					
					
					
					
					
					container.trigger('ISBeforeShowing', [num%totalSlides]);
					$(slides[num%totalSlides]).css({ display:'block', opacity:0 }).animate({ opacity:1 }, options.speed);
					container.trigger('ISShowing', [num%totalSlides]);
					
					setTimeout(function()
					{
						container.trigger('ISFinishedHidingAndShowing');
						
						$(slides[(cur)%totalSlides]).css({ display:'none', zIndex:2 });
						$(slides[num%totalSlides]).css({ zIndex:3 });
						
						cur = num;
						
						isAnimating = false;
						
					}, options.speed);
				}
			});
		}
		
	});
	
})(jQuery);