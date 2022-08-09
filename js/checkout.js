//-------------------------- calculation ---------------------------------------//
let calculation = () => {
  let basket = JSON.parse(sessionStorage.getItem("data")) || [];
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);

  /*
This function is for the cart counter displayed in the navbar 
*/
};

calculation();

//------------- Generate reference number ------------------//

let generateOrderNumber = function (start, range) {
  let getRandom = Math.floor(Math.random() * range + start);

  while (getRandom > range) {
    getRandom = Math.floor(Math.random() * range + start);
  }
  return getRandom;
};

//------------------ Total amount calculation ------------------//
/*
// I moved this function inside the function below 
function finalAmount() {
  let vat = JSON.parse(sessionStorage.getItem("totalIncVat"));
  let delivery = Number(document.getElementById("delivery").value);
  let coupon = Number(
    document.querySelector("input[name='coupon']:checked").value
  );
  // setting values in local storage
  sessionStorage.setItem("addDeliveryAmount", JSON.stringify(delivery));
  sessionStorage.setItem("subtractCouponAmount", JSON.stringify(coupon));
  // calling generateOrderNumber function
  let referenceNum = generateOrderNumber(100, 10000000);
  var finalAmount = vat + delivery + coupon;

  alert(
    `Reference no.${referenceNum} total cost is: R ${finalAmount.toFixed(2)}`
  );
}
*/

//---------------------- Submitting shipping form ------------------//
let userInfo = [];
const addUser = (e) => {
  e.preventDefault();

  let user = {
    // referenceNum: generateOrderNumber(100, 10000000),
    fname: document.getElementById("fName").value,
    lname: document.getElementById("lName").value,
    email: document.getElementById("email").value,
    delivery: document.getElementById("delivery").value,
    province: document.querySelector("input[name='province']").value,
    coupon: document.querySelector("input[name='coupon']").value,
  };
  userInfo.push(user);
  document.querySelector("form").reset();

  // adding the user info above to sessionStorage.
  sessionStorage.setItem("userInfo", JSON.stringify(user));

  // let userData = JSON.parse(sessionStorage.getItem("userInfo"));

  /*The code below calculates the final amount and generates 
  a reference number that will be displayed as an alert on submitting the form,
  which should be a separate function but I put here to conclude the app with one submit button.*/
  let vat = JSON.parse(sessionStorage.getItem("totalIncVat"));
  let delivery = Number(document.getElementById("delivery").value);
  let coupon = Number(document.querySelector("input[name='coupon']").value);
  // setting values in local storage
  sessionStorage.setItem("addDeliveryAmount", JSON.stringify(delivery));
  sessionStorage.setItem("subtractCouponAmount", JSON.stringify(coupon));
  // calling generateOrderNumber function
  let referenceNum = generateOrderNumber(100, 10000000);
  var finalAmount = vat + delivery + coupon;

  alert(
    `Reference no.${referenceNum} total cost is: R ${finalAmount.toFixed(2)}`
  );
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submitBtn").addEventListener("click", addUser);
});
