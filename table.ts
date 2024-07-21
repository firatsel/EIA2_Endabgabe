namespace EIA2_Endabgabe {

    export class Table {
        positionX: number;

        constructor(_positionX: number) {
            this.positionX = _positionX;
        }

        public drawTable() { 
            crc2.save();
            crc2.beginPath();
            
            crc2.fillStyle = "#6B5837";
            crc2.beginPath();
            crc2.rect(this.positionX +5, 150, 20, 200);
            crc2.fill();

            crc2.fillStyle = "#FFFFFF";
            crc2.beginPath();
            crc2.ellipse(this.positionX + 15, 140, 100, 30, 0, 0, 2* Math.PI);
            crc2.fill();

            crc2.fillStyle = "lightgrey";
            crc2.beginPath();
            crc2.rect(this.positionX, 90, 30, 50);
            crc2.fill();

            crc2.fillStyle = "lightgrey";
            crc2.beginPath();
            crc2.ellipse(this.positionX + 15, 115, 25, 25, 0, 0, 2* Math.PI);
            crc2.fill();

            crc2.fillStyle = "#4E9556";
            crc2.beginPath();
            crc2.rect(this.positionX + 10, 50, 10, 40);
            crc2.fill();

            crc2.fillStyle = "white";
            crc2.beginPath();
            crc2.ellipse(this.positionX + 5, 40, 10, 10, 0, 0, 2* Math.PI);
            crc2.fill();

            crc2.fillStyle = "white";
            crc2.beginPath();
            crc2.ellipse(this.positionX + 25, 60, 10, 10, 0, 0, 2* Math.PI);
            crc2.fill();

            crc2.fillStyle = "white";
            crc2.beginPath();
            crc2.ellipse(this.positionX + 5, 60, 10, 10, 0, 0, 2* Math.PI);
            crc2.fill();

            crc2.fillStyle = "white";
            crc2.beginPath();
            crc2.ellipse(this.positionX + 25, 40, 10, 10, 0, 0, 2* Math.PI);
            crc2.fill();

            crc2.fillStyle = "#EBDE61";
            crc2.beginPath();
            crc2.ellipse(this.positionX + 15, 50, 10, 10, 0, 0, 2* Math.PI);
            crc2.fill();

            crc2.closePath();
            crc2.restore();
        }
    }
}