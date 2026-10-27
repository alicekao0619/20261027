//宣告全域變數
let walkSpriteSheet; // 用來存放精靈圖 (Sprite Sheet) 的圖片物件
let currentFrame = 0; // 目前播放的影格索引 (0 到 7)
let frameTimer = 0;   // 用來控制動畫播放速度的計時器
let frameInterval = 8; // 影格切換間隔（數字越小動畫越快）

let charX, charY;     // 角色的 X 與 Y 座標
let charSpeed = 3;    // 角色的移動速度
let isMoving = false; // 判斷角色目前是否正在移動
let facingRight = true; // 判斷角色的面向，true 為朝右，false 為朝左

// 單張精靈圖的寬度與高度（整張圖寬 307，共 8 張，307 / 8 ≈ 38.375，取整數 38）
let spriteWidth = 38; 
let spriteHeight = 46;

// 預載入圖片資源
function preload() {
  // 載入位於「角色1/走路/all walk.png」的路徑圖片
  walkSpriteSheet = loadImage('角色1/走路/all walk.png');
}

function setup() {
  // 建立一個佔滿整個視窗的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 初始化角色位置在畫面正中央
  charX = width / 2;
  charY = height / 2;
  
  // 設定圖片繪製的基準點為中心點 (CENTER)，方便做水平翻轉
  imageMode(CENTER);
}

function draw() {
  // 設定畫布背景顏色為 #445e93
  background(0x44, 0x5e, 0x93);
  
  // 檢查鍵盤輸入以更新位置與移動狀態
  checkMovement();
  
  // 繪製與更新角色動畫
  drawCharacter();
}

// 檢查鍵盤按鍵來控制移動與方向
function checkMovement() {
  isMoving = false; // 預設每一影格開始時為靜止狀態
  
  // 當按下鍵盤右鍵 (RIGHT_ARROW)
  if (keyIsDown(RIGHT_ARROW)) {
    charX += charSpeed; // 角色 X 座標向右增加
    facingRight = true; // 設定面向右邊
    isMoving = true;    // 標記為移動中
  }
  
  // 當按下鍵盤左鍵 (LEFT_ARROW)
  else if (keyIsDown(LEFT_ARROW)) {
    charX -= charSpeed; // 角色 X 座標向左減少
    facingRight = false; // 設定面向左邊
    isMoving = true;    // 標記為移動中
  }
}

// 繪製角色與處理圖片精靈動畫
function drawCharacter() {
  push(); // 儲存目前的繪圖狀態
  
  // 將座標原點移動到角色的目前位置
  translate(charX, charY);
  
  // 如果面向左方，利用 scale(-1, 1) 將畫面左右水平翻轉
  if (!facingRight) {
    scale(-1, 1);
  }
  
  // 如果角色正在移動，讓動畫影格隨時間推進
  if (isMoving) {
    frameTimer++;
    if (frameTimer >= frameInterval) {
      currentFrame = (currentFrame + 1) % 8; // 循環播放 0 到 7 張圖
      frameTimer = 0; // 重置計時器
    }
  } else {
    // 如果沒有移動，停在第一張靜止畫面
    currentFrame = 0;
  }
  
  // 計算目前影格在整張精靈圖中的 X 裁切位置
  let sx = currentFrame * spriteWidth;
  
  // 從精靈圖中裁切出對應的單張圖片並畫在畫布上
  // image(img, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight)
  image(
    walkSpriteSheet, 
    0, 0, spriteWidth * 2, spriteHeight * 2, // 放大兩倍顯示，可依需求調整
    sx, 0, spriteWidth, spriteHeight
  );
  
  pop(); // 恢復原本的繪圖狀態
}

// 當視窗大小改變時，自動調整畫布大小並讓角色保持在中心附近
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}