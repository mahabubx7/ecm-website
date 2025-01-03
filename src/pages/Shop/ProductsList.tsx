import { Link } from 'react-router-dom'
import { Card, Text, Grid, Flex, Button } from '@radix-ui/themes'
import { Product } from '~/types'
import { formatPrice } from '~/utils/format'
import { useCartStore } from '~/store'
import { CardStackPlusIcon } from '@radix-ui/react-icons'
import LoadingSpinner from '~/components/common/LoadingSpinner'

interface ProductsListProps {
  products: Product[]
  loading: boolean
  viewMode: 'grid' | 'list'
}

const ProductsList = ({ products, loading, viewMode }: ProductsListProps) => {
  const addToCart = useCartStore((state) => state.addItem)

  if (loading) {
    return <LoadingSpinner />
  }

  if (products.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Text size="5">No products found</Text>
      </Card>
    )
  }

  if (viewMode === 'list') {
    return (
      <Flex direction="column" gap="4">
        {products.map((product) => (
          <Card key={product.id}>
            <Flex gap="4">
              <Link to={`/product/${product.id}`} className="w-48">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-32 object-cover"
                />
              </Link>
              
              <Flex direction="column" gap="2" className="flex-1">
                <Link to={`/product/${product.id}`}>
                  <Text weight="bold" size="5">
                    {product.title}
                  </Text>
                </Link>
                
                <Text color="gray" size="2">
                  {product.description}
                </Text>
                
                <Flex justify="between" align="center" mt="auto">
                  <Text size="5" weight="bold">
                    {formatPrice(product.price)}
                  </Text>
                  
                  <Button 
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <CardStackPlusIcon />
                    Add to Cart
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    )
  }

  return (
    <Grid columns="3" gap="4">
      {products.map((product) => (
        <Card key={product.id}>
          <Link to={`/product/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            
            <Flex direction="column" gap="2" p="3">
              <Text weight="bold">{product.title}</Text>
              <Text size="5" weight="bold">
                {formatPrice(product.price)}
              </Text>
              
              {product.discountPercentage && (
                <Text size="2" color="red">
                  {product.discountPercentage}% OFF
                </Text>
              )}
            </Flex>
          </Link>
          
          <Button 
            className="w-full mt-2"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            <CardStackPlusIcon />
            Add to Cart
          </Button>
        </Card>
      ))}
    </Grid>
  )
}

export default ProductsList 