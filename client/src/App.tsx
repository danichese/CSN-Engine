import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-3xl font-bold text-gray-800">
      {message || 'Loading...'}
    </div>
  );
}

export default App;