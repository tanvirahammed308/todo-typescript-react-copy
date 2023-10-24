import React, { useRef } from 'react';
import"./style.css"
interface Props{
  todo:string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;  
  handleAdd: (e: React.FormEvent) => void; 
}
const InputField = ({todo,setTodo,handleAdd}:Props) => {
  const inputRef=useRef<HTMLInputElement>(null)
    return (
        <form className='input' onSubmit={(e)=>{
          inputRef.current?.blur();
          handleAdd(e)}}>
          <input 
          ref={inputRef}
          
          type="input" placeholder='write your task here' className='input_box' value={todo} onChange={(e)=>setTodo(e.target.value)}/>
          <button type="submit" className='input_submit'>Go</button>
        </form>
    );
};

export default InputField;