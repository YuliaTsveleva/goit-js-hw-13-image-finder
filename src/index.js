import ImagesApiService from "./js/apiService.js";
import imageTemplate from "./templates/image-card-template.hbs";
import refs from "./js/refs.js";

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);
refs.toUpBtn.addEventListener("click", toClearInput);

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
  toScroll();
}

function clearGallery() {
  refs.gallery.innerHTML = "";
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove("visually-hidden");
}

function toScroll() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}

function toClearInput() {
  refs.input.value = "";
}

function showToUpBtn() {
  refs.toUpBtn.classList.remove("visually-hidden");
}
