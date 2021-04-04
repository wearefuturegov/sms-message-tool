import { Router } from "next/router"
import DashboardLayout from "../components/_DashboardLayout"
import useSWR from "swr"
import { useRouter } from "next/router"

const Index = props => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/conversations`
  )

  const router = useRouter()
  if (data?.conversations[0]?.contact?.id)
    router.push(`/conversations/${data.conversations[0].contact.id}`)

  return null
}

Index.Layout = DashboardLayout

export default Index
