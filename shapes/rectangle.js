import {setPoints, getPointsDict} from '/util/utils.js';
import {fabricObject} from '../main.js';
import {BaseBrush} from '../brushes/base_brush.js';


export function Rectangle(canvas, ctx, points=[]) {
    BaseBrush.call(this);
    this.isDrawing = false;
    this.points = points;
    this.canvas = canvas;
    this.ctx = ctx;

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
            let x = current_p.x - last_p.x;
            let y = current_p.y - last_p.y;
            
            tmp_ctx.beginPath();
            tmp_ctx.rect(last_p.x, last_p.y, x, y);
            tmp_ctx.stroke();

            // saving width and height of rect
            last_p.x2 = x;
            last_p.y2 = y;
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
            let obj = new Rectangle(canvas, ctx, points=points);
            this.points.length = 0;
            fabricObject.push(obj)
			obj.saveSettings(ctx)
            return obj;
        }
    }
    this.render = function (ctx) {
        console.log('rendering rect');
        ctx.beginPath();
        let point = this.points[0];
        ctx.rect(point.x, point.y, point.x2, point.y2);
        ctx.stroke();
    }
}