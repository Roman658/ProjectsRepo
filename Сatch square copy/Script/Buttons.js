let InscriptionGameStart = document.querySelector('.gameStarted');
let InscriptionGameOver = document.querySelector('.gameOver');
let OnOff = 0;
function visibleInvisible (selector, time) {
    selector.style.opacity = '1';
    selector.style.display = 'block';
    setTimeout(function () {
        selector.style.opacity = '0';
    }, time)
    setTimeout(function () {
        selector.style.display = 'none';
    }, time + 400)
}
document.querySelector('.start').addEventListener('click', () => {
    if (OnOff === 0) {
        enabled = true;
        visibleInvisible(InscriptionGameStart, timer)
        OnOff++
    }

})
document.querySelector('.theEnd').addEventListener('click', () => {
    if (OnOff === 1) {
        enabled = false;
        OnOff--
    }
})