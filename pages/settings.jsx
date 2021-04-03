import SettingsForm from "../components/SettingsForm"

const handleSubmit = async values => {}

const Settings = () => (
  <>
    <h1>Settings</h1>
    <SettingsForm
      onSubmit={handleSubmit}
      initialValues={{
        signature: false,
        outOfHoursAutoreply: false,
        outOfHoursMessage: "",
        messageTemplates: [],
      }}
    />
  </>
)

export default Settings
