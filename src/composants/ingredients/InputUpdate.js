import React, {useEffect, useState,useCallback } from "react";
import {Form,Row,FloatingLabel} from 'react-bootstrap'
import axios from "axios";

function InputUpdate(props) {
  const [inputList, setInputList] = useState([{ key: "", value: "" }]);



  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    props.list(inputList)
  };


  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    props.list(inputList)
  };


  const handleAddClick = () => {
    setInputList([...inputList, { key: "", value: "" }]);
    props.list(inputList)
  };

  const getAttributs  =  useCallback( () => {
 
    props.selectedP.map(async(p)=>{
      let csrfToken = localStorage.getItem('csrfToken');

      await axios.get(process.env.REACT_APP_API_listProductAtt+p.id , { headers: {'Authorization':  csrfToken},withCredentials: true    })
    .then((response) => {
      const tab= []

      response.data.map((r)=>{
        return(  tab.push({key:r.key,value:r.value}))


      })
  setInputList(tab);
        props.list(tab)
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
        // setErreur('La connexion a échoué veuillez réessayer')
      }
    })
    })

 },[])

  useEffect( ()=>{
  
   
   getAttributs()}
  ,[] )

  return (
    <>
  <div className="overflow-auto"  style={{'maxHeight':'200px'}} >
  
    {inputList.map((x, i) => {
      return (
        <div className="box" key={i}>
           <Row>
           <div className="rowInpt">
           <FloatingLabel controlId="floatingcar" label="Caractéristique"  style={{'display':"inline-block"}}>
                     <Form.Control
                         
                         name="key"
                         placeholder="Caractéristique"
                         value={x.key}
                         onChange={e => handleInputChange(e, i)}
                         className='forms-input py-0 my-0 '/>
                          
                  </FloatingLabel>
          
                  <FloatingLabel controlId="floatingval" label="Sa valeur" style={{'display':'inline-block' ,'marginLeft':'20px'}} >
                     <Form.Control   
                            name="value"
                            placeholder="Sa valeur"
                            value={x.value}
                            onChange={e => handleInputChange(e, i)}
                         className='forms-input py-0 my-0 '/>
                          
                  </FloatingLabel>
          
                  {inputList.length !== 1 && <button className="bi bi-trash3" style={{'border':'none',color:'red','backgroundColor':'transparent','display':'inline-block' ,'fontSize':'22px',width:'10px','marginTop':'33px'}} onClick={() => handleRemoveClick(i)}></button>}
              </div>
                </Row>
    
                <Row >
                  <div className="rowInpt">
                  {inputList.length - 1 === i && <button className="btn-forms" style={{width:'200px','marginTop':'20px'}} onClick={handleAddClick}>Ajouter une autre caracterestique</button>}
                  </div>
                  </Row>
              
            </div>
        
        );
      })}
  
    </div>
    </>
  
  );
}

export default InputUpdate; 