import { useSearchParams } from 'react-router-dom'
import { 
  Card, 
  Heading, 
  Slider, 
  Checkbox, 
  Flex, 
  Text,
  Button 
} from '@radix-ui/themes'
import { ResetIcon } from '@radix-ui/react-icons'
import { CATEGORIES } from '~/constants'

const PRICE_RANGES = [
  { min: 0, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: 200 },
  { min: 200, max: 500 },
  { min: 500, max: null }
]

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleCategoryChange = (slug: string) => {
    if (searchParams.get('category') === slug) {
      searchParams.delete('category')
    } else {
      searchParams.set('category', slug)
    }
    setSearchParams(searchParams)
  }

  const handlePriceChange = (min: number, max: number | null) => {
    searchParams.set('minPrice', min.toString())
    if (max) {
      searchParams.set('maxPrice', max.toString())
    } else {
      searchParams.delete('maxPrice')
    }
    setSearchParams(searchParams)
  }

  const resetFilters = () => {
    setSearchParams({})
  }

  return (
    <Card>
      <Flex direction="column" gap="6" p="4">
        {/* Reset Filters */}
        <Button 
          variant="soft" 
          onClick={resetFilters}
          className="self-end"
        >
          <ResetIcon />
          Reset Filters
        </Button>

        {/* Categories */}
        <div>
          <Heading size="3" mb="2">Categories</Heading>
          <Flex direction="column" gap="2">
            {CATEGORIES.map(category => (
              <div key={category.id}>
                <Checkbox
                  checked={searchParams.get('category') === category.slug}
                  onCheckedChange={() => handleCategoryChange(category.slug)}
                />
                <Flex align="center" gap="2" ml="2">
                  {category.icon && <category.icon />}
                  {category.name}
                </Flex>
              </div>
            ))}
          </Flex>
        </div>

        {/* Price Range */}
        <div>
          <Heading size="3" mb="2">Price Range</Heading>
          <Flex direction="column" gap="2">
            {PRICE_RANGES.map(({ min, max }, index) => (
              <div key={index}>
                <Checkbox
                  checked={
                    searchParams.get('minPrice') === min.toString() &&
                    (!max || searchParams.get('maxPrice') === max.toString())
                  }
                  onCheckedChange={() => handlePriceChange(min, max)}
                />
                <Text ml="2">
                  {max ? `$${min} - $${max}` : `$${min}+`}
                </Text>
              </div>
            ))}
          </Flex>
        </div>

        {/* Custom Price Range */}
        <div>
          <Heading size="3" mb="2">Custom Range</Heading>
          <Slider 
            defaultValue={[0]}
            max={1000}
            step={10}
            onValueChange={([value]) => {
              searchParams.set('minPrice', value.toString())
              setSearchParams(searchParams)
            }}
          />
          <Flex justify="between" mt="2">
            <Text size="1">$0</Text>
            <Text size="1">$1000+</Text>
          </Flex>
        </div>
      </Flex>
    </Card>
  )
}

export default FilterSidebar 