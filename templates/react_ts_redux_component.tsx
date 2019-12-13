import React from 'react';
import { RootState } from '../store/rootReducer.ts';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';

interface OwnProps {
    // No props
}

interface OwnState {
    // No state
}

type MyComponentProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & OwnProps;

class MyComponent extends React.Component<MyComponentProps, OwnState> {
    render() {
        return (
            <div className="task-list-item">

            </div>
        )
    }
}

const mapState = (state: RootState) => ({
    // Add state to map to props
})

const mapDispatch = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
    // Add Action Creators
}, dispatch);

const connector = connect(
    mapState,
    mapDispatch
)

export default connector(MyComponent);