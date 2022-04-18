export type Indexable = {
  id: number
}

export type Entity = Indexable & {
  createdAt: Date
  updatedAt?: Date
}

export type Todo = Entity & {
  description: string
  isDone: boolean
}