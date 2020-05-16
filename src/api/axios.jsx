import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-3a79a.firebaseio.com/',
});

export default instance;
