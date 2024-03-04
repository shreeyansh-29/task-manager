import prisma from "../../_utils/connect";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const {userId}  = auth();

        if(!userId){
            return NextResponse.json({error: 'Unauthorized', status: 401})
        }

        const {title, description, date, completed, important} = await request.json();

        if(!title || !description || !date){
            return NextResponse.json({error: 'Missing required fields', status: 400})
        }

        if(title.length < 3){
            return NextResponse.json({error: 'Title must be atleast 3 characters long', status: 400})
        }

        const task = await prisma.task.create({
            data:{
                title, description, date, isCompleted :completed, isImportant :important, userId,
            }
        })
        return NextResponse.json({task, status: 201})

    } catch (error) {
        console.log("Error Creating Task: ", error)
        return NextResponse.json({error: "Error Creating Task", status: 500})
    }
}

export async function GET(request: Request) {
    try {
        const {userId} = auth();
        if(!userId){
            return NextResponse.json({error: 'Unauthorized', status: 401})
        }
        const tasks = await prisma.task.findMany({
            where:{userId,}
        })
        return NextResponse.json({tasks, status: 200})
    } catch (error) {
        console.log("Error Getting Task: ", error)
        return NextResponse.json({error: "Error Getting Task", status: 500})
    }
}


export async function PUT(request: Request) {
    try {
        const {userId} = auth();
        if(!userId){
            return NextResponse.json({error: 'Unauthorized', status: 401})
        }
        const { isCompleted, id} = await request.json();
        const task = await prisma.task.update({
            where:{
                id,
            },
            data:{
                isCompleted,
            }
        })
        return NextResponse.json(task);
    } catch (error) {
        console.log("Error Updating Task: ", error)
        return NextResponse.json({error: "Error Updating Task", status: 500})
    }
}

export async function DELETE(request: Request) {
    try {
        
    } catch (error) {
        console.log("Error Deleting Task: ", error)
        return NextResponse.json({error: "Error Deleting Task", status: 500})
    }
}