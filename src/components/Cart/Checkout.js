import { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const isNotEmtpy = (value) => value.trim() !== "";
  const isSixChars = (value) => value.trim().length === 6;

  const confirmHandler = (event) => {
    event.preventDefault();
    const nameEntered = nameInputRef.current.value;
    const streetEntered = cityInputRef.current.value;
    const postalCodeEntered = postalCodeInputRef.current.value;
    const cityEntered = cityInputRef.current.value;

    const nameEnteredIsValid = isNotEmtpy(nameEntered);
    const streetEnteredIsValid = isNotEmtpy(streetEntered);
    const postalCodeEnteredIsValid = isSixChars(postalCodeEntered);
    const cityEnteredIsValid = isNotEmtpy(cityEntered);

    const formIsValid =
      nameEnteredIsValid &&
      streetEnteredIsValid &&
      postalCodeEnteredIsValid &&
      cityEnteredIsValid;

    setFormInputsValidity({
      name: nameEnteredIsValid,
      street: streetEnteredIsValid,
      postalCode: postalCodeEnteredIsValid,
      city: cityEnteredIsValid,
    });

    if (!formIsValid) {
      return;
    }

    console.log(formInputsValidity);
  };

  const classControlName = `${styles.control} ${
    formInputsValidity.name ? "" : styles.invalid
  }`;
  const classControlStreet = `${styles.control} ${
    formInputsValidity.street ? "" : styles.invalid
  }`;
  const classControlPostalCode = `${styles.control} ${
    formInputsValidity.postalCode ? "" : styles.invalid
  }`;
  const classControlCity = `${styles.control} ${
    formInputsValidity.city ? "" : styles.invalid
  }`;

  

  return (
    <form onSubmit={confirmHandler}>
      <div className={classControlName}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>You must enter a name</p>}
      </div>
      <div className={classControlStreet}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>You must enter a street</p>}
      </div>
      <div className={classControlPostalCode}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>You must valid post code</p>}
      </div>
      <div className={classControlCity}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>You must enter a city</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
