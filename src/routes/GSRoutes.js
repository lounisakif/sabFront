import React, {  useEffect, useState } from 'react';
import isLoggedIn from '../utils/isLoggedIn';
import {Routes,Route,Navigate} from 'react-router-dom';
import {Container,Row} from 'react-bootstrap'
import Router from './Router'
//includes

import SideBar from '../includes/SideBar'
//pages
import H from '../pages/H'
import NavBarGS from '../includes/NavBarGS';



function verify() { 
        if (isLoggedIn() === 'admin') {  
              return  <Navigate to="/"/> 
        }
        else{ 
                 return <Router/> } 
    }
function GSRoutes() { 
  const [show,setShow]= useState(false)
  useEffect(() => { verify() }); 
  return (
     
        <Container  fluid >
        <Row>
        <NavBarGS/>
        </Row>
        <Row>

       
   
        <Routes>
             <Route path="/" element={ <H/>} />
         
        </Routes>
        </Row>
        </Container>
       
  )

  } 
export default GSRoutes;