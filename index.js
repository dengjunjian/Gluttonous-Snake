
;(function (w) {
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
  w.Food = Food;

}(window));


//--------------------------------------------------------------

//分析一下,蛇是由三节身体组成的:每一节蛇身体都有颜色,位置,宽高
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
    //清空数组
    list = [];
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


  //3.把Snake()构造函数暴露出去
  window.Snake = Snake;

}(window));


//--------------------------------------------------------------

;(function (window) {
  //声明that变量,用来记录游戏Game对象.
  var that = null;

  //1.构造函数
  function Game(map){
    this.food = new  Food(); //游戏对象里面有食物,食物是创建出来的食物
    this.snake = new Snake();//游戏对象里面有蛇,蛇也是创建出来的.
    this.map = map;//游戏对象里面有地图,地图是传递进来的.

    that = this;
  }

  //2.游戏开始方法.
  Game.prototype.start = function () {
    //2.1 显示蛇和食物.
    this.food.render(this.map);
    this.snake.render(this.map);

    //2.2 让蛇移动一下.(a.调用move方法生成一个移动后的蛇其实就是改坐标;  b.根据新的坐标显示蛇)
    //蛇移动就是以下两句代码,那要让蛇不停的移动,就可以弄一个计时器,间隔的时间调用下面两句.
    // this.snake.move();
    // this.snake.render(this.map);
    snakeAutoMove();


    //让蛇根据键盘按键移动.
    bindKey();

  }

  //4.让蛇自动移动.
  function snakeAutoMove(){
    var timerId = setInterval(function () {
      //此时报错了,报错的信息是this.snake是undefined.undefined不能点出方法的.
      //console.log(this.snake);
      //console.log(this); //window

      //此时用函数上下文调用模式bind(),修改了当前这个方法里面的this的指向,此时this代表的是游戏对象.
      this.snake.move(this.food,this.map);



      //蛇每移动一步,就应该判断一下,有没有撞墙.
      var snakeHeadX = this.snake.body[0].x * this.snake.width;
      var snakeHeadY = this.snake.body[0].y * this.snake.height;
      //根据你移动的方向,来判断是否撞墙.(也就是即将要到达的那个位置是否能到达)
      switch (this.snake.direction){
        case "right":
          snakeHeadX++;
          break;
        case "left":
          snakeHeadX--;
          break;
        case "top":
          snakeHeadY--;
          break;
        case "bottom":
          snakeHeadY++;
          break;
      }
      if(snakeHeadX >= this.map.offsetWidth || snakeHeadY >= this.map.offsetHeight || snakeHeadX < -1 || snakeHeadY < -1){
        //提示游戏结束.
        alert("Game over!");
        //清空计时器.
        clearInterval(timerId);
        timerId = null;
      }
      //计时器还在就渲染,如果计时器都不在了,说明撞墙了,就不渲染了
      if(timerId != null){
        this.snake.render(this.map);
      }

    }.bind(that),300);
  }
  //让蛇根据键盘按键来移动.
  function bindKey(){
    //应该给页面一个键盘按下事件.
    window.onkeydown = function (e) {
      e = e || window.event;
      //console.log(e.keyCode);// 左37  上38  右39  下40
      switch (e.keyCode){
        case 37:
          if(this.snake.direction != "right"){
            this.snake.direction = "left";
          }
          break;
        case 38:
          if(this.snake.direction != "bottom"){
            this.snake.direction = "top";
          }
          break;
        case 39:
          if(this.snake.direction != "left"){
            this.snake.direction = "right";
          }
          break;
        case 40:
          if(this.snake.direction != "top"){
            this.snake.direction = "bottom";
          }
          break;
      }
    }.bind(that);
  }
  //3.把构造函数给暴露出去
  window.Game = Game;
}(window));

