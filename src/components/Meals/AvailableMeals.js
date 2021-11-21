import React, {useState, useEffect} from "react";
import styles from './AvailableMeals.module.css';
import Card from '../UI/Card.js';
import MealItem from "./MealItem/MealItem";


const AvailableMeals = props =>{

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  let errorMessage;

  const fetchMeals = async () => {
    // try {
      const response = await fetch("https://react-food-order-app-f946a-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    // } catch(error) {
    //   setHttpError(true);
    //   setIsLoading(false);
    //   console.log(error.message);
    //   errorMessage = error.message;
    // }
  }

  useEffect(()=>{
    fetchMeals().catch(error => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }, []);

  if(isLoading) {
    return <section>
      <p>Is loading...</p>
    </section>
  }

  if(httpError) {
    console.log(errorMessage)
    return <section className={styles["meals-error"]}>
      <p>{httpError}</p>
    </section>
  }

    const mealsList = meals.map((meal)=>{
        return <MealItem 
        id={meal.id}
        key={meal.id} 
        name={meal.name} 
        description={meal.description} 
        price={meal.price} />
    })

    return <section className={styles.meals}>
        <ul>
            <Card>
            {mealsList}
            </Card>
        </ul>
    </section>
}

export default AvailableMeals;