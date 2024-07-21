"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    function drawFlavor() {
        let canvas = document.querySelector("canvas");
        EIA2_Endabgabe.crc2 = canvas.getContext("2d");
        let boxes = [
            { x: 1410, y: 510, width: 130, height: 280, fillStyle: "#856130" },
            { x: 1210, y: 510, width: 130, height: 280, fillStyle: "#FF9588" },
            { x: 1010, y: 510, width: 130, height: 280, fillStyle: "#F5E783" }
        ];
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        boxes.forEach(box => {
            EIA2_Endabgabe.crc2.fillStyle = box.fillStyle;
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.rect(box.x, box.y, box.width, box.height);
            EIA2_Endabgabe.crc2.fill();
        });
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
        document.addEventListener('click', (event) => {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            boxes.forEach((box) => {
                if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
                    EIA2_Endabgabe.crc2.beginPath();
                    EIA2_Endabgabe.crc2.fillStyle = box.fillStyle;
                    let textarea7 = document.getElementById('box7');
                    if (box.fillStyle == "#856130") {
                        // Machen Sie etwas mit textarea1, z.B. den Wert lesen oder ändern
                        textarea7.value = "Schokolade";
                    }
                    else if (box.fillStyle == "#FF9588") {
                        textarea7.value = "Erdbeere";
                    }
                    else if (box.fillStyle == "#F5E783") {
                        textarea7.value = "Mango";
                    }
                    EIA2_Endabgabe.crc2.ellipse(550, 570, 20, 20, 0, 0, 2 * Math.PI);
                    EIA2_Endabgabe.crc2.fill();
                    EIA2_Endabgabe.crc2.closePath();
                    EIA2_Endabgabe.crc2.restore();
                }
            });
        });
    }
    EIA2_Endabgabe.drawFlavor = drawFlavor;
    function drawTopping() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let boxes = [
            { x: 850, y: 540, width: 20, height: 20, fillStyle: "#F05954" },
            { x: 890, y: 740, width: 2, height: 20, fillStyle: "#ADECD2" }
        ];
        crc2.save();
        crc2.beginPath();
        boxes.forEach(box => {
            crc2.fillStyle = box.fillStyle;
            if (box.width === 2) {
                crc2.rect(box.x, box.y, box.width, box.height);
            }
            else {
                crc2.ellipse(box.x, box.y, 10, 10, 0, 0, 2 * Math.PI);
            }
            crc2.fill();
        });
        crc2.closePath();
        crc2.restore();
        document.addEventListener('click', (event) => {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            boxes.forEach((box) => {
                if (box.width === 2) {
                    if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
                        crc2.beginPath();
                        crc2.fillStyle = box.fillStyle;
                        let textarea8 = document.getElementById('box8');
                        textarea8.value = "Streusel";
                        crc2.rect(550, 560, 2, 15);
                        crc2.fill();
                        crc2.closePath();
                        crc2.restore();
                    }
                }
                else {
                    if (x >= box.x - 10 && x <= box.x + 10 && y >= box.y - 10 && y <= box.y + 10) {
                        crc2.beginPath();
                        crc2.fillStyle = box.fillStyle;
                        let textarea8 = document.getElementById('box8');
                        textarea8.value = "Kirsche";
                        crc2.ellipse(550, 550, 10, 10, 0, 0, 2 * Math.PI);
                        crc2.fill();
                        crc2.closePath();
                        crc2.restore();
                    }
                }
            });
        });
    }
    EIA2_Endabgabe.drawTopping = drawTopping;
    function drawWaffle() {
        EIA2_Endabgabe.crc2.save();
        EIA2_Endabgabe.crc2.beginPath();
        EIA2_Endabgabe.crc2.fillStyle = "#B88742";
        EIA2_Endabgabe.crc2.moveTo(550, 660);
        EIA2_Endabgabe.crc2.lineTo(570, 570);
        EIA2_Endabgabe.crc2.lineTo(530, 570);
        EIA2_Endabgabe.crc2.fill();
        EIA2_Endabgabe.crc2.closePath();
        EIA2_Endabgabe.crc2.restore();
    }
    EIA2_Endabgabe.drawWaffle = drawWaffle;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=assortment.js.map