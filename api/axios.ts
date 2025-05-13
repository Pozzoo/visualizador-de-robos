import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5152",
    headers: { 'Content-Type': 'application/json' },
});