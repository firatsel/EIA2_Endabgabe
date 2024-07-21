"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    EIA2_Endabgabe.customers = [];
    // Define chair positions
    EIA2_Endabgabe.chairPositions = [
        { x: 150, y: 220 },
        { x: 990, y: 220 },
        { x: 1500, y: 220 }
    ];
    function getRandomCustomerPosition() {
        let x = 600 + Math.random() * 150;
        let y = 90 + Math.random() * 150;
        return { x, y };
    }
    EIA2_Endabgabe.getRandomCustomerPosition = getRandomCustomerPosition;
    function drawCustomer(customer) {
        const { x, y } = customer.position;
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#BECF21";
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.ellipse(x, y, customer.radius, customer.radius, 0, 0, 2 * Math.PI);
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
    function spawnCustomer() {
        setInterval(() => {
            let position = getRandomCustomerPosition();
            let customer = { position, radius: 60 };
            EIA2_Endabgabe.customers.push(customer);
            drawCustomer(customer);
        }, 10000); // 20000 Millisekunden = 20 Sekunden
    }
    EIA2_Endabgabe.spawnCustomer = spawnCustomer;
    function handleCustomerClick(event) {
        const { offsetX, offsetY } = event;
        for (let customer of EIA2_Endabgabe.customers) {
            const dist = Math.sqrt((offsetX - customer.position.x) ** 2 + (offsetY - customer.position.y) ** 2);
            if (dist < customer.radius) {
                let newPosition = getFreeChairPosition();
                if (newPosition) {
                    moveCustomer(customer, newPosition);
                    EIA2_Endabgabe.spawnOrder(newPosition);
                }
                break;
            }
        }
    }
    EIA2_Endabgabe.handleCustomerClick = handleCustomerClick;
    function getPixelColor(x, y) {
        const pixel = EIA2_Endabgabe.crc2.getImageData(x, y, 1, 1).data;
        const rgb = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase()}`;
        return rgb;
    }
    function getFreeChairPosition() {
        for (let pos of EIA2_Endabgabe.chairPositions) {
            const chairColor = getPixelColor(pos.x, pos.y);
            if (chairColor === "#6B502C" && !EIA2_Endabgabe.customers.some(customer => customer.position.x === pos.x && customer.position.y === pos.y)) {
                return pos;
            }
        }
        return null; // No free chair
    }
    EIA2_Endabgabe.getFreeChairPosition = getFreeChairPosition;
    function moveCustomer(customer, newPosition) {
        // Clear the old customer position
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.clearRect(customer.position.x - customer.radius, customer.position.y - customer.radius, customer.radius * 2, customer.radius * 2);
        EIA2_Endabgabe.crc2.fillStyle = "#C3D8E6";
        EIA2_Endabgabe.crc2.fillRect(customer.position.x - customer.radius, customer.position.y - customer.radius, customer.radius * 2, customer.radius * 2);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.restore();
        EIA2_Endabgabe.customers = EIA2_Endabgabe.customers.filter(c => c !== customer);
        // Update the customer position and redraw the customer
        customer.position = newPosition;
        drawCustomer(customer);
    }
    EIA2_Endabgabe.moveCustomer = moveCustomer;
    // Starte das regelmäßige Erscheinen der Kunden
    spawnCustomer();
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=customer.js.map