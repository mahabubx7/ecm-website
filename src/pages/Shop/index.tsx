import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Grid } from '@radix-ui/themes'
import TopBar from './TopBar'
import FilterSidebar from './FilterSidebar'
import ProductsList from './ProductsList'
import { Product } from '~/types'
import { productsService } from '~/services'

const Shop = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = {
          category: searchParams.get('category'),
          search: searchParams.get('search'),
          sort: searchParams.get('sort'),
          minPrice: searchParams.get('minPrice'),
          maxPrice: searchParams.get('maxPrice'),
          brands: searchParams.get('brands')?.split(','),
          page: parseInt(searchParams.get('page') || '1'),
        }

        const { data } = await productsService.getProducts(params)
        setProducts(data.results)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams])

  return (
    <div>
      <TopBar 
        viewMode={viewMode} 
        onViewModeChange={setViewMode}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Grid columns="5" gap="6">
          <div className="col-span-1">
            <FilterSidebar />
          </div>
          <div className="col-span-4">
            <ProductsList 
              products={products}
              loading={loading}
              viewMode={viewMode}
            />
          </div>
        </Grid>
      </div>
    </div>
  )
}

export default Shop 