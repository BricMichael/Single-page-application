import { ITaskActions, ITaskState } from "../../interfaces/task";
import { TaskType } from "../types";



const initialState: ITaskState = {
    tasks: [],
    dataModalEdit: { id: '', description: '' }
}

const taskReducer = (state = initialState, action: ITaskActions) => {
    switch (action.type) {
        case TaskType.addTask:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }
        case TaskType.getTasks:
            return {
                ...state,
                tasks: [...action.payload]
            }
        case TaskType.dataModalEditTask:
            return {
                ...state,
                dataModalEdit: action.payload
            }
        case TaskType.closeModalTask:
            return {
                ...state,
                dataModalEdit: initialState.dataModalEdit
            }
        case TaskType.updateTask:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id
                    ? action.payload
                    : task
                ),
                dataModalEdit: initialState.dataModalEdit
            }
        case TaskType.deleteOrCompletedTask:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.id)
            }
        default:
            return state;
    }
}


export default taskReducer;

