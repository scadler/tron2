const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var user = {
    x: 10,
    y: 10,
    direction: { x: 0, y: 2, },
    color: "#0000FF",
}
var comp = {
    x: 100,
    y: 100,
    direction: { x: -2, y: 0, },
    color: "#FF0000",
}
function draw(color,x,y,d){
    ctx.fillStyle = color
    var height = (d.x === 0) ? 2 : 0
    var width = (d.y === 0) ? 2 : 0
    ctx.fillRect(x, y, d.x+height, d.y+width);
}
function collision(){
//    
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
    move()
}
game()
setInterval(game, 50)
