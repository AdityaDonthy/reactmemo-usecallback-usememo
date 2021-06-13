# This is an example app for understanding React.memo() , useCallback and useMemo

## React.useMemo

The way components are structured in this simple example is we have an App component which is mantaining state and 2 presentation components are computing the fibonacci and prime number for the nth number passed as props and just rendering the ui and attaching the click handlers passed in props.

React.memo is a Higher-order component that lets you skip re-rendering a component if its props haven’t changed. The way it does this is when a component is wrapped in React.memo(), React will render the component and memoize the result. 

On subsequent re-renders, React will perform a shallow comparison (===) between the previous props and the new props and if the props haven’t changed, React will skip rendering the component and reuse the last rendered result.

What this means for our example is we can wrap the exports of our computationally expensive components (NthFib and NthPrime) in React.memo and they’ll only re-render when their props change.

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
Above works but there's a better way to do it