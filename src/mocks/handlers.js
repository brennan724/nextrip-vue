import { rest } from 'msw'

const url = `https://svc.metrotransit.org/nextripv2`;
export default [
  // get all routes
  rest.get(`${url}/routes`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          route_id: '1',
          route_label: 'first route',
        },
        {
          route_id: '2',
          route_label: 'second route',
        }
      ])
    )
  }),
  // get all directions
  rest.get(`${url}/directions/:routeId`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          direction_id: 0,
          direction_name: 'north',
        },
        {
          direction_id: 1,
          direction_name: 'west'
        }
      ])
    )
  }),
  // get all stops
  rest.get(`${url}/stops/:routeId/:directionId`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          place_code: 'FS',
          description: 'first stop',
        },
        {
          place_code: 'SS',
          description: 'second stop',
        }
      ])
    )
  }),
  // get route info by stop
  rest.get(`${url}/:stopNum`, (req, res, ctx) => {
    return res(
      ctx.json({
        departures: [
          {
            route_short_name: 'road to nowhere',
            description: 'first stop',
            departure_text: '2 mins',
          },
          {
            route_short_name: 'road to nowhere',
            description: 'last stop',
            departure_text: '10 mins',
          }
        ],
        stops: [{
          description: 'the beginning',
          stop_id: 1001,
        }]
      })
    )
  }),

]