/* eslint-disable no-console */
/* eslint-disable no-debugger */
import React, {Component} from 'react';
import { View} from 'react-native';
import _ from 'underscore';
import ArrowKeyFocusManager from '@components/ArrowKeyFocusManager';
import OptionsList from '@components/OptionsList';
import withLocalize, {withLocalizePropTypes} from '@components/withLocalize';
import withNavigationFocus from '@components/withNavigationFocus';
import compose from '@libs/compose';
import {defaultProps as optionsSelectorDefaultProps, propTypes as optionsSelectorPropTypes} from './optionsSelectorPropTypes';

const propTypes = {

    ...optionsSelectorPropTypes,
    ...withLocalizePropTypes,
};

const defaultProps = {
    ...optionsSelectorDefaultProps,
};

class BaseOptionsSelector extends Component {
    constructor(props) {
        super(props);

        this.updateFocusedIndex = this.updateFocusedIndex.bind(this);

        const allOptions = this.flattenSections();
        const focusedIndex = this.getInitiallyFocusedIndex(allOptions);

        this.state = {
            allOptions,
            focusedIndex,
        };
    }

    componentDidUpdate(prevProps) {
        
        if (_.isEqual(this.props.sections, prevProps.sections)) {
            return;
        }

        const newOptions = this.flattenSections();

        if (prevProps.preferredLocale !== this.props.preferredLocale) {
            this.setState({
                allOptions: newOptions,
            });
            return;
        }
        const newFocusedIndex = this.props.selectedOptions.length;

        // eslint-disable-next-line react/no-did-update-set-state
        this.setState(
            {
                allOptions: newOptions,
                focusedIndex: _.isNumber(this.props.focusedIndex) ? this.props.focusedIndex : newFocusedIndex,
            }
        );
        
    }

    /**
     * @param {Array<Object>} allOptions
     * @returns {Number}
     */
    getInitiallyFocusedIndex(allOptions) {
        let defaultIndex;
        if (this.props.shouldTextInputAppearBelowOptions) {
            defaultIndex = allOptions.length;
        } else if (this.props.focusedIndex >= 0) {
            defaultIndex = this.props.focusedIndex;
        } else {
            defaultIndex = this.props.selectedOptions.length;
        }
        if (_.isUndefined(this.props.initiallyFocusedOptionKey)) {
            return defaultIndex;
        }

        const indexOfInitiallyFocusedOption = _.findIndex(allOptions, (option) => option.keyForList === this.props.initiallyFocusedOptionKey);

        if (indexOfInitiallyFocusedOption >= 0) {
            return indexOfInitiallyFocusedOption;
        }

        return defaultIndex;
    }

    focus() {
        if (!this.textInput) {
            return;
        }

        this.textInput.focus();
    }

    /**
     * Flattens the sections into a single array of options.
     * Each object in this array is enhanced to have:
     *
     *   1. A `sectionIndex`, which represents the index of the section it came from
     *   2. An `index`, which represents the index of the option within the section it came from.
     *
     * @returns {Array<Object>}
     */
    flattenSections() {
        const allOptions = [];
        this.disabledOptionsIndexes = [];
        let index = 0;
        _.each(this.props.sections, (section, sectionIndex) => {
            _.each(section.data, (option, optionIndex) => {
                allOptions.push({
                    ...option,
                    sectionIndex,
                    index: optionIndex,
                });
                if (section.isDisabled || option.isDisabled) {
                    this.disabledOptionsIndexes.push(index);
                }
                index += 1;
            });
        });
        return allOptions;
    }

    /**
     * @param {Number} index
     */
    updateFocusedIndex(index) {
        this.setState({focusedIndex: index});
    }

    render() {
        const optionsList = (
            <OptionsList
                ref={(el) => (this.list = el)}
                sections={this.props.sections}                
                focusedIndex={this.state.focusedIndex}
            />
        );

        return (
            <ArrowKeyFocusManager
                disabledIndexes={this.disabledOptionsIndexes}
                focusedIndex={this.state.focusedIndex}
                maxIndex={this.state.allOptions.length - 1}
                onFocusedIndexChanged={this.props.disableArrowKeysActions ? () => {} : this.updateFocusedIndex}
                shouldResetIndexOnEndReached={false}
            >
                <View >
                    {optionsList}
                </View>
            </ArrowKeyFocusManager>
        );
    }
}

BaseOptionsSelector.defaultProps = defaultProps;
BaseOptionsSelector.propTypes = propTypes;

export default compose(withLocalize, withNavigationFocus)(BaseOptionsSelector);
