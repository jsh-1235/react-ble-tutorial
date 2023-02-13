class Graph {
  x;
  y;
  width;
  height;
  color;

  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

export default class LineGraph extends Graph {
  lineWidth = 1;

  yOffset = 0;

  xScale = 1;

  maxWidth = this.width / this.xScale;

  points = [];

  getLineWidth() {
    return this.lineWidth;
  }

  setLineWidth(lineWidth) {
    this.lineWidth = lineWidth;
  }

  setXScale(xScale) {
    this.xScale = xScale;
    this.maxWidth = this.width / this.xScale;
  }

  add(point) {
    if (this.points.length <= this.maxWidth) {
      this.points.push([this.points.length, point]);
    } else {
      this.points.shift();

      this.points.push([this.points.length, point]);
    }
  }

  draw(context) {
    context.clearRect(this.x, this.y, this.width, this.height);

    context.strokeStyle = this.color;

    context.lineWidth = this.lineWidth;

    context.beginPath();

    for (var i = 0; i < this.points.length - 1; i++) {
      context.moveTo(i * this.xScale, this.points[i][1] + this.yOffset);

      context.lineTo((i + 1) * this.xScale, this.points[i + 1][1] + this.yOffset);

      context.stroke();
    }

    context.closePath();
  }
}
