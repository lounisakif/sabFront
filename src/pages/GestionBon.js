import React,{useEffect,useState,useCallback} from 'react'
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import DataTable from "react-data-table-component";

import ShowBon from "../composants/bon/ShowBon"
import {FaEye,FaRegCheckSquare,FaRegWindowClose} from 'react-icons/fa'
import { tab } from '@testing-library/user-event/dist/tab';
const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="form-check">
    <input
      htmlFor="booty-check"
      type="checkbox"
      className="form-check-input"
      ref={ref}
      onClick={onClick}
      {...rest}
    />
    <label className="form-check-label" id="booty-check" />
  </div>
));
const paginationOptions = {

	rowsPerPageText: 'Nombre de lignes par page',

	rangeSeparatorText: 'de',

	selectAllRowsItem: true,

	selectAllRowsItemText: 'toutes',

};
function GestionBon() {
    const [listBon,setlistBon] =useState([]);
    const [erreur,setErreur]=useState('')
    const [date,setdate]=useState('')
    const [pending, setPending] =useState(true);
    const [selectedRows, setSelectedRows] = React.useState([]);
    
    const [AlertDetail, setAlertDetail] = React.useState(false);
    const[elements,setelements]=useState([])
    const[client,setclient]=useState([])
    const[Idclient,setIdClient]=useState([])
    const [bon,setbon]=useState('')
    const [search, setSearch] = React.useState('');
    const[total,setTotal]=useState(0)
    const handleRowSelected = React.useCallback(state => {
  
          setSelectedRows(state.selectedRows);
  
      }, []);
      const handleSearch = (event) => {setSearch(event.target.value);};

      
    
      const actions = <div style={{'width':'100%'} }><label htmlFor="search" className='bi bi-search '></label><input id="search" type="text" onChange={handleSearch} className='search' placeholder='Rechercher un bon' /></div>; 
      
      
    const columns = [
      {
        name: "Bon numero",
        selector: (row) => row.id,
        sortable: true
        },
        {
          name: "Numero client",
          selector: (row) => row.idUser,
          sortable: true
          },
          {
            name: "Client",
            selector: (row) => row.client,
            sortable: true
            },
      
          
          {
            name: "Date de creation",
            selector: (row) =>row.date, 
            sortable: true
          },
          {
          name: "Action",
          cell: (row) => <div> 
              <FaEye style={{color:'green',fontSize:'22px',}} onClick={()=>handleButtonShowMore(row)}/>
              <FaRegCheckSquare style={{color:'blue',fontSize:'23px'}} onClick={()=>valider(row)}/>
             
              <FaRegWindowClose style={{color:'red',fontSize:'22px'}} onClick={()=>handleButtonDelete(row)}/>
    
              </div>,
      
        },
      ];

      const handleButtonShowMore = async(row) => {
       setbon(row.id)
       setdate(row.date)
       setclient(row.client)
       setIdClient(row.idUser)
      
      var csrfToken = localStorage.getItem('csrfToken');
     
      await axios.get(process.env.REACT_APP_API_DevisElements+row.id , { headers: {'Authorization':  csrfToken},withCredentials: true    })
      .then((response)=>{ setelements(response.data) }  )
      setAlertDetail(true)
        };

  const handleButtonDelete = (row) => {
    const tab=[]
    tab.push(row)
   setSelectedRows(tab)
   
    
    };
    const valider= async(row)=>{
      var csrfToken = localStorage.getItem('csrfToken');
      await axios.post(process.env.REACT_APP_API_ValiderBon+row.id,{id:row.id} ,{ headers: {'Authorization':  csrfToken},withCredentials: true})
      .then((response)=>{
        window.location.href='/bonvalide'
      })
    }
        const getbon = useCallback(async () => {
         
            var csrfToken = localStorage.getItem('csrfToken');
                  await axios.get(process.env.REACT_APP_API_Bon, { headers: {'Authorization':  csrfToken},withCredentials: true    })
            .then((response) => {
           
            setlistBon(
              response.data.filter(
                (item) => { return(item.client.toLowerCase().includes(search.toLowerCase())) }    
                 )
              ) 
           
              setPending(false);
        
          
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
       
         
          }, [search]) 
          useEffect(() => {
  
            getbon()
          }, [getbon])
    return (
        <div className="main">
          <div style={{'color':'red','textAlign':'center'}}>{erreur?erreur:null}</div>
         
       
           <ShowBon
           
            show={AlertDetail}
            onHide={() => setAlertDetail(false)}
            bon={bon}
            el={elements}
            date={date }
            client={client}
            
            idclient={Idclient}
          />
          
            <DataTable
                        columns={columns}
                        title=" "
                        data={listBon}
                        defaultSortField="id"
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationRowsPerPageOptions={[5,10, 15, 20, 25, 30]}
                        selectableRows
                        selectableRowsComponent={BootyCheckbox}
                        responsive='true'
                        highlightOnHover
                        fixedHeader
                            fixedHeaderScrollHeight="447px"
                        progressPending={pending}
                        // eslint-disable-next-line no-undef
                        contextActions={contextActions}
                        actions={actions}
                              onSelectedRowsChange={handleRowSelected}
                              contextMessage={{ singular: 'bon', plural: 'bon', message: 'sélectionné(s)'} }
                              noDataComponent="Aucun bon n'est trouvé"
        
    
            
            />
        
        </div>
      );
}
export default GestionBon