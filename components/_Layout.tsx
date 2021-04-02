import Header from "./Header"

const Layout = ({
  children,
}: {
  children: React.ReactChild
}): React.ReactElement => (
  <>
    <Header />
    <main
      id="main-content"
      role="main"
      className="lbh-main-wrapper lbh-container app-layout"
    >
      {children}
    </main>
  </>
)

export default Layout
