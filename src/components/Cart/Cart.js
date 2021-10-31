import { useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0 ;

  const removeCartItemHandler = item => {};
  const addCartItemHandler = id => {};

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        // <li>{item.name}</li>
        <CartItem 
        key={item.id} 
        id={item.id} 
        name={item.name} 
        price={item.price} 
        amount={item.amount}
        onAdd={addCartItemHandler.bind(null, item)}
        onRemove={removeCartItemHandler.bind(null, item.id)}/>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={props.onCloseCart}>Close</button>
          {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
