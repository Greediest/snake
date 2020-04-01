/*jshint esversion: 6 */
class View {
  constructor(){
    this.el = document.querySelector("#app");
    this.fieldHash = {
      1: "snake",
      2: "food",
      3: "wall"
    };
  }
  // Первичный рендер полюшка с учетом переданных из модели размеров
  renderField (pFieldOptions){
    let width = this.el.clientWidth;
    let cellWidth = (width / pFieldOptions.width) + "px";
    document.documentElement.style.setProperty("--cell-size", cellWidth);
    document.documentElement.style.setProperty("--grid-width", pFieldOptions.width);
    document.documentElement.style.setProperty("--grid-height", pFieldOptions.height);

    let cells = pFieldOptions.width * pFieldOptions.height;
    for (let i = 0; i < cells; ++i){
      this.el.insertAdjacentHTML('beforeend', '<div class="cell floor"></div>');
    }
  }
  // Рендер ячейки поля
  renderCell(pCells, pCell, pPos){
    pCells[pPos].className = "cell " + this.fieldHash[pCell];
  }
  // общий рендер поля
  render (pState){
    const width = pState.grid[0].length;
    const cells = this.el.querySelectorAll(".cell");

    for (let i = 0; i < pState.grid.length; ++i){
      for (let j = 0; j < pState.grid[i].length; ++j){
        this.renderCell(cells, pState.grid[i][j], i * width + j);
      }
    }
  }
}
