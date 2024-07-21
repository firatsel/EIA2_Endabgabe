"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    class Order {
        positionX;
        constructor(_positionX) {
            this.positionX = _positionX;
        }
        drawOrder() {
            EIA2_Endabgabe.crc2.save();
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.fillStyle = "#EBEBE4";
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.rect(this.positionX, 40, 160, 100);
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.closePath();
            EIA2_Endabgabe.crc2.restore();
        }
    }
    EIA2_Endabgabe.Order = Order;
    function spawnOrder(newPosition) {
        let flavor = ["Mango", "Erdbeere", "Schokolade"];
        let topping = ["Kirsche", "Streusel"];
        if (newPosition.x == 150) {
            let textarea1 = document.getElementById('box1');
            textarea1.value = flavor[Math.floor(Math.random() * 3)];
            let textarea2 = document.getElementById('box2');
            textarea2.value = topping[Math.floor(Math.random() * 2)];
            let mood1 = document.getElementById('mood1');
            if (mood1) {
                mood1.value = "zufrieden";
                mood1.style.color = "#00ff00";
                // Change mood1 value after 5 seconds
                let timeoutID1 = setTimeout(() => {
                    mood1.value = "unzufrieden";
                    mood1.style.color = "#ff0000"; // Optional: Change color to indicate change
                }, 10000);
                let button1 = document.getElementById('button1');
                button1.addEventListener('click', () => {
                    // Retrieve textarea elements
                    clearTimeout(timeoutID1);
                });
            }
        }
        else if (newPosition.x == 990) {
            let textarea3 = document.getElementById('box3');
            textarea3.value = flavor[Math.floor(Math.random() * 3)];
            let textarea4 = document.getElementById('box4');
            textarea4.value = topping[Math.floor(Math.random() * 2)];
            let mood2 = document.getElementById('mood2');
            if (mood2) {
                mood2.value = "zufrieden";
                mood2.style.color = "#00ff00";
                // Change mood1 value after 5 seconds
                setTimeout(() => {
                    mood2.value = "unzufrieden";
                    mood2.style.color = "#ff0000"; // Optional: Change color to indicate change
                }, 10000);
            }
        }
        else if (newPosition.x == 1500) {
            let textarea5 = document.getElementById('box5');
            textarea5.value = flavor[Math.floor(Math.random() * 3)];
            let textarea6 = document.getElementById('box6');
            textarea6.value = topping[Math.floor(Math.random() * 2)];
            let mood3 = document.getElementById('mood3');
            if (mood3) {
                mood3.value = "zufrieden";
                mood3.style.color = "#00ff00";
                // Change mood1 value after 5 seconds
                setTimeout(() => {
                    mood3.value = "unzufrieden";
                    mood3.style.color = "#ff0000"; // Optional: Change color to indicate change
                }, 10000);
            }
        }
    }
    EIA2_Endabgabe.spawnOrder = spawnOrder;
    // Ensure this script runs after the DOM is fully loaded
    window.onload = () => {
        // Retrieve the button element
        const button1 = document.getElementById('button1');
        const button2 = document.getElementById('button2');
        const button3 = document.getElementById('button3');
        if (button1) {
            // Add click event listener to the button
            button1.addEventListener('click', () => {
                // Retrieve textarea elements
                let textarea1 = document.getElementById('box1');
                let textarea2 = document.getElementById('box2');
                let textarea7 = document.getElementById('box7');
                let textarea8 = document.getElementById('box8');
                let earning = document.getElementById('earning');
                let mood1 = document.getElementById('mood1');
                if (mood1) {
                    mood1.value = "am essen";
                    mood1.style.color = "#00ff00";
                    // Change mood1 value after 5 seconds
                    setTimeout(() => {
                        mood1.value = "bezahlt";
                        mood1.style.color = "#ff0000"; // Optional: Change color to indicate change
                    }, 3000);
                }
                // Ensure textareas are not null before accessing their values
                if (textarea1.value == textarea7.value && textarea2.value == textarea8.value) {
                    // Assuming crc2 is a canvas 2D context that you have previously initialized
                    setTimeout(() => {
                        EIA2_Endabgabe.crc2.save();
                        EIA2_Endabgabe.crc2.clearRect(150 - 60, 220 - 60, 60 * 2, 60 * 2);
                        EIA2_Endabgabe.crc2.fillStyle = "#6B502C";
                        EIA2_Endabgabe.crc2.fillRect(150 - 60, 220 - 60, 60 * 2, 60 * 2);
                        EIA2_Endabgabe.crc2.fill();
                        EIA2_Endabgabe.crc2.restore();
                        textarea1.value = "";
                        textarea2.value = "";
                        mood1.value = "";
                        let currentEarning = parseInt(earning.value);
                        if (isNaN(currentEarning)) {
                            currentEarning = 0;
                        }
                        let x = currentEarning + 3;
                        earning.value = x.toString();
                    }, 5000);
                }
            });
        }
        if (button2) {
            // Add click event listener to the button
            button2.addEventListener('click', () => {
                // Retrieve textarea elements
                let textarea3 = document.getElementById('box3');
                let textarea4 = document.getElementById('box4');
                let textarea7 = document.getElementById('box7');
                let textarea8 = document.getElementById('box8');
                let earning1 = document.getElementById('earning');
                let mood2 = document.getElementById('mood2');
                if (mood2) {
                    mood2.value = "am essen";
                    mood2.style.color = "#00ff00";
                    // Change mood1 value after 5 seconds
                    setTimeout(() => {
                        mood2.value = "bezahlt";
                        mood2.style.color = "#ff0000"; // Optional: Change color to indicate change
                    }, 3000);
                }
                // Ensure textareas are not null before accessing their values
                if (textarea3.value == textarea7.value && textarea4.value == textarea8.value) {
                    // Assuming crc2 is a canvas 2D context that you have previously initialized
                    setTimeout(() => {
                        EIA2_Endabgabe.crc2.save();
                        EIA2_Endabgabe.crc2.clearRect(990 - 60, 220 - 60, 60 * 2, 60 * 2);
                        EIA2_Endabgabe.crc2.fillStyle = "#6B502C";
                        EIA2_Endabgabe.crc2.fillRect(990 - 60, 220 - 60, 60 * 2, 60 * 2);
                        EIA2_Endabgabe.crc2.fill();
                        EIA2_Endabgabe.crc2.restore();
                        textarea3.value = "";
                        textarea4.value = "";
                        mood2.value = "";
                    }, 5000);
                }
            });
        }
        if (button3) {
            // Add click event listener to the button
            button3.addEventListener('click', () => {
                // Retrieve textarea elements
                let textarea5 = document.getElementById('box5');
                let textarea6 = document.getElementById('box6');
                let textarea7 = document.getElementById('box7');
                let textarea8 = document.getElementById('box8');
                let earning1 = document.getElementById('earning');
                let mood3 = document.getElementById('mood3');
                if (mood3) {
                    mood3.value = "am essen";
                    mood3.style.color = "#00ff00";
                    // Change mood1 value after 5 seconds
                    setTimeout(() => {
                        mood3.value = "bezahlt";
                        mood3.style.color = "#ff0000"; // Optional: Change color to indicate change
                    }, 3000);
                }
                // Ensure textareas are not null before accessing their values
                if (textarea5.value == textarea7.value && textarea6.value == textarea8.value) {
                    // Assuming crc2 is a canvas 2D context that you have previously initialized
                    setTimeout(() => {
                        EIA2_Endabgabe.crc2.save();
                        EIA2_Endabgabe.crc2.clearRect(1500 - 60, 220 - 60, 60 * 2, 60 * 2);
                        EIA2_Endabgabe.crc2.fillStyle = "#6B502C";
                        EIA2_Endabgabe.crc2.fillRect(1500 - 60, 220 - 60, 60 * 2, 60 * 2);
                        EIA2_Endabgabe.crc2.fill();
                        EIA2_Endabgabe.crc2.restore();
                        textarea5.value = "";
                        textarea6.value = "";
                        mood3.value = "";
                    }, 5000);
                }
            });
        }
    };
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=order.js.map