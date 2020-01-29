import axios from 'axios';
const API_URL = 'https://two-guys-with-computers.herokuapp.com';


export default class StockData {
    
    async getGraphData(stock, timeFrame, limit) {
        
        const url = `${API_URL}/stock/${stock}/${timeFrame}/${limit}`;
        return axios.get(url).then(response => response.data);
    }

}
