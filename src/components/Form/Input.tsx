import React, { ChangeEventHandler } from 'react'

interface Props {
    value: string;
    placeholder?: string;
    type: string;
    clases: string;
    id?:string;
    name?:string;
    checked?: boolean;
    change?: ChangeEventHandler<HTMLInputElement> | undefined;
    focus?: boolean;
}

const Input : React.FC<Props> = ({value, placeholder, type, clases, id, name, checked, change,focus}) => {
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
    />
  )
}

export default Input