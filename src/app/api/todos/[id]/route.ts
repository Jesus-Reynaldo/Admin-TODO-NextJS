import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Params {
  params: {
    id: string;
  };
}
const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  return todo;
};
export async function GET(request: Request, { params }: Params) {
  const todo = await getTodo(params.id);
  console.log(params);
  if (todo===null)
    return NextResponse.json({ message: "Todo wasn't found" }, { status: 400 });
  return NextResponse.json({
    todo,
  });
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Params) {
  const { id } = params;
  const todo = await getTodo(id);
  if (todo === null)
    return NextResponse.json({ message: "Todo wasn't found" }, { status: 400 });
  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });
    return NextResponse.json({ updatedTodo }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

