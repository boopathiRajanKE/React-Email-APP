import * as React from "react"
import { EmailContext } from "./MainComponent"

function EmailList() {
  const {
    mailLists: { list = [] } = {},
    setMailDetails = () => {},
    mailDetails = {},
  } = React.useContext(EmailContext)

  const onMailClick = (event) => {
    const mailId = event.currentTarget.getAttribute("mailid")
    const firstLetter = event.currentTarget.getAttribute("firstletter")
    const date = event.currentTarget.getAttribute("date")
    const subject = event.currentTarget.getAttribute("subject")
    console.log(event.currentTarget.children)
    setMailDetails({ mailId, firstLetter, date, subject })
  }

  const renderMailItem = (mailItem, index) => {
    const {
      id = "",
      from: { email = "", name = "" } = {},
      subject = "",
      date = "",
      short_description = "",
    } = mailItem

    let formatDate = new Date(date)
    formatDate =
      [
        formatDate.getDate(),
        formatDate.getMonth() + 1,
        formatDate.getFullYear(),
      ].join("/") +
      " " +
      [formatDate.getHours(), formatDate.getMinutes()].join(":")

    const firstLetter = name.slice(0, 1)

    const isFav =
      localStorage.getItem("favorites") &&
      localStorage.getItem("favorites").includes(id)

    return (
      <li
        key={`mail-item-${index}`}
        mailid={id}
        firstletter={firstLetter}
        date={formatDate}
        subject={subject}
        onClick={onMailClick}
      >
        <div
          className={`fk-mail-item-block ${
            mailDetails.mailId === id && "select"
          }`}
        >
          <div className="fk-mail-image-block">
            <div className="fk-mail-image">{firstLetter}</div>
          </div>
          <div className="fk-mail-content-block">
            <div className="fk-mail-name-block">
              from:{" "}
              <span>
                {name}
                <span>{` <${email}>`}</span>
              </span>
            </div>
            <div className="fk-mail-subject-block">
              Subject: <span>{subject}</span>
            </div>
            <p className="fk-mail-desc-element">{short_description}</p>
            <div className="fk-bottom-panel">
              <div className="fk-mail-date-element">{formatDate}</div>
              <div className="fk-mail-fav-element">{isFav && "Favorite"}</div>
            </div>
          </div>
        </div>
      </li>
    )
  }
  return (
    <div className="fk-mail-list-block">
      <ul>{list.length > 0 && list.map(renderMailItem)}</ul>
    </div>
  )
}

export default EmailList
export { EmailList }
