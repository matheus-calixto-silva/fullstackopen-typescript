import { CoursePart } from "../../types"
import Part from "../Part/Part"

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      {courseParts.map((coursePart, i) => <Part coursePart={coursePart} key={i} />)}
    </div>
  )
}

export default Content