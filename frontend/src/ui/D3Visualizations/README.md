# D3 Visualizations

## Ensure D3 is installed

If you haven't already make sure to run `npm install` in the frontend directory to install all dependencies including d3 and @types/d3

## Data Format

In order for d3.hierarchy to create a hierarchical layout, data must be in below shape with a root node or an object representing the root node. The below example would represent the shape for the Transition data related to Waiters and Waitresses:

```
{
  name: 'Waiters and Waitresses',
  children: [
    {
      annualSalary: 29360
      code: "41-2031"
      hourlyPay: 14.1
      name: "Retail salespersons"
      transitionRate: 0.0427
    },
    {
      annualSalary: 37300
      code: "43-4051"
      hourlyPay: 17.9
      name: "Customer service representatives"
      transitionRate: 0.0421
    },
    {
      annualSalary: 59820
      code: "11-9051"
      hourlyPay: 28.76
      name: "Food service managers"
      transitionRate: 0.0407
    },
    {
      annualSalary: 28000
      code: "35-3011"
      hourlyPay: 13.46
      name: "Bartenders"
      transitionRate: 0.039
    },
  ],
}
```

This can be achieved by retrieving the data from the relevant API, passing it into the 'createTransitions' function and passing the resulting array into the 'createHierarchies' function found in their respective files under the 'domain' directory.

## Rendering the Treemap

Width, height and data must be provided as parameters to the treemap component in order for it to render correctly.
