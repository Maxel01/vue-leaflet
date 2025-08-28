/*!
 (c) 2017, iosphere GmbH
 Leaflet.hotline, a Leaflet plugin for drawing gradients along polylines.
 https://github.com/iosphere/Leaflet.hotline/
*/

import {Canvas, LatLng, LineUtil, Polyline} from 'leaflet';

class HotlineElement {

    /**
     * Core renderer.
     * @constructor
     * @param {HTMLElement | string} canvas - &lt;canvas> element or its id
     * to initialize the instance on.
     */
    constructor(canvas) {
        this._canvas = canvas = typeof canvas === 'string'
            ? document.getElementById(canvas)
            : canvas;

        this._ctx = canvas.getContext('2d');
        this._width = canvas.width;
        this._height = canvas.height;

        this._weight = 5;
        this._outlineWidth = 1;
        this._outlineColor = 'black';

        this._min = 0;
        this._max = 1;

        this._data = [];

        this.palette({
            0.0: 'green',
            0.5: 'yellow',
            1.0: 'red'
        });
    }

    /**
     * Sets the width of the canvas. Used when clearing the canvas.
     * @param {number} width - Width of the canvas.
     */
    width(width) {
        this._width = width;
        return this;
    }

    /**
     * Sets the height of the canvas. Used when clearing the canvas.
     * @param {number} height - Height of the canvas.
     */
    height(height) {
        this._height = height;
        return this;
    }

    /**
     * Sets the weight of the path.
     * @param {number} weight - Weight of the path in px.
     */
    weight(weight) {
        this._weight = weight;
        return this;
    }

    /**
     * Sets the width of the outline around the path.
     * @param {number} outlineWidth - Width of the outline in px.
     */
    outlineWidth(outlineWidth) {
        this._outlineWidth = outlineWidth;
        return this;
    }

    /**
     * Sets the color of the outline around the path.
     * @param {string} outlineColor - A CSS color value.
     */
    outlineColor(outlineColor) {
        this._outlineColor = outlineColor;
        return this;
    }

    /**
     * Sets the palette gradient.
     * @param {Object.<number, string>} palette  - Gradient definition.
     * e.g. { 0.0: 'white', 1.0: 'black' }
     */
    palette(palette) {
        const canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);

        canvas.width = 1;
        canvas.height = 256;

        for (let i in palette) {
            gradient.addColorStop(i, palette[i]);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        this._palette = ctx.getImageData(0, 0, 1, 256).data;

        return this;
    }

    /**
     * Sets the value used at the start of the palette gradient.
     * @param {number} min
     */
    min(min) {
        this._min = min;
        return this;
    }

    /**
     * Sets the value used at the end of the palette gradient.
     * @param {number} max
     */
    max(max) {
        this._max = max;
        return this;
    }

    /**
     * A path to rander as a hotline.
     * @typedef Array.<{x:number, y:number, z:number}> Path - Array of x, y and z coordinates.
     */

    /**
     * Sets the data that gets drawn on the canvas.
     * @param {(Path|Path[])} data - A single path or an array of paths.
     */
    data(data) {
        this._data = data;
        return this;
    }

    /**
     * Adds a path to the list of paths.
     * @param {Path} path
     */
    add(path) {
        this._data.push(path);
        return this;
    }

    /**
     * Draws the currently set paths.
     */
    draw() {
        const ctx = this._ctx;

        ctx.globalCompositeOperation = 'source-over';
        ctx.lineCap = 'round';

        this._drawOutline(ctx);
        this._drawHotline(ctx);

        return this;
    }

    /**
     * Gets the RGB values of a given z value of the current palette.
     * @param {number} value - Value to get the color for, should be between min and max.
     * @returns {Array.<number>} The RGB values as an array [r, g, b]
     */
    getRGBForValue(value) {
        const valueRelative = Math.min(Math.max((value - this._min) / (this._max - this._min), 0), 0.999);
        const paletteIndex = Math.floor(valueRelative * 256) * 4;

        return [
            this._palette[paletteIndex],
            this._palette[paletteIndex + 1],
            this._palette[paletteIndex + 2]
        ];
    }

    /**
     * Draws the outline of the graphs.
     * @private
     */
    _drawOutline(ctx) {
        let i, j, dataLength, path, pathLength, pointStart, pointEnd;

        if (this._outlineWidth) {
            for (i = 0, dataLength = this._data.length; i < dataLength; i++) {
                path = this._data[i];
                ctx.lineWidth = this._weight + 2 * this._outlineWidth;

                for (j = 1, pathLength = path.length; j < pathLength; j++) {
                    pointStart = path[j - 1];
                    pointEnd = path[j];

                    ctx.strokeStyle = this._outlineColor;
                    ctx.beginPath();
                    ctx.moveTo(pointStart.x, pointStart.y);
                    ctx.lineTo(pointEnd.x, pointEnd.y);
                    ctx.stroke();
                }
            }
        }
    }

    /**
     * Draws the color encoded hotline of the graphs.
     * @private
     */
    _drawHotline(ctx) {
        let i, j, dataLength, path, pathLength, pointStart, pointEnd,
            gradient, gradientStartRGB, gradientEndRGB;

        ctx.lineWidth = this._weight;

        for (i = 0, dataLength = this._data.length; i < dataLength; i++) {
            path = this._data[i];

            for (j = 1, pathLength = path.length; j < pathLength; j++) {
                pointStart = path[j - 1];
                pointEnd = path[j];

                // Create a gradient for each segment, pick start end end colors from palette gradient
                gradient = ctx.createLinearGradient(pointStart.x, pointStart.y, pointEnd.x, pointEnd.y);
                gradientStartRGB = this.getRGBForValue(pointStart.z);
                gradientEndRGB = this.getRGBForValue(pointEnd.z);
                gradient.addColorStop(0, 'rgb(' + gradientStartRGB.join(',') + ')');
                gradient.addColorStop(1, 'rgb(' + gradientEndRGB.join(',') + ')');

                ctx.strokeStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(pointStart.x, pointStart.y);
                ctx.lineTo(pointEnd.x, pointEnd.y);
                ctx.stroke();
            }
        }
    }
}

class Renderer extends Canvas {

    constructor(...args) {
        super(...args);
        this._hotline = null;
    }

    _initContainer() {
        super._initContainer();
        this._hotline = new HotlineElement(this._container);
    }

    _update() {
        super._update();
        this._hotline.width(this._container.width);
        this._hotline.height(this._container.height);
    }

    _updatePoly(layer) {
        if (!this._drawing) {
            return;
        }

        const parts = layer._parts;
        if (!parts.length) { return; }

        this._updateOptions(layer);

        this._hotline
            .data(parts)
            .draw();
    }

    _updateOptions(layer) {
        if (layer.options.min != null) {
            this._hotline.min(layer.options.min);
        }
        if (layer.options.max != null) {
            this._hotline.max(layer.options.max);
        }
        if (layer.options.weight != null) {
            this._hotline.weight(layer.options.weight);
        }
        if (layer.options.outlineWidth != null) {
            this._hotline.outlineWidth(layer.options.outlineWidth);
        }
        if (layer.options.outlineColor != null) {
            this._hotline.outlineColor(layer.options.outlineColor);
        }
        if (layer.options.palette) {
            this._hotline.palette(layer.options.palette);
        }
    }
}

const renderer = function (options) {
    //return Browser.canvas ? new Renderer(options) : null;
    return new Renderer(options)
}


var Util = {
    /**
     * This is just a copy of the original Leaflet version that support a third z coordinate.
     * @see {@link http://leafletjs.com/reference.html#lineutil-clipsegment|Leaflet}
     */
    clipSegment: function (a, b, bounds, useLastCode, round) {
        let codeA = useLastCode ? this._lastCode : LineUtil._getBitCode(a, bounds),
            codeB = LineUtil._getBitCode(b, bounds),

            codeOut, p, newCode;

        // save 2nd code to avoid calculating it on the next segment
        this._lastCode = codeB;

        while (true) {
            // if a,b is inside the clip window (trivial accept)
            if (!(codeA | codeB)) {
                return [a, b];
            }

            // if a,b is outside the clip window (trivial reject)
            if (codeA & codeB) {
                return false;
            }

            // other cases
            codeOut = codeA || codeB;
            p = LineUtil._getEdgeIntersection(a, b, codeOut, bounds, round);
            newCode = LineUtil._getBitCode(p, bounds);

            if (codeOut === codeA) {
                p.z = a.z;
                a = p;
                codeA = newCode;
            } else {
                p.z = b.z;
                b = p;
                codeB = newCode;
            }
        }
    }
};

export class Hotline extends Polyline {

    constructor(latlngs, options = {}) {
        super(latlngs, {
            renderer: renderer(),
            min: 0,
            max: 1,
            palette: {
                0.0: 'green',
                0.5: 'yellow',
                1.0: 'red'
            },
            weight: 5,
            outlineColor: 'black',
            outlineWidth: 1,
            ...options
        });
    }

    getRGBForValue(value) {
        return this._renderer._hotline.getRGBForValue(value);
    }

    /**
     * Just like the Leaflet version, but with support for a z coordinate.
     */
    _projectLatlngs(latlngs, result, projectedBounds) {
        const flat = latlngs[0] instanceof LatLng;

        if (flat) {
            const ring = latlngs.map(latlng => {
                const point = this._map.latLngToLayerPoint(latlng)
                point.z = latlng.alt;
                return point
            })
            result.push(ring);
        } else {
            latlngs.forEach(latlng => this._projectLatlngs(latlng, result, projectedBounds));
        }
    }

    /**
     * Just like the Leaflet version, but uses `Util.clipSegment()`.
     */
    _clipPoints() {
        if (this.options.noClip) {
            this._parts = this._rings;
            return;
        }

        this._parts = [];

        const parts = this._parts,
            bounds = this._renderer._bounds;
        let i, j, k, len, len2, segment, points;

        for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
            points = this._rings[i];

            for (j = 0, len2 = points.length; j < len2 - 1; j++) {
                segment = Util.clipSegment(points[j], points[j + 1], bounds, j, true);

                if (!segment) {
                    continue;
                }

                parts[k] = parts[k] || [];
                parts[k].push(segment[0]);

                // if segment goes out of screen, or it's the last one, it's the end of the line part
                if ((segment[1] !== points[j + 1]) || (j === len2 - 2)) {
                    parts[k].push(segment[1]);
                    k++;
                }
            }
        }
    }

    _clickTolerance() {
        //return this.options.weight / 2 + this.options.outlineWidth + (Browser.touch ? 10 : 0);
        return this.options.weight / 2 + this.options.outlineWidth + 10;
    }
}

