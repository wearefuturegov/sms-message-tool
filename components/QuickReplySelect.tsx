import { useState, useRef } from "react"
import s from "../styles/QuickReplySelect.module.scss"
import useClickOutside from "../hooks/useClickOutside"
import useSWR from "swr"
import { truncate } from "../lib/formatters"

interface Props {
  sendQuickReply: (string) => void
}

const QuickReplySelect = ({ sendQuickReply }: Props): React.ReactElement => {
  const [open, setOpen] = useState(false)

  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false))

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_HOST}/api/settings`)

  if (data?.messageTemplates?.length === 0) return <div></div>

  return (
    <details open={open} className={s.details} ref={ref}>
      <summary
        onClick={e => {
          e.preventDefault()
          setOpen(!open)
        }}
        className={`govuk-button lbh-button ${s.summary}`}
      >
        <span className="govuk-visually-hidden">Quick replies</span>

        <svg
          width="17"
          height="10"
          viewBox="0 0 17 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 8.5L8.5 2.5L2 8.5" stroke="white" stroke-width="3" />
        </svg>
      </summary>

      <div className={s.choices}>
        {data?.messageTemplates?.map(text => (
          <button
            className={s.choice}
            type="button"
            onClick={() => {
              sendQuickReply(text)
              setOpen(!open)
            }}
            key={text}
          >
            <span className="govuk-visually-hidden">Send: </span>
            {truncate(text, 8)}
          </button>
        ))}
      </div>
    </details>
  )
}

export default QuickReplySelect
