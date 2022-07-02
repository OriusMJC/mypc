import axios from 'axios';
import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'


function Payments() {
  let [products, setProducts] = useState({
    price: 200,
  })
  let priceForStripe = products.price * 100;
  let tokenKey = "pk_test_51LGmEQFUyCKJpzqxqIy615cuo6fzw9piBYzGS7ek5KQkW55LDarHinS2GrBB7gIstqMSkMgVDfc57lpol4q7BYvB00RWv3BVxJ";

  let payNow = async token => {
    try {
      // let data = {
      //   user: 
      // }
      const response = await axios.post('users/payments', {
        amount: products.price * 100,
        token,

      })
      if(response.status === 200) {
        console.log("pago realizado")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h3>Pagos paaa</h3>
      <p>total a pagar {products.price}</p>
      <StripeCheckout
        stripeKey={tokenKey}
        label="Pagar ahora"
        name="Pagar con tarjeta de crédito"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Tu total es de ${products.price}`}
        // token={tokenKey}
        token={payNow}
      />
    </div>
  )
}

export default Payments