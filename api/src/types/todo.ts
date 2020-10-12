import { Document } from "mongoose"

export interface ITodo extends Document {
    nome: string
    descricao: string
    status: boolean
}
