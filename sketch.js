var sound1;
function preload() {
  sound1 = loadSound("米奇妙妙屋 主題曲 - 妙妙舞.mp3");  //先把音樂檔載入到sound1程式碼中
}


var pos_x=[]
var pos_y=[]
var sizes=[]
var colors=[]
var v_y=[]
var v_x=[]
var face_move_var = false  //臉物件移動條件，如果為true，臉物件移動，如果false就不會移動
var amplitude
function setup() {
  createCanvas(windowWidth, windowHeight); 
  analyzer = new p5.Amplitude();
  analyzer.setInput(sound1);
  //文字框的設定
  inputElement = createInput("【412737065 車宜蓁】")  //產生一個文字方塊，""內的文字為預設顯示得文字
  inputElement.position(350,10)  //把文字方塊放到(350,10)
  inputElement.size(300,50)  //文字方框寬300高50
  inputElement.style("font-size","30px")  //文字大小
  inputElement.style("color","white")  //文字顏色
  inputElement.style("background","none")  //文字方框的背景顏色
  inputElement.style("border","none")  //不要有框線

  //按鈕的設定
  btnMoveElement = createButton("移動")  //產生一個"移動"按鈕
  btnMoveElement.position(875,10)  //把按鈕放到(900,10)
  btnMoveElement.size(100,50)  //按鈕方框寬100高50
  btnMoveElement.style("font-size","30px")  //按鈕方框內文字大小
  btnMoveElement.style("color","#22333b")  //"移動"文字顏色
  btnMoveElement.style("background","white")  //按鈕方框的背景顏色
  btnMoveElement.mousePressed(face_move)
  
  btnStopElement = createButton("暫停")  //產生一個"暫停"按鈕
  btnStopElement.position(1025,10)  //把按鈕放到(1000,10)
  btnStopElement.size(100,50)  //按鈕方框寬100高50
  btnStopElement.style("font-size","30px")  //按鈕方框內文字大小
  btnStopElement.style("color","#22333b")  //"暫停"文字顏色
  btnStopElement.style("background","white")  //按鈕方框的背景顏色
  btnStopElement.mousePressed(face_stop)

}


function draw(){
  background("#22333b");
  
  for(var i=0;i<pos_x.length;i=i+1){
    push()
       translate(pos_x[i],pos_y[i])
       if(sound1.isPlaying()){  ////音樂撥放時
   
        audioContext = getAudioContext();
        amplitude = map(analyzer.getLevel(),0,1,0,100)
    
        
        // 計算物件的旋轉角度
        angle = sin(amplitude * PI);

        // 設定物件的旋轉角度
        rotate(angle)

        drawface(colors[i],0,sizes[i])
       }
       else{  //音樂未撥放時
        // 計算滑鼠與物件的相對位置
        mouseX_rel = mouseX - pos_x[i]
        mouseY_rel = mouseY - pos_y[i]

        // 計算物件的旋轉角度
        angle = atan2(mouseY_rel, mouseX_rel)

        // 設定物件的旋轉角度
        rotate(angle)

        drawface(colors[i],0,sizes[i])
       }
   pop()
   if(face_move_var){
   pos_y[i] = pos_y[i] + v_y[i]
  }

   if(pos_y[i]>height  || pos_y[i]<0)     {
    pos_x.splice(i,1)  //把碰到邊的陣列元素刪掉
    pos_y.splice(i,1)
    sizes.splice(i,1)
    colors.splice(i,1)
    v_y.splice(i,1)
  
  }
}
}

function drawface () {
  scale()
  push()
    fill(0)
    noStroke()
    ellipse(0,0,200)  //畫圓，座標為(0,0)，圓寬為200
    fill(0)
    ellipse(-100,-100,100)  //左耳
    fill(0)
    ellipse(100,-100,100)  //右耳

    //臉
    fill("#ffeedd")
    noStroke()
    ellipse(-30,-25,90,125) //左
    fill("#ffeedd")
    noStroke()
    ellipse(30,-25,90,125) //右
    fill("#ffeedd")
    noStroke()
    ellipse(0,40,255,125) //下

    //五官
    fill(255)
    ellipse(-30,-15,50,80)  //左眼
    fill(255)
    ellipse(30,-15,50,80)  //右眼
    fill(0)
    ellipse(-25,0,35,50)  //左眼珠
    fill(255)
    ellipse(-25,-15,10)
    fill(0)
    ellipse(25,0,35,50)  //右眼珠
    fill(255)
    ellipse(25,-15,10)
    fill(0)
    ellipse(0,30,30,20)  //鼻子
    fill(255)
    ellipse(0,25,10,5)
    stroke(0)
    fill(0)
    arc(0,55,100,75,0,PI)  //嘴巴
    fill("#ffeedd")
    arc(0,40,150,40,0,PI)
    fill("#b23a48")
    noStroke()
    arc(0,75,80,35,0,PI)
    fill("#ffb3c6")
    ellipse(-75,20,20,15)  //左腮紅
    fill("#ffb3c6")
    ellipse(75,20,20,15)  //右腮紅
    pop()


}

function mousePressed(){
  pos_x.push(mouseX)
  pos_y.push(mouseY)
  sizes.push(random(0.3,5))
  v_y.push(random(-1,1))
  

}
function face_move(){
  face_move_var = true
  sound1.play(); // 在這裡播放音樂
  
  }
  
  
 
function face_stop(){
  face_move_var = false
  sound1.stop(); // 在這裡暫停音樂
}