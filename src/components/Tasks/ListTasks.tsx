import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditTask from '../Modal/EditTask';
import TaskForm from './TaskForm'
import { alertDeleteItems, alertQuestion } from '../../helpers/alerts';
import { deleteORCompletedTaskAction, getTasksAction, setModalEditTaskt } from '../../redux/actions/tasksAction';
import { AiFillEdit, AiOutlineCheck } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { ITask, ITaskState } from '../../interfaces/task';
import Spinner from '../utils/Spinner';



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
        <div className='listTask'>
            <TaskForm stateTasks={tasks} setTasks={setTasks} />
            {openModal && <EditTask closeModal={setOpenModal} setTasks={setTasks} stateTasks={tasks} />}

            {loading
                ? <Spinner />
                : tasks.map((task, index) => (
                    <div className='contentList' key={task.id}>
                        <div className='list__indexDescription'>
                            <span>{index}</span>
                            <p className='contentDescription_task'>{task.description}</p>
                        </div>
                        <div className='content_buttons'>
                            <button type='button' onClick={() => taskCompleted(task.id)}>
                                <AiOutlineCheck className='listTaskBtn' />
                            </button>

                            <button type='button' onClick={() => modalEdit(task)}>
                                <AiFillEdit className='listTaskBtn' />
                            </button>

                            <button type='button' onClick={() => deleteTask(task.id)}>
                                <MdDelete className='listTaskBtn' />
                            </button>
                        </div>
                    </div>
                ))
            }
            {!tasks.length && <p className='no-data'>Create your first task</p>}
        </div>
    )
}

export default ListTasks;
