const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");

var b = new boon();
let o = new b.events();

let jame = {
  "7849-a625-60d-954a-b54976":{
    title:"ท่ากบ (Breaststroke)",
    image:"kob",
    text:"1.กดมือพร้อมกับการกวาดมือไปด้านข้าง โดยกดแขนลงนั้นให้กดลงประมาณ 45 ํ\n2.โก่งแขนโดยงอข้อศอกและยกข้อศอกให้สูงเอาไว้พร้อมกับล็อคข้อศอกให้อยู่กับที่คือไม่ลากศอกออกไปด้านหลัง\n3. ตวัดมือทั้งสองข้างให้มาด้านหน้าในลักษณะกระพุ่มมือพร้อมทั้งให้หนีบศอกมาชิดตัวอย่างรวดเร็วพร้อมทั้งยืดแขนออกไปด้านหน้าอย่างเร็วด้วย\n4. ก้มหัว ส่งแรงจากไหล่ตามแขนไปด้วย"
  },
  "6468-39b1-586-854e-6cc455":{
    title:"ท่ากรรเชียง (Backstroke)",
    image:"kuncheang",
    text:"1.ยืดแขนออกไปแล้วแขนต้องชิดหู\n2.กดแขนลงไปในน้ำที่สำคัญปล่อยไหล่ตามสบายถ้าเกร็งไหล่ให้อยู่กับที่เอาไว้จะกดแขนลงน้ำไม่ได้\n3.งอข้อศอกและตั้งมือพร้อมทั้งดันน้ำผ่านไปทางต้นขาอย่างรวดเร็ว\n4.จังหวะสุดท้ายของการดันน้ำให้กดมือลงอย่างแรงจนแขนของคุณตึง\n5.เมื่อยกแขนขึ้นมาจากน้ำต้องไม่งอข้อศอกและวางแขนไปด้านหลังโดยไม่ฟาดน้ำโดยการวางแขนนั้นให้หันฝ่ามือเอานิ้วก้อยลงก่อน"
  },
  "6748-a4b6-341-a414-ce9892":{
    title:"ฟรีสไตล์ (Freestyle)",
    image:"free",
    text:"1.ยืดแขนไปด้านหน้าจนสุดแล้วแขนต้องชิดกับหู\n2.ต่อจากนั้นกดมือลงพร้อมกับโก่งแขนโดยการยกข้อศอกแรงที่จะส่งตัวนั้นจะออกมาจากไหล่\n3.ดันแขนท่อนล่างให้ผ่านไปใต้ลำตัวนิ้วทุกนิ้วเรียงชิดติดกัน\n4.ดันน้ำจนกระทั่งแขนตึงพอดี\n5.ยกแขนขึ้นโดยงอข้อศอกแล้ววาดแขนมาด้านหน้าวางมือลงน้ำแล้วยืดแขนออกไป"
  },
  "b368-32c7-930-888d-608dc1":{
    title:"ท่าผีเสื้อ (Butterfly)",
    image:"peesaut",
    text:"1.เมื่อแขนอยู่ข้างหน้าให้กดมือลงพร้อมกับกวาดออกไปด้านข้างเล็กน้อย\n2.งอข้อศอกพร้อมทั้งดันมือผ่านใต้ลำตัว\n3.ดันน้ำจนแขนผ่านบริเวณต้นขา\n4.ยกแขนขึ้นให้ศอกและมือพ้นจากน้ำ\n5.วางแขนกลับไปด้านหน้าโดยให้แขนมีความกว้างเท่าช่วงไหล่"
  }
}






let scanning = false;
let running = "start"
let eeeee = null;
let card = document.getElementById("card")


let render = function(uuid){
  let title = document.getElementById("title")
  let image = document.getElementById("image")
  let text  = document.getElementById("text")
  if(jame[uuid]!=null){
    console.log(uuid)
    card.hidden = false;
    title.innerHTML = jame[uuid]["title"]
    image.src = "./image/" + jame[uuid]["image"] + ".gif"
    text.innerHTML = jame[uuid]["text"]
  }else{
    card.hidden = true;
  }
}


qrcode.callback = res => {
  if (res) {
    scanning = false;
    render(res)
  }
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  try {eeeee.innerHTML = (!scanning) ? "start" : "stop"} catch (error) {}
  requestAnimationFrame(tick);
}

function scan() {
  try {
    if(scanning) qrcode.decode();
  } catch (e) {}
  setTimeout(scan,100)
}

navigator.mediaDevices
.getUserMedia({ video: { facingMode: "environment" } })
.then(function(stream) {
  video.setAttribute("playsinline", true);
  video.srcObject = stream;
  video.play();
  setTimeout(tick, 300);
  scan()
});
o.add(
  b.create.event("ojo","click",function(e,s){
    scanning = !scanning;
    eeeee = s
    eeeee.innerHTML = (!scanning) ? "start" : "stop"
  }),
  b.create.event("close","click",function(){
    card.hidden = true;
  })
)
o.run()


/*function uuidv4() {
  return 'xxxy-xxxx-xxx-yxxx-xxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

for (let i = 0; i < 4 ; i++) {
  console.log(uuidv4())
}*/


/*
7849-a625-60d-954a-b54976
6468-39b1-586-854e-6cc455
6748-a4b6-341-a414-ce9892
b368-32c7-930-888d-608dc1
*/