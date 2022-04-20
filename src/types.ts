export type Indexable = {
  id: string
}

export type Entity = Indexable & {
  createdAt: Date
  updatedAt?: Date
}

export type Todo = Entity & {
  description: string
  isDone: boolean
}

export type AddTodo = Omit<Todo, keyof Entity>
export type EditTodo = Partial<Omit<Todo, keyof Entity>>