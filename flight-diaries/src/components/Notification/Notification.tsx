import { NotificationMessage } from "../../types"

import "./Notification.css"

const Notification = ({ message }: { message: NotificationMessage | null }) => {
  if (message === null) {
    return null
  }
  const {type, text} = message

  return <div className={type}>{text}</div>
}

export default Notification