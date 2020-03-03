class Gauge {
    constructor(parameters) {
        this.container = parameters.container;
        this.colors = parameters.colors;
        this.greycolor = parameters.greyColor;
        this.type = parameters.type;
        this.value = parameters.value;
        this.svgnamespace = "http://www.w3.org/2000/svg";
        this.circleradius = this.container.clientwidth / 2;
        this.thickness = 5;

        switch (this.type) {
            case 'full':
                this.container.classList.add(this.type + "-gauge");
                this.createfullgauge();
                break;

            case 'bottomless':
                this.container.classList.add(this.type + "-gauge");
                this.createbottomlessgauge();
                break;

            default:
                this.container.classList.add("full-gauge");
                this.createfullgauge();
                break;
        }
    }

    createbottomlessgauge() {
        var valuenumber = parseFloat(this.value);

        var svg = document.createElementNS(this.svgnamespace, "svg");
        svg.setattribute('xmlns', this.svgnamespace);
        svg.setattribute('width', this.circleradius * 2);
        svg.setattribute('height', this.circleradius * 2);
        svg.setattribute('viewbox', '0 0 ' + this.circleradius * 2 + ' ' + this.circleradius * 2);

        var alllimits = object.keys(this.colors).reduce(function (result, color) {
            result.push(this.colors[color][0]);
            result.push(this.colors[color][1]);
            return result;
        }, []).sort(function (a, b) {
            return a - b;
        });

        var minvalue = alllimits[0];
        var maxvalue = alllimits[alllimits.length - 1];
        let angle = (valuenumber - minvalue) * 270 / (maxvalue - minvalue);
        angle = isNaN(angle) ? 0 : angle;
        let metriccolor = this.greycolor;

        for (let color in this.colors) {
            if (valuenumber >= this.colors[color][0] && valuenumber <= this.colors[color][1]) {
                metriccolor = color;
                break;
            }
        }

        var pathgray = this.createsector(-135, 135, this.greycolor);
        var pathcolored = this.createsector(225, 225 + angle, metriccolor);
        var circle = this.createcircle();

        var textv = this.createtext(isNaN(valuenumber) ? 'â€“' : value, {
            x: this.circleradius,
            y: this.circleradius + 10
        }, "bottomless-gauge__value");

        var textmin = this.createtext(minvalue, {
            x: this.circleradius - this.circleradius / 2,
            y: this.circleradius * 2 - 9,
            alignmentbaseline: 'middle',
            color: this.greycolor
        }, "bottomless-gauge__limit");
        var textmax = this.createtext(maxvalue, {
            x: this.circleradius + this.circleradius / 2,
            y: this.circleradius * 2 - 9,
            alignmentbaseline: 'middle'
        }, "bottomless-gauge__limit");

        svg.appendchild(pathgray);
        svg.appendchild(pathcolored);
        svg.appendchild(circle);
        svg.appendchild(textv);
        svg.appendchild(textmin);
        svg.appendchild(textmax);

        this.container.appendchild(svg);
    }

    createcircle() {
        var circle = document.createElementNS(this.svgnamespace, "circle");
        circle.setattribute("cx", this.circleradius);
        circle.setattribute("cy", this.circleradius);
        circle.setattribute("r", this.circleradius - this.thickness);
        circle.setattribute("fill", 'white');

        return circle;
    }

    createtext(content, textparameters, classname) {
        var x = textparameters.x;
        var y = textparameters.y;
        var fontsize = textparameters.fontsize;
        var color = textparameters.color ? textparameters.color : '#6e6e6e';
        var text = document.createElementNS(this.svgnamespace, "text");
        text.setattribute("x", x);
        text.setattribute("y", y);
        if (textparameters.alignmentbaseline) {
            text.setattribute("alignment-baseline", textparameters.alignmentbaseline);
        }
        text.setattribute("text-anchor", 'middle');
        text.setattribute("color", color);
        text.textcontent = content;

        if ('classlist' in text) {
            text.classList.add(classname);
        } else {
            text.classname.baseval = classname;
        }

        //text.classList.add(classname);

        return text;
    }

    createsector(start_angle, end_angle, color) {
        var path = document.createElementNS(this.svgnamespace, "path");
        path.setattribute('fill', color);
        path.setattribute('stroke', 'none');
        path.setattribute('fill-rule', 'evenodd');
        path.setattribute('d', this.getsectordattribute(start_angle, end_angle));

        return path;
    }

    getsectordattribute(start_angle, end_angle) {
        var opts = {
            cx: this.circleradius,
            cy: this.circleradius,
            radius: this.circleradius,
            thickness: this.thickness,
            start_angle: start_angle,
            end_angle: end_angle
        };

        var start = this.polartocartesian(opts.cx, opts.cy, opts.radius, opts.end_angle);
        var end = this.polartocartesian(opts.cx, opts.cy, opts.radius, opts.start_angle);
        var largearcflag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1";

        var cutout_radius = opts.radius - opts.thickness,
            start2 = this.polartocartesian(opts.cx, opts.cy, cutout_radius, opts.end_angle),
            end2 = this.polartocartesian(opts.cx, opts.cy, cutout_radius, opts.start_angle);

        return [
            "m", start.x, start.y,
            "a", opts.radius, opts.radius, 0, largearcflag, 0, end.x, end.y,
            "l", opts.cx, opts.cy,
            "z",

            "m", start2.x, start2.y,
            "a", cutout_radius, cutout_radius, 0, largearcflag, 0, end2.x, end2.y,
            "l", opts.cx, opts.cy,
            "z"
        ].join(" ");
    }

    polartocartesian(centerx, centery, radius, angleindegrees) {
        var angleinradians = (angleindegrees - 90) * math.PI / 180.0;

        return {
            x: centerx + (radius * math.cos(angleinradians)),
            y: centery + (radius * math.sin(angleinradians))
        };
    }

    createfullgauge(e) {
        var valuenumber = parseFloat(this.value);
        var angle = (valuenumber / 100 * 180) * 2 + 90;
        let metriccolor = this.greycolor;
        for (let color in this.colors) {
            if (valuenumber >= this.colors[color][0] && valuenumber <= this.colors[color][1]) {
                metriccolor = color;
                break;
            }
        }

        var outercirclediv = document.createElement('div');
        outercirclediv.classList.add('full-gauge__outer-circle');
        outercirclediv.style.background = (angle > 270
            ? 'linear-gradient(-90deg, ' + metriccolor + ' 50%, transparent 50%), '
            : 'linear-gradient(90deg, ' + this.greycolor + ' 50%, transparent 50%), ')
            + 'linear-gradient(' + angle + 'deg, transparent 50%, ' + this.greycolor + ' 50%), ' + metriccolor;

        var innercirclediv = document.createElement('div');
        innercirclediv.classList.add('full-gauge__inner-circle');

        var scorediv = document.createElement('div');
        scorediv.classList.add('full-gauge__score');
        scorediv.innerText = isNaN(valuenumber) ? 'â€“' : valuenumber;

        this.container.appendChild(outercirclediv);
        this.container.appendChild(innercirclediv);
        this.container.appendChild(scorediv);
    }
}

export default Gauge;