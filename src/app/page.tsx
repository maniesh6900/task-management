'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState<any>();
    const [data, setData] = useState([]);

    useEffect(()=>{
        const hadnleAPI = async()=>{
            try {
                const res = await axios.get("http://localhost:3000/api/task");
                setData(res.data.data);
            } catch (error) {
                console.log(error, "ERROR");
                setData([]);
                setError(error)
            }
        }
        hadnleAPI();
    },[data])

    const handleCreateTask = async () => {
        try {
                await axios.post('http://localhost:3000/api/task', { title, description, dueDate });
                setTitle('');
                setDescription('');
                setDueDate('');
            
        } catch (error) {
            setError(error)    
        }
    };

    const handlerButton = async(task : any) =>{
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate);
        console.log(task.dueDate);
        await axios.delete(`/api/task/${task._id}`)
        
    }
    
    const deleteTask = async(id : string)=>{
        console.log(id);
        try {
            const res =  await axios.delete(`/api/task/${id}`)
            console.log(res);
        } catch (error) {
            console.log("error")
            console.log(error)
        }
    }

    const HandleComplateTask = async (id : string) => {
        try {
            await axios.put(`/api/task/${id}`)
        } catch (error) {
            console.error(error); 
        } 
    }
    
    if (error) return <div>Failed to load tasks</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div
            className='h-screen w-screen'
        >
            <h1>Task Manager</h1>

            <div
                className='flex flex-col justify-center items-left gap-4 p-4 bg-slate-600 rounded-lg w-2/4 '
            > 
                <h2>Create Task</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className=' text-black p-2 rounded'
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className=' text-black p-2 rounded'
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className=' text-black p-2 rounded'
                />
                <button 
                    type='button' 
                    onClick={handleCreateTask}
                   
                    className='bg-white mx-2 text-black text-sm p-3 rounded-lg w-52 font-bold '
                    >Create Task</button>
            </div>

            <h2>Tasks</h2>
            <ol 
                className='w-1/5  p-4 rounded flex flex-col gap-6 '
            >
                {data.map((task : any) => (
                    <li 

                        key={task._id} 
                        className={` ${ task.completed ? 'line-through' : '' }  rounded bg-slate-500 p-4 ` }
                        
                    >
                        <h3>Title:  {task.title}</h3>
                        <p>Desc:  {task.description}</p>
                        <p>Date:  {new Date(task.dueDate).toLocaleDateString()}</p>
                        <p>State: {task.completed ? "complete" : "Incomplete"}</p>
                        <button
                            className="m-4 bg-slate-600 p-2 font-bold rounded-lg"
                            onClick={()=>handlerButton(task)}
                        >
                            Update</button>
                        <button
                            className="my-4 bg-red-600 p-2 font-bold rounded-lg"
                            onClick={()=>deleteTask(task._id)}
                        >
                            delete</button>
                        <button
                            className="m-4 bg-green-600 p-2 font-bold rounded-lg"
                           onClick={()=>HandleComplateTask(task._id) }  
                        >
                            Done</button> 
                    </li>
                ))}
            </ol>
        </div>
    );
};




// <select
// className='text-black'
// title="state"
// onChange={(e) => handleUpdateTask({ ...task, completed: e.target.value === 'complated' })}
// >  
// <option>{}</option>
// <option>incomplated</option>
// </select>