window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.sortFromSmallestButton').classList.add('animate__animated', 'animate__backInDown');
    setTimeout(function () {document.querySelector('.sortFromBiggerButton')
        .classList.add('animate__animated', 'animate__backInDown'); document.querySelector('.sortFromSmallestButton')
        .style.opacity = '1'}, 500);
    setTimeout(function () {document.querySelector('.headerBlock__blockBasket__button')
        .classList.add('animate__animated', 'animate__backInRight'); document.querySelector('.headerBlock__blockBasket__button')
        .style.opacity = '0'}, 850);
    document.querySelector('.headerBlock').style.opacity = '1';
    setTimeout(function () {document.querySelector('.headerBlock__searchLine')
        .classList.add('animate__animated', 'animate__backInLeft'); document.querySelector('.headerBlock__searchLine')
        .style.opacity = '0'},850);
})

document.querySelector('.headerBlock').addEventListener('click', (event) => {
 let a = event.target;
 console.log(a)
 if (a.id === 'topButt3') {
     document.querySelector('.headerBlock__blockBasket__bottomBlock').classList.toggle('invisible');
     document.querySelector('.headerBlock__blockBasket__bottomBlock__decorArrow').classList.toggle('invisible');
 }
})
