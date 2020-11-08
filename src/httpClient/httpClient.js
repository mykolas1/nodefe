import axios from "axios";

const httpClient = axios.create({
    timeout: 50000
});

export default httpClient;