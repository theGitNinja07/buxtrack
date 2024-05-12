import React from 'react'

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] max-w-full">
      <span className="loading loading-spinner loading-lg text-success"></span>
    </div>
  )
}
export default Loader
