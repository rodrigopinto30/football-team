import React from 'react'

interface Props {
    title: string;
    clases: string;
    onclick: ()=>void;
}

const Button : React.FC<Props> = ({clases, onclick, title}) => {
  return (
    <button
        className={clases}
        onClick={onclick}
    >
        {title}
    </button>
  )
}

export default Button