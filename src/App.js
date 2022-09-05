import React, { Component } from 'react';
import { Container} from 'react-bootstrap';
import history from './utils/history';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Router from './routes/Router'
import  'bootstrap/dist/css/bootstrap.min.css' ; 
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.scss'
import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
const cubejsApi = cubejs(
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTU1NDg4OTIsImV4cCI6MTY1NTYzNTI5Mn0.NuPnuFXV4X61NVq6Vgf9WumFzbpmLN9Ne1mU28Hxl3U',
	{ apiUrl: 'http://localhost:4000/cubejs-api/v1' }
  );


class App extends Component {
	render() {
		return (
			<CubeProvider cubejsApi={cubejsApi}>
			<Container fluid className="p-0"  >
			
					<BrowserRouter history={history} >
						<Routes>
							
								<Route path="/*"  element={<Router/>}/>	
						</Routes>
					</BrowserRouter>
				
		
			</Container>
			</CubeProvider>

		);
	}
}

export default App;