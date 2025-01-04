import { useCartStore } from '~/store'
import { Card, Button, Text, Flex, Table } from '@radix-ui/themes'
import { formatPrice } from '~/utils/format'
import cartService from '~/services/cart'
import { useEffect } from 'react'

const Cart = () => {
  const { items, total, setCart, removeItem, updateQuantity } = useCartStore()

  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await cartService.getCart()
      setCart(data)
    }
    fetchCart()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        {items.length === 0 ? (
          <Text size="5" align="center">Your cart is empty</Text>
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {items.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{formatPrice(item.price)}</Table.Cell>
                  <Table.Cell>
                    <input
                      type="number"
                      min="1"
                      value={item.stock}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 p-1 border rounded"
                    />
                  </Table.Cell>
                  <Table.Cell>{formatPrice(item.price * item.stock)}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => removeItem(item.id)} color="red">
                      Remove
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
        
        <Flex justify="between" p="4" mt="4" className="border-t">
          <Text size="5" weight="bold">Total:</Text>
          <Text size="5" weight="bold">{formatPrice(total)}</Text>
        </Flex>
      </Card>
    </div>
  )
}

export default Cart 