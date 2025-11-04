import { BrowserRouter } from 'react-router-dom';
import { Rotas } from "./Components/Rotas";
import { PainelAcessibilidade, ScrollToTop } from './Components';
import { AuthProvider } from './Context/AuthContext';

function App() {
   return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <PainelAcessibilidade />
        <Rotas />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
