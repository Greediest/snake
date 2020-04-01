/*jshint esversion: 6 */
class Snake {
  /*
    Змея - это массив координат в сетке (вертикаль/горизонталь)
  */
  constructor (spawnH, spawnW, { height, width }) {
    this.direction = 1;
    /*
    Направления:
      0. Вправо
      1. Вниз
      2. Влево
      3. Вверх
    */
    this.body = [
      [spawnH, spawnW],
      [spawnH, spawnW - 1],
      [spawnH, spawnW - 2],
      [spawnH, spawnW - 3],
    ];
    this.bounds = {
      height: height,
      width: width,
    };
  }
  // Выдать клетку, которая впереди
  see(){
    const overhead = this.body[0].slice();
    switch (this.direction) {
      case 0:
        overhead[1] = (overhead[1] + 1 === this.bounds.width) ? 0 : overhead[1] + 1;
        break;
      case 1:
        overhead[0] = (overhead[0] + 1 === this.bounds.height) ? 0 : overhead[0] + 1;
        break;
      case 2:
        overhead[1] = (overhead[1] - 1 === -1) ? this.bounds.width - 1 : overhead[1] - 1;
        break;
      case 3:
        overhead[0] = (overhead[0] - 1 === -1) ? this.bounds.height - 1 : overhead[0] - 1;
        break;
    }
    return overhead;
  }
  // двигаться в направлении
  // Вернет координаты жопки у змейки, которые надо было бы удолить с поля
  // опционально передаем wrap - если столкнулись со стенкой, считаем координату по-другому
  move(){
    this.body.unshift(this.see());
    return this.body.pop();
  }
  // жрать
  eat(){
    this.body.unshift(this.see());
  }
}

class Model {
  constructor(pView, pOptions){
    this.view = pView;
    this.options = pOptions;
    this.state = {};
    this.startState();
  }
  startState(){
    this.snake = new Snake(0, 0, {
      height: this.options.height,
      width: this.options.width,
    });

    this.state.grid = [];
    for (let i = 0; i < this.options.height; ++i){
      this.state.grid[i] = [];
      for (let j = 0; j < this.options.width; ++j){
        this.state.grid[i][j] = 0;
      }
    }

  }
  init(){
    this.view.renderField({width: this.options.width, height: this.options.height});
    this.startLoop();
  }
  // Берет змейку и меняет коды на поле, согласно её координатам
  placeSnake (){
    for (let [coordH, coordW] of this.snake.body ){
      this.state.grid[coordH][coordW] = 1;
    }
  }
  // Помещает на поле жратву
  placeFood (){
    let randH, randW;
    do {
      randH = Math.ceil(Math.random() * this.options.height) - 1;
      randW = Math.ceil(Math.random() * this.options.width) - 1;
    } while (this.state.grid[randH][randW] !== 0);
    this.state.grid[randH][randW] = 2;
  }
  logic(){
    let [nextH, nextW] = this.snake.see();
    switch (this.state.grid[nextH][nextW]) {
      case 0:
        // Двинуть змею
        const [ tailH, tailW ] = this.snake.move();
        this.state.grid[tailH][tailW] = 0;
        this.placeSnake();
        break;
      case 1:
        throw new Error("ТЫ ПРОЕБАЛ");
        this.endLoop();
        break;
      case 2:
        console.log("АМ!");
        this.state.grid[nextH][nextW] = 0;
        this.placeFood();
        // змея жрет
        this.snake.eat();
        this.placeSnake();
        break;
    }

  }
  // сменить направление змейки
  changeDirection(dir){
    this.snake.direction = dir;
  }
  // Посмотреть, что перед змейкой
  snakeBefore(){

  }
  // Двинуть змейку
  snakeMove(){

  }
  startLoop(){
    this.loop = 0;
    var tick = (1.2 - this.options.speed / 10) * 300;
    this.logic();
    this.view.render(this.state);
    this.placeSnake();
    this.placeFood();
    this.loopInterval = setInterval( () => {
      this.logic();
      this.view.render(this.state);
    }, tick);
  }
  endLoop(){
    clearInterval(this.loopInterval);
  }
}
