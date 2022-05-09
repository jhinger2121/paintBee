import {BaseBrush} from './base_brush.js';

export function LinePenBrush (canvas, ctx, tmp_canvas, tmp_ctx, points=[]) {
	BaseBrush.call(this);
	this.isDrawing = false;
	this.canvas = canvas;
	this.ctx = ctx;
	this.tmp_canvas = tmp_canvas;
	this.tmp_ctx = tmp_ctx;
	this.points = points;
	this.canvasSettings = {
		color: ctx.strokeStyle, lineWidth: ctx.lineWidth,
		lineJnCp: 'round',
	}
	this.mouseDown = function (e) {
		console.log('down');
		this.isDrawing = true;
		this.drawPoints(e);
	}
	this.mouseMove = function (e) {
		if (this.isDrawing) {
			console.log('moving')
            this.drawPoints(e)
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.points[this.points.length - 2].x, this.points[this.points.length - 2].y);
            this.ctx.lineTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
			this.ctx.stroke()

			this.neighbor_point(this.ctx);
		}
	}
	this.mouseUp = function (e) {
		console.log('up');
		this.isDrawing = false;

		let obj;
		if (this.points.length > 1) {
			let points = [...this.points]
			obj = new LinePenBrush(canvas, ctx, tmp_canvas, tmp_ctx, points)
			obj.saveSettings(ctx);
		}

		this.points.length = 0;
		if (obj) {
			return obj
		}
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
		console.log('a')
		for (let i = 1; i < this.points.length; i++) {
			ctx.beginPath();
            ctx.moveTo(
				this.points[i - 1].x,
				this.points[i - 1].y
			);
            ctx.lineTo(
				this.points[i].x,
				this.points[i].y
			);
			ctx.stroke();

			this.neighbor_point(this.ctx);
		}
	}
	this.neighbor_point = function (ctx) {
		for (let i = 0; i < this.points.length; i++) {
			let dx = this.points[i].x - this.points[this.points.length - 1].x;
			let dy = this.points[i].y - this.points[this.points.length - 1].y;
			let d = dx * dx + dy * dy;

			if (d < 1000) {
				ctx.globalAlpha = 0.3;
				ctx.beginPath();
				ctx.moveTo(
					this.points[this.points.length - 1].x + (dx * 0.2),
					this.points[this.points.length - 1].y + (dy * 0.2)
				);
				ctx.lineTo(
					this.points[i].x - (dx * 0.2),
					this.points[i].y - (dy * 0.2)
				);
				ctx.stroke();
			}
		}
	}
}
