import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Frequency from './pages/Frequency';
import Login from './pages/Login';
import AssociateQU from './pages/AssociateQU';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Profile />}/>
        <Route path='/project' element={<Project />}/>
        <Route path='/frequency' element={<Frequency />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/associate' element={<AssociateQU />}/>
      </Routes>
      {/* <Footer /> */}
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
