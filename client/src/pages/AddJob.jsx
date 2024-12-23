import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
const AddJob = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('Banglore')
  const [category, setCategory] = useState('Programming')
  const [level, SetLevel] = useState('Beginner level')
  const [salary, setSalary] = useState(0)
  const editorRef = useRef(null)
  const quilref = useRef(null)
  useEffect(() => {
    //Initiate quil only once
    if (!quilref.current && editorRef.current) {
      quilref.current = new Quill(editorRef.current, {
        theme: 'snow',
      })

    }
  }, [])
  return (
    <form className='container p-4 flex flex-col w-full items-start gap-3'>
      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' type="text" placeholder='Type here' onChange={e => setTitle(e.target.value)} value={title} required />
      </div>
      <div className='w-full max-w-lg'>
        <p className='m-5'>Job Description</p>
        <div ref={editorRef}>

        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>


        <div>
          <p className='mb-2'>Job Category</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setCategory(e.target.value)}>
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

        </div>
        <div>
          <p className='mb-2'>Job Location</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLocation(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>

        </div>
        <div>
          <p className='mb-2'>Job Level</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => SetLevel(e.target.value)}>
            <option value='Beginner level'>Beginner level</option>
            <option value='Intermediate level'>Intermediate level</option>
            <option value='Senior level'>Senior level</option>
            
          
          </select>

        </div>
      </div>
      <div>
        <p className='mb-2'>Job Salary</p>
        <input min={0} className='w-full px-3 py-2 border-2 rounded sm:w[120px] border-gray-300' onChange={e=>setSalary(e.target.value)} type="Number" placeholder='2500' />
      </div>
      <button className='w-28 py-3 rounded text-white  cursor-pointermt-4 bg-black'>ADD</button>
    </form>
  )
}

export default AddJob