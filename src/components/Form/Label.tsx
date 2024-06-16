import React from 'react'

interface Props {
    titulo: string;
}

const Label : React.FC<Props>= ({titulo}) => {
  return (
    <label className='font-mont font-thin text-gray-100'>
        {titulo}
    </label>
  )
}

export default Label