import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../Components/sidebar/sidebar'
import Feed from '../../Components/Feed/Feed'
import { useSearchParams } from 'react-router-dom'
const Home = ({sidebar}) => {
    const [category,setCategory]=useState(0);
  return (
    <>
    <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
    <div className={`container ${sidebar?"":'large-container'}`}>
        <Feed category={category}/>
    </div>
    </>
  )
}

export default Home