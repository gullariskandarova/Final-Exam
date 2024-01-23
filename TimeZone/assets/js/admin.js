const BASE_URL = "http://localhost:8080";
const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const allInputs = document.querySelectorAll("input");
const search = document.querySelector(".search");
const sort = document.querySelector(".sort");
let productCopy;
async function getAllData() {
  try {
    let res = await axios(`${BASE_URL}/products`);
    productCopy = [...res.data];
    drawTable(res.data);
  } catch (error) {
    console.log(error.message);
  }
}
getAllData();
function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    let tr = document.createElement("tr");
    tr.innerHTML += `

    <td><img src="${element.imageURL}" alt=""></td>
    <td>${element.title}</td>
    <td>$${element.price}</td>
    <td><i class="fa-solid fa-trash" onclick=deleteProduct("${element.id}",this)></i></td>
    `;
    tbody.append(tr);
  });
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (allInputs[3].value > 0) {
    let newProduct = {
      imageURL: allInputs[0].value,
      title: allInputs[1].value,
      desc: allInputs[2].value,
      price: allInputs[3].value,
    };
    await axios.post(`${BASE_URL}/products`, newProduct);
    allInputs[0].value = "";
    allInputs[0].value = "";
    allInputs[0].value = "";
    allInputs[0].value = "";
  } else {
    alert("Price is Negative");
  }
});

async function deleteProduct(id, btn) {
  if (confirm("ARE U SURE")) {
    await axios.delete(`${BASE_URL}/products/${id}`);
    btn.closest(".card");
  }
}

search.addEventListener("input", function (e) {
  let filtered = productCopy.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  return drawTable(filtered);
});

sort.addEventListener("click", function () {
  let sorted;
  if (this.innerText === "ASC") {
    this.innerText = "DESC";
    sorted = productCopy.sort((a, b) => a.title.localeCompare(b.title));
  } else if (this.innerText === "DESC") {
    this.innerText = "ASC";
    sorted = productCopy.sort((a, b) => b.title.localeCompare(a.title));
  }
  drawTable(sorted);
});
