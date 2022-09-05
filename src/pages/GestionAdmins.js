import React,{useEffect,useState} from 'react'
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import DataTable from "react-data-table-component";
import AddAdmin from '../composants/admins/AddAdmin';
import DeleteAdmin from '../composants/admins/DeleteAdmin'
import {OverlayTrigger,Tooltip} from 'react-bootstrap'




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



function GestionAdmins() {
  const [listAdmin,setListAdmin] =useState([]);
  const [erreur,setErreur]=useState('')
  const [pending, setPending] =useState(true);
  const [search, setSearch] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [Alert, setAlert] = React.useState(false);
  const [AlertAdd, setAlertAdd] = React.useState(false);
  const handleRowSelected = React.useCallback(state => {

		setSelectedRows(state.selectedRows);

	}, []);

  const handleSearch = (event) => {setSearch(event.target.value);};

  const contextActions =  <button key="delete" className='bi bi-trash3 text-white btn' onClick={()=>setAlert(true)} style={{ backgroundColor: 'red' }} > Supprimer</button>  ;

  const actions = <div style={{'width':'100%'} }><label htmlFor="search" className='bi bi-search btn-tab '></label><input id="search" type="text" onChange={handleSearch} className='search' placeholder='Rechercher par nom , prénom ,email ' />
    <OverlayTrigger placement="bottom" overlay={<Tooltip >Ajouter un nouvel administrateur</Tooltip>}  ><button key="add"  onClick={()=> setAlertAdd(true)}  className='bi bi-person-plus-fill btn-tab' ></button></OverlayTrigger></div>;
  
  
const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true
    },
  {
  name: "Nom",
  selector: (row) => row.nom,
  sortable: true
  },
  {
  name: "Prénom",
  selector: (row) => row.prenom,
  sortable: true,
 
  },
  {
  name: "Email",
  selector: (row) => row.login,
  sortable: true,
 
  },
  {
    name: "Role",
    selector: (row) => row.role,
    sortable: true,
   
    },
  {
    name: "Supprimer",
    cell: (row) => <button className="bi bi-trash3" style={{'backgroundColor':'transparent','border':'none',color:'red',fontSize:'22px'}} onClick={()=>handleButtonClick(row)}></button>
  }
  ];
  
  const handleButtonClick = (row) => {
    const tab=[]
    tab.push(row)
   setSelectedRows(tab)
   setAlert(true)
    
    };


  useEffect( ()=>{

      const getAdmins  = async ()=>{

        let csrfToken = localStorage.getItem('csrfToken');
              await axios.get(process.env.REACT_APP_API_ListeAdmin, {withCredentials: true  , headers: {'Authorization':  csrfToken}  })
        .then((response) => {
          setListAdmin( response.data.filter(
              (item) => { return(item.nom.toLowerCase().includes(search.toLowerCase())||item.email.toLowerCase().includes(search.toLowerCase())||item.prenom.toLowerCase().includes(search.toLowerCase())) }    
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
     }
     ;getAdmins();}
    ,[search] )
   

  return (
    <div className="main">
      <div style={{'color':'red','textAlign':'center'}}>{erreur?erreur:null}</div>
     
      <DeleteAdmin
        show={Alert}
        onHide={() => setAlert(false)}
        rows={selectedRows}
      />
      <AddAdmin
        show={AlertAdd}
        onHide={() => setAlertAdd(false)}
      
      />
      
        <DataTable
                    columns={columns}
                    title=" "
                    data={listAdmin}
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
                    contextActions={contextActions}
                    actions={actions}
			              onSelectedRowsChange={handleRowSelected}
                    contextMessage={{ singular: 'Administrateur', plural: 'Administrateurs', message: 'sélectionné(s)'} }
                    noDataComponent="Aucun administrateur n'est trouvé"

        
        />
    
    </div>
  );
}
export default GestionAdmins