import {point} from '/util/utils.js';
import {BaseBrush} from './base_brush.js';

export function MakerBrush(canvas, ctx, points=[]) {
    BaseBrush.call(this);
	this.canvas = canvas;
	this.ctx = ctx;
    this.points = points;
	this.mouseDown = function (e) {
		console.log('down');
		this.isDrawing = true;
        point.setCurrentPoint(e, this.points);
	}
	this.mouseMove = function (e) {
		if (this.isDrawing) {
            console.log('move');
            let lastPoint = this.points[this.points.length - 1];
            let currentPoint = point.getCurrentPoint(e)
            this.ctx.beginPath();
            this.ctx.moveTo(lastPoint.x, lastPoint.y);
            this.ctx.lineTo(currentPoint.x, currentPoint.y);
            this.ctx.stroke();
            
            this.ctx.moveTo(lastPoint.x - 4, lastPoint.y - 4);
            this.ctx.lineTo(currentPoint.x - 4, currentPoint.y - 4);
            this.ctx.stroke();
            
            this.ctx.moveTo(lastPoint.x - 2, lastPoint.y - 2);
            this.ctx.lineTo(currentPoint.x - 2, currentPoint.y - 2);
            this.ctx.stroke();
            
            this.ctx.moveTo(lastPoint.x + 2, lastPoint.y + 2);
            this.ctx.lineTo(currentPoint.x + 2, currentPoint.y + 2);
            this.ctx.stroke();
            
            this.ctx.moveTo(lastPoint.x + 4, lastPoint.y + 4);
            this.ctx.lineTo(currentPoint.x + 4, currentPoint.y + 4);
            this.ctx.stroke();

			point.setCurrentPoint(e, this.points);
		}
	}
	this.mouseUp = function (e) {
		console.log('up');
        this.isDrawing = false;
        
        let obj;
		if (this.points.length > 1) {
			let points = [...this.points];
            obj = new MakerBrush(canvas, ctx, points=points);
            obj.saveSettings(ctx);
		}
        this.points.length = 0;
        if (obj) {
            return obj;
        }
	}
	this.render = function (ctx) {
		for (let i = 1; i < this.points.length; i++) {
            let p = this.points[i - 1];
            let p2 = this.points[i];
            ctx.beginPath();
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            
            this.ctx.moveTo(p.x - 4, p.y - 4);
            this.ctx.lineTo(p2.x - 4, p2.y - 4);
            
            this.ctx.moveTo(p.x - 2, p.y - 2);
            this.ctx.lineTo(p2.x - 2, p2.y - 2);
            
            this.ctx.moveTo(p.x + 2, p.y + 2);
            this.ctx.lineTo(p2.x + 2, p2.y + 2);
            
            this.ctx.moveTo(p.x + 4, p.y + 4);
            this.ctx.lineTo(p2.x + 4, p2.y + 4);
            this.ctx.stroke();
		}
	}
}