namespace EIA2_Endabgabe {

    export interface Position {
        x: number;
        y: number;
    }

    export interface Customer {
        position: Position;
        radius: number;
    }

    export let customers: Customer[] = [];

    // Define chair positions
    export let chairPositions: Position[] = [
        { x: 150, y: 220 },
        { x: 990, y: 220 },
        { x: 1500, y: 220 }
    ];

    export function getRandomCustomerPosition() {
        let x = 600 + Math.random() * 150;
        let y = 90 + Math.random() * 150;
        return { x, y };
    }

    export function drawCustomer(customer: Customer) {
        const { x, y } = customer.position;
        crc2.save();
        crc2.beginPath();

        crc2.fillStyle = "#BECF21";
        crc2.beginPath();
        crc2.ellipse(x, y, customer.radius, customer.radius, 0, 0, 2 * Math.PI);
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

    export function spawnCustomer() {
        setInterval(() => {
            let position = getRandomCustomerPosition();
            let customer = { position, radius: 60 };
            customers.push(customer);
            drawCustomer(customer);
        }, 10000); // 20000 Millisekunden = 20 Sekunden
    }

    export function handleCustomerClick(event: MouseEvent) {
        const { offsetX, offsetY } = event;
        for (let customer of customers) {
            const dist = Math.sqrt((offsetX - customer.position.x) ** 2 + (offsetY - customer.position.y) ** 2);
            if (dist < customer.radius) {
                let newPosition = getFreeChairPosition();
                if (newPosition) {
                    moveCustomer(customer, newPosition);
                    spawnOrder(newPosition);
                }
                break;
            }
        }
    }

    function getPixelColor(x: number, y: number): string {
        const pixel = crc2.getImageData(x, y, 1, 1).data;
        const rgb = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase()}`;
        return rgb;
    }

    export function getFreeChairPosition(): Position | null {
        for (let pos of chairPositions) {
            const chairColor = getPixelColor(pos.x, pos.y);
            if (chairColor === "#6B502C" && !customers.some(customer => customer.position.x === pos.x && customer.position.y === pos.y)) {
                return pos;
            }
        }
        return null; // No free chair
    }

    export function moveCustomer(customer: Customer, newPosition: Position) {
        // Clear the old customer position
        crc2.save();
        crc2.clearRect(customer.position.x - customer.radius, customer.position.y - customer.radius, customer.radius * 2, customer.radius * 2);
        crc2.fillStyle = "#C3D8E6";
        crc2.fillRect(customer.position.x - customer.radius, customer.position.y - customer.radius, customer.radius * 2, customer.radius * 2);
        crc2.fill();
        crc2.restore();
        customers = customers.filter(c => c !== customer);

        // Update the customer position and redraw the customer
        customer.position = newPosition;
        drawCustomer(customer);
    }

    // Starte das regelmäßige Erscheinen der Kunden
    spawnCustomer();

    
}
