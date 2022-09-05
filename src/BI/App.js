// import './body.css';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css'
import DashboardPage from './pages/DashboardPage'
import React from 'react';
import '@ant-design/compatible';
import { Layout } from 'antd';
import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import Header from './components/Header';
import WebSocketTransport from '@cubejs-client/ws-transport';
const API_URL = 'http://localhost:4000';
const CUBEJS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTU0ODIwMTQsImV4cCI6MTY1NTU2ODQxNH0.BJ_sU5c6BSsUMkPUsvhE9XTq61_hmCda_mezKoO_oso';
// const cubejsApi = cubejs({
//   transport: new WebSocketTransport({
//     authorization: CUBEJS_TOKEN,
//     apiUrl: API_URL.replace('http', 'ws'),
//   }),
// });
const cubejsApi = cubejs(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTU1NDg4OTIsImV4cCI6MTY1NTYzNTI5Mn0.NuPnuFXV4X61NVq6Vgf9WumFzbpmLN9Ne1mU28Hxl3U',
  { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
);
// const AppLayout = ({ children }) => (
//   <Layout
//     style={{
//       height: '100%',
//     }}
//   >
//     <Header />
//     <Layout.Content>{children}</Layout.Content>
//   </Layout>
// );

const App = () => (
  <CubeProvider cubejsApi={cubejsApi}>
  <DashboardPage></DashboardPage>
   
  </CubeProvider>
);

export default App;
