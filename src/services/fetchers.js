import axios from 'axios'

const url = `https://svc.metrotransit.org/nextripv2`;

export default async function fetchFromStopNum(stopNum) {
    console.log('got here')
    const response = await axios.get(`${url}/${stopNum}`)
    return response.data
}

// export default {
//     fetchFromStopNum,
// }