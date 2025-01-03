import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Button, 
  Flex, 
  Box,
  DropdownMenu 
} from '@radix-ui/themes'
import { 
  CardStackPlusIcon, 
  PersonIcon,
  ChevronDownIcon 
} from '@radix-ui/react-icons'
import { useAuthStore } from '~/store'
import SearchBox from './SearchBox'
import { CATEGORIES } from '~/constants'

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 border-b z-50">
      <nav className="container mx-auto px-4">
        <Flex justify="between" align="center" py="4">
          {/* Logo & Categories */}
          <Flex align="center" gap="6">
            <Link to="/" className="text-xl font-bold">
              Store Name
            </Link>

            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <DropdownMenu.Root open={isHovered}>
                <DropdownMenu.Trigger>
                  <Button variant="soft">
                    Categories
                    <ChevronDownIcon />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  {CATEGORIES.map(category => (
                    <DropdownMenu.Item key={category.id}>
                      <Link 
                        to={`/shop?category=${category.slug}`}
                        className="flex items-center gap-2"
                      >
                        {category.icon}
                        {category.name}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </Flex>

          {/* Search */}
          <Box className="flex-1 max-w-xl mx-6">
            <SearchBox />
          </Box>

          {/* Actions */}
          <Flex align="center" gap="2">
            <Link to="/cart">
              <Button variant="soft">
                <CardStackPlusIcon />
              </Button>
            </Link>

            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="soft">
                  <PersonIcon />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth/login">
                <Button>Login</Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </nav>
    </header>
  )
}

export default Navbar 