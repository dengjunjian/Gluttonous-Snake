/**
 * 所有关于食物的代码都写在这个js文件中.
 */

(function (window) {
  var list = [];//保存食物
  //1.食物是对象,有构造函数创建这个食物对象
  function Food(width,height,bgColor,x,y){
    this.width = width || 20;
    this.height = height || 20;
    this.bgColor = bgColor || "green";
    this.x = x || 0;
    this.y = y || 0;
  }
  //2.每一个食物对象都要显示在地图上,显示在地图上的那些代码封装成一个函数,写在原型中.
  Food.prototype.render = function (map) {
    //渲染新的食物之前,删掉老食物.
    remove(map);
    //2.1 随机的x,y坐标
    this.x = Math.floor(Math.random() * map.offsetWidth / this.width ) * this.width;
    this.y = Math.floor(Math.random() * map.offsetHeight / this.height) * this.height;
    //2.2 创建一个div,让这个div拥有这个食物对象所有的显示信息
    var div1 = document.createElement("div");
    div1.style.position = "absolute";
    div1.style.left = this.x + "px";
    div1.style.top = this.y +"px";
    div1.style.width = this.width +"px";
    div1.style.height = this.height + "px";
    div1.style.backgroundColor = this.bgColor;
    //2.3 把这个div1追加到地图上去.
    map.appendChild(div1);
    //把这个代表食物的div1,装进数组list中
    list.push(div1);
  }
  //删掉食物的方法
  function remove(map){
    //移出map地图中的食物
    for(var i = 0 ; i < list.length; i++){
    	map.removeChild(list[i]);
    }
    //清空数组
    list = [];
  }
  //3.把构造函数给暴露出去.
  window.Food = Food;
}(window));

(function (widnow){
    var list=[];
	function Food(width,height,bgColor,x,y){
		this.width=width||20;
		this.height=height||20;
		this.bgColor=bgColor||"green";
		this.x=x||0;
		this.y=y||0;
	}
	Food.prototype.render=function (map){
		remove(map);
		this.x=Math.floor(Math.random()*map.offsetWidth/this.width)*this.width;
		this.y=Math.floor(Math.random()*map.offsetHeight/this.height)*this.height;
		var div1=document.getElementById("div");
		    div1.style.position="absolute";
		    div1.style.left=this.x+"px";
		    div1.style.top=this.y+"px";
		    div1.style.backgroundColor=this.bgColor;
		    div1.style.width=this.width+"px";
		    div1.style.height=this.height+"px";
		    map.appendData(div1);
		    list.push(div1);
	}
	  function remove(map){
	  	for(var i = 0 ; i <list.length ; i++){
          map.removeChild(list[i]);
	  	}
	  	list=[];
	  }
	  widnow.Food=Food();
}(window));