import { connect } from 'mongoose'
import vars from '../vars'
export * from './todos.dao'

const mongoose: any = {
  async authenticate(): Promise<void> {
    await connect(vars.mongo.uri)
  }
}

export default mongoose