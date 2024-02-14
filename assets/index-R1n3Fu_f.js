var u=Object.defineProperty;var w=(a,t,e)=>t in a?u(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var i=(a,t,e)=>(w(a,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();const y={straight:[["straight"],["straight"],["straight"],["straight"]],square:[["square","square"],["square","square"]],tTetromino:[["tTetromino","tTetromino","tTetromino"],["","tTetromino",""]],lTetromino:[["lTetromino",""],["lTetromino",""],["lTetromino","lTetromino"]],skew:[["","skew","skew"],["skew","skew",""]]},d=["straight","square","tTetromino","lTetromino","skew"];class m{constructor(t){i(this,"x");i(this,"y");i(this,"game");i(this,"moveDownInterval",1e3);i(this,"lastMoveDownTime",0);i(this,"isMoveEnd",!1);i(this,"keyState",{});i(this,"type",d[Math.floor(Math.random()*d.length)]);i(this,"shape",y[this.type]);this.game=t,this.x=14,this.y=0,window.addEventListener("keydown",e=>{this.keyState[e.key]=!0}),window.addEventListener("keyup",e=>{this.keyState[e.key]=!1})}update(t,e){e-this.lastMoveDownTime>this.moveDownInterval&&(this.lastMoveDownTime=e,this.moveDown()),this.keyState.ArrowRight?(this.moveRight(),delete this.keyState.ArrowRight):this.keyState.ArrowLeft?(this.moveLeft(),delete this.keyState.ArrowLeft):this.keyState.ArrowUp?(this.rotate(),delete this.keyState.ArrowUp):this.keyState.ArrowDown&&(this.moveDown(1),delete this.keyState.ArrowDown)}moveDown(t=1){this.isNextMoveEmpty(this.x,this.y+t)?this.y+=t:this.isMoveEnd=!0}moveRight(t=1){this.isNextMoveEmpty(this.x+t,this.y)&&(this.x+=t)}moveLeft(t=1){this.isNextMoveEmpty(this.x-t,this.y)&&(this.x-=t)}rotate(){const t=[],e=this.shape,r=e.length,o=e[0].length;for(let h=0;h<o;h++){t[h]=[];for(let c=0;c<r;c++)t[h][c]=e[r-c-1][h]}const s=this.game.board[0].length-t[0].length,n=this.game.board.length-t.length;this.x>s||this.y>n||this.isNextMoveEmpty(this.x,this.y,t)&&(this.shape=t)}isNextMoveEmpty(t,e,r=this.shape){const o=r.length,s=r[0].length;if(t<0||t+s>this.game.board[0].length||e+o>this.game.board.length)return!1;for(let n=0;n<o;n++)for(let h=0;h<s;h++)if(r[n][h]&&this.game.board[e+n][t+h])return!1;return!0}addTetrominoToMatrix(){for(let t=0;t<this.shape.length;t++)for(let e=0;e<this.shape[t].length;e++){const r=this.x+e,o=this.y+t;r>=0&&r<this.game.board[0].length&&o>=0&&o<this.game.board.length&&this.shape[t][e]!==""&&(this.game.board[o][r]=this.type)}}draw(t){const{x:e,y:r}=this;for(let o=0;o<this.shape.length;o++)for(let s=0;s<this.shape[o].length;s++){const n=this.shape[o][s];if(n){const h=this.game.getBlockColor(n);this.game.drawBlock(e+s,r+o,h)}}}}class p{constructor(t){i(this,"isGameOver",!1);i(this,"board",[]);i(this,"currentTetromino",null);i(this,"canvas");i(this,"ctx");this.canvas=t,this.canvas.width=600,this.canvas.height=600,this.ctx=t.getContext("2d"),this.initBoard(),this.addTetromino()}initBoard(){for(let t=0;t<30;t++){this.board[t]=[];for(let e=0;e<30;e++)this.board[t][e]=""}}addTetromino(){this.currentTetromino=new m(this)}update(t,e){var r,o;(r=this.currentTetromino)==null||r.update(t,e),(o=this.currentTetromino)!=null&&o.isMoveEnd&&(this.currentTetromino.addTetrominoToMatrix(),this.checkAndClearFullRows(),this.currentTetromino=null,this.currentTetromino=new m(this),this.currentTetromino.isNextMoveEmpty(this.currentTetromino.x,this.currentTetromino.y)||(this.isGameOver=!0,alert("game over")))}draw(){var t;this.drawBoard(),(t=this.currentTetromino)==null||t.draw(this.ctx)}checkAndClearFullRows(){for(let t=this.board.length-1;t>=0;t--)this.isRowFull(t)&&(this.clearRow(t),this.moveRowsDown(t),t++)}isRowFull(t){return this.board[t].every(e=>e!=="")}clearRow(t){for(let e=0;e<this.board[t].length;e++)this.board[t][e]=""}moveRowsDown(t){for(let e=t-1;e>=0;e--)for(let r=0;r<this.board[e].length;r++)this.board[e+1][r]=this.board[e][r];this.board[0].fill("")}drawBlock(t,e,r){const o=this.canvas.width/30,s=this.canvas.height/30;this.ctx.fillStyle=r,this.ctx.fillRect(t*o,e*s,o,s),this.ctx.strokeStyle="white",this.ctx.strokeRect(t*o,e*s,o,s)}drawBoard(){for(let t=0;t<this.board.length;t++)for(let e=0;e<this.board[0].length;e++)if(this.board[t][e]){const r=this.getBlockColor(this.board[t][e]);this.drawBlock(e,t,r)}else this.drawBlock(e,t,"lightgray")}getBlockColor(t){return{straight:"blue",square:"red",tTetromino:"green",lTetromino:"black",skew:"orange"}[t]||"lightgray"}getRandomColor(){const t=Math.floor(Math.random()*256),e=Math.floor(Math.random()*256),r=Math.floor(Math.random()*256);return"rgb("+t+", "+e+", "+r+")"}}const v=document.getElementById("canvas"),l=new p(v);let f=0;function g(a){const t=a-f;f=a,l.update(t,a),l.ctx.clearRect(0,0,l.canvas.width,l.canvas.height),l.draw(),l.isGameOver||requestAnimationFrame(g)}g(0);
