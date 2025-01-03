import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Flex, Text } from '@radix-ui/themes'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

const HERO_BANNERS = [
  {
    id: 1,
    title: "Summer Collection",
    subtitle: "Up to 50% off on selected items",
    image: "/banners/summer.jpg",
    link: "/shop?category=summer",
    buttonText: "Shop Now"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh styles just landed",
    image: "/banners/new-arrivals.jpg",
    link: "/shop?sort=newest",
    buttonText: "Explore"
  }
]

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === HERO_BANNERS.length - 1 ? 0 : prev + 1
      )
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[500px] overflow-hidden">
      {HERO_BANNERS.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40">
            <div className="container mx-auto px-4 h-full">
              <Flex 
                direction="column" 
                align="center" 
                justify="center" 
                className="h-full text-white text-center"
                gap="4"
              >
                <Text size="8" weight="bold">
                  {banner.title}
                </Text>
                <Text size="5" mb="6">
                  {banner.subtitle}
                </Text>
                <Button size="4" asChild>
                  <Link to={banner.link}>
                    {banner.buttonText}
                  </Link>
                </Button>
              </Flex>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <button
        onClick={() => setCurrentSlide(prev => 
          prev === 0 ? HERO_BANNERS.length - 1 : prev - 1
        )}
        className="absolute left-4 top-1/2 -translate-y-1/2"
      >
        <ChevronLeftIcon className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={() => setCurrentSlide(prev => 
          prev === HERO_BANNERS.length - 1 ? 0 : prev + 1
        )}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <ChevronRightIcon className="w-8 h-8 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSection 