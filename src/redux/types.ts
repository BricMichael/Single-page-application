export enum AuthType {
    registerUser = '[AUTH] registerUser',
    loginUser = '[AUTH] loginUser',
    validToken = '[AUTH]  validToken',
    logout = '[AUTH] logout',
}


export enum PostType {
    savedPosts = '[POSTS] savedPosts',
    addPost = '[POSTS] addPost',
    updatePost = '[POSTS] updatePost',
    dataModalEdit = '[POSTS] dataModalEdit',
    closeModal = '[POSTS] closeModal',
    deletePost = '[POSTS] deletePost',
    clearDataPost = '[POSTS] clearDataPost'
}

export enum TaskType {
    getTasks = '[TASK] getTasks',
    addTask = '[TASK] addTask',
    updateTask = '[TASK] updateTask',
    dataModalEditTask = '[TASK] dataModalEditTask',
    closeModalTask = '[TASK] closeModalTask',
    deleteOrCompletedTask = '[TASK] deleteOrCompletedTask',
}