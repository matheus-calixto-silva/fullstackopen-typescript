import { CoursePart } from "../../types";

import './Part.css';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  let result: JSX.Element;

  switch (coursePart.kind) {
    case "basic":
      result = (
        <span className={"course_part_container"}>
          <p>Name: {coursePart.name}</p>
          <p>Kind: {coursePart.kind}</p>
          <p>Description: {coursePart.description}</p>
          <p>Total: {coursePart.exerciseCount}</p>
        </span>
      )
      break
    case "group":
      result = (
        <span className={"course_part_container"}>
          <p>Name: {coursePart.name}</p>
          <p>Kind: {coursePart.kind}</p>
          <p>Group Project Count: {coursePart.groupProjectCount}</p>
          <p>Total: {coursePart.exerciseCount}</p>
        </span>)
      break
    case "background":
      result = (
        <span className={"course_part_container"}>
          <p>Name: {coursePart.name}</p>
          <p>Kind: {coursePart.kind}</p>
          <p>Description: {coursePart.description}</p>
          <p>Background Material: {coursePart.backgroundMaterial}</p>
          <p>Total: {coursePart.exerciseCount}</p>
        </span>
      )
      break
    case "special":
      result = (
        <span className={"course_part_container"}>
          <p>Name: {coursePart.name}</p>
          <p>Kind: {coursePart.kind}</p>
          <p>Description: {coursePart.description}</p>
          <p>Requirements: {coursePart.requirements.join(", ")}</p>
          <p>Total: {coursePart.exerciseCount}</p>
        </span>
      )
      break
    default:
      return assertNever(coursePart)
  }

  return result
}

export default Part