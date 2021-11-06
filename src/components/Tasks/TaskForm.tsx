import { useDispatch } from 'react-redux';
import { useForm } from '../../Hooks/useForm';
import { v4 as uuidv4 } from 'uuid';
import { FormEvent, useState } from 'react';
import { addTaskAction } from '../../redux/actions/tasksAction';
import { ITask } from '../../interfaces/task';
import { alertQuestion } from '../../helpers/alerts';

interface IProps {
    stateTasks: ITask[]
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

const TaskForm: React.FC<IProps> = ({ stateTasks, setTasks }) => {
    const dispatch = useDispatch();
    const { values, handleInputChange, reset } = useForm({ description: '' });
    const { description } = values;


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (description.length > 3) {
            const task = { description, id: uuidv4().slice(30) };
            dispatch(addTaskAction(task, reset, { stateTasks, setTasks }));
        } else {
            alertQuestion('Your task must be at least 3 characters');
        }
    }

    return (
        <div className='contentFormTask'>
            <h2 className='formTask_Title' >Create a task here</h2>
            <form className='formTask' onSubmit={handleSubmit} >
                <input
                    type='text'
                    placeholder='¿What are you planning to do today?'
                    className='formTask_input'
                    autoComplete='off'
                    name='description'
                    autoFocus
                    value={description}
                    onChange={handleInputChange}
                />
                <button type='submit' className='formTask_button'>Add</button>
            </form>
        </div>
    )
}

export default TaskForm;
