import React,{useEffect,useState} from 'react'
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import DataTable from "react-data-table-component";
import AddProduct from '../composants/products/AddProduct';
import DeleteProduct from '../composants/products/DeleteProduct';
import UpdateProducts from '../composants/products/UpdateProducts'
import VoirPlus from '../composants/products/VoirPlus';
import {BiDetail,BiSortAlt2} from 'react-icons/bi'
import {RiDeleteBin2Line} from 'react-icons/ri'
import {BsPencilSquare} from 'react-icons/bs'
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

function GestionProducts(){
    const [listProduit,setListProduit] =useState([]);
    const [pending, setPending] =useState(true);
    const [search, setSearch] = React.useState('');
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [AlertDelete, setAlertDelete] = React.useState(false);
    const [AlertAdd, setAlertAdd] = React.useState(false);
    const [AlertUpdate, setAlertUpdate] = React.useState(false);
    const [showMore, setShowMore] = React.useState(false);
    const[attributs,setattributs]=useState([])
    const handleRowSelected = React.useCallback(state => {

          setSelectedRows(state.selectedRows);

      }, []);

    const handleSearch = (event) => {setSearch(event.target.value);};

    const contextActions =  <button key="delete" className='bi bi-trash3 text-white btn' onClick={()=>setAlertDelete(true)} style={{ backgroundColor: 'red' }} > Supprimer</button>  ;

    const actions =
     <div style={{width:"100%", 'textAlign':'center'}}>
      <label htmlFor="search" className='bi bi-search btn-tab'></label>
       <input id="search" type="text" onChange={handleSearch} className='search' placeholder=' Rechercher par nom,categorie,description,ref,...' />
       <OverlayTrigger placement="bottom" overlay={<Tooltip >Ajouter un nouveau produit</Tooltip>} >
        <button className='bi bi-plus-circle btn-tab' key="add"  onClick={()=> setAlertAdd(true)} > </button>
        </OverlayTrigger>
        </div>; 


  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true
      },
      {
        name: "image",
        cell: (row) =><img alt={row.nom} src={process.env.REACT_APP_API_GET_IMAGE + row.photo} style={{height:'70px',width:'70px',borderRadius:'30%'}}></img>
      },
    {
      name: "Nom",
      selector: (row) => row.nom,
      sortable: true
    },
    {
      name: "Catégorie",
      selector: (row) => row.categorie,
      sortable: true
    },
    {
      name: "Prix de gros",
      selector: (row) => row.prixGros,
      sortable: true
    },
    {
      name: "Prix de détail",
      selector: (row) => row.prixDetail,
      sortable: true
    },
  


    {
      name: "Action",
      cell: (row) => <div> 
       <BiDetail style={{color:'green',fontSize:'22px'}} onClick={()=>handleButtonShowMore(row)}/>
      <RiDeleteBin2Line style={{color:'red',fontSize:'22px'}} onClick={()=>handleButtonDelete(row)}/>
      <BsPencilSquare style={{color:'blue',fontSize:'20px'}} onClick={()=>handleButtonUpdate(row)}/>

          </div>,

    },


    ];

    const handleButtonDelete = (row) => {
      const tab=[]
      tab.push(row)
     setSelectedRows(tab)
     setAlertDelete(true) 

      };
      const handleButtonUpdate= (row) => {
          const tab=[]
          tab.push(row)
         setSelectedRows(tab)
         setAlertUpdate(true)

          };
          const handleButtonShowMore= async(row) => {
            const tab=[]
            tab.push(row)
           setSelectedRows(tab)
           let csrfToken = localStorage.getItem('csrfToken');
           console.log('ok')
           await axios.get(process.env.REACT_APP_API_listProductAtt+row.id , { headers: {'Authorization':  csrfToken},withCredentials: true    })
         .then((response)=>{
           setattributs(response.data)
         })
         setShowMore(true)

            };

    useEffect( ()=>{

        const getProducts  = async ()=>{

                await axios.get(process.env.REACT_APP_API_listProducts, { headers: {'Authorization':localStorage.getItem('csrfToken')},withCredentials: true    })
          .then((response) => {
            setListProduit( response.data.filter(
                (item) => { return(item.ref.toLowerCase().includes(search.toLowerCase())||item.categorie.toLowerCase().includes(search.toLowerCase())||item.nom.toLowerCase().includes(search.toLowerCase())||item.prixGros===search||item.prixDetail===search||item.description.toLowerCase().includes(search.toLowerCase())) }    
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

            }
          })
       }
       ;getProducts();}
      ,[search] )


    return (
      <div className="main">

        {/* <div style={{'color':'red','textAlign':'center'}}>{erreur?erreur:null}</div> */}
        <AddProduct
         show={AlertAdd}
         onHide={() => setAlertAdd(false)}
        ></AddProduct>
        <DeleteProduct
          show={AlertDelete}
          onHide={() => setAlertDelete(false)}
          rows={selectedRows}
        ></DeleteProduct>

        <UpdateProducts
         show={AlertUpdate}
         onHide={() => setAlertUpdate(false)}
         selectedrow={selectedRows}
         id={selectedRows.map((r)=>{return r.id})}

        ></UpdateProducts>
        <VoirPlus 
         show={showMore}
         onHide={() => setShowMore(false)}
         selectedrow={selectedRows} 
         attributs={attributs}
         ></VoirPlus>

          <DataTable
                      columns={columns}
                      title=" "
                      data={listProduit}
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
                      sortIcon={<BiSortAlt2/>}
                      contextMessage={{ singular: 'Produit', plural: 'Produits', message: 'sélectionné(s)'} }
                      noDataComponent="Aucun produit n'est trouvé"


          />

      </div>
    );
}
export default GestionProducts