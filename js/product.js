if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready(){
    var otherViews = document.getElementsByClassName("other-views")[0];

    fetch("../repo.json").then(result => {return result.json()}).then(data => {
        var listViewsJson = data.viewProduct;
        var listViews = listViewsJson.url;

        listViews.forEach(view_url => {
            var imgHTML = document.createElement("img");
            imgHTML.src = view_url;
            otherViews.append(imgHTML);
        });
        console.log(listViews);
    });

    otherViews.addEventListener("click", changeMainView);

    //STARS
    productStars();

    // COUNT COMMENTS
    numComments();

    // COMMENT STARTS
    commentStars();
    
    // PICK PRODUCT SIZE
    pickSize();

    // HELPFUL AND UNHELPFUL COUNTERS
    var btnsHelp = document.getElementsByClassName("btnHelpful");
    var btnsUnhelp = document.getElementsByClassName("btnUnhelpful");
    var btnsLen = btnsHelp.length;
    for(let i=0 ; i<btnsLen ; i++){
        btnsHelp[i].addEventListener("click", commentsHelpfulCounter);
        btnsUnhelp[i].addEventListener("click", commentsHelpfulCounter);
    }
    

    // ADD PRODUCT TO CART (VIEW PRODUCT)
    var btnAddToCart = document.getElementsByClassName("add-to-cart")[0];
    btnAddToCart.addEventListener("click", addToCartProductView);


    // HELPFUL COMMENTS
    var btnHelpful = document.getElementsByClassName("btnHelpful")[0];
    var btnUnhelpful = document.getElementsByClassName("btnUnhelpful")[0];

    btnHelpful.addEventListener("click", btnHelpfulClicked);
    btnUnhelpful.addEventListener("click", btnUnhelpfulClicked);

    // PRODUCTS
    var shopContentNews = document.getElementsByClassName("news-products")[0];
    
    // getting the products to fill the content
    fetch("../repo.json").then(result => {return result.json()}).then(data => {
        var productList = data.products;

        Object.keys(productList).forEach(product => {

            var productBoxNews = document.createElement('div');
            productBoxNews.classList.add('product-box');
            

            // NEWS
            if(productList[product].category == "M"){
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

function changeMainView(event){
    var imgClicked = event.target;
    var mainView = document.getElementsByClassName("main-view")[0];

    mainView.src = imgClicked.src;

}

function btnHelpfulClicked(event){
    var btnClicked = event.target;
        

        if(btnClicked.classList.contains("bxs-like")){
            btnClicked.classList.add("bx-like");
            btnClicked.classList.remove("bxs-like");
        } else {
            btnClicked.classList.remove("bx-like");
            btnClicked.classList.add("bxs-like");
        }
}

function btnUnhelpfulClicked(event){
    var btnClicked = event.target;

        if(btnClicked.classList.contains("bxs-dislike")){
            btnClicked.classList.add("bx-dislike");
            btnClicked.classList.remove("bxs-dislike");
        } else {
            btnClicked.classList.remove("bx-dislike");
            btnClicked.classList.add("bxs-dislike");
        }
}

function productStars(){
    var starsContainer = document.getElementsByClassName("stars")[0];
    var qtdStars = document.getElementsByClassName("qtdStars")[0].innerText;
    
    var filled_star = `<i class='bx bxs-star bx-tada-hover btn-star-filled'></i>`;
    var empty_star = `<i class='bx bx-star bx-tada-hover btn-star'></i>`;

    for(var i=0 ; i<(5-qtdStars) ; i++){
        var starHTML = document.createElement("i");
        starHTML.innerHTML = empty_star;
        starsContainer.append(starHTML);
    }
    
    for(var i=0 ; i<qtdStars ; i++){
        var starHTML = document.createElement("i");
        starHTML.innerHTML = filled_star;
        starsContainer.append(starHTML);
    }
}

function commentStars(){
    var starsContainer = document.getElementsByClassName("comment-stars");
    var qtdStars = document.getElementsByClassName("qtdStars")[0].innerText;
    
    var filled_star = `<i class='bx bxs-star btn-star-filled not-clickable'></i>`;
    var empty_star = `<i class='bx bx-star btn-star not-clickable'></i>`;


    for(let k=0 ; k<starsContainer.length ; k++){
        for(var i=0 ; i<qtdStars ; i++){
            var starHTML = document.createElement("i");
            starHTML.innerHTML = filled_star;
            starsContainer[k].append(starHTML);
        }
    
        for(var i=0 ; i<(5-qtdStars) ; i++){
            var starHTML = document.createElement("i");
            starHTML.innerHTML = empty_star;
            starsContainer[k].append(starHTML);
        }
    }
}

function pickSize(){
    let sizeOptions = document.getElementsByClassName("size-options")[0].children;
    let numOptions = sizeOptions.length;

    for(var i=0 ; i<numOptions ; i++){
        sizeOptions[i].addEventListener("click", (event) => {
            let btnPickedSize = event.target;
            if(!btnPickedSize.classList.contains("active")){
                btnPickedSize.classList.add("active");

                for(var j=0 ; j<numOptions ; j++){
                        if(sizeOptions[j].innerText != btnPickedSize.innerText && sizeOptions[j].classList.contains("active")){
                            sizeOptions[j].classList.remove("active");
                        }
                }
            }
        });
    }
    
}

function commentsHelpfulCounter(event){
    var btnClicked = event.target;

    var container = btnClicked.parentNode;

    var btn = container.children[0];
    var counter = container.children[1];

    var value = Number(counter.innerText);
    if(btn.classList.contains("bxs-like") || btn.classList.contains("bxs-dislike")){
        value -= 1;
    } else {
        value += 1;
    }
    
    counter.innerText = value;
    console.log(counter);
    
}

function numComments(){
    var numCommentsElement = document.getElementsByClassName("numComments")[0];
    var comments = document.getElementsByClassName("comment");

    numCommentsElement.innerText = (comments.length > 1) ? `${comments.length} comments` : `${comments.length} comment`;
}

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

function addToCartProductView(){
    var title = document.getElementsByClassName("title")[0].innerText;
    var image = document.getElementsByClassName("main-view")[0].src;
    var price = document.getElementsByClassName("price")[0].innerText;

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