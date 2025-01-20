// import { 
//   HomeIcon,
// //   PersonIcon,
//   BackpackIcon,
//   MobileIcon,
//   HeartIcon,

// } from '@radix-ui/react-icons'
import type { Category } from '~/types'

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    parent: null,
    // icon: MobileIcon
  },
  {
    id: '2',
    name: 'Mobile Phones',
    slug: 'mobile-phones',
    parent: null,
    // icon: MobileIcon
  },
  {
    id: '3',
    name: 'Accessories',
    slug: 'accessories',
    parent: null,
    // icon: HeartIcon
  },
  {
    id: '4',
    name: 'Fashion',
    slug: 'fashion',
    parent: null,
    // icon: BackpackIcon
  },
  {
    id: '5',
    name: 'Home & Living',
    slug: 'home-living',
    parent: null,
    // icon: HomeIcon
  }
]

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' }
] 