
import React, { useState } from 'react'
import { ITodo } from '../type'

type Props = {
    saveTodo: (e: React.FormEvent, formData: ITodo | any) => void
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
    const [formData, setFormData] = useState<ITodo | {}>()

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }
    return (
        <form onSubmit={(e) => saveTodo(e, formData)} className='Form'>

            <div>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input onChange={handleForm} type="text"></input>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input onChange={handleForm} type="text"></input>
                </div>
            </div>
            <button disabled={formData === undefined ? true : false}>Adicionar Tarefa</button>
        </form>
    )
}
export default AddTodo