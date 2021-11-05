import { FC, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../Hooks/useForm";
import { updateTaskAction } from "../../redux/actions/tasksAction";
import Edit from "./Edit";
import { ITaskState, ITask } from "../../interfaces/task";


type ReducerTask = { tasks: ITaskState }

interface IPropsModal {
    closeModal: (handle: boolean) => void
    stateTasks: ITask[]
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}


const EditTask: FC<IPropsModal> = ({ closeModal, stateTasks, setTasks }) => {
    const dispacth = useDispatch();
    const dataToEdit = useSelector((state: ReducerTask) => state.tasks.dataModalEdit);

    const { values, handleInputChange } = useForm<ITask>(dataToEdit);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispacth(updateTaskAction(values, closeModal, { stateTasks, setTasks }));
    }


    const dataToEditModal = { description: values.description };

    return (
        <Edit
            values={dataToEditModal}
            nameComponent='editTask'
            handleSubmit={handleSubmit}
            closeModal={closeModal}
            handleInputChange={handleInputChange}
        />
    )
}

export default EditTask;
