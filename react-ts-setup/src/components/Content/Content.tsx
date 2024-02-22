import { CourseParts } from "../../types"

const Content = ({ courseParts }: { courseParts: CourseParts[] }) => {
  return courseParts.map(({ name, exerciseCount }, i) => (
    <p key={i}>{name} {exerciseCount}</p>
  ))
}

export default Content