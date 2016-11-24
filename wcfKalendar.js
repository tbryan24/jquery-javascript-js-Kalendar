;(function($){
	var myDate=new Date();
	var myYear;
	var myMonth;
	var myDay;
	var myDateStr;
	var timeStamp=myDate.getTime();
	var func;
	initWcfKalendar();
	var WcfKalendar=function(){
		
		
		this.cal_month_days=function(mStamp){//不传参数是获取当月天数，传入参数是获取时间戳对应那月天数
			var Stamp=mStamp?mStamp:timeStamp;
			var days=cal_month_days(Stamp);
			return days;
		}
		
		this.cal_week_day=function(mStamp){//不传参数是获取当天星期几，传入参数是获取时间戳对应那天星期几
			var Stamp=mStamp?mStamp:timeStamp;
			var day=cal_week_day(Stamp);
			return day;
		}
		
		this.cal_week_firstDay=function(mStamp){//不传参数是获取当月第一天星期几，传入参数是获取时间戳对应那个月星期几
			var Stamp=mStamp?mStamp:timeStamp;
			var day=cal_week_firstDay(Stamp);
			return day;
		}
		
		this.getDate=function(){
			var inputdate=$(".kalendar_input").val();
			return inputdate;
		}
		
		this.clickCall=function(fun){
			func=fun;
		}
	}
	
	function formatDate(timeStamp){//时间戳格式化日期最终格式为Y/m/d
		var date=new Date();
		if(timeStamp){
			date.setTime(timeStamp);
		}
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		var day=date.getDate();
		var dateStr=year+"-"+month+"-"+day;
		var dateObj={"Y":year,"M":month,"D":day,"dateStr":dateStr}
		return dateObj;	
	}
	
	
	function cal_month_days(timeStamp){//获取某月天数
		var year=formatDate(timeStamp).Y;
		var month=formatDate(timeStamp).M;
		var date=new Date(year,month,0);
		return date.getDate();
	}
	
	function cal_week_day(timeStamp){//获取某天星期数
		var d=new Date(timeStamp);
		var weekday=new Array(7)
		weekday[0]=7;
		weekday[1]=1;
		weekday[2]=2;
		weekday[3]=3;
		weekday[4]=4;
		weekday[5]=5;
		weekday[6]=6;
		
		return weekday[d.getDay()];
	}
	
	function cal_week_firstDay(timeStamp){//获取某月第一天星期数
		var year=formatDate(timeStamp).Y;
		var month=formatDate(timeStamp).M;
		var mTimeStamp=new Date(year,month-1,1);
		var day=cal_week_day(mTimeStamp);
		return day;
	}
	
	
	function createDOM() {
		$(".wcfKalendar").append('<input type="text" name="kalendar_input" class="kalendar_input" value="date" /></input>');
		$(".wcfKalendar").append('<div class="kalendar_container">' +
			'<div class="days">' +
				'<div class="select">' +
					'<span class="pre_icon"><</span><span class="y_span"><select name="year_select" class="year_select">' +
						'<option value="">年</option>' +
					'</select></span><span>年</span>' +
					'<span class="m_span"><select name="month_select" class="month_select">' +
						'<option value="">月</option>' +
					'</select></span><span>月</span><span class="nex_icon">></span>' +
				'</div>'+
				'<table id="kalendar_table"></table>'+
			'</div></div>');
		$("#kalendar_table").append('<tr class="kalendar_tr"><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr>');
		for(var i=1;i<=6;i++){
			$("#kalendar_table").append('<tr class="kalendar_tr"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
		}
		$(".wcfKalendar").css("position","relative");
		$(".kalendar_tr th,.kalendar_tr td").css({"border-radius":"15px","cursor":"pointer","width": "30px","height": "30px","text-align":"center"});
		$(".kalendar_tr th").css("color","#8400FF");
		$(".kalendar_input").css({"padding": "4px","border":"1px solid #ccc"});
		$(".kalendar_container").css({"position":"absolute","top": "50px","z-index":"10000","left": "0","background":"rgba(132,255,0,0.5)","box-shadow": "0 0 20px #888888","border-radius":"5px","display":"none","width": "220px"});
		$(".year_select,.month_select").css({"background": "rgba(255,255,255,0)","border-style":"none","display": "block","float": "left","width": "auto","height": "100%","padding": "0 5px","color": "red"});
		$(".select").css({"display": "inline-block","height":"18px","margin": "0 auto","padding-top": "10px"});
		$(".days").css({"text-align": "center"});
		$(".days select").css({"appearance":"none","-moz-appearance":"none","-webkit-appearance":"none"});/*去掉select默认样式*/
		$(".select span").css({"display": "block","float": "left","height": "100%"});
		$(".pre_icon,.nex_icon").css({"color":"#666","cursor":"pointer","font-weight":"bold"});
		$(".nex_icon").css("margin-left", "5px");
	}
	
	
	function setInit(mStamp,boolse){//初始化日历界面数据，默认为当天日期
			var Stamp=mStamp?mStamp:timeStamp;
			var days=cal_month_days(Stamp);
			var week=cal_week_firstDay(Stamp);
			var dayArr=new Array();
			var className='td'+formatDate().D;
			for(var i=1;i<=days;i++){
				for(var j=1;j<=week-1;j++){
					dayArr[j]='';
				}
				dayArr[i+week-1]=i;
			}
			$(".kalendar_tr").each(function(i){
				$(this).find("td").each(function(j){
					$(this).html(dayArr[j+1+(i-1)*7]);
					if(boolse!=true){
						$(this).addClass("td"+dayArr[j+1+(i-1)*7]);
					}
					
				})
			});
			if(boolse!=true){
				$("."+className).css("background","aqua");
			}
			
		}
	function tdClick(){
		$(".kalendar_tr>td").click(function(){//点击天(td)的事件
			var year=$(".year_select option:selected").val();
			var month=$(".month_select option:selected").val();
			var dateStr=year+"-"+month+"-"+$(this).html();
			$(".kalendar_input").val(dateStr);
			$(".kalendar_container").css("display","none");
			func();
		})
	}
	function initEvent(){//初始化相关事件，点击天(td)的事件、点击日历选择框input后弹出日历的事件和下拉框选择事件
		tdClick();
		
		$(".year_select,.month_select").change(function(){//下拉框选择事件
			var year=$(".year_select option:selected").val();
			var month=$(".month_select option:selected").val();
			var date=new Date(year,month,0);
			var timestamp=date.getTime();
			if(year==formatDate().Y&&month==formatDate().M){//如果选择的是当年当月则标记当天
				setInit(timestamp);
			}else{
				$("td").removeClass().css("background","");//选择的不是当年当月则移除td的class属性，并将当天标记取消
				setInit(timestamp,true);//第二个参数用来在setInit方法中控制是否标记当天（为每个td设置class，并背景色标记当天对应的td元素）
			}
		})
		
		
		$(".kalendar_input").click(function(){//点击日历选择框input后弹出日历的事件
			$(".kalendar_container").css("display","block");
		})
		
		$(".pre_icon").click(function(){
			var m_index=$(".month_select").get(0).selectedIndex;
			var y_index=$(".year_select").get(0).selectedIndex;
			if(m_index==1){
				$(".month_select").get(0).selectedIndex=12;
				$(".year_select").get(0).selectedIndex=y_index-1;
			}else{
				$(".month_select").get(0).selectedIndex=m_index-1;
			}
			var year=$(".year_select option:selected").val();
			var month=$(".month_select option:selected").val();
			var date=new Date(year,month,0);
			var timestamp=date.getTime();
			if(year==formatDate().Y&&month==formatDate().M){//如果选择的是当年当月则标记当天
				setInit(timestamp);
			}else{
				$("td").removeClass().css("background","");//选择的不是当年当月则移除td的class属性，并将当天标记取消
				setInit(timestamp,true);//第二个参数用来在setInit方法中控制是否标记当天（为每个td设置class，并背景色标记当天对应的td元素）
			}
		})
		$(".nex_icon").click(function(){
			var m_index=$(".month_select").get(0).selectedIndex;
			var y_index=$(".year_select").get(0).selectedIndex;
			if(m_index==12){
				$(".month_select").get(0).selectedIndex=1;
				$(".year_select").get(0).selectedIndex=y_index+1;
			}else{
				$(".month_select").get(0).selectedIndex=m_index+1;
			}
			var year=$(".year_select option:selected").val();
			var month=$(".month_select option:selected").val();
			var date=new Date(year,month,0);
			var timestamp=date.getTime();
			if(year==formatDate().Y&&month==formatDate().M){//如果选择的是当年当月则标记当天
				setInit(timestamp);
			}else{
				$("td").removeClass().css("background","");//选择的不是当年当月则移除td的class属性，并将当天标记取消
				setInit(timestamp,true);//第二个参数用来在setInit方法中控制是否标记当天（为每个td设置class，并背景色标记当天对应的td元素）
			}
		})
	}
	
	
	function initWcfKalendar(){
		myYear=formatDate(timeStamp).Y;
		myMonth=formatDate(timeStamp).M;
		myDay=formatDate(timeStamp).D;
		myDateStr=formatDate(timeStamp).dateStr;
		createDOM();
		setInit();
		initEvent();
		
		$(".kalendar_input").val(myDateStr);
		for(i=1;i<=50;i++){
			var str="<option value='"+(1970+i)+"'>"+(1970+i)+"</option>";
			$(".year_select").append(str);
		}
		for(i=1;i<=12;i++){
			var str="<option value='"+i+"'>"+i+"</option>";
			$(".month_select").append(str);
		}
		$(".year_select>option[value='"+myYear+"']").attr("selected", true);
		$(".month_select>option[value='"+myMonth+"']").attr("selected", true);
	}
	window.WcfKalendar=WcfKalendar;
})(jQuery)
