"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    // Klasse Order repräsentiert eine Bestellung und ihre Position auf der Leinwand
    class Order {
        positionX; // X-Position der Bestellung
        constructor(_positionX) {
            this.positionX = _positionX;
        }
        // Zeichnet die Bestellung auf der Leinwand
        drawOrder() {
            EIA2_Endabgabe.crc2.save();
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.fillStyle = "#EBEBE4"; // Hintergrundfarbe der Bestellung
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.rect(this.positionX, 40, 160, 100); // Rechteck für Bestellung
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.closePath();
            EIA2_Endabgabe.crc2.restore();
        }
    }
    EIA2_Endabgabe.Order = Order;
    // Aktueller Kunde, der gerade bedient wird
    let currentCustomer;
    // Setzt den aktuellen Kunden
    function setCurrentCustomer(customer) {
        currentCustomer = customer;
    }
    EIA2_Endabgabe.setCurrentCustomer = setCurrentCustomer;
    // Gibt den aktuellen Kunden zurück
    function getCurrentCustomer() {
        return currentCustomer;
    }
    EIA2_Endabgabe.getCurrentCustomer = getCurrentCustomer;
    // Erzeugt eine neue Bestellung und aktualisiert die Anzeige
    function spawnOrder(newPosition) {
        // Auswahl von zwei zufälligen Geschmacksrichtungen und einem Topping
        let flavor = ["Mango", "Erdbeere", "Schokolade"];
        let topping = ["Kirsche", "Streusel"];
        let [flavor1, flavor2] = flavor.sort(() => 0.5 - Math.random()).slice(0, 2);
        // Behandelt die Bestellung je nach Position des Kunden
        if (newPosition.x == 150) {
            // Elementreferenzen für die erste Box
            let textarea1 = document.getElementById('box1');
            let textarea2 = document.getElementById('box2');
            let textarea3 = document.getElementById('box3');
            let mood1 = document.getElementById('mood1');
            let box1_anzahl = document.getElementById('box1_anzahl');
            let box2_anzahl = document.getElementById('box2_anzahl');
            // Setzt die Werte für die erste Box
            textarea1.value = flavor1;
            textarea2.value = flavor2;
            textarea3.value = topping[Math.floor(Math.random() * 2)];
            box1_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();
            box2_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();
            mood1.value = "wartend"; // Setzt den anfänglichen Stimmungstext und die Farbe
            mood1.style.color = "#F5A02C";
        }
        if (newPosition.x == 1020) {
            // Ähnliche Logik wie oben für die zweite Box
            let textarea4 = document.getElementById('box4');
            let textarea5 = document.getElementById('box5');
            let textarea6 = document.getElementById('box6');
            let mood2 = document.getElementById('mood2');
            let box4_anzahl = document.getElementById('box4_anzahl');
            let box5_anzahl = document.getElementById('box5_anzahl');
            textarea4.value = flavor1;
            textarea5.value = flavor2;
            textarea6.value = topping[Math.floor(Math.random() * 2)];
            box4_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();
            box5_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();
            mood2.value = "wartend";
            mood2.style.color = "#F5A02C";
        }
        if (newPosition.x == 1470) {
            // Ähnliche Logik wie oben für die dritte Box
            let textarea7 = document.getElementById('box7');
            let textarea8 = document.getElementById('box8');
            let textarea9 = document.getElementById('box9');
            let mood3 = document.getElementById('mood3');
            let box7_anzahl = document.getElementById('box7_anzahl');
            let box8_anzahl = document.getElementById('box8_anzahl');
            textarea7.value = flavor1;
            textarea8.value = flavor2;
            textarea9.value = topping[Math.floor(Math.random() * 2)];
            box7_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();
            box8_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();
            mood3.value = "wartend";
            mood3.style.color = "#F5A02C";
        }
    }
    EIA2_Endabgabe.spawnOrder = spawnOrder;
    // Wird beim Laden der Seite aufgerufen
    window.onload = () => {
        // Button-Referenzen
        const button1 = document.getElementById('button1');
        const button2 = document.getElementById('button2');
        const button3 = document.getElementById('button3');
        // Textarea-Referenzen für die Vergleichswerte
        let textarea10 = document.getElementById('box10');
        let textarea11 = document.getElementById('box11');
        let textarea12 = document.getElementById('box12');
        let box10_anzahl = document.getElementById('box10_anzahl');
        let box11_anzahl = document.getElementById('box11_anzahl');
        let earning = document.getElementById('earning');
        // Event-Listener für Button1
        if (button1) {
            button1.addEventListener('click', () => {
                let textarea1 = document.getElementById('box1');
                let textarea2 = document.getElementById('box2');
                let textarea3 = document.getElementById('box3');
                let box1_anzahl = document.getElementById('box1_anzahl');
                let box2_anzahl = document.getElementById('box2_anzahl');
                let mood1 = document.getElementById('mood1');
                // Überprüft, ob die Bestellung übereinstimmt
                if (textarea1.value == textarea10.value && textarea2.value == textarea11.value && textarea3.value == textarea12.value && box1_anzahl.value == box10_anzahl.value && box2_anzahl.value == box11_anzahl.value) {
                    if (textarea1.value !== "") {
                        let customer = getCurrentCustomer();
                        clearTimeout(customer.removaltimerId_essen); // Stornieren des Essens-Timers, falls vorhanden
                        mood1.value = "am essen"; // Aktualisiert die Stimmung auf "am essen"
                        mood1.style.color = "#00ff00";
                        // Ändert die Stimmung nach 3 Sekunden auf "bezahlt"
                        setTimeout(() => {
                            mood1.value = "bezahlt";
                            mood1.style.color = "#00ff00";
                        }, 3000);
                        // Entfernt den Kunden nach 5 Sekunden und berechnet den Preis
                        setTimeout(() => {
                            EIA2_Endabgabe.crc2.save();
                            EIA2_Endabgabe.crc2.clearRect(150 - 60, 220 - 60, 60 * 2, 60 * 2); // Entfernt die Bestellung von der Leinwand
                            EIA2_Endabgabe.crc2.fillStyle = "#6B502C"; // Hintergrundfarbe für entfernte Bestellung
                            EIA2_Endabgabe.crc2.fillRect(150 - 60, 220 - 60, 60 * 2, 60 * 2);
                            EIA2_Endabgabe.crc2.fill();
                            EIA2_Endabgabe.crc2.restore();
                            // Preisberechnung
                            let flavor1Price = EIA2_Endabgabe.flavorBoxes.find(box => box.label === textarea1.value)?.price ?? 0;
                            let flavor2Price = EIA2_Endabgabe.flavorBoxes.find(box => box.label === textarea2.value)?.price ?? 0;
                            let toppingPrice = EIA2_Endabgabe.toppingBoxes.find(box => box.label === textarea3.value)?.price ?? 0;
                            let totalPrice = (parseInt(box1_anzahl.value) * flavor1Price) + (parseInt(box2_anzahl.value) * flavor2Price) + toppingPrice;
                            let currentEarning = parseInt(earning.value);
                            earning.value = (currentEarning + totalPrice).toString(); // Aktualisiert den Gesamtverdienst
                            // Leert die Bestellfelder und setzt die Stimmung zurück
                            textarea1.value = "";
                            textarea2.value = "";
                            textarea3.value = "";
                            box1_anzahl.value = "";
                            box2_anzahl.value = "";
                            mood1.value = "";
                        }, 5000);
                    }
                }
            });
        }
        // Event-Listener für Button2
        if (button2) {
            button2.addEventListener('click', () => {
                let textarea4 = document.getElementById('box4');
                let textarea5 = document.getElementById('box5');
                let textarea6 = document.getElementById('box6');
                let box4_anzahl = document.getElementById('box4_anzahl');
                let box5_anzahl = document.getElementById('box5_anzahl');
                let mood2 = document.getElementById('mood2');
                // Überprüft, ob die Bestellung übereinstimmt
                if (textarea4.value == textarea10.value && textarea5.value == textarea11.value && textarea6.value == textarea12.value && box4_anzahl.value == box10_anzahl.value && box5_anzahl.value == box11_anzahl.value) {
                    if (textarea4.value !== "") {
                        let customer = getCurrentCustomer();
                        clearTimeout(customer.removaltimerId_essen);
                        mood2.value = "am essen";
                        mood2.style.color = "#00ff00";
                        setTimeout(() => {
                            mood2.value = "bezahlt";
                            mood2.style.color = "#00ff00";
                        }, 3000);
                        setTimeout(() => {
                            EIA2_Endabgabe.crc2.save();
                            EIA2_Endabgabe.crc2.clearRect(1020 - 60, 220 - 60, 60 * 2, 60 * 2); // Entfernt die Bestellung von der Leinwand
                            EIA2_Endabgabe.crc2.fillStyle = "#6B502C";
                            EIA2_Endabgabe.crc2.fillRect(1020 - 60, 220 - 60, 60 * 2, 60 * 2);
                            EIA2_Endabgabe.crc2.fill();
                            EIA2_Endabgabe.crc2.restore();
                            // Preisberechnung
                            let flavor1Price = EIA2_Endabgabe.flavorBoxes.find(box => box.label === textarea4.value)?.price ?? 0;
                            let flavor2Price = EIA2_Endabgabe.flavorBoxes.find(box => box.label === textarea5.value)?.price ?? 0;
                            let toppingPrice = EIA2_Endabgabe.toppingBoxes.find(box => box.label === textarea6.value)?.price ?? 0;
                            let totalPrice = (parseInt(box4_anzahl.value) * flavor1Price) + (parseInt(box5_anzahl.value) * flavor2Price) + toppingPrice;
                            let currentEarning = parseInt(earning.value);
                            earning.value = (currentEarning + totalPrice).toString();
                            textarea4.value = "";
                            textarea5.value = "";
                            textarea6.value = "";
                            box4_anzahl.value = "";
                            box5_anzahl.value = "";
                            mood2.value = "";
                        }, 5000);
                    }
                }
            });
        }
        // Event-Listener für Button3
        if (button3) {
            button3.addEventListener('click', () => {
                let textarea7 = document.getElementById('box7');
                let textarea8 = document.getElementById('box8');
                let textarea9 = document.getElementById('box9');
                let box7_anzahl = document.getElementById('box7_anzahl');
                let box8_anzahl = document.getElementById('box8_anzahl');
                let mood3 = document.getElementById('mood3');
                // Überprüft, ob die Bestellung übereinstimmt
                if (textarea7.value == textarea10.value && textarea8.value == textarea11.value && textarea9.value == textarea12.value && box7_anzahl.value == box10_anzahl.value && box8_anzahl.value == box11_anzahl.value) {
                    if (textarea7.value !== "") {
                        let customer = getCurrentCustomer();
                        clearTimeout(customer.removaltimerId_essen);
                        mood3.value = "am essen";
                        mood3.style.color = "#00ff00";
                        setTimeout(() => {
                            mood3.value = "bezahlt";
                            mood3.style.color = "#00ff00";
                        }, 3000);
                        setTimeout(() => {
                            EIA2_Endabgabe.crc2.save();
                            EIA2_Endabgabe.crc2.clearRect(1470 - 60, 220 - 60, 60 * 2, 60 * 2); // Entfernt die Bestellung von der Leinwand
                            EIA2_Endabgabe.crc2.fillStyle = "#6B502C";
                            EIA2_Endabgabe.crc2.fillRect(1470 - 60, 220 - 60, 60 * 2, 60 * 2);
                            EIA2_Endabgabe.crc2.fill();
                            EIA2_Endabgabe.crc2.restore();
                            // Preisberechnung
                            let flavor1Price = EIA2_Endabgabe.flavorBoxes.find(box => box.label === textarea7.value)?.price ?? 0;
                            let flavor2Price = EIA2_Endabgabe.flavorBoxes.find(box => box.label === textarea8.value)?.price ?? 0;
                            let toppingPrice = EIA2_Endabgabe.toppingBoxes.find(box => box.label === textarea9.value)?.price ?? 0;
                            let totalPrice = (parseInt(box7_anzahl.value) * flavor1Price) + (parseInt(box8_anzahl.value) * flavor2Price) + toppingPrice;
                            let currentEarning = parseInt(earning.value);
                            earning.value = (currentEarning + totalPrice).toString();
                            textarea7.value = "";
                            textarea8.value = "";
                            textarea9.value = "";
                            box7_anzahl.value = "";
                            box8_anzahl.value = "";
                            mood3.value = "";
                        }, 5000);
                    }
                }
            });
        }
    };
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=order.js.map