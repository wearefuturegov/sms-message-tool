import { useState } from "react"
import SettingsForm from "../components/SettingsForm"
import { Router, useRouter } from "next/router"
import { useSession, getSession } from "next-auth/client"
import useSWR, { mutate } from "swr"
import { useEffect } from "react"

const Settings = () => {
  const router = useRouter()
  const [session, setSession] = useState(false)

  useEffect(async () => {
    // explicitly grab a fresh session on page load
    setSession(await getSession())
  }, [])

  const { data: team } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/settings`
  )

  const handleSubmit = async (id, values, setStatus) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/settings`,
        {
          method: "POST",
          body: JSON.stringify({
            teamId: id,
            ...values,
          }),
        }
      )
      const data = await res.json()
      if (data.error) throw data.error
      mutate(`${process.env.NEXT_PUBLIC_API_HOST}/api/settings`)
      router.push("/")
    } catch (e) {
      setStatus(e.toString())
    }
  }

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">Settings</h1>

        <SettingsForm
          onSubmit={(values, { setStatus }) =>
            handleSubmit(team.id, values, setStatus)
          }
          initialValues={{
            useSignature: session?.user?.useSignature,
            signature: session?.user?.signature || "",
            outOfHoursAutoreply: team?.outOfHoursAutoreply,
            outOfHoursMessage: team?.outOfHoursMessage || "",
            messageTemplates: team?.messageTemplates,
          }}
        />
      </div>
    </div>
  )
}

export default Settings
