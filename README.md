angular-react-components
========================

A exercise to compare the use of [Angular](https://angularjs.org/) and [React](http://facebook.github.io/react/index.html) in creating stateful components with common behaviour implemented once. [Demo](http://plnkr.co/GnAuJm)

Given an array of objects (presumably coming from the server), render each as a UI component with state and behaviour. Each component will have common features that must be implemented DRYly. In the current exercise, the common behaviour is to bind the visibility of the component to the `visible` property of the object. We do this by implementing a base or wrapper component. The goal is the outer and inner components share enough state that a property mutation originating in the inner component triggers a binding declared in the outer component. In a large application, there would be many different type of inner components so pulling common behaviour into an outer component avoids duplication. 


#### The object 
``` { name: 'control1', visible: true, message:'One' } ```

## Angular
We nest directives using transclusion, passing the name of the object into the inner directive where the object is retrieved and stored on `$scope`. 

``` <outer><inner name="control1"></inner></outer> ```

The object is also passed to the parent `$scope` by requiring (`require: '?^outer'`) the parent and receiving the parent controller in the `postList` function. The `<outer>` directive wraps the `<inner>` in markup, using `ng-show` to bind to `visible`. It also display's the object's name. The `<inner>` directive binds a checkbox to `visible`. Since `<outer>` and `<inner>` share the same model instance, these bindings succeed even though the directives are isolated. 


## React
We again nest outer and inner classes, this time passing the full object as a `prop` to the outer control which converts it to state via `getInitialState`. The outer class receives the object instead of the inner because data only flows from parent to child in React. The outer class binds its visibility to the `visible` property. The object is passed to the child as a `prop` along with [two-way binding helper object](http://facebook.github.io/react/docs/two-way-binding-helpers.html) available through the `ReactLink` add-on which the child uses to bind the `checkedLink` property of the checkbox.

## Notes

* In the Angular implementation, the outer and inner directives share the same model object instance. The allows for events originating in the inner to mutate the outer without manual  hook up other than simple declarative bindings. (The manner in which shared scope is achieved in open to debate, but I have this pattern running in a large production application to good effect.)

* In the React implementation there is no shared state. The parent must pass to the child callbacks for each type of signal it wishes to receive from the child. In the current implemenation we are concerned with visibility. In a more complex application, we may wish to handle events for validity, enable/disable, debugging and more. We use the `ReactLink` add-on to avoid having to to created change event handlers in the `inner` that call a `prop` function passed in by `outer`.

* Angular requires that the directives be declared in markup, requiring that we render the tags server-side. Undoubtedly we could iterate over the array and insert the tags into DOM, but this would require us to prevent automatic initialization and [manually bootstrap the Angular application](https://docs.angularjs.org/guide/bootstrap).

* Since React allows us to build the entire UI in Javascript, we can build our class instances by mapping over the object array.

```javascript
var models = this.props.data.map(function(item, i){

    return <outer key={i} model={item} ><inner /></outer>
}); 
```

* Angular's factories provide a nice way to encapsulate and share the data source, making it easy to replace the hard-coded data source with a more realistic fetch from the server.

* React may also provide a solution too. I am much more familiar with Angular than with React and it is possible that my solution does not use React in an idiomatic way.

* Note that in the current exercise we only have one component type. In a more realistic scenario, there would be many types each inheriting the common behaviour.
