export function CanvasSettings () {

    //  save current settings
    // restore settings for the obj
    // maybe in future change settings of selected obj
    this.save_settings = function (ctx) {
        return new {
            color: ctx.strokeStyle,
        }
    }
}