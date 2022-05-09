import {setPoints, getPointsDict} from '/util/utils.js';
import {fabricObject} from '../main.js';
import {BaseBrush} from '../brushes/base_brush.js';


export function Line(canvas, ctx, points=[]) {
    BaseBrush.call(this);
    this.isDrawing = false;
    this.canvas = canvas;
    this.ctx = ctx;
    this.points = points;

    this.onMouseDown = function (e) {
        console.log('down');
        this.isDrawing = true;
        setPoints(e, this.points);
    }
    this.onMouseMove = function (e, tmp_canvas, tmp_ctx) {
        if (this.isDrawing) {
            console.log('moving');
            tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
            let last_p = this.points[this.points.length - 1];
            let current_p = getPointsDict(e);
            
            tmp_ctx.beginPath();
            tmp_ctx.moveTo(last_p.x, last_p.y);
            tmp_ctx.lineTo(current_p.x, current_p.y);
            tmp_ctx.stroke();

            // saving width and height of rect
            last_p.x2 = current_p.x;
            last_p.y2 = current_p.y;
        }
    }
    this.onMouseUp = function (e, tmp_canvas, tmp_ctx) {
        console.log('up rect');
        this.isDrawing = false;

        this.ctx.drawImage(tmp_canvas, 0, 0);
        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

        if (!(this.points[this.points.length - 1].x2 || this.points[this.points.length - 1].y2)) {
            this.points.splice(this.points[this.points.length-1], 1);
        } else {
            let points = [...this.points];
            let obj = new Line(canvas, ctx, points=points);
            this.points.length = 0;
            fabricObject.push(obj)
			obj.saveSettings(ctx)
            return obj;
        }
    }
    this.render = function (ctx) {
        console.log('rendering');
        for (let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(point.x2, point.y2);
            ctx.stroke();
        }
    }
}