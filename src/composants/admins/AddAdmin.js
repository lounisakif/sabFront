import React, { useState } from "react";
import {Modal,Form,Row,Col,FloatingLabel}from "react-bootstrap"
import axios from "axios";

function AddAdmin(props){
    const [erreur, setErreur] = useState('');
    const [validated, setValidated] = useState(false);
    const [nom, setnom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setrole] = useState('');
    const [adresse, setadresse] = useState('');
  
    const handleChangerole = (event) => {setrole(event.target.value) }
    const handleChangeadresse = (event) => {setadresse(event.target.value) }
    const handleChangePassword = (event) => {setPassword(event.target.value) }
    const handleChangeEmail= (event) => { setEmail(event.target.value) }
    const handleChangeNom= (event) => { setnom(event.target.value) }
    const handleChangePrenom= (event) => { setPrenom(event.target.value) }
     const handleSubmit = (event) => {
  
  
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        let csrfToken = localStorage.getItem('csrfToken');
        
        axios.post(process.env.REACT_APP_API_addNewAdmin, {password,email,nom,prenom ,adresse,role }, { headers: {
          'Authorization':  csrfToken
        },withCredentials: true})
          .then((response) => {
           
           window.location.href='/'
           
        })
        .catch((error) => {
            // Error 😨
            if (error.response) {
              // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
                if(error.response.status === 400){
                  setErreur('vous possédez deja un compte')
                }
               
            } else if (error.request) {
              // La requete a été faite mais aucune réponse n'a été reçue,erreur du coté serveur
              setErreur('La connexion a échoué veuillez réessayer')
            }
        });
      }
    
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      
    }
    
        return (
         
         <Modal
        {...props}
       
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="titre-forms" >
          AJOUTER UN NOUVEL ADMINISTRATEUR
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className=' mx-3 my-3 pb-3 px-3'>
                
                <Row className=" forms-limiter" >
           
                
                <Form.Label style={{color:'red'}}> {erreur?erreur: null} </Form.Label>
                <FloatingLabel controlId="floatingNom" label="Nom" style={{'marginBottom':'12px'}} >
                            <Form.Control   onChange={handleChangeNom} required   type="text" placeholder="Nom" className='forms-input py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer un nom</Form.Control.Feedback>
                            </FloatingLabel>


                            <FloatingLabel controlId="floatingNom" label="Prenom" style={{'marginBottom':'12px'}} >
                            <Form.Control onChange={handleChangePrenom} required   type="text" placeholder="Prenom" className='forms-input py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer un prénom</Form.Control.Feedback>
                            </FloatingLabel>
                
                            <FloatingLabel controlId="floatingNom" label="E-mail" style={{'marginBottom':'12px'}} >
                            <Form.Control  onChange={handleChangeEmail} required type="email" placeholder="E-mail" className='forms-input py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez saisir une adresse email correcte </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingNom" label="adresse"  style={{'marginBottom':'12px'}} >
                            <Form.Control  onChange={handleChangeadresse} required type="text" placeholder="votre adresse" className='forms-input py-0 my-0 ' />
                            <Form.Control.Feedback type="invalid">Veuillez saisir votre adresse  </Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingNom" label="role"  style={{'marginBottom':'12px'}} >
                            
                            <Form.Select  onChange={handleChangerole} required >
                             <option>service d'achat</option>
                             <option>Gestionnaire de stock</option>
                             <option>Magasinier</option>
                           </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingNom" label="Mot de passe"  style={{'marginBottom':'12px'}} >
                            <Form.Control  onChange={handleChangePassword} required type="password" placeholder="votre mot de passe" className='forms-input py-0 my-0 ' />
                            <Form.Control.Feedback type="invalid">Veuillez saisir votre mot de passe  </Form.Control.Feedback>
                            </FloatingLabel>

                </Row>
                
                <Row style={{'marginTop':'25px'}}>
          <Col style={{'textAlign':'center'}}>
        <button  onClick={props.onHide}  className='btn-secondaire ' style={{width:'100px'}}>Fermer</button>
    
        </Col>
        <Col style={{'textAlign':'center'}}>
        
        <button  type="submit"  className=' btn-principal' style={{width:'100px'}}>Ajouter </button>
        </Col>
        </Row>
  </Form>
         
      
        </Modal.Body>
      
      </Modal>
        );
      }
      
    

export default AddAdmin