const BASE_URL = "http://localhost:8080";
const cards = document.querySelector(".popular-cards");
const header = document.querySelector("header");
const loadMore = document.querySelector(".loadMore");
let limit = 3;
let productCopy;
window.addEventListener("scroll", function () {
  header.classList.toggle("scrollHeader", this.scrollY > 0);
});
async function getAllData() {
  try {
    let res = await axios(`${BASE_URL}/products`);
    productCopy = res.data;
    drawCard(res.data.slice(0, limit));
  } catch (error) {
    console.log(error.message);
  }
}
getAllData();

function drawCard(data) {
  cards.innerHTML = "";
  data.forEach((element) => {
    cards.innerHTML += `
        <div class="card">
        <img src="${element.imageURL}" alt="">
        <h3 class="title">${element.title}</h3>
        <p class="price">$${element.price}</p>
        <a href="detail.html?id=${element.id}">VIEW MORE</a>
    </div>
        `;
  });
}

loadMore.addEventListener("click", function () {
  limit += 3;
  drawCard(productCopy.slice(0, limit));
  if (limit >= productCopy.length) {
    loadMore.remove();
  }
});