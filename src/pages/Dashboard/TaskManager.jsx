import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FaTrash, FaEdit } from 'react-icons/fa'; 



const TaskDashboard = () => {
    const { register, handleSubmit, reset } = useForm();
    const [tasks, setTasks] = useState([]);


    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [closed, setClosed] = useState([]);

    useEffect(() => {
        const fTodos = tasks.filter(task => task.status === 'todo');
        const fInProgress = tasks.filter(task => task.status === 'inprogress');
        const fClosed = tasks.filter(task => task.status === 'closed');


        setTodos(fTodos);
        setInProgress(fInProgress);
        setClosed(fClosed);

    }, [tasks])

    const statuses = ['todo', 'inprogress', 'closed']



    const handleTaskSubmit = (data) => {
        const newTask = {
            id: tasks.length + 1,
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority,
            status: 'todo',
        };

        fetch('https://task-manager-server-umber.vercel.app/toDoList', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        reset();
    };


    useEffect(() => {
        fetch('https://task-manager-server-umber.vercel.app/toDoList')
            .then(res => res.json())
            .then(data => {
                setTasks(data)
            });
    }, [tasks])


    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Management Dashboard</h1>

            <form className="mb-6" onSubmit={handleSubmit(handleTaskSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input {...register('title')} type="text" placeholder="Task Title" className="w-full p-2 border rounded" required />
                    <input {...register('description')} type="text" placeholder="Task Description" className="w-full p-2 border rounded" />
                    <input {...register('deadline')} type="date" className="w-full p-2 border rounded" />
                    <select {...register('priority')} className="w-full p-2 border rounded">
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 mt-4 rounded">Add Task</button>
            </form>


            <DndProvider backend={HTML5Backend}>
                <div className='flex gap-5'>
                    {
                        statuses.map((status, index) => (
                            <Section2
                                key={index}
                                status={status}
                                setTasks={setTasks}
                                tasks={tasks}
                                todos={todos}
                                inProgress={inProgress}
                                closed={closed}
                            >

                            </Section2>
                        ))
                    }
                </div>
            </DndProvider>



        </div>
    );
};

export default TaskDashboard;



const Section2 = ({ status, tasks, setTasks, todos, inProgress, closed }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => addItemToSection(item._id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = 'Todo';
    let tasksToMap = todos;

    if (status === 'inprogress') {
        text = 'In Progress'
        tasksToMap = inProgress
    }

    if (status === 'closed') {
        text = 'Closed'
        tasksToMap = closed
    }

    const addItemToSection = id => {
        setTasks(prev => {
            const mTasks = prev.map(t => {
                if (t._id === id) {
                    return { ...t, status: status }
                }

                return t;
            })

            return mTasks;
        })
    }

    return (
        <div ref={drop} className='text-sm text-white'>
            <div className='bg-orange-400 h-12 pl-4 rounded-md uppercase '>
                {text}
            </div>

            {tasksToMap.length > 0 && tasksToMap.map((task) => <Task
                key={task._id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
            ></Task>)}
        </div>
    );
};


const Task = ({ task, tasks, setTasks }) => {
    const [isEditing, setEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`https://task-manager-server-umber.vercel.app/toDoList/${taskId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedTasks = tasks.filter((t) => t._id !== taskId);
                setTasks(updatedTasks);
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const updateTask = async () => {
        try {
            const response = await fetch(`https://task-manager-server-umber.vercel.app/updateTask/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(editedTask),
            });

            if (response.ok) {
                const updatedTasks = tasks.map((t) => (t._id === task._id ? editedTask : t));
                setTasks(updatedTasks);
                setEditing(false);
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleRemove = (id) => {
        deleteTask(id);
    };

    const handleUpdate = () => {
        setEditedTask({ ...task });
        setEditing(true);
    };


    const handleCancel = () => {
        setEditing(false);
        setEditedTask({ ...task });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return (
        <div
            ref={drag}
            className={`w-48 relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? 'opacity-25' : 'opacity-100'}`}
        >
            {isEditing ? (
                <div>
                    <input type="text" name="title" value={editedTask.title} onChange={handleInputChange} />
                    <input type="text" name="description" value={editedTask.description} onChange={handleInputChange} />
                    <input type="date" name="deadline" value={editedTask.deadline} onChange={handleInputChange} />
                    <select name="priority" value={editedTask.priority} onChange={handleInputChange}>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                    </select>
                    <button onClick={updateTask}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{task.title}</p>
                    <p>Description: {task.description}</p>
                    <p>Deadline: {task.deadline}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Status: {task.status}</p>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className='text-slate-400 focus:outline-none'
                            onClick={() => handleRemove(task._id)}
                        >
                            <FaTrash />
                        </button>
                        <button
                            className='text-slate-400 focus:outline-none'
                            onClick={handleUpdate}
                        >
                            <FaEdit />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};