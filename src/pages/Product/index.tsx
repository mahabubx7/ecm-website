import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Grid, 
  Heading, 
  Text, 
  Button, 
  Flex,
  Card,
  TextField 
} from '@radix-ui/themes'
import { 
  CardStackPlusIcon,
  MinusIcon,
  PlusIcon 
} from '@radix-ui/react-icons'
import { Product } from '~/types'
import productService from '~/services/products' // Fixed import path
import { useCartStore } from '~/store'
import { formatPrice } from '~/utils/format' // Fixed import path
import ImageGallery from './ImageGallery'
import LoadingSpinner from '~/components/common/LoadingSpinner'

const ProductPage = () => {
  const { product_id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const addToCart = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!product_id) return
      setLoading(true)
      try {
        const { data } = await productService.getProduct(product_id)
        setProduct(data)
      } catch (error) {
        console.error('Failed to fetch product:', error)
        navigate('/shop')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [product_id, navigate])

  if (loading || !product) {
    return <LoadingSpinner />
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Grid columns="2" gap="8">
        <ImageGallery images={[product.image]} />
        
        <Flex direction="column" gap="4">
          <Heading size="8">{product.name}</Heading>
          
          {/* <Flex align="center" gap="2">
            <StarFilledIcon className="text-yellow-400" />
            <Text>{product.rating} Rating</Text>
          </Flex> */}
          
          <Card className="p-4">
            <Flex direction="column" gap="4">
              <Text size="6" weight="bold">
                {formatPrice(product.price)}
              </Text>
              
              {product.price && (
                <Text size="3" color="red">
                  {10}% OFF
                </Text>
              )}
              
              <Flex align="center" gap="4">
                <Text>Quantity:</Text>
                <Flex align="center" gap="2">
                  <Button 
                    variant="soft"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <MinusIcon />
                  </Button>
                  
                  <TextField.Root
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    min={1}
                    max={product.stock}
                    className="w-16 text-center"
                  />
                  
                  <Button 
                    variant="soft"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <PlusIcon />
                  </Button>
                </Flex>
              </Flex>
              
              <Button 
                size="3"
                onClick={() => {
                  addToCart(product, quantity)
                  navigate('/cart')
                }}
                disabled={product.stock === 0}
              >
                <CardStackPlusIcon />
                Add to Cart
              </Button>
            </Flex>
          </Card>
          
          <div className="border-t pt-4">
            <Heading size="4" mb="2">Product Details</Heading>
            <Text size="3" color="gray">
              {product.description}
            </Text>
          </div>
          
          <div className="border rounded p-4">
            <Flex direction="column" gap="2">
              {/* <Text size="2">Brand: {product.category.name}</Text> */}
              <Text size="2">Category: {product.category.name}</Text>
              <Text size="2">
                Stock: {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
              </Text>
            </Flex>
          </div>
        </Flex>
      </Grid>
    </div>
  )
}

export default ProductPage 