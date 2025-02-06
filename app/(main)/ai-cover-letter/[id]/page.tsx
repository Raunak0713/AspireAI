import React from 'react'

interface CoverLetterProps {
  params : {
    id : string
  }
}

const CoverLetter = async  ({ params } : CoverLetterProps) => {
  const id = params.id
  return (
    <div className='flex items-center justify-center h-screen'>{id}</div>
  )
}

export default CoverLetter