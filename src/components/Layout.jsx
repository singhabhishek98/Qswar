import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
