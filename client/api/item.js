import axios from 'axios';

const getItem = () => axios.get('/api/item');

export default {
  getItem
}