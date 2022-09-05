import React, { useEffect, useState } from 'react'
 import {Col, Modal,Row}from "react-bootstrap"
import axios from "axios";
 function VoirPlus(props){
 
    return (
        
        <Modal
       {...props}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
         {props.selectedrow.map((row)=>{return( 
             <>
       <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="titre-forms" >
          FICHE PRODUIT
          </Modal.Title>
       </Modal.Header>
         
       <Modal.Body>
      
         <Row>

           <Col>
           <img  alt={row.nom} src={process.env.REACT_APP_API_GET_IMAGE + row.photo}  style={{width:'100%','height':'200px'}} /><br></br>
           <b>Description:</b>{row.description}
           </Col>
       
           <Col >
           
          <b>Nom:</b>{row.nom}<br></br>
           <b>Prix de gros:</b>{row.prixGros} DA<br></br>
           <b>Prix de detail:</b>{row.prixDetail} DA<br></br>
           <b>Référence:</b>{row.ref}<br></br>
           <b>Categorie:</b>{row.categorie}<br></br>
         
           {props.attributs.map((att)=>{return <> <b>{att.key}:</b> {att.value} <br></br></>})}
           </Col>
           </Row> 
           
     
       </Modal.Body></>
    )})}
     </Modal>
       );
 }
 export default VoirPlus

