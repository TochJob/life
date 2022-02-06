const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
let grid=[];
let canvasWidth = 300;
let canvasHeight = 300;
let n=canvasWidth/10;
let m=canvasHeight/10;
const btn = document.querySelector('button')

canvas.style.width = `${canvasWidth}px`
canvas.style.height = `${canvasWidth}px`


canvas.addEventListener('click',function(event){
	let clickX = Math.floor(event.offsetX/10);
	let clickY = Math.floor(event.offsetY/10);
	grid[clickY][clickX]=1;
	createElement();
})

function createLife(){

	for (var i=0; i<n; i++){
		grid[i]=[];
		for (var j=0; j<m; j++){
			grid[i][j]=0;
		}
	}
}


createLife();

function createElement(){
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	for (var i=0; i<n; i++){
		for (var j=0; j<m; j++){
			if (grid[i][j]==1){
				ctx.fillRect(j*10, i*10, 10, 10);
			}
		}
	}

}


function startLife(){
  let newGrid = [];
  for (var i=0; i<n; i++){
		newGrid[i]=[];
		for (var j=0; j<m; j++){
			var neighbors = 0;
			if (grid[minValue(i)-1][j]==1) neighbors++;
			if (grid[maxValue(i)+1][j]==1) neighbors++;
			if (grid[i][maxValue(j)+1]==1) neighbors++;
			if (grid[i][minValue(j)-1]==1) neighbors++;
			if (grid[minValue(i)-1][maxValue(j)+1]==1) neighbors++;
			if (grid[maxValue(i)+1][maxValue(j)+1]==1) neighbors++;
			if (grid[maxValue(i)+1][minValue(j)-1]==1) neighbors++;
			if (grid[minValue(i)-1][minValue(j)-1]==1) neighbors++;


			if(grid[i][j] === 0 && (neighbors === 3)){
				newGrid[i][j] = 1
			}else if(grid[i][j] == 1 && (neighbors < 2 || neighbors > 3)){
				newGrid[i][j] = 0;
			}else{
				newGrid[i][j] = grid[i][j];
			}


		}

	}
	grid=newGrid;
	createElement();
	setTimeout(startLife,500)
}


btn.addEventListener('click', startLife)



function minValue(el){
	if(el<=0) return n
	else return el
}

function maxValue(el){
	if(el>=n-1) return -1
	else return el
}

