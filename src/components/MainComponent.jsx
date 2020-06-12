import * as React from "react"
import { EmailList } from "./EmailList"
import { EmailBody } from "./EmailBody"
import "./styles.scss"

export const EmailContext = React.createContext({})

function MainComponent() {
  const [mailLists, setMailLists] = React.useState({})
  const [mailContent, setMailContent] = React.useState({})
  const [mailDetails, setMailDetails] = React.useState({})

  const [isMount, setIsMount] = React.useState(false)
  React.useEffect(() => {
    let mount = true
    ;(async () => {
      let response = await fetch("https://flipkart-email-mock.now.sh/")
      response = await response.json()

      response = { ...response }

      if (mount) setMailLists(response)
    })()
    setIsMount(true)

    return () => {
      mount = false
    }
  }, [])

  React.useEffect(() => {
    let mount = true
    if (isMount) {
      ;(async () => {
        let response = await fetch(
          `https://flipkart-email-mock.now.sh/?id=${mailDetails.mailId}`
        )
        response = await response.json()

        response = { response, ...mailDetails }

        if (mount) setMailContent(response)
      })()
    }

    return () => {
      mount = false
    }
  }, [mailDetails])

  const contextProps = {
    mailContent,
    mailLists,
    setMailDetails,
    mailDetails,
  }

  return (
    <EmailContext.Provider value={contextProps}>
      <div className="fk-mail-filter-block">
        Fitler By: <span>Unread</span> <span>Read</span> <span>Favorites</span>
      </div>
      <div className={`fr-mail-block ${mailContent.mailId ? "flex" : ""}`}>
        <EmailList />
        {mailContent.mailId && <EmailBody />}
      </div>
    </EmailContext.Provider>
  )
}

export default MainComponent
export { MainComponent }
