import { NonSensitiveDiary } from "../../types"

import "./Diaries.css"

const Diaries = ({ diaries }: {diaries: NonSensitiveDiary[]}) => {
  return (
    <ul>
      {diaries && diaries.map(({ date, visibility, weather }, i) => (
        <li key={i}>
          <span>Date: {date}</span>
          <span>Visibility: {visibility}</span>
          <span>Weather: {weather}</span>
        </li>
      ))}
    </ul>
  )
}

export default Diaries