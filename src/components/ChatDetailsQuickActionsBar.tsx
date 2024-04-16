import React, {useState} from 'react';
import {View} from 'react-native';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as Report from '@userActions/Report';
import type {Report as OnyxReportType} from '@src/types/onyx';
import Button from './Button';
import ConfirmModal from './ConfirmModal';
import * as Expensicons from './Icon/Expensicons';

type ChatDetailsQuickActionsBarProps = {
    report: OnyxReportType;
};

function ChatDetailsQuickActionsBar({report}: ChatDetailsQuickActionsBarProps) {
    const styles = useThemeStyles();
    const [isLastMemberLeavingGroupModalVisible, setIsLastMemberLeavingGroupModalVisible] = useState(false);
    const {translate} = useLocalize();
    const isPinned = !!report.isPinned;
    return (
        <View style={[styles.flexRow, styles.ph5, styles.mb5]}>
            <View style={[styles.flex1]}>
                <Button
                    onPress={() => Report.togglePinnedState(report.reportID, isPinned)}
                    icon={Expensicons.Pin}
                    style={styles.flex1}
                    text={isPinned ? translate('common.unPin') : translate('common.pin')}
                />
            </View>

            <View style={[styles.flex1, styles.pl3]}>
                <Button
                    onPress={() => {
                        // Navigation.navigate(ROUTES.REPORT_WITH_ID_DETAILS_SHARE_CODE.getRoute(report?.reportID ?? ''));
                    }}
                    icon={Expensicons.QrCode}
                    style={styles.flex1}
                    text={translate('common.share')}
                />
            </View>
        </View>
    );
}

ChatDetailsQuickActionsBar.displayName = 'ChatDetailsQuickActionsBar';

export default ChatDetailsQuickActionsBar;
