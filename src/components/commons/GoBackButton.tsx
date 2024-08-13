"use client"

import React from 'react'
import { useRouter } from '@/hooks/useRouter'
import { ArrowLeftCircle } from 'lucide-react'

export default function GoBackButton() {
  const router = useRouter()
  return (
    <div>
      <button
        onClick={() => router.back()}
        className='flex gap-2'>
        <ArrowLeftCircle className='size-6' />
        Go Back
      </button>
    </div>
  )
}
