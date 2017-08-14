var distance = 0; var transition = false; var boxdistance = 0; var BallCount = 1; var navDistance = 0;var navKeyDistance = -100;
(function () {
	//renderAnimation() //初始化动画
	document.body.onmousewheel = function(event) {
	   	renderMouseWheel(event, '')//ie鼠标滚轮事件
	};
	document.body.addEventListener("DOMMouseScroll", function(event) {
	    renderMouseWheel(event, '')//鼠标滚轮事件
	});
	//移动端使用touch事件代替
	$("body").on('touchstart', function (event) {
		//event.preventDefault()
		//起始坐标
		this.startY = event.changedTouches[0].clientY
	})
	$("body").on('touchmove', function (event) {
		event.preventDefault()
		this.movingY = event.changedTouches[0].clientY
        this.distance = this.movingY - this.startY
        renderMouseWheel('', this.distance)
	})
	circleShadow()//鼠标移动到圆环发光
	startVideo()//播放视频
	startLight()//下载按钮发光
	transformBall()//背景的球转动
	download()//下载事件
})()

function download () {
	var bid  = GetQueryString('bid') || 6500
	$(".develop-container").on("click", function () {
		location.href = 'http://www.uc.cn/company/'
	})
	$(".help").on("click", function () {
		location.href = 'http://kf.uc.cn/self_service/web/index'
	})
	$(".download-container").on('click', function () {
		var ua = navigator.userAgent
		if (ua.match('Mobile')) {
			if (ua.match('MicroMessenger')) {
				location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.quark.browser'
			}
			else {
				if (ua.match('iPhone') || ua.match('iPad')) {
		          	location.href = 'https://itunes.apple.com/cn/app/kua-ke-liu-lan-qi-ji-jian/id1160172628?l=zh&ls=1&mt=8'
		        }
		        else if (ua.match('Android') || ua.match('Windows')) {
		          	location.href = 'https://pdds.ucweb.com/download/newest/QuarkBrowser/zh-cn/3300/' + bid + '/of'
		        }
			}
		}
		else {
			$(".qr-container").css('opacity', 1)
			$(".mask-container").css('display', 'block')
			$(".close-img").on('click', function () {
				$(".mask-container").css('display', 'none')
				$(".qr-container").css('opacity', 0)
			})
			$(".android-btn").on('click', function () {
				location.href = 'https://pdds.ucweb.com/download/newest/QuarkBrowser/zh-cn/3300/' + bid + '/of'
			})
			$(".ios-btn").on("click", function () {
				location.href = 'https://itunes.apple.com/cn/app/kua-ke-liu-lan-qi-ji-jian/id1160172628?l=zh&ls=1&mt=8'
			})
		}
	})
}

function circleShadow () {
	$(".download-container").hover(function () {
		$(".shadow").css('transition', 'box-shadow linear 3s')
		$(".shadow").css('box-shadow', '0px 0px 40px 10px #169c9e')
	}, function () {
		$(".shadow").css('box-shadow', '')
	})
}

function transitioning () {
	//设置正在过度
	transition = true
}

function transitionend () {
	transition = false
}

function startVideo () {
	$(".play").on("click", function () {
		$(".video")[0].play()
		$(".indexAnimation")[0].play()
		setInterval(function () {
			var ended = $(".video")[0].ended
			var indexEnded = $(".indexAnimation")[0].ended
			console.log(ended)
			if (ended == true) {
				$(".video")[0].play()
			}
			if (indexEnded == true) {
				$(".indexAnimation")[0].play()
			}
		}, 500)
	})
	$(".play").click()
}

function transformBall () {
	var time = setInterval(function () {
		if (!transition) {
			$(".ball").css('transform', 'translateX(' + BallCount + 'px) rotateZ(' + BallCount + 'px)')
			BallCount++
		}
	}, 50)
}

function startLight () {
	$(".download-container").hover(function() {
		$(".download-container").css('transition', 'background-color linear .5s, color linear .5s')
		$(".download-container").css('background-color', '#fff')
		$(".download-container").css('color', '#1c1e21')
		$(".left-light").css('transition', 'left linear .2s')
		$(".left-light").css('left', '-10px')
		setTimeout(function() {
			$(".left-light").css('left', '10px')
		}, 300)	
		$(".right-light").css('transition', 'right linear .2s')
		$(".right-light").css('right', '-10px')
		setTimeout(function() {
			$(".right-light").css('right', '10px')
		}, 300)	
	}, function () {
		$(".download-container").css('background-color', '#1c1e21')
		$(".download-container").css('color', '#fff')
		$(".left-light").css('transition', 'left linear .2s')
		$(".left-light").css('left', '-10px')
		setTimeout(function() {
			$(".left-light").css('left', '0')
		}, 300)	
		$(".right-light").css('transition', 'right linear .2s')
		$(".right-light").css('right', '-10px')
		setTimeout(function() {
			$(".right-light").css('right', '0px')
		}, 300)	
	})
}
function renderAnimation () {
	var imgKey = 0
	var time = setInterval(function () {
		if (imgKey < 10) {
			var imgUrl = './images/animation/ball+ring_0000' + imgKey + '.png'
		}
		else if (imgKey >= 10 && imgKey < 100) {
			var imgUrl = './images/animation/ball+ring_000' + imgKey + '.png'
		}
		else if (imgKey >= 100 && imgKey <= 239) {
			var imgUrl = './images/animation/ball+ring_00' + imgKey + '.png'
		}
		else {
			clearInterval(time)
			renderAnimation()
		}
		$('.circle').attr('src', imgUrl)
		imgKey++
	}, 500)
}

function renderMouseWheel (event, distance) {
	if (event.wheelDelta > 0 || distance > 50) {
		//向上滚
		if (!transition) {
			transitioning()
			if (navDistance >= 0) navDistance == 0
			else navDistance += 37
			if (navKeyDistance >= 0 ) navKeyDistance == 0
			else navKeyDistance += 100
			$(".nav-text").css('transition', 'transform linear .5s')
			$(".nav-text").css('transform', 'translateX(' + navDistance + 'px)')
			$(".nav-sign").css('transition', 'transform linear .5s')
			$(".nav-sign").css('transform', 'translateY(' + navKeyDistance + '%)')
			this.scrollBall('up')
			this.scrollBox('up')
			if (boxdistance == -100) {
				//第三张到第二张
				$(".third-text").css('transition', 'opacity 3s')
				$(".third-text").css('opacity', 0)	
				$(".second-text").css('transition', 'opacity 3s')
				$(".second-text").css('opacity', 1)
				$(".nav li").removeClass('nav-active')
				$(".nav li").addClass('no-active')
				$(".second-nav").addClass('nav-active')		
			}
			else if (boxdistance == 0) {
				//第二张到第一张
				$(".second-text").css('transition', 'opacity 3s')
				$(".second-text").css('opacity', 0)
				$(".nav li").removeClass('nav-active')
				$(".nav li").addClass('no-active')
				$(".index-nav").addClass('nav-active')		
			}
			setTimeout(function () {
				transitionend()
			}, 2000)
		}
	}
	else if (event.wheelDelta < 0 || distance < -50){
		//向下滚
		if (!transition) {
			transitioning()
			if (navDistance <= -74) navDistance == -74
			else navDistance -= 37
			if (navKeyDistance == 0) {
				navKeyDistance = -100
			}
			$(".nav-text").css('transition', 'transform linear .5s')
			$(".nav-text").css('transform', 'translateX(' + navDistance + 'px)')
			$(".nav-sign").css('transition', 'transform linear .5s')
			$(".nav-sign").css('transform', 'translateY(' + navKeyDistance + '%)')
			if (navKeyDistance <= -200 ) navKeyDistance == -200
			else navKeyDistance -= 100
			this.scrollBall('down')
			this.scrollBox('down')
			if (boxdistance == -100) {
				//第一张到第二张
				$(".second-text").css('transition', 'opacity 3s')
				$(".second-text").css('opacity', 1)
				$(".nav li").removeClass('nav-active')
				$(".nav li").addClass('no-active')
				$(".second-nav").addClass('nav-active')	

			}
			else if (boxdistance == -200) {
				//第二张到第三张
				$(".second-text").css('transition', 'opacity 3s')
				$(".second-text").css('opacity', 0)	
				$(".third-text").css('transition', 'opacity 3s')
				$(".third-text").css('opacity', 1)	
				$(".nav li").removeClass('nav-active')
				$(".nav li").addClass('no-active')
				$(".third-nav").addClass('nav-active')		
			}
			setTimeout(function () {
				transitionend()
			}, 2000)
		}
	}
}

function scrollBall (direction) {
	if (direction == 'up') {
		if (distance >= 0) distance = 0
		else distance += 370
	}
	else {
		if (distance <= -740) distance = -740
		else distance -= 370
	}
	$('.ball').css('transition', 'transform ease-out 1s')
	$(".ball").css('transform', 'translateY(' + distance + 'px)')
}

function scrollBox (direction) {
	if (direction == 'down') {
		if (boxdistance <= -200) boxdistance == -200
		else boxdistance -= 100
		if (boxdistance == -200) {
			secondDistance = boxdistance*1.3
		}	
		else {
			secondDistance = boxdistance
		}
	}
	else {
		if (boxdistance >= 0) boxdistance == 0
		else boxdistance += 100
		if (boxdistance == 100) {
			secondDistance = boxdistance*1.3
		}
		else {
			secondDistance = boxdistance
		}	
	}
	$('.quark-box').css('transition', 'transform ease-in-out 1s')
	$('.quark-box').css('transform', 'translateY(' + boxdistance + '%)')
	$('.second-container').css('transition', 'transform ease-in-out 1s')
	$('.second-container').css('transform', 'translateY(' + secondDistance + '%)')
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
