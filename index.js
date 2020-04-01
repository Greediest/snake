/*jshint esversion: 6 */
class Game{
  constructor(){

  }
  init(){
    this.options = {
      speed : 7,
      width: 30,
      height: 22
    };
    this.view = new View(this.options);
    this.model = new Model(this.view , this.options);
    this.controller = new Controller(this.model);
  }
  start(){
    this.controller.init();
    this.model.init();
  }
}

let game = new Game();
game.init();
game.start();
