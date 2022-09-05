import React, { useState } from "react";
import {Modal,Form,Row,Col,FloatingLabel}from "react-bootstrap"


function Profil(props){
    const [erreur, setErreur] = useState('');
 
    const [password, setPassword] = useState('');
    const [passwordN, setPasswordN] = useState('');
    const [passwordCN, setPasswordCN] = useState('');
       const [validated, setValidated] = useState(false);

    const handleChangePassword = (event) => {setPassword(event.target.value) }
    const handleChangePasswordN = (event) => {setPasswordN(event.target.value) }
    const handleChangePasswordCN = (event) => {setPasswordCN(event.target.value) }

     const handleSubmit = (event) => {
  
  
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        if(passwordCN=passwordN){
            props.onHide()
            // let csrfToken = localStorage.getItem('csrfToken');
            // axios.post(process.env.REACT_APP_API_addNewAdmin, {password,email,nom,prenom  }, { headers: {
            //   'Authorization':  csrfToken
            // },withCredentials: true})
            //   .then((response) => {
               
            //    window.location.href='/admins'
               
            // })
            // .catch((error) => {
            //     // Error 😨
            //     if (error.response) {
            //       // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
            //         if(error.response.status === 400){
            //           setErreur('vous possédez deja un compte')
            //         }
                   
            //     } else if (error.request) {
            //       // La requete a été faite mais aucune réponse n'a été reçue,erreur du coté serveur
            //       setErreur('La connexion a échoué veuillez réessayer')
            //     }
            // });
        }else{
            setErreur('Les deux mot de passe ne sont pas identiques') 
        }

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
          Modifier mon Profil
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className=' mx-3 my-3 pb-3 px-3'>
                
                <Row className=" forms-limiter" >
           
                
                <Form.Label style={{color:'red'}}> {erreur?erreur: null} </Form.Label>
                
                            <FloatingLabel controlId="floatingNom" label="Mot de passe actuel"  style={{'marginBottom':'12px'}} >
                            <Form.Control  onChange={handleChangePassword} required type="password" placeholder="votre mot de passe" className='forms-input py-0 my-0 ' />
                            <Form.Control.Feedback type="invalid">Veuillez saisir votre mot de passe acturl </Form.Control.Feedback>
                            </FloatingLabel>
                          
              
                            <FloatingLabel controlId="floatingNom" label=" Nouveau mot de passe"  style={{'marginBottom':'12px'}} >
                            <Form.Control  onChange={handleChangePasswordN} required type="password" placeholder="votre mot de passe" className='forms-input py-0 my-0 ' />
                            <Form.Control.Feedback type="invalid">Veuillez saisir votre nouveau mot de passe  </Form.Control.Feedback>
                            </FloatingLabel>
                       
                            <FloatingLabel controlId="floatingNom" label=" Confirmation du nouveau mot de passe"  style={{'marginBottom':'12px'}} >
                            <Form.Control  onChange={handleChangePasswordCN} required type="password" placeholder="votre mot de passe" className='forms-input py-0 my-0 ' />
                            <Form.Control.Feedback type="invalid">Veuillez confirmer votre nouveau mot de passe  </Form.Control.Feedback>
                            </FloatingLabel>
                            

                </Row>
                
                <Row style={{'marginTop':'25px'}}>
          <Col style={{'textAlign':'center'}}>
        <button  onClick={props.onHide}  className='btn-secondaire ' style={{width:'100px'}}>Fermer</button>
    
        </Col>
        <Col style={{'textAlign':'center'}}>
        
        <button   type="submit"  className=' btn-principal' style={{width:'100px'}}>Modifier </button>
        </Col>
        </Row>
  </Form>
         
      
        </Modal.Body>
      
      </Modal>
        );
      }
      
    

export default Profil 