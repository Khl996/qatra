import { Routes, Route } from 'react-router-dom';
import RegisterSuccess from '../pages/merchant/auth/RegisterSuccess';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/merchant/register-success" element={<RegisterSuccess />} />
    </Routes>
  );
};

export default AppRouter;
