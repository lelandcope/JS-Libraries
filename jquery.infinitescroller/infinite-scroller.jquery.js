/**
 * Infinite Scroller jQuery Plugin
 *
 * @author Leland Cope
 * @link hotprojectconsulting.com
 * @copyright Copyright &copy; Must get permission to use
 * @version 2.0
 */

/**
 * Infinite Scroller jQuery Plugin
 *
 * @author Leland Cope
 * @link hotprojectconsulting.com
 * @copyright Copyright &copy; Must get permission to use
 * @version 2.0
 */

(function($)
{ 
	$.fn.infiniteScroller = function(method)
	{
		var methods = $.infiniteScroller.methods;
		
		if(methods[method])
		{
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			
		} else if(typeof method == 'object')
		{
			return methods.slide.apply(this, arguments);
			
		} else
		{
			$.error('Method '+method+' does not exist in jQuery.infiniteScroller');
		}
	};
	
	
	$.infiniteScroller = {
		methods : {
		
			/* Slide objects horizontally forward and back */
			
			slide : function(options)
			{
				var defaults = {
					speed : 500
				}
				
				var options = $.extend(defaults, options);
				
				return this.each(function()
				{
					var container = $(this);
					var slides = $(this).children();
					var totalSlides = slides.length;
					var cur = totalSlides*10000;
					var isAnimating = false;
					
					$(slides).css({ display:'none', position:'absolute', left:'-100000px' });
					$(slides[0]).css({ display:'block', left:0 });
					
					
					container.bind('ISNext', next);
					container.bind('ISBack', back);
					container.bind('ISJumpTo', jumpTo);
					
					function next(e)
					{
						if(isAnimating) return;
						
						isAnimating = true;
						
						container.trigger('ISStartedHidingAndShowing');
						
						container.trigger('ISBeforeHiding', [cur%totalSlides]);
						$(slides[cur%totalSlides]).css({ display:'block', left:0 }).animate({ left:'-'+container.width()+'px' }, options.speed);
						container.trigger('ISHiding', [cur%totalSlides]);
						
						
						cur++;
						
						
						container.trigger('ISBeforeShowing', [cur%totalSlides]);
						$(slides[cur%totalSlides]).css({ display:'block', left:container.width()+'px' }).animate({ left:'0px' }, options.speed);
						container.trigger('ISShowing', [cur%totalSlides]);
						
						setTimeout(function()
						{
							container.trigger('ISFinishedHidingAndShowing');
							
							$(slides[(cur-1)%totalSlides]).css({ display:'none' });
							
							isAnimating = false;
							
						}, options.speed);
					}
					
					function back(e)
					{
						if(isAnimating) return;
						
						isAnimating = true;
						
						container.trigger('ISStartedHidingAndShowing');
						
						container.trigger('ISBeforeHiding', [cur%totalSlides]);
						$(slides[cur%totalSlides]).css({ display:'block', left:0 }).animate({ left:container.width()+'px' }, options.speed);
						container.trigger('ISHiding', [cur%totalSlides]);
						
						
						cur--;
						
						
						container.trigger('ISBeforeShowing', [cur%totalSlides]);
						$(slides[cur%totalSlides]).css({ display:'block', left:-container.width()+'px' }).animate({ left:0 }, options.speed);
						container.trigger('ISShowing', [cur%totalSlides]);
						
						setTimeout(function()
						{
							container.trigger('ISFinishedHidingAndShowing');
							
							$(slides[(cur+1)%totalSlides]).css({ display:'none' });
							
							isAnimating = false;
							
						}, options.speed);
					}
					
					function jumpTo(e, num)
					{
						if(isAnimating || num == cur%totalSlides) return;
						
						isAnimating = true;
						
						container.trigger('ISStartedHidingAndShowing');
						
						container.trigger('ISBeforeHiding', [cur%totalSlides]);
						$(slides[cur%totalSlides]).css({ display:'block', left:0 }).animate({ left:'-'+container.width()+'px' }, options.speed);
						container.trigger('ISHiding', [cur%totalSlides]);
						
						
						container.trigger('ISBeforeShowing', [num%totalSlides]);
						$(slides[num%totalSlides]).css({ display:'block', left:container.width()+'px' }).animate({ left:'0px' }, options.speed);
						container.trigger('ISShowing', [num%totalSlides]);
						
						setTimeout(function()
						{
							container.trigger('ISFinishedHidingAndShowing');
						
							$(slides[(cur)%totalSlides]).css({ display:'none' });
						
							cur = num*100000;
							
							isAnimating = false;
							
						}, options.speed);
					}
				});
			},
			
			navigation : function(mainContainer, $options)
			{
				var defaults = {
					'selectedClass' : 'selected',
					'selectedTarget' : 'a',
					'zIndex' : 4,
				};
				
				var options = $.extend(defaults, options);
				var container = $(this);
				var selectables = container.find(options.selectedTarget);
				
				container.css({ zIndex:options.zIndex });
				container.parent().css({ zIndex:options.zIndex });
				
				mainContainer.bind('ISBeforeShowing', function(e, num)
				{
					$(selectables).removeClass(options.selectedClass);
					$(selectables[num]).addClass(options.selectedClass);
				});
				
				selectables.click(function(e)
				{
					e.preventDefault();
					
					mainContainer.trigger('ISJumpTo', [$(this).attr('href')]);
				});
				
				
				return this;
				
			}
		}, 
		
		
		/* Allows you to add methods to this plugin like additional animation */
		
		addMethod : function(newMethods)
		{
			$.infiniteScroller.methods = $.extend($.infiniteScroller.methods, newMethods);
		}
	};
			
})(jQuery);












(function($)
{ 
	$.fn.infiniteScroll = function(method)
	{
		var methods = $.infiniteScroll.methods;
		
		if(methods[method])
		{
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			
		} else if(typeof method == 'object')
		{
			return methods.slide.apply(this, arguments);
			
		} else
		{
			$.error('Method '+method+' does not exist in jQuery.infiniteScroll');
		}
	};
	
	
	$.infiniteScroll = {
		methods : {
		
			/* Slide objects horizontally forward and back */
			
			slide : function(options)
			{
				var defaults = {
					nextBtn:'.nextBtn',
					backBtn:'.backBtn',
					speed:500,
					slideAmt:6,
					additionalWidth:0,
					includePadding:false
				}
				
				var options = $.extend(defaults, options);
				
				return this.each(function()
				{
					var singleWidth = 0;
					var isAnimating = false;
					var $container = $(this);
					
					if($container.find('li').length <= options.slideAmt)
					{
						$(options.backBtn).css({display:'none'});
						$(options.nextBtn).css({display:'none'});
						return;
					}
					
					options.slideAmt = checkSlideAmt();
					if(options.slideAmt == 0) options.slideAmt = 1;
					
					setup();
						
					$(options.backBtn).click(prevCats).attr('href', 'prev');
					$(options.nextBtn).click(nextCats).attr('href', 'next');
					
					$container.bind('PrevItem', prevCats);
					$container.bind('NextItem', nextCats);
					
					
					function checkSlideAmt()
					{
						if(Math.floor($container.find('li').length/2) < options.slideAmt)
						{
							options.slideAmt--;
							return checkSlideAmt();
						} else return options.slideAmt;
					}
					
					function setup()
					{
						var w = 0;
						
						singleWidth = $($container.find('li')[0]).width() + Number($($container.find('li')[0]).css('marginLeft').substr(0, $($container.find('li')[0]).css('marginLeft').length-2)) + Number($($container.find('li')[0]).css('marginRight').substr(0, $($container.find('li')[0]).css('marginRight').length-2));
						
						if(options.includePadding) singleWidth += Number($($container.find('li')[0]).css('paddingLeft').substr(0, $($container.find('li')[0]).css('paddingLeft').length-2)) + Number($($container.find('li')[0]).css('paddingRight').substr(0, $($container.find('li')[0]).css('paddingRight').length-2));
						
						$container.find('li').each(function()
						{
							w += singleWidth;
						});
						
						$container.find('li').css({display:'block', float:'left'});
						
						$container.width(w+options.additionalWidth);
						
						reset(true);
						
					}
					
					function reset(isStart)
					{
						if(isStart == undefined) isStart = false;
						
						var childs = $container.find('li');
						
						var prevObj = null
						
						for(var i=(childs.length-options.slideAmt); i<childs.length; i++)
						{
							var obj = $(childs[i]);
							
							if(prevObj == null) $container.prepend(obj);
							else prevObj.after(obj);
							
							prevObj = obj;
						}
						
						$container.css({marginLeft:'-'+(singleWidth*options.slideAmt+options.additionalWidth/2)+'px'});
						
						isAnimating = false;
					}
					
					function prevCats(e)
					{
						e.preventDefault();
						
						if(isAnimating) return;
						
						isAnimating = true;
						
						$container.trigger('beforePrevAnimation');
						$container.trigger('beforeAnimation');
						
						$container.animate({marginLeft:(0-options.additionalWidth/2)+'px'}, options.speed, function(){ $container.trigger('afterPrevAnimation'); $container.trigger('afterAnimation'); reset(); });
					}
					
					function nextCats(e)
					{
						e.preventDefault();
						
						if(isAnimating) return;
						
						isAnimating = true;
						
						var childs = $container.find('li');
						
						for(var i=0; i<options.slideAmt; i++)
						{
							var obj = $(childs[i]);
							$container.append(obj);
						}
						
						$container.css({marginLeft:(0-options.additionalWidth/2)+'px'});
						
						$container.trigger('beforeNextAnimation');
						$container.trigger('beforeAnimation');
						
						$container.animate({marginLeft:'-'+(singleWidth*options.slideAmt+options.additionalWidth/2)+'px'}, options.speed, function(){ $container.trigger('afterNextAnimation'); $container.trigger('afterAnimation'); isAnimating = false; });
					}
		
				});
			},
		}, 
		
		
		/* Allows you to add methods to this plugin like additional animation */
		
		addMethod : function(newMethods)
		{
			$.infiniteScroll.methods = $.extend($.infiniteScroll.methods, newMethods);
		}
	};
			
})(jQuery);