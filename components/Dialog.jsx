import React from "react"
import { Dialog as ReachDialog } from "@reach/dialog"
import "@reach/dialog/styles.css"

const Dialog = ({ isOpen, onDismiss, children, title }) => (
  <ReachDialog isOpen={isOpen} onDismiss={onDismiss} aria-label={title}>
    <button onClick={onDismiss}>Close</button>
    <h2>{title}</h2>
    {children}
  </ReachDialog>
)

export default Dialog
