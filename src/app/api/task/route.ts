import connectToDatabase from '../../../db';
import Task from  "../../../db/model";
import {NextRequest, NextResponse} from "next/server"

await connectToDatabase();

export async function GET(){
   try {
       const data =  await Task.find();
       return NextResponse.json({data});
   } catch (error : any) {
        return NextResponse.json({msg : "Database Error"});
   }
}

export async function POST(req : NextRequest){
    const {title, description, dueDate } = await req.json();
     if([title, description, dueDate].some(field => field === undefined)) {
        return NextResponse.json({error: "All fields are required"}, {status: 400}) 
     }
    await Task.create({title, description,dueDate});
    const task = await Task.findOne({title});
    return NextResponse.json(task, {status: 201}) 
} 
