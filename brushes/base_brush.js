export function BaseBrush() {
    this.settings;

    this.saveSettings = function (ctx) {
        let foo = {
            color: ctx.strokeStyle,
            Width: ctx.lineWidth,
            globalAlpha: ctx.globalAlpha,
            strokeLineJoin: 'round',
            strokeLine: 'round',
        }
        this.settings = foo;
    }
    this.restoreSettings = function (ctx) {
        ctx.strokeStyle = this.settings.color || ctx.strokeStyle;
        ctx.lineWidth = this.settings.Width;
        ctx.globalAlpha = this.settings.globalAlpha
    }
}