/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, {forwardRef, memo} from 'react';
import {View} from 'react-native';
import _ from 'underscore';
import {defaultProps as optionsListDefaultProps, propTypes as optionsListPropTypes} from './optionsListPropTypes';

const propTypes = {
    ...optionsListPropTypes,
};

const defaultProps = {
    ...optionsListDefaultProps,
};

function BaseOptionsList({
    focusedIndex,
}) {

    return (
        <View>
            
                    <p>{focusedIndex}</p>
         
        </View>
    );
}

BaseOptionsList.propTypes = propTypes;
BaseOptionsList.defaultProps = defaultProps;
BaseOptionsList.displayName = 'BaseOptionsList';

// using memo to avoid unnecessary rerenders when parents component rerenders (thus causing this component to rerender because shallow comparison is used for some props).
export default memo(
    forwardRef((props, ref) => (
        <BaseOptionsList
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            innerRef={ref}
        />
    )),
    (prevProps, nextProps) =>
        nextProps.focusedIndex === prevProps.focusedIndex
);
