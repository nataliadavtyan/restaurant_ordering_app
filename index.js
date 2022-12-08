import { menuArray } from "/data.js"

const orderContainer = document.getElementById('order-container')
const orderListContainer = document.getElementById('order-list-container')
const totalPriceEl = document.getElementById('total-price')
const completOrderBtn = document.getElementById('complete-order-btn')
const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-button')
const checkoutForm = document.getElementById('checkout-form')
const thankYouMessageEl = document.getElementById('thank-you-message')

let orderArray = []
let totalPrice = 0


// ---------- Submit the form, render the thank you message 
// and ready to place a new order ----------
checkoutForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const checkoutFormData = new FormData(checkoutForm)
    const name = checkoutFormData.get('customerName')
    
    modal.classList.add('hidden')
    orderContainer.classList.add('hidden')
    
    thankYouMessageEl.classList.remove('hidden')
    thankYouMessageEl.innerHTML = `
            <div>Thanks, ${name}! Your order is on its way!</div>
        `
    
    setTimeout(function(){
        thankYouMessageEl.classList.add('hidden')
        checkoutForm.reset()
    }, 2000)
    
    orderArray = []
    totalPrice = 0

    console.log(orderArray)
    console.log(totalPrice)
})


// ---------- Show and hide modal ----------
completOrderBtn.addEventListener('click', function(){
    modal.classList.remove('hidden')
})

modalCloseBtn.addEventListener('click', function(){
    modal.classList.add('hidden')
})


// ---------- "+" and "remove" buttons' event listeners ----------
document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        renderOrder(e.target.dataset.add)
    }
    else if (e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    } 
})


// ---------- Remove item from the order ----------
function removeItem(itemIndex){
    orderArray.splice(itemIndex, 1)
    let orderHtml = ''
    orderArray.forEach(function(item, index){
        orderHtml += `
            <div class="order-list-item">
                <h3 class="order-item-name">${item.name}</h3>
                <button class="remove-item-btn" data-remove="${index}">remove</button>
                <p class="order-item-price item-price">$${item.price}</p>
            </div>
        `
    })
    orderListContainer.innerHTML = orderHtml
    totalPriceEl.textContent = "$" + getTotalPrice()
    if (orderArray.length === 0) {
        orderContainer.classList.add('hidden')
    }
}


// ---------- Add item to the order and render order ----------
function renderOrder(itemId){
    orderListContainer.innerHTML = getOrderHtml(itemId)
    totalPriceEl.textContent = "$" + getTotalPrice()
    if (orderArray.length > 0) {
        orderContainer.classList.remove('hidden')
    }
}

function getTotalPrice(){
    totalPrice = 0
    orderArray.forEach(function(item){
        totalPrice += item.price
    })
    return totalPrice
}

function getOrderHtml(itemId){
    addItemToOrderArray(itemId)
    let orderHtml = ''
    orderArray.forEach(function(item, index){
        orderHtml += `
            <div class="order-list-item">
                <h3 class="order-item-name">${item.name}</h3>
                <button class="remove-item-btn" data-remove="${index}">remove</button>
                <p class="order-item-price item-price">$${item.price}</p>
            </div>
        `
    })
    return orderHtml
}

function addItemToOrderArray(itemId){
    const targetItemObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    orderArray.push(targetItemObj)
}


// ---------- Render the menu ----------
function renderMenu() {
    document.getElementById('menu').innerHTML = getMenuHtml()
}

function getMenuHtml() {
    let menuItemHtml = ''
    menuArray.forEach(function(item){
        menuItemHtml += `
            <div class="menu-item-container">
                <span class="item-emoji">${item.emoji}</span>
                <div class="item-description">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-ingredients">${item.ingredients}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
                <button class="add-item-btn" data-add="${item.id}">+</button>
            </div>
        `
    })
    return menuItemHtml
}

renderMenu()