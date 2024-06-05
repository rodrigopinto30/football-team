import React, { ChangeEventHandler } from 'react'

interface Props {
    value: string | number;
    placeholder?: string;
    type: string;
    clases: string;
    id?:string;
    name?:string;
    checked?: boolean;
    change?: ChangeEventHandler<HTMLInputElement> | undefined;
    focus?: boolean;
    min?: number;
    max?:number;
}

const Input : React.FC<Props> = ({value, placeholder, type, clases, id, name, checked, change,focus, min, max}) => {
  return (
    <input 
        value={value}
        placeholder={placeholder}
        type={type}
        className={clases}
        id={id}
        name={name}
        checked={checked}
        autoFocus={focus}
        onChange={change}
        min={min}
        max={max}
    />
  )
}

export default Input