import axios from 'axios';

export class infoAPI {
  static PAGE_SIZE = 15;

  constructor() {
    this.BASE_URL = 'https://pixabay.com/api/';
    this.query = null;
    this.page = 1;
    this.totalResult = 0;
  }
  async getInfoArticles() {
    const params = {
      key: '42169950-0e8cca4ed1d3fcef898dec13a',
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: infoAPI.PAGE_SIZE,
      page: this.page,
    };
    return await axios.get(`${this.BASE_URL}`, { params }).then(res => {
      if (res.data.hits.length === 0) {
        throw new Error('Error');
      } else {
        return res.data;
      }
    });
  }
}
