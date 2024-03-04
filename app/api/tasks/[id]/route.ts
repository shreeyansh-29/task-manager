import prisma from "../../../_utils/connect";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    try {
        const {userId} = auth();
        const {id} = params;

        if(!userId){
            return NextResponse.json({error: 'Unauthorized', status: 401})
        }

        const task = await prisma.task.delete({where: {id}});
        return NextResponse.json(task)
    } catch (error) {
        console.error("Error deleting task: ", error);
        return NextResponse.json({error:'Error deleting task',status: 500})
    }
}