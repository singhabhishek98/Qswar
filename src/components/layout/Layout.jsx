import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from '../WhatsAppButton'

export default function Layout({ children }) {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
