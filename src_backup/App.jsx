// App.jsx
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop, PainelAcessibilidade } from './Components';
import { Rotas } from './Rotas';

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
