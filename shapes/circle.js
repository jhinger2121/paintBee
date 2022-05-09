import {setPoints, getPointsDict} from '/util/utils.js';
import {fabricObject} from '../main.js';
import {BaseBrush} from '../brushes/base_brush.js';


export function Circle(canvas, ctx, points=[]) {
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

            // c2 = (xA − xB)2 + (yA − yB)2
            let a = current_p.x - last_p.x;
            let b = current_p.y - last_p.y;
            let c = Math.sqrt(a*a + b*b);
            tmp_ctx.beginPath();
            tmp_ctx.arc(last_p.x, last_p.y, c, 0, Math.PI * 2, true);
            tmp_ctx.stroke();

            // save radius to points obj
            last_p.radius = c;
        }
    }
    this.onMouseUp = function (e, tmp_canvas, tmp_ctx) {
        console.log('up rect');
        this.isDrawing = false;

        this.ctx.drawImage(tmp_canvas, 0, 0);
        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

        if (!this.points[this.points.length - 1].radius) {
            this.points.splice(this.points[this.points.length-1], 1);
        } else {
            let points = [...this.points];
            let obj = new Circle(canvas, ctx, points=points);
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
            ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2, true);
            ctx.stroke();
        }
    }
}