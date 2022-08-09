//-------------------------- calculation ---------------------------------------//
let calculation = () => {
  let basket = JSON.parse(sessionStorage.getItem("data")) || [];
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  /*
This function is for the cart counter displayed in the navbar 
gave it its own page to avoid errors since it has to be displayed 
on every page
*/
};

calculation();
