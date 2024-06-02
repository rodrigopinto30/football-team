import React from 'react'

interface Props{
  titulo: string;
}

const Title : React.FC<Props> = ({titulo}) => { 
  return (
    <h2 className='font-mont font-semibold text-white text-center text-lg'>{titulo}</h2>
  )
}

export default Title