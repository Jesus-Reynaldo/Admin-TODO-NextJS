'use client'
import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem"

interface Props{
  todos?:Todo[]
}

export const TodoGrid = ({todos=[]}:Props) => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
          ))
      }
    </div>
      
  )
}
