import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alertDeleteItems, alertQuestion } from '../../helpers/alerts';
import { ITask, ITaskState } from '../../interfaces/task';
import { deleteORCompletedTaskAction, getTasksAction, setModalEditTaskt } from '../../redux/actions/tasksAction';
import EditTask from '../Modal/EditTask';
import TaskForm from './TaskForm'



type ReducerTask = { tasks: ITaskState };

const ListTasks = () => {
    const dispatch = useDispatch();
    const allTasks = useSelector((state: ReducerTask) => state.tasks.tasks);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        allTasks.length
            ? setTasks(allTasks)
            : dispatch(getTasksAction({ setTasks, setLoading }))
    }, [])


    const deleteTask = async (id: string | number) => {
        const resp: boolean = await alertDeleteItems('Are you sure you want to delete the task?');
        resp && dispatch(deleteORCompletedTaskAction(id, 'deleteTask', { stateTasks: tasks, setTasks }));
    }

    const modalEdit = (dataTaskToEdit: ITask) => {
        dispatch(setModalEditTaskt(dataTaskToEdit));
        setOpenModal(true);
    }

    const taskCompleted = async (id: string | number) => {
        const resp: boolean = await alertQuestion('You finished the task?');
        resp && dispatch(deleteORCompletedTaskAction(id, 'completedTask', { stateTasks: tasks, setTasks }));
    }

    return (
        <>
            <TaskForm stateTasks={tasks} setTasks={setTasks} />
            {openModal && <EditTask closeModal={setOpenModal} setTasks={setTasks} stateTasks={tasks} />}
            {
                tasks.map(task => (
                    <div className='contentList' key={task.id}>
                        <div className='contentDescription'>
                            <p className='contentDescription_task'>
                                {task.description}
                            </p>
                        </div>
                        <div className='content_buttons'>

                            <button
                                className='content_buttons_finishTask'
                                type='button'
                                onClick={() => taskCompleted(task.id)}
                            >
                                completed
                            </button>

                            <button
                                className='content_buttons_editTask'
                                type='button'
                                onClick={() => modalEdit(task)}
                            >
                                edit
                            </button>
                            <button
                                className='content_buttons_deleteTask'
                                type='button'
                                onClick={() => deleteTask(task.id)}>
                                delete
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ListTasks;
