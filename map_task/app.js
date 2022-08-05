//This lines from https://luckygg.tistory.com/287

// Constant
const INITIAL_COLOR = '#2c2c2c'
const INITIAL_BG_COLOR = 'white';
const INITIAL_LINE_WIDTH = 2.5;
const BTN_CLICKED_CN = 'controls__color__clicked';
// Dom Element
const canvasParent = document.querySelector('#canvas');
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor')
const myColorContorls = document.querySelector('#jsMyColorControl');
const myColor = document.querySelector('#jsMyColor')
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');
const resetBtn = document.querySelector('#jsReset');
const resizeBtn = document.querySelector('#jsResize');
const widthControls = document.querySelector('#jsWidth');
const heightControls = document.querySelector('#jsHeight');

// Variable
let canvasWidth = 546;
let canvasHeight = 680; //조정해야 할 수 있음. 아래 작업 영역 생각 못 함:-)
let isPainting = false;
let isFilling = false;

//#1 고정물들 위치시키기
window.onload = function() {
    var canvas = document.getElementById("jsCanvas");
    var ctx = canvas.getContext("2d");
    //var img = document.getElementById("scream");
    var home = new Image();
    home.src = "https://static.vecteezy.com/system/resources/previews/000/425/085/non_2x/house-icon-vector-illustration.jpg";
    ctx.drawImage(home, 400, 340, 80, 80);

    var church = new Image();
    church.src = "https://www.nicepng.com/png/full/131-1315847_church-icon-01-church-png.png";
    ctx.drawImage(church, 420, 60, 70, 70);

    var airplane = new Image();
    airplane.src = "https://static.vecteezy.com/system/resources/previews/000/550/632/non_2x/airplane-flying-vector-icon.jpg";
    ctx.drawImage(airplane, 190, 210, 80, 80);

    var mountain = new Image();
    mountain.src = "https://visualpharm.com/assets/787/Mountain-595b40b75ba036ed117d67e8.svg";
    ctx.drawImage(mountain, 270, 280, 80, 80);
    
    var windmill = new Image();
    windmill.src = "https://pngimage.net/wp-content/uploads/2018/06/windmill-icon-png-7.png";
    ctx.drawImage(windmill, 80, 70, 130, 70);

    var lake = new Image();
    lake.src = "https://cdn.iconscout.com/icon/free/png-256/lake-1452035-1226990.png";
    ctx.drawImage(lake, 40, 200, 70, 70);

    var fish = new Image();
    fish.src = "https://cdn-icons-png.flaticon.com/512/193/193720.png";
    ctx.drawImage(fish, 230, 460, 50, 50);

    var camel = new Image();
    camel.src = "https://cdn-icons-png.flaticon.com/512/616/616866.png";
    ctx.drawImage(camel, 329, 510, 70, 70);

    var macdonald = new Image();
    macdonald.src = "https://cdn-icons-png.flaticon.com/512/732/732060.png";
    ctx.drawImage(macdonald, 280, 70, 40, 40);

    var building = new Image();
    building.src = "https://cdn-icons.flaticon.com/png/512/3008/premium/3008509.png?token=exp=1659342813~hmac=80ae58e231b29acc56310857a688bee8";
    ctx.drawImage(building, 60, 380, 70, 70);

    var start = new Image();
    start.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbI6cjIy9i6_qjeWXts4yj1c47XlUm1HA9pBQBnQpNLNhlk_ODZdRyFp4wpctcqsBORfo&usqp=CAU";
    ctx.drawImage(start, 0, 300, 70, 70);
  };

// Init setting
const initSetting = () => {
  // Set width, height of canvas
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  // Set background color, paint color, fill color, line width of canvas
  ctx.fillStyle = INITIAL_BG_COLOR;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.strokeStyle = INITIAL_COLOR;
  ctx.fillStyle = INITIAL_COLOR;
  ctx.lineWidth = INITIAL_LINE_WIDTH;
  // Set initial line width
  range.value = INITIAL_LINE_WIDTH;
  // Set initial mode to paint
  isFilling = false;
  mode.innerText = 'fill';
  // Set all button unclicked
  colors.forEach(color=>{
    color.classList.remove(BTN_CLICKED_CN);
  })
  // Set black button clicked
  colors[0].classList.add(BTN_CLICKED_CN);
  
}

// Init event
const initEvent = () => {
  // Add event to Canvas
  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu)
  }
  // Add event to color
  colors.forEach(color => {
    color.addEventListener('click', handleColorClick);
  })
  // Add event to range
  if (range) {
    range.addEventListener("input", handleRangeChange);
  }
  // Add event to mode button
  if (mode) {
    mode.addEventListener("click", hanldeModeClick);
  }
  // Add event to save button
  if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
  }
  // Add event to reset button
  if (resetBtn) {
    resetBtn.addEventListener("click", handleResetClick);
  }
  // Add event to my color
  if (myColorContorls) {
    myColorContorls.addEventListener("change", handleMyColorChange);
  }
  // Add event to resize button
  if (resizeBtn) {
    resizeBtn.addEventListener("click", handleResizeClick);
  }
}


  

// Set start paint
const startPainting = () => {
  isPainting = true;
}
// Set stop paint
const stopPainting = () => {
  isPainting = false;
}
// Event of move mouse on canvas
const onMouseMove = (e) => {
  if (isFilling)
    return;
  const x = e.offsetX;
  const y = e.offsetY;
  if (!isPainting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
// Event of click color
const handleColorClick = (e) => {
  // set color of paint or fill
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  // Set all button unclicked
  colors.forEach(color=>{
    color.classList.remove(BTN_CLICKED_CN);
  })
  // Set clicked button clicked
  e.target.classList.add(BTN_CLICKED_CN);
}
// Event of change line width
const handleRangeChange = (e) => {
  const size = e.target.value;
  ctx.lineWidth = size;
}
// Event of change mode
const hanldeModeClick = () => {
  if (isFilling === true) {
    // If current mode is paint
    isFilling = false;
    mode.innerText = 'fill';
  } else {
    // If current mode is fill
    isFilling = true;
    mode.innerText = 'paint';
  }
}
// Event of click canvas
const handleCanvasClick = () => {
  if (isFilling === true) {
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
}
// Prevent event of right click
const handleContextMenu = (e) => {
  e.preventDefault();
}
// Event of Click save button
const handleSaveClick = () => {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS[Export]';
  link.click();
}
// Event of Click reset button
const handleResetClick = () => {
  initSetting();
}
// Event of Change my color
const handleMyColorChange = (e) => {
  const color = e.target.value;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  myColor.style.backgroundColor = color;
}
// Event of Change size of canvas
const handleResizeClick = (e) => {
  if (widthControls.value>window.innerWidth){
    alert('Too Large');
  }else{
    canvasWidth = widthControls.value;
    canvasHeight = heightControls.value;
    initSetting();
  }
}
// init
initSetting();
initEvent();

function handleModeClick() {
  if (filling === true) {
      filling = false;
      mode.innerText = "fill";
      ctx.canvas.style.cursor = "default";
  } else {
      filling = true;
      mode.innerText = "paint";
      ctx.canvas.style.cursor = "pointer";
  }
}

var elemX = 250;
var elemY = 250;
var elemSize = 100;
var dragging = false;

