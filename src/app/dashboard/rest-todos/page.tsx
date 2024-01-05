import prisma from "@/lib/prisma";
import { TodoGrid } from "@/todos/components/TodoGrid";

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({orderBy:{description:'asc'}});
  return (
    <div>
      <TodoGrid todos={todos} />
    </div>
  );
}