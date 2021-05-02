import { rest } from 'msw'

const url = `https://svc.metrotransit.org/nextripv2`;
export default [
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
  })
]