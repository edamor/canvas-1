let canvas = document.querySelector("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;




let c = canvas.getContext("2d");

// for(let a=0;a<20;a++){
// 	let x=Math.random()*canvas.width;
// 	let y=Math.random()*canvas.height;
// 	c.fillStyle = "rgba(0,255,0, 0.2)";
// 	c.fillRect(x,y, 100,100);
// }

// c.fillStyle = "rgba(0,0,255, 0.2)";
// c.fillRect(400,200, 100,100);


// //line
// c.beginPath();
// c.moveTo(50,200);
// c.lineTo(400,50);
// c.lineTo(420,300);
// c.strokeStyle = "red";
// c.stroke();


// //arc or circle
// c.beginPath();
// c.arc(300,300,30, 0, Math.PI*2, false);
// c.strokeStyle= "orangered";
// c.stroke();



// for(let i=0;i<20;i++){
// 	let x=Math.random()*canvas.width;
// 	let y=Math.random()*canvas.height;
	

// 	let q=255-(Math.random()*(255-100));
// 	let w=255-(Math.random()*(70-10));
// 	let e=255-(Math.random()*(200-100));

// 	c.strokeStyle=`rgb(${q},${w},${e})`;
// 	c.stroke();
// 	c.beginPath();
// 	c.arc(x,y,30, 0, Math.PI*2, false);
	
// 	// c.strokeStyle= `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(255 - 42.5 * i)},0)`;

	
// 	console.log(c.strokeStyle);
// 	console.log(q);
// }

let mouse = {
	x:undefined,
	y:undefined
}

window.addEventListener("mousemove", 
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
})




function Bilog(x,y,dx,dy,radius,q,w,e){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.q = q;
	this.w = w;
	this.e = e;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius, 0, Math.PI*2, false);
		c.strokeStyle = `rgb(${q},${w},${e})`;
		c.fillStyle = `rgb(${q},${w},${e})`;
		c.stroke();
		c.fill();
	}

	this.update = function(){
		if(this.x+this.radius>canvas.width || this.x-this.radius<0){
			this.dx=-this.dx;
		} else if (this.y+this.radius>canvas.height || this.y-this.radius<0){
			this.dy=-this.dy;
		}
		
		this.x+=this.dx;
		this.y+=this.dy;

		//interactivity
		if (mouse.x - this.x<50 && mouse.x - this.x>-50 && mouse.y - this.y<50 && mouse.y - this.y>-50){
			if(this.radius<70){
			this.radius+=1.2;
			}
		} else if (this.radius > 20){
			this.radius-=1;
		}


		this.draw();
	}
}


let circleArray = [];

for(let i = 0; i < 200; i++){
	var radius = 20;
	var x=Math.random()*(canvas.width-radius*2)+radius;
	var y=Math.random()*(canvas.height-radius*2)+radius;
	var dx = (Math.random() - 0.5) * 1.5;
	var dy = (Math.random() - 0.5) * 1.5;

	let q = Math.floor(220 - (Math.random() * 135));
	let w = Math.floor(255 - (Math.random() * 180));
	let e = Math.floor(110 - (Math.random() * 55));

	circleArray.push(new Bilog(x,y,dx,dy,radius,q,w,e));	
}

console.log(circleArray);
	


function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0, canvas.scrollWidth,canvas.scrollHeight);

	for(let q=0;q<circleArray.length;q++){
		circleArray[q].update()
	}

	
}

animate();



console.log(canvas);
