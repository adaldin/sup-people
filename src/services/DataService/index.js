import APIservice from "../APIService";

class DataService extends APIservice {
  constructor() {
    super();
    this.allData = false;
  }

  async getAllData() {
    if (this.allData) return this.allData;
    const response = await this.APICall();
    this.allData = response;
  }
  async getSupTripsList() {
    let result = await this.getAllData();
  }
}
export default new DataService();
