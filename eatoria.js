function signup(){
   let name = document.getElementById("name").value;
   let email = document.getElementById("email").value;
   let password = document.getElementById("password").value;

   let user = {
    name: name,
    email: email,
    password: password
   };

   localStorage.setItem("user", JSON.stringify(user));
   alert("Signup successful!");
}

function login(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let storedUser = JSON.parse(localStorage.getItem("user"));

  if(storedUser && storedUser.email === email && storedUser.password === password){
    localStorage.setItem("login-name", storedUser.name);
    alert("Login succesful!");
    window.location.href = "index.html";
  }
  else{
    alert("Invalid credentials");
  }
}

//Navbar : 
  let basePath = location.pathname.includes("/pages/") ? "../" : "";
  let nav = document.getElementsByClassName("nav-mobile")[0];

  nav.innerHTML = `<div class="navbar">

      <div id="openNav" class="nav-collapse-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <a href="${basePath}index.html" style="text-decoration: none;"><div class="logo">
      <img src="${basePath}eatoria-logo(white).png"></img>Eatoria</div></a>
      <div class="menu-bar">
        <a href="${basePath}index.html"><div class="menu-item">Home</div></a>
        <a href=""><div class="menu-item">Offers</div></a>
        <a href=""><div class="menu-item">Restaurants</div></a>
        <a href="order.html"><div class="menu-item">Orders</div></a>
    </div>
    <div class="search-bar">
      <input type="search" placeholder="Search your favourite dish">
      <i class="fas fa-search"></i>
    </div>
    <div class="nav-icons">
      <div class="account-section">
      <div class="nav-icons-circle"><i class="fas fa-user"></i></div>
      <span id="accountName"></span>
      <span class="arrow">▾</span>
      <div class="account-box" id="accountBox"></div>

      </div> 
      <div><div class="nav-icons-circle"><i class="fas fa-shopping-cart"></i></div></div>
    </div>
  </div>
   <div class="search-bar-mobile">
      <input type="text" placeholder="Search Items">
      <i class="fas fa-search"></i>
    </div>`;


  let username = localStorage.getItem("login-name");
  let accountname = document.getElementById("accountName");
  let accbox = document.getElementById("accountBox");
  

 function syncUser(){
   username = localStorage.getItem("login-name");
   if(username){
      let formattedName = username.charAt(0).toUpperCase() + username.slice(1);
      accountname.textContent = formattedName;
      accbox.innerHTML = `
              <ul>
              <li>My account</li>
              <li>Order History</li>
              <li id="logout">Logout</li>
              </ul>
          `;
    }
  else{
      accountname.textContent = "Login";
      accbox.innerHTML = `
              <ul>
              <li>Login</li>
              <li>Signup</li>
              </ul>
          `;
    }
  }
  syncUser();
  
let accsec = document.querySelector(".account-section");
accsec.addEventListener("click", function(e){
      accsec.classList.toggle("active");
      accbox.classList.toggle("active");
});

accbox.addEventListener("click", function(e){
   e.stopPropagation();

    if(e.target.id === "logout"){
        const confirmed = confirm("Are you sure you want to logout?");
        if(confirmed){
            localStorage.removeItem("login-name");
            syncUser();
        }
    }
});

document.addEventListener("click", function(e){
  if(!accsec.contains(e.target)){
    accsec.classList.remove("active");
    accbox.classList.remove("active");
  }
});


// sidenavbar :

  let side_navbar = document.getElementsByClassName("side-navbar")[0];
  side_navbar.innerHTML = `<div class="side-navbar-elements">
             <a href="index.html"><div class="menu-item">Home</div></a>
             <a href="pages/women.html"><div class="menu-item">Women</div></a>
          </div>
          <div id="closeNav" class="navbar-close-btn">&times;</div> `;


// Items for each Pages :

async function loadProducts() {
       const response = await fetch('/items.json');
       const data = await response.json();

       const category = document.body.getAttribute("data-category");
       const items = data[category];

       const container = document.getElementsByClassName("content-items")[0];
       container.innerHTML = "";

       items.forEach(item =>{
         const card = document.createElement("div");
         card.classList.add("item-card");

          const top = document.createElement("div");
         top.classList.add("item-card-top");
         top.innerHTML = `<img src="${item.image}">`
         
         const bottom = document.createElement("div");
         bottom.classList.add("item-card-bottom");
         bottom.innerHTML = `
           <div class="item-name">${item.title}</div>
           <div class="item-restaurant">${item.restaurant}</div>
           <div class="time-rating"><div class="item-rating">${item.rating}</div>•<div class="item-time">${item.time}</div></div>
         `

         const pricecart = document.createElement("div");
         pricecart.classList.add("price-cart");

         const price = document.createElement("div");
         price.classList.add("item-price");
         price.textContent = item.price;

         const add_cart = document.createElement("div");
         add_cart.classList.add("add_cart-btn");
         add_cart.textContent = "Add";

         let quantity = 0;

         add_cart.addEventListener("click", ()=>{
              if(quantity === 0){
                quantity = 1;
                renderCounter();
              }
         });

         function renderCounter(){
              add_cart.innerHTML = `
              <button class="minus">-</button>
              <span class="qty">${quantity}</span>
              <button class="plus">+</button>
              `;

         const minus = add_cart.querySelector(".minus");
         const plus = add_cart.querySelector(".plus");
         const qty = add_cart.querySelector(".qty");

         minus.addEventListener("click", (e)=>{
          e.stopPropagation();
          quantity--;
          if(quantity <= 0){
            quantity = 0;
            add_cart.textContent = "Add";
          }
          else{
            qty.textContent = quantity;
          }
         });

         plus.addEventListener("click", (e)=>{
                 e.stopPropagation();
                 if(quantity <= 9)
                 quantity++;
                 qty.textContent = quantity;
         });
        }

         pricecart.appendChild(price);
         pricecart.appendChild(add_cart);

         card.appendChild(top);
         card.appendChild(bottom);
          card.appendChild(pricecart);
         container.appendChild(card);
       });
}

loadProducts();













// function toggleAccountBox() {
//   const box = document.getElementById("accountBox");
//   box.style.display = box.style.display === "block" ? "none" : "block";
// }

// window.addEventListener("click", function (e) {
//   const box = document.getElementById("accountBox");
//   const accBtn = document.querySelector(".account-section");

//   if (!accBtn.contains(e.target) && !box.contains(e.target)) {
//     box.style.display = "none";
//   }
// });


// let currentSlide = 0;
// const slides = document.querySelectorAll('.slide');
// const slider = document.getElementById('offer-banners');
// const dotsContainer = document.getElementById('dots');

// function updateSlider(){
//   slider.style.transform = `translateX(-${currentSlide * 100}%)` ;
//   updateDots();
// }

// function nextSlide(){
//   if (currentSlide < slides.length - 1) {
//      currentSlide++;
//   }
//   else{
//     currentSlide = 0;
//   }
//   updateSlider();
// }

// function prevSlide(){
//   if (currentSlide > 0) {
//     currentSlide--;
//   }
//   else{
//     currentSlide = slides.length - 1;
//   }
//   updateSlider();
// }

// function createDots(){
//   slides.forEach((_, index) =>{
//     const dot = document.createElement('button');
//     dot.addEventListener('click', () => {
//       currentSlide = index;
//       updateSlider();
//     });
//      dotsContainer.appendChild(dot);
//   });
// }

// function updateDots(){
//   const dots = dotsContainer.querySelectorAll('button');
//   dots.forEach((dot,index) => {
//     dot.classList.toggle('active', index==currentSlide);
//   });
// }

// createDots();
// updateSlider();

// const openBtn = document.getElementById('openNav');
// const closeBtn = document.getElementById('closeNav');
// const sideNavbar = document.getElementById('sideNavbar');
// const overlay = document.getElementById('overlay');

// openBtn.addEventListener('click', ()=> {
//      sideNavbar.classList.add('open') ;
//      overlay.classList.add('show') ;

// });

// closeBtn.addEventListener('click', ()=>{
//      sideNavbar.classList.remove('open');
//      overlay.classList.remove('show');
// });

// document.addEventListener('click' , (e)=> {
//    if (
//     sideNavbar.classList.contains('open') &&
//     !sideNavbar.contains(e.target) &&
//     !openBtn.contains(e.target)
//    ){
//     sideNavbar.classList.remove('open');
//     overlay.classList.remove('show');
//    }
// });
