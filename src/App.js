import React from "react"
import NthFib from "./NthFib"
import NthPrime from './NthPrime'
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

  const memoizedFib = React.useCallback(() => setFibCount((c) => c + 1), 
    []
  )

  const memoizedPrime = React.useCallback(() => setPrimeCount((c) => c + 1), 
    []
  )

  return (
    <div className='container'>
      <div className='buttons'>
        <button onClick={add10}>Add 10</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <hr />
      <NthFib 
        count={fibCount}
        increment={memoizedFib}
      />
      <hr />
      <NthPrime 
        count={primeCount}
        increment={memoizedPrime}
      />
    </div>
  );
}
