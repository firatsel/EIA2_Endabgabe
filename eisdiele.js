"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    // Fügt einen Event-Listener hinzu, der die Funktion `handleLoad` aufruft, wenn die Seite geladen wird
    window.addEventListener("load", handleLoad);
    // Arrays zur Speicherung von Stühlen, Tischen, Bestellungen und beweglichen Objekten
    EIA2_Endabgabe.moveables = [];
    EIA2_Endabgabe.chairs = [];
    EIA2_Endabgabe.tables = [];
    EIA2_Endabgabe.order = [];
    // Funktion, die beim Laden der Seite aufgerufen wird
    function handleLoad() {
        // Sucht das Canvas-Element im DOM
        let canvas = document.querySelector("canvas");
        // Überprüft, ob das Canvas-Element vorhanden ist
        if (!canvas) {
            console.error("Canvas not found!");
            return;
        }
        // Ruft den 2D-Zeichen-Kontext des Canvas ab
        EIA2_Endabgabe.crc2 = canvas.getContext("2d");
        // Setzt die Canvas-Größe auf die Fenstergröße
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Zeichnet Hintergrund und verschiedene Boxen
        drawBackground();
        drawBoxTablet();
        EIA2_Endabgabe.drawFlavor();
        EIA2_Endabgabe.drawTopping();
        EIA2_Endabgabe.drawWaffle();
        // Erstellt Stühle und fügt sie zum Stuhl-Array hinzu
        EIA2_Endabgabe.chairs.push(new EIA2_Endabgabe.Chair(80));
        EIA2_Endabgabe.chairs.push(new EIA2_Endabgabe.Chair(950));
        EIA2_Endabgabe.chairs.push(new EIA2_Endabgabe.Chair(1400));
        // Erstellt Tische und fügt sie zum Tisch-Array hinzu
        EIA2_Endabgabe.tables.push(new EIA2_Endabgabe.Table(345));
        EIA2_Endabgabe.tables.push(new EIA2_Endabgabe.Table(1200));
        EIA2_Endabgabe.tables.push(new EIA2_Endabgabe.Table(1680));
        // Erstellt Bestellungen und fügt sie zum Bestell-Array hinzu
        EIA2_Endabgabe.order.push(new EIA2_Endabgabe.Order(75));
        EIA2_Endabgabe.order.push(new EIA2_Endabgabe.Order(940));
        EIA2_Endabgabe.order.push(new EIA2_Endabgabe.Order(1410));
        // Zeichnet alle Stühle, Tische und Bestellungen
        for (let chair of EIA2_Endabgabe.chairs) {
            chair.drawChair();
        }
        for (let table of EIA2_Endabgabe.tables) {
            table.drawTable();
        }
        for (let orders of EIA2_Endabgabe.order) {
            orders.drawOrder();
        }
        // Fügt einen Event-Listener für Klicks auf das Canvas hinzu
        canvas.addEventListener("click", EIA2_Endabgabe.handleCustomerClick);
    }
    EIA2_Endabgabe.handleLoad = handleLoad;
    // Funktion zum Zeichnen des Hintergrunds
    function drawBackground() {
        // Wand
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
        // Tür 
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#6B502C";
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
        // Flur
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#CBCCCC";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.rect(20, 300, 1840, 400);
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.restore();
        // Theke 
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
        // Boxen für Toppings
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
        // Boxen für Geschmacksrichtungen 
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