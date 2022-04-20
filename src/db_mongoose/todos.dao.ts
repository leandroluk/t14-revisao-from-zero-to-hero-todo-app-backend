import { Schema, model as makeModel, Model } from 'mongoose'

const makeTodoDAO = (mongoose: any): Model<any> => {
  const schema = new Schema({
    description: {
      type: Schema.Types.String,
      required: true
    },
    isDone: {
      type: Schema.Types.Boolean,
      required: true
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true
    },
    updatedAt: {
      type: Schema.Types.Date
    }
  }, {
    id: true,
    versionKey: false
  })
  schema.plugin(mongoose.autoIncrement.plugin, 'Book')
  const model = makeModel('todos', schema, 'todos')
  return model
}

export default makeTodoDAO