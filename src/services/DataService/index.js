import APIservice from "../APIService";

class DataService extends APIservice {
  constructor() {
    this.allData = false;
  }

  async getAllData() {
    if (this.allData) return this.allData;
    const response = await this.APICall();
    this.allData = response.data;
  }
}
export default new DataService();
