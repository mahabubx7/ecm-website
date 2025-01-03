import { 
  Select, 
  Button, 
  Flex, 
  TextField 
} from '@radix-ui/themes'
import { 
  GridIcon, 
  ListBulletIcon,
  MagnifyingGlassIcon 
} from '@radix-ui/react-icons'
import { useSearchParams } from 'react-router-dom'
import { SORT_OPTIONS } from '~/constants'

interface TopBarProps {
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

const TopBar = ({ viewMode, onViewModeChange }: TopBarProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSort = (value: string) => {
    searchParams.set('sort', value)
    setSearchParams(searchParams)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search') as string
    
    if (search) {
      searchParams.set('search', search)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="sticky top-16 bg-white dark:bg-gray-900 z-40 border-b">
      <Flex 
        justify="between" 
        align="center" 
        className="container mx-auto px-4 py-4"
      >
        <Flex gap="4" align="center">
          <Select.Root 
            defaultValue={searchParams.get('sort') || 'newest'}
            onValueChange={handleSort}
          >
            <Select.Trigger placeholder="Sort by..." />
            <Select.Content>
              {SORT_OPTIONS.map(option => (
                <Select.Item 
                  key={option.value} 
                  value={option.value}
                >
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <Flex gap="2">
            <Button 
              variant={viewMode === 'grid' ? 'solid' : 'soft'}
              onClick={() => onViewModeChange('grid')}
            >
              <GridIcon />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'solid' : 'soft'}
              onClick={() => onViewModeChange('list')}
            >
              <ListBulletIcon />
            </Button>
          </Flex>
        </Flex>

        <form onSubmit={handleSearch}>
          <TextField.Root>
            <TextField.Input 
              name="search"
              placeholder="Search products..."
              defaultValue={searchParams.get('search') || ''}
            />
            <TextField.Slot>
              <Button variant="ghost" type="submit">
                <MagnifyingGlassIcon />
              </Button>
            </TextField.Slot>
          </TextField.Root>
        </form>
      </Flex>
    </div>
  )
}

export default TopBar 