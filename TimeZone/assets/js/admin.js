const BASE_URL = "http://localhost:8080";
const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const allInputs = document.querySelectorAll("input");
async function getAllData() {
  try {
    let res = await axios(`${BASE_URL}/products`);
    productCopy = res.data;
    drawTable(res.data);
  } catch (error) {
    console.log(error.message);
  }
}
getAllData();
function drawTable(data) {
  data.forEach((element) => {
    let tr = document.createElement("tr");
    tr.innerHTML += `

    <td><img src="${element.imageURL}" alt=""></td>
    <td>${element.title}</td>
    <td>$${element.price}</td>
    <td><i class="fa-solid fa-trash"></i></td>
    `;
    tbody.append(tr);
  });
}

form.addEventListener("submit", async function () {
  if (allInputs[3] > 0) {
    let newProduct = {
      imageURL: allInputs[0].value,
      title: allInputs[1].value,
      desc: allInputs[2].value,
      price: allInputs[3].value,
    };
    axios.post(`${BASE_URL}/products`, newProduct);
  }
});
