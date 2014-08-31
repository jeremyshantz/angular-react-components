angular-react-components
========================

A exercise to compare the use of [Angular](https://angularjs.org/) and [React](http://facebook.github.io/react/index.html) in creating stateful components with common behaviour implemented once.

Given an array of objects (presumably coming from the server), render each as a UI component with state and behaviour. Each component will have common features that must be implemented DRYly. In the current exercise, the common behaviour is to bind the visibility of the component to the `visible` property of the object. 

##### The object 
``` { name: 'control1', visible: true, message:'One' } ```

## Angular
We nest directives using transclusion, passing the name of the object into the inner directive where the object is retrieved and stored on `$scope`. 

``` <outer><inner name="control1"></inner></outer> ```

The object is also passed to the parent `$scope` by requiring (`require: '?^outer'`) the parent and receiving the parent controller in the `postList` function. The `<outer>` directive wraps the `<inner>` in markup, using `ng-show` to bind to `visible`. It also display's the object's name. The `<inner>` directive outputs the `message` property




## React


Angular's factories provide a nice way to encapsulte and and share the data source, making it easy to replace the 


Note and that in the current exercise we only have only component type. In a more realistic scenario, there would be many types each inheriting the common behaviour.





> [{ name: 'control1', visible: true, message:'One' },
> { name: 'control2', visible: true, message:'Two' },
>  { name: 'control3', visible: true, message:'Three' }]
