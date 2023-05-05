import _ from 'underscore';
import React, {useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import Animated, {useSharedValue, useAnimatedProps, interpolateColor, withTiming, useAnimatedReaction} from 'react-native-reanimated';
import Lottie from 'lottie-react-native';
import {
    propTypes as headerWithCloseButtonPropTypes,
    defaultProps as headerWithCloseButtonDefaultProps,
} from './HeaderWithCloseButton/headerWithCloseButtonPropTypes';
import HeaderWithCloseButton from './HeaderWithCloseButton';
import ScreenWrapper from './ScreenWrapper';
import styles from '../styles/styles';
import * as StyleUtils from '../styles/StyleUtils';
import FixedFooter from './FixedFooter';
import StatusBar from '../libs/StatusBar';

const propTypes = {
    ...headerWithCloseButtonPropTypes,

    /** The background color to apply in the upper half of the screen. */
    backgroundColor: PropTypes.string.isRequired,

    /** The illustration to display in the header. Can be either an SVG component or a JSON object representing a Lottie animation. */
    illustration: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    /** Content to render in a fixed footer. */
    footer: PropTypes.element,
};

const defaultProps = {
    ...headerWithCloseButtonDefaultProps,
    footer: null,
};

const IllustratedHeaderPageLayout = (props) => {
    // const initialStatusBarColor = useMemo(() => StatusBar.getBackgroundColor(), []);
    // const statusBarBackgroundColorAnimationProgress = useSharedValue(0);
    // useEffect(() => {
    //     statusBarBackgroundColorAnimationProgress.value = withTiming(1, {duration: 1000});
    //     return () => StatusBar.setBackgroundColor(initialStatusBarColor);
    // }, [props.backgroundColor]);
    //
    // useAnimatedProps(() => {
    //     const currentStatusBarBackgroundColor = interpolateColor(
    //         statusBarBackgroundColorAnimationProgress.value,
    //         [0, 1],
    //         [initialStatusBarColor, props.backgroundColor],
    //     );
    //     StatusBar.setBackgroundColor(currentStatusBarBackgroundColor);
    //     return {};
    // }, [props.backgroundColor]);

    const propsToPassToHeader = _.omit(props, ['illustration']);
    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}
            style={[StyleUtils.getBackgroundColorStyle(props.backgroundColor)]}
            shouldEnablePickerAvoiding={false}
        >
            {({safeAreaPaddingBottomStyle}) => (
                <>
                    <Animated.View style={styles.illustratedPageHeader}>
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <HeaderWithCloseButton {...propsToPassToHeader} />
                        <View
                            style={[styles.flex1, styles.alignItemsCenter, styles.justifyContentEnd]}
                        >
                            {_.isFunction(props.illustration)
                                ? props.illustration()
                                : <Lottie source={props.illustration} style={styles.w100} autoPlay loop />}
                        </View>
                    </Animated.View>
                    <View style={[styles.illustratedPageBody]}>
                        <ScrollView contentContainerStyle={styles.illustratedPageScrollView(safeAreaPaddingBottomStyle)}>
                            {props.children}
                        </ScrollView>
                        {props.footer && (
                            <FixedFooter style={[styles.flexGrow0]}>
                                {props.footer}
                            </FixedFooter>
                        )}
                    </View>
                </>
            )}
        </ScreenWrapper>
    );
};

IllustratedHeaderPageLayout.propTypes = propTypes;
IllustratedHeaderPageLayout.defaultProps = defaultProps;
IllustratedHeaderPageLayout.displayName = 'IllustratedHeaderPageLayout';

export default IllustratedHeaderPageLayout;
