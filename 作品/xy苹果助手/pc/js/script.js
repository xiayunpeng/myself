$(document).ready(function() {

	// 获得回到顶部按钮
	var topcontrol = $('#topcontrol');
	// 获得导航条对象
	var nav = $('.nav-wrap');
	// 导航条的高度
	var navHeight= nav.outerHeight();
	// 导航条相对于网页原点的位置
	var navPos = nav.offset().top;

	/*回到顶部按钮单击*/
	topcontrol.click(function(event) {
		
		$('html,body').animate({scrollTop:0}, 1000);

	});
	
	/*
		滚动条事件
	*/
	$(window).scroll(function(event) {
		
		/*
			动态显示隐藏回到顶部按钮
		*/
		// 滚动条卷去的大小
		var sTop = $(window).scrollTop();

		// 超过200像素
		if (sTop >= 200) {
			topcontrol.fadeIn('normal');
		} else {
			topcontrol.fadeOut('normal');
		}

		/*
			动态设置导航条固定
		*/ 
		if (sTop >= navPos ) {
			if (!nav.hasClass('fixed')){
				nav.addClass('fixed');
				$('.banner').css('margin-bottom',navHeight); //banner下方空出原始导航的高度，保证下方元素不会上移				
			}						
		} else {
			if (nav.hasClass('fixed')) {
				nav.removeClass('fixed');	
				$('.banner').css('margin-bottom',0);			
			}
		}

		/*
			滚动监听高亮导航
		*/
		// 高亮函数
		function highLight(target) {
			$('.nav-wrap li').removeClass('active');
			$(target).addClass('active');
		}

		var intro = $('#post-intro');
		var usage = $('#post-usage');
		var choice = $('#choiceness');

		var introPos = {
			start:intro.offset().top - navHeight,
			end:intro.offset().top + intro.outerHeight() - navHeight
		}

		var usagePos = {
			start:usage.offset().top - navHeight,
			end:usage.offset().top + usage.outerHeight() - navHeight
		}

		var choicePos = {
			start:choice.offset().top - navHeight,
			end:choice.offset().top + choice.outerHeight() - navHeight
		}

		if ( sTop >= introPos.start && sTop < introPos.end) {
			highLight('.intro');
		} else if ( sTop >= usagePos.start && sTop < usagePos.end) {
			highLight('.usage');
		} else if ( sTop >= choicePos.start && sTop < choicePos.end) {
			highLight('.choice');
		} else {
			$('.nav-wrap li').removeClass('active');
		}

	});

	/*
		导航链接滑动到锚点
	*/
	$('.nav-wrap a').click(function(event) {
		
		// 获得对应区块的相对于网页原点的偏移量
		var top = $(this.hash).offset().top - navHeight + 7; 

		$('html,body').animate({scrollTop:top}, 1000);

		return false;
	});

});	