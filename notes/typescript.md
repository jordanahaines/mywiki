## High Level Concepts
Typescript will infer types on variables whenever possible. To be explicit:
```
let isDone: boolean = false; // anotate vars
(param: string): number => { return 4; } // annotate function
```
**Objects** Probably want to use interface, but we can also annotate types inline:
```
function print(labelObj: {
    label: string; height: number;
}): outputObj: { prop: val; prop2: val2} {
    // ... actual function that returns obj here
}
```
**Interfaces** are reusable object type definitions for objects (including functions).
```
    interface Square {
        width?: number; // ? indicates optional
        height?: number;
        readonly color: string;
        [propName: string]: any; // Any other property can be of any type
    }

    interface SearchFunc {
        (source: string, subString: string): Square
    }

    interface ClassDefinition {
        currentDate: Date;
        addTime(time: number): Date {
            this.currentDate += time;
            return this.currentDate;
        }
    }
    class MyClass implements ClassDefinition {
        currentDate: Date = new Date();
        addTime(time) {
            this.currentDate += time;
            return this.currentDate;
        }
    }
```
- Use `?` after property name to indicate optional properties
- `readonly` before prop name to indicate properties that are only modifiable when obj is created.
- Use cast assertion (`as`)to get around excess property checking and include properties on an object that aren't defined on its type. Can also use index signatures.
- Interfaces for functions only care about position of parameters (not names). Using interface removes the need to annotate param/return types on function signature.


**Type Assertions** are like type casts, allowing developer to use type that Typescript may not think is right.
    - Angle: `strLength: number = (<string>someValue).length;`
    - As (must use for JSX): `(someValue as string)`

## [Using Typescript with Redux](https://redux.js.org/recipes/usage-with-typescript)
1. Create `types.ts` in a feature (ducks) folder with: Const for each action type (export), Interface for objs that comprise state (export), Interface for initial state (export), Interface for each action object (export Type that is Union of these interfaces).
2. Import into action creators. Create action creator functions with:
    - Annotated types on arguments
    - Return value that's Type from (1) union of action object interfaces
3. Import (1) into reducers. Create const initial state object with state interface. Define reducer functions with:
    - State argument with state interface
    - Action argument with action Type (interface union)
    - Return type of state interface
4. In root file for store, create rootReducer with `combineReducers`. Also: `export type rootState = ReturnType<typeof rootReducer>` (because rootReducer is a _function_). This ensures the state's type is kept up to date as individual reducers change.

Now the Redux starts. We need to separate mapState and mapDispatch in `connect`.

5. Define `mapState = (state: RootState)`. Define `mapDispatch` function with single parameter of type `Dispatch<>` that returns the result of `bindActionCreators` function.
```
const mapDispatch = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
    // Add Action Creators
}, dispatch);
```

6. Define connector function: `const connector = connect(mapState, mapDispatch)`
7. `type PropsFromRedux = ConnectedProps<typeof connector>`
8. Define interfaces for `OwnProps` and `OwnState`.
9. Create new type that is combination of the return type of `mapState`, the return type of `mapDispatch` and `ownProps`. This combined type will be the type of our component's `props`.
```
type MyComponentProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & OwnProps;
```
10. Create component with specified types for props and state:
```
class MyComponent extends React.Component<MyComponentProps, OwnState>
```
11. Export wrapped component: `export default connector(Component)`


Organization-wise, remember that typescript objects (types, interfaces) can be defined at any point in the file, and used at any point (read: before they're defined). I like to order by file with:
1. `OwnProps` and `OwnState` interface
2. `MyComponentProps` type definition (type for our component's props)
3. Define component
4. `mapState` and `mapDispatch`
5. `connector` function
6. `export`