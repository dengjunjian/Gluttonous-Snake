/**
 * 所有关于游戏逻辑的代码都写在这个游戏Game对象中.
 * 游戏对象里,有什么?
 * 方法:开始游戏start();
 * 属性:蛇,食物,地图
 */
//
// (function (window) {
//   //声明that变量,用来记录游戏Game对象.
//   var that = null;
//   //1.构造函数
//   function Game(map){
//     this.food = new  Food(); //游戏对象里面有食物,食物是创建出来的食物
//     this.snake = new Snake();//游戏对象里面有蛇,蛇也是创建出来的.
//     this.map = map;//游戏对象里面有地图,地图是传递进来的.
//     that = this;
//   }
//   //2.游戏开始方法.
//   Game.prototype.start = function () {
//     //2.1 显示蛇和食物.
//     this.food.render(this.map);
//     this.snake.render(this.map);
//     //2.2 让蛇移动一下.(a.调用move方法生成一个移动后的蛇其实就是改坐标;  b.根据新的坐标显示蛇)
//     //蛇移动就是以下两句代码,那要让蛇不停的移动,就可以弄一个计时器,间隔的时间调用下面两句.
//     // this.snake.move();
//     // this.snake.render(this.map);
//     snakeAutoMove();
//     //让蛇根据键盘按键移动.
//     bindKey();
//   }
//   //4.让蛇自动移动.
//   function snakeAutoMove(){
//     var timerId = setInterval(function () {
//       //此时报错了,报错的信息是this.snake是undefined.undefined不能点出方法的.
//       //console.log(this.snake);
//       //console.log(this); //window
//       //此时用函数上下文调用模式bind(),修改了当前这个方法里面的this的指向,此时this代表的是游戏对象.
//       this.snake.move(this.food,this.map);
//       //蛇每移动一步,就应该判断一下,有没有撞墙.
//       var snakeHeadX = this.snake.body[0].x * this.snake.width;
//       var snakeHeadY = this.snake.body[0].y * this.snake.height;
//       //根据你移动的方向,来判断是否撞墙.(也就是即将要到达的那个位置是否能到达)
//       switch (this.snake.direction){
//         case "right":
//           snakeHeadX++;
//           break;
//         case "left":
//           snakeHeadX--;
//           break;
//         case "top":
//           snakeHeadY--;
//           break;
//         case "bottom":
//           snakeHeadY++;
//           break;
//       }
//       if(snakeHeadX >= this.map.offsetWidth || snakeHeadY >= this.map.offsetHeight || snakeHeadX < -1 || snakeHeadY < -1){
//         //提示游戏结束.
//         alert("Game over!");
//         //清空计时器.
//         clearInterval(timerId);
//         timerId = null;
//       }
//       //计时器还在就渲染,如果计时器都不在了,说明撞墙了,就不渲染了
//       if(timerId != null){
//         this.snake.render(this.map);
//       }
//
//     }.bind(that),300);
//   }
//   //让蛇根据键盘按键来移动.
//   function bindKey(){
//     //应该给页面一个键盘按下事件.
//     window.onkeydown = function (e) {
//       e = e || window.event;
//       //console.log(e.keyCode);// 左37  上38  右39  下40
//       switch (e.keyCode){
//         case 37:
//           if(this.snake.direction != "right"){
//             this.snake.direction = "left";
//           }
//           break;
//         case 38:
//           if(this.snake.direction != "bottom"){
//            this.snake.direction = "top";
//           }
//           break;
//         case 39:
//             if(this.snake.direction != "left"){
//               this.snake.direction = "right";
//             }
//           break;
//         case 40:
//             if(this.snake.direction != "top"){
//               this.snake.direction = "bottom";
//             }
//           break;
//       }
//     }.bind(that);
//   }
//   //3.把构造函数给暴露出去
//   window.Game = Game;
// }(window));

(function (window){
    var that=null;
    function Game(map){
    	this.food=new Food();
    	this.snake=new Snake();
    	this.map=map;
    	that=this;
	}
	Game.prototype.start=function (){
		this.food.render(this.map);
		this.snake.render(this.map);
		snakeAutoMove();
		bindKey();
	}
	function snakeAutoMove(){
		var timeId=setInterval(function (){
			this.snake.move(this.food,this.map);
			var snakeHeadX=this.snake.body[0].x*this.snake.width;
			var snakeHeadY=this.snake.body[0].y*this.snake.height;
			switch (this.snake.direction){
              case "top":
                snakeHeadY--;
                break;
              case "bottom":
                snakeHeadY++;
                break;
              case "left":
                snakeHeadX--;
                break;
              case "right":
                snakeHeadX++;
                break;
            }
            if(snakeHeadX>=this.map.offsetWidth||snakeHeadY>=this.map.offsetHeight||snakeHeadX<-1||snakeHeadY<-1){
                alert("Game over!");
                clearInterval(timeId);
                timeId=null;
            }
            if(timeId!=null){
			  this.snake.render(this.map);
            }
		}.bind(that),300)
	}
	function bindKey(){
		window.onkeydown=function (e) {
			e=e||window.event;
			switch (e.keyCode){
              case 37:
                if(this.snake.direction!="top"){
                  this.snake.direction="buttom";
                }
                break;
              case 38:
                if(this.snake.direction!="buttom"){
                  this.snake.direction="top";
                }
                break;
              case 39:
                if(this.snake.direction!="left"){
                  this.snake.direction="right";
                }
                break;
              case 40:
                if(this.snake.direction!="right"){
                  this.snake.direction="top";
                }
                break;
            }
		}.bind(that);
	}
    window.Game=Game;
}(window));