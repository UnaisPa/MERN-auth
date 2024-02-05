import React from 'react'

const Badge = ({value}) => {
  return (
    <span className="inline-flex items-center rounded-md bg-slate-600 px-1 py-0 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-120/10">
        {value}
    </span>
  )
}

export default Badge