import React from 'react';
import {suffixOf, calculatePrime} from './math'

const NthPrime = function NthPrime({count, increment}) {
    const prime = calculatePrime(count);

    return(
        <div className='prime'>
        <h2>Nth Prime</h2>
        <p>The <b>{suffixOf(count)}</b>  prime number is {prime}</p>
        <button onClick={increment}>Next number</button>
    </div>
    )
}

export default React.memo(NthPrime);