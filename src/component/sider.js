import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Hills from './image/Hills.jpg'
import Uppal from './image/Uppal.JPG'
import Main from './Main'
import {
    faBars, faBarsProgress, faFileCircleQuestion
} from '@fortawesome/free-solid-svg-icons'
import About from './About'
function Sider() {
    const [isopen, setIsopen] = useState()
    const [isSignup, setIssignup] = useState()

    const [currentTime, setCurrentTime] = useState(new Date());


     useEffect(() => {
            // Update the time every second
            const timer = setInterval(() => {
                setCurrentTime(new Date());
            }, 1000);
    
            // Cleanup the interval on component unmount
            return () => clearInterval(timer);
        }, []);
    
        // Format time and date
        const formatTime = currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        const formatDate = currentTime.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    
        function toggledropdown() {
            setIsopen(!isopen)
        }
      ;

    return (
        <>
            {!isopen ? (<div>
                <div className="fixed w-72 top-0 left-0 z-40 h-screen bg-white  ">
                    <header
                        className=" h-48 bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${Hills})` }}
                    >
                     <button className="ml-5 text-2xl text-white sm:hidden" onClick={toggledropdown}><FontAwesomeIcon icon={faBars} /></button>
                        <img className="size-20 absolute bottom-20 rounded-full left-6 shadow-lg shadow-white" src={Uppal} alt='' />
                        <h1 className=" absolute bottom-14 text-xl text-white font-medium left-6"> Ranjeet Singh</h1>
                        <h1 className=" absolute bottom-8 text-white left-6"> ranjeet0805</h1>
                    </header>
                    <ul className="ring-1 h-screen ring-slate-300 pt-2">
                        <li className="w-72 h-12 bg-white flex  items-center justify-center   ">
                            <button onClick={() => setIssignup(true)} className={isSignup ? 'w-72 h-12 bg-slate-300  ' : ""}><FontAwesomeIcon className="mr-14" icon={faBarsProgress} />Todo</button>
                        </li>
                        <li className="w-72 h-12 bg-white  flex items-center justify-center ">
                            <button onClick={() => setIssignup(false)} className={!isSignup ? 'w-72 h-12 bg-slate-300 ' : ""}><FontAwesomeIcon className="mr-14" icon={faFileCircleQuestion} />About</button>
                        </li>
                    </ul>
                </div>

                <div className=' sm:ml-72 '>
                    <div>

                    </div>
                    <div className=" h-48 bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${Hills})` }}>
                       
                        <button className="ml-5 text-2xl text-white " onClick={toggledropdown}><FontAwesomeIcon icon={faBars} /></button>
                        <h1 className=" absolute bottom-20 text-4xl text-white font-normal left-6"> Todo A...</h1>
                        <div className="text-xl font-extrabold text-white absolute bottom-10 left-6 ">{formatTime}</div>
                        <div className="text-lg font-medium text-white absolute bottom-4 left-6">{formatDate}</div>

                    </div>


                </div>

                {isSignup ? (
                    <div className="sm:ml-72">
                        {/* Input Section */}
                      <Main/>

                    </div>
                ) : (<div className="sm:ml-72 p-4 ">
                    <About/>
                </div>)}
            </div>) : (<div>
                <div className='  '>
                    {/* <div>
                        <button className="ml-5 text-xl" onClick={toggledropdown}><FontAwesomeIcon icon={faBars} /></button>
                    </div> */}
                    <div>

                        <div className=" h-48 bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${Hills})` }}>
                            
                            <button className="ml-5 text-2xl text-white " onClick={toggledropdown}><FontAwesomeIcon icon={faBars} /></button>
                            <h1 className=" absolute bottom-20 text-4xl text-white font-normal left-6"> Todo A...</h1>
                            <div className="text-xl font-extrabold text-white absolute bottom-10 left-6 ">{formatTime}</div>
                            <div className="text-lg font-medium text-white absolute bottom-4 left-6">{formatDate}</div>

                        </div>
                    </div>


                </div>
                {isSignup ? (
                    <div className="">
                        {/* Input Section */}
                <Main/>
                    </div>
                ) : (<div className=" p-4 ">
                   <About/>
                </div>)}
            </div>)}
        </>
    )
}

export default Sider
