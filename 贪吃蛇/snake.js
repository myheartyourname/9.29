/*
* @Author: lenovo
* @Date:   2017-09-29 16:19:25
* @Last Modified by:   lenovo
* @Last Modified time: 2017-09-29 19:10:08
*/
function Snake(){
	this.snake=['4_0','5_0','6_0'];
	this.scene=document.querySelector('.scene');
	this.direction=40;
	this.flag={'4_0':true,'5_0':true,'6_0':true};
	this.food='';
}
Snake.prototype={
	start:function(){
		this.drawLine();
		this.drawsnake();
		this.key();
		this.dropfood();
		this.move();
	},
	drawLine:function(){
		for (let i=0;i<20;i++){
			for (let j=0;j<20;j++){
			this.scene.innerHTML+=`<div class='block' id='${i}_${j}'></div>`
			}
		}
	},
	drawsnake:function(){
		this.snake.forEach(element=>{
			document.getElementById(element).classList.add('hot');
		})
	},
	move:function(){
		let that=this;
		this.t=setInterval(function(){
		    let oldt=that.snake[that.snake.length-1];
		    let arr=oldt.split('_');
		    let newt='';
		    if (that.direction==37){
               newt=`${arr[0]*1}_${arr[1]*1-1}`;
		    }else if(that.direction==38){
		       newt=`${arr[0]*1-1}_${arr[1]*1}`;
		    }else if(that.direction==39){
		       newt=`${arr[0]*1}_${arr[1]*1+1}`;
		    }else if(that.direction==40){
		       newt=`${arr[0]*1+1}_${arr[1]*1}`;
		    }
		    if (arr[1]<0||arr[1]>19){
		    	clearInterval(that.t);
		    	alert('gameover');
		    }
		    that.snake.push(newt);
		    that.flag[newt]=true;
		    let weibu=that.snake.shift();
		    delete that.flag[weibu];
		    document.getElementById(weibu).classList.remove('hot');
		    that.drawsnake();
		},1000)
	},
	key:function(){
		document.onkeydown=function(e){
			let keycode=e.keyCode;
			if (Math.abs(keycode-this.direction)==2){
				return;
			}
			this.direction=keycode;
		}.bind(this);
	},
	dropfood:function(){
		let x=Math.floor(Math.random()*20);
		let y=Math.floor(Math.random()*20);
		do{
			x=Math.floor(Math.random()*20);
		    y=Math.floor(Math.random()*20);
		}while(this.flag[`${x}_${y}`]);
		this.food=`${x}_${y}`;
		document.getElementById(this.food).style.background='chocolate';
	}
}