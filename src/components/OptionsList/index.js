/* eslint-disable no-debugger */
import React, {forwardRef} from 'react';
import _ from 'underscore';
import withWindowDimensions from '@components/withWindowDimensions';
import BaseOptionsList from './BaseOptionsList';
import {defaultProps, propTypes} from './optionsListPropTypes';

function OptionsList(props) {

    return (
        <BaseOptionsList
            // eslint-disable-next-line react/jsx-props-no-spreading
            {..._.omit(props, 'forwardedRef')}
            ref={props.forwardedRef}
            
        />
    );
}

OptionsList.displayName = 'OptionsList';
OptionsList.propTypes = propTypes;
OptionsList.defaultProps = defaultProps;

const OptionsListWithRef = forwardRef((props, ref) => (
    <OptionsList
        forwardedRef={ref}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
    />
));

OptionsListWithRef.displayName = 'OptionsListWithRef';

export default withWindowDimensions(OptionsListWithRef);
