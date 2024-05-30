import React from 'react'

interface Props{
  titulo: string;
}

const Title : React.FC<Props> = ({titulo}) => { 
  return (
    <h2 className='text-white text-lg underline underline-offset-4'>{titulo}</h2>
  )
}

export default Title