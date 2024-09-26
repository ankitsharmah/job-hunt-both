import React from 'react'
import { TailSpin, ThreeDots } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='flex items-center justify-center'>
    <ThreeDots color='#21130d' height={50} width={50}/>
  </div>
  )
}

export default Loader
