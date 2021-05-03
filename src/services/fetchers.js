import axios from 'axios'

/**
 * API calls abstracted from the rest of the application to make it easier to mock
 */

const url = `https://svc.metrotransit.org/nextripv2`;

export const fetchFromStopNum = async function (stopNum) {
    const response = await axios.get(`${url}/${stopNum}`)
    return response.data
}

export const fetchRoutes = async function () {
    const response = await axios.get(`${url}/routes`)
    return response.data
}

export const fetchDirections = async function (routeId) {
    const response = await axios.get(`${url}/directions/${routeId}`)
    return response.data
}

export const fetchStops = async function (routeId, directionId) {
    const response = await axios.get(`${url}/stops/${routeId}/${directionId}`)
    return response.data
}

export const fetchRouteStopInfo = async function (routeId, directionid, stopId) {
    const response = await axios.get(`${url}/${routeId}/${directionid}/${stopId}`)
    return response.data
}