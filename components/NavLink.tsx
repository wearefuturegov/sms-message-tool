import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

interface Props {
  href: string
  children: React.ReactChild[]
}

const NavLink = ({ href, children }: Props): React.ReactElement => {
  const router = useRouter()

  let className = "lbh-link lbh-link--no-visited-state conversation-list__link"
  if (router.asPath === href) {
    className = `${className} conversation-list__link--selected`
  }

  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  )
}

export default NavLink
