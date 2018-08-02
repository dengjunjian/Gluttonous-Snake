/**
//  * 所有关于蛇的代码都写在这个js文件中.
//  */
// //分析一下,蛇是由三节身体组成的:每一节蛇身体都有颜色,位置,宽高
//蛇也是一个对象.
;(function (window) {

  //随机产生一个十六进制的颜色的函数.
  function getColorForRandom(){
    var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];  //下标0-15
    var str = "#";
    //循环产生 6个 0-15的数.
    for(var i = 0 ; i < 6; i++){
      var num = Math.floor(Math.random()*16);
      //根据这个随机数,在arr数组中去取值.
      str += arr[num];
    }
    return str;
  }

  //声明一个数组list,用来保存蛇的每一节身体.
  var list = [];

  //1.创建蛇的构造函数
  function Snake(width,heigth,direction){
    this.width = width || 20;
    this.height = heigth || 20;
    this.direction = direction || "right";
    //用一个数组来保存蛇的每一节身体. 每一节的坐标和颜色不一样,所以每一节又是一个对象.
    this.body = [
      {x:3,y:1,bgColor:"red"},
      {x:2,y:1,bgColor:"greenYellow"},
      {x:1,y:1,bgColor:"skyBlue"}
    ];
  }

  //2.蛇显示在地图上的代码封装成一个函数,写在原型中.
  Snake.prototype.render = function (map) {
    //渲染蛇之前,把老蛇给删掉
    remove(map);

    //this就表示调用和这个render方法的那条蛇.
    //显示蛇,把蛇的每一节身体都显示,整条蛇都出来了.
    //2.1 遍历出每一个蛇身体
    for(var i = 0 ; i < this.body.length; i++){
      var unit = this.body[i]; //unit代表每一节蛇身体.
      //2.2 创建一个div,让这个div拥有当前蛇这一节的所有的显示信息.
      var div1 = document.createElement('div');
      div1.style.position = 'absolute';
      div1.style.left = unit.x * this.width + "px";
      div1.style.top = unit.y * this.height + "px";
      div1.style.width = this.width + "px";
      div1.style.height = this.height + "px";
      div1.style.backgroundColor = unit.bgColor;
      //2.3 把当前这div1追加到map中
      map.appendChild(div1);
      //把当前这个代表蛇身体的div1添加到数组list中.
      list.push(div1);
    }
  }
  //5.写一个方法,删掉蛇
  function remove(map){
    //删蛇,实际上就是删掉添加到map中去的那些div.
    for(var i = 0 ; i < list.length; i++){
      map.removeChild(list[i]);
    }
    list = [];//清空数组
   }

  //4.蛇要移动,说白了就是更改蛇头以及蛇身体每一节的坐标.
  Snake.prototype.move = function (food,map) {
    //4.1蛇头之外的每一节身体
    //移动之后的坐标,是等于他上一节没有移动之前的坐标.
    for(var i = this.body.length-1; i > 0 ;i--){
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }
    //4.2 蛇头移动
    //根据方向移动的.
    switch (this.direction){
      case "top":
        this.body[0].y--;
        break;
      case "bottom":
        this.body[0].y++;
        break;
      case "right":
        this.body[0].x++;
        break;
      case "left":
        this.body[0].x--;
        break;
    }
    //判断蛇有么有吃掉食物(蛇头的坐标和食物的坐标重叠.)
    var snakeHeadX = this.body[0].x * this.width;
    var snakeHeadY = this.body[0].y * this.height;
    var foodX = food.x;
    var foodY = food.y;
    //把蛇尾巴先取出来(取出来的目的就是为了得到他的xy坐标).
    var lastUnit = this.body[this.body.length-1];
    //判断蛇头有没有吃到食物
    if(snakeHeadX == foodX && snakeHeadY == foodY){
      //如果进到了这里,说明蛇吃掉了食物,就应该长一节身体.
      this.body.push({
        x:lastUnit.x,
        y:lastUnit.y,
        bgColor:getColorForRandom()
      });
      //新产生一个食物.(调用食物的render方法).
      food.render(map);
    }
  }
  window.Snake = Snake;//3.把Snake()构造函数暴露出去
}(window));

//
// (function (window){
//   function getColor(){
//     var arr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
//     var str="#";
//     for(var  i= 0 ;  i<6 ; i++){
//       var num=Math.floor(Math.random()*16);
//       str+=arr[num];
//     }
//     return str;
//   }
// 	var list=[];
// 	function Snake(width,height,direction){
// 		this.width=width||20;
// 		this.height=height||20;
// 		this.direction=direction||"right";
// 		this.body=[
//           {x:3,y:1,bgColor:"red"},
//           {x:2,y:1,bgColor:"yellow"},
//           {x:1,y:1,bgColor:"blue"},
//         ];
// 	}
// 	Snake.prototype.render=function (map){
// 	  remove(map);
// 	  for(var i = 0 ; i <this.body.length ; i++){
// 	  	var unit=this.body[i];
// 	  	var div1=document.createElement("div");
// 	  	    div1.style.position="absolute";
// 	  	    div1.style.left=unit.x*this.width+"px";
// 	  	    div1.style.top=unit.x*this.height+"px";
// 	  	    div1.style.backgroundColor=unit.bgColor;
// 	  	    div1.style.width=this.width+"px";
// 	  	    div1.style.height=this.height+"px";
// 	  	    map.appendChild(div1);
// 	  	    list.push(div1);
// 	  }
//
// 	  	}
//         function remove(map){
//           for(var i = 0 ; i <list.length ; i++){
//             map.removeChild(list[i]);
// 	  }
//       list=[];
// 	}
// 	Snake.prototype.move=function (food,map){
// 		for(var i = this.body.length-1 ; i >0 ; i--){
// 			this.body[i].x=this.body[i-1].x;
// 			this.body[i].y=this.body[i-1].y;
// 		}
// 		switch (this.direction){
//           case "top":
//             this.body[0].y--;
//             break;
//           case "bottom":
//             this.body[0].y++;
//             break;
//           case "left":
//             this.body[0].x--;
//             break;
//           case "right":
//             this.body[0].x++;
//             break;
//         }
//         var snakeHeadX=this.body[0].x*this.width;
// 		var snakeHeadY=this.body[0].y*this.height;
// 		var foodX=food.x;
// 		var foodY=food.y;
// 		var listUnit=this.body[this.body.length-1];
// 		  if(snakeHeadX==foodX&&snakeHeadY==foodY){
// 		    this.body.push({
//               x:listUnit.x,
//               y:listUnit.y,
//               bgColor:getColor()
//             });
// 		    food.render(map);
//           }
// 	}
// 	window.Snake=Snake;
// }(window));
//
//
//   Snake.prototype.move=function (food,map){
//   	for(var i = this.body.length-1 ; i >0 ; i--){
//   		this.body[i].x=this.body[i-1].x;
//   		this.body[i].y=this.body[i-1].y;
//   	}
//   	switch (this.direction){//蛇移动方向
//       case "top":
//         this.body[0].y--;
//         break;
//       case "bottom":
//         this.body[0].y++;
//         break;
//       case "left":
//         this.body[0].x--;
//         break;
//       case "right":
//         this.body[0].x++;
//         break;
//     }
//     var snakeHeadX=this.body[0].x*this.width;
//   	var snakeHeadY=this.body[0].y*this.height;
//   	var foodX=food.x;
//   	var foodY=food.y;
//   	var lastUnit=this.body[this.body.length-1];
//   	if(snakeHeadX==foodX&&snakeHeadY==foodY){
//   	  this.body.push({
//         x:lastUnit.x,
//         y:lastUnit.y,
//         bgColor:getColor()//获取随机颜色
//       });
//   	  food.render(map);//产生新的食物
//     }
//   }
//
//   window.Snake=Snake;
// }(window));
//
