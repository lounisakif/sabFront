import React, { useEffect, useState,useCallback } from "react";
import { Link } from 'react-router-dom';
import logout from '../utils/logout'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,SubMenu
} from "react-pro-sidebar";
import {Col,Row} from 'react-bootstrap'
//import icons from react icons
import {FaFileInvoiceDollar,FaProductHunt,FaUserCog,FaUser,FaUserTie } from "react-icons/fa";
import {ImStatsDots}from 'react-icons/im'
import {FiLogOut } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import {BsShieldLockFill} from "react-icons/bs";


//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
// 

const SideBarSuperAdmin = (props) => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  const show = useCallback(() => {
    setMenuCollapse(props.show)
  }, [props.show])
  useEffect(() => {
    show()
  }, [show])

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader >
           
              {/* small and big change using menucollapse state */}
              {/* <p>{menuCollapse ? "Logo" : "Big Logo"}</p> */}
             
              {menuCollapse ? <Row style={{'marginLeft':'0px'}} className='text-dev'><BsShieldLockFill style={{fontSize:'25px',padding:'0px',margin:'0px',width:'25px'}}/> <Col style={{'fontSize':'9px',padding:'0px'}}>PROVISION<br/>SECURITY<br/>SYSTEMS<br/></Col> </Row>
       :<Row style={{'marginLeft':'50px'}} className='text-dev'><BsShieldLockFill style={{fontSize:'25px',padding:'0px',margin:'0px',width:'25px'}}/> <Col style={{'fontSize':'8px'}}>PROVISION<br/>SECURITY<br/>SYSTEMS<br/></Col> </Row>}
       
      
          
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square" >
              {/* <MenuItem  icon={<ImStatsDots />}>
               
                <Link to="/" />
              </MenuItem> */}
             
              <MenuItem icon={<FaUser />}>
               Gestion des utilisateurs
                <Link to="/" />
              </MenuItem>
            
              <MenuItem icon={<FaProductHunt/>}>
               Produits
                <Link to="/produits" />
              </MenuItem>
              
              
               
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={logout}>Logout</MenuItem>
            </Menu>
            
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBarSuperAdmin;