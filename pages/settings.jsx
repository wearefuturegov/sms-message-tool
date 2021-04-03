import DashboardLayout from "../components/_DashboardLayout"
import SettingsForm from "../components/SettingsForm"

const handleSubmit = async values => {}

const Settings = () => (
  <div>
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
  </div>
)

export default Settings
