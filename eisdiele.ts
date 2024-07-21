namespace EIA2_Endabgabe {    

    export let crc2: CanvasRenderingContext2D; 
    window.addEventListener("load", handleLoad)

    export let moveables: Moveable[] = [];
    export let chairs: Chair[] = [];    
    export let tables: Table[] = [];
    export let order: Order[] = [];

    let imgData: ImageData;

    export function handleLoad() {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas) {
            console.error("Canvas not found!");
            return;
        }
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        drawBackground();
        drawBoxTablet();
        drawFlavor();
        drawTopping();
        drawWaffle();
        
        imgData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);

        chairs.push(new Chair(80));
        chairs.push(new Chair(990));
        chairs.push(new Chair(1500));

        tables.push(new Table(345));
        tables.push(new Table(1200));
        tables.push(new Table(1680));

        order.push(new Order(75));
        order.push(new Order(940));
        order.push(new Order(1410));

        for (let chair of chairs) {
            chair.drawChair();
          }

        for (let table of tables) {
            table.drawTable();
        }

        for (let orders of order) {
            orders.drawOrder();
        }
        
        

        // Add the event listener only after the canvas is initialized
        canvas.addEventListener("click", handleCustomerClick);
    }

    //DRAW-FUNCTIONS

    function drawBackground() {
        
        // WALL

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
    
        // DOOR 

        crc2.save();
        crc2.beginPath();
        crc2.fillStyle = "#C3D8E6";
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
    
        // FLOOR

        crc2.save();
        crc2.beginPath();
        crc2.fillStyle = "#CBCCCC";
        crc2.beginPath();
        crc2.rect(20, 300, 1840, 400);
        crc2.closePath();
        crc2.fill();
        crc2.restore();

        // COUNTER 

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

        // BOX TOPPING
        
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

        // BOX FLAVOR 

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