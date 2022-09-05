import React from "react";
import {Modal,Button}from "react-bootstrap"
import axios from "axios";


function Validate(props) {
  

    const setValid= async (id) => {

        let csrfToken = localStorage.getItem('csrfToken')
           await axios.put(process.env.REACT_APP_API_validerB2B,{id}, { headers: {
              'Authorization':  csrfToken},withCredentials: true})
        .then((response) => {    
            window.location.href='/b2b'
      })
      .catch((error) => {
          if (error.response) {
            // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
              if(error.response.status === 401){
                // localStorage.setItem('role','')
                // window.location.href='/login'
              }
              if(error.response.status === 400){
                // window.location.href='/'
              }
          } else if (error.request) {
            // La requete a été faite mais aucune réponse n'a été reçue,erreur du coté serveur
            // setErreur('La connexion a échoué veuillez réessayer')
            
          }
        })
    
      }
 
    
      const handleDelete =  async ()=>{
        await props.rows.map( async(row)=>{
            await setValid(row.id)
  
    }
     
    
    );

  

 }
  
  
    return (
      <Modal
        {...props}
       
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" >
          Valider la demande d'inscription
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                 
        <div style={{'fontSize':'16px'}}>Êtes-vous sûr de vouloir valider le compte suivants ?</div>
          
           
        <div style={{'fontSize':'13px','textAlign':'center'}}>
           {
               props.rows.map((r)=>{
                  return r.nom_entreprise +' '
                
               }) 
               
           }
         </div>
        </Modal.Body>
        <Modal.Footer>
        <button onClick={props.onHide}  className='bna btn'> Annuler</button>
          <Button onClick={handleDelete} variant="success" className="bi bi-check-circle">Valider</Button>
      
        </Modal.Footer>
      </Modal>
    );
  }
export default Validate 

