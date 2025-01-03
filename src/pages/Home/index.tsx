import { Suspense } from 'react'
import HeroSection from './HeroSection'
import TopTrendingProducts from './TopTrendingProducts'
import LoadingSpinner from '~/components/common/LoadingSpinner'

const Home = () => {
  return (
    <div>
      <HeroSection />
      
      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<LoadingSpinner />}>
          <TopTrendingProducts />
        </Suspense>
      </div>
    </div>
  )
}

export default Home 