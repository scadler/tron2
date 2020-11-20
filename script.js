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
    dangerDirec : { 
                    index: 0,
                    x: ["-3", "0", "3", "0"],
                    y: ["0", "-3", "0", "3"],
                },
    wallFound: false,
    dead: false,
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
    if(comp.dead === false){
    //trying to find way to get average color of all pixels in strip, using that to calc the probablitliyy that the comp will turn
    let w = (comp.direction.x === 0) ? 1 : 100*comp.direction.x/3
    let h = (comp.direction.y === 0) ? 1 : 100*comp.direction.y/3
    pixel = ctx.getImageData(comp.x+comp.direction.x, comp.y+comp.direction.y, w, h).data; 
    pixel = (comp.direction.x > -1 && comp.direction.y > -1) ? pixel.reverse() : pixel;
    if(pixel.includes(1) === true){
        comp.wallFound = false
        if(pixel.slice(pixel.length-12,pixel.length-1).includes(1) === true){
                newCompDirection("emergency")
                console.log("emergency")
            }
        else{ 
            var i = 0
            while(comp.wallFound === false && i < 100){
            if(pixel.slice(pixel.length-(i*20)-20,pixel.length-(i*20)-1).includes(1) === true){
                comp.wallFound = true
                console.log(Math.pow((20-i)/20, 3)+" "+i)
                if(Math.random()-(Math.pow((20-i)/20, 3)) < 0){
                    newCompDirection("")
                }
            }
            i++
        }
        }
    }
}
}
function trapped(){
    var direcs = ["0","-3","0","3"]
    var i = 0
    var n = 0
    while(i < 4){
        let w = (parseInt(direcs[i]) === 0) ? 1 : parseInt(direcs[i])/3
        let h = (parseInt(direcs[(i+1)%4]) === 0) ? 1 : parseInt(direcs[(i+1)%4])/3
        if(ctx.getImageData(comp.x + parseInt(direcs[i]), comp.y + parseInt(direcs[(i+1)%4]), w, h).data.includes(1)===true){
            n++
            if(n===4){
                comp.direction.x = 0
                comp.direction.y = 0
                console.log("failure")
                comp.dead = true;
            }
        }
        i++
    }
}
function newCompDirection(status){
    var i = 0
    if(status === "emergency"){
        trapped()
        comp.dangerDirec.index = Math.floor(Math.random()*4)
        while(i < 5){
            comp.dangerDirec.index = (comp.dangerDirec.index + 1) % 4
            index = comp.dangerDirec.index
            posX = parseInt(comp.dangerDirec.x[index])
            posY = parseInt(comp.dangerDirec.y[index])
            let posW = (posX === 0) ? 1 : posX/3
            let posH = (posY === 0) ? 1 : posY/3
            if(ctx.getImageData(comp.x + posX, comp.y + posY, posW, posH).data.includes(1)===false){
                comp.direction.x = posX
                comp.direction.y = posY
            }
            i++
            
        }
    }
    else{
        while(i < 3){
            i++
            posX = (Math.random()-0.5 > 0) ? 0 : (Math.random()-0.5 < 0) ? -3 : 3
            posY = (posX !== 0) ? 0 : (Math.random()-0.5 < 0) ? -3 : 3
            //I think that the increase multiplier for posX and Y will make the comp avoid
            //turning into tight spaces, not sure
            let posW = (posX === 0) ? 1 : posX*4
            let posH = (posY === 0) ? 1 : posY*4
            if(ctx.getImageData(comp.x+posX, comp.y+posY, posW, posH).data.includes(1)===false){
                if(comp.direction.x !== posX || comp.direction.y !==posY){
                    comp.direction.x = posX
                    comp.direction.y = posY
                    i = 3
                }
                }
            }
    }
}
function move(){
    // user.x += user.direction.x
    // user.y += user.direction.y
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
setInterval(game,20)

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