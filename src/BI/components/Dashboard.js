import React from 'react';


const Dashboard = ({ children }) => (
  <div style={{'overflow':'auto','height':'540px','textAlign':'center',paddingLeft:'10%',"paddingRight":'10%'}}>

    {children}
  </div>
);

export default Dashboard;
