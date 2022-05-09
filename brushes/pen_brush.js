import {BaseBrush} from './base_brush.js';
import {point} from '/util/utils.js';
import {fabricObject} from '../main.js';


function getRandomInt(min, max) {
    console.log(min, max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function PenBrush(canvas, ctx, points=[]) {
    BaseBrush.call(this);
	this.canvas = canvas;
	this.ctx = ctx;
    this.points = points;
	this.onMouseDown = function (e) {
		console.log('down');
        this.isDrawing = true;
        let lineWidth = this.ctx.lineWidth;
        this.points.push({
            x: e.clientX,
            y: e.clientY,
            width: getRandomInt(2, 4),
        })
	}
	this.onMouseMove = function (e, tmp_canvas, tmp_ctx) {
		if (this.isDrawing) {
            console.log('moving');
			tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
            this.points.push({
                x: e.clientX,
                y: e.clientY,
                width: getRandomInt(2, 4),
            })
            this.render(tmp_ctx);
		}
	}
	this.onMouseUp = function (e, tmp_canvas, tmp_ctx) {
		console.log('up');
        this.isDrawing = false;

		this.ctx.drawImage(tmp_canvas, 0, 0);
        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
        
        let obj;
		if (this.points.length > 1) {
			let points = [...this.points]
            obj = new PenBrush(canvas, ctx, points)
            obj.saveSettings(ctx);
            fabricObject.push(obj)
		}
        this.points.length = 0;
        if (obj) {
            return obj
        }
	}
	this.drawPoints = function (e) {
		this.points.push({x: e.clientX, y: e.clientY})
	}
	this.render = function (ctx) {
        for (let i = 1; i < this.points.length; i++) {
            ctx.beginPath();
            ctx.lineWidth = this.points[i].width;
            ctx.moveTo(this.points[i-1].x, this.points[i-1].y);
            ctx.lineTo(this.points[i].x, this.points[i].y);
            ctx.stroke();
        }
	}
}