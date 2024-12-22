import Image from 'next/image'
import {Button} from '@nextui-org/react'
import SearchBar from './components/SearchBar/SearchBar'

export default function Home() {
  return (
    <div className='h-screen flex items-center justify-center'>
     <SearchBar/>
   </div>
  )
}
