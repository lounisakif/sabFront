import React,{useEffect,useState,useCallback} from 'react'
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';   
import DataTable from "react-data-table-component";
import ShowValidDevis from "../composants/devis/ShowValidDevis"
import {FaEye} from 'react-icons/fa'
const paginationOptions = {

	rowsPerPageText: 'Nombre de lignes par page',

	rangeSeparatorText: 'de',

	selectAllRowsItem: true,

	selectAllRowsItemText: 'toutes',

};
function ListDevisValides(){
  const [listDevis,setlistDevis] =useState([]);
  const [erreur,setErreur]=useState('')
  const [date,setdate]=useState('')
  const [pending, setPending] =useState(true);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const [AlertDetail, setAlertDetail] = React.useState(false);
  const[elements,setelements]=useState([])
  const[client,setclient]=useState([])
  const[Idclient,setIdClient]=useState([])
  const [devis,setdevis]=useState('')
  const [search, setSearch] = React.useState('');
  const[total,setTotal]=useState(0)
  const handleRowSelected = React.useCallback(state => {

        setSelectedRows(state.selectedRows);

    }, []);
    const handleSearch = (event) => {setSearch(event.target.value);};

  
    const actions = <div style={{'width':'100%'} }><label htmlFor="search" className='bi bi-search '></label><input id="search" type="text" onChange={handleSearch} className='search' placeholder='Rechercher un devis' /></div>; 
    
    
  const columns = [
    {
      name: "Devis numero",
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
          name: "Prix total",
          selector: (row) =>row.total,
          sortable: true
        },
        {
          name: "Valid justqu'au",
          selector: (row) =>row.date, 
          sortable: true
        },
        {
        name: "Action",
        cell: (row) =>
            <FaEye style={{color:'green',fontSize:'22px',}} onClick={()=>handleButtonShowMore(row)}/>
          ,
    
      },
    ];

    const handleButtonShowMore = async(row) => {
     setdevis(row.id)
     setdate(row.date)
     setclient(row.client)
     setIdClient(row.idUser)
     setTotal(row.total)
    var csrfToken = localStorage.getItem('csrfToken');
   
    await axios.get(process.env.REACT_APP_API_DevisElements+row.id , { headers: {'Authorization':  csrfToken},withCredentials: true    })
    .then((response)=>{ setelements(response.data) }  )
    setAlertDetail(true)
      };



      const getdevis = useCallback(async () => {
       
          var csrfToken = localStorage.getItem('csrfToken');
                await axios.get(process.env.REACT_APP_API_DevisValide, { headers: {'Authorization':  csrfToken},withCredentials: true    })
          .then((response) => {
         
          setlistDevis(
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

          getdevis()
        }, [getdevis])
    return (
        <div className="main">
          <div style={{'color':'red','textAlign':'center'}}>{erreur?erreur:null}</div>
          
           <ShowValidDevis
           
           show={AlertDetail}
           onHide={() => setAlertDetail(false)}
           devis={devis}
           el={elements}
           date={date }
           client={client}
           totall={total}
           idclient={Idclient}
           
          />
          
            <DataTable
                        columns={columns}
                        title=" "
                        data={listDevis}
                        defaultSortField="id"
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationRowsPerPageOptions={[5,10, 15, 20, 25, 30]}
                       
                     
                        responsive='true'
                        highlightOnHover
                        fixedHeader
                            fixedHeaderScrollHeight="447px"
                        progressPending={pending}
                      
                        actions={actions}
                             
                              noDataComponent="Aucun devis n'est trouvé"
    
            
            />
        
        </div>
      );
}
export default ListDevisValides