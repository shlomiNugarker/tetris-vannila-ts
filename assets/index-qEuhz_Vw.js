var w=Object.defineProperty;var y=(a,t,e)=>t in a?w(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var i=(a,t,e)=>(y(a,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const p={straight:[["straight"],["straight"],["straight"],["straight"]],square:[["square","square"],["square","square"]],tTetromino:[["tTetromino","tTetromino","tTetromino"],["","tTetromino",""]],lTetromino:[["lTetromino",""],["lTetromino",""],["lTetromino","lTetromino"]],skew:[["","skew","skew"],["skew","skew",""]]},m=["straight","square","tTetromino","lTetromino","skew"];class g{constructor(t){i(this,"x");i(this,"y");i(this,"game");i(this,"moveDownInterval",1e3);i(this,"lastMoveDownTime",0);i(this,"isMoveEnd",!1);i(this,"keyState",{});i(this,"type",m[Math.floor(Math.random()*m.length)]);i(this,"shape",p[this.type]);this.game=t,this.x=9,this.y=0,window.addEventListener("keydown",e=>{this.keyState[e.key]=!0}),window.addEventListener("keyup",e=>{this.keyState[e.key]=!1})}update(t,e){e-this.lastMoveDownTime>this.moveDownInterval&&(this.lastMoveDownTime=e,this.moveDown()),this.keyState.ArrowRight?(this.moveRight(),delete this.keyState.ArrowRight):this.keyState.ArrowLeft?(this.moveLeft(),delete this.keyState.ArrowLeft):this.keyState.ArrowUp?(this.rotate(),delete this.keyState.ArrowUp):this.keyState.ArrowDown&&(this.moveDown(1),delete this.keyState.ArrowDown)}moveDown(t=1){this.isNextMoveEmpty(this.x,this.y+t)?this.y+=t:this.isMoveEnd=!0}moveRight(t=1){this.isNextMoveEmpty(this.x+t,this.y)&&(this.x+=t)}moveLeft(t=1){this.isNextMoveEmpty(this.x-t,this.y)&&(this.x-=t)}rotate(){const t=[],e=this.shape,s=e.length,o=e[0].length;for(let h=0;h<o;h++){t[h]=[];for(let c=0;c<s;c++)t[h][c]=e[s-c-1][h]}const r=this.game.board[0].length-t[0].length,n=this.game.board.length-t.length;this.x>r||this.y>n||(this.shape=t)}isNextMoveEmpty(t,e){const s=this.shape,o=s.length,r=s[0].length;if(t<0||t+r>this.game.board[0].length||e+o>this.game.board.length)return!1;for(let n=0;n<o;n++)for(let h=0;h<r;h++)if(s[n][h]&&this.game.board[e+n][t+h])return!1;return!0}addTetrominoToMatrix(){for(let t=0;t<this.shape.length;t++)for(let e=0;e<this.shape[t].length;e++){const s=this.x+e,o=this.y+t;s>=0&&s<this.game.board[0].length&&o>=0&&o<this.game.board.length&&this.shape[t][e]!==""&&(this.game.board[o][s]=this.type)}}draw(t){const{x:e,y:s}=this;for(let o=0;o<this.shape.length;o++)for(let r=0;r<this.shape[o].length;r++){const n=this.shape[o][r];if(n){const h=this.game.getBlockColor(n);this.game.drawBlock(e+r,s+o,h)}}}}class T{constructor(t){i(this,"isGameOver",!1);i(this,"board",[]);i(this,"currentTetromino",null);i(this,"canvas");i(this,"ctx");this.canvas=t,this.canvas.width=500,this.canvas.height=500,this.ctx=t.getContext("2d"),this.initBoard(),this.addTetromino()}initBoard(){for(let t=0;t<20;t++){this.board[t]=[];for(let e=0;e<20;e++)this.board[t][e]=""}}addTetromino(){this.currentTetromino=new g(this)}update(t,e){var s,o;(s=this.currentTetromino)==null||s.update(t,e),(o=this.currentTetromino)!=null&&o.isMoveEnd&&(this.currentTetromino.addTetrominoToMatrix(),this.currentTetromino=null,this.currentTetromino=new g(this))}draw(){var t;this.drawBoard(),(t=this.currentTetromino)==null||t.draw(this.ctx)}drawBlock(t,e,s){const o=this.canvas.width/20,r=this.canvas.height/20;this.ctx.fillStyle=s,this.ctx.fillRect(t*o,e*r,o,r),this.ctx.strokeStyle="white",this.ctx.strokeRect(t*o,e*r,o,r)}drawBoard(){for(let t=0;t<this.board.length;t++)for(let e=0;e<this.board[0].length;e++)if(this.board[t][e]){const s=this.getBlockColor(this.board[t][e]);this.drawBlock(e,t,s)}else this.drawBlock(e,t,"lightgray")}getBlockColor(t){return{straight:"blue",square:"red",tTetromino:"green",lTetromino:"black",skew:"orange"}[t]||"lightgray"}getRandomColor(){const t=Math.floor(Math.random()*256),e=Math.floor(Math.random()*256),s=Math.floor(Math.random()*256);return"rgb("+t+", "+e+", "+s+")"}}const d=document.getElementById("canvas");d.width=500;d.height=500;const l=new T(d);let f=0;function u(a){const t=a-f;f=a,l.update(t,a),l.ctx.clearRect(0,0,l.canvas.width,l.canvas.height),l.draw(),l.isGameOver||requestAnimationFrame(u)}u(0);
