import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className='mt-36 md:mt-0'>
      <SignIn />
    </div>
  )
}