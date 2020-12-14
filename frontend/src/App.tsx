import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Frequency from './pages/Frequency';
import Login from './pages/Login';
import AssociateQU from './pages/AssociateQU';
import ChangePassword from './pages/ChangePassword';
import FieldJournal from './pages/fieldJournal';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/project' element={<Project />}/>
        <Route path='/frequency' element={<Frequency />}/>
        <Route path='/field-journal' element={<FieldJournal />}/>
        <Route path='/associate' element={<AssociateQU />}/>
        <Route path='/change-password' element={<ChangePassword />}/>
      </Routes>
      {/* <Footer /> */}
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
