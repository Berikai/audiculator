/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class bn{constructor(e,t,i,r,s="div"){this.parent=e,this.object=t,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),bn.nextNameID=bn.nextNameID||0,this.$name.id=`lil-gui-name-${++bn.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Ed extends bn{constructor(e,t,i){super(e,t,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function na(n){let e,t;return(e=n.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const bd={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:na,toHexString:na},Ur={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},wd={isPrimitive:!1,match:n=>Array.isArray(n),fromHexString(n,e,t=1){const i=Ur.fromHexString(n);e[0]=(i>>16&255)/255*t,e[1]=(i>>8&255)/255*t,e[2]=(i&255)/255*t},toHexString([n,e,t],i=1){i=255/i;const r=n*i<<16^e*i<<8^t*i<<0;return Ur.toHexString(r)}},Td={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,e,t=1){const i=Ur.fromHexString(n);e.r=(i>>16&255)/255*t,e.g=(i>>8&255)/255*t,e.b=(i&255)/255*t},toHexString({r:n,g:e,b:t},i=1){i=255/i;const r=n*i<<16^e*i<<8^t*i<<0;return Ur.toHexString(r)}},Ad=[bd,Ur,wd,Td];function Cd(n){return Ad.find(e=>e.match(n))}class Rd extends bn{constructor(e,t,i,r){super(e,t,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Cd(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=na(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class so extends bn{constructor(e,t,i){super(e,t,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Pd extends bn{constructor(e,t,i,r,s,o){super(e,t,i,"number"),this._initInput(),this.min(r),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let b=parseFloat(this.$input.value);isNaN(b)||(this._stepExplicit&&(b=this._snap(b)),this.setValue(this._clamp(b)))},i=b=>{const M=parseFloat(this.$input.value);isNaN(M)||(this._snapClampSetValue(M+b),this.$input.value=this.getValue())},r=b=>{b.key==="Enter"&&this.$input.blur(),b.code==="ArrowUp"&&(b.preventDefault(),i(this._step*this._arrowKeyMultiplier(b))),b.code==="ArrowDown"&&(b.preventDefault(),i(this._step*this._arrowKeyMultiplier(b)*-1))},s=b=>{this._inputFocused&&(b.preventDefault(),i(this._step*this._normalizeMouseWheel(b)))};let o=!1,a,c,l,u,d;const f=5,p=b=>{a=b.clientX,c=l=b.clientY,o=!0,u=this.getValue(),d=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",_)},g=b=>{if(o){const M=b.clientX-a,S=b.clientY-c;Math.abs(S)>f?(b.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(M)>f&&_()}if(!o){const M=b.clientY-l;d-=M*this._step*this._arrowKeyMultiplier(b),u+d>this._max?d=this._max-u:u+d<this._min&&(d=this._min-u),this._snapClampSetValue(u+d)}l=b.clientY},_=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",_)},m=()=>{this._inputFocused=!0},h=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",h)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(h,b,M,S,C)=>(h-b)/(M-b)*(C-S)+S,t=h=>{const b=this.$slider.getBoundingClientRect();let M=e(h,b.left,b.right,this._min,this._max);this._snapClampSetValue(M)},i=h=>{this._setDraggingStyle(!0),t(h.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",s)},r=h=>{t(h.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",s)};let o=!1,a,c;const l=h=>{h.preventDefault(),this._setDraggingStyle(!0),t(h.touches[0].clientX),o=!1},u=h=>{h.touches.length>1||(this._hasScrollBar?(a=h.touches[0].clientX,c=h.touches[0].clientY,o=!0):l(h),window.addEventListener("touchmove",d,{passive:!1}),window.addEventListener("touchend",f))},d=h=>{if(o){const b=h.touches[0].clientX-a,M=h.touches[0].clientY-c;Math.abs(b)>Math.abs(M)?l(h):(window.removeEventListener("touchmove",d),window.removeEventListener("touchend",f))}else h.preventDefault(),t(h.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",d),window.removeEventListener("touchend",f)},p=this._callOnFinishChange.bind(this),g=400;let _;const m=h=>{if(Math.abs(h.deltaX)<Math.abs(h.deltaY)&&this._hasScrollBar)return;h.preventDefault();const M=this._normalizeMouseWheel(h)*this._step;this._snapClampSetValue(this.getValue()+M),this.$input.value=this.getValue(),clearTimeout(_),_=setTimeout(p,g)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),t+-i}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Ld extends bn{constructor(e,t,i,r){super(e,t,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const i=document.createElement("option");i.textContent=t,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class Id extends bn{constructor(e,t,i){super(e,t,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Ud=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Dd(n){const e=document.createElement("style");e.innerHTML=n;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Tl=!1;class qs{constructor({parent:e,autoPlace:t=e===void 0,container:i,width:r,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:c=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),c&&this.domElement.classList.add("allow-touch-styles"),!Tl&&a&&(Dd(Ud),Tl=!0),i?i.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=o}add(e,t,i,r,s){if(Object(i)===i)return new Ld(this,e,t,i);const o=e[t];switch(typeof o){case"number":return new Pd(this,e,t,i,r,s);case"boolean":return new Ed(this,e,t);case"string":return new Id(this,e,t);case"function":return new so(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,i=1){return new Rd(this,e,t,i)}addFolder(e){const t=new qs({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof so||i._name in e.controllers&&i.load(e.controllers[i._name])}),t&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof so)){if(i._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);t.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);t.folders[i._title]=i.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const i=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}function Fd(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Rs={exports:{}},Nd=Rs.exports,Al;function Od(){return Al||(Al=1,(function(n,e){(function(t,i){n.exports=i()})(Nd,function(){var t=function(){function i(p){return o.appendChild(p.dom),p}function r(p){for(var g=0;g<o.children.length;g++)o.children[g].style.display=g===p?"block":"none";s=p}var s=0,o=document.createElement("div");o.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",o.addEventListener("click",function(p){p.preventDefault(),r(++s%o.children.length)},!1);var a=(performance||Date).now(),c=a,l=0,u=i(new t.Panel("FPS","#0ff","#002")),d=i(new t.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var f=i(new t.Panel("MB","#f08","#201"));return r(0),{REVISION:16,dom:o,addPanel:i,showPanel:r,begin:function(){a=(performance||Date).now()},end:function(){l++;var p=(performance||Date).now();if(d.update(p-a,200),p>c+1e3&&(u.update(1e3*l/(p-c),100),c=p,l=0,f)){var g=performance.memory;f.update(g.usedJSHeapSize/1048576,g.jsHeapSizeLimit/1048576)}return p},update:function(){a=this.end()},domElement:o,setMode:r}};return t.Panel=function(i,r,s){var o=1/0,a=0,c=Math.round,l=c(window.devicePixelRatio||1),u=80*l,d=48*l,f=3*l,p=2*l,g=3*l,_=15*l,m=74*l,h=30*l,b=document.createElement("canvas");b.width=u,b.height=d,b.style.cssText="width:80px;height:48px";var M=b.getContext("2d");return M.font="bold "+9*l+"px Helvetica,Arial,sans-serif",M.textBaseline="top",M.fillStyle=s,M.fillRect(0,0,u,d),M.fillStyle=r,M.fillText(i,f,p),M.fillRect(g,_,m,h),M.fillStyle=s,M.globalAlpha=.9,M.fillRect(g,_,m,h),{dom:b,update:function(S,C){o=Math.min(o,S),a=Math.max(a,S),M.fillStyle=s,M.globalAlpha=1,M.fillRect(0,0,u,_),M.fillStyle=r,M.fillText(c(S)+" "+i+" ("+c(o)+"-"+c(a)+")",f,p),M.drawImage(b,g+l,_,m-l,h,g,_,m-l,h),M.fillRect(g+m-l,_,l,h),M.fillStyle=s,M.globalAlpha=.9,M.fillRect(g+m-l,_,l,c((1-S/C)*h))}}},t})})(Rs)),Rs.exports}var Bd=Od();const zd=Fd(Bd),Dr=new zd;document.body.appendChild(Dr.dom);Dr.dom.style.display="none";let jr=new(window.AudioContext||window.webkitAudioContext),Ki,jt,zs;async function kd(){const n=await navigator.mediaDevices.getUserMedia({audio:!0}),[e]=n.getAudioTracks();return(await navigator.mediaDevices.enumerateDevices()).find(i=>i.label===e.label&&i.kind==="audioinput")}async function Vd(){const e=(await navigator.mediaDevices.enumerateDevices()).filter(i=>i.kind==="audioinput"),t={};return e.forEach(i=>{t[i.label]=i.deviceId}),t}async function Ka(n){if(!navigator.mediaDevices){alert("Couldn't access microphone, try to turn on your microphone permissions.");return}jr.state==="suspended"&&await jr.resume(),zs=await navigator.mediaDevices.getUserMedia({audio:{deviceId:n?{exact:n}:void 0,sampleRate:48e3,channelCount:2,echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}});let e=jr.createMediaStreamSource(zs);Ki=jr.createAnalyser(),Ki.fftSize=64,e.connect(Ki),jt=new Uint8Array(Ki.frequencyBinCount)}async function tu(){zs.getTracks().forEach(n=>n.stop())}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Za="179",Hd=0,Cl=1,Gd=2,nu=1,Wd=2,Fn=3,si=0,Gt=1,On=2,kn=0,er=1,ia=2,Rl=3,Pl=4,Xd=5,xi=100,$d=101,qd=102,Yd=103,jd=104,Kd=200,Zd=201,Qd=202,Jd=203,ra=204,sa=205,eh=206,th=207,nh=208,ih=209,rh=210,sh=211,oh=212,ah=213,lh=214,oa=0,aa=1,la=2,sr=3,ca=4,ua=5,da=6,ha=7,Qa=0,ch=1,uh=2,ni=0,dh=1,hh=2,fh=3,ph=4,mh=5,gh=6,_h=7,iu=300,or=301,ar=302,fa=303,pa=304,Ys=306,ma=1e3,yi=1001,ga=1002,hn=1003,vh=1004,Kr=1005,Mn=1006,oo=1007,Mi=1008,wn=1009,ru=1010,su=1011,Fr=1012,Ja=1013,Ti=1014,Bn=1015,Vn=1016,el=1017,tl=1018,Nr=1020,ou=35902,au=1021,lu=1022,dn=1023,Or=1026,Br=1027,cu=1028,nl=1029,uu=1030,il=1031,rl=1033,Ps=33776,Ls=33777,Is=33778,Us=33779,_a=35840,va=35841,xa=35842,Sa=35843,ya=36196,Ma=37492,Ea=37496,ba=37808,wa=37809,Ta=37810,Aa=37811,Ca=37812,Ra=37813,Pa=37814,La=37815,Ia=37816,Ua=37817,Da=37818,Fa=37819,Na=37820,Oa=37821,Ds=36492,Ba=36494,za=36495,du=36283,ka=36284,Va=36285,Ha=36286,xh=3200,Sh=3201,hu=0,yh=1,Qn="",nn="srgb",lr="srgb-linear",ks="linear",nt="srgb",Ui=7680,Ll=519,Mh=512,Eh=513,bh=514,fu=515,wh=516,Th=517,Ah=518,Ch=519,Ga=35044,Il="300 es",En=2e3,Vs=2001;class pr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ul=1234567;const tr=Math.PI/180,zr=180/Math.PI;function Hn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function Be(n,e,t){return Math.max(e,Math.min(t,n))}function sl(n,e){return(n%e+e)%e}function Rh(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Ph(n,e,t){return n!==e?(t-n)/(e-n):0}function Pr(n,e,t){return(1-t)*n+t*e}function Lh(n,e,t,i){return Pr(n,e,1-Math.exp(-t*i))}function Ih(n,e=1){return e-Math.abs(sl(n,e*2)-e)}function Uh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Dh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Fh(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Nh(n,e){return n+Math.random()*(e-n)}function Oh(n){return n*(.5-Math.random())}function Bh(n){n!==void 0&&(Ul=n);let e=Ul+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zh(n){return n*tr}function kh(n){return n*zr}function Vh(n){return(n&n-1)===0&&n!==0}function Hh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Gh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Wh(n,e,t,i,r){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+i)/2),u=o((e+i)/2),d=s((e-i)/2),f=o((e-i)/2),p=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*u,c*d,c*f,a*l);break;case"YZY":n.set(c*f,a*u,c*d,a*l);break;case"ZXZ":n.set(c*d,c*f,a*u,a*l);break;case"XZX":n.set(a*u,c*g,c*p,a*l);break;case"YXY":n.set(c*p,a*u,c*g,a*l);break;case"ZYZ":n.set(c*g,c*p,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function un(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function et(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Xh={DEG2RAD:tr,RAD2DEG:zr,generateUUID:Hn,clamp:Be,euclideanModulo:sl,mapLinear:Rh,inverseLerp:Ph,lerp:Pr,damp:Lh,pingpong:Ih,smoothstep:Uh,smootherstep:Dh,randInt:Fh,randFloat:Nh,randFloatSpread:Oh,seededRandom:Bh,degToRad:zh,radToDeg:kh,isPowerOfTwo:Vh,ceilPowerOfTwo:Hh,floorPowerOfTwo:Gh,setQuaternionFromProperEuler:Wh,normalize:et,denormalize:un};class Fe{constructor(e=0,t=0){Fe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Be(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3];const f=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(d!==_||c!==f||l!==p||u!==g){let m=1-a;const h=c*f+l*p+u*g+d*_,b=h>=0?1:-1,M=1-h*h;if(M>Number.EPSILON){const C=Math.sqrt(M),R=Math.atan2(C,h*b);m=Math.sin(m*R)/C,a=Math.sin(a*R)/C}const S=a*b;if(c=c*m+f*S,l=l*m+p*S,u=u*m+g*S,d=d*m+_*S,m===1-a){const C=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=C,l*=C,u*=C,d*=C}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[o],f=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+u*d+c*p-l*f,e[t+1]=c*g+u*f+l*d-a*p,e[t+2]=l*g+u*p+a*f-c*d,e[t+3]=u*g-a*d-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(s/2),f=c(i/2),p=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*d+l*p*g,this._y=l*p*d-f*u*g,this._z=l*u*g+f*p*d,this._w=l*u*d-f*p*g;break;case"YXZ":this._x=f*u*d+l*p*g,this._y=l*p*d-f*u*g,this._z=l*u*g-f*p*d,this._w=l*u*d+f*p*g;break;case"ZXY":this._x=f*u*d-l*p*g,this._y=l*p*d+f*u*g,this._z=l*u*g+f*p*d,this._w=l*u*d-f*p*g;break;case"ZYX":this._x=f*u*d-l*p*g,this._y=l*p*d+f*u*g,this._z=l*u*g-f*p*d,this._w=l*u*d+f*p*g;break;case"YZX":this._x=f*u*d+l*p*g,this._y=l*p*d+f*u*g,this._z=l*u*g-f*p*d,this._w=l*u*d-f*p*g;break;case"XZY":this._x=f*u*d-l*p*g,this._y=l*p*d-f*u*g,this._z=l*u*g+f*p*d,this._w=l*u*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+l)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-l)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Be(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*d+this._w*f,this._x=i*d+this._x*f,this._y=r*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,i=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Dl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Dl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-s*d,this.z=r+c*d+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this.z=Be(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this.z=Be(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ao.copy(this).projectOnVector(e),this.sub(ao)}reflect(e){return this.sub(ao.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Be(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ao=new I,Dl=new Vr;class ke{constructor(e,t,i,r,s,o,a,c,l){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],p=i[5],g=i[8],_=r[0],m=r[3],h=r[6],b=r[1],M=r[4],S=r[7],C=r[2],R=r[5],P=r[8];return s[0]=o*_+a*b+c*C,s[3]=o*m+a*M+c*R,s[6]=o*h+a*S+c*P,s[1]=l*_+u*b+d*C,s[4]=l*m+u*M+d*R,s[7]=l*h+u*S+d*P,s[2]=f*_+p*b+g*C,s[5]=f*m+p*M+g*R,s[8]=f*h+p*S+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*s,p=l*s-o*c,g=t*d+i*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*l-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=f*_,e[4]=(u*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(lo.makeScale(e,t)),this}rotate(e){return this.premultiply(lo.makeRotation(-e)),this}translate(e,t){return this.premultiply(lo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const lo=new ke;function pu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Hs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function $h(){const n=Hs("canvas");return n.style.display="block",n}const Fl={};function nr(n){n in Fl||(Fl[n]=!0,console.warn(n))}function qh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Nl=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ol=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Yh(){const n={enabled:!0,workingColorSpace:lr,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===nt&&(r.r=Gn(r.r),r.g=Gn(r.g),r.b=Gn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===nt&&(r.r=ir(r.r),r.g=ir(r.g),r.b=ir(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Qn?ks:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return nr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return nr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[lr]:{primaries:e,whitePoint:i,transfer:ks,toXYZ:Nl,fromXYZ:Ol,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:e,whitePoint:i,transfer:nt,toXYZ:Nl,fromXYZ:Ol,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),n}const Ke=Yh();function Gn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ir(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Di;class jh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Di===void 0&&(Di=Hs("canvas")),Di.width=e.width,Di.height=e.height;const r=Di.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Di}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Gn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Gn(t[i]/255)*255):t[i]=Gn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Kh=0;class ol{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=Hn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(co(r[o].image)):s.push(co(r[o]))}else s=co(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function co(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?jh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Zh=0;const uo=new I;class Wt extends pr{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,i=yi,r=yi,s=Mn,o=Mi,a=dn,c=wn,l=Wt.DEFAULT_ANISOTROPY,u=Qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=Hn(),this.name="",this.source=new ol(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Fe(0,0),this.repeat=new Fe(1,1),this.center=new Fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(uo).x}get height(){return this.source.getSize(uo).y}get depth(){return this.source.getSize(uo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==iu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ma:e.x=e.x-Math.floor(e.x);break;case yi:e.x=e.x<0?0:1;break;case ga:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ma:e.y=e.y-Math.floor(e.y);break;case yi:e.y=e.y<0?0:1;break;case ga:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=iu;Wt.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,i=0,r=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],p=c[5],g=c[9],_=c[2],m=c[6],h=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,S=(p+1)/2,C=(h+1)/2,R=(u+f)/4,P=(d+_)/4,F=(g+m)/4;return M>S&&M>C?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=R/i,s=P/i):S>C?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=R/r,s=F/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=P/s,r=F/s),this.set(i,r,s,t),this}let b=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-_)/b,this.z=(f-u)/b,this.w=Math.acos((l+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this.z=Be(this.z,e.z,t.z),this.w=Be(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this.z=Be(this.z,e,t),this.w=Be(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qh extends pr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new Wt(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Mn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new ol(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends Qh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class mu extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=hn,this.minFilter=hn,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Jh extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=hn,this.minFilter=hn,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ai{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(an.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(an.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=an.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,an):an.fromBufferAttribute(s,o),an.applyMatrix4(e.matrixWorld),this.expandByPoint(an);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Zr.copy(i.boundingBox)),Zr.applyMatrix4(e.matrixWorld),this.union(Zr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,an),an.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(yr),Qr.subVectors(this.max,yr),Fi.subVectors(e.a,yr),Ni.subVectors(e.b,yr),Oi.subVectors(e.c,yr),Xn.subVectors(Ni,Fi),$n.subVectors(Oi,Ni),di.subVectors(Fi,Oi);let t=[0,-Xn.z,Xn.y,0,-$n.z,$n.y,0,-di.z,di.y,Xn.z,0,-Xn.x,$n.z,0,-$n.x,di.z,0,-di.x,-Xn.y,Xn.x,0,-$n.y,$n.x,0,-di.y,di.x,0];return!ho(t,Fi,Ni,Oi,Qr)||(t=[1,0,0,0,1,0,0,0,1],!ho(t,Fi,Ni,Oi,Qr))?!1:(Jr.crossVectors(Xn,$n),t=[Jr.x,Jr.y,Jr.z],ho(t,Fi,Ni,Oi,Qr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,an).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(an).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Pn=[new I,new I,new I,new I,new I,new I,new I,new I],an=new I,Zr=new ai,Fi=new I,Ni=new I,Oi=new I,Xn=new I,$n=new I,di=new I,yr=new I,Qr=new I,Jr=new I,hi=new I;function ho(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){hi.fromArray(n,s);const a=r.x*Math.abs(hi.x)+r.y*Math.abs(hi.y)+r.z*Math.abs(hi.z),c=e.dot(hi),l=t.dot(hi),u=i.dot(hi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const ef=new ai,Mr=new I,fo=new I;class mr{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):ef.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mr.subVectors(e,this.center);const t=Mr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Mr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mr.copy(e.center).add(fo)),this.expandByPoint(Mr.copy(e.center).sub(fo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Ln=new I,po=new I,es=new I,qn=new I,mo=new I,ts=new I,go=new I;class gu{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ln.copy(this.origin).addScaledVector(this.direction,t),Ln.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){po.copy(e).add(t).multiplyScalar(.5),es.copy(t).sub(e).normalize(),qn.copy(this.origin).sub(po);const s=e.distanceTo(t)*.5,o=-this.direction.dot(es),a=qn.dot(this.direction),c=-qn.dot(es),l=qn.lengthSq(),u=Math.abs(1-o*o);let d,f,p,g;if(u>0)if(d=o*c-a,f=o*a-c,g=s*u,d>=0)if(f>=-g)if(f<=g){const _=1/u;d*=_,f*=_,p=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;else f=-s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-c),s),p=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-s,-c),s),p=f*(f+2*c)+l):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-c),s),p=-d*d+f*(f+2*c)+l);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(po).addScaledVector(es,f),p}intersectSphere(e,t){Ln.subVectors(e.center,this.origin);const i=Ln.dot(this.direction),r=Ln.dot(Ln)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Ln)!==null}intersectTriangle(e,t,i,r,s){mo.subVectors(t,e),ts.subVectors(i,e),go.crossVectors(mo,ts);let o=this.direction.dot(go),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qn.subVectors(this.origin,e);const c=a*this.direction.dot(ts.crossVectors(qn,ts));if(c<0)return null;const l=a*this.direction.dot(mo.cross(qn));if(l<0||c+l>o)return null;const u=-a*qn.dot(go);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ft{constructor(e,t,i,r,s,o,a,c,l,u,d,f,p,g,_,m){ft.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,d,f,p,g,_,m)}set(e,t,i,r,s,o,a,c,l,u,d,f,p,g,_,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=g,h[11]=_,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ft().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Bi.setFromMatrixColumn(e,0).length(),s=1/Bi.setFromMatrixColumn(e,1).length(),o=1/Bi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,p=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*u,p=c*d,g=l*u,_=l*d;t[0]=f+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*u,p=c*d,g=l*u,_=l*d;t[0]=f-_*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*u,p=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=g*l-p,t[8]=f*l+_,t[1]=c*d,t[5]=_*l+f,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-f*d,t[8]=g*d+p,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*d+g,t[10]=f-_*d}else if(e.order==="XZY"){const f=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+_,t[5]=o*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tf,e,nf)}lookAt(e,t,i){const r=this.elements;return qt.subVectors(e,t),qt.lengthSq()===0&&(qt.z=1),qt.normalize(),Yn.crossVectors(i,qt),Yn.lengthSq()===0&&(Math.abs(i.z)===1?qt.x+=1e-4:qt.z+=1e-4,qt.normalize(),Yn.crossVectors(i,qt)),Yn.normalize(),ns.crossVectors(qt,Yn),r[0]=Yn.x,r[4]=ns.x,r[8]=qt.x,r[1]=Yn.y,r[5]=ns.y,r[9]=qt.y,r[2]=Yn.z,r[6]=ns.z,r[10]=qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],h=i[14],b=i[3],M=i[7],S=i[11],C=i[15],R=r[0],P=r[4],F=r[8],E=r[12],y=r[1],T=r[5],X=r[9],k=r[13],G=r[2],K=r[6],q=r[10],te=r[14],V=r[3],oe=r[7],he=r[11],we=r[15];return s[0]=o*R+a*y+c*G+l*V,s[4]=o*P+a*T+c*K+l*oe,s[8]=o*F+a*X+c*q+l*he,s[12]=o*E+a*k+c*te+l*we,s[1]=u*R+d*y+f*G+p*V,s[5]=u*P+d*T+f*K+p*oe,s[9]=u*F+d*X+f*q+p*he,s[13]=u*E+d*k+f*te+p*we,s[2]=g*R+_*y+m*G+h*V,s[6]=g*P+_*T+m*K+h*oe,s[10]=g*F+_*X+m*q+h*he,s[14]=g*E+_*k+m*te+h*we,s[3]=b*R+M*y+S*G+C*V,s[7]=b*P+M*T+S*K+C*oe,s[11]=b*F+M*X+S*q+C*he,s[15]=b*E+M*k+S*te+C*we,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],p=e[14],g=e[3],_=e[7],m=e[11],h=e[15];return g*(+s*c*d-r*l*d-s*a*f+i*l*f+r*a*p-i*c*p)+_*(+t*c*p-t*l*f+s*o*f-r*o*p+r*l*u-s*c*u)+m*(+t*l*d-t*a*p-s*o*d+i*o*p+s*a*u-i*l*u)+h*(-r*a*u-t*c*d+t*a*f+r*o*d-i*o*f+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],p=e[11],g=e[12],_=e[13],m=e[14],h=e[15],b=d*m*l-_*f*l+_*c*p-a*m*p-d*c*h+a*f*h,M=g*f*l-u*m*l-g*c*p+o*m*p+u*c*h-o*f*h,S=u*_*l-g*d*l+g*a*p-o*_*p-u*a*h+o*d*h,C=g*d*c-u*_*c-g*a*f+o*_*f+u*a*m-o*d*m,R=t*b+i*M+r*S+s*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return e[0]=b*P,e[1]=(_*f*s-d*m*s-_*r*p+i*m*p+d*r*h-i*f*h)*P,e[2]=(a*m*s-_*c*s+_*r*l-i*m*l-a*r*h+i*c*h)*P,e[3]=(d*c*s-a*f*s-d*r*l+i*f*l+a*r*p-i*c*p)*P,e[4]=M*P,e[5]=(u*m*s-g*f*s+g*r*p-t*m*p-u*r*h+t*f*h)*P,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*h-t*c*h)*P,e[7]=(o*f*s-u*c*s+u*r*l-t*f*l-o*r*p+t*c*p)*P,e[8]=S*P,e[9]=(g*d*s-u*_*s-g*i*p+t*_*p+u*i*h-t*d*h)*P,e[10]=(o*_*s-g*a*s+g*i*l-t*_*l-o*i*h+t*a*h)*P,e[11]=(u*a*s-o*d*s-u*i*l+t*d*l+o*i*p-t*a*p)*P,e[12]=C*P,e[13]=(u*_*r-g*d*r+g*i*f-t*_*f-u*i*m+t*d*m)*P,e[14]=(g*a*r-o*_*r-g*i*c+t*_*c+o*i*m-t*a*m)*P,e[15]=(o*d*r-u*a*r+u*i*c-t*d*c-o*i*f+t*a*f)*P,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,d=a+a,f=s*l,p=s*u,g=s*d,_=o*u,m=o*d,h=a*d,b=c*l,M=c*u,S=c*d,C=i.x,R=i.y,P=i.z;return r[0]=(1-(_+h))*C,r[1]=(p+S)*C,r[2]=(g-M)*C,r[3]=0,r[4]=(p-S)*R,r[5]=(1-(f+h))*R,r[6]=(m+b)*R,r[7]=0,r[8]=(g+M)*P,r[9]=(m-b)*P,r[10]=(1-(f+_))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Bi.set(r[0],r[1],r[2]).length();const o=Bi.set(r[4],r[5],r[6]).length(),a=Bi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ln.copy(this);const l=1/s,u=1/o,d=1/a;return ln.elements[0]*=l,ln.elements[1]*=l,ln.elements[2]*=l,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=d,ln.elements[9]*=d,ln.elements[10]*=d,t.setFromRotationMatrix(ln),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=En,c=!1){const l=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),p=(i+r)/(i-r);let g,_;if(c)g=s/(o-s),_=o*s/(o-s);else if(a===En)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Vs)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=En,c=!1){const l=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),p=-(i+r)/(i-r);let g,_;if(c)g=1/(o-s),_=o/(o-s);else if(a===En)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===Vs)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Bi=new I,ln=new ft,tf=new I(0,0,0),nf=new I(1,1,1),Yn=new I,ns=new I,qt=new I,Bl=new ft,zl=new Vr;class Tn{constructor(e=0,t=0,i=0,r=Tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],d=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Be(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Be(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Be(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Bl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zl.setFromEuler(this),this.setFromQuaternion(zl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tn.DEFAULT_ORDER="XYZ";class _u{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let rf=0;const kl=new I,zi=new Vr,In=new ft,is=new I,Er=new I,sf=new I,of=new Vr,Vl=new I(1,0,0),Hl=new I(0,1,0),Gl=new I(0,0,1),Wl={type:"added"},af={type:"removed"},ki={type:"childadded",child:null},_o={type:"childremoved",child:null};class Rt extends pr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=Hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new I,t=new Tn,i=new Vr,r=new I(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ft},normalMatrix:{value:new ke}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _u,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zi.setFromAxisAngle(e,t),this.quaternion.multiply(zi),this}rotateOnWorldAxis(e,t){return zi.setFromAxisAngle(e,t),this.quaternion.premultiply(zi),this}rotateX(e){return this.rotateOnAxis(Vl,e)}rotateY(e){return this.rotateOnAxis(Hl,e)}rotateZ(e){return this.rotateOnAxis(Gl,e)}translateOnAxis(e,t){return kl.copy(e).applyQuaternion(this.quaternion),this.position.add(kl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Vl,e)}translateY(e){return this.translateOnAxis(Hl,e)}translateZ(e){return this.translateOnAxis(Gl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?is.copy(e):is.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(Er,is,this.up):In.lookAt(is,Er,this.up),this.quaternion.setFromRotationMatrix(In),r&&(In.extractRotation(r.matrixWorld),zi.setFromRotationMatrix(In),this.quaternion.premultiply(zi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wl),ki.child=e,this.dispatchEvent(ki),ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(af),_o.child=e,this.dispatchEvent(_o),_o.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wl),ki.child=e,this.dispatchEvent(ki),ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,e,sf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,of,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Rt.DEFAULT_UP=new I(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new I,Un=new I,vo=new I,Dn=new I,Vi=new I,Hi=new I,Xl=new I,xo=new I,So=new I,yo=new I,Mo=new st,Eo=new st,bo=new st;class sn{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),cn.subVectors(e,t),r.cross(cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){cn.subVectors(r,t),Un.subVectors(i,t),vo.subVectors(e,t);const o=cn.dot(cn),a=cn.dot(Un),c=cn.dot(vo),l=Un.dot(Un),u=Un.dot(vo),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,p=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,Dn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Dn.x),c.addScaledVector(o,Dn.y),c.addScaledVector(a,Dn.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return Mo.setScalar(0),Eo.setScalar(0),bo.setScalar(0),Mo.fromBufferAttribute(e,t),Eo.fromBufferAttribute(e,i),bo.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Mo,s.x),o.addScaledVector(Eo,s.y),o.addScaledVector(bo,s.z),o}static isFrontFacing(e,t,i,r){return cn.subVectors(i,t),Un.subVectors(e,t),cn.cross(Un).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return cn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),cn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return sn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Vi.subVectors(r,i),Hi.subVectors(s,i),xo.subVectors(e,i);const c=Vi.dot(xo),l=Hi.dot(xo);if(c<=0&&l<=0)return t.copy(i);So.subVectors(e,r);const u=Vi.dot(So),d=Hi.dot(So);if(u>=0&&d<=u)return t.copy(r);const f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(Vi,o);yo.subVectors(e,s);const p=Vi.dot(yo),g=Hi.dot(yo);if(g>=0&&p<=g)return t.copy(s);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Hi,a);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return Xl.subVectors(s,r),a=(d-u)/(d-u+(p-g)),t.copy(r).addScaledVector(Xl,a);const h=1/(m+_+f);return o=_*h,a=f*h,t.copy(i).addScaledVector(Vi,o).addScaledVector(Hi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const vu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},rs={h:0,s:0,l:0};function wo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class $e{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ke.workingColorSpace){if(e=sl(e,1),t=Be(t,0,1),i=Be(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=wo(o,s,e+1/3),this.g=wo(o,s,e),this.b=wo(o,s,e-1/3)}return Ke.colorSpaceToWorking(this,r),this}setStyle(e,t=nn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){const i=vu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gn(e.r),this.g=Gn(e.g),this.b=Gn(e.b),this}copyLinearToSRGB(e){return this.r=ir(e.r),this.g=ir(e.g),this.b=ir(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return Ke.workingToColorSpace(It.copy(this),e),Math.round(Be(It.r*255,0,255))*65536+Math.round(Be(It.g*255,0,255))*256+Math.round(Be(It.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(It.copy(this),t);const i=It.r,r=It.g,s=It.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=nn){Ke.workingToColorSpace(It.copy(this),e);const t=It.r,i=It.g,r=It.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL(rs);const i=Pr(jn.h,rs.h,t),r=Pr(jn.s,rs.s,t),s=Pr(jn.l,rs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new $e;$e.NAMES=vu;let lf=0;class gr extends pr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=Hn(),this.name="",this.type="Material",this.blending=er,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ra,this.blendDst=sa,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ll,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ui,this.stencilZFail=Ui,this.stencilZPass=Ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==er&&(i.blending=this.blending),this.side!==si&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ra&&(i.blendSrc=this.blendSrc),this.blendDst!==sa&&(i.blendDst=this.blendDst),this.blendEquation!==xi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==sr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ll&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ui&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ui&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ui&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class js extends gr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Qa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new I,ss=new Fe;let cf=0;class pn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ga,this.updateRanges=[],this.gpuType=Bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ss.fromBufferAttribute(this,t),ss.applyMatrix3(e),this.setXY(t,ss.x,ss.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=un(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=et(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=un(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=un(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=un(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),i=et(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),i=et(i,this.array),r=et(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),i=et(i,this.array),r=et(r,this.array),s=et(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ga&&(e.usage=this.usage),e}}class xu extends pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Su extends pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class vt extends pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let uf=0;const tn=new ft,To=new Rt,Gi=new I,Yt=new ai,br=new ai,Et=new I;class zt extends pr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=Hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pu(e)?Su:xu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return tn.makeRotationFromQuaternion(e),this.applyMatrix4(tn),this}rotateX(e){return tn.makeRotationX(e),this.applyMatrix4(tn),this}rotateY(e){return tn.makeRotationY(e),this.applyMatrix4(tn),this}rotateZ(e){return tn.makeRotationZ(e),this.applyMatrix4(tn),this}translate(e,t,i){return tn.makeTranslation(e,t,i),this.applyMatrix4(tn),this}scale(e,t,i){return tn.makeScale(e,t,i),this.applyMatrix4(tn),this}lookAt(e){return To.lookAt(e),To.updateMatrix(),this.applyMatrix4(To.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new vt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Yt.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Yt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Yt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Yt.min),this.boundingBox.expandByPoint(Yt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const i=this.boundingSphere.center;if(Yt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];br.setFromBufferAttribute(a),this.morphTargetsRelative?(Et.addVectors(Yt.min,br.min),Yt.expandByPoint(Et),Et.addVectors(Yt.max,br.max),Yt.expandByPoint(Et)):(Yt.expandByPoint(br.min),Yt.expandByPoint(br.max))}Yt.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Et.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Et));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Et.fromBufferAttribute(a,l),c&&(Gi.fromBufferAttribute(e,l),Et.add(Gi)),r=Math.max(r,i.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let F=0;F<i.count;F++)a[F]=new I,c[F]=new I;const l=new I,u=new I,d=new I,f=new Fe,p=new Fe,g=new Fe,_=new I,m=new I;function h(F,E,y){l.fromBufferAttribute(i,F),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,y),f.fromBufferAttribute(s,F),p.fromBufferAttribute(s,E),g.fromBufferAttribute(s,y),u.sub(l),d.sub(l),p.sub(f),g.sub(f);const T=1/(p.x*g.y-g.x*p.y);isFinite(T)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(T),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(T),a[F].add(_),a[E].add(_),a[y].add(_),c[F].add(m),c[E].add(m),c[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let F=0,E=b.length;F<E;++F){const y=b[F],T=y.start,X=y.count;for(let k=T,G=T+X;k<G;k+=3)h(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const M=new I,S=new I,C=new I,R=new I;function P(F){C.fromBufferAttribute(r,F),R.copy(C);const E=a[F];M.copy(E),M.sub(C.multiplyScalar(C.dot(E))).normalize(),S.crossVectors(R,E);const T=S.dot(c[F])<0?-1:1;o.setXYZW(F,M.x,M.y,M.z,T)}for(let F=0,E=b.length;F<E;++F){const y=b[F],T=y.start,X=y.count;for(let k=T,G=T+X;k<G;k+=3)P(e.getX(k+0)),P(e.getX(k+1)),P(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new I,s=new I,o=new I,a=new I,c=new I,l=new I,u=new I,d=new I;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*u;for(let h=0;h<u;h++)f[g++]=l[p++]}return new pn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new zt,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,i);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,d=l.length;u<d;u++){const f=l[u],p=e(f,i);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],d=s[l];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $l=new ft,fi=new gu,os=new mr,ql=new I,as=new I,ls=new I,cs=new I,Ao=new I,us=new I,Yl=new I,ds=new I;class on extends Rt{constructor(e=new zt,t=new js){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){us.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],d=s[c];u!==0&&(Ao.fromBufferAttribute(d,e),o?us.addScaledVector(Ao,u):us.addScaledVector(Ao.sub(t),u))}t.add(us)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),os.copy(i.boundingSphere),os.applyMatrix4(s),fi.copy(e.ray).recast(e.near),!(os.containsPoint(fi.origin)===!1&&(fi.intersectSphere(os,ql)===null||fi.origin.distanceToSquared(ql)>(e.far-e.near)**2))&&($l.copy(s).invert(),fi.copy(e.ray).applyMatrix4($l),!(i.boundingBox!==null&&fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,fi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],h=o[m.materialIndex],b=Math.max(m.start,p.start),M=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=b,C=M;S<C;S+=3){const R=a.getX(S),P=a.getX(S+1),F=a.getX(S+2);r=hs(this,h,e,i,l,u,d,R,P,F),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,h=_;m<h;m+=3){const b=a.getX(m),M=a.getX(m+1),S=a.getX(m+2);r=hs(this,o,e,i,l,u,d,b,M,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],h=o[m.materialIndex],b=Math.max(m.start,p.start),M=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let S=b,C=M;S<C;S+=3){const R=S,P=S+1,F=S+2;r=hs(this,h,e,i,l,u,d,R,P,F),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,h=_;m<h;m+=3){const b=m,M=m+1,S=m+2;r=hs(this,o,e,i,l,u,d,b,M,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function df(n,e,t,i,r,s,o,a){let c;if(e.side===Gt?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===si,a),c===null)return null;ds.copy(a),ds.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ds);return l<t.near||l>t.far?null:{distance:l,point:ds.clone(),object:n}}function hs(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,as),n.getVertexPosition(c,ls),n.getVertexPosition(l,cs);const u=df(n,e,t,i,as,ls,cs,Yl);if(u){const d=new I;sn.getBarycoord(Yl,as,ls,cs,d),r&&(u.uv=sn.getInterpolatedAttribute(r,a,c,l,d,new Fe)),s&&(u.uv1=sn.getInterpolatedAttribute(s,a,c,l,d,new Fe)),o&&(u.normal=sn.getInterpolatedAttribute(o,a,c,l,d,new I),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new I,materialIndex:0};sn.getNormal(as,ls,cs,f.normal),u.face=f,u.barycoord=d}return u}class _r extends zt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],d=[];let f=0,p=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(u,3)),this.setAttribute("uv",new vt(d,2));function g(_,m,h,b,M,S,C,R,P,F,E){const y=S/P,T=C/F,X=S/2,k=C/2,G=R/2,K=P+1,q=F+1;let te=0,V=0;const oe=new I;for(let he=0;he<q;he++){const we=he*T-k;for(let He=0;He<K;He++){const ct=He*y-X;oe[_]=ct*b,oe[m]=we*M,oe[h]=G,l.push(oe.x,oe.y,oe.z),oe[_]=0,oe[m]=0,oe[h]=R>0?1:-1,u.push(oe.x,oe.y,oe.z),d.push(He/P),d.push(1-he/F),te+=1}}for(let he=0;he<F;he++)for(let we=0;we<P;we++){const He=f+we+K*he,ct=f+we+K*(he+1),it=f+(we+1)+K*(he+1),$=f+(we+1)+K*he;c.push(He,ct,$),c.push(ct,it,$),V+=6}a.addGroup(p,V,E),p+=V,f+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function cr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Ft(n){const e={};for(let t=0;t<n.length;t++){const i=cr(n[t]);for(const r in i)e[r]=i[r]}return e}function hf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function yu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const ur={clone:cr,merge:Ft};var ff=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bt extends gr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ff,this.fragmentShader=pf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cr(e.uniforms),this.uniformsGroups=hf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Mu extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Kn=new I,jl=new Fe,Kl=new Fe;class rn extends Mu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(tr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zr*2*Math.atan(Math.tan(tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Kn.x,Kn.y).multiplyScalar(-e/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Kn.x,Kn.y).multiplyScalar(-e/Kn.z)}getViewSize(e,t){return this.getViewBounds(e,jl,Kl),t.subVectors(Kl,jl)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(tr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Wi=-90,Xi=1;class mf extends Rt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new rn(Wi,Xi,e,t);r.layers=this.layers,this.add(r);const s=new rn(Wi,Xi,e,t);s.layers=this.layers,this.add(s);const o=new rn(Wi,Xi,e,t);o.layers=this.layers,this.add(o);const a=new rn(Wi,Xi,e,t);a.layers=this.layers,this.add(a);const c=new rn(Wi,Xi,e,t);c.layers=this.layers,this.add(c);const l=new rn(Wi,Xi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===En)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Vs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Eu extends Wt{constructor(e=[],t=or,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gf extends fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Eu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new _r(5,5,5),s=new Bt({name:"CubemapFromEquirect",uniforms:cr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gt,blending:kn});s.uniforms.tEquirect.value=t;const o=new on(r,s),a=t.minFilter;return t.minFilter===Mi&&(t.minFilter=Mn),new mf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class fs extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _f={type:"move"};class Co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),h=this._getHandJoint(l,_);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_f)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new fs;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class vf extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class xf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ga,this.updateRanges=[],this.version=0,this.uuid=Hn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dt=new I;class ei{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=un(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=et(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=un(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),i=et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),i=et(i,this.array),r=et(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),i=et(i,this.array),r=et(r,this.array),s=et(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new pn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ei(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ro=new I,Sf=new I,yf=new ke;class _i{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ro.subVectors(i,t).cross(Sf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ro),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||yf.getNormalMatrix(e),r=this.coplanarPoint(Ro).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new mr,Mf=new Fe(.5,.5),ps=new I;class al{constructor(e=new _i,t=new _i,i=new _i,r=new _i,s=new _i,o=new _i){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=En,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],d=s[5],f=s[6],p=s[7],g=s[8],_=s[9],m=s[10],h=s[11],b=s[12],M=s[13],S=s[14],C=s[15];if(r[0].setComponents(l-o,p-u,h-g,C-b).normalize(),r[1].setComponents(l+o,p+u,h+g,C+b).normalize(),r[2].setComponents(l+a,p+d,h+_,C+M).normalize(),r[3].setComponents(l-a,p-d,h-_,C-M).normalize(),i)r[4].setComponents(c,f,m,S).normalize(),r[5].setComponents(l-c,p-f,h-m,C-S).normalize();else if(r[4].setComponents(l-c,p-f,h-m,C-S).normalize(),t===En)r[5].setComponents(l+c,p+f,h+m,C+S).normalize();else if(t===Vs)r[5].setComponents(c,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(e){pi.center.set(0,0,0);const t=Mf.distanceTo(e.center);return pi.radius=.7071067811865476+t,pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ps.x=r.normal.x>0?e.max.x:e.min.x,ps.y=r.normal.y>0?e.max.y:e.min.y,ps.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ps)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ll extends gr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Gs=new I,Ws=new I,Zl=new ft,wr=new gu,ms=new mr,Po=new I,Ql=new I;class bu extends Rt{constructor(e=new zt,t=new ll){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Gs.fromBufferAttribute(t,r-1),Ws.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Gs.distanceTo(Ws);e.setAttribute("lineDistance",new vt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ms.copy(i.boundingSphere),ms.applyMatrix4(r),ms.radius+=s,e.ray.intersectsSphere(ms)===!1)return;Zl.copy(r).invert(),wr.copy(e.ray).applyMatrix4(Zl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const h=u.getX(_),b=u.getX(_+1),M=gs(this,e,wr,c,h,b,_);M&&t.push(M)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),h=gs(this,e,wr,c,_,m,g-1);h&&t.push(h)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const h=gs(this,e,wr,c,_,_+1,_);h&&t.push(h)}if(this.isLineLoop){const _=gs(this,e,wr,c,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function gs(n,e,t,i,r,s,o){const a=n.geometry.attributes.position;if(Gs.fromBufferAttribute(a,r),Ws.fromBufferAttribute(a,s),t.distanceSqToSegment(Gs,Ws,Po,Ql)>i)return;Po.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Po);if(!(l<e.near||l>e.far))return{distance:l,point:Ql.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const Jl=new I,ec=new I;class Ef extends bu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Jl.fromBufferAttribute(t,r),ec.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Jl.distanceTo(ec);e.setAttribute("lineDistance",new vt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class wu extends Wt{constructor(e,t,i=Ti,r,s,o,a=hn,c=hn,l,u=Or,d=1){if(u!==Or&&u!==Br)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ol(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Xs extends zt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],c=[],l=new I,u=new Fe;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const p=i+d/t*r;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new vt(o,3)),this.setAttribute("normal",new vt(a,3)),this.setAttribute("uv",new vt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}const _s=new I,vs=new I,Lo=new I,xs=new sn;class bf extends zt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(tr*t),o=e.getIndex(),a=e.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],u=["a","b","c"],d=new Array(3),f={},p=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:h}=xs;if(_.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),h.fromBufferAttribute(a,l[2]),xs.getNormal(Lo),d[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,d[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,d[2]=`${Math.round(h.x*r)},${Math.round(h.y*r)},${Math.round(h.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let b=0;b<3;b++){const M=(b+1)%3,S=d[b],C=d[M],R=xs[u[b]],P=xs[u[M]],F=`${S}_${C}`,E=`${C}_${S}`;E in f&&f[E]?(Lo.dot(f[E].normal)<=s&&(p.push(R.x,R.y,R.z),p.push(P.x,P.y,P.z)),f[E]=null):F in f||(f[F]={index0:l[b],index1:l[M],normal:Lo.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:m}=f[g];_s.fromBufferAttribute(a,_),vs.fromBufferAttribute(a,m),p.push(_s.x,_s.y,_s.z),p.push(vs.x,vs.y,vs.z)}this.setAttribute("position",new vt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Hr extends zt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,f=t/c,p=[],g=[],_=[],m=[];for(let h=0;h<u;h++){const b=h*f-o;for(let M=0;M<l;M++){const S=M*d-s;g.push(S,-b,0),_.push(0,0,1),m.push(M/a),m.push(1-h/c)}}for(let h=0;h<c;h++)for(let b=0;b<a;b++){const M=b+l*h,S=b+l*(h+1),C=b+1+l*(h+1),R=b+1+l*h;p.push(M,S,R),p.push(S,C,R)}this.setIndex(p),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(_,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hr(e.width,e.height,e.widthSegments,e.heightSegments)}}class cl extends zt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const u=[],d=new I,f=new I,p=[],g=[],_=[],m=[];for(let h=0;h<=i;h++){const b=[],M=h/i;let S=0;h===0&&o===0?S=.5/t:h===i&&c===Math.PI&&(S=-.5/t);for(let C=0;C<=t;C++){const R=C/t;d.x=-e*Math.cos(r+R*s)*Math.sin(o+M*a),d.y=e*Math.cos(o+M*a),d.z=e*Math.sin(r+R*s)*Math.sin(o+M*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),m.push(R+S,1-M),b.push(l++)}u.push(b)}for(let h=0;h<i;h++)for(let b=0;b<t;b++){const M=u[h][b+1],S=u[h][b],C=u[h+1][b],R=u[h+1][b+1];(h!==0||o>0)&&p.push(M,S,R),(h!==i-1||c<Math.PI)&&p.push(S,C,R)}this.setIndex(p),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(_,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class wf extends zt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],i=new Set,r=new I,s=new I;if(e.index!==null){const o=e.attributes.position,a=e.index;let c=e.groups;c.length===0&&(c=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,u=c.length;l<u;++l){const d=c[l],f=d.start,p=d.count;for(let g=f,_=f+p;g<_;g+=3)for(let m=0;m<3;m++){const h=a.getX(g+m),b=a.getX(g+(m+1)%3);r.fromBufferAttribute(o,h),s.fromBufferAttribute(o,b),tc(r,s,i)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{const o=e.attributes.position;for(let a=0,c=o.count/3;a<c;a++)for(let l=0;l<3;l++){const u=3*a+l,d=3*a+(l+1)%3;r.fromBufferAttribute(o,u),s.fromBufferAttribute(o,d),tc(r,s,i)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new vt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function tc(n,e,t){const i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(r)===!0?!1:(t.add(i),t.add(r),!0)}class Tf extends gr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hu,this.normalScale=new Fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Qa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Af extends gr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Cf extends gr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Tu extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Io=new ft,nc=new I,ic=new I;class Rf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Fe(512,512),this.mapType=wn,this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new al,this._frameExtents=new Fe(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;nc.setFromMatrixPosition(e.matrixWorld),t.position.copy(nc),ic.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ic),t.updateMatrixWorld(),Io.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Io,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Io)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ul extends Mu{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Pf extends Rf{constructor(){super(new ul(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Lf extends Tu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new Pf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class If extends Tu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Uf extends zt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Df extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Ff{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class Wa extends xf{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}const rc=new I,Ss=new I,$i=new I,qi=new I,Uo=new I,Nf=new I,Of=new I;class Bf{constructor(e=new I,t=new I){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){rc.subVectors(e,this.start),Ss.subVectors(this.end,this.start);const i=Ss.dot(Ss);let s=Ss.dot(rc)/i;return t&&(s=Be(s,0,1)),s}closestPointToPoint(e,t,i){const r=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=Nf,i=Of){const r=10000000000000001e-32;let s,o;const a=this.start,c=e.start,l=this.end,u=e.end;$i.subVectors(l,a),qi.subVectors(u,c),Uo.subVectors(a,c);const d=$i.dot($i),f=qi.dot(qi),p=qi.dot(Uo);if(d<=r&&f<=r)return t.copy(a),i.copy(c),t.sub(i),t.dot(t);if(d<=r)s=0,o=p/f,o=Be(o,0,1);else{const g=$i.dot(Uo);if(f<=r)o=0,s=Be(-g/d,0,1);else{const _=$i.dot(qi),m=d*f-_*_;m!==0?s=Be((_*p-g*f)/m,0,1):s=0,o=(_*s+p)/f,o<0?(o=0,s=Be(-g/d,0,1)):o>1&&(o=1,s=Be((_-g)/d,0,1))}}return t.copy(a).add($i.multiplyScalar(s)),i.copy(c).add(qi.multiplyScalar(o)),t.sub(i),t.dot(t)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function sc(n,e,t,i){const r=zf(i);switch(t){case au:return n*e;case cu:return n*e/r.components*r.byteLength;case nl:return n*e/r.components*r.byteLength;case uu:return n*e*2/r.components*r.byteLength;case il:return n*e*2/r.components*r.byteLength;case lu:return n*e*3/r.components*r.byteLength;case dn:return n*e*4/r.components*r.byteLength;case rl:return n*e*4/r.components*r.byteLength;case Ps:case Ls:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Is:case Us:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case va:case Sa:return Math.max(n,16)*Math.max(e,8)/4;case _a:case xa:return Math.max(n,8)*Math.max(e,8)/2;case ya:case Ma:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ta:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Aa:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ca:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ra:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Pa:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case La:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ia:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ua:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Da:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Fa:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Na:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Oa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ds:case Ba:case za:return Math.ceil(n/4)*Math.ceil(e/4)*16;case du:case ka:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Va:case Ha:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zf(n){switch(n){case wn:case ru:return{byteLength:1,components:1};case Fr:case su:case Vn:return{byteLength:2,components:1};case el:case tl:return{byteLength:2,components:4};case Ti:case Ja:case Bn:return{byteLength:4,components:1};case ou:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Za}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Za);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Au(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function kf(n){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){const u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<d.length;p++){const g=d[f],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,d[f]=_)}d.length=f+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];n.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var Vf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Gf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$f=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Yf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Kf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ep=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,tp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,op=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ap=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,cp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,up=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,dp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,hp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,fp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_p="gl_FragColor = linearToOutputTexel( gl_FragColor );",vp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Sp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Mp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ep=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,bp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Rp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ip=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Up=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Dp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Np=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Op=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Vp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Hp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$p=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Kp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,em=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,im=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,um=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,gm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_m=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ym=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Em=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Am=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Pm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Im=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Um=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Fm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const km=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$m=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,qm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ym=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,tg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ng=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ig=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,og=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ag=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,lg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ug=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,mg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_g=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,vg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:Vf,alphahash_pars_fragment:Hf,alphamap_fragment:Gf,alphamap_pars_fragment:Wf,alphatest_fragment:Xf,alphatest_pars_fragment:$f,aomap_fragment:qf,aomap_pars_fragment:Yf,batching_pars_vertex:jf,batching_vertex:Kf,begin_vertex:Zf,beginnormal_vertex:Qf,bsdfs:Jf,iridescence_fragment:ep,bumpmap_pars_fragment:tp,clipping_planes_fragment:np,clipping_planes_pars_fragment:ip,clipping_planes_pars_vertex:rp,clipping_planes_vertex:sp,color_fragment:op,color_pars_fragment:ap,color_pars_vertex:lp,color_vertex:cp,common:up,cube_uv_reflection_fragment:dp,defaultnormal_vertex:hp,displacementmap_pars_vertex:fp,displacementmap_vertex:pp,emissivemap_fragment:mp,emissivemap_pars_fragment:gp,colorspace_fragment:_p,colorspace_pars_fragment:vp,envmap_fragment:xp,envmap_common_pars_fragment:Sp,envmap_pars_fragment:yp,envmap_pars_vertex:Mp,envmap_physical_pars_fragment:Up,envmap_vertex:Ep,fog_vertex:bp,fog_pars_vertex:wp,fog_fragment:Tp,fog_pars_fragment:Ap,gradientmap_pars_fragment:Cp,lightmap_pars_fragment:Rp,lights_lambert_fragment:Pp,lights_lambert_pars_fragment:Lp,lights_pars_begin:Ip,lights_toon_fragment:Dp,lights_toon_pars_fragment:Fp,lights_phong_fragment:Np,lights_phong_pars_fragment:Op,lights_physical_fragment:Bp,lights_physical_pars_fragment:zp,lights_fragment_begin:kp,lights_fragment_maps:Vp,lights_fragment_end:Hp,logdepthbuf_fragment:Gp,logdepthbuf_pars_fragment:Wp,logdepthbuf_pars_vertex:Xp,logdepthbuf_vertex:$p,map_fragment:qp,map_pars_fragment:Yp,map_particle_fragment:jp,map_particle_pars_fragment:Kp,metalnessmap_fragment:Zp,metalnessmap_pars_fragment:Qp,morphinstance_vertex:Jp,morphcolor_vertex:em,morphnormal_vertex:tm,morphtarget_pars_vertex:nm,morphtarget_vertex:im,normal_fragment_begin:rm,normal_fragment_maps:sm,normal_pars_fragment:om,normal_pars_vertex:am,normal_vertex:lm,normalmap_pars_fragment:cm,clearcoat_normal_fragment_begin:um,clearcoat_normal_fragment_maps:dm,clearcoat_pars_fragment:hm,iridescence_pars_fragment:fm,opaque_fragment:pm,packing:mm,premultiplied_alpha_fragment:gm,project_vertex:_m,dithering_fragment:vm,dithering_pars_fragment:xm,roughnessmap_fragment:Sm,roughnessmap_pars_fragment:ym,shadowmap_pars_fragment:Mm,shadowmap_pars_vertex:Em,shadowmap_vertex:bm,shadowmask_pars_fragment:wm,skinbase_vertex:Tm,skinning_pars_vertex:Am,skinning_vertex:Cm,skinnormal_vertex:Rm,specularmap_fragment:Pm,specularmap_pars_fragment:Lm,tonemapping_fragment:Im,tonemapping_pars_fragment:Um,transmission_fragment:Dm,transmission_pars_fragment:Fm,uv_pars_fragment:Nm,uv_pars_vertex:Om,uv_vertex:Bm,worldpos_vertex:zm,background_vert:km,background_frag:Vm,backgroundCube_vert:Hm,backgroundCube_frag:Gm,cube_vert:Wm,cube_frag:Xm,depth_vert:$m,depth_frag:qm,distanceRGBA_vert:Ym,distanceRGBA_frag:jm,equirect_vert:Km,equirect_frag:Zm,linedashed_vert:Qm,linedashed_frag:Jm,meshbasic_vert:eg,meshbasic_frag:tg,meshlambert_vert:ng,meshlambert_frag:ig,meshmatcap_vert:rg,meshmatcap_frag:sg,meshnormal_vert:og,meshnormal_frag:ag,meshphong_vert:lg,meshphong_frag:cg,meshphysical_vert:ug,meshphysical_frag:dg,meshtoon_vert:hg,meshtoon_frag:fg,points_vert:pg,points_frag:mg,shadow_vert:gg,shadow_frag:_g,sprite_vert:vg,sprite_frag:xg},se={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new Fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Ht={basic:{uniforms:Ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new $e(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Ft([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Ft([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new $e(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Ft([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Ft([se.points,se.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Ft([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Ft([se.common,se.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Ft([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Ft([se.sprite,se.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Ft([se.common,se.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Ft([se.lights,se.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};Ht.physical={uniforms:Ft([Ht.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const ys={r:0,b:0,g:0},mi=new Tn,Sg=new ft;function yg(n,e,t,i,r,s,o){const a=new $e(0);let c=s===!0?0:1,l,u,d=null,f=0,p=null;function g(M){let S=M.isScene===!0?M.background:null;return S&&S.isTexture&&(S=(M.backgroundBlurriness>0?t:e).get(S)),S}function _(M){let S=!1;const C=g(M);C===null?h(a,c):C&&C.isColor&&(h(C,1),S=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(M,S){const C=g(S);C&&(C.isCubeTexture||C.mapping===Ys)?(u===void 0&&(u=new on(new _r(1,1,1),new Bt({name:"BackgroundCubeMaterial",uniforms:cr(Ht.backgroundCube.uniforms),vertexShader:Ht.backgroundCube.vertexShader,fragmentShader:Ht.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,P,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),mi.copy(S.backgroundRotation),mi.x*=-1,mi.y*=-1,mi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Sg.makeRotationFromEuler(mi)),u.material.toneMapped=Ke.getTransfer(C.colorSpace)!==nt,(d!==C||f!==C.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=C,f=C.version,p=n.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new on(new Hr(2,2),new Bt({name:"BackgroundMaterial",uniforms:cr(Ht.background.uniforms),vertexShader:Ht.background.vertexShader,fragmentShader:Ht.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(C.colorSpace)!==nt,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||f!==C.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,d=C,f=C.version,p=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function h(M,S){M.getRGB(ys,yu(n)),i.buffers.color.setClear(ys.r,ys.g,ys.b,S,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,S=1){a.set(M),c=S,h(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,h(a,c)},render:_,addToRenderList:m,dispose:b}}function Mg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(y,T,X,k,G){let K=!1;const q=d(k,X,T);s!==q&&(s=q,l(s.object)),K=p(y,k,X,G),K&&g(y,k,X,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,S(y,T,X,k),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return n.createVertexArray()}function l(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function d(y,T,X){const k=X.wireframe===!0;let G=i[y.id];G===void 0&&(G={},i[y.id]=G);let K=G[T.id];K===void 0&&(K={},G[T.id]=K);let q=K[k];return q===void 0&&(q=f(c()),K[k]=q),q}function f(y){const T=[],X=[],k=[];for(let G=0;G<t;G++)T[G]=0,X[G]=0,k[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:X,attributeDivisors:k,object:y,attributes:{},index:null}}function p(y,T,X,k){const G=s.attributes,K=T.attributes;let q=0;const te=X.getAttributes();for(const V in te)if(te[V].location>=0){const he=G[V];let we=K[V];if(we===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(we=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(we=y.instanceColor)),he===void 0||he.attribute!==we||we&&he.data!==we.data)return!0;q++}return s.attributesNum!==q||s.index!==k}function g(y,T,X,k){const G={},K=T.attributes;let q=0;const te=X.getAttributes();for(const V in te)if(te[V].location>=0){let he=K[V];he===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(he=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(he=y.instanceColor));const we={};we.attribute=he,he&&he.data&&(we.data=he.data),G[V]=we,q++}s.attributes=G,s.attributesNum=q,s.index=k}function _(){const y=s.newAttributes;for(let T=0,X=y.length;T<X;T++)y[T]=0}function m(y){h(y,0)}function h(y,T){const X=s.newAttributes,k=s.enabledAttributes,G=s.attributeDivisors;X[y]=1,k[y]===0&&(n.enableVertexAttribArray(y),k[y]=1),G[y]!==T&&(n.vertexAttribDivisor(y,T),G[y]=T)}function b(){const y=s.newAttributes,T=s.enabledAttributes;for(let X=0,k=T.length;X<k;X++)T[X]!==y[X]&&(n.disableVertexAttribArray(X),T[X]=0)}function M(y,T,X,k,G,K,q){q===!0?n.vertexAttribIPointer(y,T,X,G,K):n.vertexAttribPointer(y,T,X,k,G,K)}function S(y,T,X,k){_();const G=k.attributes,K=X.getAttributes(),q=T.defaultAttributeValues;for(const te in K){const V=K[te];if(V.location>=0){let oe=G[te];if(oe===void 0&&(te==="instanceMatrix"&&y.instanceMatrix&&(oe=y.instanceMatrix),te==="instanceColor"&&y.instanceColor&&(oe=y.instanceColor)),oe!==void 0){const he=oe.normalized,we=oe.itemSize,He=e.get(oe);if(He===void 0)continue;const ct=He.buffer,it=He.type,$=He.bytesPerElement,ae=it===n.INT||it===n.UNSIGNED_INT||oe.gpuType===Ja;if(oe.isInterleavedBufferAttribute){const ie=oe.data,Re=ie.stride,Pe=oe.offset;if(ie.isInstancedInterleavedBuffer){for(let Ne=0;Ne<V.locationSize;Ne++)h(V.location+Ne,ie.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Ne=0;Ne<V.locationSize;Ne++)m(V.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,ct);for(let Ne=0;Ne<V.locationSize;Ne++)M(V.location+Ne,we/V.locationSize,it,he,Re*$,(Pe+we/V.locationSize*Ne)*$,ae)}else{if(oe.isInstancedBufferAttribute){for(let ie=0;ie<V.locationSize;ie++)h(V.location+ie,oe.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ie=0;ie<V.locationSize;ie++)m(V.location+ie);n.bindBuffer(n.ARRAY_BUFFER,ct);for(let ie=0;ie<V.locationSize;ie++)M(V.location+ie,we/V.locationSize,it,he,we*$,we/V.locationSize*ie*$,ae)}}else if(q!==void 0){const he=q[te];if(he!==void 0)switch(he.length){case 2:n.vertexAttrib2fv(V.location,he);break;case 3:n.vertexAttrib3fv(V.location,he);break;case 4:n.vertexAttrib4fv(V.location,he);break;default:n.vertexAttrib1fv(V.location,he)}}}}b()}function C(){F();for(const y in i){const T=i[y];for(const X in T){const k=T[X];for(const G in k)u(k[G].object),delete k[G];delete T[X]}delete i[y]}}function R(y){if(i[y.id]===void 0)return;const T=i[y.id];for(const X in T){const k=T[X];for(const G in k)u(k[G].object),delete k[G];delete T[X]}delete i[y.id]}function P(y){for(const T in i){const X=i[T];if(X[y.id]===void 0)continue;const k=X[y.id];for(const G in k)u(k[G].object),delete k[G];delete X[y.id]}}function F(){E(),o=!0,s!==r&&(s=r,l(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:F,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function Eg(n,e,t){let i;function r(l){i=l}function s(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];t.update(p,i,1)}function c(l,u,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*f[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function bg(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(P){return!(P!==dn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const F=P===Vn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==wn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Bn&&!F)}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:S,vertexTextures:C,maxSamples:R}}function wg(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new _i,a=new ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||r;return r=f,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,h=n.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{const b=s?0:i,M=b*4;let S=h.clippingState||null;c.value=S,S=u(g,f,M,p);for(let C=0;C!==M;++C)S[C]=t[C];h.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const h=p+_*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<h)&&(m=new Float32Array(h));for(let M=0,S=p;M!==_;++M,S+=4)o.copy(d[M]).applyMatrix4(b,a),o.normal.toArray(m,S),m[S+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Tg(n){let e=new WeakMap;function t(o,a){return a===fa?o.mapping=or:a===pa&&(o.mapping=ar),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===fa||a===pa)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new gf(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const Zi=4,oc=[.125,.215,.35,.446,.526,.582],Si=20,Do=new ul,ac=new $e;let Fo=null,No=0,Oo=0,Bo=!1;const vi=(1+Math.sqrt(5))/2,Yi=1/vi,lc=[new I(-vi,Yi,0),new I(vi,Yi,0),new I(-Yi,0,vi),new I(Yi,0,vi),new I(0,vi,-Yi),new I(0,vi,Yi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],Ag=new I;class cc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=Ag}=s;Fo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Fo,No,Oo),this._renderer.xr.enabled=Bo,e.scissorTest=!1,Ms(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===or||e.mapping===ar?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Mn,minFilter:Mn,generateMipmaps:!1,type:Vn,format:dn,colorSpace:lr,depthBuffer:!1},r=uc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uc(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Cg(s)),this._blurMaterial=Rg(s,e,t)}return r}_compileMaterial(e){const t=new on(this._lodPlanes[0],e);this._renderer.compile(t,Do)}_sceneToCubeUV(e,t,i,r,s){const c=new rn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(ac),d.toneMapping=ni,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null));const _=new js({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),m=new on(new _r,_);let h=!1;const b=e.background;b?b.isColor&&(_.color.copy(b),e.background=null,h=!0):(_.color.copy(ac),h=!0);for(let M=0;M<6;M++){const S=M%3;S===0?(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[M],s.y,s.z)):S===1?(c.up.set(0,0,l[M]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[M],s.z)):(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[M]));const C=this._cubeSize;Ms(r,S*C,M>2?C:0,C,C),d.setRenderTarget(r),h&&d.render(m,c),d.render(e,c)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=f,e.background=b}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===or||e.mapping===ar;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=hc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dc());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new on(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Ms(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Do)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=lc[(r-s-1)%lc.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new on(this._lodPlanes[r],l),f=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Si-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Si;m>Si&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Si}`);const h=[];let b=0;for(let P=0;P<Si;++P){const F=P/_,E=Math.exp(-F*F/2);h.push(E),P===0?b+=E:P<m&&(b+=2*E)}for(let P=0;P<h.length;P++)h[P]=h[P]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-i;const S=this._sizeLods[r],C=3*S*(r>M-Zi?r-M+Zi:0),R=4*(this._cubeSize-S);Ms(t,C,R,3*S,2*S),c.setRenderTarget(t),c.render(d,Do)}}function Cg(n){const e=[],t=[],i=[];let r=n;const s=n-Zi+1+oc.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>n-Zi?c=oc[o-n+Zi-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,_=3,m=2,h=1,b=new Float32Array(_*g*p),M=new Float32Array(m*g*p),S=new Float32Array(h*g*p);for(let R=0;R<p;R++){const P=R%3*2/3-1,F=R>2?0:-1,E=[P,F,0,P+2/3,F,0,P+2/3,F+1,0,P,F,0,P+2/3,F+1,0,P,F+1,0];b.set(E,_*g*R),M.set(f,m*g*R);const y=[R,R,R,R,R,R];S.set(y,h*g*R)}const C=new zt;C.setAttribute("position",new pn(b,_)),C.setAttribute("uv",new pn(M,m)),C.setAttribute("faceIndex",new pn(S,h)),e.push(C),r>Zi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function uc(n,e,t){const i=new fn(n,e,t);return i.texture.mapping=Ys,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ms(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Rg(n,e,t){const i=new Float32Array(Si),r=new I(0,1,0);return new Bt({name:"SphericalGaussianBlur",defines:{n:Si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function dc(){return new Bt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function hc(){return new Bt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function dl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Pg(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===fa||c===pa,u=c===or||c===ar;if(l||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new cc(n)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return l&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new cc(n)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Lg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&nr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Ig(n,e,t,i){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(d){const f=d.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function l(d){const f=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const b=p.array;_=p.version;for(let M=0,S=b.length;M<S;M+=3){const C=b[M+0],R=b[M+1],P=b[M+2];f.push(C,R,R,P,P,C)}}else if(g!==void 0){const b=g.array;_=g.version;for(let M=0,S=b.length/3-1;M<S;M+=3){const C=M+0,R=M+1,P=M+2;f.push(C,R,R,P,P,C)}}else return;const m=new(pu(f)?Su:xu)(f,1);m.version=_;const h=s.get(d);h&&e.remove(h),s.set(d,m)}function u(d){const f=s.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function Ug(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,p){n.drawElements(i,p,s,f*o),t.update(p,i,1)}function l(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,s,f*o,g),t.update(p,i,g))}function u(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,g);let m=0;for(let h=0;h<g;h++)m+=p[h];t.update(m,i,1)}function d(f,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)l(f[h]/o,p[h],_[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,_,0,g);let h=0;for(let b=0;b<g;b++)h+=p[b]*_[b];t.update(h,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Dg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Fg(n,e,t){const i=new WeakMap,r=new st;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==d){let E=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],h=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let M=0;p===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let S=a.attributes.position.count*M,C=1;S>e.maxTextureSize&&(C=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const R=new Float32Array(S*C*4*d),P=new mu(R,S,C,d);P.type=Bn,P.needsUpdate=!0;const F=M*4;for(let y=0;y<d;y++){const T=m[y],X=h[y],k=b[y],G=S*C*4*y;for(let K=0;K<T.count;K++){const q=K*F;p===!0&&(r.fromBufferAttribute(T,K),R[G+q+0]=r.x,R[G+q+1]=r.y,R[G+q+2]=r.z,R[G+q+3]=0),g===!0&&(r.fromBufferAttribute(X,K),R[G+q+4]=r.x,R[G+q+5]=r.y,R[G+q+6]=r.z,R[G+q+7]=0),_===!0&&(r.fromBufferAttribute(k,K),R[G+q+8]=r.x,R[G+q+9]=r.y,R[G+q+10]=r.z,R[G+q+11]=k.itemSize===4?r.w:1)}}f={count:d,texture:P,size:new Fe(S,C)},i.set(a,f),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];const g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function Ng(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return d}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}const Cu=new Wt,fc=new wu(1,1),Ru=new mu,Pu=new Jh,Lu=new Eu,pc=[],mc=[],gc=new Float32Array(16),_c=new Float32Array(9),vc=new Float32Array(4);function vr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=pc[r];if(s===void 0&&(s=new Float32Array(r),pc[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function St(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ks(n,e){let t=mc[e];t===void 0&&(t=new Int32Array(e),mc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Og(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Bg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2fv(this.addr,e),yt(t,e)}}function zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;n.uniform3fv(this.addr,e),yt(t,e)}}function kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4fv(this.addr,e),yt(t,e)}}function Vg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;vc.set(i),n.uniformMatrix2fv(this.addr,!1,vc),yt(t,i)}}function Hg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;_c.set(i),n.uniformMatrix3fv(this.addr,!1,_c),yt(t,i)}}function Gg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;gc.set(i),n.uniformMatrix4fv(this.addr,!1,gc),yt(t,i)}}function Wg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Xg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2iv(this.addr,e),yt(t,e)}}function $g(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3iv(this.addr,e),yt(t,e)}}function qg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4iv(this.addr,e),yt(t,e)}}function Yg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2uiv(this.addr,e),yt(t,e)}}function Kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3uiv(this.addr,e),yt(t,e)}}function Zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4uiv(this.addr,e),yt(t,e)}}function Qg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(fc.compareFunction=fu,s=fc):s=Cu,t.setTexture2D(e||s,r)}function Jg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Pu,r)}function e_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Lu,r)}function t_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ru,r)}function n_(n){switch(n){case 5126:return Og;case 35664:return Bg;case 35665:return zg;case 35666:return kg;case 35674:return Vg;case 35675:return Hg;case 35676:return Gg;case 5124:case 35670:return Wg;case 35667:case 35671:return Xg;case 35668:case 35672:return $g;case 35669:case 35673:return qg;case 5125:return Yg;case 36294:return jg;case 36295:return Kg;case 36296:return Zg;case 35678:case 36198:case 36298:case 36306:case 35682:return Qg;case 35679:case 36299:case 36307:return Jg;case 35680:case 36300:case 36308:case 36293:return e_;case 36289:case 36303:case 36311:case 36292:return t_}}function i_(n,e){n.uniform1fv(this.addr,e)}function r_(n,e){const t=vr(e,this.size,2);n.uniform2fv(this.addr,t)}function s_(n,e){const t=vr(e,this.size,3);n.uniform3fv(this.addr,t)}function o_(n,e){const t=vr(e,this.size,4);n.uniform4fv(this.addr,t)}function a_(n,e){const t=vr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function l_(n,e){const t=vr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function c_(n,e){const t=vr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function u_(n,e){n.uniform1iv(this.addr,e)}function d_(n,e){n.uniform2iv(this.addr,e)}function h_(n,e){n.uniform3iv(this.addr,e)}function f_(n,e){n.uniform4iv(this.addr,e)}function p_(n,e){n.uniform1uiv(this.addr,e)}function m_(n,e){n.uniform2uiv(this.addr,e)}function g_(n,e){n.uniform3uiv(this.addr,e)}function __(n,e){n.uniform4uiv(this.addr,e)}function v_(n,e,t){const i=this.cache,r=e.length,s=Ks(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Cu,s[o])}function x_(n,e,t){const i=this.cache,r=e.length,s=Ks(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Pu,s[o])}function S_(n,e,t){const i=this.cache,r=e.length,s=Ks(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Lu,s[o])}function y_(n,e,t){const i=this.cache,r=e.length,s=Ks(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Ru,s[o])}function M_(n){switch(n){case 5126:return i_;case 35664:return r_;case 35665:return s_;case 35666:return o_;case 35674:return a_;case 35675:return l_;case 35676:return c_;case 5124:case 35670:return u_;case 35667:case 35671:return d_;case 35668:case 35672:return h_;case 35669:case 35673:return f_;case 5125:return p_;case 36294:return m_;case 36295:return g_;case 36296:return __;case 35678:case 36198:case 36298:case 36306:case 35682:return v_;case 35679:case 36299:case 36307:return x_;case 35680:case 36300:case 36308:case 36293:return S_;case 36289:case 36303:case 36311:case 36292:return y_}}class E_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=n_(t.type)}}class b_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=M_(t.type)}}class w_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const zo=/(\w+)(\])?(\[|\.)?/g;function xc(n,e){n.seq.push(e),n.map[e.id]=e}function T_(n,e,t){const i=n.name,r=i.length;for(zo.lastIndex=0;;){const s=zo.exec(i),o=zo.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){xc(t,l===void 0?new E_(a,n,e):new b_(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new w_(a),xc(t,d)),t=d}}}class Fs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);T_(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Sc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const A_=37297;let C_=0;function R_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const yc=new ke;function P_(n){Ke._getMatrix(yc,Ke.workingColorSpace,n);const e=`mat3( ${yc.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(n)){case ks:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Mc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+R_(n.getShaderSource(e),a)}else return s}function L_(n,e){const t=P_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function I_(n,e){let t;switch(e){case dh:t="Linear";break;case hh:t="Reinhard";break;case fh:t="Cineon";break;case ph:t="ACESFilmic";break;case gh:t="AgX";break;case _h:t="Neutral";break;case mh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Es=new I;function U_(){Ke.getLuminanceCoefficients(Es);const n=Es.x.toFixed(4),e=Es.y.toFixed(4),t=Es.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function D_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rr).join(`
`)}function F_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function N_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Rr(n){return n!==""}function Ec(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const O_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xa(n){return n.replace(O_,z_)}const B_=new Map;function z_(n,e){let t=Ve[e];if(t===void 0){const i=B_.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Xa(t)}const k_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wc(n){return n.replace(k_,V_)}function V_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Tc(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function H_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===nu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Wd?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Fn&&(e="SHADOWMAP_TYPE_VSM"),e}function G_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case or:case ar:e="ENVMAP_TYPE_CUBE";break;case Ys:e="ENVMAP_TYPE_CUBE_UV";break}return e}function W_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ar:e="ENVMAP_MODE_REFRACTION";break}return e}function X_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Qa:e="ENVMAP_BLENDING_MULTIPLY";break;case ch:e="ENVMAP_BLENDING_MIX";break;case uh:e="ENVMAP_BLENDING_ADD";break}return e}function $_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function q_(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=H_(t),l=G_(t),u=W_(t),d=X_(t),f=$_(t),p=D_(t),g=F_(s),_=r.createProgram();let m,h,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Rr).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Rr).join(`
`),h.length>0&&(h+=`
`)):(m=[Tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rr).join(`
`),h=[Tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?Ve.tonemapping_pars_fragment:"",t.toneMapping!==ni?I_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,L_("linearToOutputTexel",t.outputColorSpace),U_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Rr).join(`
`)),o=Xa(o),o=Ec(o,t),o=bc(o,t),a=Xa(a),a=Ec(a,t),a=bc(a,t),o=wc(o),a=wc(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===Il?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Il?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const M=b+m+o,S=b+h+a,C=Sc(r,r.VERTEX_SHADER,M),R=Sc(r,r.FRAGMENT_SHADER,S);r.attachShader(_,C),r.attachShader(_,R),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function P(T){if(n.debug.checkShaderErrors){const X=r.getProgramInfoLog(_)||"",k=r.getShaderInfoLog(C)||"",G=r.getShaderInfoLog(R)||"",K=X.trim(),q=k.trim(),te=G.trim();let V=!0,oe=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,C,R);else{const he=Mc(r,C,"vertex"),we=Mc(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+K+`
`+he+`
`+we)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(q===""||te==="")&&(oe=!1);oe&&(T.diagnostics={runnable:V,programLog:K,vertexShader:{log:q,prefix:m},fragmentShader:{log:te,prefix:h}})}r.deleteShader(C),r.deleteShader(R),F=new Fs(r,_),E=N_(r,_)}let F;this.getUniforms=function(){return F===void 0&&P(this),F};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(_,A_)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=C_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=R,this}let Y_=0;class j_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new K_(e),t.set(e,i)),i}}class K_{constructor(e){this.id=Y_++,this.code=e,this.usedTimes=0}}function Z_(n,e,t,i,r,s,o){const a=new _u,c=new j_,l=new Set,u=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,y,T,X,k){const G=X.fog,K=k.geometry,q=E.isMeshStandardMaterial?X.environment:null,te=(E.isMeshStandardMaterial?t:e).get(E.envMap||q),V=te&&te.mapping===Ys?te.image.height:null,oe=g[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const he=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,we=he!==void 0?he.length:0;let He=0;K.morphAttributes.position!==void 0&&(He=1),K.morphAttributes.normal!==void 0&&(He=2),K.morphAttributes.color!==void 0&&(He=3);let ct,it,$,ae;if(oe){const Qe=Ht[oe];ct=Qe.vertexShader,it=Qe.fragmentShader}else ct=E.vertexShader,it=E.fragmentShader,c.update(E),$=c.getVertexShaderID(E),ae=c.getFragmentShaderID(E);const ie=n.getRenderTarget(),Re=n.state.buffers.depth.getReversed(),Pe=k.isInstancedMesh===!0,Ne=k.isBatchedMesh===!0,gt=!!E.map,Ye=!!E.matcap,A=!!te,ot=!!E.aoMap,Ae=!!E.lightMap,Ze=!!E.bumpMap,be=!!E.normalMap,ut=!!E.displacementMap,ge=!!E.emissiveMap,Ge=!!E.metalnessMap,Mt=!!E.roughnessMap,_t=E.anisotropy>0,w=E.clearcoat>0,v=E.dispersion>0,O=E.iridescence>0,W=E.sheen>0,j=E.transmission>0,H=_t&&!!E.anisotropyMap,Ee=w&&!!E.clearcoatMap,ne=w&&!!E.clearcoatNormalMap,Se=w&&!!E.clearcoatRoughnessMap,ye=O&&!!E.iridescenceMap,J=O&&!!E.iridescenceThicknessMap,ue=W&&!!E.sheenColorMap,Ie=W&&!!E.sheenRoughnessMap,Me=!!E.specularMap,le=!!E.specularColorMap,ze=!!E.specularIntensityMap,L=j&&!!E.transmissionMap,ee=j&&!!E.thicknessMap,re=!!E.gradientMap,me=!!E.alphaMap,Z=E.alphaTest>0,Y=!!E.alphaHash,ve=!!E.extensions;let Oe=ni;E.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Oe=n.toneMapping);const at={shaderID:oe,shaderType:E.type,shaderName:E.name,vertexShader:ct,fragmentShader:it,defines:E.defines,customVertexShaderID:$,customFragmentShaderID:ae,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Ne,batchingColor:Ne&&k._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&k.instanceColor!==null,instancingMorph:Pe&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:lr,alphaToCoverage:!!E.alphaToCoverage,map:gt,matcap:Ye,envMap:A,envMapMode:A&&te.mapping,envMapCubeUVHeight:V,aoMap:ot,lightMap:Ae,bumpMap:Ze,normalMap:be,displacementMap:f&&ut,emissiveMap:ge,normalMapObjectSpace:be&&E.normalMapType===yh,normalMapTangentSpace:be&&E.normalMapType===hu,metalnessMap:Ge,roughnessMap:Mt,anisotropy:_t,anisotropyMap:H,clearcoat:w,clearcoatMap:Ee,clearcoatNormalMap:ne,clearcoatRoughnessMap:Se,dispersion:v,iridescence:O,iridescenceMap:ye,iridescenceThicknessMap:J,sheen:W,sheenColorMap:ue,sheenRoughnessMap:Ie,specularMap:Me,specularColorMap:le,specularIntensityMap:ze,transmission:j,transmissionMap:L,thicknessMap:ee,gradientMap:re,opaque:E.transparent===!1&&E.blending===er&&E.alphaToCoverage===!1,alphaMap:me,alphaTest:Z,alphaHash:Y,combine:E.combine,mapUv:gt&&_(E.map.channel),aoMapUv:ot&&_(E.aoMap.channel),lightMapUv:Ae&&_(E.lightMap.channel),bumpMapUv:Ze&&_(E.bumpMap.channel),normalMapUv:be&&_(E.normalMap.channel),displacementMapUv:ut&&_(E.displacementMap.channel),emissiveMapUv:ge&&_(E.emissiveMap.channel),metalnessMapUv:Ge&&_(E.metalnessMap.channel),roughnessMapUv:Mt&&_(E.roughnessMap.channel),anisotropyMapUv:H&&_(E.anisotropyMap.channel),clearcoatMapUv:Ee&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:ne&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:J&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&_(E.sheenRoughnessMap.channel),specularMapUv:Me&&_(E.specularMap.channel),specularColorMapUv:le&&_(E.specularColorMap.channel),specularIntensityMapUv:ze&&_(E.specularIntensityMap.channel),transmissionMapUv:L&&_(E.transmissionMap.channel),thicknessMapUv:ee&&_(E.thicknessMap.channel),alphaMapUv:me&&_(E.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(be||_t),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!K.attributes.uv&&(gt||me),fog:!!G,useFog:E.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Re,skinning:k.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:He,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&T.length>0,shadowMapType:n.shadowMap.type,toneMapping:Oe,decodeVideoTexture:gt&&E.map.isVideoTexture===!0&&Ke.getTransfer(E.map.colorSpace)===nt,decodeVideoTextureEmissive:ge&&E.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(E.emissiveMap.colorSpace)===nt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===On,flipSided:E.side===Gt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:ve&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&E.extensions.multiDraw===!0||Ne)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return at.vertexUv1s=l.has(1),at.vertexUv2s=l.has(2),at.vertexUv3s=l.has(3),l.clear(),at}function h(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const T in E.defines)y.push(T),y.push(E.defines[T]);return E.isRawShaderMaterial===!1&&(b(y,E),M(y,E),y.push(n.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function b(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function M(E,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),E.push(a.mask)}function S(E){const y=g[E.type];let T;if(y){const X=Ht[y];T=ur.clone(X.uniforms)}else T=E.uniforms;return T}function C(E,y){let T;for(let X=0,k=u.length;X<k;X++){const G=u[X];if(G.cacheKey===y){T=G,++T.usedTimes;break}}return T===void 0&&(T=new q_(n,y,E,s),u.push(T)),T}function R(E){if(--E.usedTimes===0){const y=u.indexOf(E);u[y]=u[u.length-1],u.pop(),E.destroy()}}function P(E){c.remove(E)}function F(){c.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:S,acquireProgram:C,releaseProgram:R,releaseShaderCache:P,programs:u,dispose:F}}function Q_(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function J_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Ac(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Cc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d,f,p,g,_,m){let h=n[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=_,h.group=m),e++,h}function a(d,f,p,g,_,m){const h=o(d,f,p,g,_,m);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):t.push(h)}function c(d,f,p,g,_,m){const h=o(d,f,p,g,_,m);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):t.unshift(h)}function l(d,f){t.length>1&&t.sort(d||J_),i.length>1&&i.sort(f||Ac),r.length>1&&r.sort(f||Ac)}function u(){for(let d=e,f=n.length;d<f;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function e0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Cc,n.set(i,[o])):r>=s.length?(o=new Cc,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function t0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new $e};break;case"SpotLight":t={position:new I,direction:new I,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=t,t}}}function n0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let i0=0;function r0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function s0(n){const e=new t0,t=n0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new I);const r=new I,s=new ft,o=new ft;function a(l){let u=0,d=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,_=0,m=0,h=0,b=0,M=0,S=0,C=0,R=0,P=0;l.sort(r0);for(let E=0,y=l.length;E<y;E++){const T=l[E],X=T.color,k=T.intensity,G=T.distance,K=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)u+=X.r*k,d+=X.g*k,f+=X.b*k;else if(T.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(T.sh.coefficients[q],k);P++}else if(T.isDirectionalLight){const q=e.get(T);if(q.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const te=T.shadow,V=t.get(T);V.shadowIntensity=te.intensity,V.shadowBias=te.bias,V.shadowNormalBias=te.normalBias,V.shadowRadius=te.radius,V.shadowMapSize=te.mapSize,i.directionalShadow[p]=V,i.directionalShadowMap[p]=K,i.directionalShadowMatrix[p]=T.shadow.matrix,b++}i.directional[p]=q,p++}else if(T.isSpotLight){const q=e.get(T);q.position.setFromMatrixPosition(T.matrixWorld),q.color.copy(X).multiplyScalar(k),q.distance=G,q.coneCos=Math.cos(T.angle),q.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),q.decay=T.decay,i.spot[_]=q;const te=T.shadow;if(T.map&&(i.spotLightMap[C]=T.map,C++,te.updateMatrices(T),T.castShadow&&R++),i.spotLightMatrix[_]=te.matrix,T.castShadow){const V=t.get(T);V.shadowIntensity=te.intensity,V.shadowBias=te.bias,V.shadowNormalBias=te.normalBias,V.shadowRadius=te.radius,V.shadowMapSize=te.mapSize,i.spotShadow[_]=V,i.spotShadowMap[_]=K,S++}_++}else if(T.isRectAreaLight){const q=e.get(T);q.color.copy(X).multiplyScalar(k),q.halfWidth.set(T.width*.5,0,0),q.halfHeight.set(0,T.height*.5,0),i.rectArea[m]=q,m++}else if(T.isPointLight){const q=e.get(T);if(q.color.copy(T.color).multiplyScalar(T.intensity),q.distance=T.distance,q.decay=T.decay,T.castShadow){const te=T.shadow,V=t.get(T);V.shadowIntensity=te.intensity,V.shadowBias=te.bias,V.shadowNormalBias=te.normalBias,V.shadowRadius=te.radius,V.shadowMapSize=te.mapSize,V.shadowCameraNear=te.camera.near,V.shadowCameraFar=te.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=K,i.pointShadowMatrix[g]=T.shadow.matrix,M++}i.point[g]=q,g++}else if(T.isHemisphereLight){const q=e.get(T);q.skyColor.copy(T.color).multiplyScalar(k),q.groundColor.copy(T.groundColor).multiplyScalar(k),i.hemi[h]=q,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const F=i.hash;(F.directionalLength!==p||F.pointLength!==g||F.spotLength!==_||F.rectAreaLength!==m||F.hemiLength!==h||F.numDirectionalShadows!==b||F.numPointShadows!==M||F.numSpotShadows!==S||F.numSpotMaps!==C||F.numLightProbes!==P)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=S+C-R,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=P,F.directionalLength=p,F.pointLength=g,F.spotLength=_,F.rectAreaLength=m,F.hemiLength=h,F.numDirectionalShadows=b,F.numPointShadows=M,F.numSpotShadows=S,F.numSpotMaps=C,F.numLightProbes=P,i.version=i0++)}function c(l,u){let d=0,f=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let h=0,b=l.length;h<b;h++){const M=l[h];if(M.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(M.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const S=i.hemi[_];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:i}}function Rc(n){const e=new s0(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function o0(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Rc(n),e.set(r,[a])):s>=o.length?(a=new Rc(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const a0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,l0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function c0(n,e,t){let i=new al;const r=new Fe,s=new Fe,o=new st,a=new Af({depthPacking:Sh}),c=new Cf,l={},u=t.maxTextureSize,d={[si]:Gt,[Gt]:si,[On]:On},f=new Bt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Fe},radius:{value:4}},vertexShader:a0,fragmentShader:l0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new zt;g.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new on(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nu;let h=this.type;this.render=function(R,P,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const E=n.getRenderTarget(),y=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),X=n.state;X.setBlending(kn),X.buffers.depth.getReversed()?X.buffers.color.setClear(0,0,0,0):X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const k=h!==Fn&&this.type===Fn,G=h===Fn&&this.type!==Fn;for(let K=0,q=R.length;K<q;K++){const te=R[K],V=te.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const oe=V.getFrameExtents();if(r.multiply(oe),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/oe.x),r.x=s.x*oe.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/oe.y),r.y=s.y*oe.y,V.mapSize.y=s.y)),V.map===null||k===!0||G===!0){const we=this.type!==Fn?{minFilter:hn,magFilter:hn}:{};V.map!==null&&V.map.dispose(),V.map=new fn(r.x,r.y,we),V.map.texture.name=te.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const he=V.getViewportCount();for(let we=0;we<he;we++){const He=V.getViewport(we);o.set(s.x*He.x,s.y*He.y,s.x*He.z,s.y*He.w),X.viewport(o),V.updateMatrices(te,we),i=V.getFrustum(),S(P,F,V.camera,te,this.type)}V.isPointLightShadow!==!0&&this.type===Fn&&b(V,F),V.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(E,y,T)};function b(R,P){const F=e.update(_);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new fn(r.x,r.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(P,null,F,f,_,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(P,null,F,p,_,null)}function M(R,P,F,E){let y=null;const T=F.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(T!==void 0)y=T;else if(y=F.isPointLight===!0?c:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const X=y.uuid,k=P.uuid;let G=l[X];G===void 0&&(G={},l[X]=G);let K=G[k];K===void 0&&(K=y.clone(),G[k]=K,P.addEventListener("dispose",C)),y=K}if(y.visible=P.visible,y.wireframe=P.wireframe,E===Fn?y.side=P.shadowSide!==null?P.shadowSide:P.side:y.side=P.shadowSide!==null?P.shadowSide:d[P.side],y.alphaMap=P.alphaMap,y.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,y.map=P.map,y.clipShadows=P.clipShadows,y.clippingPlanes=P.clippingPlanes,y.clipIntersection=P.clipIntersection,y.displacementMap=P.displacementMap,y.displacementScale=P.displacementScale,y.displacementBias=P.displacementBias,y.wireframeLinewidth=P.wireframeLinewidth,y.linewidth=P.linewidth,F.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const X=n.properties.get(y);X.light=F}return y}function S(R,P,F,E,y){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&y===Fn)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,R.matrixWorld);const k=e.update(R),G=R.material;if(Array.isArray(G)){const K=k.groups;for(let q=0,te=K.length;q<te;q++){const V=K[q],oe=G[V.materialIndex];if(oe&&oe.visible){const he=M(R,oe,E,y);R.onBeforeShadow(n,R,P,F,k,he,V),n.renderBufferDirect(F,null,k,he,R,V),R.onAfterShadow(n,R,P,F,k,he,V)}}}else if(G.visible){const K=M(R,G,E,y);R.onBeforeShadow(n,R,P,F,k,K,null),n.renderBufferDirect(F,null,k,K,R,null),R.onAfterShadow(n,R,P,F,k,K,null)}}const X=R.children;for(let k=0,G=X.length;k<G;k++)S(X[k],P,F,E,y)}function C(R){R.target.removeEventListener("dispose",C);for(const F in l){const E=l[F],y=R.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const u0={[oa]:aa,[la]:da,[ca]:ha,[sr]:ua,[aa]:oa,[da]:la,[ha]:ca,[ua]:sr};function d0(n,e){function t(){let L=!1;const ee=new st;let re=null;const me=new st(0,0,0,0);return{setMask:function(Z){re!==Z&&!L&&(n.colorMask(Z,Z,Z,Z),re=Z)},setLocked:function(Z){L=Z},setClear:function(Z,Y,ve,Oe,at){at===!0&&(Z*=Oe,Y*=Oe,ve*=Oe),ee.set(Z,Y,ve,Oe),me.equals(ee)===!1&&(n.clearColor(Z,Y,ve,Oe),me.copy(ee))},reset:function(){L=!1,re=null,me.set(-1,0,0,0)}}}function i(){let L=!1,ee=!1,re=null,me=null,Z=null;return{setReversed:function(Y){if(ee!==Y){const ve=e.get("EXT_clip_control");Y?ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.ZERO_TO_ONE_EXT):ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.NEGATIVE_ONE_TO_ONE_EXT),ee=Y;const Oe=Z;Z=null,this.setClear(Oe)}},getReversed:function(){return ee},setTest:function(Y){Y?ie(n.DEPTH_TEST):Re(n.DEPTH_TEST)},setMask:function(Y){re!==Y&&!L&&(n.depthMask(Y),re=Y)},setFunc:function(Y){if(ee&&(Y=u0[Y]),me!==Y){switch(Y){case oa:n.depthFunc(n.NEVER);break;case aa:n.depthFunc(n.ALWAYS);break;case la:n.depthFunc(n.LESS);break;case sr:n.depthFunc(n.LEQUAL);break;case ca:n.depthFunc(n.EQUAL);break;case ua:n.depthFunc(n.GEQUAL);break;case da:n.depthFunc(n.GREATER);break;case ha:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=Y}},setLocked:function(Y){L=Y},setClear:function(Y){Z!==Y&&(ee&&(Y=1-Y),n.clearDepth(Y),Z=Y)},reset:function(){L=!1,re=null,me=null,Z=null,ee=!1}}}function r(){let L=!1,ee=null,re=null,me=null,Z=null,Y=null,ve=null,Oe=null,at=null;return{setTest:function(Qe){L||(Qe?ie(n.STENCIL_TEST):Re(n.STENCIL_TEST))},setMask:function(Qe){ee!==Qe&&!L&&(n.stencilMask(Qe),ee=Qe)},setFunc:function(Qe,Rn,gn){(re!==Qe||me!==Rn||Z!==gn)&&(n.stencilFunc(Qe,Rn,gn),re=Qe,me=Rn,Z=gn)},setOp:function(Qe,Rn,gn){(Y!==Qe||ve!==Rn||Oe!==gn)&&(n.stencilOp(Qe,Rn,gn),Y=Qe,ve=Rn,Oe=gn)},setLocked:function(Qe){L=Qe},setClear:function(Qe){at!==Qe&&(n.clearStencil(Qe),at=Qe)},reset:function(){L=!1,ee=null,re=null,me=null,Z=null,Y=null,ve=null,Oe=null,at=null}}}const s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap;let u={},d={},f=new WeakMap,p=[],g=null,_=!1,m=null,h=null,b=null,M=null,S=null,C=null,R=null,P=new $e(0,0,0),F=0,E=!1,y=null,T=null,X=null,k=null,G=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,te=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(V)[1]),q=te>=1):V.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),q=te>=2);let oe=null,he={};const we=n.getParameter(n.SCISSOR_BOX),He=n.getParameter(n.VIEWPORT),ct=new st().fromArray(we),it=new st().fromArray(He);function $(L,ee,re,me){const Z=new Uint8Array(4),Y=n.createTexture();n.bindTexture(L,Y),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ve=0;ve<re;ve++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(ee,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,Z):n.texImage2D(ee+ve,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Z);return Y}const ae={};ae[n.TEXTURE_2D]=$(n.TEXTURE_2D,n.TEXTURE_2D,1),ae[n.TEXTURE_CUBE_MAP]=$(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[n.TEXTURE_2D_ARRAY]=$(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ae[n.TEXTURE_3D]=$(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ie(n.DEPTH_TEST),o.setFunc(sr),Ze(!1),be(Cl),ie(n.CULL_FACE),ot(kn);function ie(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function Re(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function Pe(L,ee){return d[L]!==ee?(n.bindFramebuffer(L,ee),d[L]=ee,L===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ee),L===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ee),!0):!1}function Ne(L,ee){let re=p,me=!1;if(L){re=f.get(ee),re===void 0&&(re=[],f.set(ee,re));const Z=L.textures;if(re.length!==Z.length||re[0]!==n.COLOR_ATTACHMENT0){for(let Y=0,ve=Z.length;Y<ve;Y++)re[Y]=n.COLOR_ATTACHMENT0+Y;re.length=Z.length,me=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,me=!0);me&&n.drawBuffers(re)}function gt(L){return g!==L?(n.useProgram(L),g=L,!0):!1}const Ye={[xi]:n.FUNC_ADD,[$d]:n.FUNC_SUBTRACT,[qd]:n.FUNC_REVERSE_SUBTRACT};Ye[Yd]=n.MIN,Ye[jd]=n.MAX;const A={[Kd]:n.ZERO,[Zd]:n.ONE,[Qd]:n.SRC_COLOR,[ra]:n.SRC_ALPHA,[rh]:n.SRC_ALPHA_SATURATE,[nh]:n.DST_COLOR,[eh]:n.DST_ALPHA,[Jd]:n.ONE_MINUS_SRC_COLOR,[sa]:n.ONE_MINUS_SRC_ALPHA,[ih]:n.ONE_MINUS_DST_COLOR,[th]:n.ONE_MINUS_DST_ALPHA,[sh]:n.CONSTANT_COLOR,[oh]:n.ONE_MINUS_CONSTANT_COLOR,[ah]:n.CONSTANT_ALPHA,[lh]:n.ONE_MINUS_CONSTANT_ALPHA};function ot(L,ee,re,me,Z,Y,ve,Oe,at,Qe){if(L===kn){_===!0&&(Re(n.BLEND),_=!1);return}if(_===!1&&(ie(n.BLEND),_=!0),L!==Xd){if(L!==m||Qe!==E){if((h!==xi||S!==xi)&&(n.blendEquation(n.FUNC_ADD),h=xi,S=xi),Qe)switch(L){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ia:n.blendFunc(n.ONE,n.ONE);break;case Rl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Pl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ia:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Rl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Pl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}b=null,M=null,C=null,R=null,P.set(0,0,0),F=0,m=L,E=Qe}return}Z=Z||ee,Y=Y||re,ve=ve||me,(ee!==h||Z!==S)&&(n.blendEquationSeparate(Ye[ee],Ye[Z]),h=ee,S=Z),(re!==b||me!==M||Y!==C||ve!==R)&&(n.blendFuncSeparate(A[re],A[me],A[Y],A[ve]),b=re,M=me,C=Y,R=ve),(Oe.equals(P)===!1||at!==F)&&(n.blendColor(Oe.r,Oe.g,Oe.b,at),P.copy(Oe),F=at),m=L,E=!1}function Ae(L,ee){L.side===On?Re(n.CULL_FACE):ie(n.CULL_FACE);let re=L.side===Gt;ee&&(re=!re),Ze(re),L.blending===er&&L.transparent===!1?ot(kn):ot(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const me=L.stencilWrite;a.setTest(me),me&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ge(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):Re(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ze(L){y!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),y=L)}function be(L){L!==Hd?(ie(n.CULL_FACE),L!==T&&(L===Cl?n.cullFace(n.BACK):L===Gd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Re(n.CULL_FACE),T=L}function ut(L){L!==X&&(q&&n.lineWidth(L),X=L)}function ge(L,ee,re){L?(ie(n.POLYGON_OFFSET_FILL),(k!==ee||G!==re)&&(n.polygonOffset(ee,re),k=ee,G=re)):Re(n.POLYGON_OFFSET_FILL)}function Ge(L){L?ie(n.SCISSOR_TEST):Re(n.SCISSOR_TEST)}function Mt(L){L===void 0&&(L=n.TEXTURE0+K-1),oe!==L&&(n.activeTexture(L),oe=L)}function _t(L,ee,re){re===void 0&&(oe===null?re=n.TEXTURE0+K-1:re=oe);let me=he[re];me===void 0&&(me={type:void 0,texture:void 0},he[re]=me),(me.type!==L||me.texture!==ee)&&(oe!==re&&(n.activeTexture(re),oe=re),n.bindTexture(L,ee||ae[L]),me.type=L,me.texture=ee)}function w(){const L=he[oe];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function O(){try{n.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function W(){try{n.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function j(){try{n.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{n.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ne(){try{n.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{n.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{n.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{n.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(L){ct.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),ct.copy(L))}function Ie(L){it.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),it.copy(L))}function Me(L,ee){let re=l.get(ee);re===void 0&&(re=new WeakMap,l.set(ee,re));let me=re.get(L);me===void 0&&(me=n.getUniformBlockIndex(ee,L.name),re.set(L,me))}function le(L,ee){const me=l.get(ee).get(L);c.get(ee)!==me&&(n.uniformBlockBinding(ee,me,L.__bindingPointIndex),c.set(ee,me))}function ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},oe=null,he={},d={},f=new WeakMap,p=[],g=null,_=!1,m=null,h=null,b=null,M=null,S=null,C=null,R=null,P=new $e(0,0,0),F=0,E=!1,y=null,T=null,X=null,k=null,G=null,ct.set(0,0,n.canvas.width,n.canvas.height),it.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ie,disable:Re,bindFramebuffer:Pe,drawBuffers:Ne,useProgram:gt,setBlending:ot,setMaterial:Ae,setFlipSided:Ze,setCullFace:be,setLineWidth:ut,setPolygonOffset:ge,setScissorTest:Ge,activeTexture:Mt,bindTexture:_t,unbindTexture:w,compressedTexImage2D:v,compressedTexImage3D:O,texImage2D:ye,texImage3D:J,updateUBOMapping:Me,uniformBlockBinding:le,texStorage2D:ne,texStorage3D:Se,texSubImage2D:W,texSubImage3D:j,compressedTexSubImage2D:H,compressedTexSubImage3D:Ee,scissor:ue,viewport:Ie,reset:ze}}function h0(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Fe,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,v){return p?new OffscreenCanvas(w,v):Hs("canvas")}function _(w,v,O){let W=1;const j=_t(w);if((j.width>O||j.height>O)&&(W=O/Math.max(j.width,j.height)),W<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const H=Math.floor(W*j.width),Ee=Math.floor(W*j.height);d===void 0&&(d=g(H,Ee));const ne=v?g(H,Ee):d;return ne.width=H,ne.height=Ee,ne.getContext("2d").drawImage(w,0,0,H,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+H+"x"+Ee+")."),ne}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),w;return w}function m(w){return w.generateMipmaps}function h(w){n.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(w,v,O,W,j=!1){if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let H=v;if(v===n.RED&&(O===n.FLOAT&&(H=n.R32F),O===n.HALF_FLOAT&&(H=n.R16F),O===n.UNSIGNED_BYTE&&(H=n.R8)),v===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.R8UI),O===n.UNSIGNED_SHORT&&(H=n.R16UI),O===n.UNSIGNED_INT&&(H=n.R32UI),O===n.BYTE&&(H=n.R8I),O===n.SHORT&&(H=n.R16I),O===n.INT&&(H=n.R32I)),v===n.RG&&(O===n.FLOAT&&(H=n.RG32F),O===n.HALF_FLOAT&&(H=n.RG16F),O===n.UNSIGNED_BYTE&&(H=n.RG8)),v===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RG8UI),O===n.UNSIGNED_SHORT&&(H=n.RG16UI),O===n.UNSIGNED_INT&&(H=n.RG32UI),O===n.BYTE&&(H=n.RG8I),O===n.SHORT&&(H=n.RG16I),O===n.INT&&(H=n.RG32I)),v===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RGB8UI),O===n.UNSIGNED_SHORT&&(H=n.RGB16UI),O===n.UNSIGNED_INT&&(H=n.RGB32UI),O===n.BYTE&&(H=n.RGB8I),O===n.SHORT&&(H=n.RGB16I),O===n.INT&&(H=n.RGB32I)),v===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(H=n.RGBA16UI),O===n.UNSIGNED_INT&&(H=n.RGBA32UI),O===n.BYTE&&(H=n.RGBA8I),O===n.SHORT&&(H=n.RGBA16I),O===n.INT&&(H=n.RGBA32I)),v===n.RGB&&O===n.UNSIGNED_INT_5_9_9_9_REV&&(H=n.RGB9_E5),v===n.RGBA){const Ee=j?ks:Ke.getTransfer(W);O===n.FLOAT&&(H=n.RGBA32F),O===n.HALF_FLOAT&&(H=n.RGBA16F),O===n.UNSIGNED_BYTE&&(H=Ee===nt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(H=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(H=n.RGB5_A1)}return(H===n.R16F||H===n.R32F||H===n.RG16F||H===n.RG32F||H===n.RGBA16F||H===n.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function S(w,v){let O;return w?v===null||v===Ti||v===Nr?O=n.DEPTH24_STENCIL8:v===Bn?O=n.DEPTH32F_STENCIL8:v===Fr&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ti||v===Nr?O=n.DEPTH_COMPONENT24:v===Bn?O=n.DEPTH_COMPONENT32F:v===Fr&&(O=n.DEPTH_COMPONENT16),O}function C(w,v){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==hn&&w.minFilter!==Mn?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function R(w){const v=w.target;v.removeEventListener("dispose",R),F(v),v.isVideoTexture&&u.delete(v)}function P(w){const v=w.target;v.removeEventListener("dispose",P),y(v)}function F(w){const v=i.get(w);if(v.__webglInit===void 0)return;const O=w.source,W=f.get(O);if(W){const j=W[v.__cacheKey];j.usedTimes--,j.usedTimes===0&&E(w),Object.keys(W).length===0&&f.delete(O)}i.remove(w)}function E(w){const v=i.get(w);n.deleteTexture(v.__webglTexture);const O=w.source,W=f.get(O);delete W[v.__cacheKey],o.memory.textures--}function y(w){const v=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(v.__webglFramebuffer[W]))for(let j=0;j<v.__webglFramebuffer[W].length;j++)n.deleteFramebuffer(v.__webglFramebuffer[W][j]);else n.deleteFramebuffer(v.__webglFramebuffer[W]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[W])}else{if(Array.isArray(v.__webglFramebuffer))for(let W=0;W<v.__webglFramebuffer.length;W++)n.deleteFramebuffer(v.__webglFramebuffer[W]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let W=0;W<v.__webglColorRenderbuffer.length;W++)v.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[W]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=w.textures;for(let W=0,j=O.length;W<j;W++){const H=i.get(O[W]);H.__webglTexture&&(n.deleteTexture(H.__webglTexture),o.memory.textures--),i.remove(O[W])}i.remove(w)}let T=0;function X(){T=0}function k(){const w=T;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),T+=1,w}function G(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function K(w,v){const O=i.get(w);if(w.isVideoTexture&&Ge(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&O.__version!==w.version){const W=w.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ae(O,w,v);return}}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+v)}function q(w,v){const O=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){ae(O,w,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+v)}function te(w,v){const O=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){ae(O,w,v);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+v)}function V(w,v){const O=i.get(w);if(w.version>0&&O.__version!==w.version){ie(O,w,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+v)}const oe={[ma]:n.REPEAT,[yi]:n.CLAMP_TO_EDGE,[ga]:n.MIRRORED_REPEAT},he={[hn]:n.NEAREST,[vh]:n.NEAREST_MIPMAP_NEAREST,[Kr]:n.NEAREST_MIPMAP_LINEAR,[Mn]:n.LINEAR,[oo]:n.LINEAR_MIPMAP_NEAREST,[Mi]:n.LINEAR_MIPMAP_LINEAR},we={[Mh]:n.NEVER,[Ch]:n.ALWAYS,[Eh]:n.LESS,[fu]:n.LEQUAL,[bh]:n.EQUAL,[Ah]:n.GEQUAL,[wh]:n.GREATER,[Th]:n.NOTEQUAL};function He(w,v){if(v.type===Bn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Mn||v.magFilter===oo||v.magFilter===Kr||v.magFilter===Mi||v.minFilter===Mn||v.minFilter===oo||v.minFilter===Kr||v.minFilter===Mi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,oe[v.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,oe[v.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,oe[v.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,he[v.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,he[v.minFilter]),v.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,we[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===hn||v.minFilter!==Kr&&v.minFilter!==Mi||v.type===Bn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function ct(w,v){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",R));const W=v.source;let j=f.get(W);j===void 0&&(j={},f.set(W,j));const H=G(v);if(H!==w.__cacheKey){j[H]===void 0&&(j[H]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,O=!0),j[H].usedTimes++;const Ee=j[w.__cacheKey];Ee!==void 0&&(j[w.__cacheKey].usedTimes--,Ee.usedTimes===0&&E(v)),w.__cacheKey=H,w.__webglTexture=j[H].texture}return O}function it(w,v,O){return Math.floor(Math.floor(w/O)/v)}function $(w,v,O,W){const H=w.updateRanges;if(H.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,O,W,v.data);else{H.sort((J,ue)=>J.start-ue.start);let Ee=0;for(let J=1;J<H.length;J++){const ue=H[Ee],Ie=H[J],Me=ue.start+ue.count,le=it(Ie.start,v.width,4),ze=it(ue.start,v.width,4);Ie.start<=Me+1&&le===ze&&it(Ie.start+Ie.count-1,v.width,4)===le?ue.count=Math.max(ue.count,Ie.start+Ie.count-ue.start):(++Ee,H[Ee]=Ie)}H.length=Ee+1;const ne=n.getParameter(n.UNPACK_ROW_LENGTH),Se=n.getParameter(n.UNPACK_SKIP_PIXELS),ye=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let J=0,ue=H.length;J<ue;J++){const Ie=H[J],Me=Math.floor(Ie.start/4),le=Math.ceil(Ie.count/4),ze=Me%v.width,L=Math.floor(Me/v.width),ee=le,re=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,ze),n.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,ze,L,ee,re,O,W,v.data)}w.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ne),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Se),n.pixelStorei(n.UNPACK_SKIP_ROWS,ye)}}function ae(w,v,O){let W=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(W=n.TEXTURE_3D);const j=ct(w,v),H=v.source;t.bindTexture(W,w.__webglTexture,n.TEXTURE0+O);const Ee=i.get(H);if(H.version!==Ee.__version||j===!0){t.activeTexture(n.TEXTURE0+O);const ne=Ke.getPrimaries(Ke.workingColorSpace),Se=v.colorSpace===Qn?null:Ke.getPrimaries(v.colorSpace),ye=v.colorSpace===Qn||ne===Se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let J=_(v.image,!1,r.maxTextureSize);J=Mt(v,J);const ue=s.convert(v.format,v.colorSpace),Ie=s.convert(v.type);let Me=M(v.internalFormat,ue,Ie,v.colorSpace,v.isVideoTexture);He(W,v);let le;const ze=v.mipmaps,L=v.isVideoTexture!==!0,ee=Ee.__version===void 0||j===!0,re=H.dataReady,me=C(v,J);if(v.isDepthTexture)Me=S(v.format===Br,v.type),ee&&(L?t.texStorage2D(n.TEXTURE_2D,1,Me,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,Me,J.width,J.height,0,ue,Ie,null));else if(v.isDataTexture)if(ze.length>0){L&&ee&&t.texStorage2D(n.TEXTURE_2D,me,Me,ze[0].width,ze[0].height);for(let Z=0,Y=ze.length;Z<Y;Z++)le=ze[Z],L?re&&t.texSubImage2D(n.TEXTURE_2D,Z,0,0,le.width,le.height,ue,Ie,le.data):t.texImage2D(n.TEXTURE_2D,Z,Me,le.width,le.height,0,ue,Ie,le.data);v.generateMipmaps=!1}else L?(ee&&t.texStorage2D(n.TEXTURE_2D,me,Me,J.width,J.height),re&&$(v,J,ue,Ie)):t.texImage2D(n.TEXTURE_2D,0,Me,J.width,J.height,0,ue,Ie,J.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){L&&ee&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Me,ze[0].width,ze[0].height,J.depth);for(let Z=0,Y=ze.length;Z<Y;Z++)if(le=ze[Z],v.format!==dn)if(ue!==null)if(L){if(re)if(v.layerUpdates.size>0){const ve=sc(le.width,le.height,v.format,v.type);for(const Oe of v.layerUpdates){const at=le.data.subarray(Oe*ve/le.data.BYTES_PER_ELEMENT,(Oe+1)*ve/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,Oe,le.width,le.height,1,ue,at)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,le.width,le.height,J.depth,ue,le.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Z,Me,le.width,le.height,J.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?re&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,le.width,le.height,J.depth,ue,Ie,le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Z,Me,le.width,le.height,J.depth,0,ue,Ie,le.data)}else{L&&ee&&t.texStorage2D(n.TEXTURE_2D,me,Me,ze[0].width,ze[0].height);for(let Z=0,Y=ze.length;Z<Y;Z++)le=ze[Z],v.format!==dn?ue!==null?L?re&&t.compressedTexSubImage2D(n.TEXTURE_2D,Z,0,0,le.width,le.height,ue,le.data):t.compressedTexImage2D(n.TEXTURE_2D,Z,Me,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?re&&t.texSubImage2D(n.TEXTURE_2D,Z,0,0,le.width,le.height,ue,Ie,le.data):t.texImage2D(n.TEXTURE_2D,Z,Me,le.width,le.height,0,ue,Ie,le.data)}else if(v.isDataArrayTexture)if(L){if(ee&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Me,J.width,J.height,J.depth),re)if(v.layerUpdates.size>0){const Z=sc(J.width,J.height,v.format,v.type);for(const Y of v.layerUpdates){const ve=J.data.subarray(Y*Z/J.data.BYTES_PER_ELEMENT,(Y+1)*Z/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Y,J.width,J.height,1,ue,Ie,ve)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ue,Ie,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Me,J.width,J.height,J.depth,0,ue,Ie,J.data);else if(v.isData3DTexture)L?(ee&&t.texStorage3D(n.TEXTURE_3D,me,Me,J.width,J.height,J.depth),re&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ue,Ie,J.data)):t.texImage3D(n.TEXTURE_3D,0,Me,J.width,J.height,J.depth,0,ue,Ie,J.data);else if(v.isFramebufferTexture){if(ee)if(L)t.texStorage2D(n.TEXTURE_2D,me,Me,J.width,J.height);else{let Z=J.width,Y=J.height;for(let ve=0;ve<me;ve++)t.texImage2D(n.TEXTURE_2D,ve,Me,Z,Y,0,ue,Ie,null),Z>>=1,Y>>=1}}else if(ze.length>0){if(L&&ee){const Z=_t(ze[0]);t.texStorage2D(n.TEXTURE_2D,me,Me,Z.width,Z.height)}for(let Z=0,Y=ze.length;Z<Y;Z++)le=ze[Z],L?re&&t.texSubImage2D(n.TEXTURE_2D,Z,0,0,ue,Ie,le):t.texImage2D(n.TEXTURE_2D,Z,Me,ue,Ie,le);v.generateMipmaps=!1}else if(L){if(ee){const Z=_t(J);t.texStorage2D(n.TEXTURE_2D,me,Me,Z.width,Z.height)}re&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue,Ie,J)}else t.texImage2D(n.TEXTURE_2D,0,Me,ue,Ie,J);m(v)&&h(W),Ee.__version=H.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function ie(w,v,O){if(v.image.length!==6)return;const W=ct(w,v),j=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+O);const H=i.get(j);if(j.version!==H.__version||W===!0){t.activeTexture(n.TEXTURE0+O);const Ee=Ke.getPrimaries(Ke.workingColorSpace),ne=v.colorSpace===Qn?null:Ke.getPrimaries(v.colorSpace),Se=v.colorSpace===Qn||Ee===ne?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const ye=v.isCompressedTexture||v.image[0].isCompressedTexture,J=v.image[0]&&v.image[0].isDataTexture,ue=[];for(let Y=0;Y<6;Y++)!ye&&!J?ue[Y]=_(v.image[Y],!0,r.maxCubemapSize):ue[Y]=J?v.image[Y].image:v.image[Y],ue[Y]=Mt(v,ue[Y]);const Ie=ue[0],Me=s.convert(v.format,v.colorSpace),le=s.convert(v.type),ze=M(v.internalFormat,Me,le,v.colorSpace),L=v.isVideoTexture!==!0,ee=H.__version===void 0||W===!0,re=j.dataReady;let me=C(v,Ie);He(n.TEXTURE_CUBE_MAP,v);let Z;if(ye){L&&ee&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,ze,Ie.width,Ie.height);for(let Y=0;Y<6;Y++){Z=ue[Y].mipmaps;for(let ve=0;ve<Z.length;ve++){const Oe=Z[ve];v.format!==dn?Me!==null?L?re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ve,0,0,Oe.width,Oe.height,Me,Oe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ve,ze,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ve,0,0,Oe.width,Oe.height,Me,le,Oe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ve,ze,Oe.width,Oe.height,0,Me,le,Oe.data)}}}else{if(Z=v.mipmaps,L&&ee){Z.length>0&&me++;const Y=_t(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,ze,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(J){L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ue[Y].width,ue[Y].height,Me,le,ue[Y].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,ze,ue[Y].width,ue[Y].height,0,Me,le,ue[Y].data);for(let ve=0;ve<Z.length;ve++){const at=Z[ve].image[Y].image;L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ve+1,0,0,at.width,at.height,Me,le,at.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ve+1,ze,at.width,at.height,0,Me,le,at.data)}}else{L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Me,le,ue[Y]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,ze,Me,le,ue[Y]);for(let ve=0;ve<Z.length;ve++){const Oe=Z[ve];L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ve+1,0,0,Me,le,Oe.image[Y]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ve+1,ze,Me,le,Oe.image[Y])}}}m(v)&&h(n.TEXTURE_CUBE_MAP),H.__version=j.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function Re(w,v,O,W,j,H){const Ee=s.convert(O.format,O.colorSpace),ne=s.convert(O.type),Se=M(O.internalFormat,Ee,ne,O.colorSpace),ye=i.get(v),J=i.get(O);if(J.__renderTarget=v,!ye.__hasExternalTextures){const ue=Math.max(1,v.width>>H),Ie=Math.max(1,v.height>>H);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?t.texImage3D(j,H,Se,ue,Ie,v.depth,0,Ee,ne,null):t.texImage2D(j,H,Se,ue,Ie,0,Ee,ne,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),ge(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,j,J.__webglTexture,0,ut(v)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,j,J.__webglTexture,H),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Pe(w,v,O){if(n.bindRenderbuffer(n.RENDERBUFFER,w),v.depthBuffer){const W=v.depthTexture,j=W&&W.isDepthTexture?W.type:null,H=S(v.stencilBuffer,j),Ee=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ne=ut(v);ge(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,H,v.width,v.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,H,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,H,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ee,n.RENDERBUFFER,w)}else{const W=v.textures;for(let j=0;j<W.length;j++){const H=W[j],Ee=s.convert(H.format,H.colorSpace),ne=s.convert(H.type),Se=M(H.internalFormat,Ee,ne,H.colorSpace),ye=ut(v);O&&ge(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,Se,v.width,v.height):ge(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ye,Se,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Se,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ne(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const W=i.get(v.depthTexture);W.__renderTarget=v,(!W.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);const j=W.__webglTexture,H=ut(v);if(v.depthTexture.format===Or)ge(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0);else if(v.depthTexture.format===Br)ge(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function gt(w){const v=i.get(w),O=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const W=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),W){const j=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,W.removeEventListener("dispose",j)};W.addEventListener("dispose",j),v.__depthDisposeCallback=j}v.__boundDepthTexture=W}if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const W=w.texture.mipmaps;W&&W.length>0?Ne(v.__webglFramebuffer[0],w):Ne(v.__webglFramebuffer,w)}else if(O){v.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[W]),v.__webglDepthbuffer[W]===void 0)v.__webglDepthbuffer[W]=n.createRenderbuffer(),Pe(v.__webglDepthbuffer[W],w,!1);else{const j=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,H)}}else{const W=w.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Pe(v.__webglDepthbuffer,w,!1);else{const j=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,H)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ye(w,v,O){const W=i.get(w);v!==void 0&&Re(W.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&gt(w)}function A(w){const v=w.texture,O=i.get(w),W=i.get(v);w.addEventListener("dispose",P);const j=w.textures,H=w.isWebGLCubeRenderTarget===!0,Ee=j.length>1;if(Ee||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=v.version,o.memory.textures++),H){O.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[ne]=[];for(let Se=0;Se<v.mipmaps.length;Se++)O.__webglFramebuffer[ne][Se]=n.createFramebuffer()}else O.__webglFramebuffer[ne]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let ne=0;ne<v.mipmaps.length;ne++)O.__webglFramebuffer[ne]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(Ee)for(let ne=0,Se=j.length;ne<Se;ne++){const ye=i.get(j[ne]);ye.__webglTexture===void 0&&(ye.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&ge(w)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ne=0;ne<j.length;ne++){const Se=j[ne];O.__webglColorRenderbuffer[ne]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[ne]);const ye=s.convert(Se.format,Se.colorSpace),J=s.convert(Se.type),ue=M(Se.internalFormat,ye,J,Se.colorSpace,w.isXRRenderTarget===!0),Ie=ut(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ie,ue,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ne,n.RENDERBUFFER,O.__webglColorRenderbuffer[ne])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),Pe(O.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(H){t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),He(n.TEXTURE_CUBE_MAP,v);for(let ne=0;ne<6;ne++)if(v.mipmaps&&v.mipmaps.length>0)for(let Se=0;Se<v.mipmaps.length;Se++)Re(O.__webglFramebuffer[ne][Se],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Se);else Re(O.__webglFramebuffer[ne],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);m(v)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ne=0,Se=j.length;ne<Se;ne++){const ye=j[ne],J=i.get(ye);let ue=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ue=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,J.__webglTexture),He(ue,ye),Re(O.__webglFramebuffer,w,ye,n.COLOR_ATTACHMENT0+ne,ue,0),m(ye)&&h(ue)}t.unbindTexture()}else{let ne=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ne=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ne,W.__webglTexture),He(ne,v),v.mipmaps&&v.mipmaps.length>0)for(let Se=0;Se<v.mipmaps.length;Se++)Re(O.__webglFramebuffer[Se],w,v,n.COLOR_ATTACHMENT0,ne,Se);else Re(O.__webglFramebuffer,w,v,n.COLOR_ATTACHMENT0,ne,0);m(v)&&h(ne),t.unbindTexture()}w.depthBuffer&&gt(w)}function ot(w){const v=w.textures;for(let O=0,W=v.length;O<W;O++){const j=v[O];if(m(j)){const H=b(w),Ee=i.get(j).__webglTexture;t.bindTexture(H,Ee),h(H),t.unbindTexture()}}}const Ae=[],Ze=[];function be(w){if(w.samples>0){if(ge(w)===!1){const v=w.textures,O=w.width,W=w.height;let j=n.COLOR_BUFFER_BIT;const H=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=i.get(w),ne=v.length>1;if(ne)for(let ye=0;ye<v.length;ye++)t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const Se=w.texture.mipmaps;Se&&Se.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let ye=0;ye<v.length;ye++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),ne){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[ye]);const J=i.get(v[ye]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,O,W,0,0,O,W,j,n.NEAREST),c===!0&&(Ae.length=0,Ze.length=0,Ae.push(n.COLOR_ATTACHMENT0+ye),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ae.push(H),Ze.push(H),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ze)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ae))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ne)for(let ye=0;ye<v.length;ye++){t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[ye]);const J=i.get(v[ye]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,J,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const v=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function ut(w){return Math.min(r.maxSamples,w.samples)}function ge(w){const v=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Ge(w){const v=o.render.frame;u.get(w)!==v&&(u.set(w,v),w.update())}function Mt(w,v){const O=w.colorSpace,W=w.format,j=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==lr&&O!==Qn&&(Ke.getTransfer(O)===nt?(W!==dn||j!==wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function _t(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=X,this.setTexture2D=K,this.setTexture2DArray=q,this.setTexture3D=te,this.setTextureCube=V,this.rebindTextures=Ye,this.setupRenderTarget=A,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=gt,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=ge}function f0(n,e){function t(i,r=Qn){let s;const o=Ke.getTransfer(r);if(i===wn)return n.UNSIGNED_BYTE;if(i===el)return n.UNSIGNED_SHORT_4_4_4_4;if(i===tl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ou)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ru)return n.BYTE;if(i===su)return n.SHORT;if(i===Fr)return n.UNSIGNED_SHORT;if(i===Ja)return n.INT;if(i===Ti)return n.UNSIGNED_INT;if(i===Bn)return n.FLOAT;if(i===Vn)return n.HALF_FLOAT;if(i===au)return n.ALPHA;if(i===lu)return n.RGB;if(i===dn)return n.RGBA;if(i===Or)return n.DEPTH_COMPONENT;if(i===Br)return n.DEPTH_STENCIL;if(i===cu)return n.RED;if(i===nl)return n.RED_INTEGER;if(i===uu)return n.RG;if(i===il)return n.RG_INTEGER;if(i===rl)return n.RGBA_INTEGER;if(i===Ps||i===Ls||i===Is||i===Us)if(o===nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ps)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Us)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ps)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ls)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Is)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Us)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===_a||i===va||i===xa||i===Sa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===_a)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===va)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Sa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ya||i===Ma||i===Ea)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ya||i===Ma)return o===nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ea)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ba||i===wa||i===Ta||i===Aa||i===Ca||i===Ra||i===Pa||i===La||i===Ia||i===Ua||i===Da||i===Fa||i===Na||i===Oa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ba)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ta)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Aa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ca)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ra)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Pa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===La)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ia)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ua)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Da)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Na)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Oa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ds||i===Ba||i===za)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ds)return o===nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ba)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===za)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===du||i===ka||i===Va||i===Ha)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ds)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ka)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Va)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ha)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Nr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Iu extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const p0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,m0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class g0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Iu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Bt({vertexShader:p0,fragmentShader:m0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new on(new Hr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _0 extends pr{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,p=null,g=null;const _=new g0,m={},h=t.getContextAttributes();let b=null,M=null;const S=[],C=[],R=new Fe;let P=null;const F=new rn;F.viewport=new st;const E=new rn;E.viewport=new st;const y=[F,E],T=new Df;let X=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ae=S[$];return ae===void 0&&(ae=new Co,S[$]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function($){let ae=S[$];return ae===void 0&&(ae=new Co,S[$]=ae),ae.getGripSpace()},this.getHand=function($){let ae=S[$];return ae===void 0&&(ae=new Co,S[$]=ae),ae.getHandSpace()};function G($){const ae=C.indexOf($.inputSource);if(ae===-1)return;const ie=S[ae];ie!==void 0&&(ie.update($.inputSource,$.frame,l||o),ie.dispatchEvent({type:$.type,data:$.inputSource}))}function K(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",q);for(let $=0;$<S.length;$++){const ae=C[$];ae!==null&&(C[$]=null,S[$].disconnect(ae))}X=null,k=null,_.reset();for(const $ in m)delete m[$];e.setRenderTarget(b),p=null,f=null,d=null,r=null,M=null,it.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",K),r.addEventListener("inputsourceschange",q),h.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(R),typeof XRWebGLBinding<"u"&&(d=new XRWebGLBinding(r,t)),d!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,Re=null,Pe=null;h.depth&&(Pe=h.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=h.stencil?Br:Or,Re=h.stencil?Nr:Ti);const Ne={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:s};f=d.createProjectionLayer(Ne),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new fn(f.textureWidth,f.textureHeight,{format:dn,type:wn,depthTexture:new wu(f.textureWidth,f.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:h.stencil,colorSpace:e.outputColorSpace,samples:h.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ie={antialias:h.antialias,alpha:!0,depth:h.depth,stencil:h.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new fn(p.framebufferWidth,p.framebufferHeight,{format:dn,type:wn,colorSpace:e.outputColorSpace,stencilBuffer:h.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),it.setContext(r),it.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q($){for(let ae=0;ae<$.removed.length;ae++){const ie=$.removed[ae],Re=C.indexOf(ie);Re>=0&&(C[Re]=null,S[Re].disconnect(ie))}for(let ae=0;ae<$.added.length;ae++){const ie=$.added[ae];let Re=C.indexOf(ie);if(Re===-1){for(let Ne=0;Ne<S.length;Ne++)if(Ne>=C.length){C.push(ie),Re=Ne;break}else if(C[Ne]===null){C[Ne]=ie,Re=Ne;break}if(Re===-1)break}const Pe=S[Re];Pe&&Pe.connect(ie)}}const te=new I,V=new I;function oe($,ae,ie){te.setFromMatrixPosition(ae.matrixWorld),V.setFromMatrixPosition(ie.matrixWorld);const Re=te.distanceTo(V),Pe=ae.projectionMatrix.elements,Ne=ie.projectionMatrix.elements,gt=Pe[14]/(Pe[10]-1),Ye=Pe[14]/(Pe[10]+1),A=(Pe[9]+1)/Pe[5],ot=(Pe[9]-1)/Pe[5],Ae=(Pe[8]-1)/Pe[0],Ze=(Ne[8]+1)/Ne[0],be=gt*Ae,ut=gt*Ze,ge=Re/(-Ae+Ze),Ge=ge*-Ae;if(ae.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ge),$.translateZ(ge),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Pe[10]===-1)$.projectionMatrix.copy(ae.projectionMatrix),$.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const Mt=gt+ge,_t=Ye+ge,w=be-Ge,v=ut+(Re-Ge),O=A*Ye/_t*Mt,W=ot*Ye/_t*Mt;$.projectionMatrix.makePerspective(w,v,O,W,Mt,_t),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function he($,ae){ae===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ae.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let ae=$.near,ie=$.far;_.texture!==null&&(_.depthNear>0&&(ae=_.depthNear),_.depthFar>0&&(ie=_.depthFar)),T.near=E.near=F.near=ae,T.far=E.far=F.far=ie,(X!==T.near||k!==T.far)&&(r.updateRenderState({depthNear:T.near,depthFar:T.far}),X=T.near,k=T.far),T.layers.mask=$.layers.mask|6,F.layers.mask=T.layers.mask&3,E.layers.mask=T.layers.mask&5;const Re=$.parent,Pe=T.cameras;he(T,Re);for(let Ne=0;Ne<Pe.length;Ne++)he(Pe[Ne],Re);Pe.length===2?oe(T,F,E):T.projectionMatrix.copy(F.projectionMatrix),we($,T,Re)};function we($,ae,ie){ie===null?$.matrix.copy(ae.matrixWorld):($.matrix.copy(ie.matrixWorld),$.matrix.invert(),$.matrix.multiply(ae.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ae.projectionMatrix),$.projectionMatrixInverse.copy(ae.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=zr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function($){c=$,f!==null&&(f.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(T)},this.getCameraTexture=function($){return m[$]};let He=null;function ct($,ae){if(u=ae.getViewerPose(l||o),g=ae,u!==null){const ie=u.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let Re=!1;ie.length!==T.cameras.length&&(T.cameras.length=0,Re=!0);for(let Ye=0;Ye<ie.length;Ye++){const A=ie[Ye];let ot=null;if(p!==null)ot=p.getViewport(A);else{const Ze=d.getViewSubImage(f,A);ot=Ze.viewport,Ye===0&&(e.setRenderTargetTextures(M,Ze.colorTexture,Ze.depthStencilTexture),e.setRenderTarget(M))}let Ae=y[Ye];Ae===void 0&&(Ae=new rn,Ae.layers.enable(Ye),Ae.viewport=new st,y[Ye]=Ae),Ae.matrix.fromArray(A.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(A.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(ot.x,ot.y,ot.width,ot.height),Ye===0&&(T.matrix.copy(Ae.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),Re===!0&&T.cameras.push(Ae)}const Pe=r.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&d){const Ye=d.getDepthInformation(ie[0]);Ye&&Ye.isValid&&Ye.texture&&_.init(Ye,r.renderState)}if(Pe&&Pe.includes("camera-access")&&(e.state.unbindTexture(),d))for(let Ye=0;Ye<ie.length;Ye++){const A=ie[Ye].camera;if(A){let ot=m[A];ot||(ot=new Iu,m[A]=ot);const Ae=d.getCameraImage(A);ot.sourceTexture=Ae}}}for(let ie=0;ie<S.length;ie++){const Re=C[ie],Pe=S[ie];Re!==null&&Pe!==void 0&&Pe.update(Re,ae,l||o)}He&&He($,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),g=null}const it=new Au;it.setAnimationLoop(ct),this.setAnimationLoop=function($){He=$},this.dispose=function(){}}}const gi=new Tn,v0=new ft;function x0(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,yu(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,b,M,S){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),d(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,S)):h.isMeshMatcapMaterial?(s(m,h),g(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),_(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?c(m,h,b,M):h.isSpriteMaterial?l(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===Gt&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===Gt&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const b=e.get(h),M=b.envMap,S=b.envMapRotation;M&&(m.envMap.value=M,gi.copy(S),gi.x*=-1,gi.y*=-1,gi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),m.envMapRotation.value.setFromMatrix4(v0.makeRotationFromEuler(gi)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function c(m,h,b,M){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*b,m.scale.value=M*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function l(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,b){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Gt&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function _(m,h){const b=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function S0(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,M){const S=M.program;i.uniformBlockBinding(b,S)}function l(b,M){let S=r[b.id];S===void 0&&(g(b),S=u(b),r[b.id]=S,b.addEventListener("dispose",m));const C=M.program;i.updateUBOMapping(b,C);const R=e.render.frame;s[b.id]!==R&&(f(b),s[b.id]=R)}function u(b){const M=d();b.__bindingPointIndex=M;const S=n.createBuffer(),C=b.__size,R=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,S),S}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const M=r[b.id],S=b.uniforms,C=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let R=0,P=S.length;R<P;R++){const F=Array.isArray(S[R])?S[R]:[S[R]];for(let E=0,y=F.length;E<y;E++){const T=F[E];if(p(T,R,E,C)===!0){const X=T.__offset,k=Array.isArray(T.value)?T.value:[T.value];let G=0;for(let K=0;K<k.length;K++){const q=k[K],te=_(q);typeof q=="number"||typeof q=="boolean"?(T.__data[0]=q,n.bufferSubData(n.UNIFORM_BUFFER,X+G,T.__data)):q.isMatrix3?(T.__data[0]=q.elements[0],T.__data[1]=q.elements[1],T.__data[2]=q.elements[2],T.__data[3]=0,T.__data[4]=q.elements[3],T.__data[5]=q.elements[4],T.__data[6]=q.elements[5],T.__data[7]=0,T.__data[8]=q.elements[6],T.__data[9]=q.elements[7],T.__data[10]=q.elements[8],T.__data[11]=0):(q.toArray(T.__data,G),G+=te.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,X,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,M,S,C){const R=b.value,P=M+"_"+S;if(C[P]===void 0)return typeof R=="number"||typeof R=="boolean"?C[P]=R:C[P]=R.clone(),!0;{const F=C[P];if(typeof R=="number"||typeof R=="boolean"){if(F!==R)return C[P]=R,!0}else if(F.equals(R)===!1)return F.copy(R),!0}return!1}function g(b){const M=b.uniforms;let S=0;const C=16;for(let P=0,F=M.length;P<F;P++){const E=Array.isArray(M[P])?M[P]:[M[P]];for(let y=0,T=E.length;y<T;y++){const X=E[y],k=Array.isArray(X.value)?X.value:[X.value];for(let G=0,K=k.length;G<K;G++){const q=k[G],te=_(q),V=S%C,oe=V%te.boundary,he=V+oe;S+=oe,he!==0&&C-he<te.storage&&(S+=C-he),X.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=S,S+=te.storage}}}const R=S%C;return R>0&&(S+=C-R),b.__size=S,b.__cache={},this}function _(b){const M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),M}function m(b){const M=b.target;M.removeEventListener("dispose",m);const S=o.indexOf(M.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function h(){for(const b in r)n.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:c,update:l,dispose:h}}class y0{constructor(e={}){const{canvas:t=$h(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,h=null;const b=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let C=!1;this._outputColorSpace=nn;let R=0,P=0,F=null,E=-1,y=null;const T=new st,X=new st;let k=null;const G=new $e(0);let K=0,q=t.width,te=t.height,V=1,oe=null,he=null;const we=new st(0,0,q,te),He=new st(0,0,q,te);let ct=!1;const it=new al;let $=!1,ae=!1;const ie=new ft,Re=new I,Pe=new st,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function Ye(){return F===null?V:1}let A=i;function ot(x,U){return t.getContext(x,U)}try{const x={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Za}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",Z,!1),A===null){const U="webgl2";if(A=ot(U,x),A===null)throw ot(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Ae,Ze,be,ut,ge,Ge,Mt,_t,w,v,O,W,j,H,Ee,ne,Se,ye,J,ue,Ie,Me,le,ze;function L(){Ae=new Lg(A),Ae.init(),Me=new f0(A,Ae),Ze=new bg(A,Ae,e,Me),be=new d0(A,Ae),Ze.reversedDepthBuffer&&f&&be.buffers.depth.setReversed(!0),ut=new Dg(A),ge=new Q_,Ge=new h0(A,Ae,be,ge,Ze,Me,ut),Mt=new Tg(S),_t=new Pg(S),w=new kf(A),le=new Mg(A,w),v=new Ig(A,w,ut,le),O=new Ng(A,v,w,ut),J=new Fg(A,Ze,Ge),ne=new wg(ge),W=new Z_(S,Mt,_t,Ae,Ze,le,ne),j=new x0(S,ge),H=new e0,Ee=new o0(Ae),ye=new yg(S,Mt,_t,be,O,p,c),Se=new c0(S,O,Ze),ze=new S0(A,ut,Ze,be),ue=new Eg(A,Ae,ut),Ie=new Ug(A,Ae,ut),ut.programs=W.programs,S.capabilities=Ze,S.extensions=Ae,S.properties=ge,S.renderLists=H,S.shadowMap=Se,S.state=be,S.info=ut}L();const ee=new _0(S,A);this.xr=ee,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const x=Ae.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Ae.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(x){x!==void 0&&(V=x,this.setSize(q,te,!1))},this.getSize=function(x){return x.set(q,te)},this.setSize=function(x,U,B=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=x,te=U,t.width=Math.floor(x*V),t.height=Math.floor(U*V),B===!0&&(t.style.width=x+"px",t.style.height=U+"px"),this.setViewport(0,0,x,U)},this.getDrawingBufferSize=function(x){return x.set(q*V,te*V).floor()},this.setDrawingBufferSize=function(x,U,B){q=x,te=U,V=B,t.width=Math.floor(x*B),t.height=Math.floor(U*B),this.setViewport(0,0,x,U)},this.getCurrentViewport=function(x){return x.copy(T)},this.getViewport=function(x){return x.copy(we)},this.setViewport=function(x,U,B,z){x.isVector4?we.set(x.x,x.y,x.z,x.w):we.set(x,U,B,z),be.viewport(T.copy(we).multiplyScalar(V).round())},this.getScissor=function(x){return x.copy(He)},this.setScissor=function(x,U,B,z){x.isVector4?He.set(x.x,x.y,x.z,x.w):He.set(x,U,B,z),be.scissor(X.copy(He).multiplyScalar(V).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(x){be.setScissorTest(ct=x)},this.setOpaqueSort=function(x){oe=x},this.setTransparentSort=function(x){he=x},this.getClearColor=function(x){return x.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor(...arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha(...arguments)},this.clear=function(x=!0,U=!0,B=!0){let z=0;if(x){let D=!1;if(F!==null){const Q=F.texture.format;D=Q===rl||Q===il||Q===nl}if(D){const Q=F.texture.type,ce=Q===wn||Q===Ti||Q===Fr||Q===Nr||Q===el||Q===tl,_e=ye.getClearColor(),pe=ye.getClearAlpha(),Le=_e.r,Ue=_e.g,Te=_e.b;ce?(g[0]=Le,g[1]=Ue,g[2]=Te,g[3]=pe,A.clearBufferuiv(A.COLOR,0,g)):(_[0]=Le,_[1]=Ue,_[2]=Te,_[3]=pe,A.clearBufferiv(A.COLOR,0,_))}else z|=A.COLOR_BUFFER_BIT}U&&(z|=A.DEPTH_BUFFER_BIT),B&&(z|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",Z,!1),ye.dispose(),H.dispose(),Ee.dispose(),ge.dispose(),Mt.dispose(),_t.dispose(),O.dispose(),le.dispose(),ze.dispose(),W.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",gn),ee.removeEventListener("sessionend",Sl),ci.stop()};function re(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const x=ut.autoReset,U=Se.enabled,B=Se.autoUpdate,z=Se.needsUpdate,D=Se.type;L(),ut.autoReset=x,Se.enabled=U,Se.autoUpdate=B,Se.needsUpdate=z,Se.type=D}function Z(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Y(x){const U=x.target;U.removeEventListener("dispose",Y),ve(U)}function ve(x){Oe(x),ge.remove(x)}function Oe(x){const U=ge.get(x).programs;U!==void 0&&(U.forEach(function(B){W.releaseProgram(B)}),x.isShaderMaterial&&W.releaseShaderCache(x))}this.renderBufferDirect=function(x,U,B,z,D,Q){U===null&&(U=Ne);const ce=D.isMesh&&D.matrixWorld.determinant()<0,_e=_d(x,U,B,z,D);be.setMaterial(z,ce);let pe=B.index,Le=1;if(z.wireframe===!0){if(pe=v.getWireframeAttribute(B),pe===void 0)return;Le=2}const Ue=B.drawRange,Te=B.attributes.position;let Xe=Ue.start*Le,tt=(Ue.start+Ue.count)*Le;Q!==null&&(Xe=Math.max(Xe,Q.start*Le),tt=Math.min(tt,(Q.start+Q.count)*Le)),pe!==null?(Xe=Math.max(Xe,0),tt=Math.min(tt,pe.count)):Te!=null&&(Xe=Math.max(Xe,0),tt=Math.min(tt,Te.count));const pt=tt-Xe;if(pt<0||pt===1/0)return;le.setup(D,z,_e,B,pe);let lt,rt=ue;if(pe!==null&&(lt=w.get(pe),rt=Ie,rt.setIndex(lt)),D.isMesh)z.wireframe===!0?(be.setLineWidth(z.wireframeLinewidth*Ye()),rt.setMode(A.LINES)):rt.setMode(A.TRIANGLES);else if(D.isLine){let Ce=z.linewidth;Ce===void 0&&(Ce=1),be.setLineWidth(Ce*Ye()),D.isLineSegments?rt.setMode(A.LINES):D.isLineLoop?rt.setMode(A.LINE_LOOP):rt.setMode(A.LINE_STRIP)}else D.isPoints?rt.setMode(A.POINTS):D.isSprite&&rt.setMode(A.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)nr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),rt.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(Ae.get("WEBGL_multi_draw"))rt.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const Ce=D._multiDrawStarts,dt=D._multiDrawCounts,je=D._multiDrawCount,Xt=pe?w.get(pe).bytesPerElement:1,Ii=ge.get(z).currentProgram.getUniforms();for(let $t=0;$t<je;$t++)Ii.setValue(A,"_gl_DrawID",$t),rt.render(Ce[$t]/Xt,dt[$t])}else if(D.isInstancedMesh)rt.renderInstances(Xe,pt,D.count);else if(B.isInstancedBufferGeometry){const Ce=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,dt=Math.min(B.instanceCount,Ce);rt.renderInstances(Xe,pt,dt)}else rt.render(Xe,pt)};function at(x,U,B){x.transparent===!0&&x.side===On&&x.forceSinglePass===!1?(x.side=Gt,x.needsUpdate=!0,Yr(x,U,B),x.side=si,x.needsUpdate=!0,Yr(x,U,B),x.side=On):Yr(x,U,B)}this.compile=function(x,U,B=null){B===null&&(B=x),h=Ee.get(B),h.init(U),M.push(h),B.traverseVisible(function(D){D.isLight&&D.layers.test(U.layers)&&(h.pushLight(D),D.castShadow&&h.pushShadow(D))}),x!==B&&x.traverseVisible(function(D){D.isLight&&D.layers.test(U.layers)&&(h.pushLight(D),D.castShadow&&h.pushShadow(D))}),h.setupLights();const z=new Set;return x.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const Q=D.material;if(Q)if(Array.isArray(Q))for(let ce=0;ce<Q.length;ce++){const _e=Q[ce];at(_e,B,D),z.add(_e)}else at(Q,B,D),z.add(Q)}),h=M.pop(),z},this.compileAsync=function(x,U,B=null){const z=this.compile(x,U,B);return new Promise(D=>{function Q(){if(z.forEach(function(ce){ge.get(ce).currentProgram.isReady()&&z.delete(ce)}),z.size===0){D(x);return}setTimeout(Q,10)}Ae.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Qe=null;function Rn(x){Qe&&Qe(x)}function gn(){ci.stop()}function Sl(){ci.start()}const ci=new Au;ci.setAnimationLoop(Rn),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(x){Qe=x,ee.setAnimationLoop(x),x===null?ci.stop():ci.start()},ee.addEventListener("sessionstart",gn),ee.addEventListener("sessionend",Sl),this.render=function(x,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(U),U=ee.getCamera()),x.isScene===!0&&x.onBeforeRender(S,x,U,F),h=Ee.get(x,M.length),h.init(U),M.push(h),ie.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),it.setFromProjectionMatrix(ie,En,U.reversedDepth),ae=this.localClippingEnabled,$=ne.init(this.clippingPlanes,ae),m=H.get(x,b.length),m.init(),b.push(m),ee.enabled===!0&&ee.isPresenting===!0){const Q=S.xr.getDepthSensingMesh();Q!==null&&io(Q,U,-1/0,S.sortObjects)}io(x,U,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(oe,he),gt=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,gt&&ye.addToRenderList(m,x),this.info.render.frame++,$===!0&&ne.beginShadows();const B=h.state.shadowsArray;Se.render(B,x,U),$===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,D=m.transmissive;if(h.setupLights(),U.isArrayCamera){const Q=U.cameras;if(D.length>0)for(let ce=0,_e=Q.length;ce<_e;ce++){const pe=Q[ce];Ml(z,D,x,pe)}gt&&ye.render(x);for(let ce=0,_e=Q.length;ce<_e;ce++){const pe=Q[ce];yl(m,x,pe,pe.viewport)}}else D.length>0&&Ml(z,D,x,U),gt&&ye.render(x),yl(m,x,U);F!==null&&P===0&&(Ge.updateMultisampleRenderTarget(F),Ge.updateRenderTargetMipmap(F)),x.isScene===!0&&x.onAfterRender(S,x,U),le.resetDefaultState(),E=-1,y=null,M.pop(),M.length>0?(h=M[M.length-1],$===!0&&ne.setGlobalState(S.clippingPlanes,h.state.camera)):h=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function io(x,U,B,z){if(x.visible===!1)return;if(x.layers.test(U.layers)){if(x.isGroup)B=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(U);else if(x.isLight)h.pushLight(x),x.castShadow&&h.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||it.intersectsSprite(x)){z&&Pe.setFromMatrixPosition(x.matrixWorld).applyMatrix4(ie);const ce=O.update(x),_e=x.material;_e.visible&&m.push(x,ce,_e,B,Pe.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||it.intersectsObject(x))){const ce=O.update(x),_e=x.material;if(z&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Pe.copy(x.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Pe.copy(ce.boundingSphere.center)),Pe.applyMatrix4(x.matrixWorld).applyMatrix4(ie)),Array.isArray(_e)){const pe=ce.groups;for(let Le=0,Ue=pe.length;Le<Ue;Le++){const Te=pe[Le],Xe=_e[Te.materialIndex];Xe&&Xe.visible&&m.push(x,ce,Xe,B,Pe.z,Te)}}else _e.visible&&m.push(x,ce,_e,B,Pe.z,null)}}const Q=x.children;for(let ce=0,_e=Q.length;ce<_e;ce++)io(Q[ce],U,B,z)}function yl(x,U,B,z){const D=x.opaque,Q=x.transmissive,ce=x.transparent;h.setupLightsView(B),$===!0&&ne.setGlobalState(S.clippingPlanes,B),z&&be.viewport(T.copy(z)),D.length>0&&qr(D,U,B),Q.length>0&&qr(Q,U,B),ce.length>0&&qr(ce,U,B),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function Ml(x,U,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[z.id]===void 0&&(h.state.transmissionRenderTarget[z.id]=new fn(1,1,{generateMipmaps:!0,type:Ae.has("EXT_color_buffer_half_float")||Ae.has("EXT_color_buffer_float")?Vn:wn,minFilter:Mi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));const Q=h.state.transmissionRenderTarget[z.id],ce=z.viewport||T;Q.setSize(ce.z*S.transmissionResolutionScale,ce.w*S.transmissionResolutionScale);const _e=S.getRenderTarget(),pe=S.getActiveCubeFace(),Le=S.getActiveMipmapLevel();S.setRenderTarget(Q),S.getClearColor(G),K=S.getClearAlpha(),K<1&&S.setClearColor(16777215,.5),S.clear(),gt&&ye.render(B);const Ue=S.toneMapping;S.toneMapping=ni;const Te=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),h.setupLightsView(z),$===!0&&ne.setGlobalState(S.clippingPlanes,z),qr(x,B,z),Ge.updateMultisampleRenderTarget(Q),Ge.updateRenderTargetMipmap(Q),Ae.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let tt=0,pt=U.length;tt<pt;tt++){const lt=U[tt],rt=lt.object,Ce=lt.geometry,dt=lt.material,je=lt.group;if(dt.side===On&&rt.layers.test(z.layers)){const Xt=dt.side;dt.side=Gt,dt.needsUpdate=!0,El(rt,B,z,Ce,dt,je),dt.side=Xt,dt.needsUpdate=!0,Xe=!0}}Xe===!0&&(Ge.updateMultisampleRenderTarget(Q),Ge.updateRenderTargetMipmap(Q))}S.setRenderTarget(_e,pe,Le),S.setClearColor(G,K),Te!==void 0&&(z.viewport=Te),S.toneMapping=Ue}function qr(x,U,B){const z=U.isScene===!0?U.overrideMaterial:null;for(let D=0,Q=x.length;D<Q;D++){const ce=x[D],_e=ce.object,pe=ce.geometry,Le=ce.group;let Ue=ce.material;Ue.allowOverride===!0&&z!==null&&(Ue=z),_e.layers.test(B.layers)&&El(_e,U,B,pe,Ue,Le)}}function El(x,U,B,z,D,Q){x.onBeforeRender(S,U,B,z,D,Q),x.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),D.onBeforeRender(S,U,B,z,x,Q),D.transparent===!0&&D.side===On&&D.forceSinglePass===!1?(D.side=Gt,D.needsUpdate=!0,S.renderBufferDirect(B,U,z,D,x,Q),D.side=si,D.needsUpdate=!0,S.renderBufferDirect(B,U,z,D,x,Q),D.side=On):S.renderBufferDirect(B,U,z,D,x,Q),x.onAfterRender(S,U,B,z,D,Q)}function Yr(x,U,B){U.isScene!==!0&&(U=Ne);const z=ge.get(x),D=h.state.lights,Q=h.state.shadowsArray,ce=D.state.version,_e=W.getParameters(x,D.state,Q,U,B),pe=W.getProgramCacheKey(_e);let Le=z.programs;z.environment=x.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(x.isMeshStandardMaterial?_t:Mt).get(x.envMap||z.environment),z.envMapRotation=z.environment!==null&&x.envMap===null?U.environmentRotation:x.envMapRotation,Le===void 0&&(x.addEventListener("dispose",Y),Le=new Map,z.programs=Le);let Ue=Le.get(pe);if(Ue!==void 0){if(z.currentProgram===Ue&&z.lightsStateVersion===ce)return wl(x,_e),Ue}else _e.uniforms=W.getUniforms(x),x.onBeforeCompile(_e,S),Ue=W.acquireProgram(_e,pe),Le.set(pe,Ue),z.uniforms=_e.uniforms;const Te=z.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Te.clippingPlanes=ne.uniform),wl(x,_e),z.needsLights=xd(x),z.lightsStateVersion=ce,z.needsLights&&(Te.ambientLightColor.value=D.state.ambient,Te.lightProbe.value=D.state.probe,Te.directionalLights.value=D.state.directional,Te.directionalLightShadows.value=D.state.directionalShadow,Te.spotLights.value=D.state.spot,Te.spotLightShadows.value=D.state.spotShadow,Te.rectAreaLights.value=D.state.rectArea,Te.ltc_1.value=D.state.rectAreaLTC1,Te.ltc_2.value=D.state.rectAreaLTC2,Te.pointLights.value=D.state.point,Te.pointLightShadows.value=D.state.pointShadow,Te.hemisphereLights.value=D.state.hemi,Te.directionalShadowMap.value=D.state.directionalShadowMap,Te.directionalShadowMatrix.value=D.state.directionalShadowMatrix,Te.spotShadowMap.value=D.state.spotShadowMap,Te.spotLightMatrix.value=D.state.spotLightMatrix,Te.spotLightMap.value=D.state.spotLightMap,Te.pointShadowMap.value=D.state.pointShadowMap,Te.pointShadowMatrix.value=D.state.pointShadowMatrix),z.currentProgram=Ue,z.uniformsList=null,Ue}function bl(x){if(x.uniformsList===null){const U=x.currentProgram.getUniforms();x.uniformsList=Fs.seqWithValue(U.seq,x.uniforms)}return x.uniformsList}function wl(x,U){const B=ge.get(x);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function _d(x,U,B,z,D){U.isScene!==!0&&(U=Ne),Ge.resetTextureUnits();const Q=U.fog,ce=z.isMeshStandardMaterial?U.environment:null,_e=F===null?S.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:lr,pe=(z.isMeshStandardMaterial?_t:Mt).get(z.envMap||ce),Le=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ue=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Te=!!B.morphAttributes.position,Xe=!!B.morphAttributes.normal,tt=!!B.morphAttributes.color;let pt=ni;z.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(pt=S.toneMapping);const lt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,rt=lt!==void 0?lt.length:0,Ce=ge.get(z),dt=h.state.lights;if($===!0&&(ae===!0||x!==y)){const Ut=x===y&&z.id===E;ne.setState(z,x,Ut)}let je=!1;z.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==dt.state.version||Ce.outputColorSpace!==_e||D.isBatchedMesh&&Ce.batching===!1||!D.isBatchedMesh&&Ce.batching===!0||D.isBatchedMesh&&Ce.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&Ce.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&Ce.instancing===!1||!D.isInstancedMesh&&Ce.instancing===!0||D.isSkinnedMesh&&Ce.skinning===!1||!D.isSkinnedMesh&&Ce.skinning===!0||D.isInstancedMesh&&Ce.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Ce.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Ce.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Ce.instancingMorph===!1&&D.morphTexture!==null||Ce.envMap!==pe||z.fog===!0&&Ce.fog!==Q||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==ne.numPlanes||Ce.numIntersection!==ne.numIntersection)||Ce.vertexAlphas!==Le||Ce.vertexTangents!==Ue||Ce.morphTargets!==Te||Ce.morphNormals!==Xe||Ce.morphColors!==tt||Ce.toneMapping!==pt||Ce.morphTargetsCount!==rt)&&(je=!0):(je=!0,Ce.__version=z.version);let Xt=Ce.currentProgram;je===!0&&(Xt=Yr(z,U,D));let Ii=!1,$t=!1,Sr=!1;const ht=Xt.getUniforms(),Jt=Ce.uniforms;if(be.useProgram(Xt.program)&&(Ii=!0,$t=!0,Sr=!0),z.id!==E&&(E=z.id,$t=!0),Ii||y!==x){be.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ht.setValue(A,"projectionMatrix",x.projectionMatrix),ht.setValue(A,"viewMatrix",x.matrixWorldInverse);const kt=ht.map.cameraPosition;kt!==void 0&&kt.setValue(A,Re.setFromMatrixPosition(x.matrixWorld)),Ze.logarithmicDepthBuffer&&ht.setValue(A,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ht.setValue(A,"isOrthographic",x.isOrthographicCamera===!0),y!==x&&(y=x,$t=!0,Sr=!0)}if(D.isSkinnedMesh){ht.setOptional(A,D,"bindMatrix"),ht.setOptional(A,D,"bindMatrixInverse");const Ut=D.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),ht.setValue(A,"boneTexture",Ut.boneTexture,Ge))}D.isBatchedMesh&&(ht.setOptional(A,D,"batchingTexture"),ht.setValue(A,"batchingTexture",D._matricesTexture,Ge),ht.setOptional(A,D,"batchingIdTexture"),ht.setValue(A,"batchingIdTexture",D._indirectTexture,Ge),ht.setOptional(A,D,"batchingColorTexture"),D._colorsTexture!==null&&ht.setValue(A,"batchingColorTexture",D._colorsTexture,Ge));const en=B.morphAttributes;if((en.position!==void 0||en.normal!==void 0||en.color!==void 0)&&J.update(D,B,Xt),($t||Ce.receiveShadow!==D.receiveShadow)&&(Ce.receiveShadow=D.receiveShadow,ht.setValue(A,"receiveShadow",D.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Jt.envMap.value=pe,Jt.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(Jt.envMapIntensity.value=U.environmentIntensity),$t&&(ht.setValue(A,"toneMappingExposure",S.toneMappingExposure),Ce.needsLights&&vd(Jt,Sr),Q&&z.fog===!0&&j.refreshFogUniforms(Jt,Q),j.refreshMaterialUniforms(Jt,z,V,te,h.state.transmissionRenderTarget[x.id]),Fs.upload(A,bl(Ce),Jt,Ge)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Fs.upload(A,bl(Ce),Jt,Ge),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ht.setValue(A,"center",D.center),ht.setValue(A,"modelViewMatrix",D.modelViewMatrix),ht.setValue(A,"normalMatrix",D.normalMatrix),ht.setValue(A,"modelMatrix",D.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ut=z.uniformsGroups;for(let kt=0,ro=Ut.length;kt<ro;kt++){const ui=Ut[kt];ze.update(ui,Xt),ze.bind(ui,Xt)}}return Xt}function vd(x,U){x.ambientLightColor.needsUpdate=U,x.lightProbe.needsUpdate=U,x.directionalLights.needsUpdate=U,x.directionalLightShadows.needsUpdate=U,x.pointLights.needsUpdate=U,x.pointLightShadows.needsUpdate=U,x.spotLights.needsUpdate=U,x.spotLightShadows.needsUpdate=U,x.rectAreaLights.needsUpdate=U,x.hemisphereLights.needsUpdate=U}function xd(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(x,U,B){const z=ge.get(x);z.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),ge.get(x.texture).__webglTexture=U,ge.get(x.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,U){const B=ge.get(x);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0};const Sd=A.createFramebuffer();this.setRenderTarget=function(x,U=0,B=0){F=x,R=U,P=B;let z=!0,D=null,Q=!1,ce=!1;if(x){const pe=ge.get(x);if(pe.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(A.FRAMEBUFFER,null),z=!1;else if(pe.__webglFramebuffer===void 0)Ge.setupRenderTarget(x);else if(pe.__hasExternalTextures)Ge.rebindTextures(x,ge.get(x.texture).__webglTexture,ge.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Te=x.depthTexture;if(pe.__boundDepthTexture!==Te){if(Te!==null&&ge.has(Te)&&(x.width!==Te.image.width||x.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ge.setupDepthRenderbuffer(x)}}const Le=x.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(ce=!0);const Ue=ge.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?D=Ue[U][B]:D=Ue[U],Q=!0):x.samples>0&&Ge.useMultisampledRTT(x)===!1?D=ge.get(x).__webglMultisampledFramebuffer:Array.isArray(Ue)?D=Ue[B]:D=Ue,T.copy(x.viewport),X.copy(x.scissor),k=x.scissorTest}else T.copy(we).multiplyScalar(V).floor(),X.copy(He).multiplyScalar(V).floor(),k=ct;if(B!==0&&(D=Sd),be.bindFramebuffer(A.FRAMEBUFFER,D)&&z&&be.drawBuffers(x,D),be.viewport(T),be.scissor(X),be.setScissorTest(k),Q){const pe=ge.get(x.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+U,pe.__webglTexture,B)}else if(ce){const pe=U;for(let Le=0;Le<x.textures.length;Le++){const Ue=ge.get(x.textures[Le]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Le,Ue.__webglTexture,B,pe)}}else if(x!==null&&B!==0){const pe=ge.get(x.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,pe.__webglTexture,B)}E=-1},this.readRenderTargetPixels=function(x,U,B,z,D,Q,ce,_e=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pe=ge.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ce!==void 0&&(pe=pe[ce]),pe){be.bindFramebuffer(A.FRAMEBUFFER,pe);try{const Le=x.textures[_e],Ue=Le.format,Te=Le.type;if(!Ze.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ze.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=x.width-z&&B>=0&&B<=x.height-D&&(x.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+_e),A.readPixels(U,B,z,D,Me.convert(Ue),Me.convert(Te),Q))}finally{const Le=F!==null?ge.get(F).__webglFramebuffer:null;be.bindFramebuffer(A.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(x,U,B,z,D,Q,ce,_e=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pe=ge.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ce!==void 0&&(pe=pe[ce]),pe)if(U>=0&&U<=x.width-z&&B>=0&&B<=x.height-D){be.bindFramebuffer(A.FRAMEBUFFER,pe);const Le=x.textures[_e],Ue=Le.format,Te=Le.type;if(!Ze.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ze.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xe=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Xe),A.bufferData(A.PIXEL_PACK_BUFFER,Q.byteLength,A.STREAM_READ),x.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+_e),A.readPixels(U,B,z,D,Me.convert(Ue),Me.convert(Te),0);const tt=F!==null?ge.get(F).__webglFramebuffer:null;be.bindFramebuffer(A.FRAMEBUFFER,tt);const pt=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await qh(A,pt,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Xe),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,Q),A.deleteBuffer(Xe),A.deleteSync(pt),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,U=null,B=0){const z=Math.pow(2,-B),D=Math.floor(x.image.width*z),Q=Math.floor(x.image.height*z),ce=U!==null?U.x:0,_e=U!==null?U.y:0;Ge.setTexture2D(x,0),A.copyTexSubImage2D(A.TEXTURE_2D,B,0,0,ce,_e,D,Q),be.unbindTexture()};const yd=A.createFramebuffer(),Md=A.createFramebuffer();this.copyTextureToTexture=function(x,U,B=null,z=null,D=0,Q=null){Q===null&&(D!==0?(nr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=D,D=0):Q=0);let ce,_e,pe,Le,Ue,Te,Xe,tt,pt;const lt=x.isCompressedTexture?x.mipmaps[Q]:x.image;if(B!==null)ce=B.max.x-B.min.x,_e=B.max.y-B.min.y,pe=B.isBox3?B.max.z-B.min.z:1,Le=B.min.x,Ue=B.min.y,Te=B.isBox3?B.min.z:0;else{const en=Math.pow(2,-D);ce=Math.floor(lt.width*en),_e=Math.floor(lt.height*en),x.isDataArrayTexture?pe=lt.depth:x.isData3DTexture?pe=Math.floor(lt.depth*en):pe=1,Le=0,Ue=0,Te=0}z!==null?(Xe=z.x,tt=z.y,pt=z.z):(Xe=0,tt=0,pt=0);const rt=Me.convert(U.format),Ce=Me.convert(U.type);let dt;U.isData3DTexture?(Ge.setTexture3D(U,0),dt=A.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ge.setTexture2DArray(U,0),dt=A.TEXTURE_2D_ARRAY):(Ge.setTexture2D(U,0),dt=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,U.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,U.unpackAlignment);const je=A.getParameter(A.UNPACK_ROW_LENGTH),Xt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Ii=A.getParameter(A.UNPACK_SKIP_PIXELS),$t=A.getParameter(A.UNPACK_SKIP_ROWS),Sr=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,lt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,lt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Le),A.pixelStorei(A.UNPACK_SKIP_ROWS,Ue),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Te);const ht=x.isDataArrayTexture||x.isData3DTexture,Jt=U.isDataArrayTexture||U.isData3DTexture;if(x.isDepthTexture){const en=ge.get(x),Ut=ge.get(U),kt=ge.get(en.__renderTarget),ro=ge.get(Ut.__renderTarget);be.bindFramebuffer(A.READ_FRAMEBUFFER,kt.__webglFramebuffer),be.bindFramebuffer(A.DRAW_FRAMEBUFFER,ro.__webglFramebuffer);for(let ui=0;ui<pe;ui++)ht&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,ge.get(x).__webglTexture,D,Te+ui),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,ge.get(U).__webglTexture,Q,pt+ui)),A.blitFramebuffer(Le,Ue,ce,_e,Xe,tt,ce,_e,A.DEPTH_BUFFER_BIT,A.NEAREST);be.bindFramebuffer(A.READ_FRAMEBUFFER,null),be.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(D!==0||x.isRenderTargetTexture||ge.has(x)){const en=ge.get(x),Ut=ge.get(U);be.bindFramebuffer(A.READ_FRAMEBUFFER,yd),be.bindFramebuffer(A.DRAW_FRAMEBUFFER,Md);for(let kt=0;kt<pe;kt++)ht?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,en.__webglTexture,D,Te+kt):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,en.__webglTexture,D),Jt?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Ut.__webglTexture,Q,pt+kt):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Ut.__webglTexture,Q),D!==0?A.blitFramebuffer(Le,Ue,ce,_e,Xe,tt,ce,_e,A.COLOR_BUFFER_BIT,A.NEAREST):Jt?A.copyTexSubImage3D(dt,Q,Xe,tt,pt+kt,Le,Ue,ce,_e):A.copyTexSubImage2D(dt,Q,Xe,tt,Le,Ue,ce,_e);be.bindFramebuffer(A.READ_FRAMEBUFFER,null),be.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else Jt?x.isDataTexture||x.isData3DTexture?A.texSubImage3D(dt,Q,Xe,tt,pt,ce,_e,pe,rt,Ce,lt.data):U.isCompressedArrayTexture?A.compressedTexSubImage3D(dt,Q,Xe,tt,pt,ce,_e,pe,rt,lt.data):A.texSubImage3D(dt,Q,Xe,tt,pt,ce,_e,pe,rt,Ce,lt):x.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,Q,Xe,tt,ce,_e,rt,Ce,lt.data):x.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,Q,Xe,tt,lt.width,lt.height,rt,lt.data):A.texSubImage2D(A.TEXTURE_2D,Q,Xe,tt,ce,_e,rt,Ce,lt);A.pixelStorei(A.UNPACK_ROW_LENGTH,je),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Xt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ii),A.pixelStorei(A.UNPACK_SKIP_ROWS,$t),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Sr),Q===0&&U.generateMipmaps&&A.generateMipmap(dt),be.unbindTexture()},this.copyTextureToTexture3D=function(x,U,B=null,z=null,D=0){return nr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,U,B,z,D)},this.initRenderTarget=function(x){ge.get(x).__webglFramebuffer===void 0&&Ge.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Ge.setTextureCube(x,0):x.isData3DTexture?Ge.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Ge.setTexture2DArray(x,0):Ge.setTexture2D(x,0),be.unbindTexture()},this.resetState=function(){R=0,P=0,F=null,be.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}let Zt=new vf,Ot=new rn(30,window.innerWidth/window.innerHeight,.1,1e3),Qt=new y0({antialias:!0,alpha:!0});function M0(){const n=new Lf(16777215,1);n.position.set(0,0,25),Zt.add(n);const e=new If(16777215,1);Zt.add(e),Zt.background=null,Qt.setSize(window.innerWidth,window.innerHeight),Qt.setPixelRatio(window.devicePixelRatio),document.querySelector(".app").appendChild(Qt.domElement)}Ot.updateProjectionMatrix();function Pc(n,{size:e=.2,segments:t=32,color:i=16777215}){let r=[];const s=i;for(let o=0;o<n;o++){let a=null;switch(t){case 16:a=new cl(e,t,t);break;case 2:a=new _r(e,e,e);break;case 4:a=new Hr(e,e);break;case 1:a=new Xs(e,t);break;default:a=new Xs(e,t)}if(typeof N.circle.colorShift=="number"&&(i=Math.floor(255*(o/(n-1)))<<N.circle.colorShift),N.circle.colorShift===!0){const u=Math.floor(255*(o/(n-1)));i=u<<s|u<<s+8|u<<s+16}const c=N.circle.showLinesOnly?new ll({color:i}):N.circle.light3d?new Tf({color:i}):new js({color:i});let l;if(N.circle.showLinesOnly){const u=new bf(a);l=new Ef(u,c)}else l=new on(a,c);switch(t){case 2:l.rotation.z=0;break;case 4:l.rotation.z=0;break;case 1:l.rotation.z=Math.PI/6;break;case 16:l.rotation.z=0;break;default:l.rotation.z=0}Zt.add(l),r.push(l)}return r}function Lc(n,e=!0){for(let t=0;t<jt.length;t++){const i=N.circleMovement.expansionThreshold;t!==-1&&(jt[t]=jt[t]/255*(255-t*i))}for(let t=0;t<n.length;t++){const i=e?jt[t]/255*N.circleMovement.space-N.circleMovement.centerOffset:jt[t]/255*N.circleMovement.space+N.circleMovement.centerOffset,r=t/n.length/.2*Math.PI*2+performance.now()*(N.circleMovement.rotationSpeed/25)*.002+(N.circleMovement.isVariatingSpeed&&jt[1]/jt[0]||0);n[t].position.x=(e?1:-1)*Math.cos(r)*i,n[t].position.y=Math.sin(r)*i,n[t].position.z=N.circleMovement.expansionDirection*(N.circle.depthMirror&&t%2?1:-1)*(jt[t]/255)*5,n[t].scale.x=Math.max(jt[t]/255*N.circleMovement.maxSize,N.circleMovement.minSize),n[t].scale.y=Math.max(jt[t]/255*N.circleMovement.maxSize,N.circleMovement.minSize),n[t].scale.z=Math.max(jt[t]/255*N.circleMovement.maxSize,N.circleMovement.minSize),N.circleMovement.isCirclesSpin&&(n[t].rotation.z+=.1,(N.circle.segments===16||N.circle.segments===2)&&(n[t].rotation.x+=.01))}}const rr=n=>n.slice().sort(()=>Math.random()-.5);function E0(n,{color:e=65280}){let t=[];for(let i=0;i<n;i++){const r=new ll({color:e}),s=[];s.push(new I(0,0,0)),s.push(new I(0,0,0));const o=new zt().setFromPoints(s),a=new bu(o,r);Zt.add(a),t.push(a)}return t}const Ic=new ai,bs=new I;class Uu extends Uf{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new vt(e,3)),this.setAttribute("uv",new vt(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Wa(t,6,1);return this.setAttribute("instanceStart",new ei(i,3,0)),this.setAttribute("instanceEnd",new ei(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Wa(t,6,1);return this.setAttribute("instanceColorStart",new ei(i,3,0)),this.setAttribute("instanceColorEnd",new ei(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new wf(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Ic.setFromBufferAttribute(t),this.boundingBox.union(Ic))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mr),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)bs.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(bs)),bs.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(bs));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}se.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Fe(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ht.line={uniforms:ur.merge([se.common,se.fog,se.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class hl extends Bt{constructor(e){super({type:"LineMaterial",uniforms:ur.clone(Ht.line.uniforms),vertexShader:Ht.line.vertexShader,fragmentShader:Ht.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const ko=new st,Uc=new I,Dc=new I,Tt=new st,At=new st,_n=new st,Vo=new I,Ho=new ft,Ct=new Bf,Fc=new I,ws=new ai,Ts=new mr,vn=new st;let Sn,wi;function Nc(n,e,t){return vn.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),vn.multiplyScalar(1/vn.w),vn.x=wi/t.width,vn.y=wi/t.height,vn.applyMatrix4(n.projectionMatrixInverse),vn.multiplyScalar(1/vn.w),Math.abs(Math.max(vn.x,vn.y))}function b0(n,e){const t=n.matrixWorld,i=n.geometry,r=i.attributes.instanceStart,s=i.attributes.instanceEnd,o=Math.min(i.instanceCount,r.count);for(let a=0,c=o;a<c;a++){Ct.start.fromBufferAttribute(r,a),Ct.end.fromBufferAttribute(s,a),Ct.applyMatrix4(t);const l=new I,u=new I;Sn.distanceSqToSegment(Ct.start,Ct.end,u,l),u.distanceTo(l)<wi*.5&&e.push({point:u,pointOnLine:l,distance:Sn.origin.distanceTo(u),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function w0(n,e,t){const i=e.projectionMatrix,s=n.material.resolution,o=n.matrixWorld,a=n.geometry,c=a.attributes.instanceStart,l=a.attributes.instanceEnd,u=Math.min(a.instanceCount,c.count),d=-e.near;Sn.at(1,_n),_n.w=1,_n.applyMatrix4(e.matrixWorldInverse),_n.applyMatrix4(i),_n.multiplyScalar(1/_n.w),_n.x*=s.x/2,_n.y*=s.y/2,_n.z=0,Vo.copy(_n),Ho.multiplyMatrices(e.matrixWorldInverse,o);for(let f=0,p=u;f<p;f++){if(Tt.fromBufferAttribute(c,f),At.fromBufferAttribute(l,f),Tt.w=1,At.w=1,Tt.applyMatrix4(Ho),At.applyMatrix4(Ho),Tt.z>d&&At.z>d)continue;if(Tt.z>d){const M=Tt.z-At.z,S=(Tt.z-d)/M;Tt.lerp(At,S)}else if(At.z>d){const M=At.z-Tt.z,S=(At.z-d)/M;At.lerp(Tt,S)}Tt.applyMatrix4(i),At.applyMatrix4(i),Tt.multiplyScalar(1/Tt.w),At.multiplyScalar(1/At.w),Tt.x*=s.x/2,Tt.y*=s.y/2,At.x*=s.x/2,At.y*=s.y/2,Ct.start.copy(Tt),Ct.start.z=0,Ct.end.copy(At),Ct.end.z=0;const _=Ct.closestPointToPointParameter(Vo,!0);Ct.at(_,Fc);const m=Xh.lerp(Tt.z,At.z,_),h=m>=-1&&m<=1,b=Vo.distanceTo(Fc)<wi*.5;if(h&&b){Ct.start.fromBufferAttribute(c,f),Ct.end.fromBufferAttribute(l,f),Ct.start.applyMatrix4(o),Ct.end.applyMatrix4(o);const M=new I,S=new I;Sn.distanceSqToSegment(Ct.start,Ct.end,S,M),t.push({point:S,pointOnLine:M,distance:Sn.origin.distanceTo(S),object:n,face:null,faceIndex:f,uv:null,uv1:null})}}}class T0 extends on{constructor(e=new Uu,t=new hl({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let o=0,a=0,c=t.count;o<c;o++,a+=2)Uc.fromBufferAttribute(t,o),Dc.fromBufferAttribute(i,o),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Uc.distanceTo(Dc);const s=new Wa(r,2,1);return e.setAttribute("instanceDistanceStart",new ei(s,1,0)),e.setAttribute("instanceDistanceEnd",new ei(s,1,1)),this}raycast(e,t){const i=this.material.worldUnits,r=e.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Sn=e.ray;const o=this.matrixWorld,a=this.geometry,c=this.material;wi=c.linewidth+s,a.boundingSphere===null&&a.computeBoundingSphere(),Ts.copy(a.boundingSphere).applyMatrix4(o);let l;if(i)l=wi*.5;else{const d=Math.max(r.near,Ts.distanceToPoint(Sn.origin));l=Nc(r,d,c.resolution)}if(Ts.radius+=l,Sn.intersectsSphere(Ts)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),ws.copy(a.boundingBox).applyMatrix4(o);let u;if(i)u=wi*.5;else{const d=Math.max(r.near,ws.distanceToPoint(Sn.origin));u=Nc(r,d,c.resolution)}ws.expandByScalar(u),Sn.intersectsBox(ws)!==!1&&(i?b0(this,t):w0(this,r,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(ko),this.material.uniforms.resolution.value.set(ko.z,ko.w))}}class Du extends Uu{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,i=new Float32Array(2*t);for(let r=0;r<t;r+=3)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];return super.setPositions(i),this}setColors(e){const t=e.length-3,i=new Float32Array(2*t);for(let r=0;r<t;r+=3)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];return super.setColors(i),this}setFromPoints(e){const t=e.length-1,i=new Float32Array(6*t);for(let r=0;r<t;r++)i[6*r]=e[r].x,i[6*r+1]=e[r].y,i[6*r+2]=e[r].z||0,i[6*r+3]=e[r+1].x,i[6*r+4]=e[r+1].y,i[6*r+5]=e[r+1].z||0;return super.setPositions(i),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class A0 extends T0{constructor(e=new Du,t=new hl({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}function C0(n,{size:e=.3,linewidth:t=1,color:i=16711680}){let r=[];for(let s=0;s<n*2;s++){const o=[new I(-e,-e,0),new I(e,-e,0),new I(e,e,0),new I(-e,e,0),new I(-e,-e,0)],a=new Du().setFromPoints(o),c=new hl({color:i,linewidth:t}),l=new A0(a,c);Zt.add(l),r.push(l)}return r}function Ri(){{if(N.debugTrace.lines){for(let n of N.debugTrace.lines)Zt.remove(n),n.geometry.dispose(),n.material.dispose();N.debugTrace.lines.splice(0,N.debugTrace.lines.length)}if(N.debugTrace.squares){for(let n of N.debugTrace.squares)Zt.remove(n),n.geometry.dispose(),n.material.dispose();N.debugTrace.squares.splice(0,N.debugTrace.squares.length)}}N.debugTrace.lines=E0(N.debugTrace.count,{color:N.debugTrace.lineColor}),N.debugTrace.squares=C0(N.debugTrace.count,{size:N.debugTrace.size,color:N.debugTrace.squareColor})}function Wn(){if(N.circle.circlesPair)for(let n of N.circle.circlesPair)n.forEach(e=>{Zt.remove(e)}),n.splice(0,n.length);N.circle.circlesPair=[Pc(N.circle.count,{size:N.circle.size,segments:N.circle.segments,color:N.circle.color}),N.circleMovement.symmetry?Pc(N.circle.count,{size:N.circle.size,segments:N.circle.segments,color:N.circle.color}):[]],N.circle.shuffledCirclesPair=[rr(N.circle.circlesPair[0]),N.circleMovement.symmetry?rr(N.circle.circlesPair[1]):rr(N.circle.circlesPair[0])]}const N={render:{type:0},scene:{alwaysLookCenter:!0,cameraFov:30,cameraDistance:25,cameraVertical:0,cameraHorizontal:0,color:0,colorAlpha:1},circle:{count:27,size:.15,segments:32,color:16777215,colorShift:!1,depthMirror:!1,showLinesOnly:!1,light3d:!1},circleMovement:{stop:!1,space:4,rotationSpeed:25,expansionThreshold:.5,expansionDirection:1,isVariatingSpeed:!0,isCirclesSpin:!1,maxSize:2.5,minSize:.7,centerOffset:0,symmetry:!0},debugTrace:{count:0,size:.3,random:!0,changeRate:60,minDelay:30,squareColor:16711680,lineColor:65280},glow:{isActive:!0,strength:.4,radius:1,threshold:0}};Wn();Ri();function R0(){N.circle.shuffledCirclesPair[0]=rr(N.circle.circlesPair[0]),N.circle.shuffledCirclesPair[1]=N.circleMovement.symmetry?rr(N.circle.circlesPair[1]):rr(N.circle.circlesPair[0])}function P0(){for(let n=0;n<N.debugTrace.count;n++){const e=N.debugTrace.lines[n],t=N.circle.shuffledCirclesPair[0][n],i=N.circle.shuffledCirclesPair[1][N.circle.shuffledCirclesPair[1].length-1-n],r=[t.position,i.position];e.geometry.setFromPoints(r)}}function L0(){for(let n=0;n<N.debugTrace.count;n++){const e=N.debugTrace.squares[n],t=N.debugTrace.squares[n+N.debugTrace.count],i=N.circle.shuffledCirclesPair[0][n],r=N.circle.shuffledCirclesPair[1][N.circle.shuffledCirclesPair[1].length-1-n];e.position.set(i.position.x,i.position.y,i.position.z),t.position.set(r.position.x,r.position.y,r.position.z),e.scale.set(i.scale.x,i.scale.y,1),t.scale.set(r.scale.x,r.scale.y,1)}}function I0(){Ki&&!N.circleMovement.stop&&(Ki.getByteFrequencyData(jt),Lc(N.circle.circlesPair[0],!0),N.circleMovement.symmetry&&Lc(N.circle.circlesPair[1],!1),P0(),L0())}class Gr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const U0=new ul(-1,1,1,-1,0,1);class D0 extends zt{constructor(){super(),this.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new vt([0,2,0,0,2,0],2))}}const F0=new D0;class Fu{constructor(e){this._mesh=new on(F0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,U0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}const Ns={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},N0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new $e(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class dr extends Gr{constructor(e,t=1,i,r){super(),this.strength=t,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new Fe(e.x,e.y):new Fe(256,256),this.clearColor=new $e(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new fn(s,o,{type:Vn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new fn(s,o,{type:Vn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new fn(s,o,{type:Vn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),o=Math.round(o/2)}const a=N0;this.highPassUniforms=ur.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Bt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Fe(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ur.clone(Ns.uniforms),this.blendMaterial=new Bt({uniforms:this.copyUniforms,vertexShader:Ns.vertexShader,fragmentShader:Ns.fragmentShader,blending:ia,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new $e,this._oldClearAlpha=1,this._basic=new js,this._fsQuad=new Fu(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Fe(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=dr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=dr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new Bt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Fe(.5,.5)},direction:{value:new Fe(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new Bt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}dr.BlurDirectionX=new Fe(1,0);dr.BlurDirectionY=new Fe(0,1);class O0 extends Gr{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Bt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ur.clone(e.uniforms),this.material=new Bt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Fu(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Oc extends Gr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class B0 extends Gr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class z0{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Fe);this._width=i.width,this._height=i.height,t=new fn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Vn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new O0(Ns),this.copyPass.material.blending=kn,this.clock=new Ff}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Oc!==void 0&&(o instanceof Oc?i=!0:o instanceof B0&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Fe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class k0 extends Gr{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new $e}render(e,t,i){const r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}}const Qi=new z0(Qt);Qi.addPass(new k0(Zt,Ot));let Go=null;function Wr(){Qi.removePass(Go),Go=new dr(new Fe(window.innerWidth,window.innerHeight),N.glow.strength,N.glow.radius,N.glow.threshold),Qi.setSize(window.innerWidth,window.innerHeight),Qi.setPixelRatio(window.devicePixelRatio),Qi.addPass(Go)}let Kt=null,Nu=.7,Bc=0,Ou=15;function V0(n){Nu=n}function H0(n){Ou=n}function $a(){Kt&&(Kt.close(),Kt=null)}function G0(n){Kt=new WebSocket(n),Kt.onerror=t=>{console.error("WebSocket error:",t),alert("Unable to connect to the server. Please check the address and try again."),$a()},Kt.onclose=t=>{console.warn("WebSocket connection closed:",t),Kt=null},Kt.binaryType="arraybuffer";function e(){performance.now()-Bc>1e3/Ou&&(Bc=performance.now(),Qt.domElement.toBlob(t=>{Kt&&Kt.readyState===WebSocket.OPEN&&Kt.send(t)},"image/jpeg",Nu)),Kt&&requestAnimationFrame(e)}Kt.onopen=()=>{console.log("Connected to relay server"),e()}}/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */function fe(n){if(!n)throw new Error("Assertion failed.")}const yn=n=>n&&n[n.length-1],hr=n=>n>=0&&n<2**32;class kr{constructor(e){this.bytes=e,this.pos=0}seekToByte(e){this.pos=8*e}readBit(){const e=Math.floor(this.pos/8),t=this.bytes[e]??0,i=7-(this.pos&7),r=(t&1<<i)>>i;return this.pos++,r}readBits(e){if(e===1)return this.readBit();let t=0;for(let i=0;i<e;i++)t<<=1,t|=this.readBit();return t}writeBits(e,t){const i=this.pos+e;for(let r=this.pos;r<i;r++){const s=Math.floor(r/8);let o=this.bytes[s];const a=7-(r&7);o&=~(1<<a),o|=(t&1<<i-r-1)>>i-r-1<<a,this.bytes[s]=o}this.pos=i}readAlignedByte(){if(this.pos%8!==0)throw new Error("Bitstream is not byte-aligned.");const e=this.pos/8,t=this.bytes[e]??0;return this.pos+=8,t}skipBits(e){this.pos+=e}getBitsLeft(){return this.bytes.length*8-this.pos}clone(){const e=new kr(this.bytes);return e.pos=this.pos,e}}const xe=n=>{let e=0;for(;n.readBits(1)===0&&e<32;)e++;if(e>=32)throw new Error("Invalid exponential-Golomb code.");return(1<<e)-1+n.readBits(e)},Lr=n=>{const e=xe(n);return(e&1)===0?-(e>>1):e+1>>1},ii=n=>n instanceof Uint8Array?n:n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength),Bu=n=>n instanceof DataView?n:n instanceof ArrayBuffer?new DataView(n):new DataView(n.buffer,n.byteOffset,n.byteLength);new TextDecoder;const Ei=new TextEncoder,fl=n=>Object.fromEntries(Object.entries(n).map(([e,t])=>[t,e])),Zs={bt709:1,bt470bg:5,smpte170m:6,bt2020:9,smpte432:12};fl(Zs);const Qs={bt709:1,smpte170m:6,linear:8,"iec61966-2-1":13,pg:16,hlg:18};fl(Qs);const Js={rgb:0,bt709:1,bt470bg:5,smpte170m:6,"bt2020-ncl":9};fl(Js);const W0=n=>!!n&&!!n.primaries&&!!n.transfer&&!!n.matrix&&n.fullRange!==void 0,eo=n=>n instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&n instanceof SharedArrayBuffer||ArrayBuffer.isView(n);class zu{constructor(){this.currentPromise=Promise.resolve()}async acquire(){let e;const t=new Promise(r=>{e=r}),i=this.currentPromise;return this.currentPromise=t,await i,e}}const ku=()=>{let n,e;return{promise:new Promise((i,r)=>{n=i,e=r}),resolve:n,reject:e}},X0=n=>{throw new Error(`Unexpected value: ${n}`)},Vu=(n,e,t,i)=>{t=t>>>0,t=t&16777215,i?(n.setUint8(e,t&255),n.setUint8(e+1,t>>>8&255),n.setUint8(e+2,t>>>16&255)):(n.setUint8(e,t>>>16&255),n.setUint8(e+1,t>>>8&255),n.setUint8(e+2,t&255))},$0=(n,e,t,i)=>{t=Vt(t,-8388608,8388607),t<0&&(t=t+16777216&16777215),Vu(n,e,t,i)},Vt=(n,e,t)=>Math.max(e,Math.min(t,n)),q0="und",Y0=/^[a-z]{3}$/,j0=n=>Y0.test(n),ti=1e6*(1+Number.EPSILON),K0=(n,e)=>{const t=n<0?-1:1;n=Math.abs(n);let i=0,r=1,s=1,o=0,a=n;for(;;){const c=Math.floor(a),l=c*s+i,u=c*o+r;if(u>e)return{numerator:t*s,denominator:o};if(i=s,r=o,s=l,o=u,a=1/(a-c),!isFinite(a))break}return{numerator:t*s,denominator:o}};class Hu{constructor(){this.currentPromise=Promise.resolve()}call(e){return this.currentPromise=this.currentPromise.then(e)}}/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */const Ai=["avc","hevc","vp9","av1","vp8"],An=["pcm-s16","pcm-s16be","pcm-s24","pcm-s24be","pcm-s32","pcm-s32be","pcm-f32","pcm-f32be","pcm-f64","pcm-f64be","pcm-u8","pcm-s8","ulaw","alaw"],Gu=["aac","opus","mp3","vorbis","flac"],fr=[...Gu,...An],$s=["webvtt"],zc=[{maxMacroblocks:99,maxBitrate:64e3,level:10},{maxMacroblocks:396,maxBitrate:192e3,level:11},{maxMacroblocks:396,maxBitrate:384e3,level:12},{maxMacroblocks:396,maxBitrate:768e3,level:13},{maxMacroblocks:396,maxBitrate:2e6,level:20},{maxMacroblocks:792,maxBitrate:4e6,level:21},{maxMacroblocks:1620,maxBitrate:4e6,level:22},{maxMacroblocks:1620,maxBitrate:1e7,level:30},{maxMacroblocks:3600,maxBitrate:14e6,level:31},{maxMacroblocks:5120,maxBitrate:2e7,level:32},{maxMacroblocks:8192,maxBitrate:2e7,level:40},{maxMacroblocks:8192,maxBitrate:5e7,level:41},{maxMacroblocks:8704,maxBitrate:5e7,level:42},{maxMacroblocks:22080,maxBitrate:135e6,level:50},{maxMacroblocks:36864,maxBitrate:24e7,level:51},{maxMacroblocks:36864,maxBitrate:24e7,level:52},{maxMacroblocks:139264,maxBitrate:24e7,level:60},{maxMacroblocks:139264,maxBitrate:48e7,level:61},{maxMacroblocks:139264,maxBitrate:8e8,level:62}],kc=[{maxPictureSize:36864,maxBitrate:128e3,tier:"L",level:30},{maxPictureSize:122880,maxBitrate:15e5,tier:"L",level:60},{maxPictureSize:245760,maxBitrate:3e6,tier:"L",level:63},{maxPictureSize:552960,maxBitrate:6e6,tier:"L",level:90},{maxPictureSize:983040,maxBitrate:1e7,tier:"L",level:93},{maxPictureSize:2228224,maxBitrate:12e6,tier:"L",level:120},{maxPictureSize:2228224,maxBitrate:3e7,tier:"H",level:120},{maxPictureSize:2228224,maxBitrate:2e7,tier:"L",level:123},{maxPictureSize:2228224,maxBitrate:5e7,tier:"H",level:123},{maxPictureSize:8912896,maxBitrate:25e6,tier:"L",level:150},{maxPictureSize:8912896,maxBitrate:1e8,tier:"H",level:150},{maxPictureSize:8912896,maxBitrate:4e7,tier:"L",level:153},{maxPictureSize:8912896,maxBitrate:16e7,tier:"H",level:153},{maxPictureSize:8912896,maxBitrate:6e7,tier:"L",level:156},{maxPictureSize:8912896,maxBitrate:24e7,tier:"H",level:156},{maxPictureSize:35651584,maxBitrate:6e7,tier:"L",level:180},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:180},{maxPictureSize:35651584,maxBitrate:12e7,tier:"L",level:183},{maxPictureSize:35651584,maxBitrate:48e7,tier:"H",level:183},{maxPictureSize:35651584,maxBitrate:24e7,tier:"L",level:186},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:186}],Vc=[{maxPictureSize:36864,maxBitrate:2e5,level:10},{maxPictureSize:73728,maxBitrate:8e5,level:11},{maxPictureSize:122880,maxBitrate:18e5,level:20},{maxPictureSize:245760,maxBitrate:36e5,level:21},{maxPictureSize:552960,maxBitrate:72e5,level:30},{maxPictureSize:983040,maxBitrate:12e6,level:31},{maxPictureSize:2228224,maxBitrate:18e6,level:40},{maxPictureSize:2228224,maxBitrate:3e7,level:41},{maxPictureSize:8912896,maxBitrate:6e7,level:50},{maxPictureSize:8912896,maxBitrate:12e7,level:51},{maxPictureSize:8912896,maxBitrate:18e7,level:52},{maxPictureSize:35651584,maxBitrate:18e7,level:60},{maxPictureSize:35651584,maxBitrate:24e7,level:61},{maxPictureSize:35651584,maxBitrate:48e7,level:62}],Hc=[{maxPictureSize:147456,maxBitrate:15e5,tier:"M",level:0},{maxPictureSize:278784,maxBitrate:3e6,tier:"M",level:1},{maxPictureSize:665856,maxBitrate:6e6,tier:"M",level:4},{maxPictureSize:1065024,maxBitrate:1e7,tier:"M",level:5},{maxPictureSize:2359296,maxBitrate:12e6,tier:"M",level:8},{maxPictureSize:2359296,maxBitrate:3e7,tier:"H",level:8},{maxPictureSize:2359296,maxBitrate:2e7,tier:"M",level:9},{maxPictureSize:2359296,maxBitrate:5e7,tier:"H",level:9},{maxPictureSize:8912896,maxBitrate:3e7,tier:"M",level:12},{maxPictureSize:8912896,maxBitrate:1e8,tier:"H",level:12},{maxPictureSize:8912896,maxBitrate:4e7,tier:"M",level:13},{maxPictureSize:8912896,maxBitrate:16e7,tier:"H",level:13},{maxPictureSize:8912896,maxBitrate:6e7,tier:"M",level:14},{maxPictureSize:8912896,maxBitrate:24e7,tier:"H",level:14},{maxPictureSize:35651584,maxBitrate:6e7,tier:"M",level:15},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:15},{maxPictureSize:35651584,maxBitrate:6e7,tier:"M",level:16},{maxPictureSize:35651584,maxBitrate:24e7,tier:"H",level:16},{maxPictureSize:35651584,maxBitrate:1e8,tier:"M",level:17},{maxPictureSize:35651584,maxBitrate:48e7,tier:"H",level:17},{maxPictureSize:35651584,maxBitrate:16e7,tier:"M",level:18},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:18},{maxPictureSize:35651584,maxBitrate:16e7,tier:"M",level:19},{maxPictureSize:35651584,maxBitrate:8e8,tier:"H",level:19}],Z0=(n,e,t,i)=>{if(n==="avc"){const s=Math.ceil(e/16)*Math.ceil(t/16),o=zc.find(d=>s<=d.maxMacroblocks&&i<=d.maxBitrate)??yn(zc),a=o?o.level:0,c="64".padStart(2,"0"),l="00",u=a.toString(16).padStart(2,"0");return`avc1.${c}${l}${u}`}else if(n==="hevc"){const a=e*t,c=kc.find(u=>a<=u.maxPictureSize&&i<=u.maxBitrate)??yn(kc);return`hev1.1.6.${c.tier}${c.level}.B0`}else{if(n==="vp8")return"vp8";if(n==="vp9"){const s=e*t;return`vp09.00.${(Vc.find(c=>s<=c.maxPictureSize&&i<=c.maxBitrate)??yn(Vc)).level.toString().padStart(2,"0")}.08`}else if(n==="av1"){const s=e*t,o=Hc.find(l=>s<=l.maxPictureSize&&i<=l.maxBitrate)??yn(Hc);return`av01.0.${o.level.toString().padStart(2,"0")}${o.tier}.08`}}throw new TypeError(`Unhandled codec '${n}'.`)},Q0=n=>{const e=n.split("."),r=(1<<7)+1,s=Number(e[1]),o=e[2],a=Number(o.slice(0,-1)),c=(s<<5)+a,l=o.slice(-1)==="H"?1:0,d=Number(e[3])===8?0:1,f=0,p=e[4]?Number(e[4]):0,g=e[5]?Number(e[5][0]):1,_=e[5]?Number(e[5][1]):1,m=e[5]?Number(e[5][2]):0,h=(l<<7)+(d<<6)+(f<<5)+(p<<4)+(g<<3)+(_<<2)+m;return[r,c,h,0]},J0=(n,e,t)=>{if(n==="aac")return e>=2&&t<=24e3?"mp4a.40.29":t<=24e3?"mp4a.40.5":"mp4a.40.2";if(n==="mp3")return"mp3";if(n==="opus")return"opus";if(n==="vorbis")return"vorbis";if(n==="flac")return"flac";if(An.includes(n))return n;throw new TypeError(`Unhandled codec '${n}'.`)},Wu=/^pcm-([usf])(\d+)+(be)?$/,xr=n=>{if(fe(An.includes(n)),n==="ulaw")return{dataType:"ulaw",sampleSize:1,littleEndian:!0,silentValue:255};if(n==="alaw")return{dataType:"alaw",sampleSize:1,littleEndian:!0,silentValue:213};const e=Wu.exec(n);fe(e);let t;e[1]==="u"?t="unsigned":e[1]==="s"?t="signed":t="float";const i=Number(e[2])/8,r=e[3]!=="be",s=n==="pcm-u8"?2**7:0;return{dataType:t,sampleSize:i,littleEndian:r,silentValue:s}},Xu=n=>n.startsWith("avc1")||n.startsWith("avc3")?"avc":n.startsWith("hev1")||n.startsWith("hvc1")?"hevc":n==="vp8"?"vp8":n.startsWith("vp09")?"vp9":n.startsWith("av01")?"av1":n.startsWith("mp4a.40")||n==="mp4a.67"?"aac":n==="mp3"||n==="mp4a.69"||n==="mp4a.6B"||n==="mp4a.6b"?"mp3":n==="opus"?"opus":n==="vorbis"?"vorbis":n==="flac"?"flac":n==="ulaw"?"ulaw":n==="alaw"?"alaw":Wu.test(n)?n:n==="webvtt"?"webvtt":null,ev=n=>n==="avc"?{avc:{format:"avc"}}:n==="hevc"?{hevc:{format:"hevc"}}:{},tv=n=>n==="aac"?{aac:{format:"aac"}}:n==="opus"?{opus:{format:"opus"}}:{};class Xr{constructor(e){this._factor=e}_toVideoBitrate(e,t,i){const r=t*i,s={avc:1,hevc:.6,vp9:.6,av1:.4,vp8:1.2},o=1920*1080,a=3e6,c=Math.pow(r/o,.95),d=a*c*s[e]*this._factor;return Math.ceil(d/1e3)*1e3}_toAudioBitrate(e){if(An.includes(e)||e==="flac")return;const i={aac:128e3,opus:64e3,mp3:16e4,vorbis:64e3}[e];if(!i)throw new Error(`Unhandled codec: ${e}`);let r=i*this._factor;return e==="aac"?r=[96e3,128e3,16e4,192e3].reduce((o,a)=>Math.abs(a-r)<Math.abs(o-r)?a:o):e==="opus"||e==="vorbis"?r=Math.max(6e3,r):e==="mp3"&&(r=[8e3,16e3,24e3,32e3,4e4,48e3,64e3,8e4,96e3,112e3,128e3,16e4,192e3,224e3,256e3,32e4].reduce((o,a)=>Math.abs(a-r)<Math.abs(o-r)?a:o)),Math.round(r/1e3)*1e3}}const Wo=new Xr(4),nv=["avc1","avc3","hev1","hvc1","vp8","vp09","av01"],iv=/^(avc1|avc3)\.[0-9a-fA-F]{6}$/,rv=/^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/,sv=/^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/,ov=/^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/,av=n=>{if(!n)throw new TypeError("Video chunk metadata must be provided.");if(typeof n!="object")throw new TypeError("Video chunk metadata must be an object.");if(!n.decoderConfig)throw new TypeError("Video chunk metadata must include a decoder configuration.");if(typeof n.decoderConfig!="object")throw new TypeError("Video chunk metadata decoder configuration must be an object.");if(typeof n.decoderConfig.codec!="string")throw new TypeError("Video chunk metadata decoder configuration must specify a codec string.");if(!nv.some(e=>n.decoderConfig.codec.startsWith(e)))throw new TypeError("Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the WebCodecs Codec Registry.");if(!Number.isInteger(n.decoderConfig.codedWidth)||n.decoderConfig.codedWidth<=0)throw new TypeError("Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).");if(!Number.isInteger(n.decoderConfig.codedHeight)||n.decoderConfig.codedHeight<=0)throw new TypeError("Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).");if(n.decoderConfig.description!==void 0&&!eo(n.decoderConfig.description))throw new TypeError("Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.");if(n.decoderConfig.colorSpace!==void 0){const{colorSpace:e}=n.decoderConfig;if(typeof e!="object")throw new TypeError("Video chunk metadata decoder configuration colorSpace, when provided, must be an object.");const t=Object.keys(Zs);if(e.primaries!=null&&!t.includes(e.primaries))throw new TypeError(`Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${t.join(", ")}.`);const i=Object.keys(Qs);if(e.transfer!=null&&!i.includes(e.transfer))throw new TypeError(`Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${i.join(", ")}.`);const r=Object.keys(Js);if(e.matrix!=null&&!r.includes(e.matrix))throw new TypeError(`Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${r.join(", ")}.`);if(e.fullRange!=null&&typeof e.fullRange!="boolean")throw new TypeError("Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.")}if(n.decoderConfig.codec.startsWith("avc1")||n.decoderConfig.codec.startsWith("avc3")){if(!iv.test(n.decoderConfig.codec))throw new TypeError("Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.")}else if(n.decoderConfig.codec.startsWith("hev1")||n.decoderConfig.codec.startsWith("hvc1")){if(!rv.test(n.decoderConfig.codec))throw new TypeError("Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.")}else if(n.decoderConfig.codec.startsWith("vp8")){if(n.decoderConfig.codec!=="vp8")throw new TypeError('Video chunk metadata decoder configuration codec string for VP8 must be "vp8".')}else if(n.decoderConfig.codec.startsWith("vp09")){if(!sv.test(n.decoderConfig.codec))throw new TypeError('Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.')}else if(n.decoderConfig.codec.startsWith("av01")&&!ov.test(n.decoderConfig.codec))throw new TypeError('Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.')},lv=["mp4a","mp3","opus","vorbis","flac","ulaw","alaw","pcm"],cv=n=>{if(!n)throw new TypeError("Audio chunk metadata must be provided.");if(typeof n!="object")throw new TypeError("Audio chunk metadata must be an object.");if(!n.decoderConfig)throw new TypeError("Audio chunk metadata must include a decoder configuration.");if(typeof n.decoderConfig!="object")throw new TypeError("Audio chunk metadata decoder configuration must be an object.");if(typeof n.decoderConfig.codec!="string")throw new TypeError("Audio chunk metadata decoder configuration must specify a codec string.");if(!lv.some(e=>n.decoderConfig.codec.startsWith(e)))throw new TypeError("Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the WebCodecs Codec Registry.");if(!Number.isInteger(n.decoderConfig.sampleRate)||n.decoderConfig.sampleRate<=0)throw new TypeError("Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).");if(!Number.isInteger(n.decoderConfig.numberOfChannels)||n.decoderConfig.numberOfChannels<=0)throw new TypeError("Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).");if(n.decoderConfig.description!==void 0&&!eo(n.decoderConfig.description))throw new TypeError("Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.");if(n.decoderConfig.codec.startsWith("mp4a")&&n.decoderConfig.codec!=="mp4a.69"&&n.decoderConfig.codec!=="mp4a.6B"&&n.decoderConfig.codec!=="mp4a.6b"){if(!["mp4a.40.2","mp4a.40.02","mp4a.40.5","mp4a.40.05","mp4a.40.29","mp4a.67"].includes(n.decoderConfig.codec))throw new TypeError("Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.");if(!n.decoderConfig.description)throw new TypeError("Audio chunk metadata decoder configuration for AAC must include a description, which is expected to be an AudioSpecificConfig as specified in ISO 14496-3.")}else if(n.decoderConfig.codec.startsWith("mp3")||n.decoderConfig.codec.startsWith("mp4a")){if(n.decoderConfig.codec!=="mp3"&&n.decoderConfig.codec!=="mp4a.69"&&n.decoderConfig.codec!=="mp4a.6B"&&n.decoderConfig.codec!=="mp4a.6b")throw new TypeError('Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".')}else if(n.decoderConfig.codec.startsWith("opus")){if(n.decoderConfig.codec!=="opus")throw new TypeError('Audio chunk metadata decoder configuration codec string for Opus must be "opus".');if(n.decoderConfig.description&&n.decoderConfig.description.byteLength<18)throw new TypeError("Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.")}else if(n.decoderConfig.codec.startsWith("vorbis")){if(n.decoderConfig.codec!=="vorbis")throw new TypeError('Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".');if(!n.decoderConfig.description)throw new TypeError("Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.")}else if(n.decoderConfig.codec.startsWith("flac")){if(n.decoderConfig.codec!=="flac")throw new TypeError('Audio chunk metadata decoder configuration codec string for FLAC must be "flac".');if(!n.decoderConfig.description||n.decoderConfig.description.byteLength<42)throw new TypeError("Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.")}else if((n.decoderConfig.codec.startsWith("pcm")||n.decoderConfig.codec.startsWith("ulaw")||n.decoderConfig.codec.startsWith("alaw"))&&!An.includes(n.decoderConfig.codec))throw new TypeError(`Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${An.join(", ")}).`)},uv=n=>{if(!n)throw new TypeError("Subtitle metadata must be provided.");if(typeof n!="object")throw new TypeError("Subtitle metadata must be an object.");if(!n.config)throw new TypeError("Subtitle metadata must include a config object.");if(typeof n.config!="object")throw new TypeError("Subtitle metadata config must be an object.");if(typeof n.config.description!="string")throw new TypeError("Subtitle metadata config description must be a string.")};/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */class dv{constructor(e){this.mutex=new zu,this.firstMediaStreamTimestamp=null,this.trackTimestampInfo=new WeakMap,this.output=e}onTrackClose(e){}validateAndNormalizeTimestamp(e,t,i){t+=e.source._timestampOffset;let r=this.trackTimestampInfo.get(e);if(!r){if(!i)throw new Error("First frame must be a key frame.");r={maxTimestamp:t,maxTimestampBeforeLastKeyFrame:t},this.trackTimestampInfo.set(e,r)}if(t<0)throw new Error(`Timestamps must be non-negative (got ${t}s).`);if(i&&(r.maxTimestampBeforeLastKeyFrame=r.maxTimestamp),t<r.maxTimestampBeforeLastKeyFrame)throw new Error(`Timestamps cannot be smaller than the highest timestamp of the previous run (a run begins with a key frame and ends right before the next key frame). Got ${t}s, but highest timestamp is ${r.maxTimestampBeforeLastKeyFrame}s.`);return r.maxTimestamp=Math.max(r.maxTimestamp,t),t}}/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */const Gc=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g,hv=n=>{const e=Math.floor(n/36e5),t=Math.floor(n%(3600*1e3)/(60*1e3)),i=Math.floor(n%(60*1e3)/1e3),r=n%1e3;return e.toString().padStart(2,"0")+":"+t.toString().padStart(2,"0")+":"+i.toString().padStart(2,"0")+"."+r.toString().padStart(3,"0")};/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */const pl=n=>{const e=[];let t=0;for(;t<n.length;){let i=-1,r=0;for(let s=t;s<n.length-3;s++){if(n[s]===0&&n[s+1]===0&&n[s+2]===1){i=s,r=3;break}if(s<n.length-4&&n[s]===0&&n[s+1]===0&&n[s+2]===0&&n[s+3]===1){i=s,r=4;break}}if(i===-1)break;if(t>0&&i>t){const s=n.subarray(t,i);s.length>0&&e.push(s)}t=i+r}if(t<n.length){const i=n.subarray(t);i.length>0&&e.push(i)}return e},qa=n=>{const e=[],t=n.length;for(let i=0;i<t;i++)i+2<t&&n[i]===0&&n[i+1]===0&&n[i+2]===3?(e.push(0,0),i+=2):e.push(n[i]);return new Uint8Array(e)},fv=n=>{const t=pl(n);if(t.length===0)return null;let i=0;for(const a of t)i+=4+a.byteLength;const r=new Uint8Array(i),s=new DataView(r.buffer);let o=0;for(const a of t){const c=a.byteLength;s.setUint32(o,c,!1),o+=4,r.set(a,o),o+=a.byteLength}return r},Xo=n=>n[0]&31,pv=n=>{try{const e=pl(n),t=e.filter(f=>Xo(f)===7),i=e.filter(f=>Xo(f)===8),r=e.filter(f=>Xo(f)===13);if(t.length===0||i.length===0)return null;const s=t[0],o=new kr(qa(s));if(o.skipBits(1),o.skipBits(2),o.readBits(5)!==7)return console.error("Invalid SPS NAL unit type"),null;const c=o.readAlignedByte(),l=o.readAlignedByte(),u=o.readAlignedByte(),d={configurationVersion:1,avcProfileIndication:c,profileCompatibility:l,avcLevelIndication:u,lengthSizeMinusOne:3,sequenceParameterSets:t,pictureParameterSets:i,chromaFormat:null,bitDepthLumaMinus8:null,bitDepthChromaMinus8:null,sequenceParameterSetExt:null};if(c===100||c===110||c===122||c===144){xe(o);const f=xe(o);f===3&&o.skipBits(1);const p=xe(o),g=xe(o);d.chromaFormat=f,d.bitDepthLumaMinus8=p,d.bitDepthChromaMinus8=g,d.sequenceParameterSetExt=r}return d}catch(e){return console.error("Error building AVC Decoder Configuration Record:",e),null}},mv=n=>{const e=[];e.push(n.configurationVersion),e.push(n.avcProfileIndication),e.push(n.profileCompatibility),e.push(n.avcLevelIndication),e.push(252|n.lengthSizeMinusOne&3),e.push(224|n.sequenceParameterSets.length&31);for(const t of n.sequenceParameterSets){const i=t.byteLength;e.push(i>>8),e.push(i&255);for(let r=0;r<i;r++)e.push(t[r])}e.push(n.pictureParameterSets.length);for(const t of n.pictureParameterSets){const i=t.byteLength;e.push(i>>8),e.push(i&255);for(let r=0;r<i;r++)e.push(t[r])}if(n.avcProfileIndication===100||n.avcProfileIndication===110||n.avcProfileIndication===122||n.avcProfileIndication===144){fe(n.chromaFormat!==null),fe(n.bitDepthLumaMinus8!==null),fe(n.bitDepthChromaMinus8!==null),fe(n.sequenceParameterSetExt!==null),e.push(252|n.chromaFormat&3),e.push(248|n.bitDepthLumaMinus8&7),e.push(248|n.bitDepthChromaMinus8&7),e.push(n.sequenceParameterSetExt.length);for(const t of n.sequenceParameterSetExt){const i=t.byteLength;e.push(i>>8),e.push(i&255);for(let r=0;r<i;r++)e.push(t[r])}}return new Uint8Array(e)},Wc=32,Xc=33,$c=34,gv=39,_v=40,ji=n=>n[0]>>1&63,vv=n=>{try{const e=pl(n),t=e.filter(y=>ji(y)===Wc),i=e.filter(y=>ji(y)===Xc),r=e.filter(y=>ji(y)===$c),s=e.filter(y=>ji(y)===gv||ji(y)===_v);if(i.length===0||r.length===0)return null;const o=i[0],a=new kr(qa(o));a.skipBits(16),a.readBits(4);const c=a.readBits(3),l=a.readBits(1),{general_profile_space:u,general_tier_flag:d,general_profile_idc:f,general_profile_compatibility_flags:p,general_constraint_indicator_flags:g,general_level_idc:_}=xv(a,c);xe(a);const m=xe(a);m===3&&a.skipBits(1),xe(a),xe(a),a.readBits(1)&&(xe(a),xe(a),xe(a),xe(a));const h=xe(a),b=xe(a);xe(a);const S=a.readBits(1)?0:c;for(let y=S;y<=c;y++)xe(a),xe(a),xe(a);xe(a),xe(a),xe(a),xe(a),xe(a),xe(a),a.readBits(1)&&a.readBits(1)&&Sv(a),a.skipBits(1),a.skipBits(1),a.readBits(1)&&(a.skipBits(4),a.skipBits(4),xe(a),xe(a),a.skipBits(1));const C=xe(a);if(yv(a,C),a.readBits(1)){const y=xe(a);for(let T=0;T<y;T++)xe(a),a.skipBits(1)}a.skipBits(1),a.skipBits(1);let R=0;a.readBits(1)&&(R=Ev(a,c));let P=0;if(r.length>0){const y=r[0],T=new kr(qa(y));T.skipBits(16),xe(T),xe(T),T.skipBits(1),T.skipBits(1),T.skipBits(3),T.skipBits(1),T.skipBits(1),xe(T),xe(T),Lr(T),T.skipBits(1),T.skipBits(1),T.readBits(1)&&xe(T),Lr(T),Lr(T),T.skipBits(1),T.skipBits(1),T.skipBits(1),T.skipBits(1);const X=T.readBits(1),k=T.readBits(1);!X&&!k?P=0:X&&!k?P=2:!X&&k?P=3:P=0}const F=[...t.length?[{arrayCompleteness:1,nalUnitType:Wc,nalUnits:t}]:[],...i.length?[{arrayCompleteness:1,nalUnitType:Xc,nalUnits:i}]:[],...r.length?[{arrayCompleteness:1,nalUnitType:$c,nalUnits:r}]:[],...s.length?[{arrayCompleteness:1,nalUnitType:ji(s[0]),nalUnits:s}]:[]];return{configurationVersion:1,generalProfileSpace:u,generalTierFlag:d,generalProfileIdc:f,generalProfileCompatibilityFlags:p,generalConstraintIndicatorFlags:g,generalLevelIdc:_,minSpatialSegmentationIdc:R,parallelismType:P,chromaFormatIdc:m,bitDepthLumaMinus8:h,bitDepthChromaMinus8:b,avgFrameRate:0,constantFrameRate:0,numTemporalLayers:c+1,temporalIdNested:l,lengthSizeMinusOne:3,arrays:F}}catch(e){return console.error("Error building HEVC Decoder Configuration Record:",e),null}},xv=(n,e)=>{const t=n.readBits(2),i=n.readBits(1),r=n.readBits(5);let s=0;for(let u=0;u<32;u++)s=s<<1|n.readBits(1);const o=new Uint8Array(6);for(let u=0;u<6;u++)o[u]=n.readBits(8);const a=n.readBits(8),c=[],l=[];for(let u=0;u<e;u++)c.push(n.readBits(1)),l.push(n.readBits(1));if(e>0)for(let u=e;u<8;u++)n.skipBits(2);for(let u=0;u<e;u++)c[u]&&n.skipBits(88),l[u]&&n.skipBits(8);return{general_profile_space:t,general_tier_flag:i,general_profile_idc:r,general_profile_compatibility_flags:s,general_constraint_indicator_flags:o,general_level_idc:a}},Sv=n=>{for(let e=0;e<4;e++)for(let t=0;t<(e===3?2:6);t++)if(!n.readBits(1))xe(n);else{const r=Math.min(64,1<<4+(e<<1));e>1&&Lr(n);for(let s=0;s<r;s++)Lr(n)}},yv=(n,e)=>{const t=[];for(let i=0;i<e;i++)t[i]=Mv(n,i,e,t)},Mv=(n,e,t,i)=>{let r=0,s=0,o=0;if(e!==0&&(s=n.readBits(1)),s){if(e===t){const c=xe(n);o=e-(c+1)}else o=e-1;n.readBits(1),xe(n);const a=i[o]??0;for(let c=0;c<=a;c++)n.readBits(1)||n.readBits(1);r=i[o]}else{const a=xe(n),c=xe(n);for(let l=0;l<a;l++)xe(n),n.readBits(1);for(let l=0;l<c;l++)xe(n),n.readBits(1);r=a+c}return r},Ev=(n,e)=>{if(n.readBits(1)&&n.readBits(8)===255&&(n.readBits(16),n.readBits(16)),n.readBits(1)&&n.readBits(1),n.readBits(1)&&(n.readBits(3),n.readBits(1),n.readBits(1)&&(n.readBits(8),n.readBits(8),n.readBits(8))),n.readBits(1)&&(xe(n),xe(n)),n.readBits(1),n.readBits(1),n.readBits(1),n.readBits(1)&&(xe(n),xe(n),xe(n),xe(n)),n.readBits(1)&&(n.readBits(32),n.readBits(32),n.readBits(1)&&xe(n),n.readBits(1)&&bv(n,!0,e)),n.readBits(1)){n.readBits(1),n.readBits(1),n.readBits(1);const t=xe(n);return xe(n),xe(n),xe(n),xe(n),t}return 0},bv=(n,e,t)=>{let i=!1,r=!1,s=!1;i=n.readBits(1)===1,r=n.readBits(1)===1,(i||r)&&(s=n.readBits(1)===1,s&&(n.readBits(8),n.readBits(5),n.readBits(1),n.readBits(5)),n.readBits(4),n.readBits(4),s&&n.readBits(4),n.readBits(5),n.readBits(5),n.readBits(5));for(let o=0;o<=t;o++){const a=n.readBits(1)===1;let c=!0;a||(c=n.readBits(1)===1);let l=!1;c?xe(n):l=n.readBits(1)===1;let u=1;l||(u=xe(n)+1),i&&qc(n,u,s),r&&qc(n,u,s)}},qc=(n,e,t)=>{for(let i=0;i<e;i++)xe(n),xe(n),t&&(xe(n),xe(n)),n.readBits(1)},wv=n=>{const e=[];e.push(n.configurationVersion),e.push((n.generalProfileSpace&3)<<6|(n.generalTierFlag&1)<<5|n.generalProfileIdc&31),e.push(n.generalProfileCompatibilityFlags>>>24&255),e.push(n.generalProfileCompatibilityFlags>>>16&255),e.push(n.generalProfileCompatibilityFlags>>>8&255),e.push(n.generalProfileCompatibilityFlags&255),e.push(...n.generalConstraintIndicatorFlags),e.push(n.generalLevelIdc&255),e.push(240|n.minSpatialSegmentationIdc>>8&15),e.push(n.minSpatialSegmentationIdc&255),e.push(252|n.parallelismType&3),e.push(252|n.chromaFormatIdc&3),e.push(248|n.bitDepthLumaMinus8&7),e.push(248|n.bitDepthChromaMinus8&7),e.push(n.avgFrameRate>>8&255),e.push(n.avgFrameRate&255),e.push((n.constantFrameRate&3)<<6|(n.numTemporalLayers&7)<<3|(n.temporalIdNested&1)<<2|n.lengthSizeMinusOne&3),e.push(n.arrays.length&255);for(const t of n.arrays){e.push((t.arrayCompleteness&1)<<7|0|t.nalUnitType&63),e.push(t.nalUnits.length>>8&255),e.push(t.nalUnits.length&255);for(const i of t.nalUnits){e.push(i.length>>8&255),e.push(i.length&255);for(let r=0;r<i.length;r++)e.push(i[r])}}return new Uint8Array(e)},Tv=n=>{const e=Bu(n),t=e.getUint8(9),i=e.getUint16(10,!0),r=e.getUint32(12,!0),s=e.getInt16(16,!0),o=e.getUint8(18);let a=null;return o&&(a=n.subarray(19,21+t)),{outputChannelCount:t,preSkip:i,inputSampleRate:r,outputGain:s,channelMappingFamily:o,channelMappingTable:a}};/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */class Yc{constructor(e){this.writer=e,this.helper=new Uint8Array(8),this.helperView=new DataView(this.helper.buffer),this.offsets=new WeakMap}writeU32(e){this.helperView.setUint32(0,e,!1),this.writer.write(this.helper.subarray(0,4))}writeU64(e){this.helperView.setUint32(0,Math.floor(e/2**32),!1),this.helperView.setUint32(4,e,!1),this.writer.write(this.helper.subarray(0,8))}writeAscii(e){for(let t=0;t<e.length;t++)this.helperView.setUint8(t%8,e.charCodeAt(t)),t%8===7&&this.writer.write(this.helper);e.length%8!==0&&this.writer.write(this.helper.subarray(0,e.length%8))}writeBox(e){if(this.offsets.set(e,this.writer.getPos()),e.contents&&!e.children)this.writeBoxHeader(e,e.size??e.contents.byteLength+8),this.writer.write(e.contents);else{const t=this.writer.getPos();if(this.writeBoxHeader(e,0),e.contents&&this.writer.write(e.contents),e.children)for(const s of e.children)s&&this.writeBox(s);const i=this.writer.getPos(),r=e.size??i-t;this.writer.seek(t),this.writeBoxHeader(e,r),this.writer.seek(i)}}writeBoxHeader(e,t){this.writeU32(e.largeSize?1:t),this.writeAscii(e.type),e.largeSize&&this.writeU64(t)}measureBoxHeader(e){return 8+(e.largeSize?8:0)}patchBox(e){const t=this.offsets.get(e);fe(t!==void 0);const i=this.writer.getPos();this.writer.seek(t),this.writeBox(e),this.writer.seek(i)}measureBox(e){if(e.contents&&!e.children)return this.measureBoxHeader(e)+e.contents.byteLength;{let t=this.measureBoxHeader(e);if(e.contents&&(t+=e.contents.byteLength),e.children)for(const i of e.children)i&&(t+=this.measureBox(i));return t}}}const qe=new Uint8Array(8),Cn=new DataView(qe.buffer),mt=n=>[(n%256+256)%256],De=n=>(Cn.setUint16(0,n,!1),[qe[0],qe[1]]),$u=n=>(Cn.setInt16(0,n,!1),[qe[0],qe[1]]),qu=n=>(Cn.setUint32(0,n,!1),[qe[1],qe[2],qe[3]]),de=n=>(Cn.setUint32(0,n,!1),[qe[0],qe[1],qe[2],qe[3]]),Jn=n=>(Cn.setInt32(0,n,!1),[qe[0],qe[1],qe[2],qe[3]]),Ci=n=>(Cn.setUint32(0,Math.floor(n/2**32),!1),Cn.setUint32(4,n,!1),[qe[0],qe[1],qe[2],qe[3],qe[4],qe[5],qe[6],qe[7]]),Yu=n=>(Cn.setInt16(0,2**8*n,!1),[qe[0],qe[1]]),Nn=n=>(Cn.setInt32(0,2**16*n,!1),[qe[0],qe[1],qe[2],qe[3]]),$o=n=>(Cn.setInt32(0,2**30*n,!1),[qe[0],qe[1],qe[2],qe[3]]),qo=(n,e)=>{const t=[];let i=n;do{let r=i&127;i>>=7,t.length>0&&(r|=128),t.push(r)}while(i>0||e);return t.reverse()},Nt=(n,e=!1)=>{const t=Array(n.length).fill(null).map((i,r)=>n.charCodeAt(r));return e&&t.push(0),t},ml=n=>{let e=null;for(const t of n)(!e||t.timestamp>e.timestamp)&&(e=t);return e},ju=n=>{const e=n*(Math.PI/180),t=Math.round(Math.cos(e)),i=Math.round(Math.sin(e));return[t,i,0,-i,t,0,0,0,1]},Ku=ju(0),Zu=n=>[Nn(n[0]),Nn(n[1]),$o(n[2]),Nn(n[3]),Nn(n[4]),$o(n[5]),Nn(n[6]),Nn(n[7]),$o(n[8])],We=(n,e,t)=>({type:n,contents:e&&new Uint8Array(e.flat(10)),children:t}),Je=(n,e,t,i,r)=>We(n,[mt(e),qu(t),i??[]],r),Av=n=>n.isQuickTime?We("ftyp",[Nt("qt  "),de(512),Nt("qt  ")]):n.fragmented?We("ftyp",[Nt("iso5"),de(512),Nt("iso5"),Nt("iso6"),Nt("mp41")]):We("ftyp",[Nt("isom"),de(512),Nt("isom"),n.holdsAvc?Nt("avc1"):[],Nt("mp41")]),Yo=n=>({type:"mdat",largeSize:n}),As=(n,e,t=!1)=>We("moov",void 0,[Cv(e,n),...n.map(i=>Rv(i,e)),t?dx(n):null]),Cv=(n,e)=>{const t=bt(Math.max(0,...e.filter(o=>o.samples.length>0).map(o=>{const a=ml(o.samples);return a.timestamp+a.duration})),Ya),i=Math.max(0,...e.map(o=>o.track.id))+1,r=!hr(n)||!hr(t),s=r?Ci:de;return Je("mvhd",+r,0,[s(n),s(n),de(Ya),s(t),Nn(1),Yu(1),Array(10).fill(0),Zu(Ku),Array(24).fill(0),de(i)])},Rv=(n,e)=>{const t=Ix(n);return We("trak",void 0,[Pv(n,e),Lv(n,e),t.name!==void 0?We("udta",void 0,[We("©nam",[...Ei.encode(t.name)])]):null])},Pv=(n,e)=>{const t=ml(n.samples),i=bt(t?t.timestamp+t.duration:0,Ya),r=!hr(e)||!hr(i),s=r?Ci:de;let o;if(n.type==="video"){const a=n.track.metadata.rotation;o=ju(a??0)}else o=Ku;return Je("tkhd",+r,3,[s(e),s(e),de(n.track.id),de(0),s(i),Array(8).fill(0),De(0),De(n.track.id),Yu(n.type==="audio"?1:0),De(0),Zu(o),Nn(n.type==="video"?n.info.width:0),Nn(n.type==="video"?n.info.height:0)])},Lv=(n,e)=>We("mdia",void 0,[Iv(n,e),Fv(!0,Uv[n.type],Dv[n.type]),Nv(n)]),Iv=(n,e)=>{const t=ml(n.samples),i=bt(t?t.timestamp+t.duration:0,n.timescale),r=!hr(e)||!hr(i),s=r?Ci:de;let o=0;for(const a of n.track.metadata.languageCode??q0)o<<=5,o+=a.charCodeAt(0)-96;return Je("mdhd",+r,0,[s(e),s(e),de(n.timescale),s(i),De(o),De(0)])},Uv={video:"vide",audio:"soun",subtitle:"text"},Dv={video:"MediabunnyVideoHandler",audio:"MediabunnySoundHandler",subtitle:"MediabunnyTextHandler"},Fv=(n,e,t)=>Je("hdlr",0,0,[Nt("mhlr"),Nt(e),de(0),de(0),de(0),Nt(t,!0)]),Nv=n=>We("minf",void 0,[kv[n.type](),Vv(),Wv(n)]),Ov=()=>Je("vmhd",0,1,[De(0),De(0),De(0),De(0)]),Bv=()=>Je("smhd",0,0,[De(0),De(0)]),zv=()=>Je("nmhd",0,0),kv={video:Ov,audio:Bv,subtitle:zv},Vv=()=>We("dinf",void 0,[Hv()]),Hv=()=>Je("dref",0,0,[de(1)],[Gv()]),Gv=()=>Je("url ",0,1),Wv=n=>{const e=n.compositionTimeOffsetTable.length>1||n.compositionTimeOffsetTable.some(t=>t.sampleCompositionTimeOffset!==0);return We("stbl",void 0,[Xv(n),rx(n),e?cx(n):null,e?ux(n):null,ox(n),ax(n),lx(n),sx(n)])},Xv=n=>{let e;if(n.type==="video")e=$v(bx[n.track.source._codec],n);else if(n.type==="audio"){const t=Ju(n.track.source._codec,n.muxer.isQuickTime);fe(t),e=Zv(t,n)}else n.type==="subtitle"&&(e=nx(Ax[n.track.source._codec],n));return fe(e),Je("stsd",0,0,[de(1)],[e])},$v=(n,e)=>We(n,[Array(6).fill(0),De(1),De(0),De(0),Array(12).fill(0),De(e.info.width),De(e.info.height),de(4718592),de(4718592),de(0),De(1),Array(32).fill(0),De(24),$u(65535)],[wx[e.track.source._codec](e),W0(e.info.decoderConfig.colorSpace)?qv(e):null]),qv=n=>We("colr",[Nt("nclx"),De(Zs[n.info.decoderConfig.colorSpace.primaries]),De(Qs[n.info.decoderConfig.colorSpace.transfer]),De(Js[n.info.decoderConfig.colorSpace.matrix]),mt((n.info.decoderConfig.colorSpace.fullRange?1:0)<<7)]),Yv=n=>n.info.decoderConfig&&We("avcC",[...ii(n.info.decoderConfig.description)]),jv=n=>n.info.decoderConfig&&We("hvcC",[...ii(n.info.decoderConfig.description)]),jc=n=>{if(!n.info.decoderConfig)return null;const e=n.info.decoderConfig,t=e.codec.split("."),i=Number(t[1]),r=Number(t[2]),s=Number(t[3]),o=t[4]?Number(t[4]):1,a=t[8]?Number(t[8]):Number(e.colorSpace?.fullRange??0),c=(s<<4)+(o<<1)+a,l=t[5]?Number(t[5]):e.colorSpace?.primaries?Zs[e.colorSpace.primaries]:2,u=t[6]?Number(t[6]):e.colorSpace?.transfer?Qs[e.colorSpace.transfer]:2,d=t[7]?Number(t[7]):e.colorSpace?.matrix?Js[e.colorSpace.matrix]:2;return Je("vpcC",1,0,[mt(i),mt(r),mt(c),mt(l),mt(u),mt(d),De(0)])},Kv=n=>We("av1C",Q0(n.info.decoderConfig.codec)),Zv=(n,e)=>{let t=0,i,r=16;if(An.includes(e.track.source._codec)){const s=e.track.source._codec,{sampleSize:o}=xr(s);r=8*o,r>16&&(t=1)}return t===0?i=[Array(6).fill(0),De(1),De(t),De(0),de(0),De(e.info.numberOfChannels),De(r),De(0),De(0),De(e.info.sampleRate<2**16?e.info.sampleRate:0),De(0)]:i=[Array(6).fill(0),De(1),De(t),De(0),de(0),De(e.info.numberOfChannels),De(Math.min(r,16)),De(0),De(0),De(e.info.sampleRate<2**16?e.info.sampleRate:0),De(0),de(1),de(r/8),de(e.info.numberOfChannels*r/8),de(2)],We(n,i,[Tx(e.track.source._codec,e.muxer.isQuickTime)?.(e)??null])},jo=n=>{let e;switch(n.track.source._codec){case"aac":e=64;break;case"mp3":e=107;break;case"vorbis":e=221;break;default:throw new Error(`Unhandled audio codec: ${n.track.source._codec}`)}let t=[...mt(e),...mt(21),...qu(0),...de(0),...de(0)];if(n.info.decoderConfig.description){const i=ii(n.info.decoderConfig.description);t=[...t,...mt(5),...qo(i.byteLength),...i]}return t=[...De(1),...mt(0),...mt(4),...qo(t.length),...t,...mt(6),...mt(1),...mt(2)],t=[...mt(3),...qo(t.length),...t],Je("esds",0,0,t)},Zn=n=>We("wave",void 0,[Qv(n),Jv(n),We("\0\0\0\0")]),Qv=n=>We("frma",[Nt(Ju(n.track.source._codec,n.muxer.isQuickTime))]),Jv=n=>{const{littleEndian:e}=xr(n.track.source._codec);return We("enda",[De(+e)])},ex=n=>{let e=n.info.numberOfChannels,t=3840,i=n.info.sampleRate,r=0,s=0,o=new Uint8Array(0);const a=n.info.decoderConfig?.description;if(a){fe(a.byteLength>=18);const c=ii(a),l=Tv(c);e=l.outputChannelCount,t=l.preSkip,i=l.inputSampleRate,r=l.outputGain,s=l.channelMappingFamily,l.channelMappingTable&&(o=l.channelMappingTable)}return We("dOps",[mt(0),mt(e),De(t),de(i),$u(r),mt(s),...o])},tx=n=>{const e=n.info.decoderConfig?.description;fe(e);const t=ii(e);return Je("dfLa",0,0,[...t.subarray(4)])},xn=n=>{const{littleEndian:e,sampleSize:t}=xr(n.track.source._codec),i=+e;return Je("pcmC",0,0,[mt(i),mt(8*t)])},nx=(n,e)=>We(n,[Array(6).fill(0),De(1)],[Cx[e.track.source._codec](e)]),ix=n=>We("vttC",[...Ei.encode(n.info.config.description)]),rx=n=>Je("stts",0,0,[de(n.timeToSampleTable.length),n.timeToSampleTable.map(e=>[de(e.sampleCount),de(e.sampleDelta)])]),sx=n=>{if(n.samples.every(t=>t.type==="key"))return null;const e=[...n.samples.entries()].filter(([,t])=>t.type==="key");return Je("stss",0,0,[de(e.length),e.map(([t])=>de(t+1))])},ox=n=>Je("stsc",0,0,[de(n.compactlyCodedChunkTable.length),n.compactlyCodedChunkTable.map(e=>[de(e.firstChunk),de(e.samplesPerChunk),de(1)])]),ax=n=>{if(n.type==="audio"&&n.info.requiresPcmTransformation){const{sampleSize:e}=xr(n.track.source._codec);return Je("stsz",0,0,[de(e*n.info.numberOfChannels),de(n.samples.reduce((t,i)=>t+bt(i.duration,n.timescale),0))])}return Je("stsz",0,0,[de(0),de(n.samples.length),n.samples.map(e=>de(e.size))])},lx=n=>n.finalizedChunks.length>0&&yn(n.finalizedChunks).offset>=2**32?Je("co64",0,0,[de(n.finalizedChunks.length),n.finalizedChunks.map(e=>Ci(e.offset))]):Je("stco",0,0,[de(n.finalizedChunks.length),n.finalizedChunks.map(e=>de(e.offset))]),cx=n=>Je("ctts",1,0,[de(n.compositionTimeOffsetTable.length),n.compositionTimeOffsetTable.map(e=>[de(e.sampleCount),Jn(e.sampleCompositionTimeOffset)])]),ux=n=>{let e=1/0,t=-1/0,i=1/0,r=-1/0;fe(n.compositionTimeOffsetTable.length>0),fe(n.samples.length>0);for(let o=0;o<n.compositionTimeOffsetTable.length;o++){const a=n.compositionTimeOffsetTable[o];e=Math.min(e,a.sampleCompositionTimeOffset),t=Math.max(t,a.sampleCompositionTimeOffset)}for(let o=0;o<n.samples.length;o++){const a=n.samples[o];i=Math.min(i,bt(a.timestamp,n.timescale)),r=Math.max(r,bt(a.timestamp+a.duration,n.timescale))}const s=Math.max(-e,0);return r>=2**31?null:Je("cslg",0,0,[Jn(s),Jn(e),Jn(t),Jn(i),Jn(r)])},dx=n=>We("mvex",void 0,n.map(hx)),hx=n=>Je("trex",0,0,[de(n.track.id),de(1),de(0),de(0),de(0)]),Kc=(n,e)=>We("moof",void 0,[fx(n),...e.map(px)]),fx=n=>Je("mfhd",0,0,[de(n)]),Qu=n=>{let e=0,t=0;const i=0,r=0,s=n.type==="delta";return t|=+s,s?e|=1:e|=2,e<<24|t<<16|i<<8|r},px=n=>We("traf",void 0,[mx(n),gx(n),_x(n)]),mx=n=>{fe(n.currentChunk);let e=0;e|=8,e|=16,e|=32,e|=131072;const t=n.currentChunk.samples[1]??n.currentChunk.samples[0],i={duration:t.timescaleUnitsToNextSample,size:t.size,flags:Qu(t)};return Je("tfhd",0,e,[de(n.track.id),de(i.duration),de(i.size),de(i.flags)])},gx=n=>(fe(n.currentChunk),Je("tfdt",1,0,[Ci(bt(n.currentChunk.startTimestamp,n.timescale))])),_x=n=>{fe(n.currentChunk);const e=n.currentChunk.samples.map(_=>_.timescaleUnitsToNextSample),t=n.currentChunk.samples.map(_=>_.size),i=n.currentChunk.samples.map(Qu),r=n.currentChunk.samples.map(_=>bt(_.timestamp-_.decodeTimestamp,n.timescale)),s=new Set(e),o=new Set(t),a=new Set(i),c=new Set(r),l=a.size===2&&i[0]!==i[1],u=s.size>1,d=o.size>1,f=!l&&a.size>1,p=c.size>1||[...c].some(_=>_!==0);let g=0;return g|=1,g|=4*+l,g|=256*+u,g|=512*+d,g|=1024*+f,g|=2048*+p,Je("trun",1,g,[de(n.currentChunk.samples.length),de(n.currentChunk.offset-n.currentChunk.moofOffset||0),l?de(i[0]):[],n.currentChunk.samples.map((_,m)=>[u?de(e[m]):[],d?de(t[m]):[],f?de(i[m]):[],p?Jn(r[m]):[]])])},vx=n=>We("mfra",void 0,[...n.map(xx),Sx()]),xx=(n,e)=>Je("tfra",1,0,[de(n.track.id),de(63),de(n.finalizedChunks.length),n.finalizedChunks.map(i=>[Ci(bt(i.samples[0].timestamp,n.timescale)),Ci(i.moofOffset),de(e+1),de(1),de(1)])]),Sx=()=>Je("mfro",0,0,[de(0)]),yx=()=>We("vtte"),Mx=(n,e,t,i,r)=>We("vttc",void 0,[r!==null?We("vsid",[Jn(r)]):null,t!==null?We("iden",[...Ei.encode(t)]):null,e!==null?We("ctim",[...Ei.encode(hv(e))]):null,i!==null?We("sttg",[...Ei.encode(i)]):null,We("payl",[...Ei.encode(n)])]),Ex=n=>We("vtta",[...Ei.encode(n)]),bx={avc:"avc1",hevc:"hvc1",vp8:"vp08",vp9:"vp09",av1:"av01"},wx={avc:Yv,hevc:jv,vp8:jc,vp9:jc,av1:Kv},Ju=(n,e)=>{switch(n){case"aac":return"mp4a";case"mp3":return"mp4a";case"opus":return"Opus";case"vorbis":return"mp4a";case"flac":return"fLaC";case"ulaw":return"ulaw";case"alaw":return"alaw";case"pcm-u8":return"raw ";case"pcm-s8":return"sowt"}if(e)switch(n){case"pcm-s16":return"sowt";case"pcm-s16be":return"twos";case"pcm-s24":return"in24";case"pcm-s24be":return"in24";case"pcm-s32":return"in32";case"pcm-s32be":return"in32";case"pcm-f32":return"fl32";case"pcm-f32be":return"fl32";case"pcm-f64":return"fl64";case"pcm-f64be":return"fl64"}else switch(n){case"pcm-s16":return"ipcm";case"pcm-s16be":return"ipcm";case"pcm-s24":return"ipcm";case"pcm-s24be":return"ipcm";case"pcm-s32":return"ipcm";case"pcm-s32be":return"ipcm";case"pcm-f32":return"fpcm";case"pcm-f32be":return"fpcm";case"pcm-f64":return"fpcm";case"pcm-f64be":return"fpcm"}},Tx=(n,e)=>{switch(n){case"aac":return jo;case"mp3":return jo;case"opus":return ex;case"vorbis":return jo;case"flac":return tx}if(e)switch(n){case"pcm-s24":return Zn;case"pcm-s24be":return Zn;case"pcm-s32":return Zn;case"pcm-s32be":return Zn;case"pcm-f32":return Zn;case"pcm-f32be":return Zn;case"pcm-f64":return Zn;case"pcm-f64be":return Zn}else switch(n){case"pcm-s16":return xn;case"pcm-s16be":return xn;case"pcm-s24":return xn;case"pcm-s24be":return xn;case"pcm-s32":return xn;case"pcm-s32be":return xn;case"pcm-f32":return xn;case"pcm-f32be":return xn;case"pcm-f64":return xn;case"pcm-f64be":return xn}return null},Ax={webvtt:"wvtt"},Cx={webvtt:ix};/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */class Rx{constructor(){this.ensureMonotonicity=!1,this.trackedWrites=null,this.trackedStart=-1,this.trackedEnd=-1}start(){}maybeTrackWrites(e){if(!this.trackedWrites)return;let t=this.getPos();if(t<this.trackedStart){if(t+e.byteLength<=this.trackedStart)return;e=e.subarray(this.trackedStart-t),t=0}const i=t+e.byteLength-this.trackedStart;let r=this.trackedWrites.byteLength;for(;r<i;)r*=2;if(r!==this.trackedWrites.byteLength){const s=new Uint8Array(r);s.set(this.trackedWrites,0),this.trackedWrites=s}this.trackedWrites.set(e,t-this.trackedStart),this.trackedEnd=Math.max(this.trackedEnd,t+e.byteLength)}startTrackingWrites(){this.trackedWrites=new Uint8Array(2**10),this.trackedStart=this.getPos(),this.trackedEnd=this.trackedStart}stopTrackingWrites(){if(!this.trackedWrites)throw new Error("Internal error: Can't get tracked writes since nothing was tracked.");const t={data:this.trackedWrites.subarray(0,this.trackedEnd-this.trackedStart),start:this.trackedStart,end:this.trackedEnd};return this.trackedWrites=null,t}}const Ko=2**16,Zo=2**32;class ed extends Rx{constructor(e){if(super(),this.pos=0,this.maxPos=0,this.target=e,this.supportsResize="resize"in new ArrayBuffer(0),this.supportsResize)try{this.buffer=new ArrayBuffer(Ko,{maxByteLength:Zo})}catch{this.buffer=new ArrayBuffer(Ko),this.supportsResize=!1}else this.buffer=new ArrayBuffer(Ko);this.bytes=new Uint8Array(this.buffer)}ensureSize(e){let t=this.buffer.byteLength;for(;t<e;)t*=2;if(t!==this.buffer.byteLength){if(t>Zo)throw new Error(`ArrayBuffer exceeded maximum size of ${Zo} bytes. Please consider using another target.`);if(this.supportsResize)this.buffer.resize(t);else{const i=new ArrayBuffer(t),r=new Uint8Array(i);r.set(this.bytes,0),this.buffer=i,this.bytes=r}}}write(e){this.maybeTrackWrites(e),this.ensureSize(this.pos+e.byteLength),this.bytes.set(e,this.pos),this.pos+=e.byteLength,this.maxPos=Math.max(this.maxPos,this.pos)}seek(e){this.pos=e}getPos(){return this.pos}async flush(){}async finalize(){this.ensureSize(this.pos),this.target.buffer=this.buffer.slice(0,Math.max(this.maxPos,this.pos))}async close(){}getSlice(e,t){return this.bytes.slice(e,t)}}/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */class td{constructor(){this._output=null}}class nd extends td{constructor(){super(...arguments),this.buffer=null}_createWriter(){return new ed(this)}}/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */const Px=n=>{let t=(n.hasVideo?"video/":n.hasAudio?"audio/":"application/")+(n.isQuickTime?"quicktime":"mp4");if(n.codecStrings.length>0){const i=[...new Set(n.codecStrings)];t+=`; codecs="${i.join(", ")}"`}return t};/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */const Qo=8,Zc=16;/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */const Ya=1e3,Lx=2082844800,Ix=n=>{const e={},t=n.track;return t.metadata.name!==void 0&&(e.name=t.metadata.name),e},bt=(n,e,t=!0)=>{const i=n*e;return t?Math.round(i):i};class Ux extends dv{constructor(e,t){super(e),this.auxTarget=new nd,this.auxWriter=this.auxTarget._createWriter(),this.auxBoxWriter=new Yc(this.auxWriter),this.mdat=null,this.trackDatas=[],this.allTracksKnown=ku(),this.creationTime=Math.floor(Date.now()/1e3)+Lx,this.finalizedChunks=[],this.nextFragmentNumber=1,this.maxWrittenTimestamp=-1/0,this.format=t,this.writer=e._writer,this.boxWriter=new Yc(this.writer),this.isQuickTime=t instanceof od;const i=this.writer instanceof ed?"in-memory":!1;this.fastStart=t._options.fastStart??i,this.isFragmented=this.fastStart==="fragmented",(this.fastStart==="in-memory"||this.isFragmented)&&(this.writer.ensureMonotonicity=!0),this.minimumFragmentDuration=t._options.minimumFragmentDuration??1}async start(){const e=await this.mutex.acquire(),t=this.output._tracks.some(i=>i.type==="video"&&i.source._codec==="avc");if(this.format._options.onFtyp&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(Av({isQuickTime:this.isQuickTime,holdsAvc:t,fragmented:this.isFragmented})),this.format._options.onFtyp){const{data:i,start:r}=this.writer.stopTrackingWrites();this.format._options.onFtyp(i,r)}this.fastStart==="in-memory"?this.mdat=Yo(!1):this.isFragmented||(this.format._options.onMdat&&this.writer.startTrackingWrites(),this.mdat=Yo(!0),this.boxWriter.writeBox(this.mdat)),await this.writer.flush(),e()}allTracksAreKnown(){for(const e of this.output._tracks)if(!e.source._closed&&!this.trackDatas.some(t=>t.track===e))return!1;return!0}async getMimeType(){await this.allTracksKnown.promise;const e=this.trackDatas.map(t=>t.type==="video"||t.type==="audio"?t.info.decoderConfig.codec:{webvtt:"wvtt"}[t.track.source._codec]);return Px({isQuickTime:this.isQuickTime,hasVideo:this.trackDatas.some(t=>t.type==="video"),hasAudio:this.trackDatas.some(t=>t.type==="audio"),codecStrings:e})}getVideoTrackData(e,t,i){const r=this.trackDatas.find(l=>l.track===e);if(r)return r;av(i),fe(i),fe(i.decoderConfig);const s={...i.decoderConfig};fe(s.codedWidth!==void 0),fe(s.codedHeight!==void 0);let o=!1;if(e.source._codec==="avc"&&!s.description){const l=pv(t.data);if(!l)throw new Error("Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.");s.description=mv(l),o=!0}else if(e.source._codec==="hevc"&&!s.description){const l=vv(t.data);if(!l)throw new Error("Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.");s.description=wv(l),o=!0}const a=K0(1/(e.metadata.frameRate??57600),1e6).denominator,c={muxer:this,track:e,type:"video",info:{width:s.codedWidth,height:s.codedHeight,decoderConfig:s,requiresAnnexBTransformation:o},timescale:a,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[]};return this.trackDatas.push(c),this.trackDatas.sort((l,u)=>l.track.id-u.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),c}getAudioTrackData(e,t){const i=this.trackDatas.find(s=>s.track===e);if(i)return i;cv(t),fe(t),fe(t.decoderConfig);const r={muxer:this,track:e,type:"audio",info:{numberOfChannels:t.decoderConfig.numberOfChannels,sampleRate:t.decoderConfig.sampleRate,decoderConfig:t.decoderConfig,requiresPcmTransformation:!this.isFragmented&&An.includes(e.source._codec)},timescale:t.decoderConfig.sampleRate,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[]};return this.trackDatas.push(r),this.trackDatas.sort((s,o)=>s.track.id-o.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),r}getSubtitleTrackData(e,t){const i=this.trackDatas.find(s=>s.track===e);if(i)return i;uv(t),fe(t),fe(t.config);const r={muxer:this,track:e,type:"subtitle",info:{config:t.config},timescale:1e3,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],lastCueEndTimestamp:0,cueQueue:[],nextSourceId:0,cueToSourceId:new WeakMap};return this.trackDatas.push(r),this.trackDatas.sort((s,o)=>s.track.id-o.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),r}async addEncodedVideoPacket(e,t,i){const r=await this.mutex.acquire();try{const s=this.getVideoTrackData(e,t,i);let o=t.data;if(s.info.requiresAnnexBTransformation){const l=fv(o);if(!l)throw new Error("Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.");o=l}const a=this.validateAndNormalizeTimestamp(s.track,t.timestamp,t.type==="key"),c=this.createSampleForTrack(s,o,a,t.duration,t.type);await this.registerSample(s,c)}finally{r()}}async addEncodedAudioPacket(e,t,i){const r=await this.mutex.acquire();try{const s=this.getAudioTrackData(e,i),o=this.validateAndNormalizeTimestamp(s.track,t.timestamp,t.type==="key"),a=this.createSampleForTrack(s,t.data,o,t.duration,t.type);s.info.requiresPcmTransformation&&await this.maybePadWithSilence(s,o),await this.registerSample(s,a)}finally{r()}}async maybePadWithSilence(e,t){const i=yn(e.samples),r=i?i.timestamp+i.duration:0,s=t-r,o=bt(s,e.timescale);if(o>0){const{sampleSize:a,silentValue:c}=xr(e.info.decoderConfig.codec),l=o*e.info.numberOfChannels,u=new Uint8Array(a*l).fill(c),d=this.createSampleForTrack(e,new Uint8Array(u.buffer),r,s,"key");await this.registerSample(e,d)}}async addSubtitleCue(e,t,i){const r=await this.mutex.acquire();try{const s=this.getSubtitleTrackData(e,i);this.validateAndNormalizeTimestamp(s.track,t.timestamp,!0),e.source._codec==="webvtt"&&(s.cueQueue.push(t),await this.processWebVTTCues(s,t.timestamp))}finally{r()}}async processWebVTTCues(e,t){for(;e.cueQueue.length>0;){const i=new Set([]);for(const l of e.cueQueue)fe(l.timestamp<=t),fe(e.lastCueEndTimestamp<=l.timestamp+l.duration),i.add(Math.max(l.timestamp,e.lastCueEndTimestamp)),i.add(l.timestamp+l.duration);const r=[...i].sort((l,u)=>l-u),s=r[0],o=r[1]??s;if(t<o)break;if(e.lastCueEndTimestamp<s){this.auxWriter.seek(0);const l=yx();this.auxBoxWriter.writeBox(l);const u=this.auxWriter.getSlice(0,this.auxWriter.getPos()),d=this.createSampleForTrack(e,u,e.lastCueEndTimestamp,s-e.lastCueEndTimestamp,"key");await this.registerSample(e,d),e.lastCueEndTimestamp=s}this.auxWriter.seek(0);for(let l=0;l<e.cueQueue.length;l++){const u=e.cueQueue[l];if(u.timestamp>=o)break;Gc.lastIndex=0;const d=Gc.test(u.text),f=u.timestamp+u.duration;let p=e.cueToSourceId.get(u);if(p===void 0&&o<f&&(p=e.nextSourceId++,e.cueToSourceId.set(u,p)),u.notes){const _=Ex(u.notes);this.auxBoxWriter.writeBox(_)}const g=Mx(u.text,d?s:null,u.identifier??null,u.settings??null,p??null);this.auxBoxWriter.writeBox(g),f===o&&e.cueQueue.splice(l--,1)}const a=this.auxWriter.getSlice(0,this.auxWriter.getPos()),c=this.createSampleForTrack(e,a,s,o-s,"key");await this.registerSample(e,c),e.lastCueEndTimestamp=o}}createSampleForTrack(e,t,i,r,s){return{timestamp:i,decodeTimestamp:i,duration:r,data:t,size:t.byteLength,type:s,timescaleUnitsToNextSample:bt(r,e.timescale)}}processTimestamps(e,t){if(e.timestampProcessingQueue.length===0)return;if(e.type==="audio"&&e.info.requiresPcmTransformation){let r=0;for(let s=0;s<e.timestampProcessingQueue.length;s++){const o=e.timestampProcessingQueue[s],a=bt(o.duration,e.timescale);r+=a}if(e.timeToSampleTable.length===0)e.timeToSampleTable.push({sampleCount:r,sampleDelta:1});else{const s=yn(e.timeToSampleTable);s.sampleCount+=r}e.timestampProcessingQueue.length=0;return}const i=e.timestampProcessingQueue.map(r=>r.timestamp).sort((r,s)=>r-s);for(let r=0;r<e.timestampProcessingQueue.length;r++){const s=e.timestampProcessingQueue[r];s.decodeTimestamp=i[r],!this.isFragmented&&e.lastTimescaleUnits===null&&(s.decodeTimestamp=0);const o=bt(s.timestamp-s.decodeTimestamp,e.timescale),a=bt(s.duration,e.timescale);if(e.lastTimescaleUnits!==null){fe(e.lastSample);const c=bt(s.decodeTimestamp,e.timescale,!1),l=Math.round(c-e.lastTimescaleUnits);if(fe(l>=0),e.lastTimescaleUnits+=l,e.lastSample.timescaleUnitsToNextSample=l,!this.isFragmented){let u=yn(e.timeToSampleTable);if(fe(u),u.sampleCount===1){u.sampleDelta=l;const f=e.timeToSampleTable[e.timeToSampleTable.length-2];f&&f.sampleDelta===l&&(f.sampleCount++,e.timeToSampleTable.pop(),u=f)}else u.sampleDelta!==l&&(u.sampleCount--,e.timeToSampleTable.push(u={sampleCount:1,sampleDelta:l}));u.sampleDelta===a?u.sampleCount++:e.timeToSampleTable.push({sampleCount:1,sampleDelta:a});const d=yn(e.compositionTimeOffsetTable);fe(d),d.sampleCompositionTimeOffset===o?d.sampleCount++:e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:o})}}else e.lastTimescaleUnits=bt(s.decodeTimestamp,e.timescale,!1),this.isFragmented||(e.timeToSampleTable.push({sampleCount:1,sampleDelta:a}),e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:o}));e.lastSample=s}if(e.timestampProcessingQueue.length=0,fe(e.lastSample),fe(e.lastTimescaleUnits!==null),t!==void 0&&e.lastSample.timescaleUnitsToNextSample===0){fe(t.type==="key");const r=bt(t.timestamp,e.timescale,!1),s=Math.round(r-e.lastTimescaleUnits);e.lastSample.timescaleUnitsToNextSample=s}}async registerSample(e,t){t.type==="key"&&this.processTimestamps(e,t),e.timestampProcessingQueue.push(t),this.isFragmented?(e.sampleQueue.push(t),await this.interleaveSamples()):await this.addSampleToTrack(e,t)}async addSampleToTrack(e,t){this.isFragmented||e.samples.push(t);let i=!1;if(!e.currentChunk)i=!0;else{e.currentChunk.startTimestamp=Math.min(e.currentChunk.startTimestamp,t.timestamp);const r=t.timestamp-e.currentChunk.startTimestamp;if(this.isFragmented){const s=this.trackDatas.every(o=>{if(e===o)return t.type==="key";const a=o.sampleQueue[0];return a?a.type==="key":o.track.source._closed});r>=this.minimumFragmentDuration&&s&&t.timestamp>this.maxWrittenTimestamp&&(i=!0,await this.finalizeFragment())}else i=r>=.5}i&&(e.currentChunk&&await this.finalizeCurrentChunk(e),e.currentChunk={startTimestamp:t.timestamp,samples:[],offset:null,moofOffset:null}),fe(e.currentChunk),e.currentChunk.samples.push(t),this.isFragmented&&(this.maxWrittenTimestamp=Math.max(this.maxWrittenTimestamp,t.timestamp))}async finalizeCurrentChunk(e){if(fe(!this.isFragmented),!e.currentChunk)return;e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk);let t=e.currentChunk.samples.length;if(e.type==="audio"&&e.info.requiresPcmTransformation&&(t=e.currentChunk.samples.reduce((i,r)=>i+bt(r.duration,e.timescale),0)),(e.compactlyCodedChunkTable.length===0||yn(e.compactlyCodedChunkTable).samplesPerChunk!==t)&&e.compactlyCodedChunkTable.push({firstChunk:e.finalizedChunks.length,samplesPerChunk:t}),this.fastStart==="in-memory"){e.currentChunk.offset=0;return}e.currentChunk.offset=this.writer.getPos();for(const i of e.currentChunk.samples)fe(i.data),this.writer.write(i.data),i.data=null;await this.writer.flush()}async interleaveSamples(e=!1){if(fe(this.isFragmented),!(!e&&!this.allTracksAreKnown()))e:for(;;){let t=null,i=1/0;for(const s of this.trackDatas){if(!e&&s.sampleQueue.length===0&&!s.track.source._closed)break e;s.sampleQueue.length>0&&s.sampleQueue[0].timestamp<i&&(t=s,i=s.sampleQueue[0].timestamp)}if(!t)break;const r=t.sampleQueue.shift();await this.addSampleToTrack(t,r)}}async finalizeFragment(e=!0){fe(this.isFragmented);const t=this.nextFragmentNumber++;if(t===1){this.format._options.onMoov&&this.writer.startTrackingWrites();const p=As(this.trackDatas,this.creationTime,!0);if(this.boxWriter.writeBox(p),this.format._options.onMoov){const{data:g,start:_}=this.writer.stopTrackingWrites();this.format._options.onMoov(g,_)}}const i=this.trackDatas.filter(p=>p.currentChunk),r=Kc(t,i),s=this.writer.getPos(),o=s+this.boxWriter.measureBox(r);let a=o+Qo,c=1/0;for(const p of i){p.currentChunk.offset=a,p.currentChunk.moofOffset=s;for(const g of p.currentChunk.samples)a+=g.size;c=Math.min(c,p.currentChunk.startTimestamp)}const l=a-o,u=l>=2**32;if(u)for(const p of i)p.currentChunk.offset+=Zc-Qo;this.format._options.onMoof&&this.writer.startTrackingWrites();const d=Kc(t,i);if(this.boxWriter.writeBox(d),this.format._options.onMoof){const{data:p,start:g}=this.writer.stopTrackingWrites();this.format._options.onMoof(p,g,c)}fe(this.writer.getPos()===o),this.format._options.onMdat&&this.writer.startTrackingWrites();const f=Yo(u);f.size=l,this.boxWriter.writeBox(f),this.writer.seek(o+(u?Zc:Qo));for(const p of i)for(const g of p.currentChunk.samples)this.writer.write(g.data),g.data=null;if(this.format._options.onMdat){const{data:p,start:g}=this.writer.stopTrackingWrites();this.format._options.onMdat(p,g)}for(const p of i)p.finalizedChunks.push(p.currentChunk),this.finalizedChunks.push(p.currentChunk),p.currentChunk=null;e&&await this.writer.flush()}async onTrackClose(e){const t=await this.mutex.acquire();if(e.type==="subtitle"&&e.source._codec==="webvtt"){const i=this.trackDatas.find(r=>r.track===e);i&&await this.processWebVTTCues(i,1/0)}this.allTracksAreKnown()&&this.allTracksKnown.resolve(),this.isFragmented&&await this.interleaveSamples(),t()}async finalize(){const e=await this.mutex.acquire();this.allTracksKnown.resolve();for(const t of this.trackDatas)t.type==="subtitle"&&t.track.source._codec==="webvtt"&&await this.processWebVTTCues(t,1/0);if(this.isFragmented){await this.interleaveSamples(!0);for(const t of this.trackDatas)this.processTimestamps(t);await this.finalizeFragment(!1)}else for(const t of this.trackDatas)this.processTimestamps(t),await this.finalizeCurrentChunk(t);if(this.fastStart==="in-memory"){fe(this.mdat);let t;for(let r=0;r<2;r++){const s=As(this.trackDatas,this.creationTime),o=this.boxWriter.measureBox(s);t=this.boxWriter.measureBox(this.mdat);let a=this.writer.getPos()+o+t;for(const c of this.finalizedChunks){c.offset=a;for(const{data:l}of c.samples)fe(l),a+=l.byteLength,t+=l.byteLength}if(a<2**32)break;t>=2**32&&(this.mdat.largeSize=!0)}this.format._options.onMoov&&this.writer.startTrackingWrites();const i=As(this.trackDatas,this.creationTime);if(this.boxWriter.writeBox(i),this.format._options.onMoov){const{data:r,start:s}=this.writer.stopTrackingWrites();this.format._options.onMoov(r,s)}this.format._options.onMdat&&this.writer.startTrackingWrites(),this.mdat.size=t,this.boxWriter.writeBox(this.mdat);for(const r of this.finalizedChunks)for(const s of r.samples)fe(s.data),this.writer.write(s.data),s.data=null;if(this.format._options.onMdat){const{data:r,start:s}=this.writer.stopTrackingWrites();this.format._options.onMdat(r,s)}}else if(this.isFragmented){const t=this.writer.getPos(),i=vx(this.trackDatas);this.boxWriter.writeBox(i);const r=this.writer.getPos()-t;this.writer.seek(this.writer.getPos()-4),this.boxWriter.writeU32(r)}else{fe(this.mdat);const t=this.boxWriter.offsets.get(this.mdat);fe(t!==void 0);const i=this.writer.getPos()-t;if(this.mdat.size=i,this.mdat.largeSize=i>=2**32,this.boxWriter.patchBox(this.mdat),this.format._options.onMdat){const{data:s,start:o}=this.writer.stopTrackingWrites();this.format._options.onMdat(s,o)}this.format._options.onMoov&&this.writer.startTrackingWrites();const r=As(this.trackDatas,this.creationTime);if(this.boxWriter.writeBox(r),this.format._options.onMoov){const{data:s,start:o}=this.writer.stopTrackingWrites();this.format._options.onMoov(s,o)}}e()}}/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */const Dx=[],Fx=[];/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */const Qc=new Uint8Array(0);class ri{constructor(e,t,i,r,s=-1,o){if(this.data=e,this.type=t,this.timestamp=i,this.duration=r,this.sequenceNumber=s,e===Qc&&o===void 0)throw new Error("Internal error: byteLength must be explicitly provided when constructing metadata-only packets.");if(o===void 0&&(o=e.byteLength),!(e instanceof Uint8Array))throw new TypeError("data must be a Uint8Array.");if(t!=="key"&&t!=="delta")throw new TypeError('type must be either "key" or "delta".');if(!Number.isFinite(i))throw new TypeError("timestamp must be a number.");if(!Number.isFinite(r)||r<0)throw new TypeError("duration must be a non-negative number.");if(!Number.isFinite(s))throw new TypeError("sequenceNumber must be a number.");if(!Number.isInteger(o)||o<0)throw new TypeError("byteLength must be a non-negative integer.");this.byteLength=o}get isMetadataOnly(){return this.data===Qc}get microsecondTimestamp(){return Math.trunc(ti*this.timestamp)}get microsecondDuration(){return Math.trunc(ti*this.duration)}toEncodedVideoChunk(){if(this.isMetadataOnly)throw new TypeError("Metadata-only packets cannot be converted to a video chunk.");if(typeof EncodedVideoChunk>"u")throw new Error("Your browser does not support EncodedVideoChunk.");return new EncodedVideoChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}toEncodedAudioChunk(){if(this.isMetadataOnly)throw new TypeError("Metadata-only packets cannot be converted to an audio chunk.");if(typeof EncodedAudioChunk>"u")throw new Error("Your browser does not support EncodedAudioChunk.");return new EncodedAudioChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}static fromEncodedChunk(e){if(!(e instanceof EncodedVideoChunk||e instanceof EncodedAudioChunk))throw new TypeError("chunk must be an EncodedVideoChunk or EncodedAudioChunk.");const t=new Uint8Array(e.byteLength);return e.copyTo(t),new ri(t,e.type,e.timestamp/1e6,(e.duration??0)/1e6)}clone(e){if(e!==void 0&&(typeof e!="object"||e===null))throw new TypeError("options, when provided, must be an object.");if(e?.timestamp!==void 0&&!Number.isFinite(e.timestamp))throw new TypeError("options.timestamp, when provided, must be a number.");if(e?.duration!==void 0&&!Number.isFinite(e.duration))throw new TypeError("options.duration, when provided, must be a number.");return new ri(this.data,this.type,e?.timestamp??this.timestamp,e?.duration??this.duration,this.sequenceNumber,this.byteLength)}}/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */const Nx=n=>{let i=n,r=4096,s=0,o=12,a=0;for(i<0&&(i=-i,s=128),i+=33,i>8191&&(i=8191);(i&r)!==r&&o>=5;)r>>=1,o--;return a=i>>o-4&15,~(s|o-5<<4|a)&255},Ox=n=>{let t=2048,i=0,r=11,s=0,o=n;for(o<0&&(o=-o,i=128),o>4095&&(o=4095);(o&t)!==t&&r>=5;)t>>=1,r--;return s=o>>(r===4?1:r-4)&15,(i|r-4<<4|s)^85};/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */class zn{get displayWidth(){return this.rotation%180===0?this.codedWidth:this.codedHeight}get displayHeight(){return this.rotation%180===0?this.codedHeight:this.codedWidth}get microsecondTimestamp(){return Math.trunc(ti*this.timestamp)}get microsecondDuration(){return Math.trunc(ti*this.duration)}constructor(e,t){if(this._closed=!1,e instanceof ArrayBuffer||ArrayBuffer.isView(e)){if(!t||typeof t!="object")throw new TypeError("init must be an object.");if(!("format"in t)||typeof t.format!="string")throw new TypeError("init.format must be a string.");if(!Number.isInteger(t.codedWidth)||t.codedWidth<=0)throw new TypeError("init.codedWidth must be a positive integer.");if(!Number.isInteger(t.codedHeight)||t.codedHeight<=0)throw new TypeError("init.codedHeight must be a positive integer.");if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(!Number.isFinite(t.timestamp))throw new TypeError("init.timestamp must be a number.");if(t.duration!==void 0&&(!Number.isFinite(t.duration)||t.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");this._data=ii(e).slice(),this.format=t.format,this.codedWidth=t.codedWidth,this.codedHeight=t.codedHeight,this.rotation=t.rotation??0,this.timestamp=t.timestamp,this.duration=t.duration??0,this.colorSpace=new VideoColorSpace(t.colorSpace)}else if(typeof VideoFrame<"u"&&e instanceof VideoFrame){if(t?.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(t?.timestamp!==void 0&&!Number.isFinite(t?.timestamp))throw new TypeError("init.timestamp, when provided, must be a number.");if(t?.duration!==void 0&&(!Number.isFinite(t.duration)||t.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");this._data=e,this.format=e.format,this.codedWidth=e.codedWidth,this.codedHeight=e.codedHeight,this.rotation=t?.rotation??0,this.timestamp=t?.timestamp??e.timestamp/1e6,this.duration=t?.duration??(e.duration??0)/1e6,this.colorSpace=e.colorSpace}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof SVGImageElement<"u"&&e instanceof SVGImageElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas){if(!t||typeof t!="object")throw new TypeError("init must be an object.");if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");if(!Number.isFinite(t.timestamp))throw new TypeError("init.timestamp must be a number.");if(t.duration!==void 0&&(!Number.isFinite(t.duration)||t.duration<0))throw new TypeError("init.duration, when provided, must be a non-negative number.");if(typeof VideoFrame<"u")return new zn(new VideoFrame(e,{timestamp:Math.trunc(t.timestamp*ti),duration:Math.trunc((t.duration??0)*ti)}),t);let i=0,r=0;if("naturalWidth"in e?(i=e.naturalWidth,r=e.naturalHeight):"videoWidth"in e?(i=e.videoWidth,r=e.videoHeight):"width"in e&&(i=Number(e.width),r=Number(e.height)),!i||!r)throw new TypeError("Could not determine dimensions.");const s=new OffscreenCanvas(i,r),o=s.getContext("2d",{alpha:!1,willReadFrequently:!0});fe(o),o.drawImage(e,0,0),this._data=s,this.format="RGBX",this.codedWidth=i,this.codedHeight=r,this.rotation=t.rotation??0,this.timestamp=t.timestamp,this.duration=t.duration??0,this.colorSpace=new VideoColorSpace({matrix:"rgb",primaries:"bt709",transfer:"iec61966-2-1",fullRange:!0})}else throw new TypeError("Invalid data type: Must be a BufferSource or CanvasImageSource.")}clone(){if(this._closed)throw new Error("VideoSample is closed.");return fe(this._data!==null),Tr(this._data)?new zn(this._data.clone(),{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation}):this._data instanceof Uint8Array?new zn(this._data.slice(),{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation}):new zn(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation})}close(){this._closed||(Tr(this._data)?this._data.close():this._data=null,this._closed=!0)}allocationSize(){if(this._closed)throw new Error("VideoSample is closed.");return fe(this._data!==null),Tr(this._data)?this._data.allocationSize():this._data instanceof Uint8Array?this._data.byteLength:this.codedWidth*this.codedHeight*4}async copyTo(e){if(!eo(e))throw new TypeError("destination must be an ArrayBuffer or an ArrayBuffer view.");if(this._closed)throw new Error("VideoSample is closed.");if(fe(this._data!==null),Tr(this._data))await this._data.copyTo(e);else if(this._data instanceof Uint8Array)ii(e).set(this._data);else{const i=this._data.getContext("2d",{alpha:!1});fe(i);const r=i.getImageData(0,0,this.codedWidth,this.codedHeight);ii(e).set(r.data)}}toVideoFrame(){if(this._closed)throw new Error("VideoSample is closed.");return fe(this._data!==null),Tr(this._data)?new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0}):this._data instanceof Uint8Array?new VideoFrame(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration,colorSpace:this.colorSpace}):new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}draw(e,t,i,r,s,o,a,c,l){let u=0,d=0,f=this.displayWidth,p=this.displayHeight,g=0,_=0,m=this.displayWidth,h=this.displayHeight;if(o!==void 0?(u=t,d=i,f=r,p=s,g=o,_=a,c!==void 0?(m=c,h=l):(m=f,h=p)):(g=t,_=i,r!==void 0&&(m=r,h=s)),!(typeof CanvasRenderingContext2D<"u"&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<"u"&&e instanceof OffscreenCanvasRenderingContext2D))throw new TypeError("context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.");if(!Number.isFinite(u))throw new TypeError("sx must be a number.");if(!Number.isFinite(d))throw new TypeError("sy must be a number.");if(!Number.isFinite(f)||f<0)throw new TypeError("sWidth must be a non-negative number.");if(!Number.isFinite(p)||p<0)throw new TypeError("sHeight must be a non-negative number.");if(!Number.isFinite(g))throw new TypeError("dx must be a number.");if(!Number.isFinite(_))throw new TypeError("dy must be a number.");if(!Number.isFinite(m)||m<0)throw new TypeError("dWidth must be a non-negative number.");if(!Number.isFinite(h)||h<0)throw new TypeError("dHeight must be a non-negative number.");if(this._closed)throw new Error("VideoSample is closed.");this.rotation===90?[u,d,f,p]=[d,this.codedHeight-u-f,p,f]:this.rotation===180?[u,d]=[this.codedWidth-u-f,this.codedHeight-d-p]:this.rotation===270&&([u,d,f,p]=[this.codedWidth-d-p,u,p,f]);const b=this.toCanvasImageSource();e.save();const M=g+m/2,S=_+h/2;e.translate(M,S),e.rotate(this.rotation*Math.PI/180);const C=this.rotation%180===0?1:m/h;e.scale(1/C,C),e.drawImage(b,u,d,f,p,-m/2,-h/2,m,h),e.restore()}drawWithFit(e,t){const i=e.canvas.width,r=e.canvas.height,s=t.rotation??this.rotation;let o,a,c,l;if(t.fit==="fill")o=0,a=0,c=i,l=r;else{const[d,f]=s%180===0?[this.codedWidth,this.codedHeight]:[this.codedHeight,this.codedWidth],p=t.fit==="contain"?Math.min(i/d,r/f):Math.max(i/d,r/f);c=d*p,l=f*p,o=(i-c)/2,a=(r-l)/2}const u=s%180===0?1:c/l;e.translate(i/2,r/2),e.rotate(s*Math.PI/180),e.scale(1/u,u),e.translate(-i/2,-r/2),e.drawImage(this.toCanvasImageSource(),o,a,c,l)}toCanvasImageSource(){if(this._closed)throw new Error("VideoSample is closed.");if(fe(this._data!==null),this._data instanceof Uint8Array){const e=this.toVideoFrame();return queueMicrotask(()=>e.close()),e}else return this._data}setRotation(e){if(![0,90,180,270].includes(e))throw new TypeError("newRotation must be 0, 90, 180, or 270.");this.rotation=e}setTimestamp(e){if(!Number.isFinite(e))throw new TypeError("newTimestamp must be a number.");this.timestamp=e}setDuration(e){if(!Number.isFinite(e)||e<0)throw new TypeError("newDuration must be a non-negative number.");this.duration=e}}const Tr=n=>typeof VideoFrame<"u"&&n instanceof VideoFrame,Jo=new Set(["f32","f32-planar","s16","s16-planar","s32","s32-planar","u8","u8-planar"]);class bi{get microsecondTimestamp(){return Math.trunc(ti*this.timestamp)}get microsecondDuration(){return Math.trunc(ti*this.duration)}constructor(e){if(this._closed=!1,Cr(e)){if(e.format===null)throw new TypeError("AudioData with null format is not supported.");this._data=e,this.format=e.format,this.sampleRate=e.sampleRate,this.numberOfFrames=e.numberOfFrames,this.numberOfChannels=e.numberOfChannels,this.timestamp=e.timestamp/1e6,this.duration=e.numberOfFrames/e.sampleRate}else{if(!e||typeof e!="object")throw new TypeError("Invalid AudioDataInit: must be an object.");if(!Jo.has(e.format))throw new TypeError("Invalid AudioDataInit: invalid format.");if(!Number.isFinite(e.sampleRate)||e.sampleRate<=0)throw new TypeError("Invalid AudioDataInit: sampleRate must be > 0.");if(!Number.isInteger(e.numberOfChannels)||e.numberOfChannels===0)throw new TypeError("Invalid AudioDataInit: numberOfChannels must be an integer > 0.");if(!Number.isFinite(e?.timestamp))throw new TypeError("init.timestamp must be a number.");const t=e.data.byteLength/(Ar(e.format)*e.numberOfChannels);if(!Number.isInteger(t))throw new TypeError("Invalid AudioDataInit: data size is not a multiple of frame size.");this.format=e.format,this.sampleRate=e.sampleRate,this.numberOfFrames=t,this.numberOfChannels=e.numberOfChannels,this.timestamp=e.timestamp,this.duration=t/e.sampleRate;let i;if(e.data instanceof ArrayBuffer)i=new Uint8Array(e.data);else if(ArrayBuffer.isView(e.data))i=new Uint8Array(e.data.buffer,e.data.byteOffset,e.data.byteLength);else throw new TypeError("Invalid AudioDataInit: data is not a BufferSource.");const r=this.numberOfFrames*this.numberOfChannels*Ar(this.format);if(i.byteLength<r)throw new TypeError("Invalid AudioDataInit: insufficient data size.");this._data=i}}allocationSize(e){if(!e||typeof e!="object")throw new TypeError("options must be an object.");if(!Number.isInteger(e.planeIndex)||e.planeIndex<0)throw new TypeError("planeIndex must be a non-negative integer.");if(e.format!==void 0&&!Jo.has(e.format))throw new TypeError("Invalid format.");if(e.frameOffset!==void 0&&(!Number.isInteger(e.frameOffset)||e.frameOffset<0))throw new TypeError("frameOffset must be a non-negative integer.");if(e.frameCount!==void 0&&(!Number.isInteger(e.frameCount)||e.frameCount<0))throw new TypeError("frameCount must be a non-negative integer.");if(this._closed)throw new Error("AudioSample is closed.");const t=e.format??this.format,i=e.frameOffset??0;if(i>=this.numberOfFrames)throw new RangeError("frameOffset out of range");const r=e.frameCount!==void 0?e.frameCount:this.numberOfFrames-i;if(r>this.numberOfFrames-i)throw new RangeError("frameCount out of range");const s=Ar(t),o=Cs(t);if(o&&e.planeIndex>=this.numberOfChannels)throw new RangeError("planeIndex out of range");if(!o&&e.planeIndex!==0)throw new RangeError("planeIndex out of range");return(o?r:r*this.numberOfChannels)*s}copyTo(e,t){if(!eo(e))throw new TypeError("destination must be an ArrayBuffer or an ArrayBuffer view.");if(!t||typeof t!="object")throw new TypeError("options must be an object.");if(!Number.isInteger(t.planeIndex)||t.planeIndex<0)throw new TypeError("planeIndex must be a non-negative integer.");if(t.format!==void 0&&!Jo.has(t.format))throw new TypeError("Invalid format.");if(t.frameOffset!==void 0&&(!Number.isInteger(t.frameOffset)||t.frameOffset<0))throw new TypeError("frameOffset must be a non-negative integer.");if(t.frameCount!==void 0&&(!Number.isInteger(t.frameCount)||t.frameCount<0))throw new TypeError("frameCount must be a non-negative integer.");if(this._closed)throw new Error("AudioSample is closed.");const{planeIndex:i,format:r,frameCount:s,frameOffset:o}=t,a=r??this.format;if(!a)throw new Error("Destination format not determined");const c=this.numberOfFrames,l=this.numberOfChannels,u=o??0;if(u>=c)throw new RangeError("frameOffset out of range");const d=s!==void 0?s:c-u;if(d>c-u)throw new RangeError("frameCount out of range");const f=Ar(a),p=Cs(a);if(p&&i>=l)throw new RangeError("planeIndex out of range");if(!p&&i!==0)throw new RangeError("planeIndex out of range");const _=(p?d:d*l)*f;if(e.byteLength<_)throw new RangeError("Destination buffer is too small");const m=Bu(e),h=zx(a);if(Cr(this._data))if(p)if(a==="f32-planar")this._data.copyTo(e,{planeIndex:i,frameOffset:u,frameCount:d,format:"f32-planar"});else{const b=new ArrayBuffer(d*4),M=new Float32Array(b);this._data.copyTo(M,{planeIndex:i,frameOffset:u,frameCount:d,format:"f32-planar"});const S=new DataView(b);for(let C=0;C<d;C++){const R=C*f,P=S.getFloat32(C*4,!0);h(m,R,P)}}else{const b=l,M=new Float32Array(d);for(let S=0;S<b;S++){this._data.copyTo(M,{planeIndex:S,frameOffset:u,frameCount:d,format:"f32-planar"});for(let C=0;C<d;C++){const P=(C*b+S)*f;h(m,P,M[C])}}}else{const b=this._data,M=new DataView(b.buffer,b.byteOffset,b.byteLength),S=this.format,C=Bx(S),R=Ar(S),P=Cs(S);for(let F=0;F<d;F++)if(p){const E=F*f;let y;P?y=(i*c+(F+u))*R:y=((F+u)*l+i)*R;const T=C(M,y);h(m,E,T)}else for(let E=0;E<l;E++){const T=(F*l+E)*f;let X;P?X=(E*c+(F+u))*R:X=((F+u)*l+E)*R;const k=C(M,X);h(m,T,k)}}}clone(){if(this._closed)throw new Error("AudioSample is closed.");if(Cr(this._data)){const e=new bi(this._data.clone());return e.setTimestamp(this.timestamp),e}else return new bi({format:this.format,sampleRate:this.sampleRate,numberOfFrames:this.numberOfFrames,numberOfChannels:this.numberOfChannels,timestamp:this.timestamp,data:this._data})}close(){this._closed||(Cr(this._data)?this._data.close():this._data=new Uint8Array(0),this._closed=!0)}toAudioData(){if(this._closed)throw new Error("AudioSample is closed.");if(Cr(this._data)){if(this._data.timestamp===this.microsecondTimestamp)return this._data.clone();if(Cs(this.format)){const e=this.allocationSize({planeIndex:0,format:this.format}),t=new ArrayBuffer(e*this.numberOfChannels);for(let i=0;i<this.numberOfChannels;i++)this.copyTo(new Uint8Array(t,i*e,e),{planeIndex:i,format:this.format});return new AudioData({format:this.format,sampleRate:this.sampleRate,numberOfFrames:this.numberOfFrames,numberOfChannels:this.numberOfChannels,timestamp:this.microsecondTimestamp,data:t})}else{const e=new ArrayBuffer(this.allocationSize({planeIndex:0,format:this.format}));return this.copyTo(e,{planeIndex:0,format:this.format}),new AudioData({format:this.format,sampleRate:this.sampleRate,numberOfFrames:this.numberOfFrames,numberOfChannels:this.numberOfChannels,timestamp:this.microsecondTimestamp,data:e})}}else return new AudioData({format:this.format,sampleRate:this.sampleRate,numberOfFrames:this.numberOfFrames,numberOfChannels:this.numberOfChannels,timestamp:this.microsecondTimestamp,data:this._data})}toAudioBuffer(){if(this._closed)throw new Error("AudioSample is closed.");const e=new AudioBuffer({numberOfChannels:this.numberOfChannels,length:this.numberOfFrames,sampleRate:this.sampleRate}),t=new Float32Array(this.allocationSize({planeIndex:0,format:"f32-planar"})/4);for(let i=0;i<this.numberOfChannels;i++)this.copyTo(t,{planeIndex:i,format:"f32-planar"}),e.copyToChannel(t,i);return e}setTimestamp(e){if(!Number.isFinite(e))throw new TypeError("newTimestamp must be a number.");this.timestamp=e}static*_fromAudioBuffer(e,t){if(!(e instanceof AudioBuffer))throw new TypeError("audioBuffer must be an AudioBuffer.");const i=48e3*5,r=e.numberOfChannels,s=e.sampleRate,o=e.length,a=Math.floor(i/r);let c=0,l=o;for(;l>0;){const u=Math.min(a,l),d=new Float32Array(r*u);for(let f=0;f<r;f++)e.copyFromChannel(d.subarray(f*u,(f+1)*u),f,c);yield new bi({format:"f32-planar",sampleRate:s,numberOfFrames:u,numberOfChannels:r,timestamp:t+c/s,data:d}),c+=u,l-=u}}static fromAudioBuffer(e,t){if(!(e instanceof AudioBuffer))throw new TypeError("audioBuffer must be an AudioBuffer.");const i=48e3*5,r=e.numberOfChannels,s=e.sampleRate,o=e.length,a=Math.floor(i/r);let c=0,l=o;const u=[];for(;l>0;){const d=Math.min(a,l),f=new Float32Array(r*d);for(let g=0;g<r;g++)e.copyFromChannel(f.subarray(g*d,(g+1)*d),g,c);const p=new bi({format:"f32-planar",sampleRate:s,numberOfFrames:d,numberOfChannels:r,timestamp:t+c/s,data:f});u.push(p),c+=d,l-=d}return u}}const Ar=n=>{switch(n){case"u8":case"u8-planar":return 1;case"s16":case"s16-planar":return 2;case"s32":case"s32-planar":return 4;case"f32":case"f32-planar":return 4;default:throw new Error("Unknown AudioSampleFormat")}},Cs=n=>{switch(n){case"u8-planar":case"s16-planar":case"s32-planar":case"f32-planar":return!0;default:return!1}},Bx=n=>{switch(n){case"u8":case"u8-planar":return(e,t)=>(e.getUint8(t)-128)/128;case"s16":case"s16-planar":return(e,t)=>e.getInt16(t,!0)/32768;case"s32":case"s32-planar":return(e,t)=>e.getInt32(t,!0)/2147483648;case"f32":case"f32-planar":return(e,t)=>e.getFloat32(t,!0)}},zx=n=>{switch(n){case"u8":case"u8-planar":return(e,t,i)=>e.setUint8(t,Vt((i+1)*127.5,0,255));case"s16":case"s16-planar":return(e,t,i)=>e.setInt16(t,Vt(Math.round(i*32767),-32768,32767),!0);case"s32":case"s32-planar":return(e,t,i)=>e.setInt32(t,Vt(Math.round(i*2147483647),-2147483648,2147483647),!0);case"f32":case"f32-planar":return(e,t,i)=>e.setFloat32(t,i,!0)}},Cr=n=>typeof AudioData<"u"&&n instanceof AudioData;/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */class id{getSupportedVideoCodecs(){return this.getSupportedCodecs().filter(e=>Ai.includes(e))}getSupportedAudioCodecs(){return this.getSupportedCodecs().filter(e=>fr.includes(e))}getSupportedSubtitleCodecs(){return this.getSupportedCodecs().filter(e=>$s.includes(e))}_codecUnsupportedHint(e){return""}}class rd extends id{constructor(e={}){if(!e||typeof e!="object")throw new TypeError("options must be an object.");if(e.fastStart!==void 0&&![!1,"in-memory","fragmented"].includes(e.fastStart))throw new TypeError('options.fastStart, when provided, must be false, "in-memory", or "fragmented".');if(e.minimumFragmentDuration!==void 0&&(!Number.isFinite(e.minimumFragmentDuration)||e.minimumFragmentDuration<0))throw new TypeError("options.minimumFragmentDuration, when provided, must be a non-negative number.");if(e.onFtyp!==void 0&&typeof e.onFtyp!="function")throw new TypeError("options.onFtyp, when provided, must be a function.");if(e.onMoov!==void 0&&typeof e.onMoov!="function")throw new TypeError("options.onMoov, when provided, must be a function.");if(e.onMdat!==void 0&&typeof e.onMdat!="function")throw new TypeError("options.onMdat, when provided, must be a function.");if(e.onMoof!==void 0&&typeof e.onMoof!="function")throw new TypeError("options.onMoof, when provided, must be a function.");super(),this._options=e}getSupportedTrackCounts(){return{video:{min:0,max:1/0},audio:{min:0,max:1/0},subtitle:{min:0,max:1/0},total:{min:1,max:2**32-1}}}get supportsVideoRotationMetadata(){return!0}_createMuxer(e){return new Ux(e,this)}}class sd extends rd{get _name(){return"MP4"}get fileExtension(){return".mp4"}get mimeType(){return"video/mp4"}getSupportedCodecs(){return[...Ai,...Gu,"pcm-s16","pcm-s16be","pcm-s24","pcm-s24be","pcm-s32","pcm-s32be","pcm-f32","pcm-f32be","pcm-f64","pcm-f64be",...$s]}_codecUnsupportedHint(e){return new od().getSupportedCodecs().includes(e)?" Switching to MOV will grant support for this codec.":""}}class od extends rd{get _name(){return"MOV"}get fileExtension(){return".mov"}get mimeType(){return"video/quicktime"}getSupportedCodecs(){return[...Ai,...fr]}_codecUnsupportedHint(e){return new sd().getSupportedCodecs().includes(e)?" Switching to MP4 will grant support for this codec.":""}}/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */const ad=n=>{if(!n||typeof n!="object")throw new TypeError("Encoding config must be an object.");if(!Ai.includes(n.codec))throw new TypeError(`Invalid video codec '${n.codec}'. Must be one of: ${Ai.join(", ")}.`);if(!(n.bitrate instanceof Xr)&&(!Number.isInteger(n.bitrate)||n.bitrate<=0))throw new TypeError("config.bitrate must be a positive integer or a quality.");if(n.keyFrameInterval!==void 0&&(!Number.isFinite(n.keyFrameInterval)||n.keyFrameInterval<0))throw new TypeError("config.keyFrameInterval, when provided, must be a non-negative number.");if(n.onEncodedPacket!==void 0&&typeof n.onEncodedPacket!="function")throw new TypeError("config.onEncodedChunk, when provided, must be a function.");if(n.onEncoderConfig!==void 0&&typeof n.onEncoderConfig!="function")throw new TypeError("config.onEncoderConfig, when provided, must be a function.");kx(n.codec,n)},kx=(n,e)=>{if(!e||typeof e!="object")throw new TypeError("Encoding options must be an object.");if(e.bitrateMode!==void 0&&!["constant","variable"].includes(e.bitrateMode))throw new TypeError("bitrateMode, when provided, must be 'constant' or 'variable'.");if(e.latencyMode!==void 0&&!["quality","realtime"].includes(e.latencyMode))throw new TypeError("latencyMode, when provided, must be 'quality' or 'realtime'.");if(e.fullCodecString!==void 0&&typeof e.fullCodecString!="string")throw new TypeError("fullCodecString, when provided, must be a string.");if(e.fullCodecString!==void 0&&Xu(e.fullCodecString)!==n)throw new TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${n}).`);if(e.hardwareAcceleration!==void 0&&!["no-preference","prefer-hardware","prefer-software"].includes(e.hardwareAcceleration))throw new TypeError("hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.");if(e.scalabilityMode!==void 0&&typeof e.scalabilityMode!="string")throw new TypeError("scalabilityMode, when provided, must be a string.");if(e.contentHint!==void 0&&typeof e.contentHint!="string")throw new TypeError("contentHint, when provided, must be a string.")},Vx=n=>{const e=n.bitrate instanceof Xr?n.bitrate._toVideoBitrate(n.codec,n.width,n.height):n.bitrate;return{codec:n.fullCodecString??Z0(n.codec,n.width,n.height,e),width:n.width,height:n.height,bitrate:e,bitrateMode:n.bitrateMode,framerate:n.framerate,latencyMode:n.latencyMode,hardwareAcceleration:n.hardwareAcceleration,scalabilityMode:n.scalabilityMode,contentHint:n.contentHint,...ev(n.codec)}},Hx=n=>{if(!n||typeof n!="object")throw new TypeError("Encoding config must be an object.");if(!fr.includes(n.codec))throw new TypeError(`Invalid audio codec '${n.codec}'. Must be one of: ${fr.join(", ")}.`);if(n.bitrate===void 0&&(!An.includes(n.codec)||n.codec==="flac"))throw new TypeError("config.bitrate must be provided for compressed audio codecs.");if(n.bitrate!==void 0&&!(n.bitrate instanceof Xr)&&(!Number.isInteger(n.bitrate)||n.bitrate<=0))throw new TypeError("config.bitrate, when provided, must be a positive integer or a quality.");if(n.onEncodedPacket!==void 0&&typeof n.onEncodedPacket!="function")throw new TypeError("config.onEncodedChunk, when provided, must be a function.");if(n.onEncoderConfig!==void 0&&typeof n.onEncoderConfig!="function")throw new TypeError("config.onEncoderConfig, when provided, must be a function.");Gx(n.codec,n)},Gx=(n,e)=>{if(!e||typeof e!="object")throw new TypeError("Encoding options must be an object.");if(e.bitrateMode!==void 0&&!["constant","variable"].includes(e.bitrateMode))throw new TypeError("bitrateMode, when provided, must be 'constant' or 'variable'.");if(e.fullCodecString!==void 0&&typeof e.fullCodecString!="string")throw new TypeError("fullCodecString, when provided, must be a string.");if(e.fullCodecString!==void 0&&Xu(e.fullCodecString)!==n)throw new TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${n}).`)},Wx=n=>{const e=n.bitrate instanceof Xr?n.bitrate._toAudioBitrate(n.codec):n.bitrate;return{codec:n.fullCodecString??J0(n.codec,n.numberOfChannels,n.sampleRate),numberOfChannels:n.numberOfChannels,sampleRate:n.sampleRate,bitrate:e,bitrateMode:n.bitrateMode,...tv(n.codec)}};/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */class gl{constructor(){this._connectedTrack=null,this._closingPromise=null,this._closed=!1,this._timestampOffset=0}_ensureValidAdd(){if(!this._connectedTrack)throw new Error("Source is not connected to an output track.");if(this._connectedTrack.output.state==="canceled")throw new Error("Output has been canceled.");if(this._connectedTrack.output.state==="finalizing"||this._connectedTrack.output.state==="finalized")throw new Error("Output has been finalized.");if(this._connectedTrack.output.state==="pending")throw new Error("Output has not started.");if(this._closed)throw new Error("Source is closed.")}async _start(){}async _flushAndClose(e){}close(){if(this._closingPromise)return;const e=this._connectedTrack;if(!e)throw new Error("Cannot call close without connecting the source to an output track.");if(e.output.state==="pending")throw new Error("Cannot call close before output has been started.");this._closingPromise=(async()=>{await this._flushAndClose(!1),this._closed=!0,!(e.output.state==="finalizing"||e.output.state==="finalized")&&e.output._muxer.onTrackClose(e)})()}async _flushOrWaitForOngoingClose(e){return this._closingPromise?this._closingPromise:this._flushAndClose(e)}}class _l extends gl{constructor(e){if(super(),this._connectedTrack=null,!Ai.includes(e))throw new TypeError(`Invalid video codec '${e}'. Must be one of: ${Ai.join(", ")}.`);this._codec=e}}class ld{constructor(e,t){this.source=e,this.encodingConfig=t,this.ensureEncoderPromise=null,this.encoderInitialized=!1,this.encoder=null,this.muxer=null,this.lastMultipleOfKeyFrameInterval=-1,this.codedWidth=null,this.codedHeight=null,this.resizeCanvas=null,this.customEncoder=null,this.customEncoderCallSerializer=new Hu,this.customEncoderQueueSize=0,this.encoderError=null}async add(e,t,i){try{if(this.checkForEncoderError(),this.source._ensureValidAdd(),this.codedWidth!==null&&this.codedHeight!==null){if(e.codedWidth!==this.codedWidth||e.codedHeight!==this.codedHeight){const a=this.encodingConfig.sizeChangeBehavior??"deny";if(a!=="passThrough"){if(a==="deny")throw new Error(`Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${e.codedWidth}x${e.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'strict' in the encoding options.`);{let c=!1;this.resizeCanvas||(typeof document<"u"?(this.resizeCanvas=document.createElement("canvas"),this.resizeCanvas.width=this.codedWidth,this.resizeCanvas.height=this.codedHeight):this.resizeCanvas=new OffscreenCanvas(this.codedWidth,this.codedHeight),c=!0);const l=this.resizeCanvas.getContext("2d",{alpha:!1});fe(l),c||l.clearRect(0,0,this.codedWidth,this.codedHeight),e.drawWithFit(l,{fit:a}),t&&e.close(),e=new zn(this.resizeCanvas,{timestamp:e.timestamp,duration:e.duration,rotation:e.rotation}),t=!0}}}}else this.codedWidth=e.codedWidth,this.codedHeight=e.codedHeight;this.encoderInitialized||(this.ensureEncoderPromise||this.ensureEncoder(e),this.encoderInitialized||await this.ensureEncoderPromise),fe(this.encoderInitialized);const r=this.encodingConfig.keyFrameInterval??5,s=Math.floor(e.timestamp/r),o={...i,keyFrame:i?.keyFrame||r===0||s!==this.lastMultipleOfKeyFrameInterval};if(this.lastMultipleOfKeyFrameInterval=s,this.customEncoder){this.customEncoderQueueSize++;const a=e.clone(),c=this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(a,o)).then(()=>this.customEncoderQueueSize--).catch(l=>this.encoderError??=l).finally(()=>{a.close()});this.customEncoderQueueSize>=4&&await c}else{fe(this.encoder);const a=e.toVideoFrame();this.encoder.encode(a,o),a.close(),t&&e.close(),this.encoder.encodeQueueSize>=4&&await new Promise(c=>this.encoder.addEventListener("dequeue",c,{once:!0}))}await this.muxer.mutex.currentPromise}finally{t&&e.close()}}async ensureEncoder(e){if(!this.encoder)return this.ensureEncoderPromise=(async()=>{const t=Vx({width:e.codedWidth,height:e.codedHeight,...this.encodingConfig,framerate:this.source._connectedTrack?.metadata.frameRate});this.encodingConfig.onEncoderConfig?.(t);const i=Dx.find(r=>r.supports(this.encodingConfig.codec,t));if(i)this.customEncoder=new i,this.customEncoder.codec=this.encodingConfig.codec,this.customEncoder.config=t,this.customEncoder.onPacket=(r,s)=>{if(!(r instanceof ri))throw new TypeError("The first argument passed to onPacket must be an EncodedPacket.");if(s!==void 0&&(!s||typeof s!="object"))throw new TypeError("The second argument passed to onPacket must be an object or undefined.");this.encodingConfig.onEncodedPacket?.(r,s),this.muxer.addEncodedVideoPacket(this.source._connectedTrack,r,s)},await this.customEncoder.init();else{if(typeof VideoEncoder>"u")throw new Error("VideoEncoder is not supported by this browser.");if(!(await VideoEncoder.isConfigSupported(t)).supported)throw new Error(`This specific encoder configuration (${t.codec}, ${t.bitrate} bps, ${t.width}x${t.height}, hardware acceleration: ${t.hardwareAcceleration??"no-preference"}) is not supported by this browser. Consider using another codec or changing your video parameters.`);this.encoder=new VideoEncoder({output:(s,o)=>{const a=ri.fromEncodedChunk(s);this.encodingConfig.onEncodedPacket?.(a,o),this.muxer.addEncodedVideoPacket(this.source._connectedTrack,a,o)},error:s=>{s.stack=new Error().stack,this.encoderError??=s}}),this.encoder.configure(t)}fe(this.source._connectedTrack),this.muxer=this.source._connectedTrack.output._muxer,this.encoderInitialized=!0})()}async flushAndClose(e){this.checkForEncoderError(),this.customEncoder?(e||this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()),await this.customEncoderCallSerializer.call(()=>this.customEncoder.close())):this.encoder&&(e||await this.encoder.flush(),this.encoder.close()),this.checkForEncoderError()}getQueueSize(){return this.customEncoder?this.customEncoderQueueSize:this.encoder?.encodeQueueSize??0}checkForEncoderError(){if(this.encoderError)throw this.encoderError}}class Xx extends _l{constructor(e){ad(e),super(e.codec),this._encoder=new ld(this,e)}add(e,t){if(!(e instanceof zn))throw new TypeError("videoSample must be a VideoSample.");return this._encoder.add(e,!1,t)}_flushAndClose(e){return this._encoder.flushAndClose(e)}}class $x extends _l{constructor(e,t){if(!(typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement)&&!(typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas))throw new TypeError("canvas must be an HTMLCanvasElement or OffscreenCanvas.");ad(t),super(t.codec),this._encoder=new ld(this,t),this._canvas=e}add(e,t=0,i){if(!Number.isFinite(e)||e<0)throw new TypeError("timestamp must be a non-negative number.");if(!Number.isFinite(t)||t<0)throw new TypeError("duration must be a non-negative number.");const r=new zn(this._canvas,{timestamp:e,duration:t});return this._encoder.add(r,!0,i)}_flushAndClose(e){return this._encoder.flushAndClose(e)}}class cd extends gl{constructor(e){if(super(),this._connectedTrack=null,!fr.includes(e))throw new TypeError(`Invalid audio codec '${e}'. Must be one of: ${fr.join(", ")}.`);this._codec=e}}class qx{constructor(e,t){this.source=e,this.encodingConfig=t,this.ensureEncoderPromise=null,this.encoderInitialized=!1,this.encoder=null,this.muxer=null,this.lastNumberOfChannels=null,this.lastSampleRate=null,this.isPcmEncoder=!1,this.outputSampleSize=null,this.writeOutputValue=null,this.customEncoder=null,this.customEncoderCallSerializer=new Hu,this.customEncoderQueueSize=0,this.encoderError=null}async add(e,t){try{if(this.checkForEncoderError(),this.source._ensureValidAdd(),this.lastNumberOfChannels!==null&&this.lastSampleRate!==null){if(e.numberOfChannels!==this.lastNumberOfChannels||e.sampleRate!==this.lastSampleRate)throw new Error(`Audio parameters must remain constant. Expected ${this.lastNumberOfChannels} channels at ${this.lastSampleRate} Hz, got ${e.numberOfChannels} channels at ${e.sampleRate} Hz.`)}else this.lastNumberOfChannels=e.numberOfChannels,this.lastSampleRate=e.sampleRate;if(this.encoderInitialized||(this.ensureEncoderPromise||this.ensureEncoder(e),this.encoderInitialized||await this.ensureEncoderPromise),fe(this.encoderInitialized),this.customEncoder){this.customEncoderQueueSize++;const i=e.clone(),r=this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(i)).then(()=>this.customEncoderQueueSize--).catch(s=>this.encoderError??=s).finally(()=>{i.close()});this.customEncoderQueueSize>=4&&await r,await this.muxer.mutex.currentPromise}else if(this.isPcmEncoder)await this.doPcmEncoding(e,t);else{fe(this.encoder);const i=e.toAudioData();this.encoder.encode(i),i.close(),t&&e.close(),this.encoder.encodeQueueSize>=4&&await new Promise(r=>this.encoder.addEventListener("dequeue",r,{once:!0})),await this.muxer.mutex.currentPromise}}finally{t&&e.close()}}async doPcmEncoding(e,t){fe(this.outputSampleSize),fe(this.writeOutputValue);const{numberOfChannels:i,numberOfFrames:r,sampleRate:s,timestamp:o}=e,a=2048,c=[];for(let f=0;f<r;f+=a){const p=Math.min(a,e.numberOfFrames-f),g=p*i*this.outputSampleSize,_=new ArrayBuffer(g),m=new DataView(_);c.push({frameCount:p,view:m})}const l=e.allocationSize({planeIndex:0,format:"f32-planar"}),u=new Float32Array(l/Float32Array.BYTES_PER_ELEMENT);for(let f=0;f<i;f++){e.copyTo(u,{planeIndex:f,format:"f32-planar"});for(let p=0;p<c.length;p++){const{frameCount:g,view:_}=c[p];for(let m=0;m<g;m++)this.writeOutputValue(_,(m*i+f)*this.outputSampleSize,u[p*a+m])}}t&&e.close();const d={decoderConfig:{codec:this.encodingConfig.codec,numberOfChannels:i,sampleRate:s}};for(let f=0;f<c.length;f++){const{frameCount:p,view:g}=c[f],_=g.buffer,m=f*a,h=new ri(new Uint8Array(_),"key",o+m/s,p/s);this.encodingConfig.onEncodedPacket?.(h,d),await this.muxer.addEncodedAudioPacket(this.source._connectedTrack,h,d)}}ensureEncoder(e){if(!this.encoderInitialized)return this.ensureEncoderPromise=(async()=>{const{numberOfChannels:t,sampleRate:i}=e,r=Wx({numberOfChannels:t,sampleRate:i,...this.encodingConfig});this.encodingConfig.onEncoderConfig?.(r);const s=Fx.find(o=>o.supports(this.encodingConfig.codec,r));if(s)this.customEncoder=new s,this.customEncoder.codec=this.encodingConfig.codec,this.customEncoder.config=r,this.customEncoder.onPacket=(o,a)=>{if(!(o instanceof ri))throw new TypeError("The first argument passed to onPacket must be an EncodedPacket.");if(a!==void 0&&(!a||typeof a!="object"))throw new TypeError("The second argument passed to onPacket must be an object or undefined.");this.encodingConfig.onEncodedPacket?.(o,a),this.muxer.addEncodedAudioPacket(this.source._connectedTrack,o,a)},await this.customEncoder.init();else if(An.includes(this.encodingConfig.codec))this.initPcmEncoder();else{if(typeof AudioEncoder>"u")throw new Error("AudioEncoder is not supported by this browser.");if(!(await AudioEncoder.isConfigSupported(r)).supported)throw new Error(`This specific encoder configuration (${r.codec}, ${r.bitrate} bps, ${r.numberOfChannels} channels, ${r.sampleRate} Hz) is not supported by this browser. Consider using another codec or changing your audio parameters.`);this.encoder=new AudioEncoder({output:(a,c)=>{const l=ri.fromEncodedChunk(a);this.encodingConfig.onEncodedPacket?.(l,c),this.muxer.addEncodedAudioPacket(this.source._connectedTrack,l,c)},error:a=>{a.stack=new Error().stack,this.encoderError??=a}}),this.encoder.configure(r)}fe(this.source._connectedTrack),this.muxer=this.source._connectedTrack.output._muxer,this.encoderInitialized=!0})()}initPcmEncoder(){this.isPcmEncoder=!0;const e=this.encodingConfig.codec,{dataType:t,sampleSize:i,littleEndian:r}=xr(e);switch(this.outputSampleSize=i,i){case 1:t==="unsigned"?this.writeOutputValue=(s,o,a)=>s.setUint8(o,Vt((a+1)*127.5,0,255)):t==="signed"?this.writeOutputValue=(s,o,a)=>{s.setInt8(o,Vt(Math.round(a*128),-128,127))}:t==="ulaw"?this.writeOutputValue=(s,o,a)=>{const c=Vt(Math.floor(a*32767),-32768,32767);s.setUint8(o,Nx(c))}:t==="alaw"?this.writeOutputValue=(s,o,a)=>{const c=Vt(Math.floor(a*32767),-32768,32767);s.setUint8(o,Ox(c))}:fe(!1);break;case 2:t==="unsigned"?this.writeOutputValue=(s,o,a)=>s.setUint16(o,Vt((a+1)*32767.5,0,65535),r):t==="signed"?this.writeOutputValue=(s,o,a)=>s.setInt16(o,Vt(Math.round(a*32767),-32768,32767),r):fe(!1);break;case 3:t==="unsigned"?this.writeOutputValue=(s,o,a)=>Vu(s,o,Vt((a+1)*83886075e-1,0,16777215),r):t==="signed"?this.writeOutputValue=(s,o,a)=>$0(s,o,Vt(Math.round(a*8388607),-8388608,8388607),r):fe(!1);break;case 4:t==="unsigned"?this.writeOutputValue=(s,o,a)=>s.setUint32(o,Vt((a+1)*21474836475e-1,0,4294967295),r):t==="signed"?this.writeOutputValue=(s,o,a)=>s.setInt32(o,Vt(Math.round(a*2147483647),-2147483648,2147483647),r):t==="float"?this.writeOutputValue=(s,o,a)=>s.setFloat32(o,a,r):fe(!1);break;case 8:t==="float"?this.writeOutputValue=(s,o,a)=>s.setFloat64(o,a,r):fe(!1);break;default:X0(i),fe(!1)}}async flushAndClose(e){this.checkForEncoderError(),this.customEncoder?(e||this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()),await this.customEncoderCallSerializer.call(()=>this.customEncoder.close())):this.encoder&&(e||await this.encoder.flush(),this.encoder.close()),this.checkForEncoderError()}getQueueSize(){return this.customEncoder?this.customEncoderQueueSize:this.isPcmEncoder?0:this.encoder?.encodeQueueSize??0}checkForEncoderError(){if(this.encoderError)throw this.encoderError}}class Yx extends cd{get errorPromise(){return this._errorPromiseAccessed=!0,this._promiseWithResolvers.promise}constructor(e,t){if(!(e instanceof MediaStreamTrack)||e.kind!=="audio")throw new TypeError("track must be an audio MediaStreamTrack.");Hx(t),super(t.codec),this._abortController=null,this._audioContext=null,this._scriptProcessorNode=null,this._promiseWithResolvers=ku(),this._errorPromiseAccessed=!1,this._encoder=new qx(this,t),this._track=e}async _start(){if(this._errorPromiseAccessed||console.warn("Make sure not to ignore the `errorPromise` field on MediaStreamVideoTrackSource, so that any internal errors get bubbled up properly."),this._abortController=new AbortController,typeof MediaStreamTrackProcessor<"u"){let e=null;const t=new MediaStreamTrackProcessor({track:this._track}),i=new WritableStream({write:r=>{if(e===null){e=r.timestamp/1e6;const s=this._connectedTrack.output._muxer;s.firstMediaStreamTimestamp===null?(s.firstMediaStreamTimestamp=performance.now()/1e3,this._timestampOffset=-e):this._timestampOffset=performance.now()/1e3-s.firstMediaStreamTimestamp-e}if(this._encoder.getQueueSize()>=4){r.close();return}this._encoder.add(new bi(r),!0).catch(s=>{this._abortController?.abort(),this._promiseWithResolvers.reject(s)})}});t.readable.pipeTo(i,{signal:this._abortController.signal}).catch(r=>{r instanceof DOMException&&r.name==="AbortError"||this._promiseWithResolvers.reject(r)})}else{const e=window.AudioContext||window.webkitAudioContext;this._audioContext=new e({sampleRate:this._track.getSettings().sampleRate});const t=this._audioContext.createMediaStreamSource(new MediaStream([this._track]));this._scriptProcessorNode=this._audioContext.createScriptProcessor(4096),this._audioContext.state==="suspended"&&await this._audioContext.resume(),t.connect(this._scriptProcessorNode),this._scriptProcessorNode.connect(this._audioContext.destination);let i=!1,r=0;this._scriptProcessorNode.onaudioprocess=s=>{const o=bi._fromAudioBuffer(s.inputBuffer,r);r+=s.inputBuffer.duration;for(const a of o){if(!i){i=!0;const c=this._connectedTrack.output._muxer;c.firstMediaStreamTimestamp===null?c.firstMediaStreamTimestamp=performance.now()/1e3:this._timestampOffset=performance.now()/1e3-c.firstMediaStreamTimestamp}if(this._encoder.getQueueSize()>=4){a.close();continue}this._encoder.add(a,!0).catch(c=>{this._audioContext.suspend(),this._promiseWithResolvers.reject(c)})}}}}async _flushAndClose(e){this._abortController&&(this._abortController.abort(),this._abortController=null),this._audioContext&&(fe(this._scriptProcessorNode),this._scriptProcessorNode.disconnect(),await this._audioContext.suspend()),await this._encoder.flushAndClose(e)}}class jx extends gl{constructor(e){if(super(),this._connectedTrack=null,!$s.includes(e))throw new TypeError(`Invalid subtitle codec '${e}'. Must be one of: ${$s.join(", ")}.`);this._codec=e}}/*!
 * Copyright (c) 2025-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */const Kx=["video","audio","subtitle"],ea=n=>{if(!n||typeof n!="object")throw new TypeError("metadata must be an object.");if(n.languageCode!==void 0&&!j0(n.languageCode))throw new TypeError("metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.");if(n.name!==void 0&&typeof n.name!="string")throw new TypeError("metadata.name, when provided, must be a string.")};class Zx{constructor(e){if(this.state="pending",this._tracks=[],this._startPromise=null,this._cancelPromise=null,this._finalizePromise=null,this._mutex=new zu,!e||typeof e!="object")throw new TypeError("options must be an object.");if(!(e.format instanceof id))throw new TypeError("options.format must be an OutputFormat.");if(!(e.target instanceof td))throw new TypeError("options.target must be a Target.");if(e.target._output)throw new Error("Target is already used for another output.");e.target._output=this,this.format=e.format,this.target=e.target,this._writer=e.target._createWriter(),this._muxer=e.format._createMuxer(this)}addVideoTrack(e,t={}){if(!(e instanceof _l))throw new TypeError("source must be a VideoSource.");if(ea(t),t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw new TypeError(`Invalid video rotation: ${t.rotation}. Has to be 0, 90, 180 or 270.`);if(!this.format.supportsVideoRotationMetadata&&t.rotation)throw new Error(`${this.format._name} does not support video rotation metadata.`);if(t.frameRate!==void 0&&(!Number.isFinite(t.frameRate)||t.frameRate<=0))throw new TypeError(`Invalid video frame rate: ${t.frameRate}. Must be a positive number.`);this._addTrack("video",e,t)}addAudioTrack(e,t={}){if(!(e instanceof cd))throw new TypeError("source must be an AudioSource.");ea(t),this._addTrack("audio",e,t)}addSubtitleTrack(e,t={}){if(!(e instanceof jx))throw new TypeError("source must be a SubtitleSource.");ea(t),this._addTrack("subtitle",e,t)}_addTrack(e,t,i){if(this.state!=="pending")throw new Error("Cannot add track after output has been started or canceled.");if(t._connectedTrack)throw new Error("Source is already used for a track.");const r=this.format.getSupportedTrackCounts(),s=this._tracks.reduce((l,u)=>l+(u.type===e?1:0),0),o=r[e].max;if(s===o)throw new Error(o===0?`${this.format._name} does not support ${e} tracks.`:`${this.format._name} does not support more than ${o} ${e} track${o===1?"":"s"}.`);const a=r.total.max;if(this._tracks.length===a)throw new Error(`${this.format._name} does not support more than ${a} tracks${a===1?"":"s"} in total.`);const c={id:this._tracks.length+1,output:this,type:e,source:t,metadata:i};if(c.type==="video"){const l=this.format.getSupportedVideoCodecs();if(l.length===0)throw new Error(`${this.format._name} does not support video tracks.`+this.format._codecUnsupportedHint(c.source._codec));if(!l.includes(c.source._codec))throw new Error(`Codec '${c.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${l.map(u=>`'${u}'`).join(", ")}.`+this.format._codecUnsupportedHint(c.source._codec))}else if(c.type==="audio"){const l=this.format.getSupportedAudioCodecs();if(l.length===0)throw new Error(`${this.format._name} does not support audio tracks.`+this.format._codecUnsupportedHint(c.source._codec));if(!l.includes(c.source._codec))throw new Error(`Codec '${c.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${l.map(u=>`'${u}'`).join(", ")}.`+this.format._codecUnsupportedHint(c.source._codec))}else if(c.type==="subtitle"){const l=this.format.getSupportedSubtitleCodecs();if(l.length===0)throw new Error(`${this.format._name} does not support subtitle tracks.`+this.format._codecUnsupportedHint(c.source._codec));if(!l.includes(c.source._codec))throw new Error(`Codec '${c.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${l.map(u=>`'${u}'`).join(", ")}.`+this.format._codecUnsupportedHint(c.source._codec))}this._tracks.push(c),t._connectedTrack=c}async start(){const e=this.format.getSupportedTrackCounts();for(const i of Kx){const r=this._tracks.reduce((o,a)=>o+(a.type===i?1:0),0),s=e[i].min;if(r<s)throw new Error(s===e[i].max?`${this.format._name} requires exactly ${s} ${i} track${s===1?"":"s"}.`:`${this.format._name} requires at least ${s} ${i} track${s===1?"":"s"}.`)}const t=e.total.min;if(this._tracks.length<t)throw new Error(t===e.total.max?`${this.format._name} requires exactly ${t} track${t===1?"":"s"}.`:`${this.format._name} requires at least ${t} track${t===1?"":"s"}.`);if(this.state==="canceled")throw new Error("Output has been canceled.");return this._startPromise?(console.warn("Output has already been started."),this._startPromise):this._startPromise=(async()=>{this.state="started",this._writer.start();const i=await this._mutex.acquire();await this._muxer.start();const r=this._tracks.map(s=>s.source._start());await Promise.all(r),i()})()}getMimeType(){return this._muxer.getMimeType()}async cancel(){if(this._cancelPromise)return console.warn("Output has already been canceled."),this._cancelPromise;if(this.state==="finalizing"||this.state==="finalized"){console.warn("Output has already been finalized.");return}return this._cancelPromise=(async()=>{this.state="canceled";const e=await this._mutex.acquire(),t=this._tracks.map(i=>i.source._flushOrWaitForOngoingClose(!0));await Promise.all(t),await this._writer.close(),e()})()}async finalize(){if(this.state==="pending")throw new Error("Cannot finalize before starting.");if(this.state==="canceled")throw new Error("Cannot finalize after canceling.");return this._finalizePromise?(console.warn("Output has already been finalized."),this._finalizePromise):this._finalizePromise=(async()=>{this.state="finalizing";const e=await this._mutex.acquire(),t=this._tracks.map(i=>i.source._flushOrWaitForOngoingClose(!1));await Promise.all(t),await this._muxer.finalize(),await this._writer.flush(),await this._writer.finalize(),this.state="finalized",e()})()}}let Ji,Ir,ta,Os=0;const Jc=60;let ud=0,Bs=null,to=!1;const Qx=()=>to;async function Jx(){Ji=new Zx({format:new sd,target:new nd}),N.render.type===0?(Ir=new $x(Qt.domElement,{codec:"avc",bitrate:Wo,sizeChangeBehavior:"contain"}),ta=new Yx(zs.getAudioTracks()[0],{codec:"opus",bitrate:Wo}),ta.errorPromise.catch(n=>{console.error("Audio source error:",n)}),Ji.addAudioTrack(ta),ud=performance.now(),Bs=null):Ir=new Xx({codec:"avc",bitrate:Wo,sizeChangeBehavior:"contain"}),Ji.addVideoTrack(Ir),await Ji.start(),to=!0}async function eS(){Os=0,to=!1,await Ji.finalize(),nS()}async function tS(){if(to){if(N.render.type===0){const n=(performance.now()-ud)/1e3;let e=.0167;Bs!==null&&(e=n-Bs),await Ir.add(n,e),Bs=n}else{const n=new VideoFrame(Qt.domElement,{timestamp:Os/Jc});await Ir.add(new zn(n,{timestamp:Os/Jc})),n.close()}Os++}}function nS(){const n=Ji.target.buffer,e=new Blob([n],{type:"video/mp4"}),t=URL.createObjectURL(e),i=document.createElement("a");i.href=t,i.download="audiculator-export.mp4",i.click()}const wt=new qs({title:"Audiculator"}).onFinishChange(()=>{localStorage.setItem("preset",JSON.stringify(wt.save()))}).onChange(n=>{}),Pt={resetPreset:function(){wt.reset()},savePreset:function(){const n="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify({version:"0.1.0",...wt.save()})),e=document.createElement("a");e.setAttribute("href",n),e.setAttribute("download","preset.json"),document.body.appendChild(e),e.click(),e.remove()},loadPreset:function(){const n=document.createElement("input");n.type="file",n.accept=".json,application/json",n.onchange=e=>{const t=e.target.files[0];if(!t)return;const i=new FileReader;i.onload=r=>{try{const s=JSON.parse(r.target.result);wt.load(s)}catch{alert("Invalid preset file.")}},i.readAsText(t)},n.click(),n.remove()},showStats:!1,audioInputDevice:null,restartMicrophone:async function(){await Ka(this.audioInputDevice)},stopMicrophone:async function(){await tu()},relay:{ip:"ws://localhost:8080",quality:.7,fps:15,run:function(){$a(),G0(this.ip),eu.disable(),ja.enable()},stop:function(){$a(),eu.enable(),ja.disable()}},render:{startRender:async function(){await Jx()},stopRender:async function(){await eS()}}};try{Pt.audioInputDevice=(await kd()).deviceId}catch{alert("Please allow microphone access."),window.location.reload()}wt.add(Pt,"savePreset");wt.add(Pt,"loadPreset");wt.add(Pt,"resetPreset");const vl=wt.addFolder("audioInput");vl.add(Pt,"audioInputDevice",{none:null,...await Vd()}).name("inputSource").onChange(n=>{tu(),Pt.audioInputDevice=n,n&&Ka(n)});vl.add(Pt,"restartMicrophone").name("start");vl.add(Pt,"stopMicrophone").name("stop");const xl=wt.addFolder("render").close(),dd=xl.add(N.render,"type",{realtime:0}),hd=xl.add(Pt.render,"startRender").onChange(()=>{hd.disable(),fd.enable(),dd.disable()}),fd=xl.add(Pt.render,"stopRender").disable().onChange(()=>{fd.disable(),hd.enable(),dd.enable()}),Pi=wt.addFolder("scene").close();Pi.addColor(N.scene,"color").name("backgroundColor").onChange(()=>{Qt.setClearColor(N.scene.color,1)});Qt.setClearColor(N.scene.color,1);Pi.add(N.scene,"colorAlpha",0,1).name("backgroundColorAlpha").onChange(()=>{Qt.setClearColor(N.scene.color,N.scene.colorAlpha)});Pi.add(N.scene,"alwaysLookCenter").onChange(()=>{Ot.updateProjectionMatrix()});Pi.add(N.scene,"cameraFov",10,150).onChange(()=>{Ot.fov=N.scene.cameraFov,Ot.updateProjectionMatrix()});Pi.add(N.scene,"cameraDistance",2,50);Pi.add(N.scene,"cameraVertical",-30,30);Pi.add(N.scene,"cameraHorizontal",-30,30);const li=wt.addFolder("circle").close();li.add(N.circle,"count",1,64).name("count").step(1).onChange(()=>{N.debugTrace.count>N.circle.count&&(N.debugTrace.count=N.circle.count,pd.updateDisplay(),Ri()),Wn()});li.add(N.circle,"size",.01,1).name("size").step(.01).onChange(()=>{N.debugTrace.size<N.circle.size&&(N.debugTrace.size=N.circle.size,md.updateDisplay(),Ri()),Wn()});li.add(N.circle,"segments",{"sphere (3D)":16,"square (3D)":2,circle:32,square:4,triangle:1}).name("shape").step(1).onChange(()=>{Wn()});li.addColor(N.circle,"color").onChange(()=>{Wn()});li.add(N.circle,"colorShift",{false:!1,red:16,green:8,blue:32,manual:!0}).onChange(()=>{Wn()});li.add(N.circleMovement,"isCirclesSpin").name("doCirclesSpin");li.add(N.circle,"showLinesOnly").onChange(()=>{Wn()});li.add(N.circle,"light3d").onChange(()=>{Wn()});const mn=wt.addFolder("circleMovement").close();mn.add(N.circleMovement,"stop");mn.add(N.circleMovement,"space",1,64).name("space").step(1);mn.add(N.circleMovement,"centerOffset",-1,1).step(.1);mn.add(N.circleMovement,"maxSize",0,10).step(.1);mn.add(N.circleMovement,"minSize",0,10).step(.1);mn.add(N.circleMovement,"expansionThreshold",0,6).step(.1);mn.add(N.circleMovement,"expansionDirection",{inwards:1,outwards:-1});mn.add(N.circleMovement,"rotationSpeed",-100,100).name("rotationSpeed").step(1);mn.add(N.circleMovement,"isVariatingSpeed").name("musicalSpeedVariation");mn.add(N.circle,"depthMirror");mn.add(N.circleMovement,"symmetry").onChange(()=>{Wn()});const Li=wt.addFolder("debugTrace").close(),pd=Li.add(N.debugTrace,"count",0,64).name("count").step(1).onChange(()=>{N.debugTrace.count>N.circle.count&&(N.debugTrace.count=N.circle.count,pd.updateDisplay()),Ri()}),md=Li.add(N.debugTrace,"size",0,.8).name("size").step(.01).onChange(()=>{N.debugTrace.size<N.circle.size&&(N.debugTrace.size=N.circle.size,md.updateDisplay()),Ri()});Li.add(N.debugTrace,"random");Li.add(N.debugTrace,"changeRate",1,240).step(1);Li.add(N.debugTrace,"minDelay",0,240).step(1);Li.addColor(N.debugTrace,"squareColor").onChange(()=>{Ri()});Li.addColor(N.debugTrace,"lineColor").onChange(()=>{Ri()});const no=wt.addFolder("glow").close();no.add(N.glow,"isActive");no.add(N.glow,"strength",0,15).onChange(()=>{Wr()});no.add(N.glow,"radius",0,5).step(.01).onChange(()=>{Wr()});no.add(N.glow,"threshold",0,1).step(.01).onChange(()=>{Wr()});const oi=new qs().close();oi.title("devTools");oi.domElement.style.position="fixed";oi.domElement.style.top="25px";oi.domElement.style.zIndex="1000";oi.add(Pt,"showStats").name("stats").onChange(()=>{Dr.dom.style.display=Pt.showStats?"block":"none"});const $r=oi.addFolder("relayDisplayBuffer");$r.add(Pt.relay,"ip").name("websocketAddr");$r.add(Pt.relay,"quality",.01,1).onChange(n=>{V0(n)});$r.add(Pt.relay,"fps",1,60).onChange(n=>{H0(n)});const eu=$r.add(Pt.relay,"run").name("stream"),ja=$r.add(Pt.relay,"stop");ja.disable();wt.title("Audiculator - (Press H to hide)");window.addEventListener("keypress",n=>{n.key==="h"&&(wt.domElement.style.display=wt.domElement.style.display==="none"?"block":"none",oi.domElement.style.display=oi.domElement.style.display==="none"?"block":"none",keyframeGui.domElement.style.display=keyframeGui.domElement.style.display==="none"?"block":"none")});if(localStorage.getItem("preset"))try{const n=JSON.parse(localStorage.getItem("preset"));wt.load(n)}catch{console.warn("Invalid preset in localStorage.")}async function gd(){Dr.begin(),requestAnimationFrame(gd)%((N.debugTrace.random?Math.floor(Math.random()*N.debugTrace.changeRate):N.debugTrace.changeRate)+N.debugTrace.minDelay)===0&&R0(),I0(),Ot.position.x=N.scene.cameraHorizontal,Ot.position.y=N.scene.cameraVertical,Ot.position.z=N.scene.cameraDistance,N.scene.alwaysLookCenter?Ot.lookAt(Zt.position):Ot.lookAt(N.scene.cameraHorizontal,N.scene.cameraVertical,N.scene.cameraDistance),N.debugTrace.squares.forEach(e=>{e.rotation.copy(Ot.rotation)}),N.glow.isActive?Qi.render(Zt,Ot):Qt.render(Zt,Ot),Qx()&&await tS(),Dr.end()}M0();Wr();await Ka();await gd();window.addEventListener("resize",()=>{Ot.aspect=window.innerWidth/window.innerHeight,Ot.updateProjectionMatrix(),Qt.setSize(window.innerWidth,window.innerHeight),Qt.setPixelRatio(window.devicePixelRatio),Wr()});
