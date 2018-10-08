const popsicle = require('popsicle')

export const popsicleRequest = ticket => {
  return popsicle.request(ticket)
    .use(popsicle.plugins.parse('json'))
    .then(res => res.status < 400 ? res.body : Promise.reject(res.status))
}

export const regions = () => {
  return popsicleRequest({
    method: 'GET',
    url: '/api/regions'
  })
}
