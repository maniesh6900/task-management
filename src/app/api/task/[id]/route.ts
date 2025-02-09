import connectToDatabase from '../../../../db';
import Task from  "../../../../db/model";
import {NextRequest, NextResponse} from "next/server"

await connectToDatabase();


// export async function PUT(req: NextRequest) {
//     const { title, description, data, status, id } = await req.json();
//     try {
//         const updatedTask = await Task.findByIdAndUpdate(id, { title, description, data, status }, { new: true }); 
//         if (!updatedTask) {
//             return NextResponse.json({ message: "Task not found" }, { status: 404 }); 
//         }
//         return NextResponse.json(updatedTask, { status: 200 }); 
//     } catch (error) {
//         return NextResponse.json({ message: "Error updating task" }, { status: 500 }); 
//     }
// }

export async function PUT(req : NextRequest, {params} : any) {
    const {id } = params;
    try { 
       const res = await Task.findByIdAndUpdate(
            id, 
            {
                completed : true
            }
        )
    return NextResponse.json({res, message: "Task updated" }, { status: 200 }); 
    } catch (error) {
        console.error(error);   
        return NextResponse.json({ message: "Error updating task" }, { status: 500 }); 
    }
}


export async function DELETE(req : NextRequest, { params } : any) {
    const { id } = params;
    console.log(id);
    try {
        await  Task.findByIdAndDelete(id)
        return NextResponse.json({id, message: "Task deleted" }, { status: 200 });
    } catch (error) {
        console.error(error);   
        return NextResponse.json({ message: "Error deleting task" }, { status: 500 }); 
    }
}