import confetti from 'https://cdn.skypack.dev/canvas-confetti';

document.addEventListener("DOMContentLoaded", function () {
    var inputs = document.querySelectorAll("input");

    inputs.forEach(function (input, index) {
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus({ behavior: "smooth" });
                }
            }
        });
    });
});

let result;
const submit = document.getElementById("calculate-btn");
submit.addEventListener("click", function calculate() {
    let king_name = document.getElementById("king-name").value.trim();
    let queen_name = document.getElementById("queens-name").value.trim();
    let text_area = document.getElementById("text_area");

    if (!king_name || !queen_name) {
        text_area.innerHTML = "<p class='error-msg'>Please enter both names.</p>";
        return;
    }

    king_name = king_name.toLowerCase();
    queen_name = queen_name.toLowerCase();

    if ((king_name == "gershom benni" || king_name == "gershom" || king_name == "benni" || king_name == "gershombenni") &&
        (queen_name == "afeefa nasnin" || queen_name == "afeefa" || queen_name == "nasnin" || queen_name == "afeefanasnin")) {
        result = "Married";
    } else {
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
    }
});

submit.addEventListener("click", function render() {
    var king_name = document.getElementById("king-name").value;
    var queen_name = document.getElementById("queens-name").value;
    let text_area = document.getElementById("text_area");

    text_area.innerHTML = "<div class='spinner'></div>";

    setTimeout(() => {
        text_area.innerHTML = " ";
        text_area.innerHTML = '<img data-src="/images/heart.png" id="heart" loading="lazy" />';

        let img = document.querySelector('img[data-src]');

        if ('IntersectionObserver' in window) {
            let observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let img = entry.target;
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                });
            });

            observer.observe(img);
        } else {
            img.src = img.dataset.src;
        }

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
            document.getElementById('retry-btn').addEventListener('click', function retry() {
                location.href = location.href;
            });
        }, 3500);
    }, 1000);
});
