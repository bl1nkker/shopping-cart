import { useState } from 'react'
import { useQuery } from 'react-query'

// Icons
import { Drawer, LinearProgress, Grid, Badge } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

// Styles
import { Wrapper, StyledButton } from './styles/App.style'

import Item from './components/Item';
import Cart from './components/Cart';

export type CartItemType = {
  id:number;
  category:string;
  descriprion:string;
  image:string;
  price:number;
  title:string;
  amount:number;
}

const fetchProducts = async():Promise<CartItemType[]> =>{
  // fetch data
  return (await fetch('https://fakestoreapi.com/products')).json()
}

const App:React.FC = () => {
  const { data, isLoading } = useQuery<CartItemType[]>('products', fetchProducts)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItemType[] | []>([])
  const lk = 123

  const getTotalItems = (items: CartItemType[]) =>{
    return (items.reduce((ack:number, item) => ack + item.amount, 0))
  }

  const handleAddToCart = (clickedItem: CartItemType) =>{

    const isItemInCart:CartItemType | undefined = cartItems!.find(item => item.id === clickedItem.id)

    if (isItemInCart){
      const updatedCartItems:CartItemType[] = [...cartItems].map(item => item.id === clickedItem.id ? {...item, amount:item.amount += 1} : item)
      setCartItems(updatedCartItems)
    }else{
      setCartItems([...cartItems, {...clickedItem, amount: 1}])
    }
  }

  const handleRemoveFromCart = (itemId: number) =>{
    // If amount = 1
    const removedItemAmount:number = cartItems.find(item => item.id === itemId)!.amount
    if (removedItemAmount <= 1){
      const updatedCart:CartItemType[] = [...cartItems].filter(item => item.id !== itemId)
      setCartItems(updatedCart)
    }else{
      const updatedCart:CartItemType[] = [...cartItems].map(item => item.id === itemId ? {...item, amount:item.amount -= 1} : item)
      setCartItems(updatedCart)
    }
    
    
  }
  if (isLoading) return <LinearProgress />
  return (<Wrapper>
    <Drawer anchor='right' open={isCartOpen} onClose={() => setIsCartOpen(!isCartOpen)}>
      <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
    </Drawer>

    <StyledButton onClick={() => setIsCartOpen(!isCartOpen)}>
      <Badge badgeContent={getTotalItems(cartItems)} color='error'>
        <AddShoppingCart />
      </Badge>
    </StyledButton>

    <Grid container spacing={3}>
      {data?.map(item => (
        <Grid item key={item.id} xs={12} sm={4}> 
          <Item item={item} handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
    </Grid>
  </Wrapper>);
}

export default App;
