'use client'
import { useTheme } from 'next-themes'
import { Suspense } from 'react'
import { BarLoader } from 'react-spinners'


interface DashboardLayoutProps {
  children : React.ReactNode
}

const DashboardLayout = ({ children } : DashboardLayoutProps) => {
  const { resolvedTheme } = useTheme()
  return (
    <div className='px-5'>
      <div className='flex items-center justify-between mb-5'>
        <h1 className={`text-6xl font-bold ${resolvedTheme === "dark" ? 'gradient-title-dark' : 'gradient-title-light'}`}>
          Industry Insights
        </h1>
      </div>
      <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='gray' />}>
        { children }
      </Suspense>
    </div>
  )
}

export default DashboardLayout