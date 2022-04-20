import dotenv from 'dotenv'

dotenv.config()

const { env } = process

export default {
  api: {
    port: Number(env.API_PORT || env.PORT || 3001)
  },
  mysql: {
    uri: env.MYSQL_URI || 'mysql://root:root@127.0.0.1:3306/todos'
  },
  mongo: {
    uri: env.MONGO_URI || 'mongodb://127.0.0.1:27017/todos'
  }
}