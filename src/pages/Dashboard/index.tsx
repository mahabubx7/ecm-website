import { useAuthStore } from '~/store'
import { Card, Heading, Text, Flex, Avatar } from '@radix-ui/themes'
import { formatDate } from '~/utils/format'

const Dashboard = () => {
  const user = useAuthStore((state) => state.user)

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <Flex direction="column" gap="4" p="4">
          <Flex align="center" gap="4">
            <Avatar 
              src={user.avatar} 
              fallback={user.name[0]} 
              size="6" 
              radius="full"
            />
            <div>
              <Heading size="6">{user.name}</Heading>
              <Text color="gray" size="2">
                Member since {formatDate(user.createdAt || '')}
              </Text>
            </div>
          </Flex>
        </Flex>
      </Card>
    </div>
  )
}

export default Dashboard 