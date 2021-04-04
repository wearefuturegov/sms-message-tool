import SettingsForm from "../components/SettingsForm"
import { useSession } from "next-auth/client"
import useSWR from "swr"

const handleSubmit = async (id, values) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/settings`, {
    method: "POST",
    body: JSON.stringify({
      teamId: id,
      ...values,
    }),
  })
  const data = await res.json()
  mutate(`${process.env.NEXT_PUBLIC_API_HOST}/api/settings`)
}

const Settings = () => {
  const [session, loading] = useSession()

  const { data: team } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/settings`
  )

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">Settings</h1>

        <SettingsForm
          onSubmit={values => handleSubmit(team.id, values)}
          initialValues={{
            signature: session?.user?.signature,
            outOfHoursAutoreply: team?.outOfHoursAutoreply,
            outOfHoursMessage: team?.outOfHoursMessage,
            messageTemplates: team?.messageTemplates,
          }}
        />
      </div>
    </div>
  )
}

export default Settings
