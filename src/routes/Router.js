import React, { memo } from 'react';

import isLoggedIn from '../utils/isLoggedIn';
import AdminRoutes from './AdminRoutes';
import MagasinierRoutes from './MagasinierRoute';
import GSRoutes from './GSRoutes'
import SARoutes from './SARoutes'
import Login from '../pages/Login'

function Router() {
   
    if (isLoggedIn) {
        if(isLoggedIn ()==='admin'){
            
            return(<AdminRoutes />) 
        }
        if(isLoggedIn ()==='magasinier'){
            
            return(<MagasinierRoutes />) 
        }
        if(isLoggedIn ()==='Gestionnaire de stock'){
            
            return(<GSRoutes />) 
        }
        if(isLoggedIn ()==='SA'){
            
            return(<SARoutes />) 
        }
      return(<Login />)
     }  
   

}

export default memo(Router);