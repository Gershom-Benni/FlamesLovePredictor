import confetti from 'https://cdn.skypack.dev/canvas-confetti';
document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll("input");

    inputs.forEach(function(input, index) {
      input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          } 
        }
      });
    });
  });
  
let result;
const submit = document.getElementById("calculate-btn");
submit.addEventListener("click", function calculate() {
    let king_name = document.getElementById("king-name").value;
    let queen_name = document.getElementById("queens-name").value;
    let text_area = document.getElementById("text_area");
    king_name = king_name.toLowerCase();
    queen_name = queen_name.toLowerCase();
    
    for (let char of king_name) {
        if (queen_name.includes(char)) {
            king_name = king_name.replace(char, '');
            queen_name = queen_name.replace(char, '');
        }
    }
    
    let count = king_name.length + queen_name.length;
    
    let flames = ['Friends', 'in Love', 'in Affection', 'Married', 'Enemies', 'Cousins'];
    
    while (flames.length > 1) {
        let index = (count % flames.length) - 1;
        if (index === -1) {
            index = flames.length - 1;
        }
        flames = flames.slice(index + 1).concat(flames.slice(0, index));
    }
    
    result = flames[0];
});


submit.addEventListener("click",function render(){
    var king_name = document.getElementById("king-name").value;
  var queen_name = document.getElementById("queens-name").value;
    // text_area.style.display = "none";
    text_area.innerHTML = " ";
    text_area.innerHTML = '<img src="/images/heart.png" loading="lazy" id="heart" />';
    setInterval(function () {
        text_area.innerHTML = " ";
        text_area.innerHTML = `<p class="rendered_king_name">${king_name}</p>`;
        text_area.innerHTML += '<p class="rendered_para">and</p>';
        text_area.innerHTML += `<p class="rendered_queen_name">${queen_name}</p>`;
        text_area.innerHTML += '<p class="rendered_para">will be</p>';
        text_area.innerHTML += `<p class="rendered_result">${result}</p>`;
        text_area.innerHTML += '<p class="rendered_para">Forever</p>';
        confetti();
        text_area.innerHTML += '<button id="retry-btn">Try Again</button>';
        document.getElementById('retry-btn').addEventListener('click',function retry(){
          location.href = location.href;
        });
    }, 3500);
});
