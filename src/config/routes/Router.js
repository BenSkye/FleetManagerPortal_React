import { Routes, Route } from 'react-router-dom';
import LayoutMain from '@/components/layout';
import Home from '@/components/pages/home';
import Cases from '@/components/pages/dashboard/cases';
import Vehicles from '@/components/pages/dashboard/vehicles';

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<LayoutMain />}>
        <Route index element={<Home />} />
        <Route path='/cases' element={<Cases />} />
        <Route path='/vehicles' element={<Vehicles />} />
        {/*<Route path='/drivers' element={<Drivers />} />
        <Route path='/activity' element={<Activity />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/admin' element={<Admin />} />  */}
      </Route>
    </Routes>
  );
}

export default Routing;
