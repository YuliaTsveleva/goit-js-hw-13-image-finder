const API_KEY = "24048830-4cc4486dcdd2cd17ebea2a9c8";
const BASE_URL = "https://pixabay.com/api";

export default class ImagesApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.query;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
