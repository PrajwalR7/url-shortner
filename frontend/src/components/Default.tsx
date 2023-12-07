import axios from 'axios'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { SERVER_URL } from '../const'

interface FrequentUrlsType {
  shortUrl: string
  fullUrl: string
  clicks: 0
}

function Default() {
  const shortUrlRef = useRef<HTMLInputElement>(null)
  const longUrlRef = useRef<HTMLInputElement>(null)
  const [urlGenerated, setUrlGenerated] = useState<string>("")
  const [frequentUrls, setFrequentUrls] = useState<FrequentUrlsType[]>([])

  useEffect(() => {
    const fetchFrequentUrls = async () => {
      console.log('api call')
      const response = await axios.get(`${SERVER_URL}/frequent`)
      console.log(response)
      const frequent = response.data
      console.log('Frequent URLs - ', frequent)
      setFrequentUrls(frequent)
    }

    fetchFrequentUrls()
  }, [])

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

  const urlClickHandler = (e: MouseEvent<HTMLSpanElement>, url: string) => {
    e.preventDefault()
    window.open(url, '_blank')
  }

  return (
    <div className='min-h-screen w-full bg-black p-8 flex flex-col gap-12 justify-center items-center text-white'>
      <div className='p-8 flex flex-col border-white border-2 w-[40%] gap-3 rounded-xl'>
        <h3 className='text-2xl font-semibold'>Create a shortUrl</h3>
        <input ref={longUrlRef} className='p-2 bg-transparent ring-white ring-1 rounded-md' type='text' placeholder='Paste your lengthy URL'/>
        <input ref={shortUrlRef} className='p-2 bg-transparent ring-white ring-1 rounded-md' type='text' placeholder='Optional short URL name that you like'/>
        <div className='flex flex-row justify-between items-center'>
          <button onClick={clickHandler} className='px-5 py-2 text-md mt-2 bg-white text-black rounded-full w-max'>Create</button>
          {urlGenerated.length !== 0 ? <p className='text-md'>Generated URL - <span className='underline'>{urlGenerated}</span></p> : <p className='text-md'></p>}
        </div>
      </div>
      {frequentUrls.length !== 0 && 
        <div className='flex flex-col justify-center items-center gap-4 text-white'>
          <h2 className='text-xl font-medium'>Most Frequently visited Urls</h2>
          <div className='flex flex-col border-2 border-white p-6 rounded-xl w-[60%]'>
            <div className='flex flex-col items-center w-full gap-2'>
            {frequentUrls.map((urls, index) => {
              return (
                  <li className='flex flex-row mb-2 gap-6 w-full'>
                    <p className='max-w-[60%]'>{index+1}. ShortURL - <span onClick={(e) => urlClickHandler(e, urls.shortUrl)} className='underline text-indigo-400 hover:cursor-pointer'>{urls.shortUrl}</span></p>
                    <p className='truncate max-w-[40%]'>LongURL - <span onClick={(e) => urlClickHandler(e, urls.shortUrl)} className='underline text-indigo-400 hover:cursor-pointer'>{urls.fullUrl}</span></p>
                  </li>
              )
            })}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Default
