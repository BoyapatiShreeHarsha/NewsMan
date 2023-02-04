
import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const  App = ()=> {
  const newsperpage = 15;
  // api=process.env.REACT_APP_NEWS_API;
  const api="c24ba8c957b24a96acd5d2576a365e0f";
  const [progress, setProgress] = useState(0)
  

  // setProgress should be a arrow function only
  // setProgress = (prog)=>{
  //   this.setState({progress:prog})
  // }

  
    return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            height={3}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />

          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} api={api}  key="1" pageSize={newsperpage} country={"in"} category={"general"} />} />
            <Route exact path="/business" element={<News setProgress={setProgress} api={api} key="2" pageSize={newsperpage} country={"in"} category={"business"} />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} api={api} key="3" pageSize={newsperpage} country={"in"} category={"entertainment"} />} />
            <Route exact path="/health" element={<News setProgress={setProgress} api={api} key="4" pageSize={newsperpage} country={"in"} category={"health"} />} />
            <Route exact path="/science" element={<News setProgress={setProgress} api={api} key="5" pageSize={newsperpage} country={"in"} category={"science"} />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} api={api} key="6" pageSize={newsperpage} country={"in"} category={"sports"} />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} api={api} key="7" pageSize={newsperpage} country={"in"} category={"technology"} />} />
          </Routes>
        </BrowserRouter>
      </div>

    )
  
}

export default App;
