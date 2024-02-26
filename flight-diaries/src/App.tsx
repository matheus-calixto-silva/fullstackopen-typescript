import { SyntheticEvent, useEffect, useState } from 'react';

import { v1 as uuid } from 'uuid';

import Diaries from './components/Diaries/Diaries';
import Notification from './components/Notification/Notification';

import { createDiary, getAllDiaries } from './services/diariesService';

import { Notification as INotification, NonSensitiveDiary, Visibility, Weather } from './types';


import './App.css';
import { parseDate, parseString, parseVisibility, parseWeather } from './utils';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiary[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [comment, setComment] = useState("")
  const [error, setError] = useState<INotification>(null)

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const clearFields = () => {
    setDate("")
    setComment("")
    setWeather(Weather.Sunny)
    setVisibility(Visibility.Great)
  }

  const clearMessage = () => {
    return setTimeout(() => {
      setError(null);
    }, 5000);
  }

  const diaryCreation = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (!date) {
      setError({ type: 'error', text: 'Please fill in all fields.' });
      clearMessage();
      return;
    }

    if (!parseDate(date) && !parseString(comment) && !parseVisibility(visibility) && !parseWeather(weather)){
      setError({ type: 'error', text: 'One or more fields are incorrect.'});
      clearMessage();
      return;
    }

    const diaryToCreate = { id: uuid(), date, weather, visibility, comment }
    const result = await createDiary(diaryToCreate);

    try {
      if (result && !('status' in result)) {
        setDiaries(diaries.concat(result))
      } else {
        setError({ type: 'error', text: `Error: ${result.status} | ${result.response} - ${result.data}` });
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        setError({ type: "error", text: 'Error creating diary: ' + error.message });
    }
    clearFields()
    clearMessage()
  };

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    switch (name) {
      case "date":
        setDate(value);
        break;
      case "weather":
        setWeather(value as Weather);
        break;
      case "visibility":
        setVisibility(value as Visibility);
        break;
      case "comment":
        setComment(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      <Notification message={error} />
      <form onSubmit={diaryCreation}>
        <label htmlFor="date">
          Date:
          <input type="date" name="date" id="date" onChange={handleChange}/>
        </label>
        <label>
          Weather:
          {Object.values(Weather).map((weatherItem, i) => (
            <div key={i} style={{ display: 'inline' }} >
              <input
                type="radio"
                id={weatherItem}
                name="weather"
                value={weatherItem}
                checked={weather === weatherItem}
                onChange={handleChange}
              />
              <label htmlFor={weatherItem}>{weatherItem}</label>
            </div>))}
        </label>
        <label>
          Visibility:
          {Object.values(Visibility).map((visibilityItem, i) => (
            <div key={i} style={{ display: 'inline' }}>
              <input
                type="radio"
                id={visibilityItem}
                name="visibility"
                value={visibilityItem}
                checked={visibility === visibilityItem}
                onChange={handleChange}
              />
              <label htmlFor={visibilityItem}>{visibilityItem}</label>
            </div>))}
        </label>
        <label htmlFor="comment">
          Comment:
          <input name='comment' type="text" id='comment' onChange={handleChange} />
        </label>
        <button type="submit">Register Diary</button>
      </form>
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
