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
var pixel = ctx.getImageData(comp.x+comp.direction.x, comp.y+comp.direction.y, -10, 1).data; 
// ctx.fillStyle = "#ffffff"
//     ctx.rect(comp.x+comp.direction.x,comp.y+comp.direction.y,(9*comp.direction.x/3),1)
//     ctx.stroke()
    var hex = (rgbToHex(pixel[3]))
    console.log(pixel.includes(1))

    // console.log(hex+" "+2)
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