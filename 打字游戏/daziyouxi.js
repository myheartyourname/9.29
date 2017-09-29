/*
* @Author: lenovo
* @Date:   2017-09-28 15:14:14
* @Last Modified by:   lenovo
* @Last Modified time: 2017-09-29 15:10:24
*/

	// let char=document.querySelector('.char');
	
function Game(){
	this.charArr=[
	['Q','A_Z/Q.png'],
	['W','A_Z/W.png'],
	['E','A_Z/E.png'],
	['R','A_Z/R.png'],
	['T','A_Z/T.png'],
	['Y','A_Z/Y.png'],
	['U','A_Z/U.png'],
	['I','A_Z/I.png'],
	['O','A_Z/O.png'],
	['P','A_Z/P.png'],
	['A','A_Z/A.png'],
	['S','A_Z/S.png'],
	['D','A_Z/D.png'],
	['F','A_Z/F.png'],
	['G','A_Z/G.png'],
	['H','A_Z/H.png'],
	['J','A_Z/J.png'],
	['K','A_Z/K.png'],
	['L','A_Z/L.png'],
	['Z','A_Z/Z.png'],
	['X','A_Z/X.png'],
	['C','A_Z/C.png'],
	['V','A_Z/V.png'],
	['B','A_Z/B.png'],
	['N','A_Z/N.png'],
	['M','A_Z/M.png']];
	this.current=[];  //放页面中的元素
	this.number=5; //个数
	this.speed=10;
	this.position=[];
	this.gk=10;
	this.score=0;
	this.life=10;
	this.lifeObj=document.querySelector('.life>span');
	this.scoreObj=document.querySelector('.score>span');
}
Game.prototype={
		start:function(){
			this.getchars();
			this.drop();
			this.key();
		},
		getchars:function(){
			for (let i=0;i<this.number;i++){
				this.getchar();
			}
		},
		getchar:function(){
			let num=Math.floor(Math.random()*this.charArr.length);
			while (this.checkchar(this.charArr[num][0])){
				num=Math.floor(Math.random()*this.charArr.length);
			}
			let divs=document.createElement('div');
			divs.innerText=this.charArr[num][0];
			divs.classList.add('char');
			let tops=Math.floor(Math.random()*200);
			let lefts=Math.floor((innerWidth-400)*Math.random()+200);
			while (this.checkPosition(lefts)){
				lefts=Math.floor((innerWidth-400)*Math.random()+200);
			}
			divs.style.cssText=`top:${tops}px;
			left:${lefts}px;
			background-image:url(${this.charArr[num][1]});
			font-size:0;`
			document.body.appendChild(divs);
			this.current.push(divs);
			this.position.push(lefts);
		},
		drop:function(){
            let that=this;
            this.t=setInterval(function(){
            	for (let i=0;i<that.current.length;i++){
            		let tops=that.current[i].offsetTop+that.speed;
            		that.current[i].style.top=`${tops}px`;
            		if (tops>=500){
            			document.body.removeChild(that.current[i]);
            			that.current.splice(i,1);
            			that.position.splice(i,1);
            			that.lifeObj.innerText=--that.life;
            			that.getchar();
            			if (that.life==0){
            			let flag=confirm('是否退出');
            			if (flag){
            				close();
            			}else{
            				that.restart();
            			}

            			}
            		}
            	}
            },300)
		},
		key:function(){
			let that=this;
			document.onkeydown=function(e){
				for (let i=0;i<that.current.length;i++){
					if (that.current[i].innerText==String.fromCharCode(e.keyCode)){
						that.score+=2;
						that.scoreObj.innerText=that.score;
						document.body.removeChild(that.current[i]);
            			that.current.splice(i,1);
            			that.position.splice(i,1);
            			that.getchar();
						if (that.score==that.gk){
							that.next();
						}
					}
				}
			}
		},
		checkPosition:function(lefts){
			let flag=this.position.some(function(value){
				return Math.abs(value-lefts)<60;
			})
			return flag;
		},
		checkchar:function(char){
			return this.current.some(element=>{
				return element.innerText==char;
			})
		},
        next:function(){
            clearInterval(this.t);
            for (let i=0;i<this.current.length;i++){
            	document.body.removeChild(this.current[i]);
            }
            this.current.length=0;
            	this.position.length=0;
            	this.number++;
                this.gk+=10;
                this.start();
        },
        restart:function(){
        	clearInterval(this.t);
            for (let i=0;i<this.current.length;i++){
            	document.body.removeChild(this.current[i]);
            }
            this.current.length=0;
            this.position.length=0;
            this.number=5;
            this.gk=10;
            this.life=10;
            this.score=0;
            this.lifeobj.innerText=this.life;
            this.scoreobj.innerText=this.score;
            this.start();
        }
	}	
	