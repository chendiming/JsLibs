window.console=window.console||function(){var a={};return a.log=a.warn=a.debug=a.info=a.error=a.time=a.dir=a.profile=a.clear=a.exception=a.trace=a.assert=function(){},a}(),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){var b=this.length>>>0,c=Number(arguments[1])||0;for(c=0>c?Math.ceil(c):Math.floor(c),0>c&&(c+=b);b>c;c++)if(c in this&&this[c]===a)return c;return-1}),Array.prototype.forEach||(Array.prototype.forEach=function(a){var b=this.length;if("function"!=typeof a)throw new TypeError;for(var c=arguments[1],d=0;b>d;d++)d in this&&a.call(c,this[d],d,this)}),window.HTMLElement=window.HTMLElement||Element,window.HTMLDocument=window.HTMLDocument||Document,HTMLElement.prototype.addEventListener=HTMLElement.prototype.addEventListener||function(a,b){var c=function(){return!0},d=this;switch(a){case"input":var e=function(a){var c=a.srcElement;d.eventQueue&&-1!=d.eventQueue.mousedown.indexOf(f)?"value"!=a.propertyName&&"selectedIndex"!=a.propertyName||c.isSetValByJs||b.call(d,a):c.removeEventListener("propertychange",e)},f=function(a){var b=a.srcElement;null!=b.value&&b.addEventListener("propertychange",e)};return this.inputQueue||(this.inputQueue=[]),this.inputQueue.push(b),this.inputQueue.push(f),this.addEventListener("mousedown",f),void this.addEventListener("keydown",f);case"blur":a="focusout",c=function(a){return document.activeElement!=a.srcElement};break;case"focus":a="focusin",c=function(a){return document.activeElement==a.srcElement}}this.eventQueue||(this.eventQueue={}),this.eventQueue[a]||(this.eventQueue[a]=[]);var g=this.eventQueue[a];-1==g.indexOf(b)&&(g.push(b),this["my"+a]||(this["my"+a]=function(b){try{if(c.call(d,b)){var e=d.eventQueue[a].slice();e.forEach(function(c){"function"==typeof c&&-1!=d.eventQueue[a].indexOf(c)&&c.call(d,b)})}}catch(b){}},this.attachEvent("on"+a,this["my"+a])))},HTMLDocument.prototype.addEventListener=HTMLDocument.prototype.addEventListener||HTMLElement.prototype.addEventListener,window.addEventListener=window.addEventListener||HTMLElement.prototype.addEventListener,HTMLElement.prototype.removeEventListener=HTMLElement.prototype.removeEventListener||function(a,b){switch(a){case"input":if(this.inputQueue){var c=this.inputQueue.indexOf(b);if(-1==c)return;if(this.eventQueue&&this.eventQueue.mousedown){var d=this.inputQueue[c+1];this.eventQueue.mousedown.splice(this.eventQueue.mousedown.indexOf(d),1),this.eventQueue.keydown.splice(this.eventQueue.keydown.indexOf(d),1),this.inputQueue.splice(c,2)}}return;case"blur":a="focusout"}this.eventQueue&&this.eventQueue[a]&&this.eventQueue[a].splice(this.eventQueue[a].indexOf(b),1)},HTMLDocument.prototype.removeEventListener=HTMLDocument.prototype.removeEventListener||HTMLElement.prototype.removeEventListener,window.removeEventListener=window.removeEventListener||HTMLElement.prototype.removeEventListener,Event.prototype.preventDefault=Event.prototype.preventDefault||function(){this.returnValue=!1},Event.prototype.stopPropagation=Event.prototype.stopPropagation||function(){this.cancelBubble=!0},HTMLElement.prototype.getComputedStyle=HTMLElement.prototype.getComputedStyle||function(){return this.currentStyle};var getBoundingClientRectCopy=HTMLElement.prototype.getBoundingClientRect;HTMLElement.prototype.getBoundingClientRect=function(){getBoundingClientRectCopy.call(document.body);var a=getBoundingClientRectCopy.call(this);return{left:a.left,right:a.right,top:a.top,bottom:a.bottom,width:a.bottom-a.top,height:a.right-a.left}},window.getComputedStyle=window.getComputedStyle||function(a){var b={getPropertyValue:function(a){return this[a]}};for(var c in a.currentStyle)try{b[c]=a.currentStyle[c]}catch(d){}return b};