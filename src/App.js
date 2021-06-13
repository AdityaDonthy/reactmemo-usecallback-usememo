import React from "react"


import "./styles.css"

export default function App() {
  const [fibCount, setFibCount] = React.useState(1)
  const [primeCount, setPrimeCount] = React.useState(1)

  const handleReset = () => {
    setFibCount(1)
    setPrimeCount(1)
  }

  const add10 = () => {
    setFibCount((c) => c + 10)
    setPrimeCount((c) => c + 10)
  }

  return (
    <React.Fragment>
      <button onClick={add10}>Add 10</button>
      <button onClick={handleReset}>Reset</button>
      
      <hr />
      {`Fib Count: ${fibCount}`}
      <hr />
      {`primeCount: ${primeCount}`}
    </React.Fragment>
  );
}
