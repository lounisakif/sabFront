import React, { useEffect, useState } from 'react'
import {Container,Navbar,Nav,OverlayTrigger,Popover} from 'react-bootstrap'
import {HiMenu} from 'react-icons/hi'
import {IoNotifications,IoPersonAddSharp,IoPersonCircleSharp,IoLogOut} from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import logout from '../utils/logout'
import Profil from '../pages/Profil'
function NavBar(props) {
  const [titre,setTitre]=useState('')

  const [notification,setnotification]=useState(0)
  const [devis,setdevis]=useState(0)
  const [Alert, setAlert] = React.useState(false);
 
  const location =useLocation()
  const notif = async()=>{  let csrfToken = localStorage.getItem('csrfToken');
  axios.get(process.env.REACT_APP_API_ListeB2B, {withCredentials: true  , headers: {'Authorization':  csrfToken}  })
.then((response) => {
  setnotification(response.data.length)}

)}
const dev = async()=>{  let csrfToken = localStorage.getItem('csrfToken');
axios.get(process.env.REACT_APP_API_Devis, {withCredentials: true  , headers: {'Authorization':  csrfToken}  })
.then((response) => {
setdevis(response.data.length)}

)}
useEffect( () => {
       notif()
       dev()
      if(location.pathname === ''){setTitre('TABLEAU DE BORD')}
      if(location.pathname === '/'){setTitre('TABLEAU DE BORD')}
      if(location.pathname === '/produits'){setTitre('GESTION DES PRODUITS')}
      if(location.pathname === '/admins'){setTitre('GESTION DES ADMINISTRATEURS')}
      if(location.pathname === '/categories'){setTitre('GESTION DES CATEGORIES')}
      if(location.pathname === '/devisValide'){setTitre('LISTE DES DEVIS VALIDÉS')}
      if(location.pathname === '/devisNonValide'){setTitre('GESTION DES DEVIS NON VALIDÉS')}
      if(location.pathname === '/b2b'){setTitre('GESTION DES UTILISATEURS B2B')}
      if(location.pathname === '/b2c'){setTitre('Liste des clients B2C')}
      if(location.pathname === '/listb2b'){setTitre('Liste des clients B2B')}
      
      
}, [location.pathname]);


const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Devis Non Validés</Popover.Header>
    <Popover.Body>
    {devis===0?<div style={{'textAlign':'center'}}>
           Vous n'avez aucune demande pour l'instant  

    </div>
    :<div style={{'textAlign':'center'}}> 
       Vous avez {devis} demande(s) de devis non encore traitées!
      <br></br>

      <a href='/devisNonValide'> Cliquez ici pour les traitées</a></div>}
    
    </Popover.Body>
  </Popover>
);
const popover2 = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Demande d'inscription B2B</Popover.Header>
    <Popover.Body>
    {notification===0?<div style={{'textAlign':'center'}}>
           Vous n'avez aucune demande pour l'instant  

    </div>
    :<div style={{'textAlign':'center'}}> 
       Vous avez {notification} demande(s) d'insciption B2B non encore traitées!
      <br></br>

      <a href='/b2b'> Cliquez ici pour les traitées</a></div>}
    
    </Popover.Body>
  </Popover>
);
  return(
    <>
   <Profil   show={Alert}  onHide={() => setAlert(false)}/> 
    <Navbar >
  <Container fluid>
    <Navbar.Brand ><HiMenu onClick={props.show} className="show"/></Navbar.Brand>
    <Navbar.Toggle />
        
    <Navbar.Collapse className="justify">
    <div style={{width:'70%',height:'100%',fontSize:'28px',fontWeight:'bold',textAlign:'center'}} className='text-dev'>
      {titre}
      </div>
      <Nav>
          <Nav.Item >
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                  <span id="group">
                      <IoNotifications className="nav-icons" style={{'fontSize':'27px'}}/>
                    <span className="badge badge-light" style={{'backgroundColor':'red','position':'relative','top':'-15px',left:'-18px','borderRadius':'50%',fontSize:'10px'}}>{devis}</span>
                  </span>
                  </OverlayTrigger>
          </Nav.Item>
          <Nav.Item>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover2}>
                  <span id="group">
                      <IoPersonAddSharp className="nav-icons" style={{'fontSize':'27px'}}/>
                    <span className="badge badge-light" style={{'backgroundColor':'red','position':'relative','top':'-15px',left:'-18px','borderRadius':'50%',fontSize:'10px'}}>{notification}</span>
                  </span>
                  </OverlayTrigger>
          </Nav.Item>
          <Nav.Item> 
            <span id="group">
                      <IoPersonCircleSharp className="nav-icons" onClick={()=>setAlert(true)} />
                      </span>
          </Nav.Item>
          <Nav.Item>
          <span id="group">
                      <IoLogOut className="nav-icons" onClick={logout}/>
                      </span>
          </Nav.Item>
      
      </Nav>
     
    </Navbar.Collapse>
  </Container>
</Navbar> 
</>
 )  
}
export default NavBar