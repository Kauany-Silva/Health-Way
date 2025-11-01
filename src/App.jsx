import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop, PainelAcessibilidade, Rotas } from './Components';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
          <PainelAcessibilidade />
        <Rotas />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
