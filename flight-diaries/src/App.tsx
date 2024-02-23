import { useEffect, useState } from 'react';

import { getAllDiaries } from './services/diariesService';

import { NonSensitiveDiary } from './types';

import './App.css';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiary[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <h1>Flight Diaries</h1>
      <ul>
        {diaries && diaries.map(({ date, visibility, weather }, i) => (
          <li key={i}>
            <span >Date: {date}</span>
            <span >Visibility: {visibility}</span>
            <span >Weather: {weather}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
