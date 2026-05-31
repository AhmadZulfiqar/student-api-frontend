import { Routes, Route } from 'react-router-dom';
import Form from './conponents/Form';
import View from './conponents/View';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/view" element={<View />} />
      <Route path="/edit/:id" element={<Form />} />
    </Routes>
  );
}

export default App;