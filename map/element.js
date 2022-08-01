//사각형 영역
var rectX = 200;
var rectY = 200;
var rectSize = 100;

function draw(){
    background(255);
    
    if( mouseX > rectX && mouseX < rectX+rectSize && mouseY > rectY && mouseY < rectY+rectSize ){
        fill(255, 0, 0);
    }
    else{
        fill(255);
    }
    
    rect(rectX, rectY, rectSize, rectSize);
}

//요소 위치 옮기기
var elemX = 250;
var elemY = 250;
var elemSize = 100;
var dragging = false;

var elem1 = {
    x:100,
    y:350,
    size:120,
    dragging:false
};

var elem2 = {
    x:150,
    y:150,
    size:120,
    dragging:false
};

var elem3 = {
    x:350,
    y:100,
    size:20,
    dragging:false
};

var img = new Image();


img.src = 'smile.png';

var targetX = 350;
var targetY = 350;
var targetSize = 200;
var targetColor;



function setup(){
    createCanvas(1000, 500);
    rect(100, 100, 200, 200);
    noStroke();

    // 각 요소의 색상을 만들어 변수에 넣는다
    elem1.color = color(255, 100, 50);
    elem2.color = color(76, 224, 179);
    elem3.color = color(78, 89, 140);
    elem4 = loadImage("test.png");
    elem4.color = color(0, 0, 0);
    
}

function draw(){
    background(235);
    
    // 드래그 중에 마우스가 움직인 만큼 요소를 움직여준다
    if(elem1.dragging){
        elem1.x = elem1.x + (mouseX - pmouseX);
        elem1.y = elem1.y + (mouseY - pmouseY);
    }

    if(elem2.dragging){
        elem2.x = elem2.x + (mouseX - pmouseX);
        elem2.y = elem2.y + (mouseY - pmouseY);
    }

    if(elem3.dragging){
        elem3.x = elem3.x + (mouseX - pmouseX);
        elem3.y = elem3.y + (mouseY - pmouseY);
    }

    if(elem4.dragging){
        elem4.x = elem4.x + (mouseX - pmouseX);
        elem4.y = elem4.y + (mouseY - pmouseY);
    }

    // 각 요소 그리기
    fill(elem1.color);
    ellipse(elem1.x, elem1.y, elem1.size, elem1.size);

    fill(elem2.color);
    ellipse(elem2.x, elem2.y, elem2.size, elem2.size);

    fill(elem3.color);
    ellipse(elem3.x, elem3.y, elem3.size, elem3.size);

    image(elem4, 40, 100, elem4.width / 2, elem4.height / 2); 

    // 요소의 영역안에 마우스가 들어왔을때 색상과 커서모양을 바꿔준다
    if(dist(mouseX, mouseY, elemX, elemY) < elemSize/2){
        fill(255, 100, 50);
        cursor(HAND);
    }
    else{
        fill(50);
        cursor(ARROW);
    }
}

// 마우스 버튼을 누른 순간
function mousePressed(){
    // 각 요소의 영역안에 마우스가 있다면 드래그를 시작한다
    if(dist(mouseX, mouseY, elem1.x, elem1.y) < elem1.size/2){
        elem1.dragging = true;
    }

    if(dist(mouseX, mouseY, elem2.x, elem2.y) < elem2.size/2){
        elem2.dragging = true;
    }

    if(dist(mouseX, mouseY, elem3.x, elem3.y) < elem3.size/2){
        elem3.dragging = true;
    }

    if(dist(mouseX, mouseY, elem4.x, elem4.y) < elem4.size/2){
        elem4.dragging = true;
    }
}

 // 마우스 버튼에서 손을 땐 순간
function mouseReleased(){
    // 목표물안에 각 요소가 완전히 들어왔다면 각 요소의 위치를 초기화하고 크기를 0으로 바꿔준다
    // 각 요소의 색상을 목표물에 전달한다
    if(dist(elem1.x, elem1.y, targetX, targetY) < targetSize/2 - elem1.size/2){
        elem1.x = 100;
        elem1.y = 350;
        elem1.size = 0;
        targetColor = elem1.color;
    }
    
    if(dist(elem2.x, elem2.y, targetX, targetY) < targetSize/2 - elem2.size/2){
        elem2.x = 150;
        elem2.y = 150;
        elem2.size = 0;
        targetColor = elem2.color;
    }
    
    if(dist(elem3.x, elem3.y, targetX, targetY) < targetSize/2 - elem3.size/2){
        elem3.x = 350;
        elem3.y = 100;
        elem3.size = 0;
        targetColor = elem3.color;
    }

    if(dist(elem4.x, elem4.y, targetX, targetY) < targetSize/2 - elem4.size/2){
        elem4.x = 350;
        elem4.y = 100;
        elem4.size = 0;
        targetColor;
    }

    

    // 각 요소의 드래그를 마친다
    elem1.dragging = false;
    elem2.dragging = false;
    elem3.dragging = false;
    elem4.dragging = false;
}







//copy feature
document.onbacste = function(pasteEvent) {
    // 첫 번째 항목을 고려합니다(여러 항목에 대해 쉽게 확장할 수 있음)
    var item = pasteEvent.clipboardData.items[0];

    if (item.type.indexOf("image") === 0)
    {
        var blob = item.getAsFile();

        var reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById("container").src = event.target.result;
        };

        reader.readAsDataURL(blob);
    }
}