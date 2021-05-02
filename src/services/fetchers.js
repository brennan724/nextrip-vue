import axios from 'axios'

const url = `https://svc.metrotransit.org/nextripv2`;

export const fetchFromStopNum = async function (stopNum) {
    const response = await axios.get(`${url}/${stopNum}`)
    return response.data
}

// export default {
//     fetchFromStopNum,
// }