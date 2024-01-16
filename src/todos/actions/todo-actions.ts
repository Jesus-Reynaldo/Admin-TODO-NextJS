'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const sleep = async(seconds:number) =>{
  return new Promise(resolve=>{
    setTimeout(()=>resolve(true), seconds*1000)
  })
}
export const toggleTodo =async (id:string,complete: boolean):Promise<Todo> => {
  await sleep(3)
  const todo = await prisma.todo.findFirst({where:{id}})
  if(!todo){
    throw `Todo con id ${id} no encontrado`
  }
  const updateTodo = await prisma.todo.update({
    where:{id},
    data:{complete: complete}
  })
  revalidatePath('/dashboard/server-todos')
  return updateTodo;
}

export const addTodo = async(description: string) => {
  try{
    const todo = await prisma.todo.create({data:{description}})
    revalidatePath('/dashboard/server-todos')
    return todo
  }catch(error){
    return{
      message: 'Error creando todo'
    }
  }
}

export async function deleteCompleted() {
  try {
      await prisma.todo.deleteMany({
        where:{complete:true}
      })
    revalidatePath('/dashboard/server-todos')
    return NextResponse.json('Deleted', { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
