"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    // Liste, um alle Kunden zu speichern
    EIA2_Endabgabe.customers = [];
    // Definiere Stuhlpositionen auf der Leinwand
    EIA2_Endabgabe.chairPositions = [
        { x: 150, y: 220 },
        { x: 1020, y: 220 },
        { x: 1470, y: 220 }
    ];
    // Überprüft, ob sich zwei Kreise überlappen
    function doCirclesOverlap(x1, y1, r1, x2, y2, r2) {
        const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return dist < r1 + r2;
    }
    // Gibt eine zufällige Position für einen neuen Kunden zurück, wenn sie gültig ist
    function getRandomCustomerPosition() {
        const maxAttempts = 100;
        let attempts = 0;
        while (attempts < maxAttempts) {
            let x = 600 + Math.random() * 160;
            let y = 90 + Math.random() * 150;
            let position = { x, y };
            let isValidPosition = true;
            for (let customer of EIA2_Endabgabe.customers) {
                if (doCirclesOverlap(x, y, 60, customer.position.x, customer.position.y, customer.radius)) {
                    isValidPosition = false;
                    break;
                }
            }
            if (isValidPosition) {
                return position;
            }
            attempts++;
        }
        return null; // Keine gültige Position gefunden
    }
    EIA2_Endabgabe.getRandomCustomerPosition = getRandomCustomerPosition;
    // Zeichnet einen Kunden auf der Leinwand
    function drawCustomer(customer) {
        const { x, y } = customer.position;
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#BECF21";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.ellipse(x, y, customer.radius - 5, customer.radius - 5, 0, 0, 2 * Math.PI);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#FFFFFF";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.ellipse(x, y - 10, 30, 30, 0, 0, 2 * Math.PI);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#00A8AB";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.ellipse(x, y - 10, 16, 16, 0, 0, 2 * Math.PI);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#37463C";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.ellipse(x, y - 10, 10, 10, 0, 0, 2 * Math.PI);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
    }
    EIA2_Endabgabe.drawCustomer = drawCustomer;
    // Erzeugt einen neuen Kunden alle 2 Sekunden
    function spawnCustomer() {
        setInterval(() => {
            let position = getRandomCustomerPosition();
            if (position) {
                let customer = { position, radius: 60 }; // Radius des Kunden
                EIA2_Endabgabe.customers.push(customer);
                drawCustomer(customer);
                // Timer zum Entfernen des Kunden nach 15 Sekunden
                customer.timerId = window.setTimeout(() => {
                    removeCustomer(customer);
                }, 15000);
            }
            else {
                console.log("Keine gültige Position für einen neuen Kunden gefunden.");
            }
        }, 5000); // Alle 5 Sekunden
    }
    EIA2_Endabgabe.spawnCustomer = spawnCustomer;
    // Verarbeitet einen Klick auf einen Kunden
    function handleCustomerClick(event) {
        const { offsetX, offsetY } = event;
        for (let customer of EIA2_Endabgabe.customers) {
            const dist = Math.sqrt((offsetX - customer.position.x) ** 2 + (offsetY - customer.position.y) ** 2);
            if (dist < customer.radius) {
                let newPosition = getFreeChairPosition();
                if (newPosition) {
                    clearTimeout(customer.timerId); // Timer für die Entfernung löschen
                    moveCustomer(customer, newPosition);
                    EIA2_Endabgabe.setCurrentCustomer(customer); // Setze den aktuellen Kunden
                    EIA2_Endabgabe.spawnOrder(newPosition); // Bestellvorgang starten
                }
                break;
            }
        }
    }
    EIA2_Endabgabe.handleCustomerClick = handleCustomerClick;
    // Gibt die Farbe eines Pixels an der gegebenen Position zurück
    function getPixelColor(x, y) {
        const pixel = EIA2_Endabgabe.crc2.getImageData(x, y, 1, 1).data;
        const rgb = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase()}`;
        return rgb;
    }
    // Gibt eine freie Stuhlposition zurück, falls vorhanden
    function getFreeChairPosition() {
        for (let pos of EIA2_Endabgabe.chairPositions) {
            const chairColor = getPixelColor(pos.x, pos.y);
            if (chairColor === "#6B502C" && !EIA2_Endabgabe.customers.some(customer => customer.position.x === pos.x && customer.position.y === pos.y)) {
                return pos;
            }
        }
        return null; // Kein freier Stuhl gefunden
    }
    EIA2_Endabgabe.getFreeChairPosition = getFreeChairPosition;
    // Bewegt einen Kunden zu einer neuen Position
    function moveCustomer(customer, newPosition) {
        // Alte Position des Kunden auf Hintergrundfarbe setzen
        if (customer.removaltimerId) {
            clearTimeout(customer.removaltimerId);
        }
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.fillStyle = "#6B502C"; // Hintergrundfarbe
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.arc(customer.position.x, customer.position.y, customer.radius + 1, 0, 2 * Math.PI);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.restore();
        EIA2_Endabgabe.customers = EIA2_Endabgabe.customers.filter(c => c !== customer);
        // Kundenposition aktualisieren und neu zeichnen
        customer.position = newPosition;
        drawCustomer(customer);
        customer.removaltimerId_essen = window.setTimeout(() => {
            EIA2_Endabgabe.crc2.save();
            EIA2_Endabgabe.crc2.fillStyle = "#FF0000"; // Rot
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.arc(customer.position.x, customer.position.y, customer.radius - 5, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "#FFFFFF";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.ellipse(customer.position.x, customer.position.y - 10, 30, 30, 0, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "#00A8AB";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.ellipse(customer.position.x, customer.position.y - 10, 16, 16, 0, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "#37463C";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.ellipse(customer.position.x, customer.position.y - 10, 10, 10, 0, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.restore();
        }, 10000); // 10 Sekunden
    }
    EIA2_Endabgabe.moveCustomer = moveCustomer;
    // Entfernt einen Kunden und färbt ihn rot
    function removeCustomer(customer) {
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.fillStyle = "#FF0000"; // Rot
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.arc(customer.position.x, customer.position.y, customer.radius - 5, 0, 2 * Math.PI);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#FFFFFF";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.ellipse(customer.position.x, customer.position.y - 10, 30, 30, 0, 0, 2 * Math.PI);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#00A8AB";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.ellipse(customer.position.x, customer.position.y - 10, 16, 16, 0, 0, 2 * Math.PI);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.fillStyle = "#37463C";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.ellipse(customer.position.x, customer.position.y - 10, 10, 10, 0, 0, 2 * Math.PI);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.restore();
        // Entferne den Kunden nach 5 Sekunden
        customer.removaltimerId = window.setTimeout(() => {
            EIA2_Endabgabe.crc2.save();
            EIA2_Endabgabe.crc2.fillStyle = "#6B502C"; // Hintergrundfarbe
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.arc(customer.position.x, customer.position.y, customer.radius + 1, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.restore();
            // Entferne den Kunden aus der Liste
            EIA2_Endabgabe.customers = EIA2_Endabgabe.customers.filter(c => c !== customer);
            incrementLostCounter(); // Erhöhe den Zähler für verlorene Kunden
        }, 5000); // 5 Sekunden
    }
    EIA2_Endabgabe.removeCustomer = removeCustomer;
    // Erhöht den Zähler für verlorene Kunden
    function incrementLostCounter() {
        const lostTextarea = document.getElementById("lost");
        let currentCount = parseInt(lostTextarea.value) || 0;
        lostTextarea.value = (currentCount + 1).toString();
    }
    EIA2_Endabgabe.incrementLostCounter = incrementLostCounter;
    // Startet das regelmäßige Erscheinen der Kunden
    spawnCustomer();
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=customer.js.map