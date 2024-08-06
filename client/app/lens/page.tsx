import { BackspaceIcon } from '@heroicons/react/20/solid'
import { BackwardIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='items-center text-center justify-center m-16 p-8 font-bold'> 
    <Link href={'/'} className='items-center'>
    <BackwardIcon className='w-4 h-4' />
    </Link>
    Coming Soon</div>
  )
}
