const listings = document.querySelector("#car_grid"); //reference to main containre
const carList = []; // local list
let searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", (event) => {
  event.preventDefault();
  let model_name = document.getElementById("car_model").value.toLowerCase();
  if (model_name == "" || model_name == null) {
    window.location.href = "index.html";
  } else {
    searchbumodel(model_name);
  }
});

async function loadCarsList() {
  const response = await fetch("/api/cars");
  const data = await response.json(); // object representing whole json structure

  console.log(response); // response - we cannot see info
  console.log(data); // whole data - we can see info - object representing whole json structure

  // carList.forEach((element) => {
  // console.log(element);
  //});

  data.forEach((car) => {
    let mnf = getmanufacturName(car.manufacturerIDFK);

    // console.log(mnf);
    // console.log(mnf);
    let info = `  
      <div class="car_card">
        <img src="${car.image}" alt ="${car.model_name}" loading="lazy">
        <p>Make: <span class="make">${

          mnf.then((value) => {
            return value["manufacturer_name"];
          })
        }</span></p>
        <p>Model: <span class="model">${car.model_name}</span></p>
        <p>Price: ${car.price}</p>
        <button class="purchase-button" onclick="car_details('${car["carID"]}')">Purchase</button>
      </div>`;

    listings.innerHTML += info;
    // carList.push(car);
  });
}
async function getmanufacturName(mnfid) {
  const response = await fetch(`/api/manufacturers/${mnfid}`);
  const data = await response.json();
  // let mnf=
  //console.log(data);
  return data;
}
document.addEventListener("DOMContentLoaded", function () {
  loadCarsList();
});

async function searchbumodel(model_name) {
  const response = await fetch(`/api/cars?model=${model_name}`);
  const data = await response.json();
  console.log(data);
  showcars(data);
}
function showcars(carlist) {
  if (carlist.length == 0) {
    listings.innerHTML = "there are no models with this name";
  } else {
    listings.innerHTML = "";
    carlist.forEach((car) => {
      listings.innerHTML += `
      <div class="car_card">
        <img src="${car.image}" alt ="${car.model_name}" loading="lazy">
        <p>Make: <span class="make">${car.manufacturerIDFK}</span></p>
        <p>Model: <span class="model">${car.model_name}</span></p>
        <p>Price: ${car.price}</p>
        <button class="purchase-button" onclick="car_details('${car["carID"]}')">Purchase</button>
      </div>`;
    });
  }
}

function car_details(car_id) {
  const purchasePageUrl = "order_cars.html";

  window.location.href = purchasePageUrl + "?carId=" + car_id;
}
