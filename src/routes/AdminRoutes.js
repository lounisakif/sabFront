import React, {  useEffect, useState } from 'react';
import isLoggedIn from '../utils/isLoggedIn';
import {Routes,Route,Navigate} from 'react-router-dom';
import {Container} from 'react-bootstrap'
import Router from './Router'
//includes
import NavBar from '../includes/NavBar';
import SideBar from '../includes/SideBar'
//pages
import GestionAdmins from '../pages/GestionAdmins'



function verify() { 
        if (isLoggedIn() === 'admin') {  
              return  <Navigate to="/"/> 
        }
        else{ 
                 return <Router/> } 
    }
function AdminRoutes() { 
  const [show,setShow]= useState(false)
  useEffect(() => { verify() }); 
  return (
     
        <Container className=" d-flex" fluid >
            
        <div>
          <SideBar show={show}/>
      	
      </div>

      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column",width:'100%' }}>
        <NavBar show={()=>setShow(!show)}/>
        <div >
        
        <Routes>
             <Route path="/" element={ <GestionAdmins/>} />
         
        </Routes>
        </div>
        </div>
        </Container>
       
  )

  } 
export default AdminRoutes;