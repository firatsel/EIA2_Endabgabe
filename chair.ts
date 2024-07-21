namespace EIA2_Endabgabe {
    export class Chair {
        public positionX: number;

        constructor(_positionX: number) {
            this.positionX = _positionX;
        }

        public drawChair(): void { 
            crc2.save();
            crc2.beginPath();
            crc2.fillStyle = "#6B5837";
            crc2.rect(this.positionX + 30, 340, 80, 15);
            crc2.fill();
            crc2.fillStyle = "#6B5837";
            crc2.rect(this.positionX + 60, 200, 20, 150);
            crc2.fill();
            crc2.fillStyle = "#6B502C";
            crc2.rect(this.positionX, 160, 140, 120);
            crc2.fill();
            crc2.restore();
        }
    }
}