import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop, PainelAcessibilidade, Rotas } from './Components';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PainelAcessibilidade />
      <Rotas />
    </BrowserRouter>
  );
}

export default App;
