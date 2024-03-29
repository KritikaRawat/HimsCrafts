
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/cart-items";

const cartItems = [
  {
    productId:"asbsdfadf",
    photo:"https://imgs.search.brave.com/XNK3OdRnko1pGin5SeVKpDWoU4lPN79tztOtRKmAtUY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzgxMDU2OTQvci9p/bC83NjEwYjkvMTg1/NDEzOTYwMC9pbF82/MDB4NjAwLjE4NTQx/Mzk2MDBfa2doNS5q/cGc",
    name:"BootleNeck" ,
    price:1000,
    quantity: 4,
    stock:435,
  },

];

const subtotal = 4000;
const tax = Math.round(subtotal*0.18);
const shippingCharges= 200;
const discount = 400;
const total = subtotal+tax+shippingCharges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

//   const incrementHandler = (cartItem: CartItem) => {
//     if (cartItem.quantity >= cartItem.stock) return;

//     dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
//   };
//   const decrementHandler = (cartItem: CartItem) => {
//     if (cartItem.quantity <= 1) return;

//     dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
//   };
//   const removeHandler = (productId: string) => {
//     dispatch(removeCartItem(productId));
//   };
  useEffect(() => {
    // const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      if(Math.random()>0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    },1000);
      // axios
//         .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
//           cancelToken,
//         })
//         .then((res) => {
//           dispatch(discountApplied(res.data.discount));
//           setIsValidCouponCode(true);
//           dispatch(calculatePrice());
//         })
//         .catch(() => {
//           dispatch(discountApplied(0));
//           setIsValidCouponCode(false);
//           dispatch(calculatePrice());
//         });
//     }, 1000);

    return () => {
      clearTimeout(timeOutID);
//       cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

//   useEffect(() => {
//     dispatch(calculatePrice());
//   }, [cartItems]);



  return (
    <div className="cart">
      <main>
        {
          cartItems.length>0 ?
          cartItems.map((i, idx) => (
            <CartItem
              // incrementHandler={incrementHandler}
              // decrementHandler={decrementHandler}
              // removeHandler={removeHandler}
              key={idx}
              cartItem={i}
            />
          )): (
            <h1>No Items Added</h1>
          )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;