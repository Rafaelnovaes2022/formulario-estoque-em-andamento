import axios from "axios";


export default class ProductService {

  async getAllProducts() {
    try {
      const res = await axios.get("http://localhost:3000/products");
      return res.data;

    } catch (error) {
      console.error(error);
    }
  }

  async create(data) {
    try {
      const res = await axios.post(
        "http://localhost:3000/products", data);
      return res;

    } catch (error) {
      console.log(error)
    }

  }

  async remover(data) {
    try {
      const res = axios.delete(`http://localhost:3000/products/${data}`)
        return res;

    } catch (error) {
      console.log(error);
    }
  }
}
