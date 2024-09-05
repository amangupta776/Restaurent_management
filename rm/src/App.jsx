import { FrappeProvider } from 'frappe-react-sdk'
import Routings from './Routes/Route'
import {AuthProvider} from "./Context/AuthContext"
function App() {
  return (
	<div className="App">
	  <FrappeProvider>
		<AuthProvider>	
		<Routings/>
		</AuthProvider>
	  </FrappeProvider>
	</div>
  )
}

export default App
