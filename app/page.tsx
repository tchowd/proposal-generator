import Image from 'next/image'
import ProposalPage from './components/proposal-page'
import Header from './components/header'
import Footer from './components/footer'

export default function Home() {
  return (
    <main className=" ">
      <Header />
        <ProposalPage />
      <Footer />
        {/* <ProposalComponent /> */}
    </main>
  )
}
