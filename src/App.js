import React from "react";
// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Error from './pages/Error';
import SingleRoomWrapper from "./pages/SingleRoomWrapper";
import {Route, Switch , Routes} from 'react-router-dom';

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path= '/' element={<Home/>}/>
      <Route path= '/rooms/' element={<Rooms/>}/>
      <Route path= '/rooms/:slug' element={<SingleRoomWrapper/>}/>
      <Route path = '*' element = {<Error />}/> {/* Catch-all route for unmatched paths */}
    </Routes>
    </>
  );
}

export default App;
