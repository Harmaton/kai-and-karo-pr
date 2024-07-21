import Avatar from '@/components/avatar'
import { Chatbot } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default function Agentcard({bot}: {bot: Chatbot}) {
  return (
    <Link href={`/agent/${bot.id}`}>
    <div className='bg-white rounded-md flex flex-row justify-between p-2 hover:opacity-50 cursor-pointer '>
        <Avatar seed={bot.name} />
        <h2 className='text-black mr-2 my-auto'>{bot.name}</h2>
    </div>
    </Link>
  )
}
