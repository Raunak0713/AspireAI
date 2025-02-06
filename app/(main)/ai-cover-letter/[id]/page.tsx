"use client"
import { useParams } from 'next/navigation'

export default function CoverLetterPage() {
  const params = useParams()
  const id = params.id // Access the id parameter

  return (
    <div className='flex items-center justify-center h-screen'>
      Cover Letter ID: {id}
    </div>
  )
}