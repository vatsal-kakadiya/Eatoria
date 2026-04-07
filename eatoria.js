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
        <a href=""><div class="menu-item">Orders</div></a>
    </div>
    <div class="search-bar">
      <input type="search" placeholder="Search your favourite dish">
      <i class="fas fa-search"></i>
    </div>
    <div class="nav-icons">
      <div class="account-section" onclick="toggleAccountBox()"><div><div class="nav-icons-circle"><i class="fas fa-user"></i></div></div>
      <!--   <div class="account-box" id="accountBox">
        <p><a href="#">Login</a></p>
        <p><a href="#">Sign Up</a></p>
      </div>      -->
      </div> 
      <div><div class="nav-icons-circle"><i class="fas fa-shopping-cart"></i></div></div>
    </div>
  </div>
   <div class="search-bar-mobile">
      <input type="text" placeholder="Search Items">
      <i class="fas fa-search"></i>
    </div>`;

  let side_navbar = document.getElementsByClassName("side-navbar")[0];
  side_navbar.innerHTML = `<div class="side-navbar-elements">
             <a href="index.html"><div class="menu-item">Home</div></a>
             <a href="pages/women.html"><div class="menu-item">Women</div></a>
          </div>
          <div id="closeNav" class="navbar-close-btn">&times;</div> `;


// Items for each Pages :

async function loadProducts() {
       const response = await fetch('../items.json');
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
           <div class="item-description">${item.desc}</div>
           <div class="item-price">${item.price} <div class="mrp-sale-wrapper"><div class="item-MRP">${item.priceCut}</div><div class="item-sale">${item.sale}</div></div></div>
         `

         const buttons = document.createElement("div");
         buttons.classList.add("item-buttons");

         const buy = document.createElement("div");
         buy.classList.add("buy-button");
         buy.textContent = "Buy";

         const wishlist = document.createElement("div");
         wishlist.classList.add("wishlist-button");
         wishlist.textContent = "Save";

         const iconCircle = document.createElement("div");
         iconCircle.classList.add("nav-icons-circle");
         const icon = document.createElement("i");
         icon.classList.add("fas" , "fa-heart");
         
         iconCircle.appendChild(icon);
         wishlist.appendChild(iconCircle);
         buttons.appendChild(buy);
         buttons.appendChild(wishlist);

         card.appendChild(top);
         card.appendChild(bottom);
         card.appendChild(buttons);
         container.appendChild(card);
       });
}

loadProducts();