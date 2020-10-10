# D3 Visualizations

## Ensure D3 is installed

If you haven't already make sure to run `npm install` in the frontend directory to install all dependencies including d3 and @types/d3

## Data Format

In order for d3.hierarchy to create a hierarchical layout, data must be in below shape with a root node or an object representing the root node. The below example would represent the shape for the Transition data related to Waiters and Waitresses:

```
{
  name: 'Waiters and Waitresses',
  soc: '35-301',
  children: [
    {
      name: 'Sales and Retail',
      children: [
        {
          category: 'Sales and Retail',
          name: 'Retail salespersons',
          value: 0.0427,
        },
        {
          category: 'Sales and Retail',
          name: 'Cashiers',
          value: 0.0312,
        },
      ],
    },
    {
      name: 'Office and Administration',
      children: [
        {
          category: 'Office and Administration',
          name: 'Customer services representatives',
          value: 0.0421,
        },
        {
          category: 'Office and Administration',
          name: 'Hotel, motel, and resort desk clerks',
          value: 0.0148,
        },
      ],
    },
  ],
}
```

The property name 'children' is the accessor used by d3.hierarchy and must return an iterable of data representing the children.

## Rendering the Treemap

Width, height and data must be provided as parameters to the treemap component in order for it to render correctly.
