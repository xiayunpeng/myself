/*
	船票网订单功能业务逻辑
	日期时间：2016-10-12
	作者：张三
*/
$(document).ready(function(){
	
	// 票价信息
	var priceData = [
		{
			"priceType":"普通",
			"price":325,
			"priceDetails":"280+20+15"
		},
		{
			"priceType":"学生",
			"price":299,
			"priceDetails":"265+20+15"
		},
		{
			"priceType":"军人",
			"price":275,
			"priceDetails":"235+20+15"
		},
		{
			"priceType":"儿童",
			"price":98,
			"priceDetails":"65+20+15"
		}
	];

	// 乘船人数据
	var passengerData = [
			{
				"id":1,
				"name":"王小川",
				"codeTypeId":1,
				"codeType":"身份证",
				"code":"2202045678951",
				"mobile":"13608965458",
				"isDefault":true
			},
			{
				"id":2,
				"name":"张三",
				"codeTypeId":1,
				"codeType":"身份证",
				"code":"220204565671111",
				"mobile":"13608961111",
				"isDefault":false
			},
			{
				"id":3,
				"name":"李四",
				"codeTypeId":2,
				"codeType":"军人证",
				"code":"220204565672222",
				"mobile":"13608961111",
				"isDefault":false
			},
			{
				"id":4,
				"name":"王五",
				"codeTypeId":3,
				"codeType":"港澳台通行证",
				"code":"220204565673333",
				"mobile":"13608963333",
				"isDefault":false
			},
			{
				"id":5,
				"name":"赵六",
				"codeTypeId":4,
				"codeType":"其他证件",
				"code":"220204565674444",
				"mobile":"13608964444",
				"isDefault":false
			},
			{
				"id":6,
				"name":"钱七",
				"codeTypeId":1,
				"codeType":"身份证",
				"code":"220204565675555",
				"mobile":"13608965555",
				"isDefault":false
			}
	];

	// 订单人数计数变量
	var passengerCount = 0;

	// 票价列表框内容
	var priceListHtml = '';

	// 证件类型列表框内容
	var certTypeHtml = '<select name="certType">';
	certTypeHtml += '<option value="1">身份证</option>';
	certTypeHtml += '<option value="2">军人证</option>';
	certTypeHtml += '<option value="3">港澳台通行证</option>';
	certTypeHtml += '<option value="4">其他证件</option>';
	certTypeHtml += '</select>';
	
	/*
		动态生成票价信息和票价列表框内容
	*/	
	priceListHtml += '<select name="price">';

	$.each(priceData, function(index, val) {

		// 动态生成票价信息
		var html = '<li>' + val.priceType + '<span class="highlight">￥' 
			+ val.price + '（' + val.priceDetails + '）</span></li>';

		$('.piaojialan ul li').last().before(html);	

		// 动态生成票价列表框内容
		priceListHtml += '<option value="' + val.price + '">' +  val.priceType 
			+ '&nbsp;￥' + val.price + '</option>';

	});

	priceListHtml += '</select>';

	
	/*
		显示乘船人信息列表
	*/
	var htmlStr = '';

	$.each(passengerData, function(index, val) {

		htmlStr = '';			
		htmlStr += '<label>';
		htmlStr += '	<input type="checkbox" id="' + val.id + '">' + val.name;
		htmlStr += '</label>';
		
		if (val.isDefault) { // 显示默认乘船人
			$('#defaultPassenger').html(htmlStr);			
		} else { //其他乘船人
			$('#passengerBlock').append(htmlStr);
		}		
	});

	/*
		显示隐藏其他乘船人信息		
	*/
	$('#moreBtn').click(function(event) {

		var that = this;
		
		$('#passengerBlock').fadeToggle(function() {

			if ( /更多/.test( $(that).text() ) ) {
				$(that).text('<<收起');
			} else {
				$(that).text('更多>>');
			}

		});

	});

	/*
		乘船人复选按钮单击，动态添加删除订单
	*/
	$('#allPassenger :checkbox').click(function(event) {

		var id = this.id;//获得当前复选的id
		
		if (this.checked) { //选中，添加订单

			// 判断人数是否超出
			if (passengerCount >= 5) {
				alert('乘船人订单一次最多5人');
				return false;
			}

			passengerCount ++;//人数+1

			var p = findPassengerById(id); //通过id获得对象数据

			htmlStr = '';
			htmlStr += '<ul id="' + p.id + '">';
			htmlStr += '	<li>';
			htmlStr += priceListHtml;
			htmlStr += '	</li>';
			htmlStr += '	<li>';
			htmlStr += '	姓名：';
			htmlStr += '		<input type="text" name="name" value="' + p.name + '" size="8" readonly>';
			htmlStr += '	</li>';
			htmlStr += '	<li>';
			htmlStr += '		<select name="certType">';
			htmlStr += '			<option value="' + p.codeTypeId + '">' + p.codeType + '</option>';
			htmlStr += '		</select>';
			htmlStr += '		<input type="text" name="code" value="' + p.code + '" readonly>';
			htmlStr += '	</li>';
			htmlStr += '	<li>';
			htmlStr += '		电话号码：';
			htmlStr += '		<input type="text" name="mobile" value="' + p.mobile + '" readonly>';
			htmlStr += '	</li>';
			htmlStr += '	<li>';
			htmlStr += '		<input type="button" value="删除当前" class="delBtn">';
			htmlStr += '	</li>';
			htmlStr += '</ul>';

			$('#passengerList').append(htmlStr);
		} else { //取消选中，删除订单

			$('#passengerList').find('#' + id).remove();

			passengerCount --;//人数-1
		}

		getTotalPrice();//重新计算订单金额
	});

	// 网页打开默认添加乘船人的订单
	$('#defaultPassenger :checkbox').click();

	/*
		删除订单按钮单击（由于按钮是动态添加的，需要用事件委托）
	*/
	$('#passengerList').on('click', '.delBtn', function(event) {

		var id = $(this).parents('ul').attr('id'); //获得删除的ul的id

		$(this).parents('ul').remove();//删除ul

		$('#allPassenger').find('#' + id).prop('checked',false);//取消复选选中

		passengerCount --;//人数-1

		getTotalPrice();//重新计算订单金额		
	});

	/*
		单击新增乘船人按钮，手动添加乘船人
	*/
	$('#addPassBtn').click(function(event) {

		// 判断人数是否超出
		if (passengerCount >= 5) {
			alert('乘船人订单一次最多5人');
			return false;
		}

		passengerCount ++;//人数+1
		
		htmlStr = '';
		htmlStr += '<ul>';
		htmlStr += '	<li>';
		htmlStr += priceListHtml;
		htmlStr += '	</li>';
		htmlStr += '	<li>';
		htmlStr += '	姓名：';
		htmlStr += '		<input type="text" name="name" size="8">';
		htmlStr += '	</li>';
		htmlStr += '	<li>';
		htmlStr += certTypeHtml;
		htmlStr += '		<input type="text" name="code">';
		htmlStr += '	</li>';
		htmlStr += '	<li>';
		htmlStr += '		电话号码：';
		htmlStr += '		<input type="text" name="mobile">';
		htmlStr += '	</li>';
		htmlStr += '	<li>';
		htmlStr += '		<input type="button" value="删除当前" class="delBtn">';
		htmlStr += '	</li>';
		htmlStr += '</ul>';

		$('#passengerList').append(htmlStr);

		getTotalPrice();//重新计算订单金额
	});

	/*
		票价信息列表框修改，重新计算订单金额
	*/
	$('#passengerList').on('change', 'select[name=price]', function(event) {
		getTotalPrice();//重新计算订单金额
	});

	/*
		传入乘船人id，返回乘船人的数据
	*/
	function findPassengerById(id) {

		var p;

		$.each(passengerData, function(index, val) {
			 
			 if (id == val.id) {
			 	p = val;
			 	return false;//退出jquery的each循环
			 }

		});

		return p;
	}

	/*
		计算当前订单信息的金额，票数，并显示
	*/
	function getTotalPrice() {

		var totalPrice = 0;

		// 遍历票价信息列表框
		$('#passengerList select[name=price]').each(function(index,el) {

			totalPrice += parseInt(el.value); //累加计算当前票价

		});

		$('#totalPriceTxt').text(totalPrice); //显示订单金额
		$('#ticketCountTxt').text(passengerCount); //显示订票数
	}

	/*
		表单验证函数
	*/
	function checkForm() {

		// 验证姓名
		var names = $('#passengerList input[name=name]');

		for (var i = 0;i < names.length;i ++) {
			if(names[i].value == '') {
				alert('必须填写乘船人姓名！');
				names[i].focus();
				return false;
			}
		}

		// 验证证件号码
		var codes = $('#passengerList input[name=code]');

		for (var i = 0;i < codes.length;i ++) {
			if(codes[i].value == '') {
				alert('必须填写乘船人证件号码！');
				codes[i].focus();
				return false;
			}
		}

		// 验证手机号码
		var mobiles = $('#passengerList input[name=mobile]');

		for (var i = 0;i < mobiles.length;i ++) {
			if(mobiles[i].value == '') {
				alert('必须填写乘船人手机号码！');
				mobiles[i].focus();
				return false;
			}
		}

		return true;
	}

	/*
		提交订单
	*/
	$('#submitBtn').click(function(event) {
		
		// 表单验证
		if ( !checkForm() ) 
			return;

		// 订单票数验证
		if (passengerCount == 0) {
			alert('没有添加任何订单');
			return;
		}

		alert('订票成功！！');
	});

});