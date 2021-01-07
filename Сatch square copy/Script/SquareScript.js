let level = 1;
let timer = 2250;
let counter = 0;
let square = document.querySelector('.square');
let counterBlock = document.querySelector('.counter');
let levelBlock = document.querySelector('.level');
let enabled = Boolean;
document.querySelector('.start').addEventListener('click',  () => {
        squareMove()
        square.addEventListener('click', () => {
            if (enabled) {
                counter++;
                counterBlock.innerText = '';
                counterBlock.innerText = `Counter: ${counter}`;
                levelBlock.innerText = '';
                levelBlock.innerText = `Level: ${level}`;
                if (counter === 10) {
                    level++
                    timer -= 600
                    squareMove()
                }
                if (counter === 20) {
                    level++
                    timer -= 600;
                    squareMove()
                }
                if (counter === 30) {
                    level++
                    timer -= 600;
                    squareMove()
                }
                if (counter === 40) {
                    level++
                    timer -= 300;
                    squareMove()
                }
                if (counter === 50) {
                    level++
                    timer -= 100;
                }
            }
        })
})
function retVal(el) {
    if (el < 40) {
        for (let i = 0; i < 40; i++) {
            if (el === i) {
                return Number(el - i)
            }
        }
    } else {
        return Number(el - 40)
    }
}
function squareMove() {
    setInterval(function () {
        if (enabled) {
            let RelativePositionX = Math.floor(Math.random() * window.outerWidth);
            let RelativePositionY = Math.floor(Math.random() * window.outerHeight);
            let positionX = retVal(RelativePositionX);
            let positionY = retVal(RelativePositionY);
            square.style.top = `${positionY}px`
            square.style.left = `${positionX}px`
        }
    }, timer);
}