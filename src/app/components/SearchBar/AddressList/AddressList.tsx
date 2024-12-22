import { Feature } from '@/app/interfaces/address.interface'
import React, { FC } from 'react'

interface IProps {
  list: Feature[]
}
const AddressList: FC<IProps> = ({ list }) => {
  return (
    <div className='absolute top-100 flex flex-col gap-3 bg-green-400 z-10'>
      {
        list.map(ad => (
          <div key={ad.properties.id} >
            {ad.properties.city}
          </div>
        ))
      }
    </div>
  )
}

export default AddressList