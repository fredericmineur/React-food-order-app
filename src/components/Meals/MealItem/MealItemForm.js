import { useRef, useState } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const inputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true)
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = + enteredAmount;
    if (enteredAmount ===0 || enteredAmountNumber <1 || enteredAmountNumber >5) {
        setAmountIsValid(false);
        return;
    } else {
        setAmountIsValid(true);
        props.onAddToCart(enteredAmountNumber);
        return;
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        inputRef={inputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid number (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
