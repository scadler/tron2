const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var board = {
    width:700,
    height:700,
    color: "#000010",
}
var user = {
    x: 100,
    y: 100,
    direction: { x: 3, y: 0, },
    color: "#0000FF",
    key: "d"
}
var comp = {
    x: 600,
    y: 600,
    direction: { x: -3, y: 0, },
    color: "#FF0000",
}
function draw(color,x,y,d){
    ctx.strokeStyle = color
    // var height = (d.x === 0) ? 2 : 0
    // var width = (d.y === 0) ? 2 : 0
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round'
    ctx.beginPath();
    ctx.moveTo(x-d.x, y-d.y);
    ctx.lineTo(x+d.x, y+d.y);
    ctx.stroke()
    // ctx.fillRect(x, y, d.x+height, d.y+width);
}
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
function collision(x,y){
    var pixel = ctx.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);
    if(hex !== board.color){
        // console.log("collision")
    }
}
function move(){
    // user.direction.x += 0.4
    // user.direction.y -= 0.4
    user.x += user.direction.x
    user.y += user.direction.y
    comp.x += comp.direction.x
    comp.y += comp.direction.y
}
// ctx.fillStyle = board.color;
//     ctx.fillRect(0, 0, board.width, board.height);
function game(){
    draw(comp.color,comp.x,comp.y,comp.direction)
    draw(user.color,user.x,user.y,user.direction)
    collision(user.x+user.direction.x,user.y+user.direction.y)
    move()
    changeDirection(user.key)
    console.log(user.direction.x+" "+user.direction.y)
}
game()
setInterval(game, 50)

document.addEventListener('keydown', keyPressed)
document.addEventListener('keyup', keyUp)
function keyUp(){
    user.key=" "
}
function keyPressed(e) {
	key = e.key
	if (key == "a") {
		// if (user.direction.x - 0.2 >= -3) {
        //     user.direction.x -= 1
        //     let i = (user.direction.y >= 0) ? 1 : -1
        //     user.direction.y = i * Math.sqrt( 9 - ( user.direction.x * user.direction.x ) )
        // }
        user.key = "a"
	} else if (key == "d") {
		// if (user.direction.x + 1 <= 3) {
        //     user.direction.x += 1
        //     let i = (user.direction.y > 0) ? 1 : -1
        //     user.direction.y = i * Math.sqrt( 9 - ( user.direction.x * user.direction.x ) )
        // }
        user.key = "d"
	} else if (key == "w") {
        // if (user.direction.y - 1 >= -3) {
        //     user.direction.y -= 1
        //     let i = (user.direction.x > 0) ? 1 : -1
        //     user.direction.x = i * Math.sqrt( 9 - ( user.direction.y * user.direction.y ) )
        // }
        user.key = "w"
	} else if (key == "s") {
		// if (user.direction.y + 1 <= 3) {
        //     user.direction.y += 1
        //     let i = (user.direction.x > 0) ? 1 : -1
        //     user.direction.x = i * Math.sqrt( 9 - ( user.direction.y * user.direction.y ) )
        // }
        user.key = "s"
		}if (key == " ") {
		e.preventDefault();
		// resetGrid()
		// resetGame()
	}
}
function changeDirection(key){
    
    if(key === "d"){
        if (user.direction.x !== 3) {
            user.direction.x = (user.direction.x + 0.3 < 3) ? user.direction.x + 0.3 : 3
            user.direction.x += 0.3
            let i = (user.direction.y > 0) ? 1 : -1
            user.direction.y = i * Math.sqrt( 9 - ( user.direction.x * user.direction.x ) )
            user.direction.x = Math.round(user.direction.x*100)/100
            user.direction.y = Math.round(user.direction.y*100)/100
		}
    }
    else if(key === "s"){
        if (user.direction.y !== 3) {
            user.direction.y = (user.direction.y + 0.3 < 3) ? user.direction.y + 0.3 : 3
            let i = (user.direction.x > 0) ? 1 : -1
            user.direction.x = i * Math.sqrt( 9 - ( user.direction.y * user.direction.y ) )
            user.direction.x = Math.round(user.direction.x*100)/100
            user.direction.y = Math.round(user.direction.y*100)/100
        }
    }
    else if(key === "a"){
        if (user.direction.x !== -3) {
            user.direction.x = (user.direction.x - 0.3 > -3) ? user.direction.x - 0.3 : -3
            let i = (user.direction.y >= 0) ? 1 : -1
            user.direction.y = i * Math.sqrt( 9 - ( user.direction.x * user.direction.x ) )
            user.direction.x = Math.round(user.direction.x*100)/100
            user.direction.y = Math.round(user.direction.y*100)/100
        }
    }
    else if(key === "w"){
        if (user.direction.y !== -3) {
            user.direction.y = (user.direction.y - 0.3 > -3) ? user.direction.y - 0.3 : -3
            let i = (user.direction.x > 0) ? 1 : -1
            user.direction.x = i * Math.sqrt( 9 - ( user.direction.y * user.direction.y ) )
            user.direction.x = Math.round(user.direction.x*100)/100
            user.direction.y = Math.round(user.direction.y*100)/100
		}
    }
}
