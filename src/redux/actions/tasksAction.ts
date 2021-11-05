import { Dispatch } from "react";
import * as api from '../../api/api';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ITask, ITaskState } from "../../interfaces/task";
import { TaskType } from "../types";
import { alertSuccess, anErrorHasOccurred } from '../../helpers/alerts';


interface IProps {
    setTasks: Dispatch<React.SetStateAction<ITask[]>>
    setLoading: Dispatch<React.SetStateAction<boolean>>
}

interface IStateAndSetState {
    stateTasks: ITask[]
    setTasks: IProps['setTasks']
}

type CloseModal = (handle: boolean) => void;
type DispachAsync = ThunkDispatch<ITaskState, never, AnyAction>

export const getTasksAction = ({ setTasks, setLoading }: IProps): DispachAsync => async (dispatch: any) => {
    try {
        setLoading(true);
        const { data } = await api.apiGetTasks();
        setLoading(false);

        if (data) {
            setTasks(data);
            dispatch({ type: TaskType.getTasks, payload: data })
        }
    } catch (error) {
        console.log(error);
    }
}


export const addTaskAction = (task: ITask, resetState: () => void, { stateTasks, setTasks }: IStateAndSetState): DispachAsync => async (dispatch: any) => {
    try {
        setTasks([task, ...stateTasks]); // implement the change immediately for a better user experience.
        alertSuccess('Task created successfully');

        const { status } = await api.apiAddTask(task);

        if (status >= 400) {
            anErrorHasOccurred('There was an error saving the task');
            setTasks(stateTasks); //if an error occurs, keep the old data.      
        } else {
            resetState();
            dispatch({ type: TaskType.addTask, payload: task });
        }
    } catch (error) {
        console.log(error);
    }
}


export const setModalEditTaskt = (task: ITask) => ({ type: TaskType.dataModalEditTask, payload: task });

export const clearDataModalEditTask = () => ({ type: TaskType.closeModalTask });



export const updateTaskAction = (newTask: ITask, closeModal: CloseModal, { stateTasks, setTasks }: IStateAndSetState): DispachAsync => async (dispatch: any) => {
    try {
        // implement the change immediately for a better user experience
        setTasks(stateTasks.map(task => task.id === newTask.id ? newTask : task));
        closeModal(false);
        alertSuccess('Updated task');

        const { status } = await api.apiUpdateTask(newTask.id, newTask);

        if (status >= 400) {
            anErrorHasOccurred('An error has occurred, changes have not been saved');
            setTasks(stateTasks) //if an error occurs, keep the old data 
        } else {
            dispatch({ type: TaskType.updateTask, payload: newTask });
        }
    } catch (error) {
        console.log(error);
    }
}


type ID = string | number
type Type = 'deleteTask' | 'completedTask'

export const deleteORCompletedTaskAction = (id: ID, type: Type, { stateTasks, setTasks }: IStateAndSetState): DispachAsync => async (dispatch: any) => {
    try {
        // implement the change immediately for a better user experience
        setTasks(stateTasks.filter(task => task.id !== id));
        alertSuccess(type === 'deleteTask' ? 'Task removed successfully' : 'Changes saved');

        const { status } = await api.apiDeleteTask(id);

        if (status >= 400) {
            anErrorHasOccurred('An error occurred the operation could not be completed');
            setTasks(stateTasks); //if an error occurs, keep the old data 
        } else {
            dispatch({ type: TaskType.deleteOrCompletedTask, payload: { id } });
        }
    } catch (error) {
        console.log(error);
    }
}