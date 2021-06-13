import React from 'react';
import {suffixOf, calculateFib} from './math'

const NthFib = function({count, increment}) {
    const fib = calculateFib(count);
    return(
        <div className='fib'>
            <h2>Nth Fib</h2>
            <p>The {suffixOf(count)} number in Fibonacci sequence is {fib}</p>
            <button onClick={increment}>Next number</button>
        </div>
    )
}

export default React.memo(NthFib, (prevProps, currentProps) => {
    return prevProps.count === currentProps.count
});