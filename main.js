import {Pencil} from '/brushes/pencil_brush.js';
import {PenBrush} from '/brushes/pen_brush.js';
import {LinePenBrush} from '/brushes/line_pen_brush.js';
import {MakerBrush} from '/brushes/maker_brush.js';

import {Rectangle} from '/shapes/rectangle.js';
import {Line} from '/shapes/line.js';
import {Circle} from '/shapes/circle.js';

let $ = function (id) {return document.getElementById(id)};
export const fabricObject = [];
const redoFabricObject = [];

const canvas = $('painter')
const tmp_canvas = $('sketcher');
export const ctx = canvas.getContext('2d');
export const tmp_ctx = tmp_canvas.getContext('2d');

canvas.width = window.innerWidth - 250;
tmp_canvas.width = window.innerWidth - 250;

canvas.height = window.innerHeight - 10;
tmp_canvas.height = window.innerHeight - 10;

function addEventsTo(tmp_canvas, obj){
	tmp_canvas.onmousedown = (e)=>{obj.onMouseDown(e)}
	tmp_canvas.onmousemove = (e)=>{obj.onMouseMove(e, tmp_canvas, tmp_ctx)}
	tmp_canvas.onmouseup = (e)=>{obj.onMouseUp(e, tmp_canvas, tmp_ctx)}
}

// deflaut function will create a indstance of a pencil brush
function _default() {
	console.log("default");
	// choose default brush
	let brush = new Pencil(canvas, ctx);
	addEventsTo(tmp_canvas, brush)

	// default canvas settings
	ctx.lineWidth = $('size').value;
	tmp_ctx.lineWidth = $('size').value;

	ctx.globalAlpha = $('opacity').value;
	tmp_ctx.globalAlpha = $('opacity').value;

	ctx.strokeStyle = $('fcolor').value;
	tmp_ctx.strokeStyle = $('fcolor').value;
}
_default();

// choosing brushes
function chooseBrush(){
	let brushes = $('brushes')
	console.log('braused', brushes)
	if (brushes.value === 'Plain'){

		// add drawing events 
		let plain_pncl = new Pencil(canvas, ctx);
		console.log(plain_pncl)
		addEventsTo(tmp_canvas, plain_pncl);

	}
	else if (brushes.value === 'Sketchy') {
		let sketchy_pncl = new PenBrush(canvas, ctx);
		addEventsTo(tmp_canvas, sketchy_pncl);
	}
}
$('pencilbtn').addEventListener('click', ()=>{
	chooseBrush();	
})
$('brushes').addEventListener('change', ()=>{
	// show pencil related settings on navabr
	chooseBrush();
	
	// add drawing events to any pencil pencil type
})

// choosing shapes
function chooseShape(){
	let shape = $('shapes');
	if (shape.value == 'circle'){
		let circle = new Circle(canvas, ctx);
		addEventsTo(tmp_canvas, circle);
	} else if(shape.value == 'line') {
		let line = new Line(canvas, ctx);
		addEventsTo(tmp_canvas, line);
	} else if(shape.value == 'rectangle') {
		let rect = new Rectangle(canvas, ctx);
		addEventsTo(tmp_canvas, rect);
	}
}
$('shapebtn').addEventListener('click', ()=>{
	console.log('circle');
	chooseShape();
})
$('shapes').addEventListener('change', ()=>{
	chooseShape();
})

// setting colors
function ctxSetting() {
	ctx.lineWidth = $('size').value;
	tmp_ctx.lineWidth = $('size').value;

	ctx.globalAlpha = $('opacity').value;
	tmp_ctx.globalAlpha = $('opacity').value;

	ctx.strokeStyle = $('fcolor').value;
	tmp_ctx.strokeStyle = $('fcolor').value;
}
ctxSetting();
$('size').addEventListener('change', (e)=>{
	ctx.lineWidth = e.target.value;
	tmp_ctx.lineWidth = e.target.value;
})
$('opacity').addEventListener('change', (e)=>{
	ctx.globalAlpha = e.target.value;
	tmp_ctx.globalAlpha = e.target.value;
})
$('fcolor').addEventListener('change', (e)=>{
	console.log('color changed')
	ctx.strokeStyle = e.target.value;
	tmp_ctx.strokeStyle = e.target.value;
})

// UNDO AND REDO
$('undobtn').addEventListener('click', (e) => {
	if (fabricObject.length) {
		let lastElementIndex = fabricObject.length - 1
		redoFabricObject.push(fabricObject[lastElementIndex])
		fabricObject.splice(lastElementIndex, 1);

		console.log(fabricObject);
		
		// re render the items
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for (let i = 0; i < fabricObject.length; i++) {
			// canvas settings for each obj
			fabricObject[i].restoreSettings(ctx);
			// render objs
			fabricObject[i].render(ctx);
		}
	}
})
$('redobtn').addEventListener('click', (e) => {
	if (redoFabricObject.length) {
		let lastElementIndex = redoFabricObject.length - 1
		fabricObject.push(redoFabricObject[lastElementIndex])
		redoFabricObject.splice(lastElementIndex, 1);
		console.log('current a', fabricObject, redoFabricObject)

		// render the items again                
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for (let i = 0; i < fabricObject.length; i++) {
			// set ctx setting b4 render canvas
			fabricObject[i].restoreSettings(ctx);
			fabricObject[i].render(ctx)
		}
	}            
})


// function setCanvasSettings(ctx, obj) {
// 	ctx.lineWidth = obj.canvasSettings.lineWidth;
// 	ctx.strokeStyle = obj.canvasSettings.color;
// 	ctx.lineJoin = ctx.lineCap = obj.canvasSettings.lineJnCp;
// }

// brushes.onchange = function () {
// 	if (brushs.value === 'pencil') {
// 		let pencil = new Pencil(canvas, ctx);
// 		console.log(pencil)
// 		tmp_canvas.onmousedown = (e) => {pencil.mouseDown(e)}
// 		tmp_canvas.onmousemove = (e) => {pencil.mouseMove(e, tmp_canvas, tmp_ctx)}
// 		tmp_canvas.onmouseup = (e) => {
// 			let obj = pencil.mouseUp(tmp_canvas, tmp_ctx)
// 			if (obj) {
// 				currentFabricObject.push(obj)
// 				console.log('Pencil', currentFabricObject)
// 			}
// 		}
// 	} 
// 	else if (brushs.value === 'pen') {
// 		let pen = new PenBrush(canvas, ctx)
// 		console.log(pen)
// 		tmp_canvas.onmousedown = (e) => {pen.mouseDown(e)}
// 		tmp_canvas.onmousemove = (e) => {pen.mouseMove(e, tmp_canvas, tmp_ctx, lineWidth.value)}
// 		tmp_canvas.onmouseup = (e) => {
// 			let obj = pen.mouseUp(tmp_canvas, tmp_ctx);
// 			if (obj) {
// 				currentFabricObject.push(obj)
// 				console.log(currentFabricObject)
// 			}
// 		}
// 	} 
// 	else if (brushs.value === 'line_pen') {
// 		let pen = new LinePenBrush(canvas, ctx, tmp_canvas, tmp_ctx);
// 		console.log(pen)
// 		tmp_canvas.onmousedown = (e) => {pen.mouseDown(e)}
// 		tmp_canvas.onmousemove = (e) => {pen.mouseMove(e)}
// 		tmp_canvas.onmouseup = (e) => {
// 			let obj = pen.mouseUp(e)
// 			currentFabricObject.push(obj)
// 			console.log(currentFabricObject)
// 		}
// 	}
// 	else if (brushs.value === 'maker-brush') {
// 		let makerBrush = new MakerBrush(canvas, ctx);
// 		console.log(makerBrush);
// 		tmp_canvas.onmousedown = (e) => {makerBrush.mouseDown(e)}
// 		tmp_canvas.onmousemove = (e) => {makerBrush.mouseMove(e)}
// 		tmp_canvas.onmouseup = (e) => {
// 			let obj = makerBrush.mouseUp(e)
// 			currentFabricObject.push(obj)
// 			console.log(currentFabricObject)
// 		}
// 	} else {
// 		console.log('wrong brush')
// 	}
// }
// shapes.addEventListener('change', () => {
// 	if (shapes.value === 'rect') {
// 		let rect = new Rectangle(canvas, ctx)
// 		console.log('Rectangle:', rect);
// 		tmp_canvas.onmousedown = (e) => {rect.onMouseDown(e)}
// 		tmp_canvas.onmousemove = (e) => {
// 			rect.onMouseMove(e, tmp_canvas, tmp_ctx)
// 		}
// 		tmp_canvas.onmouseup = (e) => {
// 			let obj = rect.onMouseUp(tmp_canvas, tmp_ctx);
// 			if (obj) {
// 				currentFabricObject.push(obj);
// 				console.log(currentFabricObject);
// 			}
// 		}
// 	}
// 	else if (shapes.value === 'circle') {
// 		let circle = new Circle(canvas, ctx)
// 		console.log('Rectangle:', circle);
// 		tmp_canvas.onmousedown = (e) => {circle.onMouseDown(e)}
// 		tmp_canvas.onmousemove = (e) => {
// 			circle.onMouseMove(e, tmp_canvas, tmp_ctx)
// 		}
// 		tmp_canvas.onmouseup = (e) => {
// 			let obj = circle.onMouseUp(tmp_canvas, tmp_ctx);
// 			if (obj) {
// 				currentFabricObject.push(obj);
// 				console.log(currentFabricObject);
// 			}
// 		}
// 	} else {
// 		console.log('Shape:', shapes.value);
// 	}
// })

// let settings = {
// 	defalut_cnv_settings: function (cnvs_list) {
// 		for (let i = 0; i < cnvs_list.length; i++) {
// 			cnvs_list[i].lineWidth = lineWidth.value;
// 			cnvs_list[i].strokeStyle = color.value;
// 			cnvs_list[i].lineJoin = cnvs_list[i].lineCap = 'round';
// 		}
// 	},
// }
// function main() {
// 	// set brush
// 	let line = new Line(canvas, ctx)
// 	console.log('Rectangle:', line);
// 	tmp_canvas.onmousedown = (e) => {line.onMouseDown(e)}
// 	tmp_canvas.onmousemove = (e) => {
// 		line.onMouseMove(e, tmp_canvas, tmp_ctx)
// 	}
// 	tmp_canvas.onmouseup = (e) => {
// 		let obj = line.onMouseUp(tmp_canvas, tmp_ctx);
// 		currentFabricObject.push(obj);
// 		console.log(currentFabricObject);
// 	}
// 	// set canvas setttings
// 	settings.defalut_cnv_settings([ctx, tmp_ctx]);
// }
// main()
 