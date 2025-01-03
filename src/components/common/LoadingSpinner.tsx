import { Flex } from '@radix-ui/themes'

const LoadingSpinner = () => {
  return (
    <Flex justify="center" align="center" className="py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
    </Flex>
  )
}

export default LoadingSpinner 