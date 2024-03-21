/* eslint-disable no-console */
import Onyx from 'react-native-onyx';
import type {OnyxCollection, OnyxEntry} from 'react-native-onyx';
import ONYXKEYS from '@src/ONYXKEYS';
import type {Report} from '@src/types/onyx';
import type {EmptyObject} from '@src/types/utils/EmptyObject';

let allReports: OnyxCollection<Report>;
Onyx.connect({
    key: ONYXKEYS.COLLECTION.REPORT,
    waitForCollectionCallback: true,
    callback: (value) => (allReports = value),
});

/**
 * Get the option for a given report.
 */
function getReportOption(reportID: string): OnyxEntry<Report> | EmptyObject {
    return allReports?.[`${ONYXKEYS.COLLECTION.REPORT}${reportID}`] ?? {};
}

function blabla() {
    console.log('allReports: ', allReports);
}

export {blabla, getReportOption};
