import React, { useState,useEffect } from "react";
import {Modal,Form,Row,Col, FloatingLabel}from "react-bootstrap"
import axios from "axios";
import InputAdd from "./InputAdd";
function AddProduct(props){
    const [erreur, setErreur] = useState('');
    const [validated, setValidated] = useState(false);
    const [nom, setnom] = useState('');
    const [prixGros, setprixGros] = useState(0);
    const [prixDetail, setprixDetail] = useState(0);
    const [description, setdescription] = useState('');
    const [ref, setref] = useState('');
    const photo =''
    const [categorie, setcategorie] = useState('');
    const [image, setImage] = useState({ preview: '', data: '' })
    const [extension,setExtension]= useState('')
    const [listCategorie,setListCategorie] =useState([]);
    const [inputList, setInputList] = useState([{ key: "", value: "" }]);

    const handleChangeNom= (event) => { setnom(event.target.value) }
    const handleChangePrixGros= (event) => { setprixGros(event.target.value) }
    const handleChangePrixDetail= (event) => { setprixDetail(event.target.value) }
    const handleChangeDescription= (event) => { setdescription(event.target.value) }
    const handleChangeRef= (event) => { setref(event.target.value) }
    const handleChangeCategorie= (event) => { setcategorie(event.target.value) }
    const handleFileChange = (e) => {
      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      }
      setImage(img)
    
      var type =e.target.files[0].type
     setExtension(type.replace(/(.*)\//g, ''))
  
  
    }
      const handleSubmit = (event) => {
      const attributs = inputList.filter(
          (item) => { return(item.key !== '' && item.value !== '') }    
           )
 
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        let csrfToken = localStorage.getItem('csrfToken');
       

        axios.post(process.env.REACT_APP_API_AddProduct,{nom,prixGros,prixDetail,description,ref,photo,categorie,attributs}, { headers: {
          'Authorization':  csrfToken
        },withCredentials: true    })
          .then(async (response) => {
           
               //photo uplaod
                  let formData = new FormData()
                  formData.set('file', image.data,response.data+'.'+extension);
                  const filename=response.data+'.'+extension;
                  const id =response.data
               await axios({
                  method: 'post',
                  url: process.env.REACT_APP_API_SAVE_IMAGE,
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data','Authorization':  csrfToken },withCredentials: true}
              }).then(async(response)=>{
                //update data base column photo
               await  axios.post(process.env.REACT_APP_API_UPDATE_IMAGE,{id,filename}, { headers: { 'Authorization':  csrfToken},withCredentials: true    })
                .then((response)=>{
                 window.location.href='/produits'
                })
                window.location.href='/produits'

              })
           
        })
        .catch((error) => {
            // Error 😨
            if (error.response) {
              // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
                if(error.response.status === 400){
                  setErreur('le produit indiquée existe deja')
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

    useEffect( ()=>{

      const getCategories  = async ()=>{

        let csrfToken = localStorage.getItem('csrfToken');
              await axios.get(process.env.REACT_APP_API_listCategorie, { headers: {'Authorization':  csrfToken},withCredentials: true    })
        .then((response) => {
          setListCategorie( response.data)
        
      })
      .catch((error) => {
         
          if (error.response) {
            // La requete a été faite et le serveur a répondu avec un code d'état qui se situe en dehors de la plage de 2xx
              if(error.response.status === 401){
                localStorage.setItem('role','')
                window.location.href='/login'
              
              }
          } else if (error.request) {
            // La requete a été faite mais aucune réponse n'a été reçue,erreur du coté serveur
            setErreur('La connexion a échoué veuillez réessayer')
          }
        })
     }
     ;getCategories();}
    ,[] )
    
        return (
         
         <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="titre-forms" >
          AJOUTER UN NOUVEAU PRODUIT
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                
                <Row className=" forms-limiter" style={{'paddingTop':'0px'}} >
           
                {erreur? <Form.Label style={{color:'red'}}> {erreur} </Form.Label>:null}
                {/* <Form.Label style={{color:'red'}}> {erreur?erreur:null} </Form.Label> */}

                <Row  style={{marginLeft:'0px'}} >
                  <Col style={{'paddingTop':'20px','marginRight':'50px'}}>
                  <Form.Group  as={Row} className='forms-group image 'controlId="photo" >
                  {image.preview ? <img alt="produit" src={image.preview} style={{'height':'200px','width':'500px',margin:'0px','paddingLeft':'0px','paddingRight':'0px'}}/>:<img  style={{'height':'200px','width':'500px',margin:'0px','paddingLeft':'0px','paddingRight':'0px'}} alt="icon" src="iconeImage.png"  />}
                  <label className="bi bi-upload btn-file" > Importer
                    <Form.Control   type='file' name='file'  onChange={handleFileChange} style={{'width':'100%'}} className='btn-forms' />
                            <Form.Control.Feedback type="invalid">Veuillez inserer une photo pour ce produit</Form.Control.Feedback>
                  </label>
                           
                            
                            
                </Form.Group>
                <Form.Group  as={Row} className='forms-group 'controlId="Description">   
                            <Form.Control   onChange ={handleChangeDescription} required  as="textarea" placeholder="Description" className='forms-input forms-textarea py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer une description pour ce produit</Form.Control.Feedback>
                           
                </Form.Group>

                  </Col>
                  <Col>
                 
                  <FloatingLabel controlId="floatingNom" label="Nom" style={{'marginBottom':'12px'}} >
                  <Form.Control   onChange={handleChangeNom} required placeholder="Nom" type="text"  className='forms-input py-0 my-0 '/>
                    <Form.Control.Feedback type="invalid">Veuillez inserer le nom du produit</Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPG" label="Prix de gros" style={{'marginBottom':'12px'}}>
                    <Form.Control   onChange={handleChangePrixGros} required  type="number" step="any" placeholder="Prix de gros" className='forms-input py-0 my-0 '/>
                    <Form.Control.Feedback type="invalid">Veuillez inserer un prix de gros valide</Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPD" label="Prix de détail" style={{'marginBottom':'12px'}} >
                     <Form.Control   onChange={handleChangePrixDetail} required  type="number" step="any" placeholder="Prix de détail " className='forms-input py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer un prix de détail valide </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingRef" label="Référence" style={{'marginBottom':'12px'}} >
                           <Form.Control   onChange={handleChangeRef} required type="text" placeholder="Référence" className='forms-input py-0 my-0 '/>
                            <Form.Control.Feedback type="invalid">Veuillez inserer une référence </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingRef" label="Categorie" style={{'marginBottom':'12px'}}>
                      
                      <Form.Select aria-label="Default select example" onChange={handleChangeCategorie} required className='forms-input'>
                                <option></option>
                               
                                {
                                  listCategorie.map((row)=>{return( <option key={row.id} value={row.nom}>{row.nom}</option>)})
                                }
                            </Form.Select> 
                  </FloatingLabel>
        

             
                  </Col>
                </Row >
               
                <Row style={{  'marginTop':'10px'}}>
                <label className="titre-forms">Caracterestiques supplimantaires</label>
                
                <InputAdd list={(l)=>setInputList(l)}></InputAdd>
                </Row>
                </Row>
                <Row className="forms-footer">
          <Col style={{'textAlign':'center'}}>
        <button  onClick={props.onHide}  className='btn-secondaire '>Fermer</button>
    
        </Col>
        <Col style={{'textAlign':'center'}}>
        
        <button  type="submit"  className=' btn-principal' style={{width:'200px'}}>Ajouter </button>
        </Col>
        </Row>
                 
  </Form>
         
      
        </Modal.Body>
      
      </Modal>
        );
}
export default AddProduct