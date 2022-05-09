export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function setPoints(e, points) {
	points.push({x: e.clientX, y: e.clientY});
}
export function getPointsDict(e) {
	return {x: e.clientX, y: e.clientY}
}

function Point(){
	this.getCurrentPoint = function (e) {
		return {x: e.clientX, y: e.clientY};
	}
	this.setCurrentPoint = function (e, points) {
		points.push({x: e.clientX, y: e.clientY});
	}
}
export let point = new Point();
