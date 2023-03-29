
// Cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let btnCloseIcon = document.querySelector('#btn-close-cart');
let btnMenu = document.querySelector('#menu-icon');
let menu = document.querySelector('.category-nav');

let foco = document.getElementsByClassName("focus")[0];

cartIcon.onclick = () => {
    
    if(cart.classList.contains("active")){
        cart.classList.remove("active");
        foco.style.visibility = "hidden";
    } else {
        cart.classList.add("active");
        foco.style.visibility = "visible";
    }

}

btnCloseIcon.onclick = () => {
    cart.classList.remove("active");
    foco.style.visibility = "hidden";
}

btnMenu.onclick = () => {

    if(menu.classList.contains("active")){
        menu.classList.remove("active");
    } else {
        menu.classList.add("active");
    }
    
}


// if(window.screen.width >= 600){


// Cart Working JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

// Making Function When Loaded
function ready(){
    var shopContent = document.getElementsByClassName("shop-container")[0];
    var shopContentNews = document.getElementsByClassName("news-products")[0];
    
    // getting the products to fill the content
    fetch("../repo.json").then(result => {return result.json()}).then(data => {
        var productList = data.products;

        Object.keys(productList).forEach(product => {
            var productBox = document.createElement('div');
            productBox.classList.add('product-box');

            var productBoxNews = document.createElement('div');
            productBoxNews.classList.add('product-box');

            var productBoxes = `
                            <img src="${productList[product].metadata.url}" alt="${productList[product].name}" class="product-img">
                            <h2 class="product-title">${productList[product].name}</h2>
                            <span class="product-price">${productList[product].price}</span>
                            <i class='bx bx-shopping-bag add-cart'></i>
            `;
            

            // NEWS
            if(productList[product].news == true){
                var productNewsBoxes = `
                    <img src="${productList[product].metadata.url}" alt="${productList[product].name}" class="product-img">
                    <h2 class="product-title">${productList[product].name}</h2>
                    <span class="product-price">${productList[product].price}</span>
                    <i class='bx bx-shopping-bag add-cart'></i>
                `;

                productBoxNews.innerHTML = productNewsBoxes;

                shopContentNews.append(productBoxNews);

                productBoxNews.getElementsByClassName("add-cart")[0].addEventListener('click', addCartClicked);
                
            }

            productBox.innerHTML = productBoxes;

            shopContent.append(productBox);

            productBox.getElementsByClassName("add-cart")[0].addEventListener('click', addCartClicked);
        });
    } );
    


    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName('product-cart-remove');

    for(var i=0 ; i<removeCartButtons.length ; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    //Quantity Changes
    var quantityInputs = document.getElementsByClassName("product-cart-quantity");

    for(var i=0 ; i<quantityInputs.length ; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }

    //Add to cart
    var addCart = document.getElementsByClassName('add-cart');

    for(var i=0 ; i<addCart.length ; i++){
        var button = addCart[i];
    }

    // Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

// Remove Items From Cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    updateTotal();
}

// Quantity Changes
function quantityChanged(event){
    var input = event.target;

    if(isNaN(input.value)){
        input.value = 1;
    }

    updateTotal();
}

// Add Cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('product-price')[0].innerText;
    var image = shopProducts.getElementsByClassName('product-img')[0].src;

    addProductToCart(title, price, image);
    updateTotal();
}

// Add to Cart Product
function addProductToCart(title, price, image){
    var cartShopItem = document.createElement('div');
    cartShopItem.classList.add('cart-item');

    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

    for(var i=0 ; i<cartItemsNames.length ; i++){
        if(cartItemsNames[i].innerText == title){
            alert("You have already add this product to cart.");
            return;
        }
    }

    var cartItemContent = `
                            <img src="${image}" alt="" class="product-cart-img">

                            <div class="cart-detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="product-cart-price">${price}</div>

                                <input type="number" value="1" class="product-cart-quantity" min ='1'>
                            </div>

                            <!-- Remover Cart Item -->
                            <i class='bx bxs-trash-alt product-cart-remove' ></i>
    `;

    cartShopItem.innerHTML = cartItemContent;
    cartItems.append(cartShopItem);
    cartShopItem.getElementsByClassName('product-cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopItem.getElementsByClassName('product-cart-quantity')[0].addEventListener('change', quantityChanged);

    
}

// Buy Button
function buyButtonClicked(){
    var total = document.getElementsByClassName('cart-total-price')[0].innerText.replace("$","");
    if(total >=0 && total != 0){
        alert("Your Order is Placed");
    
        var cartContent = document.getElementsByClassName('cart-content')[0];
    
        while(cartContent.hasChildNodes){
            cartContent.removeChild(cartContent.firstChild);
            updateTotal();
        }
    } else {
        alert("Your cart is empty!");
    }
}

// Update Total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartItems = cartContent.getElementsByClassName('cart-item');

    var totalPrice = 0;

    for(var i=0 ; i<cartItems.length ; i++){
        var cartItem = cartItems[i];

        var priceElement = cartItem.getElementsByClassName('product-cart-price')[0];
        var quantityElement = cartItem.getElementsByClassName('product-cart-quantity')[0];

        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;

        totalPrice = totalPrice + (price * quantity);
    }

        //if price contain some cents value
        totalPrice = Math.round(totalPrice * 100) / 100;

        document.getElementsByClassName('cart-total-price')[0].innerText = "$" + totalPrice;
}