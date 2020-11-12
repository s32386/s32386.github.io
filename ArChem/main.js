const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");

var b = new boon();
let o = new b.events();

let jame = {
  "443a-ebdb-b3f-8702-56288d":{
    title:"AB2",
    image:"2"
  },
  "671b-0e6a-ec9-af9a-874090":{
    title:"AB3",
    image:"3"
  },
  "97f8-ebcd-778-9089-57a773":{
    title:"AB2E2",
    image:"4"
  },
  "7bd8-b702-3ff-abc2-ec8e3b":{
    title:"AB4",
    image:"5"
  },
  "b13b-c62f-7fb-bf10-38f5fa":{
    title:"AB3E",
    image:"6"
  },
  "b828-aea0-416-a952-08762f":{
    title:"AB5",
    image:"7"
  },
  "4c4a-3144-957-aebf-119562":{
    title:"AB6",
    image:"8"
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
    image.src = "./image/l0_i" + jame[uuid]["image"] + ".png"
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
async function startCapture(displayMediaOptions) {
  let captureStream = null;

  try {
    captureStream = await navigator.mediaDevices.getUserMedia(displayMediaOptions);
  } catch(err) {
    console.error("Error: " + err);
    setTimeout(()=>{
      startCapture(displayMediaOptions)
    },300)
  }
  return captureStream;
}

try {
   startCapture({ video: { facingMode: "environment" },audio:false }).then(function(stream) {
    video.setAttribute("playsinline", true);
    video.srcObject = stream;
    video.play();
    setTimeout(tick, 300);
    scan()
  });
} catch (error) {
  console.log(error)
}


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


/*
443a-ebdb-b3f-8702-56288d
671b-0e6a-ec9-af9a-874090
97f8-ebcd-778-9089-57a773

7bd8-b702-3ff-abc2-ec8e3b


b13b-c62f-7fb-bf10-38f5fa
b828-aea0-416-a952-08762f
4c4a-3144-957-aebf-119562



function uuidv4() {
  return 'xxxy-xxxx-xxx-yxxx-xxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

for (let i = 0; i < 7 ; i++) {
  console.log(uuidv4());
}
*/