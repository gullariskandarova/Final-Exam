const id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = "http://localhost:8080";
const detail = document.querySelector(".detail");
const goBack = document.querySelector(".goBack");
async function getData() {
  try {
    let res = await axios(`${BASE_URL}/products/${id}`);
    drawDetail(res.data);
  } catch (error) {
    console.log(error.message);
  }
}
getData();
function drawDetail(data) {
  detail.innerHTML = `
    <div class="card">
    <img src="${data.imageURL}" alt="">
    <div class="content">
        <h1 class="title">${data.title}</h1>
        <p class="desc">${data.desc}</p>
        <p class="price">$${data.price}</p>
    </div>
</div>
    `;
}

goBack.addEventListener("click", function () {
  window.history.back();
});
