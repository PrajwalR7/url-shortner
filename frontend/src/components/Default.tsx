import axios from 'axios'
import { MouseEvent, useRef, useState } from 'react'
import { SERVER_URL } from '../const'

function Default() {
  const shortUrlRef = useRef<HTMLInputElement>(null)
  const longUrlRef = useRef<HTMLInputElement>(null)
  const [urlGenerated, setUrlGenerated] = useState<string>("")

  const clickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    let urlBody: Record<string, unknown> = {
      fullUrl: longUrlRef.current?.value
    }

    if (shortUrlRef.current?.value.length !== 0) {
      urlBody = {
        ...urlBody,
        shortUrl: shortUrlRef.current?.value
      }
    }
    try {
      const response = await axios.post(SERVER_URL, urlBody)
      setUrlGenerated(response.data.shortUrl)
      if (longUrlRef.current && shortUrlRef.current) {
        longUrlRef.current.value = ""
        shortUrlRef.current.value = ""
      }
    } catch (e) {
      setUrlGenerated("") 
    }
  }

  return (
    <div className='min-h-screen w-full bg-black p-8 flex justify-center items-center text-white'>
      <div className='p-8 flex flex-col border-white border-2 w-[40%] gap-3 rounded-xl'>
        <h3 className='text-2xl font-semibold'>Create a shortUrl</h3>
        <input ref={longUrlRef} className='p-2 bg-transparent ring-white ring-1 rounded-md' type='text' placeholder='Paste your lengthy URL'/>
        <input ref={shortUrlRef} className='p-2 bg-transparent ring-white ring-1 rounded-md' type='text' placeholder='Optional short URL name that you like'/>
        <div className='flex flex-row justify-between items-center'>
          <button onClick={clickHandler} className='px-5 py-2 text-md mt-2 bg-white text-black rounded-full w-max'>Create</button>
          {urlGenerated.length !== 0 ? <p className='text-md'>Generated URL - <span className='underline'>{urlGenerated}</span></p> : <p className='text-md'></p>}
        </div>
      </div>
    </div>
  )
}

export default Default
