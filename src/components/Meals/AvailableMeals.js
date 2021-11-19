import React, {useEffect} from "react";
import styles from './AvailableMeals.module.css';
import Card from '../UI/Card.js';
import MealItem from "./MealItem/MealItem";
import { useState } from "react/cjs/react.development";

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];



const AvailableMeals = props =>{

  const [meals, setMeals] = useState([]);

  const fetchMealsHandler = async () => {
    try {
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
      console.log(loadedMeals);
      setMeals(loadedMeals);

    } catch(error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    fetchMealsHandler();
  }, []);

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