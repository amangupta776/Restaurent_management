import { FrappeProvider } from 'frappe-react-sdk'
import Routings from './Routes/Route'

function App() {


  return (
	<div className="App">
	  <FrappeProvider>
		<Routings/>
	  </FrappeProvider>
	</div>
  )
}

export default App
