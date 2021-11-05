import { TaskType } from "../redux/types"


export interface ITask {
    id: number | string
    description: string
}

interface IAddTask {
    type: TaskType.addTask
    payload: ITask
}

interface IGetTasks {
    type: TaskType.getTasks
    payload: ITask[]
}

interface IUpdateTask {
    type: TaskType.updateTask
    payload: ITask
}

interface IDataModalEditTaskt {
    type: TaskType.dataModalEditTask
    payload: ITask
}

interface ICloseModalTask { type: TaskType.closeModalTask }

interface IDeleteOrCompletedTask {
    type: TaskType.deleteOrCompletedTask
    payload: { id: number | string }
}


export type ITaskActions = IAddTask | IGetTasks | IUpdateTask | IDataModalEditTaskt | ICloseModalTask | IDeleteOrCompletedTask


export interface ITaskState {
    tasks: ITask[]
    dataModalEdit: ITask
}