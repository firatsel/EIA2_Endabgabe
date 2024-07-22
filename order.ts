namespace EIA2_Endabgabe {

    export class Order {
        positionX: number;

        constructor(_positionX: number) {
            this.positionX = _positionX;
        }

        drawOrder() {
            crc2.save();
            crc2.beginPath();

            crc2.fillStyle = "#EBEBE4"; 
            crc2.beginPath();
            crc2.rect(this.positionX, 40, 160, 100);
            crc2.fill();

            crc2.closePath();
            crc2.restore();
        }
    }

    // aktueller Kunde, der bedient wird
    let currentCustomer: Customer;

    // aktueller Kunden
    export function setCurrentCustomer(customer: Customer) {
        currentCustomer = customer;
    }

    // gibt aktuellen Kunden zurück
    export function getCurrentCustomer(): Customer {
        return currentCustomer;
    }

    // neue Bestellung wird erzeugt und Anzeige aktualisiert
    export function spawnOrder(newPosition: Position) {
        // Auswahl: drei Eissorten und zwei Toppings
        let flavor = ["Mango", "Erdbeere", "Schokolade"];
        let topping = ["Kirsche", "Streusel"];
        let [flavor1, flavor2] = flavor.sort(() => 0.5 - Math.random()).slice(0, 2);


        // Bestellung wird bearbeitet je nach Position/Stuhl des Kunden

        if (newPosition.x == 150) {
            // Stuhl 1
            let textarea1 = document.getElementById('box1') as HTMLTextAreaElement;
            let textarea2 = document.getElementById('box2') as HTMLTextAreaElement;
            let textarea3 = document.getElementById('box3') as HTMLTextAreaElement;
            let mood1 = document.getElementById('mood1') as HTMLTextAreaElement;
            let box1_anzahl = document.getElementById('box1_anzahl') as HTMLTextAreaElement;
            let box2_anzahl = document.getElementById('box2_anzahl') as HTMLTextAreaElement;

            textarea1.value = flavor1;
            textarea2.value = flavor2;
            textarea3.value = topping[Math.floor(Math.random() * 2)];
            box1_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();
            box2_anzahl.value = (Math.floor(Math.random() * 3) + 1).toString();

            mood1.value = "wartend"; 
            mood1.style.color = "#F5A02C";


        } if (newPosition.x == 1020) {
            // Stuhl 2
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
            // Stuhl 3
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

    window.onload = () => {
        const button1 = document.getElementById('button1') as HTMLButtonElement;
        const button2 = document.getElementById('button2') as HTMLButtonElement;
        const button3 = document.getElementById('button3') as HTMLButtonElement;

        let textarea10 = document.getElementById('box10') as HTMLTextAreaElement;
        let textarea11 = document.getElementById('box11') as HTMLTextAreaElement;
        let textarea12 = document.getElementById('box12') as HTMLTextAreaElement;
        let box10_anzahl = document.getElementById('box10_anzahl') as HTMLTextAreaElement;
        let box11_anzahl = document.getElementById('box11_anzahl') as HTMLTextAreaElement;
        let earning = document.getElementById('earning') as HTMLTextAreaElement;

        // Rückgabe an Kunden zu Stuhl 1
        if (button1) {
            button1.addEventListener('click', () => {
                let textarea1 = document.getElementById('box1') as HTMLTextAreaElement;
                let textarea2 = document.getElementById('box2') as HTMLTextAreaElement;
                let textarea3 = document.getElementById('box3') as HTMLTextAreaElement;
                let box1_anzahl = document.getElementById('box1_anzahl') as HTMLTextAreaElement;
                let box2_anzahl = document.getElementById('box2_anzahl') as HTMLTextAreaElement;
                let mood1 = document.getElementById('mood1') as HTMLTextAreaElement;

                // überprüft, ob die Bestellung übereinstimmt
                if (textarea1.value == textarea10.value && textarea2.value == textarea11.value && textarea3.value == textarea12.value && box1_anzahl.value == box10_anzahl.value && box2_anzahl.value == box11_anzahl.value) {
                    if (textarea1.value !== "") {
                        let customer = getCurrentCustomer();
                        clearTimeout(customer.removaltimerId_essen); // storniert Essens-Timer, falls vorhanden
                        mood1.value = "am essen"; // Stimmung auf "am essen"
                        mood1.style.color = "#00ff00";

                        // Stimmung nach 3 Sekunden auf "bezahlt"
                        setTimeout(() => {
                            mood1.value = "bezahlt";
                            mood1.style.color = "#00ff00";
                        }, 3000);

                        // Kunde verlässt nach 5 Sekunden die Eisdiele, Preis wird berechnet
                        setTimeout(() => {
                            crc2.save();
                            crc2.clearRect(150 - 60, 220 - 60, 60 * 2, 60 * 2); // Bestellung entfernt
                            crc2.fillStyle = "#6B502C"; 
                            crc2.fillRect(150 - 60, 220 - 60, 60 * 2, 60 * 2);
                            crc2.fill();
                            crc2.restore();

                            // Preisberechnung
                            let flavor1Price = flavorBoxes.find(box => box.label === textarea1.value)?.price ?? 0;
                            let flavor2Price = flavorBoxes.find(box => box.label === textarea2.value)?.price ?? 0;
                            let toppingPrice = toppingBoxes.find(box => box.label === textarea3.value)?.price ?? 0;
                            let totalPrice = (parseInt(box1_anzahl.value) * flavor1Price) + (parseInt(box2_anzahl.value) * flavor2Price) + toppingPrice;
                            
                            let currentEarning = parseInt(earning.value);
                            earning.value = (currentEarning + totalPrice).toString(); // Gesamtverdienst wird aktualisiert
                            
                            // Bestellfelder werden geleert, setzt die Stimmung zurück
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

        // Rückgabe an Kunden zu Stuhl 2
        if (button2) {
            button2.addEventListener('click', () => {
                let textarea4 = document.getElementById('box4') as HTMLTextAreaElement;
                let textarea5 = document.getElementById('box5') as HTMLTextAreaElement;
                let textarea6 = document.getElementById('box6') as HTMLTextAreaElement;
                let box4_anzahl = document.getElementById('box4_anzahl') as HTMLTextAreaElement;
                let box5_anzahl = document.getElementById('box5_anzahl') as HTMLTextAreaElement;
                let mood2 = document.getElementById('mood2') as HTMLTextAreaElement;

                // überprüft, ob die Bestellung übereinstimmt
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
                            crc2.clearRect(1020 - 60, 220 - 60, 60 * 2, 60 * 2); // Bestellung wird entfernt
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

        // Rückgabe an Kunden zu Stuhl 3
        if (button3) {
            button3.addEventListener('click', () => {
                let textarea7 = document.getElementById('box7') as HTMLTextAreaElement;
                let textarea8 = document.getElementById('box8') as HTMLTextAreaElement;
                let textarea9 = document.getElementById('box9') as HTMLTextAreaElement;
                let box7_anzahl = document.getElementById('box7_anzahl') as HTMLTextAreaElement;
                let box8_anzahl = document.getElementById('box8_anzahl') as HTMLTextAreaElement;
                let mood3 = document.getElementById('mood3') as HTMLTextAreaElement;

                // überprüft, ob die Bestellung übereinstimmt
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
                            crc2.clearRect(1470 - 60, 220 - 60, 60 * 2, 60 * 2); // Bestellung wird entfernt
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