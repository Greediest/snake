/*jshint esversion: 6 */
class Controller {
  constructor(pModel){
    this.lock = false;
    this.model = pModel;
  }
  init(){
    window.addEventListener("keypress", (event) => {
      const {code} = event;
      if (this.lock) { return; }
      this.lock = true;
      let promise = new Promise((resolve, reject) => {
        this.processInput(event);
        resolve();
      });
      promise
        // .then((responce)=> console.log(responce))
        // .catch((err)=> console.log(err))
        .finally(()=> { this.lock = false; } );
    });
  }
  // TODO, сменить направление в модели
  processInput({ code }){
    switch (code) {
      case "KeyW":
        this.model.changeDirection(3);
        break;
      case "KeyS":
        this.model.changeDirection(1);
        break;
      case "KeyD":
        this.model.changeDirection(0);
        break;
      case "KeyA":
        this.model.changeDirection(2);
        break;

    }
  }
}
