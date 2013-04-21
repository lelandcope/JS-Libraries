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
		
		autoRotate : function(options)
		{
			var defaults = {
				delay: 5000, // Delay is in seconds
				speed: 500, // Speed in seconds
				stopOnHover: true,
				animation: 'slide'
			}
			
			var options = $.extend(defaults, options);
			
			return this.each(function()
			{
				var $container = $(this);
				var isto = null;
			
				$container.infiniteScroller(options.animation, options);
				$container.bind('ISStopTimer ISStartedHidingAndShowing', isStopTimeout);
				$container.bind('ISStartTimer', isStartTimer);
				
				if(options.stopOnHover)
				{
					$container.bind('mouseenter', isStopTimeout);
					$container.bind('mouseleave', isStartTimer);
				}
				
				$container.trigger('ISStartTimer');
				
				
				
				function nextItem()
				{
					$container.trigger('ISNext');
					
					isto = setTimeout(nextItem, options.delay+options.speed);
				}
				
				function isStartTimer()
				{
					isto = setTimeout(nextItem, options.delay, $(this));
				}
				
				function isStopTimeout()
				{
					clearTimeout(isto);
				}
			});
		}
		
	});
	
})(jQuery);