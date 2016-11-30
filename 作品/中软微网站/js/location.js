$(document).ready(function() {

	/*获得用户的地理位置*/
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showMap,errorHandler,{
				enableHighAccuracy: true,maximumAge: 1000
				});
		} else {
			alert('您的浏览器不支持HTML5的地理定位');
		}
	}

	// 调用地理定位
	getLocation();

	layer.msg('正在定位城市......',{
		time:10000
	});

	/*当发生错误时*/
	function errorHandler(value) {

		// 关闭layer
		layer.closeAll();

		switch (value.code) {
			case 1:
				layer.msg('地理位置服务被拒绝，请开启');	
				break;
			case 2:
				layer.msg('地理位置获取失败');
				break;
			case 3:
				layer.msg('获得地理位置时间超时');
				break;
			case 4:
				layer.msg('发生未知错误');
				break;			
		}
	}

	/*
		地理位置成功回调函数
	*/
	function showMap(position) {
		//获得用户的经纬度
		var longitude = position.coords.longitude;
		var latitude = position.coords.latitude;

		// 写死的实验经纬度
		// var longitude = 121.5113442053978;
		// var latitude = 38.860614891153396;

		var url = 'http://api.map.baidu.com/geocoder/v2/?ak=V3h0MpdIltgMoBPxnNqIeSMgYFb7PiyE&output=json&pois=1';
				
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'jsonp',
			data: {location:latitude + ',' + longitude},
			jsonp:'callback'			
		})
		.done(function(data) {
			layer.msg('所在城市：' + data.result.addressComponent.city);			
		})
		.fail(function() {
			layer.msg('获得城市信息失败！');
		});	

	}

	// 直接调用百度定位
	// showMap();

});