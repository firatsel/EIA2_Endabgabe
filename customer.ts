namespace EIA2_Endabgabe {

    export interface Position {
        x: number;
        y: number;
    }

    export interface Customer {
        position: Position;
        radius: number;
        timerId?: number; // Timer für die automatische Entfernung
        removaltimerId?: number; // Timer für das Entfernen
        removaltimerId_essen?: number; // Timer für das Essen
    }

    // Kundenspeicherung
    export let customers: Customer[] = [];

    // Stuhlpositionen auf der Leinwand
    export let chairPositions: Position[] = [
        { x: 150, y: 220 },
        { x: 1020, y: 220 },
        { x: 1470, y: 220 }
    ];

    // überprüft, ob sich zwei Kreise überlappen
    function doCirclesOverlap(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean {
        const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return dist < r1 + r2;
    }

    // zufällige Position für einen neuen Kunden, Funktion, damit die sich nicht überlappen
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

        return null;
    }

    // Kunde (Mike W.) wird gezeichnet
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

    // neuer Kunde (alle 5 Sekunden)
    export function spawnCustomer() {
        setInterval(() => {
            let position = getRandomCustomerPosition();
            if (position) {
                let customer: Customer = { position, radius: 60 };
                customers.push(customer);
                drawCustomer(customer);
                
                // Kunde wird nach 15 Sekunden entfernt
                customer.timerId = window.setTimeout(() => {
                    removeCustomer(customer);
                }, 15000);
            } else {
                console.log("Keine gültige Position für einen neuen Kunden gefunden.");
            }
        }, 5000); // 5 Sekunden
    }

    // Klick auf den Kunden
    export function handleCustomerClick(event: MouseEvent) {
        const { offsetX, offsetY } = event;
        for (let customer of customers) {
            const dist = Math.sqrt((offsetX - customer.position.x) ** 2 + (offsetY - customer.position.y) ** 2);
            if (dist < customer.radius) {
                let newPosition = getFreeChairPosition();
                if (newPosition) {
                    clearTimeout(customer.timerId); // Timer für die Entfernung löschen
                    moveCustomer(customer, newPosition);
                    setCurrentCustomer(customer); // aktueller Kunde
                    spawnOrder(newPosition); // Bestellung wird angezeigt
                }
                break;
            }
        }
    }

    // gibt die Farbe eines Pixels an der gegebenen Position zurück
    function getPixelColor(x: number, y: number): string {
        const pixel = crc2.getImageData(x, y, 1, 1).data;
        const rgb = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase()}`;
        return rgb;
    }

    // freie Stuhlposition, falls vorhanden
    export function getFreeChairPosition(): Position | null {
        for (let pos of chairPositions) {
            const chairColor = getPixelColor(pos.x, pos.y);
            if (chairColor === "#6B502C" && !customers.some(customer => customer.position.x === pos.x && customer.position.y === pos.y)) {
                return pos;
            }
        }
        return null; // kein freier Stuhl gefunden
    }

    // Kunden wird zur neuen Position bewegt
    export function moveCustomer(customer: Customer, newPosition: Position) {
        // alte Position des Kunden auf Hintergrundfarbe gesetzt
        if (customer.removaltimerId) {
            clearTimeout(customer.removaltimerId);
        }
        crc2.save();
        crc2.fillStyle = "#6B502C"; 
        crc2.beginPath();
        crc2.arc(customer.position.x, customer.position.y, customer.radius + 1, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();

        customers = customers.filter(c => c !== customer);

        // Kundenposition wird aktualisiert und neu gezeichnet
        customer.position = newPosition;
        drawCustomer(customer);
        customer.removaltimerId_essen = window.setTimeout(() => {
            crc2.save();
            crc2.fillStyle = "#FF0000";
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

    // Kunde wird entfernt + rotes Gesicht
    export function removeCustomer(customer: Customer) {
        crc2.save();
        crc2.fillStyle = "#FF0000"; 
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
    
        // Kunde wird nach 5 sek entfernt
        customer.removaltimerId = window.setTimeout(() => {
            crc2.save();
            crc2.fillStyle = "#6B502C";
            crc2.beginPath();
            crc2.arc(customer.position.x, customer.position.y, customer.radius + 1, 0, 2 * Math.PI);
            crc2.fill();
            crc2.restore();
            // Kunde wird aus der Liste entfernt
            customers = customers.filter(c => c !== customer);
            incrementLostCounter(); // Zähler für verlorene Kunden wird erhöht
        }, 5000); // 5 Sekunden
    }

    // Zähler für verlorene Kunden wird erhöht
    export function incrementLostCounter() {
        const lostTextarea = document.getElementById("lost") as HTMLTextAreaElement;
        let currentCount = parseInt(lostTextarea.value) || 0;
        lostTextarea.value = (currentCount + 1).toString();
    }

    // regelmäßige Kunden
    spawnCustomer();
}
