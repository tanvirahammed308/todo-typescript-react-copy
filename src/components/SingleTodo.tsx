import React, { useEffect, useRef, useState } from 'react';
import { Todo } from './modal';
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import"./style.css"
import Swal from 'sweetalert2';

type Props={
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>

}
const SingleTodo = ({todo,todos,setTodos}:Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setAditTodo] = useState(todo.todo)
    const handleDone=(id:number)=>{
        setTodos(todos.map((todo)=>todo.id===id?{...todo,isDone:!todo.isDone}:todo))

    }
    const handleDelete=(id:number)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                setTodos(todos.filter((todo)=>todo.id !==id))
              Swal.fire(
                'Deleted!',
                'Your note has been deleted.',
                'success'
              )
            }
          })
        
    }
    const handleEdit=(e: React.FormEvent,id:number)=>{
       
        e.preventDefault();
        setTodos(todos.map((todo)=>(
            todo.id === id?{
                ...todo,todo:editTodo
            }:todo
        )))
        setEdit(false);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your text has been edited',
            showConfirmButton: false,
            timer: 1700
          })

    }
    const inputRef=useRef<HTMLInputElement>(null);
    useEffect(()=>{
        inputRef.current?.focus()
    },[edit])
    return (
        <form className='todos_single' onSubmit={(e)=>handleEdit(e,todo.id)}>
            {
                edit ? (
                    <input ref={inputRef}  value={editTodo} onChange={(e)=>setAditTodo(e.target.value)} className='todos-single-text'/>
                ):todo.isDone ? (<s className='todos_single_text'>
                        {
                            todo.todo
                        }
        
                    </s>): (<span className='todos_single_text'>
                        {
                            todo.todo
                        }
        
                    </span>)
                    


                
            }
            
            
            <div>
                <span className='icon' onClick={()=>{
                    if (!edit && !todo.isDone) {
                        setEdit(!edit)
                    }
                }}>
                <AiFillEdit />
                </span>
                <span className='icon' onClick={()=>handleDelete(todo.id)}>
                    <AiFillDelete/>
                </span>
                <span className='icon' onClick={()=>handleDone(todo.id)}>
                    <MdDone/>
                </span>
            </div>
            
        </form>
    );
};

export default SingleTodo;