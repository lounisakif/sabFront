
import React, { useState } from 'react'
import {Row,Button, Form,Col,Container, FloatingLabel} from 'react-bootstrap'
import axios from 'axios';


function Login() {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const [email, setEmail] = useState('');
  const handleChangePassword = (event) => {setPassword(event.target.value) }
  const handleChangeEmail= (event) => { setEmail(event.target.value) }
  const handleSubmit = (event) => {

console.log(process.env.REACT_APP_API_login)
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
    
        axios.post(process.env.REACT_APP_API_login , {password,email  },{withCredentials: true})
        .then((response) => {
          // Success 
          console.log(response.data.role)
          localStorage.setItem('csrfToken',response.data.csrf )
          localStorage.setItem('role',response.data.role )

      
         
      })
      .catch((error) => {
          // Error 
          if (error.response) {
            // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
              if(error.response.status ===400){
                setErreur('E-mail ou mot de passe incorect')
              }
              if(error.response.status ===500){
                setErreur('La connexion a échoué veuillez réessayer')
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
    <Container> 
    <Row className="justify-content-sm-center">

      <Col sm={8}>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className=' mx-3 my-3 pb-3 px-3' style={{'border':'solid','borderRadius':'0%'}}>
  
      <Row >
    
        <span className='titre-forms mb-3'>Connection</span>
       
        <Form.Label style={{color:'red'}}> {erreur?erreur: null} </Form.Label>
        <div style={{'textAlign':'center','fontSize':'20px', fontWeight:'bold'}} >
        Saisissez votre email et votre mot de passe ci-dessous 
        </div>

       
        <FloatingLabel controlId="floatingNom" label="E-mail" style={{'marginBottom':'12px','width':'70%','marginLeft':'15%'}} >
                            <Form.Control  onChange={handleChangeEmail} required type="email" placeholder="E-mail" className='forms-input py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez saisir une adresse email correcte </Form.Control.Feedback>
                            </FloatingLabel>
        <FloatingLabel controlId="floatingNom" label="Mot de passe"  style={{'marginBottom':'12px','width':'70%','marginLeft':'15%'}} >
        <Form.Control  onChange={handleChangePassword} required type="password" placeholder="Mot de passe" className='forms-input py-0 my-0 ' />
        <Form.Control.Feedback type="invalid">Veuillez saisir votre mot de passe  </Form.Control.Feedback>
        </FloatingLabel>
      
    <Row>
        <Col style={{'textAlign':'right','marginTop':'20px'}}>
        <a href='/forgot-password' className='forms-link'> Mot de passe oublié ?</a>
        </Col>
        </Row>
        <Row style={{'marginLeft':'0px'}}>
        <Col style={{'textAlign':'center'}}>
        <Button type="submit"  className=' bs btn-principal' style={{marginTop:'20px','width':'70%'}}>Connexion </Button>
        </Col>
        </Row>
        </Row>
      
   
     
   
    </Form>
  

    </Col>

    </Row>
    </Container>
  );
}

export default Login;