namespace EIA2_Endabgabe {    

    // Globale Variable für den Canvas Rendering Context
    export let crc2: CanvasRenderingContext2D; 
    // Fügt einen Event-Listener hinzu, der die Funktion `handleLoad` aufruft, wenn die Seite geladen wird
    window.addEventListener("load", handleLoad)

    // Arrays zur Speicherung von Stühlen, Tischen, Bestellungen und beweglichen Objekten
    export let chairs: Chair[] = [];    
    export let tables: Table[] = [];
    export let order: Order[] = [];

    // Funktion, die beim Laden der Seite aufgerufen wird
    export function handleLoad() {

        // Sucht das Canvas-Element im DOM
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");

        // Überprüft, ob das Canvas-Element vorhanden ist
        if (!canvas) {
            console.error("Canvas not found!");
            return;
        }

        // Ruft den 2D-Zeichen-Kontext des Canvas ab
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        // Setzt die Canvas-Größe auf die Fenstergröße
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Zeichnet Hintergrund und verschiedene Boxen
        drawBackground();
        drawBoxTablet();
        drawFlavor();
        drawTopping();
        drawWaffle();
        
        // Erstellt Stühle und fügt sie zum Stuhl-Array hinzu
        chairs.push(new Chair(80));
        chairs.push(new Chair(950));
        chairs.push(new Chair(1400));

        // Erstellt Tische und fügt sie zum Tisch-Array hinzu
        tables.push(new Table(345));
        tables.push(new Table(1200));
        tables.push(new Table(1680));

        // Erstellt Bestellungen und fügt sie zum Bestell-Array hinzu
        order.push(new Order(75));
        order.push(new Order(940));
        order.push(new Order(1410));

        // Zeichnet alle Stühle, Tische und Bestellungen
        for (let chair of chairs) {
            chair.drawChair();
          }
        for (let table of tables) {
            table.drawTable();
        }
        for (let orders of order) {
            orders.drawOrder();
        }
        
        

        // Fügt einen Event-Listener für Klicks auf das Canvas hinzu
        canvas.addEventListener("click", handleCustomerClick);
    }

    // Funktion zum Zeichnen des Hintergrunds

    function drawBackground() {
        
        // Wand

        crc2.save();
        crc2.beginPath();
        crc2.fillStyle = "#6DC9B2";
        crc2.beginPath();
        crc2.rect(20, 20, 1840, 700);
        crc2.closePath();
        crc2.fill();
        crc2.restore();
    
        crc2.save();
        crc2.beginPath();
        crc2.fillStyle = "#018CCD";
        crc2.beginPath();
        crc2.rect(20, 170, 1840, 400);
        crc2.fill();
        crc2.fillStyle = "#00A8AB";
        crc2.beginPath();
        crc2.rect(20, 170, 1840, 10);
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    
        // Tür 

        crc2.save();
        crc2.beginPath();
        crc2.fillStyle = "#6B502C";
        crc2.beginPath();
        crc2.rect(500, 20, 400, 400);
        crc2.fill();
        crc2.fillStyle = "#ADC2E6";
        crc2.beginPath();
        crc2.rect(500, 20, 10, 300);
        crc2.fill();
        crc2.fillStyle = "#ADC2E6";
        crc2.beginPath();
        crc2.rect(900, 20, 10, 300);
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    
        // Flur

        crc2.save();
        crc2.beginPath();
        crc2.fillStyle = "#CBCCCC";
        crc2.beginPath();
        crc2.rect(20, 300, 1840, 400);
        crc2.closePath();
        crc2.fill();
        crc2.restore();

        // Theke 

        crc2.save();
        crc2.beginPath();
        crc2.fillStyle = "#BB8D44";
        crc2.beginPath();
        crc2.rect(20, 450, 1840, 370);
        crc2.fill();
        crc2.fillStyle = "#9E5524";
        crc2.beginPath();
        crc2.rect(20, 440, 1840, 30);
        crc2.fill();
        crc2.closePath();
        crc2.restore();

        // Boxen für Toppings
        
        crc2.save();
        crc2.beginPath();
        crc2.fillStyle = "#9E5524";
        crc2.beginPath();
        crc2.rect(800, 660, 150, 140);
        crc2.fill();

        crc2.fillStyle = "#9E5524";
        crc2.beginPath();
        crc2.rect(800, 500, 150, 140);
        crc2.fill();

        crc2.closePath();
        crc2.restore();

        // Boxen für Geschmacksrichtungen 

        crc2.save();
        crc2.beginPath();

        crc2.fillStyle = "#9E5524";
        crc2.beginPath();
        crc2.rect(1400, 500, 150, 300);
        crc2.fill();

        crc2.fillStyle = "#9E5524";
        crc2.beginPath();
        crc2.rect(1200, 500, 150, 300);
        crc2.fill();

        crc2.fillStyle = "#9E5524";
        crc2.beginPath();
        crc2.rect(1000, 500, 150, 300);
        crc2.fill();

        crc2.closePath();
        crc2.restore();
    }

    export function drawBoxTablet() {
        crc2.save();
        crc2.beginPath();

        crc2.fillStyle = "#EBEBE4";
        crc2.beginPath();
        crc2.rect(400, 500, 300, 180);
        crc2.fill();

        crc2.closePath();
        crc2.restore();

    }

    

}