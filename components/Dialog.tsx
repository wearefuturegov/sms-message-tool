import { Dialog as ReachDialog } from "@reach/dialog"
import "@reach/dialog/styles.css"

interface Props {
  isOpen: boolean
  onDismiss: () => void
  children: React.ReactChild | React.ReactChildren
  title: string
}

const Dialog = ({
  isOpen,
  onDismiss,
  children,
  title,
}: Props): React.ReactElement => (
  <ReachDialog
    isOpen={isOpen}
    onDismiss={onDismiss}
    aria-label={title}
    className="dialog"
  >
    <button onClick={onDismiss} className="dialog__close">
      <span className="govuk-visually-hidden">Close</span>
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.94983 6.36377L6.36404 4.94956L17.6778 16.2633L16.2635 17.6775L4.94983 6.36377Z"
          fill="#0b0c0c"
        />
        <path
          d="M16.2635 4.94971L17.6778 6.36392L6.36405 17.6776L4.94984 16.2634L16.2635 4.94971Z"
          fill="#0b0c0c"
        />
      </svg>
    </button>
    <h2 className="lbh-heading-h2 dialog__title">{title}</h2>
    {children}
  </ReachDialog>
)

export default Dialog
