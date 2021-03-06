import * as puppeteer from 'puppeteer'
import * as path from 'path';
import * as fs from 'fs';
export class PuppeteerService {
    started: boolean = false;
    browser = null;
    constructor() {
        this.init();
    }
    async init() {
        try {
            this.browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-web-security'] });
            this.started = true;
            this.browser.newPage()
            console.log('puppeteer started');
        }
        catch (e) { console.log(e) }
    }
    async createImage(finalWaypoints: number[][], size: Size, weight: number, color: string, time: number) {
        if (this.started) {
            try {
                const page = await this.browser.newPage();
                page.on('console', msg => console.log('PAGE LOG:', msg.text()))
                await page.addScriptTag({
                    path: "dist/image-rendering/leaflet-image.js"
                })
                await page.addScriptTag({
                    path: "dist/image-rendering/leaflet-src.js"
                })
                await page.setContent(this.createHTML(size), { waitUntil: 'networkidle2' });
                await page.evaluate(({ finalWaypoints, color, weight }) => {
                    //@ts-ignore
                    //var bwLayer = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', { renderer: L.canvas() });
                    let loadBalancer = ['a', 'b', 'c'];
                    let loadBalancerSelector = Math.floor(Math.random() * 3)
                    //@ts-ignore
                    var bwLayer = L.tileLayer('https://' + loadBalancer[loadBalancerSelector] + '.tile.opentopomap.org/{z}/{x}/{y}.png', { renderer: L.canvas() });
                    //@ts-ignore
                    var latlngs = finalWaypoints;
                    //@ts-ignore
                    var polyline = L.polyline(latlngs, { color: color, weight: weight })
                    // zoom the map to the polyline
                    //@ts-ignore
                    var mymap = L.map('mapid', {
                        zoom: 10,
                        layers: [polyline, bwLayer],
                        preferCanvas: true
                    }).setView([51.505, -0.09], 13);

                    mymap.fitBounds(polyline.getBounds());

                    var baseMaps = {
                        "Map": bwLayer,
                    };

                    var overlayMaps = {
                        "GPS Track": polyline
                    };
                    //@ts-ignore
                    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
                    //@ts-ignore
                    leafletImage(mymap, function (err, canvas) {
                        // now you have canvas
                        // example thing to do with that canvas:
                        var img = document.createElement('img');
                        var dimensions = mymap.getSize();
                        img.width = dimensions.x;
                        img.height = dimensions.y;
                        img.src = canvas.toDataURL();
                        img.id = 'createdImage';
                        document.getElementById('images').innerHTML = '';
                        document.getElementById('images').appendChild(img);
                    });
                }, { finalWaypoints, color, weight });
                await page.waitFor('#createdImage');
                await page.screenshot({ path: 'dist/tmp/created_image_' + time + '.png', clip: { width: size.width, height: size.height, x: 0, y: 0 } });
                await page.close()
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            console.warn('Puppeteer not started');
        }
    }
    createHTML(size: Size): string {
        let html: string = `
        <head>
<script>L_PREFER_CANVAS = true; </script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
crossorigin=""/>
<style>html, body { height: 100%; margin: 0px;}
        #mapid { height: ` + size.height + `px; width: ` + size.width + `px;}
</style>
</head>

<body>
    <div id="images"></div>
    <br />
	<div id="mapid"></div>

</body>
`
        return html;
    }
}