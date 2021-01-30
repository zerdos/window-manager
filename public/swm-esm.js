var W=Object.create,y=Object.defineProperty,P=Object.getPrototypeOf,G=Object.prototype.hasOwnProperty,I=Object.getOwnPropertyNames,j=Object.getOwnPropertyDescriptor;var k=Object.assign,H=o=>y(o,"__esModule",{value:!0});var Y=(o,t)=>()=>(t||(t={exports:{}},o(t.exports,t)),t.exports);var R=(o,t,i)=>{if(H(o),t&&typeof t=="object"||typeof t=="function")for(let e of I(t))!G.call(o,e)&&e!=="default"&&y(o,e,{get:()=>t[e],enumerable:!(i=j(t,e))||i.enumerable});return o},U=o=>o&&o.__esModule?o:R(y(o!=null?W(P(o)):{},"default",{value:o,enumerable:!0}),o);var z=Y((Q,x)=>{"use strict";var $=Object.prototype.hasOwnProperty,c="~";function g(){}Object.create&&(g.prototype=Object.create(null),new g().__proto__||(c=!1));function F(o,t,i){this.fn=o,this.context=t,this.once=i||!1}function T(o,t,i,e,n){if(typeof i!="function")throw new TypeError("The listener must be a function");var h=new F(i,e||o,n),s=c?c+t:t;return o._events[s]?o._events[s].fn?o._events[s]=[o._events[s],h]:o._events[s].push(h):(o._events[s]=h,o._eventsCount++),o}function v(o,t){--o._eventsCount==0?o._events=new g:delete o._events[t]}function d(){this._events=new g,this._eventsCount=0}d.prototype.eventNames=function(){var t=[],i,e;if(this._eventsCount===0)return t;for(e in i=this._events)$.call(i,e)&&t.push(c?e.slice(1):e);return Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(i)):t};d.prototype.listeners=function(t){var i=c?c+t:t,e=this._events[i];if(!e)return[];if(e.fn)return[e.fn];for(var n=0,h=e.length,s=new Array(h);n<h;n++)s[n]=e[n].fn;return s};d.prototype.listenerCount=function(t){var i=c?c+t:t,e=this._events[i];return e?e.fn?1:e.length:0};d.prototype.emit=function(t,i,e,n,h,s){var p=c?c+t:t;if(!this._events[p])return!1;var l=this._events[p],u=arguments.length,m,r;if(l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),u){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,i),!0;case 3:return l.fn.call(l.context,i,e),!0;case 4:return l.fn.call(l.context,i,e,n),!0;case 5:return l.fn.call(l.context,i,e,n,h),!0;case 6:return l.fn.call(l.context,i,e,n,h,s),!0}for(r=1,m=new Array(u-1);r<u;r++)m[r-1]=arguments[r];l.fn.apply(l.context,m)}else{var N=l.length,w;for(r=0;r<N;r++)switch(l[r].once&&this.removeListener(t,l[r].fn,void 0,!0),u){case 1:l[r].fn.call(l[r].context);break;case 2:l[r].fn.call(l[r].context,i);break;case 3:l[r].fn.call(l[r].context,i,e);break;case 4:l[r].fn.call(l[r].context,i,e,n);break;default:if(!m)for(w=1,m=new Array(u-1);w<u;w++)m[w-1]=arguments[w];l[r].fn.apply(l[r].context,m)}}return!0};d.prototype.on=function(t,i,e){return T(this,t,i,e,!1)};d.prototype.once=function(t,i,e){return T(this,t,i,e,!0)};d.prototype.removeListener=function(t,i,e,n){var h=c?c+t:t;if(!this._events[h])return this;if(!i)return v(this,h),this;var s=this._events[h];if(s.fn)s.fn===i&&(!n||s.once)&&(!e||s.context===e)&&v(this,h);else{for(var p=0,l=[],u=s.length;p<u;p++)(s[p].fn!==i||n&&!s[p].once||e&&s[p].context!==e)&&l.push(s[p]);l.length?this._events[h]=l.length===1?l[0]:l:v(this,h)}return this};d.prototype.removeAllListeners=function(t){var i;return t?(i=c?c+t:t,this._events[i]&&v(this,i)):(this._events=new g,this._eventsCount=0),this};d.prototype.off=d.prototype.removeListener;d.prototype.addListener=d.prototype.on;d.prefixed=c;d.EventEmitter=d;typeof x!="undefined"&&(x.exports=d)});function a(o={}){let t=document.createElement(o.type||"div");return o.parent&&o.parent.appendChild(t),o.styles&&Object.assign(t.style,o.styles),o.className&&(t.className=o.className),o.html&&(t.innerHTML=o.html),t}var C=U(z());var X={threshold:10,clicked:!0,mouse:!0,touch:1,doubleClicked:!1,doubleClickedTime:300,longClicked:!1,longClickedTime:500,capture:!1,clickDown:!1};function b(o,t,i){return new E(o,t,i)}var E=class{constructor(t,i,e){if(typeof t=="string"&&(t=document.querySelector(t),!t)){console.warn(`Unknown element: document.querySelector(${t}) in clicked()`);return}this.element=t,this.callback=i,this.options=Object.assign(Object.assign({},X),e),this.createListeners()}createListeners(){this.events={mousedown:t=>this.mousedown(t),mouseup:t=>this.mouseup(t),mousemove:t=>this.mousemove(t),touchstart:t=>this.touchstart(t),touchmove:t=>this.touchmove(t),touchcancel:()=>this.cancel(),touchend:t=>this.touchend(t)},this.element.addEventListener("mousedown",this.events.mousedown,{capture:this.options.capture}),this.element.addEventListener("mouseup",this.events.mouseup,{capture:this.options.capture}),this.element.addEventListener("mousemove",this.events.mousemove,{capture:this.options.capture}),this.element.addEventListener("touchstart",this.events.touchstart,{passive:!0,capture:this.options.capture}),this.element.addEventListener("touchmove",this.events.touchmove,{passive:!0,capture:this.options.capture}),this.element.addEventListener("touchcancel",this.events.touchcancel,{capture:this.options.capture}),this.element.addEventListener("touchend",this.events.touchend,{capture:this.options.capture})}destroy(){this.element.removeEventListener("mousedown",this.events.mousedown),this.element.removeEventListener("mouseup",this.events.mouseup),this.element.removeEventListener("mousemove",this.events.mousemove),this.element.removeEventListener("touchstart",this.events.touchstart),this.element.removeEventListener("touchmove",this.events.touchmove),this.element.removeEventListener("touchcancel",this.events.touchcancel),this.element.removeEventListener("touchend",this.events.touchend)}touchstart(t){this.options.touch&&(this.down===!0?this.cancel():(this.options.touch===!0||t.touches.length<=this.options.touch)&&this.handleDown(t,t.changedTouches[0].screenX,t.changedTouches[0].screenY))}pastThreshold(t,i){return Math.abs(this.lastX-t)>this.options.threshold||Math.abs(this.lastY-i)>this.options.threshold}touchmove(t){if(this.down)if(t.touches.length!==1)this.cancel();else{let i=t.changedTouches[0].screenX,e=t.changedTouches[0].screenY;this.pastThreshold(i,e)&&this.cancel()}}cancel(){this.down=!1,this.doubleClickedTimeout&&(clearTimeout(this.doubleClickedTimeout),this.doubleClickedTimeout=null),this.longClickedTimeout&&(clearTimeout(this.longClickedTimeout),this.longClickedTimeout=null)}touchend(t){this.down&&(t.preventDefault(),this.handleClicks(t))}handleClicks(t){this.options.doubleClicked?this.doubleClickedTimeout=this.setTimeout(()=>this.doubleClickedCancel(t),this.options.doubleClickedTime):this.options.clicked&&this.callback({event:t,type:"clicked"}),this.longClickedTimeout&&(clearTimeout(this.longClickedTimeout),this.longClickedTimeout=null),this.down=!1}handleDown(t,i,e){this.doubleClickedTimeout?this.pastThreshold(i,e)?(this.options.clicked&&this.callback({event:t,type:"clicked"}),this.cancel()):(this.callback({event:t,type:"double-clicked"}),this.cancel()):(this.lastX=i,this.lastY=e,this.down=!0,this.options.longClicked&&(this.longClickedTimeout=this.setTimeout(()=>this.longClicked(t),this.options.longClickedTime)),this.options.clickDown&&this.callback({event:t,type:"click-down"}))}longClicked(t){this.longClickedTimeout=null,this.down=!1,this.callback({event:t,type:"long-clicked"})}doubleClickedCancel(t){this.doubleClickedTimeout=null,this.options.clicked&&this.callback({event:t,type:"clicked"})}checkMouseButtons(t){if(this.options.mouse===!1)return!1;if(this.options.mouse===!0)return!0;if(t.button===0)return this.options.mouse.indexOf("left")!==-1;if(t.button===1)return this.options.mouse.indexOf("middle")!==-1;if(t.button===2)return this.options.mouse.indexOf("right")!==-1}mousedown(t){this.checkMouseButtons(t)&&(this.down===!0?this.down=!1:this.handleDown(t,t.screenX,t.screenY))}mousemove(t){if(this.down){let i=t.screenX,e=t.screenY;this.pastThreshold(i,e)&&this.cancel()}}mouseup(t){this.down&&(t.preventDefault(),this.handleClicks(t))}setTimeout(t,i){return setTimeout(t,i)}};var f=class extends C.default{constructor(t,i={}){super();this.wm=t,this.options=i,this.id=typeof this.options.id=="undefined"?f.id++:this.options.id,this._createWindow(),this._listeners(),this.active=!1,this.maximized=!1,this._closed=!0,this._restore=null,this._moving=null,this._resizing=null,this._attachedToScreen={vertical:"",horziontal:""}}open(t){this._closed&&(this.win.style.display="block",this._closed=!1,this.emit("open",this),t||this.focus())}focus(){this.active=!0,this.options.titlebar&&(this.winTitlebar.style.backgroundColor=this.options.backgroundTitlebarActive),this.emit("focus",this)}blur(){this.active=!1,this.options.titlebar&&(this.winTitlebar.style.backgroundColor=this.options.backgroundTitlebarInactive),this.emit("blur",this)}close(){this._closed||(this._closed=!0,this.win.style.display="none",this.emit("close",this))}get closed(){return this._closed}get x(){return this.options.x}set x(t){t!==this.options.x&&(this.options.x=t,this.emit("move-x",this),this._buildTransform())}_buildTransform(){this.win.style.transform=`translate(${this.options.x}px,${this.options.y}px)`}get y(){return this.options.y}set y(t){t!==this.options.y&&(this.options.y=t,this._buildTransform(),this.emit("move-y",this))}get width(){return this.options.width||this.win.offsetWidth}set width(t){t!==this.options.width&&(t?(this.win.style.width=`${t}px`,this.options.width=this.win.offsetWidth):(this.win.style.width="auto",this.options.width=""),this.emit("resize-width",this))}get height(){return this.options.height||this.win.offsetHeight}set height(t){t!==this.options.height&&(t?(this.win.style.height=`${t}px`,this.options.height=this.win.offsetHeight):(this.win.style.height="auto",this.options.height=""),this.emit("resize-height",this))}resize(t,i){this.width=t,this.height=i}move(t,i){let e=this.keepInside;if(e){let n=this.bounds;(e===!0||e==="horizontal")&&(t=t+this.width>n.right?n.right-this.width:t,t=t<n.left?n.left:t),(e===!0||e==="vertical")&&(i=i+this.height>n.bottom?n.bottom-this.height:i,i=i<n.top?n.top:i)}t!==this.options.x&&(this.options.x=t,this.emit("move-x",this)),i!==this.options.y&&(this.options.y=i,this.emit("move-y",this)),this._buildTransform()}maximize(){if(this.options.maximizable)if(this.maximized)this.x=this.maximized.x,this.y=this.maximized.y,this.width=this.maximized.width,this.height=this.maximized.height,this.maximized=null,this.emit("restore",this),this.buttons.maximize.innerHTML=this.options.maximizeButton;else{let t=this.x,i=this.y,e=this.win.offsetWidth,n=this.win.offsetHeight;this.maximized={x:t,y:i,width:e,height:n},this.x=0,this.y=0,this.width=this.wm.overlay.offsetWidth,this.height=this.wm.overlay.offsetHeight,this.emit("maximize",this),this.buttons.maximize.innerHTML=this.options.restoreButton}}sendToBack(){this.wm.sendToBack(this)}sendToFront(){this.wm.sendToFront(this)}save(){let t={},i=this.maximized;return i&&(t.maximized={left:i.left,top:i.top,width:i.width,height:i.height}),t.x=this.x,t.y=this.y,typeof this.options.width!="undefined"&&(t.width=this.options.width),typeof this.options.height!="undefined"&&(t.height=this.options.height),t.closed=this._closed,t}load(t){t.maximized?this.maximized||this.maximize(!0):this.maximized&&this.maximize(!0),this.x=t.x,this.y=t.y,typeof t.width!="undefined"?this.width=t.width:this.win.style.width="auto",typeof t.height!="undefined"?this.height=t.height:this.win.style.height="auto",t.closed?this.close(!0):this.closed&&this.open(!0,!0)}get title(){return this._title}set title(t){this.winTitle.innerText=t,this.emit("title-change",this)}get right(){return this.x+this.width}set right(t){this.x=t-this.width}get bottom(){return this.y+this.height}set bottom(t){this.y=t-this.height}center(t){t?this.move(t.x+t.width/2-this.width/2,t.y+t.height/2-this.height/2):this.move(window.innerWidth/2-this.width/2,window.innerHeight/2-this.height/2)}_createWindow(){this.win=a({parent:this.wm?this.wm.win:null,styles:k({display:"none","border-radius":this.options.borderRadius,"user-select":"none",overflow:"hidden",position:"absolute","min-width":this.options.minWidth,"min-height":this.options.minHeight,"box-shadow":this.options.shadow,"background-color":this.options.backgroundWindow,width:isNaN(this.options.width)?this.options.width:this.options.width+"px",height:isNaN(this.options.height)?this.options.height:this.options.height+"px"},this.options.styles),className:this.options.classNames.win}),this.winBox=a({parent:this.win,styles:{display:"flex","flex-direction":"column",width:"100%",height:"100%","min-height":this.options.minHeight},className:this.options.classNames.winBox}),this._createTitlebar(),this.content=a({parent:this.winBox,type:"section",styles:{display:"block",flex:1,"min-height":this.minHeight,"overflow-x":"hidden","overflow-y":"auto"},className:this.options.classNames.content}),this.options.resizable&&this._createResize(),this.overlay=a({parent:this.win,styles:{display:"none",position:"absolute",left:0,top:0,width:"100%",height:"100%"},className:this.options.classNames.overlay}),this.overlay.addEventListener("mousedown",t=>{this._downTitlebar(t),t.stopPropagation()}),this.overlay.addEventListener("touchstart",t=>{this._downTitlebar(t),t.stopPropagation()}),this._buildTransform()}_downTitlebar(t){let i=this._convertMoveEvent(t);this._moving={x:i.pageX-this.x,y:i.pageY-this.y},this.emit("move-start",this),this._moved=!1}_createTitlebar(){if(this.options.titlebar){this.winTitlebar=a({parent:this.winBox,type:"header",styles:{"user-select":"none",display:"flex","flex-direction":"row","align-items":"center","justify-content":"center",height:this.options.titlebarHeight,"min-height":this.options.titlebarHeight,border:0,padding:"0 8px",overflow:"hidden"},className:this.options.classNames.titlebar});let t={"user-select":"none",flex:1,display:"flex","flex-direction":"row","align-items":"center","user-select":"none",cursor:"default",padding:0,margin:0,"font-size":"16px","font-weight":400,color:this.options.foregroundTitle};this.options.titleCenter?t["justify-content"]="center":t["padding-left"]="8px",this.winTitle=a({parent:this.winTitlebar,type:"span",html:this.options.title,styles:t,className:this.options.classNames.winTitle}),this._createButtons(),this.options.movable&&(this.winTitlebar.addEventListener("mousedown",i=>this._downTitlebar(i)),this.winTitlebar.addEventListener("touchstart",i=>this._downTitlebar(i))),this.options.maximizable&&b(this.winTitlebar,()=>this.maximize(),{doubleClicked:!0,clicked:!1})}}_createButtons(){this.winButtonGroup=a({parent:this.winTitlebar,styles:{display:"flex","flex-direction":"row","align-items":"center","padding-left":"10px"},className:this.options.classNames.winButtonGroup});let t={display:"inline-block",border:0,margin:0,"margin-left":"15px",padding:0,width:"12px",height:"12px","background-color":"transparent","background-size":"cover","background-repeat":"no-repeat",opacity:.7,color:this.options.foregroundButton,outline:0};this.buttons={},this.options.maximizable&&(this.buttons.maximize=a({parent:this.winButtonGroup,html:this.options.maximizeButton,type:"button",styles:t,className:this.options.maximize}),b(this.buttons.maximize,()=>this.maximize())),this.options.closable&&(this.buttons.close=a({parent:this.winButtonGroup,html:this.options.closeButton,type:"button",styles:t,className:this.options.close}),b(this.buttons.close,()=>this.close()));for(let i in this.buttons){let e=this.buttons[i];e.addEventListener("mousemove",()=>{e.style.opacity=1}),e.addEventListener("mouseout",()=>{e.style.opacity=.7})}}_createResize(){this.resizeEdge=a({parent:this.winBox,type:"button",html:this.options.backgroundResize,styles:{position:"absolute",bottom:0,right:"4px",border:0,margin:0,padding:0,cursor:"se-resize","user-select":"none",height:"15px",width:"10px",background:"none"},className:this.options.classNames.resizeEdge});let t=i=>{let e=this._convertMoveEvent(i),n=this.width||this.win.offsetWidth,h=this.height||this.win.offsetHeight;this._resizing={width:n-e.pageX,height:h-e.pageY},this.emit("resize-start"),i.preventDefault()};this.resizeEdge.addEventListener("mousedown",t),this.resizeEdge.addEventListener("touchstart",t)}_move(t){let i=this._convertMoveEvent(t);!this._isTouchEvent(t)&&t.which!==1&&(this._moving&&this._stopMove(),this._resizing&&this._stopResize()),this._moving&&(this.move(i.pageX-this._moving.x,i.pageY-this._moving.y),this.emit("move",this),t.preventDefault()),this._resizing&&(this.resize(i.pageX+this._resizing.width,i.pageY+this._resizing.height),this.maximized=null,this.emit("resize",this),t.preventDefault())}_up(){this._moving&&this._stopMove(),this._resizing&&this._stopResize()}_listeners(){this.win.addEventListener("mousedown",()=>this.focus()),this.win.addEventListener("touchstart",()=>this.focus())}_stopMove(){this._moving=null,this.emit("move-end",this)}_stopResize(){this._restore=this._resizing=null,this.emit("resize-end",this)}_isTouchEvent(t){return!!window.TouchEvent&&t instanceof window.TouchEvent}_convertMoveEvent(t){return this._isTouchEvent(t)?t.changedTouches[0]:t}attachToScreen(t,i){this._attachedToScreen[t]=i}resizePlacement(t,i){this.bounds=t,this.keepInside=i;let e=this.x,n=this.y;e=this._attachedToScreen.horziontal==="right"?t.right-this.width:e,e=this._attachedToScreen.horizontal==="left"?t.left:e,n=this._attachedToScreen.vertical==="bottom"?t.bottom-this.height:n,n=this._attachedToScreen.vertical==="top"?t.top:n,this.move(e,n)}isModal(t){return(t||!this._closed)&&this.options.modal}isClosed(){return this._closed}get z(){return parseInt(this.win.style.zIndex)}set z(t){this.win.style.zIndex=t}};f.id=0;var L='<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><rect id="close" x="0" y="0" width="20" height="20" style="fill:none;"/><g><path d="M3.5,3.5l13,13" style="fill:none;stroke:#fff;stroke-width:3px;"/><path d="M16.5,3.5l-13,13" style="fill:none;stroke:#fff;stroke-width:3px;"/></g></svg>',M='<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><rect id="maximize" x="0" y="0" width="20" height="20" style="fill:none;"/><rect x="2" y="2" width="16" height="16" style="fill:none;stroke:#fff;stroke-width:2px;"/><rect x="2" y="2" width="16" height="3.2" style="fill:#fff;"/></svg>';var O='<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><rect id="resize" x="0" y="0" width="20" height="20" style="fill:none;"/><clipPath id="_clip1"><rect x="0" y="0" width="20" height="20"/></clipPath><g clip-path="url(#_clip1)"><rect x="0" y="16.8" width="20" height="3.2" style="fill:#fff;"/><path d="M17.737,3.595l-14.142,14.142l2.263,2.263l14.142,-14.142l-2.263,-2.263Z" style="fill:#fff;"/><path d="M16.8,0l0,20l3.2,0l0,-20l-3.2,0Z" style="fill:#fff;"/><path d="M7.099,18.4l11.301,-11.123l0,11.123l-11.301,0Z" style="fill:#fff;"/></g></svg>',S='<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><rect id="restore" x="0" y="0" width="20" height="20" style="fill:none;"/><g><rect x="7" y="2.5" width="10" height="10" style="fill:none;stroke:#fff;stroke-width:1.5px;"/><rect x="7" y="2.5" width="10" height="2" style="fill:#fff;"/></g><g><rect x="3" y="7.5" width="10" height="10" style="fill:none;stroke:#fff;stroke-width:1.5px;"/><g><rect x="3" y="7.5" width="10" height="2" style="fill:#fff;"/></g></g></svg>';var D={x:0,y:0,width:void 0,height:void 0,modal:!1,openOnCreate:!0,classNames:{},minWidth:"200px",minHeight:"60px",borderRadius:0,styles:{},shadow:"none",movable:!0,resizable:!0,maximizable:!0,closable:!0,titlebar:!0,titlebarHeight:"2rem",backgroundModal:"rgba(0, 0, 0, 0.6)",backgroundWindow:"#fefefe",backgroundTitlebarActive:"#365d98",backgroundTitlebarInactive:"#888888",foregroundButton:"#ffffff",foregroundTitle:"#ffffff",closeButton:L,maximizeButton:M,restoreButton:S,backgroundResize:O};var A="#a8f0f4",V=10,q={screen:!0,windows:!0,snap:20,color:A,spacing:5,indicator:V},_=class{constructor(t,i={}){this.wm=t,this.options=Object.assign({},q,i),this.highlights=a({parent:this.wm.overlay,styles:{position:"absolute"}}),this.horizontal=a({parent:this.highlights,styles:{display:"none",position:"absolute",height:`${this.options.indicator}px`,borderRadius:`${this.options.indicator}px`,backgroundColor:this.options.color}}),this.vertical=a({parent:this.highlights,styles:{display:"none",position:"absolute",width:`${this.options.indicator}px`,borderRadius:`${this.options.indicator}px`,backgroundColor:this.options.color}}),this.horizontal,this.showing=[]}stop(){this.highlights.remove(),this.stopped=!0}addWindow(t){t.on("move",()=>this.move(t)),t.on("move-end",()=>this.moveEnd(t))}screenMove(t,i,e){let n=document.body.clientWidth,h=document.body.clientHeight;t.left-this.options.snap<=n&&t.right+this.options.snap>=0&&(Math.abs(t.top-0)<=this.options.snap?i.push({distance:Math.abs(t.top-0),left:0,width:n,top:0,side:"top",screen:!0}):Math.abs(t.bottom-h)<=this.options.snap&&i.push({distance:Math.abs(t.bottom-h),left:0,width:n,top:h,side:"bottom",screen:!0})),t.top-this.options.snap<=h&&t.bottom+this.options.snap>=0&&(Math.abs(t.left-0)<=this.options.snap?e.push({distance:Math.abs(t.left-0),top:0,height:h,left:0,side:"left",screen:!0}):Math.abs(t.right-n)<=this.options.snap&&e.push({distance:Math.abs(t.right-n),top:0,height:h,left:n,side:"right",screen:!0}))}windowsMove(t,i,e,n){for(let h of this.wm.windows)if(!h.options.noSnap&&h!==t){let s=h.win.getBoundingClientRect();i.left-this.options.snap<=s.right&&i.right+this.options.snap>=s.left&&(Math.abs(i.top-s.bottom)<=this.options.snap?(e.push({distance:Math.abs(i.top-s.bottom),left:s.left,width:s.width,top:s.bottom,side:"top"}),Math.abs(i.left-s.left)<=this.options.snap?n.push({distance:Math.abs(i.left-s.left),top:s.top,height:s.height,left:s.left,side:"left",noSpacing:!0}):Math.abs(i.right-s.right)<=this.options.snap&&n.push({distance:Math.abs(i.right-s.right),top:s.top,height:s.height,left:s.right,side:"right",noSpacing:!0})):Math.abs(i.bottom-s.top)<=this.options.snap&&(e.push({distance:Math.abs(i.bottom-s.top),left:s.left,width:s.width,top:s.top,side:"bottom"}),Math.abs(i.left-s.left)<=this.options.snap?n.push({distance:Math.abs(i.left-s.left),top:s.top,height:s.height,left:s.left,side:"left",noSpacing:!0}):Math.abs(i.right-s.right)<=this.options.snap&&n.push({distance:Math.abs(i.right-s.right),top:s.top,height:s.height,left:s.right,side:"right",noSpacing:!0}))),i.top-this.options.snap<=s.bottom&&i.bottom+this.options.snap>=s.top&&(Math.abs(i.left-s.right)<=this.options.snap?(n.push({distance:Math.abs(i.left-s.right),top:s.top,height:s.height,left:s.right,side:"left"}),Math.abs(i.top-s.top)<=this.options.snap?e.push({distance:Math.abs(i.top-s.top),left:s.left,width:s.width,top:s.top,side:"top",noSpacing:!0}):Math.abs(i.bottom-s.bottom)<=this.options.snap&&e.push({distance:Math.abs(i.bottom-s.bottom),left:s.left,width:s.width,top:s.bottom,side:"bottom",noSpacing:!0})):Math.abs(i.right-s.left)<=this.options.snap&&(n.push({distance:Math.abs(i.right-s.left),top:s.top,height:s.height,left:s.left,side:"right"}),Math.abs(i.top-s.top)<=this.options.snap?e.push({distance:Math.abs(i.top-s.top),left:s.left,width:s.width,top:s.top,side:"top",noSpacing:!0}):Math.abs(i.bottom-s.bottom)<=this.options.snap&&e.push({distance:Math.abs(i.bottom-s.bottom),left:s.left,width:s.width,top:s.bottom,side:"bottom",noSpacing:!0})))}}move(t){if(this.stopped||t.options.noSnap||t.isModal())return;this.horizontal.style.display="none",this.vertical.style.display="none";let i=[],e=[],n=t.win.getBoundingClientRect();if(this.options.screen&&this.screenMove(n,i,e),this.options.windows&&this.windowsMove(t,n,i,e),i.length){i.sort((s,p)=>s.distance-p.distance);let h=i[0];this.horizontal.style.display="block",this.horizontal.style.width=h.width+"px",this.horizontal.y=h.top-this.options.indicator/2,this.horizontal.style.transform=`translate(${h.left}px,${this.horizontal.y}px)`,this.horizontal.side=h.side,this.horizontal.noSpacing=h.noSpacing,this.horizontal.screen=h.screen}if(e.length){e.sort((s,p)=>s.distance-p.distance);let h=e[0];this.vertical.style.display="block",this.vertical.style.height=h.height+"px",this.vertical.x=h.left-this.options.indicator/2,this.vertical.style.transform=`translate(${this.vertical.x}px,${h.top}px)`,this.vertical.side=h.side,this.vertical.noSpacing=h.noSpacing,this.vertical.screen=h.screen}}moveEnd(t){if(!this.stopped){if(this.horizontal.style.display==="block"){let i=this.horizontal.noSpacing?0:this.options.spacing,e=t.minimized?(t.height-t.height*t.minimized.scaleY)/2:0;switch(this.horizontal.side){case"top":t.y=this.horizontal.y-e+i+this.options.indicator/2;break;case"bottom":t.bottom=Math.floor(this.horizontal.y+e-i+this.options.indicator/2);break}t.attachToScreen("vertical",this.horizontal.screen?this.horizontal.side:"")}if(this.vertical.style.display==="block"){let i=this.vertical.noSpacing?0:this.options.spacing,e=t.minimized?(t.width-t.width*t.minimized.scaleX)/2:0;switch(this.vertical.side){case"left":t.x=this.vertical.x-e+i+this.options.indicator/2;break;case"right":t.right=Math.floor(this.vertical.x+e-i+this.options.indicator/2);break}t.attachToScreen("horziontal",this.vertical.screen?this.vertical.side:"")}this.horizontal.style.display=this.vertical.style.display="none"}}};var Z={parent:document.body,quiet:!1,keepInside:!0,snap:!0},B=class{constructor(t={},i={}){this.windows=[],this.active=null,this.options=Object.assign({},Z,t),this.defaultOptions=Object.assign({},D,i),this.options.quiet||console.log("%c \u2615 simple-window-manager initialized \u2615","color: #ff00ff"),this._createDom(t.parent||document.body),this.options.snap&&this.snap(this.options.snap===!0?{}:this.options.snap),window.addEventListener("resize",()=>this.resize())}createWindow(t={}){let i=new f(this,Object.assign({},this.defaultOptions,t));return i.on("open",()=>this._open(i)),i.on("focus",()=>this._focus(i)),i.on("blur",()=>this._blur(i)),i.on("close",()=>this._close(i)),i.win.addEventListener("mousemove",e=>this._move(e)),i.win.addEventListener("touchmove",e=>this._move(e)),i.win.addEventListener("mouseup",e=>this._up(e)),i.win.addEventListener("touchend",e=>this._up(e)),this._snap&&!t.noSnap&&this._snap.addWindow(i),i.resizePlacement(this.bounds,this.options.keepInside),i.options.openOnCreate&&i.open(),i}attachWindow(t){return t.on("open",this._open,this),t.on("focus",this._focus,this),t.on("blur",this._blur,this),t.on("close",this._close,this),this.win.appendChild(t.win),t.wm=this,t.win.addEventListener("mousemove",i=>this._move(i)),t.win.addEventListener("touchmove",i=>this._move(i)),t.win.addEventListener("mouseup",i=>this._up(i)),t.win.addEventListener("touchend",i=>this._up(i)),this._snap&&!this.defaultOptions.noSnap&&this._snap.addWindow(t),t}snap(t){this._snap=new _(this,t);for(let i of this.windows)i.options.noSnap||this._snap.addWindow(i)}sendToFront(t){let i=this.windows.indexOf(t);console.assert(i!==-1,"sendToFront should find window in this.windows"),i!==this.windows.length-1&&(this.windows.splice(i,1),this.windows.push(t),this._reorder())}sendToBack(t){let i=this.windows.indexOf(t);console.assert(i!==-1,"sendToFront should find window in this.windows"),i!==0&&(this.windows.splice(i,1),this.windows.unshift(t),this._reorder())}save(){let t={};for(let i=0;i<this.windows.length;i++){let e=this.windows[i];t[e.id]=e.save(),t[e.id].order=i}return t}load(t){for(let i=0;i<this.windows.length;i++){let e=this.windows[i];t[e.id]&&e.load(t[e.id])}}closeAll(){for(let t of this.windows)t.close();this.windows=[],this.active=null}_reorder(){let t=0;for(let i of this.windows)i.isClosed()||(i.z=t++)}_createDom(t){this.win=a({parent:t,styles:{"user-select":"none",width:"100%",height:"100%",overflow:"hidden","z-index":-1,cursor:"default"}}),this.overlay=a({parent:this.win,styles:{"user-select":"none",position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden"}}),this.overlay.addEventListener("mousemove",i=>this._move(i)),this.overlay.addEventListener("touchmove",i=>this._move(i)),this.overlay.addEventListener("mouseup",i=>this._up(i)),this.overlay.addEventListener("touchend",i=>this._up(i)),this.modalOverlay=a({parent:this.win,styles:{display:"none","user-select":"none",position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",background:this.defaultOptions.backgroundModal}}),this.modalOverlay.addEventListener("mousemove",i=>{this._move(i),i.preventDefault(),i.stopPropagation()}),this.modalOverlay.addEventListener("touchmove",i=>{this._move(i),i.preventDefault(),i.stopPropagation()}),this.modalOverlay.addEventListener("mouseup",i=>{this._up(i),i.preventDefault(),i.stopPropagation()}),this.modalOverlay.addEventListener("touchend",i=>{this._up(i),i.preventDefault(),i.stopPropagation()}),this.modalOverlay.addEventListener("mousedown",i=>{i.preventDefault(),i.stopPropagation()}),this.modalOverlay.addEventListener("touchstart",i=>{i.preventDefault(),i.stopPropagation()})}_open(t){this.windows.push(t),this._reorder(),t.options.modal?(this.modalOverlay.style.display="block",this.modalOverlay.style.zIndex=t.z):this.modalOverlay.style.display="none"}_focus(t){if(this.active===t)return;this.active&&this.active.blur();let i=this.windows.indexOf(t);console.assert(i!==-1,"WindowManager._focus should find window in this.windows"),i!==this.windows.length-1&&(this.windows.splice(i,1),this.windows.push(t)),this._reorder(),this.active=this.windows[this.windows.length-1]}_blur(t){this.active===t&&(this.active=null)}_close(t){let i=this.windows.indexOf(t);console.assert(i!==-1,"WindowManager._close should find window in this.windows"),this.windows.splice(i,1);let e=this.windows[this.windows.length-1];t.isModal(!0)&&(e&&e.isModal()?this.modalOverlay.style.zIndex=e.z:this.modalOverlay.style.display="none"),e.focus()}_move(t){for(let i in this.windows)this.windows[i]._move(t)}_up(t){for(let i in this.windows)this.windows[i]._up(t)}checkModal(t){return!this.modal||this.modal===t}get bounds(){return{top:this.win.offsetTop,bottom:this.win.offsetTop+this.win.offsetHeight,left:this.win.offsetLeft,right:this.win.offsetLeft+this.win.offsetWidth}}resize(){let t=this.bounds;for(let i in this.windows)this.windows[i].resizePlacement(t,this.options.keepInside)}};export{f as Window,B as WindowManager};
