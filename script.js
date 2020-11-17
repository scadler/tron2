const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var user = {
    x: 100,
    y: 100,
    direction: { x: 3, y: 0, },
    color: "#0100FF",
}
var comp = {
    x: 600,
    y: 600,
    direction: { x: -3, y: 0, },
    color: "#FF0001",
}
    ctx.fillStyle = "#000020"
    ctx.rect(0,0,700,700)
    ctx.fill()
    ctx.strokeStyle = "#015500"
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round'
    ctx.beginPath();
    ctx.moveTo(1, 1);
    ctx.lineTo(1, 699);
    ctx.lineTo(699, 699);
    ctx.lineTo(699, 1);
    ctx.lineTo(1, 1);
    ctx.stroke()
    ctx.fillStyle = "#FF0001"
    ctx.rect(300,300,555,500)
    ctx.fill()
function draw(color,x,y,d){
    ctx.strokeStyle = color
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round'
    ctx.beginPath();
    ctx.moveTo(x-(d.x/3), y-(d.y/3));
    ctx.lineTo(x+d.x, y+d.y);
    ctx.stroke()
    
}
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
function collision(x,y){
    var pixel = ctx.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);
    if(hex !== "#000020"){
    }
}
function compAI(){
    //trying to find way to get average color of all pixels in strip, using that to calc the probablitliyy that the comp will turn
    let w = (comp.direction.x === 0) ? 1 : 100*comp.direction.x/3
    let h = (comp.direction.y === 0) ? 1 : 100*comp.direction.y/3
  
pixel = ctx.getImageData(comp.x+comp.direction.x, comp.y+comp.direction.y, w, h).data; 

    if(pixel.includes(1) === true){
          console.log(pixel.slice(0,11))
        if(pixel.slice(0,11).includes(1) === true){
                newCompDirection(20)
                console.log("emergency")
                // console.log(pixel.slice(0,11).includes(1))
            }
        
        else{ 
            var i = 0
            while(pixel.slice(i*20,(i*20)+19).includes(1) === false && i < 100){
            // console.log("weurchpw9uchrp")
            i++
            // console.log(pixel)
            // console.log(pixel.slice(0,11))
            
            if(pixel.slice(i*20,(i*20)+19).includes(1) === true){
                // console.log(pixel.slice(i*20,(i*20)+19).includes(1)+" "+i)
                // console.log(Math.pow(i/20, 2))
                if(Math.random()-(Math.pow(i/20, 3)/1) < 0){
                    // console.log("turn"+" "+Math.pow(i/20, 3)+" "+i)
                    newCompDirection(2)
                }
            }
        }
            // console.log(i/100)
        }
    }

    // console.log(hex+" "+2)
}
function newCompDirection(n){
    var i = 0
    while(i < n){
    i++
    posX = (Math.random()-0.5 > 0) ? 0 : (Math.random()-0.5 < 0) ? -3 : 3
    posY = (posX !== 0) ? 0 : (Math.random()-0.5 < 0) ? -3 : 3
    let posW = (posX === 0) ? 1 : posX/3
    let posH = (posY === 0) ? 1 : posY/3
    if(ctx.getImageData(comp.x+posX, comp.y+posY, posW, posH).data.includes(1)===false){
        if(comp.direction.x !== posX || comp.direction.y !==posY){
            comp.direction.x = posX
            comp.direction.y = posY
            newDirection = true
            // console.log("success")
            i = n
        }
        else{
            if(i > 10){
            console.log("failed")
            comp.direction.x = 0
            comp.direction.y = 0
            }
        }
    }
    }
}
function move(){
    user.x += user.direction.x
    user.y += user.direction.y
    comp.x += comp.direction.x
    comp.y += comp.direction.y
}
function game(){
    draw(comp.color,comp.x,comp.y,comp.direction)
    draw(user.color,user.x,user.y,user.direction)
    collision(user.x+user.direction.x,user.y+user.direction.y)
    move()
    compAI()
}
game()
setInterval(game, 50)

document.addEventListener('keydown', keyPressed)
function keyPressed(e) {
	key = e.key
	if (key == "a" && user.direction.x !== 3) {
		user.direction.x = -3
        user.direction.y = 0
	} else if (key == "d" && user.direction.x !== -3) {
		user.direction.x = 3
        user.direction.y = 0
	} else if (key == "w" && user.direction.y !== 3) {
        user.direction.x = 0
        user.direction.y = -3
	} else if (key == "s" && user.direction.y !== -3) {
        user.direction.x = 0
        user.direction.y = 3
		}if (key == " ") {
		e.preventDefault();
	}
}