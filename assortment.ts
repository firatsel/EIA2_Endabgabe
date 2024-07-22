namespace EIA2_Endabgabe {
    
    export interface Box {
        x: number;
        y: number;
        width: number;
        height: number;
        fillStyle: string;
        label: string; 
        textareaId: string; 
        isTopHalf: boolean;
        price: number; 
    }

    // Eissorten mit Preisen
    export let flavorBoxes: Box[] = [
        { x: 1410, y: 510, width: 130, height: 140, fillStyle: "#856130", label: "Schokolade", textareaId: 'box10', isTopHalf: true, price: 1 },
        { x: 1410, y: 650, width: 130, height: 140, fillStyle: "#856130", label: "Schokolade", textareaId: 'box11', isTopHalf: false, price: 1 },
        { x: 1210, y: 510, width: 130, height: 140, fillStyle: "#FF9588", label: "Erdbeere", textareaId: 'box10', isTopHalf: true, price: 1 },
        { x: 1210, y: 650, width: 130, height: 140, fillStyle: "#FF9588", label: "Erdbeere", textareaId: 'box11', isTopHalf: false, price: 1 },
        { x: 1010, y: 510, width: 130, height: 140, fillStyle: "#F5E783", label: "Mango", textareaId: 'box10', isTopHalf: true, price: 1 },
        { x: 1010, y: 650, width: 130, height: 140, fillStyle: "#F5E783", label: "Mango", textareaId: 'box11', isTopHalf: false, price: 1 }
    ];

    // Toppings mit Preisen
    export let toppingBoxes: Box[] = [
        { x: 875, y: 570, width: 20, height: 20, fillStyle: "#CE2D1E", label: "Kirsche", textareaId: 'box12', isTopHalf: true, price: 0.5 },
        { x: 875, y: 700, width: 10, height: 60, fillStyle: "#ffffff", label: "Streusel", textareaId: 'box12', isTopHalf: true, price: 0.2 }
    ];

    // Eissorten draw-Funktion
    export function drawFlavor() {
        let canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        crc2.save();
        crc2.beginPath();
        flavorBoxes.forEach(box => {
            crc2.fillStyle = box.fillStyle;
            crc2.beginPath();
            crc2.rect(box.x, box.y, box.width, box.height);
            crc2.fill();
        });
        crc2.closePath();
        crc2.restore();

        // Event-Listener für Klick der Eissorten
        document.addEventListener('click', (event) => {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left; 
            let y = event.clientY - rect.top;

            flavorBoxes.forEach((box) => {
                // überprüft, ob der Klick innerhalb der Box liegt
                if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
                    // prüft, ob der Klick in der oberen Hälfte der Box liegt
                    if (box.isTopHalf && y <= box.y + box.height / 2) {
                        updateTextArea(box.textareaId, box.label); 
                    } else if (!box.isTopHalf && y > box.y + box.height / 2) {
                        updateTextArea(box.textareaId, box.label); 
                    }
                }
            });
        });
    }

    // Topping wird gezeichnet
    export function drawTopping() {
        let canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        crc2.save();
        crc2.beginPath();
        toppingBoxes.forEach(box => {
            crc2.fillStyle = box.fillStyle; 
            if (box.width === 10) {
                crc2.rect(box.x, box.y, box.width, box.height); 
            } if (box.width === 20) {
                crc2.ellipse(box.x, box.y, 10, 10, 0, 0, 2 * Math.PI); 
            }
            crc2.fill(); 
        });
        crc2.closePath();
        crc2.restore();

        // Event-Listener für Klicks der Toppings
        document.addEventListener('click', (event) => {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;

            toppingBoxes.forEach((box) => {
                // überprüft, ob der Klick innerhalb der Box ist
                if (box.width === 10) {
                    if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
                        updateTextArea(box.textareaId, box.label);
                    }
                } else {
                    if (x >= box.x - 10 && x <= box.x + 10 && y >= box.y - 10 && y <= box.y + 10) {
                        updateTextArea(box.textareaId, box.label);
                    }
                }
            });
        });
    }

    // aktualisiert textarea mit label der Box
    function updateTextArea(textareaId: string, label: string) {
        let textarea = document.getElementById(textareaId) as HTMLTextAreaElement | null;
        if (textarea) {
            textarea.value = label;
        }
    }

    // Waffel wird gezeichnet
    export function drawWaffle() {
        crc2.save();
        crc2.beginPath();
        crc2.fillStyle = "#B88742"; 
        crc2.moveTo(550, 660);
        crc2.lineTo(570, 570); 
        crc2.lineTo(530, 570); 
        crc2.fill(); 
        crc2.closePath();
        crc2.restore();
    }
}
