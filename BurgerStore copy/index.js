

class GoodsItem {
    constructor(id = 1, title = 'product', price = 0, image = 'https://placehold.it/200x150') {
        this.title = title;
        this.price = price;
        this.image = image;
        this.id = id;
    }

    createEl(animate) {
        return `<div class = "product animate__animated animate__${animate}" id = '${this.id}'>
         <img class="product__image" src="${this.image}" alt="image">
         <h3>${this.title}</h3>
         <p class="product__price">${this.price}</p>
         <button  class="product__button" id = "button${this.id}">Add to cart</button>
         </div>`;
    }
}
class ItemCart extends GoodsItem {
    constructor(id, title, price , image, counter = 1) {
        super(id, title, price, image);
        this.counter = counter
    }
    createCartEl () {
         return `<div class="product__cart product__cart${this.id}" id = '${this.id}'>
        <img class="product__imageCart" src="${this.image}" alt="image">
        <div class="product__Cart__rightBlock">
        <h3>${this.title}</h3>
        <p class="product__price">Unit price $${this.price}</p> 
        <p id = 'counter${this.id} '>Count ${this.counter}</p>
        </div>
        <button class="product__cart__delButton" id="${this.id}">x</button>
        </div>`;
    }
}

class GoodsList {
    constructor(urlOfItem, urlOfCart) {
        this.API = 'https://raw.githubusercontent.com/Roman658/Git-Server/master/';
        this.handlerProductItem = this.makeGETRequest(urlOfItem, "this.goods");
       // this.handlerProductCart = this.makeGETRequest(urlOfCart, "this.goods");
        this.addedToCart = [] // корзина товаров
        this.goods = null; // все товары
    }

    /**
     * Функция обрабатывает полученные данные в формате JSON  и возвращает обьект.
     * Урок 3, задание 3.
     * @returns {Promise<void>}
     */
    makeGETRequest(url, place) {
      fetch(this.API + url)
          .then(result => {return result.json()})
          .then((data) => {
              if (place === "this.goods") {
                  this.goods = data;
              } else if (place === "this.addedToCart") {
                  this.addedToCart = data;
              }
              this.render(850, 'backInUp' )
              this.addToCart()
              this.deleteProductFromCart()
          })
          .catch(() => {
              if (place === this.goods) {
                  document.querySelector('.products').insertAdjacentHTML('afterbegin',
                      '<p>Failed to connect to the server, possibly there is no internet connection.</p>')
              }
        })
        }
    /**
     * Функция создает HTML разметку взяв за основу данные обьектов полученных c массива-родителя.
     * Переберает массив и добавляет id2 в каждый обьект с числовым значением расположения элемента для дальнейших манипуляций с ним.
     */
    render(timeout, animate) {
        setTimeout(function () {
            let quantity = document.getElementsByClassName('product').length - 1;
            for (let i = 0; i <= quantity; i++) {
                document.getElementsByClassName('product')[i].classList.toggle('animate__animated')
            }
        },timeout + 1000)
        setTimeout( () => {
            this.goods.forEach((el) => {
                el.id2 = this.goods.indexOf(el)
            })
            document.querySelector('.products').insertAdjacentHTML
            ('afterbegin', this.goods.map(item => new GoodsItem(item.id, item.title, item.price, item.image).createEl(animate)).join(''));
        }, timeout)
    }
    /**
     * Функция
     */
    productCartCounter() {
        if (this.addedToCart.length === 0) {
            document.getElementById('counter').classList.toggle('headerBlock__blockBasket__counter');
            document.getElementById('counter').classList.toggle('animate__fadeInTopRight');
            document.querySelector('.headerBlock__blockBasket__bottomBlock').style.opacity = '0';
            document.querySelector('.headerBlock__blockBasket__bottomBlock__decorArrow').style.opacity = '0';
            document.getElementById('counter').textContent = '';
        } else if (this.addedToCart.length > 0) {
            document.getElementById('counter').textContent = `${this.addedToCart.length}`;
            document.querySelector('.headerBlock__blockBasket__bottomBlock').style.opacity = '1';
            document.querySelector('.headerBlock__blockBasket__bottomBlock__decorArrow').style.opacity = '1';
        }
    }

    sumPrice() {
        document.querySelector('.headerBlock__blockBasket__bottomBlock__totalPrice').innerHTML = "";
        let sum = this.addedToCart.reduce(function (prevValue, currentValue ) {
            return prevValue + (currentValue.price * currentValue.counter)
        }, 0)
        document.querySelector('.headerBlock__blockBasket__bottomBlock__totalPrice')
            .insertAdjacentHTML('afterbegin', `Total price ${sum}`)
    }

    deleteProductFromCart() {
        document.querySelector('.headerBlock__blockBasket__bottomBlock').addEventListener('click', (event) => {
            let target = event.target;
            if (target.tagName === 'BUTTON') {
                // document.querySelector(`.product__cart${String(target.id)}`).remove();
                document.querySelector(`.product__cart${target.id}`).classList.add('animate__animated','animate__backOutRight' )
                setTimeout( () =>{
                    document.querySelector(`.product__cart${target.id}`).remove()
                    let deleteIndex = this.addedToCart.findIndex(i => i.id === Number(target.id))
                    this.addedToCart.splice(deleteIndex, 1)
                    this.sumPrice()
                    this.productCartCounter()
                }, 400);
            }
        })
    }

    addToCart() {
        this.goods.forEach((element) => {
           if( element.hasOwnProperty("counter") === false) {
               element.counter = 1
           }
        })
        this.sorting('.sortFromBiggerButton', 'fromBigger')
        this.sorting('.sortFromSmallestButton', 'fromSmallest')
        const quickAdd = (position) => {
            let i = Number(position);
            document.querySelector('.headerBlock__blockBasket__bottomBlock').insertAdjacentHTML
            ('afterbegin', new ItemCart(this.addedToCart[i].id, this.addedToCart[i].title, this.addedToCart[i].price, this.addedToCart[i].image,this.addedToCart[i].counter).createCartEl());
        }
        const add = (position, targetIDString, Id) => {
            document.querySelector('.products').addEventListener('click', (event) => {
                let target = event.target
                if (target.id === targetIDString && this.addedToCart.some(elem => elem.id === Id) === false) {
                    this.productCartCounter()
                    let b = this.goods.findIndex(x => x.id === Id);
                    this.addedToCart.push(this.goods[b])
                    this.productCartCounter()
                    let a = this.addedToCart.findIndex(x => x.id === Id);
                    quickAdd(a)
                    this.sumPrice()
                } else if (this.addedToCart.some(elem => elem.id === Id) === true && target.id === targetIDString) {
                    let a = this.addedToCart.findIndex(x => x.id === Id);
                    this.addedToCart[a].counter++
                    document.querySelector(`.product__cart${Id}`).remove()
                    quickAdd(a)
                    this.sumPrice()
                }
            })
        }
           this.goods.forEach((el) => {
                add(el.id2, `button${el.id}`, el.id)
            })
    }

    /**
     *
     * @param clickButton - селектор кнопки
     * @param el - может принимаить два аргумента:
     * 'fromBigger' - сортировка от большего,
     * 'fromSmallest' - сортировка от меньшего.
     */
    sorting(clickButton, el ) {
        document.querySelector(clickButton).addEventListener('click',   () => {
            document.querySelector('.products').classList.add('animate__zoomOutDown');
            setTimeout( () => {
                let removeEl = document.getElementsByClassName('product');
                while (removeEl[0]) {
                    removeEl[0].parentNode.removeChild(removeEl[0]);
                }
                if (String(el) === 'fromBigger') {
                    this.goods.sort(function (a, b) {
                        return b.price - a.price
                    })
                } else if (el === 'fromSmallest') {
                    this.goods.sort(function (a, b) {
                        return a.price - b.price
                    })
                }
                document.querySelector('.products').classList.remove( 'animate__zoomOutDown');
            }, 850);
            this.render(1000, 'zoomInUp')
        })
    }
}
let rend = new GoodsList('Burger%20priducts.json');
