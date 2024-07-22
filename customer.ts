namespace EIA2_Endabgabe {

    // Interface für Position mit x- und y-Koordinaten
    export interface Position {
        x: number;
        y: number;
    }

    // Interface für Kunden mit Position, Radius und optionalen Timer-IDs
    export interface Customer {
        position: Position;
        radius: number;
        timerId?: number; // Timer für die automatische Entfernung
        removaltimerId?: number; // Timer für das Entfernen
        removaltimerId_essen?: number; // Timer für das Essen
    }

    // Liste, um alle Kunden zu speichern
    export let customers: Customer[] = [];

    // Definiere Stuhlpositionen auf der Leinwand
    export let chairPositions: Position[] = [
        { x: 150, y: 220 },
        { x: 1020, y: 220 },
        { x: 1470, y: 220 }
    ];

    // Überprüft, ob sich zwei Kreise überlappen
    function doCirclesOverlap(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean {
        const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return dist < r1 + r2;
    }

    // Gibt eine zufällige Position für einen neuen Kunden zurück, wenn sie gültig ist
    export function getRandomCustomerPosition(): Position | null {
        const maxAttempts = 100;
        let attempts = 0;

        while (attempts < maxAttempts) {
            let x = 600 + Math.random() * 160;
            let y = 90 + Math.random() * 150;
            let position = { x, y };
            let isValidPosition = true;

            for (let customer of customers) {
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

    // Zeichnet einen Kunden auf der Leinwand
    export function drawCustomer(customer: Customer) {
        const { x, y } = customer.position;
        crc2.save();
        crc2.beginPath();

        crc2.fillStyle = "#BECF21";
        crc2.beginPath();
        crc2.ellipse(x, y, customer.radius - 5, customer.radius - 5, 0, 0, 2 * Math.PI);
        crc2.fill();

        crc2.fillStyle = "#FFFFFF";
        crc2.beginPath();
        crc2.ellipse(x, y - 10, 30, 30, 0, 0, 2 * Math.PI);
        crc2.fill();

        crc2.fillStyle = "#00A8AB";
        crc2.beginPath();
        crc2.ellipse(x, y - 10, 16, 16, 0, 0, 2 * Math.PI);
        crc2.fill();

        crc2.fillStyle = "#37463C";
        crc2.beginPath();
        crc2.ellipse(x, y - 10, 10, 10, 0, 0, 2 * Math.PI);
        crc2.fill();

        crc2.closePath();
        crc2.restore();
    }

    // Erzeugt einen neuen Kunden alle 2 Sekunden
    export function spawnCustomer() {
        setInterval(() => {
            let position = getRandomCustomerPosition();
            if (position) {
                let customer: Customer = { position, radius: 60 }; // Radius des Kunden
                customers.push(customer);
                drawCustomer(customer);
                
                // Timer zum Entfernen des Kunden nach 15 Sekunden
                customer.timerId = window.setTimeout(() => {
                    removeCustomer(customer);
                }, 15000);
            } else {
                console.log("Keine gültige Position für einen neuen Kunden gefunden.");
            }
        }, 5000); // Alle 5 Sekunden
    }

    // Verarbeitet einen Klick auf einen Kunden
    export function handleCustomerClick(event: MouseEvent) {
        const { offsetX, offsetY } = event;
        for (let customer of customers) {
            const dist = Math.sqrt((offsetX - customer.position.x) ** 2 + (offsetY - customer.position.y) ** 2);
            if (dist < customer.radius) {
                let newPosition = getFreeChairPosition();
                if (newPosition) {
                    clearTimeout(customer.timerId); // Timer für die Entfernung löschen
                    moveCustomer(customer, newPosition);
                    setCurrentCustomer(customer); // Setze den aktuellen Kunden
                    spawnOrder(newPosition); // Bestellvorgang starten
                }
                break;
            }
        }
    }

    // Gibt die Farbe eines Pixels an der gegebenen Position zurück
    function getPixelColor(x: number, y: number): string {
        const pixel = crc2.getImageData(x, y, 1, 1).data;
        const rgb = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase()}`;
        return rgb;
    }

    // Gibt eine freie Stuhlposition zurück, falls vorhanden
    export function getFreeChairPosition(): Position | null {
        for (let pos of chairPositions) {
            const chairColor = getPixelColor(pos.x, pos.y);
            if (chairColor === "#6B502C" && !customers.some(customer => customer.position.x === pos.x && customer.position.y === pos.y)) {
                return pos;
            }
        }
        return null; // Kein freier Stuhl gefunden
    }

    // Bewegt einen Kunden zu einer neuen Position
    export function moveCustomer(customer: Customer, newPosition: Position) {
        // Alte Position des Kunden auf Hintergrundfarbe setzen
        if (customer.removaltimerId) {
            clearTimeout(customer.removaltimerId);
        }
        crc2.save();
        crc2.fillStyle = "#6B502C"; // Hintergrundfarbe
        crc2.beginPath();
        crc2.arc(customer.position.x, customer.position.y, customer.radius + 1, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();

        customers = customers.filter(c => c !== customer);

        // Kundenposition aktualisieren und neu zeichnen
        customer.position = newPosition;
        drawCustomer(customer);
        customer.removaltimerId_essen = window.setTimeout(() => {
            crc2.save();
            crc2.fillStyle = "#FF0000"; // Rot
            crc2.beginPath();
            crc2.arc(customer.position.x, customer.position.y, customer.radius - 5, 0, 2 * Math.PI);
            crc2.fill();

            crc2.fillStyle = "#FFFFFF";
            crc2.beginPath();
            crc2.ellipse(customer.position.x, customer.position.y - 10, 30, 30, 0, 0, 2 * Math.PI);
            crc2.fill();

            crc2.fillStyle = "#00A8AB";
            crc2.beginPath();
            crc2.ellipse(customer.position.x, customer.position.y - 10, 16, 16, 0, 0, 2 * Math.PI);
            crc2.fill();

            crc2.fillStyle = "#37463C";
            crc2.beginPath();
            crc2.ellipse(customer.position.x, customer.position.y - 10, 10, 10, 0, 0, 2 * Math.PI);
            crc2.fill();

            crc2.restore();
        }, 10000); // 10 Sekunden
    }

    // Entfernt einen Kunden und färbt ihn rot
    export function removeCustomer(customer: Customer) {
        crc2.save();
        crc2.fillStyle = "#FF0000"; // Rot
        crc2.beginPath();
        crc2.arc(customer.position.x, customer.position.y, customer.radius - 5, 0, 2 * Math.PI);
        crc2.fill();

        crc2.fillStyle = "#FFFFFF";
        crc2.beginPath();
        crc2.ellipse(customer.position.x, customer.position.y - 10, 30, 30, 0, 0, 2 * Math.PI);
        crc2.fill();

        crc2.fillStyle = "#00A8AB";
        crc2.beginPath();
        crc2.ellipse(customer.position.x, customer.position.y - 10, 16, 16, 0, 0, 2 * Math.PI);
        crc2.fill();

        crc2.fillStyle = "#37463C";
        crc2.beginPath();
        crc2.ellipse(customer.position.x, customer.position.y - 10, 10, 10, 0, 0, 2 * Math.PI);
        crc2.fill();

        crc2.restore();
    
        // Entferne den Kunden nach 5 Sekunden
        customer.removaltimerId = window.setTimeout(() => {
            crc2.save();
            crc2.fillStyle = "#6B502C"; // Hintergrundfarbe
            crc2.beginPath();
            crc2.arc(customer.position.x, customer.position.y, customer.radius + 1, 0, 2 * Math.PI);
            crc2.fill();
            crc2.restore();
            // Entferne den Kunden aus der Liste
            customers = customers.filter(c => c !== customer);
            incrementLostCounter(); // Erhöhe den Zähler für verlorene Kunden
        }, 5000); // 5 Sekunden
    }

    // Erhöht den Zähler für verlorene Kunden
    export function incrementLostCounter() {
        const lostTextarea = document.getElementById("lost") as HTMLTextAreaElement;
        let currentCount = parseInt(lostTextarea.value) || 0;
        lostTextarea.value = (currentCount + 1).toString();
    }

    // Startet das regelmäßige Erscheinen der Kunden
    spawnCustomer();
}
