import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Text, Heading, Flex } from '@radix-ui/themes'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Product } from '~/types'
import { productsService } from '~/services'
import { formatPrice } from '~/utils/format'

const TopTrendingProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productsService.getProducts()
        setProducts(data.results)
      } catch (error) {
        console.error('Failed to fetch trending products:', error)
      }
    }
    fetchProducts()
  }, [])

  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev === products.length - 4 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex(prev => 
      prev === 0 ? products.length - 4 : prev - 1
    )
  }

  return (
    <section className="mb-16">
      <Flex justify="between" align="center" mb="4">
        <Heading size="6">Top Trending</Heading>
        <Flex gap="2">
          <button 
            onClick={prevSlide}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeftIcon width="24" height="24" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRightIcon width="24" height="24" />
          </button>
        </Flex>
      </Flex>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-1/4 flex-shrink-0 px-2">
              <Link to={`/product/${product.id}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Flex direction="column" gap="2" p="3">
                    <Text size="2" weight="bold">
                      {product.name}
                    </Text>
                    <Text size="4" weight="bold">
                      {formatPrice(product.price)}
                    </Text>
                    {product.price && (
                      <Text size="2" color="red">
                        {/* {product.discountPercentage}% OFF */}
                        {10}% OFF
                      </Text>
                    )}
                  </Flex>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopTrendingProducts 