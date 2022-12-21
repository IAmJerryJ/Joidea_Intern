import React, { useState } from "react";

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  /* To render content conditionaly, if no expense, don't render */
  //Write out of the render, to avoid too much logic, make JSX clean
  let expensesContent = <p>No expenses found.</p>;

  if (filteredExpenses.length > 0) {
    expensesContent = filteredExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
            />
          ))
  }

  return (
    <div>
      {/* Card component as the container*/}
      <Card className="expenses">
        {/*Filter expenses depend on year */ }
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />  
        { expensesContent }
      </Card>
    </div>
  );
};

export default Expenses;
