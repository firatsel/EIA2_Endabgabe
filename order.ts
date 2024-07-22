namespace EIA2_Endabgabe {

    // Klasse Order repräsentiert eine Bestellung und ihre Position auf der Leinwand
    export class Order {
        positionX: number; // X-Position der Bestellung

        constructor(_positionX: number) {
            this.positionX = _positionX;
        }

        // Zeichnet die Bestellung auf der Leinwand
        drawOrder() {
            crc2.save();
            crc2.beginPath();

            crc2.fillStyle = "#EBEBE4"; // Hintergrundfarbe der Bestellung
            crc2.beginPath();
            crc2.rect(this.positionX, 40, 160, 100); // Rechteck für Bestellung
            crc2.fill();

            crc2.closePath();
            crc2.restore();
        }
    }

    // Aktueller Kunde, der gerade bedient wird
    let currentCustomer: Customer;

    // Setzt den aktuellen Kunden
    export function setCurrentCustomer(customer: Customer) {
        currentCustomer = customer;
    }

    // Gibt den aktuellen Kunden zurück
    export function getCurrentCustomer(): Customer {
        return currentCustomer;
    }

    // Erzeugt eine neue Bestellung und aktualisiert die Anzeige
    export function spawnOrder(newPosition: Position) {
        // Auswahl von zwei zufälligen Geschmacksrichtungen und einem Topping
        let flavor = ["Mango", "Erdbeere", "Schokolade"];
        let topping = ["Kirsche", "Streusel"];
        let [flavor1, flavor2] = flavor.sort(() => 0.5 - Math.random()).slice(0, 2);

        // Behandelt die Bestellung je nach Position des Kunden
        if (newPosition.x == 150) {
            // Elementreferenzen für die erste Box
            let textarea1 = document.getElementById('box1') as HTMLTextAreaElement;
            let textarea2 = document.getElementById('box2') as HTMLTextAreaElement;
            let textarea3 = document.getElementById('box3') as HTMLTextAreaElement;
            let mood1 = document.getElementById('mood1') as HTMLTextAreaElement;
            let box1_anzahl = document.getElementById('box1_anzahl') as HTMLTextAreaElement;
            let box2_anzahl = document.getElementById('box2_anzahl') as HTMLTextAreaElement;

            // Setzt die Werte für die erste Box
            textarea1.value = flavor1;
            textarea2.value = flavor2;
            textarea3.value = topping[Math.floor(Math.random() * 2)];
            box1_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();
            box2_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();

            mood1.value = "wartend"; // Setzt den anfänglichen Stimmungstext und die Farbe
            mood1.style.color = "#F5A02C";

        } if (newPosition.x == 1020) {
            // Ähnliche Logik wie oben für die zweite Box
            let textarea4 = document.getElementById('box4') as HTMLTextAreaElement;
            let textarea5 = document.getElementById('box5') as HTMLTextAreaElement;
            let textarea6 = document.getElementById('box6') as HTMLTextAreaElement;
            let mood2 = document.getElementById('mood2') as HTMLTextAreaElement;
            let box4_anzahl = document.getElementById('box4_anzahl') as HTMLTextAreaElement;
            let box5_anzahl = document.getElementById('box5_anzahl') as HTMLTextAreaElement;

            textarea4.value = flavor1;
            textarea5.value = flavor2;
            textarea6.value = topping[Math.floor(Math.random() * 2)];
            box4_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();
            box5_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();

            mood2.value = "wartend";
            mood2.style.color = "#F5A02C";

        } if (newPosition.x == 1470) {
            // Ähnliche Logik wie oben für die dritte Box
            let textarea7 = document.getElementById('box7') as HTMLTextAreaElement;
            let textarea8 = document.getElementById('box8') as HTMLTextAreaElement;
            let textarea9 = document.getElementById('box9') as HTMLTextAreaElement;
            let mood3 = document.getElementById('mood3') as HTMLTextAreaElement;
            let box7_anzahl = document.getElementById('box7_anzahl') as HTMLTextAreaElement;
            let box8_anzahl = document.getElementById('box8_anzahl') as HTMLTextAreaElement;

            textarea7.value = flavor1;
            textarea8.value = flavor2;
            textarea9.value = topping[Math.floor(Math.random() * 2)];
            box7_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();
            box8_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();

            mood3.value = "wartend";
            mood3.style.color = "#F5A02C";

        }
    }

    // Wird beim Laden der Seite aufgerufen
    window.onload = () => {
        // Button-Referenzen
        const button1 = document.getElementById('button1') as HTMLButtonElement;
        const button2 = document.getElementById('button2') as HTMLButtonElement;
        const button3 = document.getElementById('button3') as HTMLButtonElement;

        // Textarea-Referenzen für die Vergleichswerte
        let textarea10 = document.getElementById('box10') as HTMLTextAreaElement;
        let textarea11 = document.getElementById('box11') as HTMLTextAreaElement;
        let textarea12 = document.getElementById('box12') as HTMLTextAreaElement;
        let box10_anzahl = document.getElementById('box10_anzahl') as HTMLTextAreaElement;
        let box11_anzahl = document.getElementById('box11_anzahl') as HTMLTextAreaElement;
        let earning = document.getElementById('earning') as HTMLTextAreaElement;

        // Event-Listener für Button1
        if (button1) {
            button1.addEventListener('click', () => {
                let textarea1 = document.getElementById('box1') as HTMLTextAreaElement;
                let textarea2 = document.getElementById('box2') as HTMLTextAreaElement;
                let textarea3 = document.getElementById('box3') as HTMLTextAreaElement;
                let box1_anzahl = document.getElementById('box1_anzahl') as HTMLTextAreaElement;
                let box2_anzahl = document.getElementById('box2_anzahl') as HTMLTextAreaElement;
                let mood1 = document.getElementById('mood1') as HTMLTextAreaElement;

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
                            crc2.save();
                            crc2.clearRect(150 - 60, 220 - 60, 60 * 2, 60 * 2); // Entfernt die Bestellung von der Leinwand
                            crc2.fillStyle = "#6B502C"; // Hintergrundfarbe für entfernte Bestellung
                            crc2.fillRect(150 - 60, 220 - 60, 60 * 2, 60 * 2);
                            crc2.fill();
                            crc2.restore();

                            // Preisberechnung
                            let flavor1Price = flavorBoxes.find(box => box.label === textarea1.value)?.price ?? 0;
                            let flavor2Price = flavorBoxes.find(box => box.label === textarea2.value)?.price ?? 0;
                            let toppingPrice = toppingBoxes.find(box => box.label === textarea3.value)?.price ?? 0;
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
                let textarea4 = document.getElementById('box4') as HTMLTextAreaElement;
                let textarea5 = document.getElementById('box5') as HTMLTextAreaElement;
                let textarea6 = document.getElementById('box6') as HTMLTextAreaElement;
                let box4_anzahl = document.getElementById('box4_anzahl') as HTMLTextAreaElement;
                let box5_anzahl = document.getElementById('box5_anzahl') as HTMLTextAreaElement;
                let mood2 = document.getElementById('mood2') as HTMLTextAreaElement;

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
                            crc2.save();
                            crc2.clearRect(1020 - 60, 220 - 60, 60 * 2, 60 * 2); // Entfernt die Bestellung von der Leinwand
                            crc2.fillStyle = "#6B502C";
                            crc2.fillRect(1020 - 60, 220 - 60, 60 * 2, 60 * 2);
                            crc2.fill();
                            crc2.restore();

                            // Preisberechnung
                            let flavor1Price = flavorBoxes.find(box => box.label === textarea4.value)?.price ?? 0;
                            let flavor2Price = flavorBoxes.find(box => box.label === textarea5.value)?.price ?? 0;
                            let toppingPrice = toppingBoxes.find(box => box.label === textarea6.value)?.price ?? 0;
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
                let textarea7 = document.getElementById('box7') as HTMLTextAreaElement;
                let textarea8 = document.getElementById('box8') as HTMLTextAreaElement;
                let textarea9 = document.getElementById('box9') as HTMLTextAreaElement;
                let box7_anzahl = document.getElementById('box7_anzahl') as HTMLTextAreaElement;
                let box8_anzahl = document.getElementById('box8_anzahl') as HTMLTextAreaElement;
                let mood3 = document.getElementById('mood3') as HTMLTextAreaElement;

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
                            crc2.save();
                            crc2.clearRect(1470 - 60, 220 - 60, 60 * 2, 60 * 2); // Entfernt die Bestellung von der Leinwand
                            crc2.fillStyle = "#6B502C";
                            crc2.fillRect(1470 - 60, 220 - 60, 60 * 2, 60 * 2);
                            crc2.fill();
                            crc2.restore();

                            // Preisberechnung
                            let flavor1Price = flavorBoxes.find(box => box.label === textarea7.value)?.price ?? 0;
                            let flavor2Price = flavorBoxes.find(box => box.label === textarea8.value)?.price ?? 0;
                            let toppingPrice = toppingBoxes.find(box => box.label === textarea9.value)?.price ?? 0;
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
    }
}