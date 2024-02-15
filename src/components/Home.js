import React, { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import VideoList from './VideoList'
import { mediaJSON } from '../data/Videodata'


const Home = () => {
    const [currentVideo, setCurrentvideo] = useState({})
    const [queue, setQueue] = useState([])
    const [searchList, setSearchList] = useState([])
    const [isClicked, setIsClicked] = useState(false)

    const handleUpdatevideo = (video) => {
        setCurrentvideo(video)
    }
    const handleVideoEnd = () => {
        const video = queue?.filter((video) => video?.id === currentVideo?.id + 1)?.[0]
        if (video)
            setCurrentvideo(video)
    }

    useEffect(() => {
        setQueue(mediaJSON?.categories?.[0]?.videos)
    }, [])
    useEffect(() => {
        setCurrentvideo(queue?.[0])
    }, [queue])

    const handleQueue = (newQueue) => {
        setQueue(newQueue)
    }

    const handleInputChange = (e) => {
        const val = e.target.value
        console.log(val)
        if (val) {
            const filteredlist = queue?.filter((item) => item?.title?.toLowerCase()?.includes(val?.toLowerCase()));
            setSearchList(filteredlist)
        } else {
            setSearchList([])
        }

    }

    const handleItemClick = (item) => {
        setCurrentvideo(item)
        setIsClicked(true)
    }
    return (
        <div className="container p-4">
            <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-10 h-auto font-bold flex gap-20">
                Video Player
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={handleInputChange}
                        onFocus={() => setIsClicked(false)}
                        className="border border-gray-300 px-4 py-2 mr-2 rounded focus:outline-none focus:border-blue-500 text-black font-normal w-[500px]"
                    />
                    {searchList?.length > 0 && !isClicked &&
                        <div className='absolute bg-white text-black p-4  w-[500px] border border-gray-300 rounded'>
                            {
                                searchList?.map((item, index) => {
                                    return (
                                        <div key={item?.title} className='cursor-pointer' onClick={() => handleItemClick(item)}>
                                            <h1>{item?.title}</h1>
                                            {index !== searchList?.length - 1 && <hr className='mt-2' />}
                                        </div>
                                    )
                                })
                            }
                        </div>}
                </div>
            </header>
            <div className="flex gap-4 mt-16 px-20">
                <div className='w-[75%]'>
                    <VideoPlayer video={currentVideo} handleVideoEnd={handleVideoEnd} />
                </div>
                <div className='w-[25%]'>
                    <VideoList queue={queue} handleUpdatevideo={handleUpdatevideo} handleQueue={handleQueue} currentVideo={currentVideo} />
                </div>
            </div>
        </div>
    )
}

export default Home