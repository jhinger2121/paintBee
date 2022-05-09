import {point} from '/util/utils.js';
import {BaseBrush} from './base_brush.js';
import {fabricObject} from '../main.js';


export function Pencil (canvas, ctx, points=[]) {
	BaseBrush.call(this);
	this.isDrawing = false;
	this.canvas = canvas;
	this.ctx = ctx;
	this.points = points;

	this.onMouseDown = function (e) {
		this.reset();
		this.isDrawing = true;
		point.setCurrentPoint(e, this.points);
		console.log('down', this.isDrawing);
	}
	this.onMouseMove = function (e, tmp_canvas, tmp_ctx) {
		if (this.isDrawing) {
			console.log('moving')
			point.setCurrentPoint(e, this.points);
			tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
			this.render(tmp_ctx);
		}
	}
	this.onMouseUp = function (e, tmp_canvas, tmp_ctx) {
		this.isDrawing = false;
		this.getNewObj(tmp_canvas, tmp_ctx);
	}
	this.drawPoints = function (e) {
		this.points.push({x: e.clientX, y: e.clientY})
	}
	this.midPoint = function (p1, p2) {
		return {
			x: p1.x + (p2.x - p1.x) / 2,
			y: p1.y + (p2.y - p1.y) / 2
		}
	}
	this.render = function (ctx) {
		let p1 = this.points[0];
		let p2 = this.points[1];
		ctx.beginPath();
		ctx.moveTo(p1.x, p1.y);
		for (let i = 1; i < this.points.length; i++) {
			let midPoint = this.midPoint(p1, p2)
			ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
			p1 = this.points[i];
			p2 = this.points[i+1];
		}
		ctx.lineTo(p1.x, p1.y)
		ctx.stroke();
	}
	this.getNewObj = function(tmp_canvas, tmp_ctx) {
		let obj;
		if (this.points.length > 1) {
			let points = [...this.points]
			// duplicate obj with same point 
			obj = new Pencil(canvas, ctx, points);
			// save settings (for this line or obj)
			console.log(obj, "this is obje")
			fabricObject.push(obj)
			obj.saveSettings(ctx)
		}

		this.ctx.drawImage(tmp_canvas, 0, 0);
		console.log(tmp_canvas, tmp_canvas.height)
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		if (obj) {
			return obj
		}
	}
	this.reset = function() {
		this.points.length = 0;
	}
}
