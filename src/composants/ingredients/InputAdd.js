import React, { useState } from "react";
import {Form,Row,FloatingLabel} from 'react-bootstrap'
function InputAdd(props) {
  const [inputList, setInputList] = useState([{ key: "", value: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    props.list(inputList)
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    props.list(inputList)
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { key: "", value: "" }]);
    props.list(inputList)
  };

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

export default InputAdd;