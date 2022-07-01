import { useMercadopago } from 'react-sdk-mercadopago';

export default function Payment() {
    const mercadopago = useMercadopago.v2('APP_USR-89b19be6-647b-4b93-93be-edca33b21aea', {locale: 'es-AR'});
    console.log(mercadopago)

    let b:any= document.getElementById('checkout-btn');
    let sKart= document.getElementById('shopping-cart');
    let contPay = document.getElementById('container_payment');

    function fadeOut(el, v){
        el.style.opacity = 1;
      
        (function fade() {
          if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
          } else {
            requestAnimationFrame(fade);
          }
        })();
      }

      function fadeIn(el, display){
        el.style.opacity = 0;
        el.style.display = display || "block";
      
        (function fade() {
          var val = parseFloat(el.style.opacity);
          if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
          }
        })();
      }

      const show = (e) => {
        const getHeight = () => {
          e.style.display = 'block';
          const height = e.scrollHeight + 'px';
          e.style.display = '';
          return height;
        };
        const height = getHeight(); 
        e.classList.add('is-visible'); 
        e.style.height = height; 
        
        window.setTimeout(() => {
          e.style.height = '';
        }, 350);
      };
    
      document.getElementById("checkout-btn").addEventListener("click", function() {

        const input:any = document.getElementById("quantity");

          b.setAttribute('disabled', true);
          const orderData: Object = {
            quantity: input.value,
            description: document.getElementById("product-description").innerHTML,
            price: document.getElementById("unit-price").innerHTML
          };
            
          fetch("/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          })
            .then(function(response) {
                return response.json();
            })
            .then(function(preference) {
            // createCheckoutButton(preference.id);
            fadeOut(sKart, 500)
              setTimeout(() => {
               show(contPay)   
               fadeIn(contPay, 0);
                   
                }, 500);
            })
            .catch(function() {
                alert("Unexpected error");
               b.setAttribute('disabled', false);
                //$('#checkout-btn').attr("disabled", false);
            });
        });
        
        // function createCheckoutButton(preferenceId) {
        //   mercadopago.checkout({
        //     preference: {
        //       id: preferenceId
        //     },
        //     render: {
        //       container: '#button-checkout',
        //       label: 'Pay', 
        //     }
        //   });
        // }
        
        function updatePrice() {
        const input:any = document.getElementById("quantity");
          let quantity = input.value;
          let unitPrice = document.getElementById("unit-price").innerHTML;
          let amount = parseInt(unitPrice) * parseInt(quantity);
        
          document.getElementById("cart-total").innerHTML = "$ " + amount;
          document.getElementById("summary-price").innerHTML = "$ " + unitPrice;
          document.getElementById("summary-quantity").innerHTML = quantity;
          document.getElementById("summary-total").innerHTML = "$ " + amount;
        }
        
        document.getElementById("quantity").addEventListener("change", updatePrice);
        updatePrice();  
        
        document.getElementById("go-back").addEventListener("click", function() {
          fadeOut(contPay, 0);
         setTimeout(() => {
              show(sKart)   
              fadeIn(sKart, 0); 
          }, 500);
          b.setAttribute('disabled', false);
        });


    return (
    <>
    {/* Shopping Cart */}
    <div className="container" id="container">
          <div className="block-heading">
            <h2>Shopping Cart</h2>
            <p>This is an example of Checkout Pro integration of Mercado Pago</p> 
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="items">
                  <div className="product">
                    <div className="info">
                      <div className="product-details">
                        <div className="row justify-content-md-center">
                          <div className="col-md-3">
                            <img className="img-fluid mx-auto d-block image" src="img/product.png" />
                          </div>
                          <div className="col-md-4 product-detail">
                            <h5>Product</h5>
                            <div className="product-info">
                              <p><b>Description: </b><span id="product-description">Some book</span><br />
                              <b>Author: </b>Dale Carnegie<br/>
                              <b>Number of pages: </b>336<br/>
                              <b>Price:</b> $ <span id="unit-price">10</span></p>
                            </div>
                          </div>
                          <div className="col-md-3 product-detail">
                            <label htmlFor="quantity"><h5>Quantity</h5></label>
                            <input type="number" id="quantity" value="1" min="1" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  <h3>Cart</h3>
                  <div className="summary-item"><span className="text">Subtotal</span><span className="price" id="cart-total"></span></div>
                  <button className="btn btn-primary btn-lg btn-block" id="checkout-btn">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Payment */}
        <div className="container_payment" id="container_payment">
          <div className="block-heading">
            <h2>Checkout Payment</h2>
            <p>This is an example of a Mercado Pago integration</p>
          </div>
          <div className="form-payment">
            <div className="products">
              <h2 className="title">Summary</h2>
              <div className="item">
                <span className="price" id="summary-price"></span>
                <p className="item-name">Book x <span id="summary-quantity"></span></p>
              </div>
              <div className="total">Total<span className="price" id="summary-total"></span></div>
            </div>
            <div className="payment-details">
              <div className="form-group col-sm-12">
                <br/>      
                <div id="button-checkout">
                </div>                 
                <br/>
                <a id="go-back">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" className="chevron-left">
                    <path fill="#009EE3" fill-rule="nonzero"id="chevron_left" d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"></path>
                  </svg>
                  Go back to Shopping Cart
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer>
        <div className="footer_logo">
            <img id="horizontal_logo" src="img/horizontal_logo.png" />
        </div>
        <div className="footer_text">
        <p>Developers Site:</p>
        <p><a href="https://developers.mercadopago.com" target="_blank"/>https://developers.mercadopago1.com</p>
        </div>
		</footer>
    </>
)
}
