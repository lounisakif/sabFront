import React from 'react';
// import { Card } from 'antd';
import {Card} from 'react-bootstrap'

const DashboardItem = ({ children, title }) => (

<Card style={{"height":"400px","width":"100%" ,marginTop:'60px'}}>
  <Card.Header className="bi">{title}</Card.Header>
  <Card.Body >
    <div style={{'overflow':'auto',"height":"336px"}}>
  {children}
  </div>
  </Card.Body>
</Card>


);

export default DashboardItem;
