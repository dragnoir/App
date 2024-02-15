/* eslint-disable no-console */
import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import type {Emoji} from '@assets/emojis/types';
import AddReactionBubble from '@components/Reactions/AddReactionBubble';
import EmojiReactionBubble from '@components/Reactions/EmojiReactionBubble';
import Tooltip from '@components/Tooltip';
import useThemeStyles from '@hooks/useThemeStyles';
import * as EmojiUtils from '@libs/EmojiUtils';
import * as Session from '@userActions/Session';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {BaseQuickEmojiReactionsOnyxProps, BaseQuickEmojiReactionsProps} from './types';

function BaseQuickEmojiReactions({
    reportAction,
    onEmojiSelected,
    preferredLocale = CONST.LOCALES.DEFAULT,
    preferredSkinTone = CONST.EMOJI_DEFAULT_SKIN_TONE,
    emojiReactions = {},
    onPressOpenPicker = () => {},
    onWillShowPicker = () => {},
}: BaseQuickEmojiReactionsProps) {
    const styles = useThemeStyles();

    const firstEmojiRef = useRef<View | null>(null);

    useEffect(() => {
        // Set focus to the first emoji element
        if (!firstEmojiRef.current) {
            return;
        }
        console.log('firstEmojiRef.current', firstEmojiRef.current);
        const buttonElement = firstEmojiRef.current.querySelector('button');
        console.log('firstEmojiRef.current buttonElement', buttonElement);
        if (buttonElement) {
            buttonElement.focus();
        }
    }, []);

    return (
        <View style={styles.quickReactionsContainer}>
            {CONST.QUICK_REACTIONS.map((emoji: Emoji, index: number) => (
                <Tooltip
                    text={`:${EmojiUtils.getLocalizedEmojiName(emoji.name, preferredLocale)}:`}
                    key={emoji.name}
                >
                    <View ref={index === 0 ? firstEmojiRef : null}>
                        <EmojiReactionBubble
                            emojiCodes={[EmojiUtils.getPreferredEmojiCode(emoji, preferredSkinTone)]}
                            isContextMenu
                            onPress={Session.checkIfActionIsAllowed(() => onEmojiSelected(emoji, emojiReactions))}
                        />
                    </View>
                </Tooltip>
            ))}
            <AddReactionBubble
                isContextMenu
                onPressOpenPicker={onPressOpenPicker}
                onWillShowPicker={onWillShowPicker}
                onSelectEmoji={(emoji) => onEmojiSelected(emoji, emojiReactions)}
                reportAction={reportAction}
            />
        </View>
    );
}

BaseQuickEmojiReactions.displayName = 'BaseQuickEmojiReactions';

export default withOnyx<BaseQuickEmojiReactionsProps, BaseQuickEmojiReactionsOnyxProps>({
    preferredSkinTone: {
        key: ONYXKEYS.PREFERRED_EMOJI_SKIN_TONE,
    },
    emojiReactions: {
        key: ({reportActionID}) => `${ONYXKEYS.COLLECTION.REPORT_ACTIONS_REACTIONS}${reportActionID}`,
    },
    preferredLocale: {
        key: ONYXKEYS.NVP_PREFERRED_LOCALE,
    },
})(BaseQuickEmojiReactions);
