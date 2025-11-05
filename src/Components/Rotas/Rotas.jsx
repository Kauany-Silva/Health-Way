import { Routes, Route } from 'react-router-dom';
import { RotasPrivadas } from './RotasPrivadas';

// Páginas públicas
import { Landing } from '../../Pages/Landing';
import { Login } from '../../Pages/Login';
import { Cadastro } from '../../Pages/Cadastro';
import { SaibaMaisSobreNos } from '../../Pages/SaibaMaisSobreNos';

// Dashboard e rotas filhas
import { Dashboard } from '../../Pages/Dashboard';
import { CarteiraVacinacao } from '../../Pages/CarteiraVacinacao';
import { Pets } from '../../Pages/Pets';
import { LocalHospital } from '../../Pages/LocalHospital';
import { Consultas } from '../../Pages/Consultas';
import { Medicamentos } from '../../Pages/Medicamentos';

import { NotFound } from '../../Pages/NotFound/NotFound';

const Rotas = () => {
  return (

    <Routes>  
        {/* Rotas públicas */}  
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/saibamaissobrenos" element={<SaibaMaisSobreNos />} />

        {/* Rotas privadas protegidas */}
    <Route element={<RotasPrivadas />}>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="vacinacao" element={<CarteiraVacinacao />} />
        <Route path="hospitais" element={<LocalHospital />} />
        <Route path="consultas" element={<Consultas />} />
        <Route path="medicamentos" element={<Medicamentos />} />
        <Route path="pets" element={<Pets />} />
       </Route>
      </Route>

       <Route path="*" element={<NotFound />} />

    </Routes>
    
  );
};

export { Rotas };