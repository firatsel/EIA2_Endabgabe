"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    window.addEventListener("load", handleLoad);
    EIA2_Endabgabe.moveables = [];
    EIA2_Endabgabe.chairs = [];
    EIA2_Endabgabe.tables = [];
    EIA2_Endabgabe.order = [];
    let imgData;
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        if (!canvas) {
            console.error("Canvas not found!");
            return;
        }
        EIA2_Endabgabe.crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawBackground();
        drawBoxTablet();
        EIA2_Endabgabe.drawFlavor();
        EIA2_Endabgabe.drawTopping();
        EIA2_Endabgabe.drawWaffle();
        imgData = EIA2_Endabgabe.crc2.getImageData(0, 0, EIA2_Endabgabe.crc2.canvas.width, EIA2_Endabgabe.crc2.canvas.height);
        EIA2_Endabgabe.chairs.push(new EIA2_Endabgabe.Chair(80));
        EIA2_Endabgabe.chairs.push(new EIA2_Endabgabe.Chair(990));
        EIA2_Endabgabe.chairs.push(new EIA2_Endabgabe.Chair(1500));
        EIA2_Endabgabe.tables.push(new EIA2_Endabgabe.Table(345));
        EIA2_Endabgabe.tables.push(new EIA2_Endabgabe.Table(1200));
        EIA2_Endabgabe.tables.push(new EIA2_Endabgabe.Table(1680));
        EIA2_Endabgabe.order.push(new EIA2_Endabgabe.Order(75));
        EIA2_Endabgabe.order.push(new EIA2_Endabgabe.Order(940));
        EIA2_Endabgabe.order.push(new EIA2_Endabgabe.Order(1410));
        for (let chair of EIA2_Endabgabe.chairs) {
            chair.drawChair();
        }
        for (let table of EIA2_Endabgabe.tables) {
            table.drawTable();
        }
        for (let orders of EIA2_Endabgabe.order) {
            orders.drawOrder();
        }
        // Add the event listener only after the canvas is initialized
        canvas.addEventListener("click", EIA2_Endabgabe.handleCustomerClick);
    }
    EIA2_Endabgabe.handleLoad = handleLoad;
    //DRAW-FUNCTIONS
    function drawBackground() {
        // WALL
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#6DC9B2";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(20, 20, 1840, 700);
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.restore();
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#018CCD";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(20, 170, 1840, 400);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#00A8AB";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(20, 170, 1840, 10);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
        // DOOR 
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#C3D8E6";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(500, 20, 400, 400);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#ADC2E6";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(500, 20, 10, 300);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#ADC2E6";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(900, 20, 10, 300);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
        // FLOOR
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#CBCCCC";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(20, 300, 1840, 400);
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.restore();
        // COUNTER 
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#BB8D44";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(20, 450, 1840, 370);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#9E5524";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(20, 440, 1840, 30);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
        // BOX TOPPING
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#9E5524";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(800, 660, 150, 140);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#9E5524";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(800, 500, 150, 140);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
        // BOX FLAVOR 
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#9E5524";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(1400, 500, 150, 300);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#9E5524";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(1200, 500, 150, 300);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#9E5524";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(1000, 500, 150, 300);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
    }
    function drawBoxTablet() {
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#EBEBE4";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(400, 500, 300, 180);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
    }
    EIA2_Endabgabe.drawBoxTablet = drawBoxTablet;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=eisdiele.js.map