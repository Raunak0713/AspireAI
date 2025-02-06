import React from 'react'

const CoverLetter = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  return (
    <div className='flex items-center justify-center h-screen'>{id}</div>
  )
}

export default CoverLetter
