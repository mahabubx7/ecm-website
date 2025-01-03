import { Link } from 'react-router-dom'
import { Text, Flex, Heading, Grid } from '@radix-ui/themes'
import { 
  TwitterLogoIcon, 
  InstagramLogoIcon, 
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  HomeIcon 
} from '@radix-ui/react-icons'
import { CATEGORIES } from '~/constants'

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <Grid columns="4" gap="6">
          {/* Company Info */}
          <Flex direction="column" gap="4">
            <Heading size="4">Store Name</Heading>
            <Text size="2" color="gray">
              Your trusted online shopping destination for quality products at 
              competitive prices.
            </Text>
            <Flex gap="4">
              <a href="#" className="hover:text-blue-500">
                <TwitterLogoIcon width="20" height="20" />
              </a>
              <a href="#" className="hover:text-blue-500">
                <InstagramLogoIcon width="20" height="20" />
              </a>
              <a href="#" className="hover:text-blue-500">
                <LinkedInLogoIcon width="20" height="20" />
              </a>
            </Flex>
          </Flex>

          {/* Quick Links */}
          <Flex direction="column" gap="3">
            <Heading size="3">Quick Links</Heading>
            <Link to="/shop" className="hover:underline">
              <Text size="2">Shop</Text>
            </Link>
            <Link to="/cart" className="hover:underline">
              <Text size="2">Cart</Text>
            </Link>
            <Link to="/dashboard" className="hover:underline">
              <Text size="2">My Account</Text>
            </Link>
          </Flex>

          {/* Categories */}
          <Flex direction="column" gap="3">
            <Heading size="3">Categories</Heading>
            {CATEGORIES.slice(0, 5).map(category => (
              <Link 
                key={category.id}
                to={`/shop?category=${category.slug}`}
                className="hover:underline"
              >
                <Text size="2">{category.name}</Text>
              </Link>
            ))}
          </Flex>

          {/* Contact Info */}
          <Flex direction="column" gap="3">
            <Heading size="3">Contact Us</Heading>
            <Flex align="center" gap="2">
              <HomeIcon />
              <Text size="2">
                123 Shopping Street, City, Country
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <MobileIcon />
              <Text size="2">+1 234 567 890</Text>
            </Flex>
            <Flex align="center" gap="2">
              <EnvelopeClosedIcon />
              <Text size="2">support@store.com</Text>
            </Flex>
          </Flex>
        </Grid>

        <Flex 
          justify="between" 
          align="center" 
          className="border-t mt-8 pt-8"
        >
          <Text size="2" color="gray">
            © {new Date().getFullYear()} Store Name. All rights reserved.
          </Text>
          <Flex gap="4">
            <Link to="/privacy" className="hover:underline">
              <Text size="2">Privacy Policy</Text>
            </Link>
            <Link to="/terms" className="hover:underline">
              <Text size="2">Terms of Service</Text>
            </Link>
          </Flex>
        </Flex>
      </div>
    </footer>
  )
}

export default Footer 