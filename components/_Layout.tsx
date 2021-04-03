import Header from "./Header"

const Layout = ({
  children,
}: {
  children: React.ReactChild
}): React.ReactElement => (
  <div className="app-layout">
    <Header />
    <main
      id="main-content"
      role="main"
      className="lbh-main-wrapper lbh-container app-layout__inner"
    >
      {children}
    </main>
  </div>
)

export default Layout
