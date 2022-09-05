import React, {useRef } from 'react'
import axios from 'axios'
 import {Col, Modal, Row}from "react-bootstrap"
 import ReactToPrint from "react-to-print";
import {BsShieldLockFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
 export const Print = React.forwardRef((props, ref) => {     
  return (
    <div ref={ref}  style={{'margin':'15px'}} className='text-dev'>
      <div style={{'borderBottom':'solid','paddingBottom':'10px'}}>
        <Row>
      <Col style={{width:'30%'}} > 
       <Row >
       <BsShieldLockFill style={{fontSize:'50px',padding:'0px',margin:'0px',width:'50px',}}/>
       <Col style={{'fontSize':'10px',marginTop:'5px'}}>
       GENERAL <br/>
       EMBALLAGE<br/>
       
       </Col>
       
       
       </Row>
       </Col>
      <Col style={{width:'70%',textAlign:'left',fontSize:'20px'}}>BON NUMÉRO {props.bon}</Col>  
      </Row>
        </div>
      <br></br>
   
       <Row>
         <Col style={{'fontSize':'12px'}}>
        <h5>Bon établi par</h5>
         GENERALE EMBALLAGE<br/>
         
         </Col>
         <Col  style={{width:'50%'}}>
         <h5>Bon adressé à</h5>
         Numéro du client:{props.idclient}<br/>
       Nom du client: {props.client}<br/>  
         {/* {props.client.map((c)=>{
  if(c.role==='B2B'){

    return(
      <div key={c.nom} style={{'fontSize':'12px'}}>
    
  <h5>Devis adressé à</h5>
        Numéro du client:{c.id}<br/>
       Entreprise: {c.nom}<br/>
       SIRET: {c.siret}</div>
      
        
    )
  }else{
    return(
      <div key={c.nom} style={{'fontSize':'12px'}}>
          <h5>Devis adressé à</h5>
       Client: {c.nom}<br/>
       Numéro du client:{c.id}
        </div>
    )
  }
    })} */}
         </Col>
        </Row>
       
        <br></br>

    
    {/* <div style={{'textAlign':'center',fontSize:'25px','color':'red'}}> Devis valable jusqu'au {props.date}</div>
 <br></br> */}

  <table className='tab'>
  <thead >
  
<tr>

<th>Ingredient</th>
<th>Description</th>
<th>Quantité</th>
</tr>
</thead>

<tbody>

    {props.el.map((element)=>{
  
     
    return( 

<tr key={element.ingredient}>
<td>{element.ingredient}</td>
<td>{element.ingredient} </td>
<td>{element.quantity}</td>


</tr>
      
 
)})
}
  </tbody>
</table>
<br></br>

<div style={{'textAlign':'center'}}>Nous restons à votre disposition pour toute information complémentaire.Cordialement</div>
    </div>

  );
});
function ShowBon(props){
  const navigate = useNavigate()
  const valider= async()=>{
    var csrfToken = localStorage.getItem('csrfToken');
    await axios.post(process.env.REACT_APP_API_ValiderBon+props.bon, { headers: {'Authorization':  csrfToken},withCredentials: true    })
    .then((response)=>{
      navigate('/BonValide')
      // window.location.href='/devisValide'
      
    }) .catch((error) => {
             
      if (error.response) {
        // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
          if(error.response.status === 401){
            localStorage.setItem('role','')
            window.location.href='/login'
          
          }
      } 
    })
  }
  const componentRef = useRef();
   return (
       
       <Modal 
      {...props}
     
     

    >
    
      <Modal.Body >
  
       <Print
           el={props.el}
           date={props.date }
           client={props.client}
           ref={componentRef}
           bon={props.bon}
           
           idclient={props.idclient}
           ></Print>
        <Row className="forms-footer">
        <Col style={{'textAlign':'center'}}> <button onClick={()=>props.onHide()}  className='btn-secondaire ' style={{width:'70px'}}>Fermer</button></Col>
        <Col style={{'textAlign':'center'}}> <ReactToPrint trigger={() => <button  className=' btn-principal' style={{width:'70px'}}>PDF</button>} content={() => componentRef.current} /></Col>
        <Col style={{'textAlign':'center'}}> <button onClick={()=>valider()} className=' btn-principal' style={{width:'70px'}}>Valider</button></Col>

      </Row>
   </Modal.Body>
    </Modal>
      );
}
export default ShowBon