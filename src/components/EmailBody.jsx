import * as React from "react"
import { EmailContext } from "./MainComponent"

function EmailBody() {
  const {
    mailContent: {
      date = "",
      firstLetter = "",
      response: { body = "", id = "" } = {},
      subject = "",
    } = {},
  } = React.useContext(EmailContext)

  const onFavClick = () => {
    const fav =
      (localStorage.getItem("favorites") &&
        localStorage.getItem("favorites").replace(/,,/g, "")) ||
      []
    localStorage.setItem("favorites", [fav, id])
  }

  return (
    <div className="fk-mail-body-block">
      <div className="fk-mail-body-top">
        <div className="fk-mail-body-left">
          <div className="fk-mail-image">{firstLetter}</div>
          <div className="fk-mail-subject-block">
            <div className="fk-mail-subject-element">{subject}</div>
            <div className="fk-mail-date-element">{date}</div>
          </div>
        </div>
        <div>
          <div className="fk-mail-fav-icon" onClick={onFavClick}>
            Mark as favorite
          </div>
        </div>
      </div>
      <div className="fk-mail-body">
        <div
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
      </div>
    </div>
  )
}

export default EmailBody
export { EmailBody }
