import React, {useRef } from 'react'
import axios from 'axios'
 import {Col, Modal, Row}from "react-bootstrap"
 import ReactToPrint from "react-to-print";
import {BsShieldLockFill} from 'react-icons/bs'
export const Print = React.forwardRef((props, ref) => {     
  return (
    <div ref={ref}  style={{'margin':'15px'}} className='text-dev'>
      <div style={{'borderBottom':'solid','paddingBottom':'10px'}}>
        <Row>
      <Col style={{width:'30%'}} > 
       <Row >
       <BsShieldLockFill style={{fontSize:'50px',padding:'0px',margin:'0px',width:'50px',}}/>
       <Col style={{'fontSize':'10px',marginTop:'5px'}}>
       GENERALE<br/>
       EMBALLAGE<br/>
       
       </Col>
       
       
       </Row>
       </Col>
      <Col style={{width:'70%',textAlign:'left',fontSize:'20px'}}>DEVIS NUMÉRO {props.devis}</Col>  
      </Row>
        </div>
      <br></br>
   
       <Row>
         <Col style={{'fontSize':'12px'}}>
        <h5>Devis établi par</h5>
         GENERALE EMBALLAGE<br/>
         
         </Col>
         <Col  style={{width:'50%'}}>
         <h5>Devis adressé à</h5>
         Numéro du client:{props.idclient}<br/>
       Nom du client: {props.client}<br/>  
     
         </Col>
        </Row>
       
        <br></br>

  <table className='tab'>
  <thead >
  
<tr>

<th>Produit</th>
<th>Prix</th>
<th>Quantité</th>
</tr>
</thead>

<tbody>

    {props.el.map((element)=>{
  
     
    return( 

<tr key={element.produit}>
<td>{element.produit}</td>
<td>{element.prix}</td>
<td>{element.quantity}</td>


</tr>
      
 
)})
}
  </tbody>
</table>
<br></br>
<div  style={{'textAlign':'center',fontSize:'25px','border':'solid'}}> Prix total à payer {props.total} DA</div><br></br>
<div style={{'textAlign':'center'}}>Nous restons à votre disposition pour toute information complémentaire.Cordialement</div>
    </div>

  );
});
function ShowValidDevis(props){

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
           devis={props.devis}
           total={props.totall}
           idclient={props.idclient}
           ></Print>
        <Row className="forms-footer">
        <Col style={{'textAlign':'center'}}> <button onClick={()=>props.onHide()}  className='btn-secondaire ' style={{width:'70px'}}>Fermer</button></Col>
        <Col style={{'textAlign':'center'}}> <ReactToPrint trigger={() => <button  className=' btn-principal' style={{width:'70px'}}>PDF</button>} content={() => componentRef.current} /></Col>


      </Row>
   </Modal.Body>
    </Modal>
      );
}
export default ShowValidDevis