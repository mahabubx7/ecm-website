import { useState } from 'react'
import { Card, Flex } from '@radix-ui/themes'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

interface ImageGalleryProps {
  images: string[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div>
      <Card className="relative mb-4">
        <img
          src={images[currentImage]}
          alt="Product"
          className="w-full h-[500px] object-contain"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImage(prev => 
                prev === 0 ? images.length - 1 : prev - 1
              )}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
            >
              <ChevronLeftIcon width="20" height="20" />
            </button>
            
            <button
              onClick={() => setCurrentImage(prev => 
                prev === images.length - 1 ? 0 : prev + 1
              )}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
            >
              <ChevronRightIcon width="20" height="20" />
            </button>
          </>
        )}
      </Card>

      {images.length > 1 && (
        <Flex gap="2" wrap="wrap">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-20 h-20 border-2 rounded overflow-hidden ${
                index === currentImage ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </Flex>
      )}
    </div>
  )
}

export default ImageGallery 