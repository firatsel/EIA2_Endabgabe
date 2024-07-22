"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    // Definition der Boxen für Geschmacksrichtungen mit Preisen
    EIA2_Endabgabe.flavorBoxes = [
        { x: 1410, y: 510, width: 130, height: 140, fillStyle: "#856130", label: "Schokolade", textareaId: 'box10', isTopHalf: true, price: 1 },
        { x: 1410, y: 650, width: 130, height: 140, fillStyle: "#856130", label: "Schokolade", textareaId: 'box11', isTopHalf: false, price: 1 },
        { x: 1210, y: 510, width: 130, height: 140, fillStyle: "#FF9588", label: "Erdbeere", textareaId: 'box10', isTopHalf: true, price: 1 },
        { x: 1210, y: 650, width: 130, height: 140, fillStyle: "#FF9588", label: "Erdbeere", textareaId: 'box11', isTopHalf: false, price: 1 },
        { x: 1010, y: 510, width: 130, height: 140, fillStyle: "#F5E783", label: "Mango", textareaId: 'box10', isTopHalf: true, price: 1 },
        { x: 1010, y: 650, width: 130, height: 140, fillStyle: "#F5E783", label: "Mango", textareaId: 'box11', isTopHalf: false, price: 1 }
    ];
    // Definition der Boxen für Toppings mit Preisen
    EIA2_Endabgabe.toppingBoxes = [
        { x: 875, y: 570, width: 20, height: 20, fillStyle: "#CE2D1E", label: "Kirsche", textareaId: 'box12', isTopHalf: true, price: 0.5 },
        { x: 875, y: 700, width: 10, height: 60, fillStyle: "#ffffff", label: "Streusel", textareaId: 'box12', isTopHalf: true, price: 0.2 }
    ];
    // Funktion zum Zeichnen der Geschmacksrichtung-Boxen auf der Leinwand
    function drawFlavor() {
        let canvas = document.querySelector("canvas");
        EIA2_Endabgabe.crc2 = canvas.getContext("2d");
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.flavorBoxes.forEach(box => {
            EIA2_Endabgabe.crc2.fillStyle = box.fillStyle; // Setzt die Füllfarbe entsprechend der Box
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.rect(box.x, box.y, box.width, box.height); // Zeichnet das Rechteck für die Box
            EIA2_Endabgabe.crc2.fill(); // Füllt die Box mit der Füllfarbe
        });
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
        // Fügt einen Event-Listener für Klicks auf die Leinwand hinzu
        document.addEventListener('click', (event) => {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left; // X-Position des Klicks auf der Leinwand
            let y = event.clientY - rect.top; // Y-Position des Klicks auf der Leinwand
            EIA2_Endabgabe.flavorBoxes.forEach((box) => {
                // Überprüft, ob der Klick innerhalb der Box liegt
                if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
                    // Wenn der Klick in der oberen Hälfte der Box liegt
                    if (box.isTopHalf && y <= box.y + box.height / 2) {
                        updateTextArea(box.textareaId, box.label); // Aktualisiert das Textarea mit dem Label der Box
                    }
                    else if (!box.isTopHalf && y > box.y + box.height / 2) {
                        updateTextArea(box.textareaId, box.label); // Aktualisiert das Textarea mit dem Label der Box
                    }
                }
            });
        });
    }
    EIA2_Endabgabe.drawFlavor = drawFlavor;
    // Funktion zum Zeichnen der Topping-Boxen auf der Leinwand
    function drawTopping() {
        let canvas = document.querySelector("canvas");
        EIA2_Endabgabe.crc2 = canvas.getContext("2d");
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.toppingBoxes.forEach(box => {
            EIA2_Endabgabe.crc2.fillStyle = box.fillStyle; // Setzt die Füllfarbe entsprechend der Box
            if (box.width === 10) {
                EIA2_Endabgabe.crc2.rect(box.x, box.y, box.width, box.height); // Zeichnet das Rechteck für Toppings
            }
            if (box.width === 20) {
                EIA2_Endabgabe.crc2.ellipse(box.x, box.y, 10, 10, 0, 0, 2 * Math.PI); // Zeichnet den Kreis für Toppings
            }
            EIA2_Endabgabe.crc2.fill(); // Füllt die Box mit der Füllfarbe
        });
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
        // Fügt einen Event-Listener für Klicks auf die Leinwand hinzu
        document.addEventListener('click', (event) => {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left; // X-Position des Klicks auf der Leinwand
            let y = event.clientY - rect.top; // Y-Position des Klicks auf der Leinwand
            EIA2_Endabgabe.toppingBoxes.forEach((box) => {
                // Überprüft, ob der Klick innerhalb der Box liegt
                if (box.width === 10) {
                    if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
                        updateTextArea(box.textareaId, box.label); // Aktualisiert das Textarea mit dem Label der Box
                    }
                }
                else {
                    if (x >= box.x - 10 && x <= box.x + 10 && y >= box.y - 10 && y <= box.y + 10) {
                        updateTextArea(box.textareaId, box.label); // Aktualisiert das Textarea mit dem Label der Box
                    }
                }
            });
        });
    }
    EIA2_Endabgabe.drawTopping = drawTopping;
    // Funktion zum Aktualisieren des Textarea mit dem Label der Box
    function updateTextArea(textareaId, label) {
        let textarea = document.getElementById(textareaId);
        if (textarea) {
            textarea.value = label; // Setzt den Wert des Textareas auf das Label
        }
    }
    // Funktion zum Zeichnen der Waffel auf der Leinwand
    function drawWaffle() {
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#B88742"; // Füllfarbe für die Waffel
        EIA2_Endabgabe.crc2.moveTo(550, 660); // Startpunkt des Waffeldreiecks
        EIA2_Endabgabe.crc2.lineTo(570, 570); // Linie zum nächsten Punkt
        EIA2_Endabgabe.crc2.lineTo(530, 570); // Linie zum nächsten Punkt
        EIA2_Endabgabe.crc2.fill(); // Füllt die Waffelform
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
    }
    EIA2_Endabgabe.drawWaffle = drawWaffle;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=assortment.js.map