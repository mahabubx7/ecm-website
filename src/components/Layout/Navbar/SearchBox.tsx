import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Card, Text, Flex } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { productsService } from '~/services'
import { Product } from '~/types'
import { useDebounce } from '~/hooks/useDebounce'

const SearchBox = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 2) {
        setResults([])
        return
      }

      try {
        const { data } = await productsService.getProducts({
          search: debouncedQuery,
          limit: 5
        })
        setResults(data.results)
      } catch (error) {
        console.error('Search failed:', error)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  return (
    <div ref={wrapperRef} className="relative">
      <form onSubmit={(e) => {
        e.preventDefault()
        if (query) {
          navigate(`/shop?search=${encodeURIComponent(query)}`)
          setIsOpen(false)
        }
      }}>
        <TextField.Root
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
        />
        <TextField.Slot>
          <Button variant="ghost" size="1" type="submit">
            <MagnifyingGlassIcon />
          </Button>
        </TextField.Slot>
      </form>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full mt-1 w-full z-50">
          <Flex direction="column" gap="1">
            {results.map((product) => (
              <Button
                key={product.id}
                variant="ghost"
                onClick={() => {
                  navigate(`/product/${product.id}`)
                  setIsOpen(false)
                  setQuery('')
                }}
              >
                <Flex align="center" gap="2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover"
                  />
                  <Text size="2">{product.name}</Text>
                </Flex>
              </Button>
            ))}
          </Flex>
        </Card>
      )}
    </div>
  )
}

export default SearchBox 