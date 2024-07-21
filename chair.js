"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    class Chair {
        positionX;
        constructor(_positionX) {
            this.positionX = _positionX;
        }
        drawChair() {
            EIA2_Endabgabe.crc2.save();
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.fillStyle = "#6B5837";
            EIA2_Endabgabe.crc2.rect(this.positionX + 30, 340, 80, 15);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "#6B5837";
            EIA2_Endabgabe.crc2.rect(this.positionX + 60, 200, 20, 150);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "#6B502C";
            EIA2_Endabgabe.crc2.rect(this.positionX, 160, 140, 120);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.restore();
        }
    }
    EIA2_Endabgabe.Chair = Chair;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=chair.js.map