import api from './api'
import vars from './vars'

api.listen(vars.api.port, () => {
  console.log(`running on port ${vars.api.port}`)
})