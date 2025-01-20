import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Card, 
  Heading, 
  TextField, 
  Button, 
  Text, 
  Flex,
  Box 
} from '@radix-ui/themes'
import { 
  EnvelopeClosedIcon, 
  LockClosedIcon,
} from '@radix-ui/react-icons'
import { useAuthStore } from '~/store'
import { authService } from '~/services'

const CreateAccount = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.target as HTMLFormElement
    const data = {
      email: form.email.value,
      password: form.password.value
    }

    try {
      const response = await authService.register(data)
      console.log(response)
      login(response.data.user!, response.data.access, response.data.refresh)
      navigate('/', { replace: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed')
      console.log("ERROR: ", error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4" p="6">
            <Heading size="6" align="center">Create Account</Heading>
            
            {error && (
              <Text color="red" size="2" align="center">
                {error}
              </Text>
            )}

            <TextField.Root
              name="email"
              type="email"
              placeholder="Email"
              required
            >
              <TextField.Slot>
                <EnvelopeClosedIcon />
              </TextField.Slot>
            </TextField.Root>

            <TextField.Root
              name="password"
              type="password"
              placeholder="Password"
              required
              minLength={6}
            >
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>
            </TextField.Root>

            <Button type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Text align="center" size="2">
              Already have an account?{' '}
              <Link 
                to="/auth/login"
                className="text-blue-500 hover:underline"
              >
                Login
              </Link>
            </Text>
          </Flex>
        </form>
      </Card>
    </Box>
  )
}

export default CreateAccount 