import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import WeatherHistory from '../Home/WeatherHistory/WeatherHistory'

function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/weatherhistory' element={<WeatherHistory/>} />
            <Route path='*' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routing
