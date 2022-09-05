import React,{useEffect, useState} from 'react'
import {Container,Navbar,Nav,InputGroup,Button,FormControl, NavDropdown,OverlayTrigger,Popover} from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';

import logout from '../utils/logout'
import axios from 'axios'
function NavBarGS(props) {
  const [search, setSearch] = useState('');
  const [n,setN]= useState(0)
  const [nbPanier,setNbPanier]= useState(0)
  const [notification,setnotification]=useState(0)
  const location =useLocation()
  const notif = async()=>{ 
   
    let csrfToken = localStorage.getItem('csrfToken');
          axios.get(process.env.REACT_APP_API_DevisVu ,{ headers: {'Authorization':csrfToken },withCredentials: true})
          .then((response) => {
       let re= response.data.filter( (item) => item.vu===false)
            setnotification(re.length)
          })
          .catch((error) => {
            // Error 😨
            if (error.response) {
              // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
                if(error.response.status === 400){
                  // setErreur('vous possédez deja un compte')
                }
               
            } else if (error.request) {
              // La requete a été faite mais aucune réponse n'a été reçue,erreur du coté serveur
              // setErreur('La connexion a échoué veuillez réessayer')
            }
        });
    
//     let csrfToken = localStorage.getItem('csrfToken');
//   axios.get(process.env.REACT_APP_API_DevisNonVu, {withCredentials: true  , headers: {'Authorization':  csrfToken}  })
// .then((response) => {
//   console.log('coucou')
//   setnotification(response.data.length)}

}
  const handleSearch = (event) => {setSearch(event.target.value)};
  const handleButtonSearch= (event) => {
    props.rech(search)
    if(location.pathname !== '/'){
      window.location.href='/'
    }
  };

useEffect(() => {
  const pan = () => {
    notif()
    let iduser = localStorage.getItem("iduser")+""
    let panier = JSON.parse(localStorage.getItem(iduser));
    var nbr=0
    if(panier!==null){
    panier.map((p)=>{
       nbr=nbr+p.quantity
    
    })}
 
    setNbPanier(nbr)
    window.addEventListener('storage', () => {

          let iduser = localStorage.getItem("iduser")+""
          let panier = JSON.parse(localStorage.getItem(iduser));
          var nbr=0
          if(panier!==null){
            panier.map((p)=>{
               nbr=nbr+p.quantity
            
            })}
          setNbPanier(nbr)
        });
  };
  pan();
}, []);

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Devis validé</Popover.Header>
    <Popover.Body>
    {notification===0?<div style={{'textAlign':'center'}}>
           Vous n'avez aucune devis non lu pour l'instant  

    </div>
    :<div style={{'textAlign':'center'}}> 
       Vous avez {notification} devis validé(s) et non lu(s)!
      <br></br>
<Link to='/devisVu'>Cliquez ici pour le(s) voir</Link>
       
       </div>}
    
    </Popover.Body>
  </Popover>
);
    return(
       
        <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
  <Container  >
  <Navbar.Brand href="/" >
      <div className='bi bi-shield-lock-fill' style={{'fontSize':'35px'}}></div> 
      <div  style={{'fontSize':'15px'}} >Pro Vision <br/> Security Systems </div>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav fill  activeKey="/" style={{ width: '100%','textAlign':'center'}}>
      <Nav.Link style={{'width':'80%','textAlign':'center'}}> 
         <InputGroup className="mb-3" >
    <FormControl
      placeholder="Rechercher un produit"
      aria-describedby="basic-addon2"
      onChange={handleSearch}
    />
    <Button variant="outline-secondary" id="button-addon2" className='bi bi-search btn-search' onClick={handleButtonSearch}>
  
    </Button>
  </InputGroup></Nav.Link>
      <Nav.Link style={{'padding':'0px'}} >

        <span id="group">
          <button href="/panier" className='bi bi-cart-fill nav-btn' onClick={()=>window.location.href='/panier'}></button>
          <span href="/panier" className="badge badge-light" style={{'backgroundColor':'red','position':'relative','top':'-23px',left:'-18px','borderRadius':'35%',fontSize:'10px',width:'25px',height:'20px'}}>{nbPanier}</span>
        </span>
    
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                  <span id="group">
                  <button className='bi bi-bell-fill  nav-btn'></button>
                    <span className="badge badge-light" style={{'backgroundColor':'red','position':'relative','top':'-23px',left:'-18px','borderRadius':'35%',fontSize:'10px',width:'25px',height:'20px'}}>{notification}</span>
                  </span>
                  
                  </OverlayTrigger>
       
        <button onClick={logout}  className='bi bi-box-arrow-right  nav-btn'></button>
        </Nav.Link>
    </Nav>
    
  </Navbar.Collapse>
  </Container>
</Navbar>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container  >
    <Nav fill justify activeKey="/" style={{ width: '100%','padding':'0px'}}>
      <Nav.Link href="/">Acceuil</Nav.Link>
     
      <NavDropdown title="Mes devis" id="collasible-nav-dropdown">
         <NavDropdown.Item href="/devisVu">Devis</NavDropdown.Item>
         <NavDropdown.Divider />
       <NavDropdown.Item href="/devisNonVu">Devis non traités par notre entreprise</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/profil">Profil</Nav.Link>

    </Nav>
    

  </Container>
</Navbar>
        
        </>
        
    )
}
export default NavBarGS