import React from "react"
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
  <ReachDialog isOpen={isOpen} onDismiss={onDismiss} aria-label={title}>
    <button onClick={onDismiss}>Close</button>
    <h2>{title}</h2>
    {children}
  </ReachDialog>
)

export default Dialog
