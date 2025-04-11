import React from 'react'
import {Heart} from 'lucide-react'

export default function Like() {
  return (
    <div className='px-3 py-1 flex gap-2 border rounded-full items-center'><Heart size={15} /><p>2k</p></div>
  )
}
