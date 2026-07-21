$('.drop-down-box' ).mouseenter(function(){
    $('.drop-down').slideDown(300)
})
$('.drop-down-box' ).mouseleave(function(){
    $('.drop-down').slideUp(300)
})
function displayCartIem(pro,index){
    let finalPrice=(pro.price-(pro.price*pro.discount/100));

    return `
    <div class="cart-item w-100 d-flex align-items-center p-2">
        <img src="${pro.image}" width="80" class="rounded" alt="">
        
        <div class="d-flex flex-column align-items-start gap-2 px-2 flex-grow-1">
            <b>${pro.name}</b>
            <div class="w-100 d-flex  justify-content-between">
<p class="d-flex justify-content-center align-items-center gap-1">
                <span>${pro.amount}x</span>
                <span class="text-orange">$${finalPrice.toFixed(2)}</span>
            </p>
            <div class="btn-group text-secondary">
            <button onclick="handleAmount(${index},'minus')"  class="btn  rounded-pill"><i class="fa-solid fa-minus"></i></button>
            <button onclick="handleAmount(${index},'plus')" class="btn  rounded-pill"><i class="fa-solid fa-plus"></i></button>
            </div>
            </div>
            
        </div>

        <button class="btn-delete" onclick="deleteItem(${index})">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    `;
}
let productData = [];
function getData(cat){
// ajax start
$.ajax({
    method: "GET",
    url: "https://raw.githubusercontent.com/GEMY996/furniture-api/refs/heads/main/products.json",
    
    success: function(data) {
    productData = JSON.parse(data)
        let items = "";
        productData.forEach((pro,index) => {
            
    const newPrice =( pro.price - (pro.price * pro.discount / 100)).toFixed(2);

            if(cat=="all"  && pro.isAll|| pro.category==cat){
            items +=`<div>
            <div class="card bg-white p-2 rounded">
                    <div class="card-head fs-14  d-flex justify-content-between align-items-center">
                    ${pro.discount > 0  ?` <div class="discount rounded-pill py-1 px-3 text-white
                    fw-semibold">-${pro.discount}%</div>`:''}
        <i class="fa-regular fa-heart text-secondary ms-auto"></i>
                    </div>
                    <div class="card-img">
                        <img class="card-img" src=${pro.image} class="w-100" alt="">

                    </div>
                    <div class="card-body">
                    
                        <div class="d-flex text-capitalize fw-semibold justify-content-between align-items-center ">
                            <b class="pro-title fw-semibold d-inline-block  w-75 text-nowrap ">${pro.name.split(' ').slice(0 , 2).join(' ')}</b>

                            <div class="  d-flex justify-content-center align-items-center gap-1">
                                <span class=" text-secondary ">4.5</span>
                                <i class="fa-solid fa-star text-warning"></i>
                            </div>

                        </div>
                        <div class="pro-cat py-2   text-white-50 text-capitalize">
                            <p>
                            ${pro.category}
                            </p>
                        </div>
                        <div class="price">
                        ${pro.discount > 0
                            ? `
                            <del class="text-secondary me-2">
                                $${pro.price}
                            </del>

                            <b style="color:#f59a57">
                                $${newPrice}
                            </b>
                            `
                            : `
                            <b style="color:#f59a57">
                                $${pro.price}
                            </b>
                            `
                        }
                        </div>

                    </div>
                    <div class="none mb-1 d-flex justify-content-between gap-1 align-items-center">

                        <button onclick="addToCart(${index},this)"  class="addToCart cart-btn rounded-pill  ">
                            Add To Cart
                        </button>
                        <i class="ico fa-solid fa-shuffle"></i>
                        
                        <i onclick="displayProDetails(${index})"  class="co fa-solid fa-magnifying-glass"></i>
                        
                        </div>

                </div>
                </div>
            ` ;
                }
                
        });




setTimeout(()=>{
    
    $('.shop-products').html(items)
},500)
    },
    error: function(err) {
        console.log("Error:", err);
    }
});
} 
// ajax end
$(document).ready(function () {
    getData("all");
});
const colors = document.querySelectorAll('.color');

colors.forEach(color => {
    color.addEventListener('click', () => {
        colors.forEach(c => c.classList.remove('active'));
        color.classList.add('active');
    });
});

function displayProDetails(index){
    let proDetails = productData[index];
    $(".pro-details-box #detailsContent").html(`
                        <div class="pro-img ">
                    <img src=${proDetails.image} class=" rounded-2" width="350px" alt="">
                </div>
                <div class="w-50 pro-details rounded-2  d-flex flex-column justify-content-evenly align-items-start">
                    <b class=" fs-4 fw-medium">${proDetails.name}</b>
                
                    <span class=" fw-bold fs-4" style="color:#f59a57;">$${proDetails.price}</span>
                    <p class=" opacity-50">The compact and well-proportioned silhouette of both the seats and the small sofa, opens up
                        to a new way of using the
                        dining space: as a living room within the living room, a hybrid situation.</p>
                
                    <div class="colors">
                        <span class="label">Color :</span>
                
                        <div class="color active" style="background:#e5e5e5;"></div>
                        <div class="color" style="background:#9d9271;"></div>
                        <div class="color" style="background:#6b6255;"></div>
                
                        <span class="clear">× Clear</span>
                    </div>
                    <br>
                    <p class="fw-bold"> category :<span class=" text-capitalize text-secondary">${proDetails.category}</span></p>
                
                    <div class="quantity d-flex justify-content-between align-items-center gap-2">
                    <div class="quantity-box">
    <button class="minus" onclick="decreaseQuantity()">-</button>
    <span class="count">1</span>
    <button class="plus" onclick="increaseQuantity()">+</button>
</div>
                    <button   class="cart-btn rounded-pill text-light border-0">
                        Add To Cart</button>
                </div>
        `);
$(".pro-details-layout").addClass("active")
}
$('.detailsCloseBtn').click(function(){
    $(".pro-details-layout").removeClass("active")
})
$('.pro-details-layout').click(function(){
    $(this).removeClass('active');
});
$('.pro-details-box').click(function(event){
    event.stopPropagation();
});
let count = 1;

function increaseQuantity() {
    count++;
    $('.count').text(count);
}

function decreaseQuantity() {
    if (count > 1) {
        count--;
        $('.count').text(count);
    }
}
$('.compare-box').click(function () {
    $('.cart-layout').addClass('active');
});

$('.cartCloseBtn').click(function () {
    $('.cart-layout').removeClass('active');
});

$('.cart-layout').click(function () {
    $(this).removeClass('active');
});

$('.cart').click(function (e) {
    e.stopPropagation();
});

let cartData=JSON.parse(localStorage.getItem('cart'))||[];
handelData();
function addToCart(number,element) {
    element.disabled=true
    $(element).html('processing...')
    setTimeout(()=>{
    $(element).html('add to cart')

    element.disabled=false
    if(cartData.length==0){
        let proFullInfo={...productData[number],
            amount:1}
    cartData.push(proFullInfo);
    handleAlertBox('success',proFullInfo.name)
    
    }
    else{
        let find=cartData.find((val)=> val.id==productData[number].id)
        if(find){
handleAlertBox('warning',productData[number].name)
        
        }
else{
let proFullInfo={...productData[number],
            amount:1}
cartData.push(proFullInfo);
handleAlertBox('success',proFullInfo.name)
    
}
    }
    handelData()
    $(".alert-layout").addClass('active')
    setTimeout(()=>{
    $(".alert-layout").removeClass('active')

    },1200)
    },1000)
}
function  handleAlertBox(params,proName) {
    let alertIcon=''
    let alertMessage=''
    $("#alert-pro-name").html(`(${proName})`)
    if(params=='success'){
        $('#alert-action').removeClass('d-block')
    $(".alert-icon").addClass('border-success text-success')
    $(".alert-icon").removeClass('border-danger text-danger')
        alertIcon=`<i class="fa-solid fa-check"></i>`
        alertMessage= `Added to cart!`
    }else if(params=='warning'){
        $('#alert-action').addClass('d-none')
    $(".alert-icon").addClass('border-danger text-danger')
    $(".alert-icon").removeClass('border-success text-success')
alertIcon=`<i class="fa-solid fa-exclamation"></i>`
        alertMessage= `is already in the cart`
    }
    else if(params=='delete'){
    $(".alert-icon").addClass('border-danger text-danger')
    $(".alert-icon").removeClass('border-success text-success')
    alertIcon=`<i class="fa-solid fa-exclamation"></i>`
    alertMessage= `Sure To Delete ?`

    }
    $(".alert-icon").html(alertIcon)
    $("#alert-message-box").html(alertMessage)
}
function handelData(){
    let items=''
    let totalPrice=0
    if(cartData.length==0 ){
    $('.cart-box ').html(`<div class="cart-ico">
                                <i class="fa-solid fa-cart-plus"></i>
                            </div>
                            <div class="d-flex flex-column h-100">
                            <p class="fw-bold">No products in the cart.</p>
                            
                            <a href="./shop.html" class="car-btn rounded-pill py-2 px-3">Return To Shop</a>
                            </div>
        `);
    $('#totalPriceBox').html(`$${totalPrice.toFixed(2)}`)
    $('#cartTotalBox').html(`$${totalPrice.toFixed(2)}`)
    localStorage.removeItem('cart')

    }
else{
    cartData.forEach((val,index)=>{
        let finalPrice=(val.price-(val.price*val.discount/100))*val.amount
        totalPrice+=finalPrice
    items+=displayCartIem(val, index);
    })
    $('#cartTotalBox').html(`$${totalPrice}`)
    $('#totalPriceBox').html(`$${totalPrice}`)
    $('.cart-box ').html(items)
    localStorage.setItem('cart', JSON.stringify(cartData))
}
}
function displayCartIem(pro,index){
    let finalPrice=(pro.price-(pro.price*pro.discount/100));

    return `
    <div class="cart-item w-100 d-flex align-items-center p-2">
        <img src="${pro.image}" width="80" class="rounded" alt="">
        
        <div class="d-flex flex-column align-items-start gap-2 px-2 flex-grow-1">
            <b>${pro.name}</b>
            <div class="w-100 d-flex  justify-content-between">
<p class="d-flex justify-content-center align-items-center gap-1">
                <span>${pro.amount}x</span>
                <span class="text-orange">$${finalPrice.toFixed(2)}</span>
            </p>
            <div class="btn-group text-secondary">
            <button onclick="handleAmount(${index},'minus')"  class="btn  rounded-pill"><i class="fa-solid fa-minus"></i></button>
            <button onclick="handleAmount(${index},'plus')" class="btn  rounded-pill"><i class="fa-solid fa-plus"></i></button>
            </div>
            </div>
            
        </div>

        <button class="btn-delete" onclick="deleteItem(${index})">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    `;
}
function handleAmount(index,action){
    if(action=="plus"){
    cartData[index].amount++;}
    else{
        if(action=="minus"&&cartData[index].amount>1){
        cartData[index].amount--;
        }
    }
    handelData()
}
function deleteItem(index){
    $(".alert-layout").addClass('active')
    handleAlertBox('delete',cartData[index].name)
        $('#alert-action').addClass('d-block')
        $('#alert-action').removeClass('d-none')
        $("#deleteConfirm").attr("deleteIn",index)
}
$('.card-hover').hover(
    function () {
        $('#prev-arrows, #next-arrows').css({
            opacity: '1',
            visibility: 'visible'
        });
    },
    function () {
        $('#prev-arrows, #next-arrows').css({
            opacity: '0',
            visibility: 'hidden'
        });
    }
);
$('#deleteCancel').click(function() {
    $('.alert-layout').removeClass('active')
})
$('#deleteConfirm').click(function() {
    let index=$(this).attr("deleteIndex")
    cartData.splice(index,1)
    handelData()
    $(".alert-layout").removeClass('active')

})
// read more start
let btn = document.getElementById("readMoreBtn");
let moreText = document.getElementById("moreText");

btn.addEventListener("click", function (e) {
    e.preventDefault();

    if (moreText.style.display === "none") {
        moreText.style.display = "inline";
        btn.innerHTML = "Read less";
    } else {
        moreText.style.display = "none";
        btn.innerHTML = "Read more";
    }
});

// read more end
// click on
$('.menu-icon').click(function(e){
    $('.mobile-menu').addClass('active');
    e.stopPropagation();
});

$(document).click(function(){
    $('.mobile-menu').removeClass('active');
});

$('.mobile-menu').click(function(e){
    e.stopPropagation();
});
// menu
$('#catBtn').click(function () {
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');

    $('.menu-content').addClass('d-none');
    $('.categories-content').removeClass('d-none');
});

$('#menuBtn').click(function () {
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');

    $('.categories-content').addClass('d-none');
    $('.menu-content').removeClass('d-none');
});