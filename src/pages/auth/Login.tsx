import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  Card, 
  Heading, 
  TextField, 
  Button, 
  Text, 
  Flex,
  Box 
} from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { useAuthStore } from '~/store'
import { authService } from '~/services'
import { useToast } from '~/components/common/Toast'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((state) => state.login)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const toast = useToast()

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
      const { data: response } = await authService.login(data)
      login(null, response.access, response.refresh)
      toast.success('Logged in successfully!')
      const redirectTo = location.state?.from || '/'
      navigate(redirectTo, { replace: true })
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4" p="6">
            <Heading size="6" align="center">Welcome Back</Heading>
            
            {error && (
              <Text color="red" size="2" align="center">
                {error}
              </Text>
            )}

            <TextField.Root 
              name='email'
              type='email'
              placeholder='Email'
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
            >
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>
            </TextField.Root>

            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Text align="center" size="2">
              Don't have an account?{' '}
              <Link 
                to="/auth/create-account"
                className="text-blue-500 hover:underline"
              >
                Create Account
              </Link>
            </Text>
          </Flex>
        </form>
      </Card>
    </Box>
  )
}

export default Login 