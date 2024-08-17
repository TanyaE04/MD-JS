const SVG_NS = "http://www.w3.org/2000/svg";

class SVGElement {
    element = null;

    constructor(name) {
        this.element = document.createElementNS(SVG_NS, name);
    }

    getSVGElement() {
        return this.element;
    }

    appendSVGElement(element) {
        this.element.append(element);
    }

    addId(id) {
        this.element.setAttributeNS(null, "id", id);
    }

    addFill(color) {
        this.element.setAttributeNS(null, "fill", color);
    }

    addStroke(color) {
        this.element.setAttributeNS(null, "stroke", color);
    }

    addStrokeWidth(width) {
        this.element.setAttributeNS(null, "stroke-width", width);
    }

    addFilterUrl(filter) {
        this.element.setAttributeNS(null, "filter", filter);
    }

    rotate(agle, x, y) {
        this.element.setAttributeNS(null, "transform", `rotate(${(agle)}, ${x}, ${y})`); 
    }
  }

  class SVGCircle extends SVGElement {
    constructor(x, y, r) {
        super("circle");
        this.element.setAttributeNS(null, "cx", x);
        this.element.setAttributeNS(null, "cy", y);
        this.element.setAttributeNS(null, "r", r);
    }
  }

  class SVGLine extends SVGElement {
    constructor(x1, y1, x2, y2) {
        super("line");
        this.element.setAttributeNS(null, "x1", x1);
        this.element.setAttributeNS(null, "y1", y1);
        this.element.setAttributeNS(null, "x2", x2);
        this.element.setAttributeNS(null, "y2", y2);
    }
  }

  class SVGText extends SVGElement {
    constructor(x, y) {
        super("text");
        this.element.setAttributeNS(null, "x", x);
        this.element.setAttributeNS(null, "y", y);
    }

    addInnerHTML(content) {
        this.element.innerHTML = content;
    }
  }