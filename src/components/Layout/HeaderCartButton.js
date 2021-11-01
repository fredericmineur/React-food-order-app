import React, {useContext, useEffect, useState} from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {

  const cartCtx = useContext(CartContext);
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
  const {items} = cartCtx;


  const numberOfCartItems = items.reduce((curNumber, item)=>{
    return curNumber + item.amount
  }, 0);

  useEffect(()=>{
    if(items.length===0){
      return;
    }
    setButtonIsHighlighted(true);
    const timer = setTimeout(()=>{setButtonIsHighlighted(false)}, 300);
    return(()=>{
      clearTimeout(timer);
    })

  }, [items])

   const classesAnimatedButton = `${styles.button} ${buttonIsHighlighted? styles.bump : ''}`

  return (
    <button className={classesAnimatedButton} onClick={props.onShowCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
