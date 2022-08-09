let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

// basket array to get data from local storage
let basket = JSON.parse(sessionStorage.getItem("data")) || [];
console.log(basket);
// calculation
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        // basket items
        let { id, item } = x;

        // data items
        let search = shopItemsData.find((y) => y.id === id) || [];
        let { image, name, price, description } = search;
        return `
      <table>
         <i onclick="removeItem(${id})" class="bi bi-x-circle-fill" style="font-size: 20px"></i>
          <tr>
            <th>Product</th>
            <th>Subtotal</th>
          <tr>
          <td>
            <div class="cart-info">
              <a href="productPage.html">
              <img src="${image}" alt="${name}" />
              </a>
              <div>
                <p>${name}</p>
                <h3>R ${price}</h3>
                <br />
              <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
              </div>
              <p>${description}</p>
            </div>
          </td>
          <td><h3>R ${item * search.price}</h3></td>
        </tr>
        </table>
          `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;

    // label
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="catalogue.html">
    <button class="btn homeBtn">Keep Shopping</button>
    </a>
      `;
  }
};

generateCartItems();

// Increment function
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
  generateCartItems();
  update(selectedItem.id);

  // setting sessionStorage item and stringify with JSON
  sessionStorage.setItem("data", JSON.stringify(basket));
};

// Decrement function
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
  // re render generateCartItems() function for updated items;
  generateCartItems();

  // setting sessionStorage item and stringify with JSON
  sessionStorage.setItem("data", JSON.stringify(basket));
};

// Update function
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  //   console.log(search.item);
  calculation();
  TotalAmount();

  // Calling an alert with the sub total and total including VAT  the cart is updated
  let totalCost = JSON.parse(sessionStorage.getItem("totalCost"));
  let totalIncVat = JSON.parse(sessionStorage.getItem("totalIncVat"));
  alert(
    `Current Sub total: R ${totalCost.toFixed(
      2
    )} total Inc 15% VAT: R ${totalIncVat.toFixed(2)}`
  );
};

// Remove Item function
let removeItem = (id) => {
  let selectedItem = id;
  //   console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);

  // re render generateCartItems() function for updated items;
  generateCartItems();
  TotalAmount();
  calculation();

  // setting sessionStorage item and stringify with JSON
  sessionStorage.setItem("data", JSON.stringify(basket));
};

// Clear cart
let clearCart = () => {
  basket = [];
  // re render generateCartItems() function for updated items;
  generateCartItems();
  calculation();
  // setting sessionStorage item and stringify with JSON
  sessionStorage.setItem("data", JSON.stringify(basket));
};

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

    // console.log(amount);
    label.innerHTML = `
    <h2>Sub Total : $ ${amount}</h2>
     <h2>Total Inc (15%) VAT: R ${vat}</h2>
   <button class="btn bg-dark">
    <a class="text-white" href="checkout.html">Checkout</a>
    </button>
    <button onclick="clearCart()" class="btn bg-dark ml-2 text-white">Clear Cart</button>
      
      `;
  } else {
    return;
  }
};

TotalAmount();
