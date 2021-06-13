import React from 'react';
import {suffixOf, calculatePrime} from './math'

export default function NthPrime({count, increment}) {
    const memoizedPrime = React.useMemo(() => calculatePrime(count), [count])

    return(
        <div className='prime'>
        <h2>Nth Prime</h2>
        <p>The <b>{suffixOf(count)}</b>  prime number is {memoizedPrime}</p>
        <button onClick={increment}>Next number</button>
    </div>
    )
}