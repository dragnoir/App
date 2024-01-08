import React from 'react';
import {View} from 'react-native';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';
import Text from './Text';

type UnreadActionIndicatorProps = {
    reportActionID: string;
    shouldHideThreadDividerLine?: boolean;
};

function UnreadActionIndicator({reportActionID, shouldHideThreadDividerLine}: UnreadActionIndicatorProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    return (
        <View
            accessibilityLabel={translate('accessibilityHints.newMessageLineIndicator')}
            data-action-id={reportActionID}
            style={[shouldHideThreadDividerLine ? styles.unreadIndicatorContainerFirst : styles.unreadIndicatorContainer, styles.userSelectNone, styles.pointerEventsNone]}
            dataSet={{[CONST.SELECTION_SCRAPER_HIDDEN_ELEMENT]: true}}
        >
            <View style={styles.unreadIndicatorLine} />
            <Text style={styles.unreadIndicatorText}>{translate('common.new')}</Text>
        </View>
    );
}

UnreadActionIndicator.displayName = 'UnreadActionIndicator';

export default UnreadActionIndicator;
