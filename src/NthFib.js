import React from 'react';
import {suffixOf, calculateFib} from './math'

const NthFib = function({count, increment}) {

    const memoizedFib = React.useMemo(() => calculateFib(count), [count])

    return(
        <div className='fib'>
            <h2>Nth Fib</h2>
            <p>The {suffixOf(count)} number in Fibonacci sequence is {memoizedFib}</p>
            <button onClick={increment}>Next number</button>
        </div>
    )
}

export default NthFib;