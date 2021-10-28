import ImagesApiService from "./js/apiService.js";
import imageTemplate from "./templates/image-card-template.hbs";
import refs from "./js/refs.js";

// const refs = {
//   searchForm: document.querySelector(".js-search-form"),
//   gallery: document.querySelector(".js-gallery"),
//   loadMoreBtn: document.querySelector('[data-action="load-more"]'),
// };

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearGallery();
  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(appendImagesMarkup);
  setTimeout(showLoadMoreBtn, 500);
}

function onLoadMore() {
  imagesApiService.fetchImages().then(appendImagesMarkup);
  setTimeout(showToUpBtn, 500);
}

function appendImagesMarkup(hits) {
  refs.gallery.insertAdjacentHTML("beforeend", imageTemplate(hits));
}

function clearGallery() {
  refs.gallery.innerHTML = "";
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove("visually-hidden");
}

function showToUpBtn() {
  refs.toUpBtn.classList.remove("visually-hidden");
}
