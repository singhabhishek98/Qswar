import Header from './header/Header'
import Footer from './Footer/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

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
