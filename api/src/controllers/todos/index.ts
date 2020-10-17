import { Response, Request } from "express"
import { ITodo } from "./../../types/todo"
import Todo from "../../models/todo"


const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find()
        res.status(200).json({ todos })
    }
    catch (e) {
        throw e
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body)
        const body = req.body as Pick<ITodo, "name" | "description" | "status">
    
        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: true
        })
        const newTodo: ITodo = await todo.save()
        const allTodos: ITodo[] = await Todo.find()

        res.status(201).json({ message: "Todo Added", todo: newTodo, todos: allTodos })
    }
    catch (e) {
        throw e
    }
}


const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo Updated",
            todo: updateTodo,
            todos: allTodos
        })
    }
    catch (e) {
        throw e
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {

    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        const allTodos: ITodo[] = await Todo.find()

        res.status(200).json({
            message: "Todo Deleted",
            todo: deleteTodo,
            todos: allTodos
        })

    }
    catch (e) {
        throw e
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
