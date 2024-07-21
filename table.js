"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    class Table {
        positionX;
        constructor(_positionX) {
            this.positionX = _positionX;
        }
        drawTable() {
            EIA2_Endabgabe.crc2.save();
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.fillStyle = "#6B5837";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.rect(this.positionX + 5, 150, 20, 200);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "#FFFFFF";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.ellipse(this.positionX + 15, 140, 100, 30, 0, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "lightgrey";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.rect(this.positionX, 90, 30, 50);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "lightgrey";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.ellipse(this.positionX + 15, 115, 25, 25, 0, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "#4E9556";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.rect(this.positionX + 10, 50, 10, 40);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "white";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.ellipse(this.positionX + 5, 40, 10, 10, 0, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "white";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.ellipse(this.positionX + 25, 60, 10, 10, 0, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "white";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.ellipse(this.positionX + 5, 60, 10, 10, 0, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "white";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.ellipse(this.positionX + 25, 40, 10, 10, 0, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.fillStyle = "#EBDE61";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.ellipse(this.positionX + 15, 50, 10, 10, 0, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.closePath();
            EIA2_Endabgabe.crc2.restore();
        }
    }
    EIA2_Endabgabe.Table = Table;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=table.js.map