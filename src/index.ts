import api from './api'
import vars from './vars'
// import db_sequelize from './db_sequelize'
import db_mongoose from './db_mongoose'

db_mongoose.authenticate()
  .then(() => {
    api.listen(vars.api.port, () => {
      console.log(`running on port ${vars.api.port}`)
    })
  })
  .catch((error: Error) => {
    console.error(error)
    process.exit(1)
  })
