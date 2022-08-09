let label = document.getElementById("label");
// let shoppingCart = document.getElementById("shopping-cart");
let productSection = document.querySelector(".product");
let vatLabel = document.getElementById("vatLabel");
// basket array to get data from local storage
let basket = JSON.parse(sessionStorage.getItem("data")) || [];
let htmlPage = window.location.pathname;

//-------------------------- calculation ---------------------------------------//
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

//--------------------------- Increment function-----------------------------//
let increment = (id) => {
  let selectedItem = id;
  // checking if item exists in the basket
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // re render generateCartItems() function for updated items;
  // generateCartItems();
  update(selectedItem.id);

  // setting sessionStorage item and stringify with JSON
  sessionStorage.setItem("data", JSON.stringify(basket));
};

//------------------------- Update function ------------------------------//
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  //   console.log(search.item);
  calculation();
  TotalAmount();
  // console.log(JSON.parse(sessionStorage.getItem("totalIncVat")));

  // Calling an alert with the sub total and total including VAT  the cart is updated
  let totalCost = JSON.parse(sessionStorage.getItem("totalCost"));
  let totalIncVat = JSON.parse(sessionStorage.getItem("totalIncVat"));
  alert(
    `Current Sub total: R ${totalCost.toFixed(
      2
    )} total Inc 15% VAT: R ${totalIncVat.toFixed(2)}`
  );
};

//-------------------------------- Total Amount -------------------------------//
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    sessionStorage.setItem("totalCost", JSON.stringify(amount));
    // console.log(amount);

    // VAT CALCULATION
    let vat = amount + amount * (15 / 100);
    sessionStorage.setItem("totalIncVat", JSON.stringify(vat));

    label.innerHTML = `
   <h2>Sub Total : $ ${amount}</h2>
     <h2>Total Inc (15%) VAT: R ${vat}</h2>
   <button class="btn bg-dark">
    <a class="text-white" href="checkout.html">Checkout</a>
    </button>
   
      
      `;
  } else {
    return;
  }
};

TotalAmount();

//------------------------ Generate Products ----------------------//
let generateItem = () => {
  return (productSection.innerHTML = shopItemsData
    .map((item) => {
      let { id, name, price, was, description, image } = item;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div class="container" style="margin-top:-10px">
        <div class="row">
          <div class="col-md mx-auto shadow py-5">
            <div class="row">
              <div class="col-md-5">
                <img class="img-fluid" src="${image}" alt="${name}" />
              </div>
              <div class="col-md-3">
                <p class="tag text-center">New</p>
                <h2>${name}</h2>
                <p>Product code: #ISS555</p>
                <div class="rating">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-half"></i>
                </div>
                <p class="price">ZAR ${price}</p>
                <p><b>Availability:</b> JHB,CPT</p>
                <p><b>Condition:</b> New</p>
                <p><b>Brand:</b> SHOP-XYZ</p>
                <p><b>Ships:</b> Today</p>
              </div>
              <div class="col-md-4">
                <p class="tag text-center">#ISS555</p>
                <h2>Product Information</h2>
                <p>Color</p>
                <form action="">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Blue
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
                      Black
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
                      checked
                    />
                    <label class="form-check-label" for="flexRadioDefault3">
                      Red
                    </label>
                  </div>
                  <div class="form-group">
                  <div id=${id} class="quantity">Quantity: ${item}</div>
                  </div>
                  
                  <button onclick="increment(${id})" class="btn btn-primary" id="itemOne">
                    add to cart
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateItem();
