let shop = document.getElementById("shop");

// basket array to get data from local storage
let basket = JSON.parse(sessionStorage.getItem("data")) || [];

//---------------------- Generating Catalogue Section -------------------//
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      // destructuring values
      let { id, name, price, was, description, image } = item;
      let search = basket.find((x) => x.id === id) || [];
      return `
<div class="box">
    <a href="productPage.html">
    <img src="${image}" alt="${name}" />
    </a>
  <h3>${name}</h3>
    <p>${description}</p>
    <div class="price">R${price}<span>R${was}</span></div>
    <div class="buttons">
    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
    <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
    <i onclick="increment(${id})" class="bi bi-plus-lg" id="addBtn"></i>
      </div>
    </div>
  `;
    })
    .join(""));
};

generateShop();

// Increment function using the item id and adding it to the basket array.
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

  update(selectedItem.id);

  // setting sessionStorage item and stringify with JSON.
  sessionStorage.setItem("data", JSON.stringify(basket));
};

// Decrement function using item id to find it in the basket array.
let decrement = (id) => {
  let selectedItem = id;
  // checking if item exists in the basket
  let search = basket.find((x) => x.id === selectedItem.id);

  // returning nothing if search is empty
  if (search === undefined) return;
  // handling decreasing search variable
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  // removing items === 0 from the basket
  basket = basket.filter((x) => x.item !== 0);

  //   console.log(basket);

  // setting sessionStorage item and stringify with JSON
  sessionStorage.setItem("data", JSON.stringify(basket));
};

//-------------------- Update function ----------------//
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;

  //calling the calculation function inside the update function
  calculation();

  /*calling the total amount function inside the update function
  to create an alert when items are added or subtracted from the cart*/
  totalAmount();
  // Calling an alert with the sub total and total including VAT  the cart is updated
  let totalCost = JSON.parse(sessionStorage.getItem("totalCost"));
  let totalIncVat = JSON.parse(sessionStorage.getItem("totalIncVat"));
  alert(
    `Current Sub total: R ${totalCost.toFixed(
      2
    )} total Inc 15% VAT: R ${totalIncVat.toFixed(2)}`
  );
};

// calculation function to update the cart amount
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

/*------------------- Total Amount Function ---------------------//
totalAmount function so we can create an alert with the current 
total when items are added or subtracted from the cart 
 */
let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    // VAT CALCULATION
    let vat = amount + amount * (15 / 100);
    sessionStorage.setItem("totalIncVat", JSON.stringify(vat));
    sessionStorage.setItem("totalCost", JSON.stringify(amount));
  }
};
