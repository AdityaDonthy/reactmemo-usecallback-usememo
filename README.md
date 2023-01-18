## This is a sample app for understanding React.memo() , useCallback and useMemo

The way components are structured in this simple example is that we have an App component which is maintains the app's state and 2 presentation components that are computing the fibonacci and prime number for the nth number passed as props and it's responsibility is to render the computed value and attaching the click handlers passed in props.

### React.memo

React.memo is a Higher-order component that lets you skip re-rendering a component if its props haven’t changed. The way it does this is when a component is wrapped in `React.memo()`, React will render the component and memoize the result. 

On subsequent re-renders, React will perform a shallow comparison (===) between the previous props and the new props and if the props haven’t changed, React will skip rendering the component and reuse the last rendered result.

What this means for our example is we can wrap the exports of our computationally expensive components `NthFib` and `NthPrime` in `React.memo` and they’ll only re-render when their props change.

You might think wrapping the component in React.memo like below would be enough
```javascript
export default React.memo(NthFib);
```

What makes this example tricky is that since we are passing in a function as props from our App component, the function prop ```increment``` is never shallow equal to the previous props function because a function is a reference type! 

Primitive vs. Reference Values

Whenever you create a variable in JavaScript, that variable can store one of two types of data, a primitive value like ```count``` or a reference value ```increment```. If the value is a ```number, string, boolean, undefined, null, or symbol```, it’s a primitive value. If it’s anything else (i.e. typeof object or function), it’s a reference value.

So instead of comparing both props to decide whether to render or not , we can tell react to check only for count prop as below. We explicitly tell how to decide.

```javascript
export default React.memo(NthFib, (prevProps, currentProps) => {
    return prevProps.count === currentProps.count
})
```

Check the [commit](https://github.com/AdityaDonthy/reactmemo-usecallback-usememo/commit/ff34d75ca970572245a4614015c8e158bddff0e9?branch=ff34d75ca970572245a4614015c8e158bddff0e9&diff=split). Above works but there's a better way to do it React.useCallback

## React.useCallback
useCallback returns a memoized callback. What this means is that any function you create with useCallback won’t be re-created on subsequent re-renders. It takes two arguments, a function and an array of values that the function depends on. What the memoized function returns will only change if one of the values in the dependency array change. If a or b changes, the ```memoizedCallback``` will be a new reference

What that does is we pass React a function and React gives that same function back to us, but with a catch. On subsequent renders, if the elements in the dependency list are unchanged, instead of giving the same function back that we give to it, React will give us the same function it gave us last time.

So while we still create a new function every render (to pass to useCallback), React only gives us the new one if the dependency list changes.

```javascript
const memoizedCallback = useCallback(() => doSomething(a, b),
  [a, b],
)
```

```javascript
  const memoizedFib = React.useCallback(() => 
    setFibCount((c) => c + 1), 
    []
  )
  const memoizedPrime = React.useCallback(() => 
    setPrimeCount((c) => c + 1), 
    []
  )

<NthFib 
    count={fibCount}
    increment={memoizedFib}
    />
    <hr />
    <NthPrime 
    count={primeCount}
    increment={memoizedPrime}
    />    
```

Doing the above means I no longer have to pass the second parameter to React.memo as the useCallback hook makes sure to return a new instance of the function only when ever the array of values that the function depends on changes. Check this [commit](https://github.com/AdityaDonthy/reactmemo-usecallback-usememo/commit/59a33a4f813db95c80c6064c647639c83da42e55)

## React.useMemo

What if, instead of memoizing at the component level using React.memo, we memoize the expensive calculations themselves? So what we need is a way to tell React to only invoke expensive function like ```calculateFib``` on re-renders where ```fibCount``` has changed, otherwise use whatever the values were from the previous render. 

useMemo takes two arguments, a function and an array of values that the function depends on. It returns a value that will be computed on   <li>the initial render and </li> <li> whenever any of the values in the dependency array change </li>

```javascript
const memoizedValue = useMemo(() => 
  computeExpensiveValue(a, b),
  [a, b]
)
```
Check out the this [commit](https://github.com/AdityaDonthy/reactmemo-usecallback-usememo/commit/8db1024dba3dc40e68d670b89f3d1847e9464fec)
