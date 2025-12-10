import Footer from '@/components/Footer'
import HomeHero from '@/components/home/HomeHero'
import MultiCard from '@/components/home/MultiCard'
import Navbar from '@/components/Navbar'
export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}></div>
      <MultiCard />
      <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}></div>
      <Footer />
    </>
  )
}
