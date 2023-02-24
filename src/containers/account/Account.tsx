import { observer } from 'mobx-react';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useIsFocused } from '@react-navigation/native';

import FaceIdActive from '@/assets/images/ic_faceid_big.svg';
import { LINKS, STORE_APP_LINK } from '@/api/constants';
import Warning from '@/assets/images/ic_warning.svg';
import File from '@/assets/images/user/file.svg';
import Fingerprint from '@/assets/images/user/fingerprint.svg';
import Friends from '@/assets/images/user/friends.svg';
import Help from '@/assets/images/user/help.svg';
import Link from '@/assets/images/user/link.svg';
import LockUser from '@/assets/images/user/lock-user.svg';
import Logout from '@/assets/images/user/logout.svg';
import Question from '@/assets/images/user/question.svg';
import RightArrows from '@/assets/images/user/right-arrow.svg';
import User from '@/assets/images/user/user.svg';
import Woman from '@/assets/images/user/woman.svg';
import { BOTTOM_HEIGHT, Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import ScreenNames from '@/commons/ScreenNames';
import { HeaderBar } from '@/components';
import { MyTextInput } from '@/components/elements/textfield';
import { Touchable } from '@/components/elements/touchable/index';
import { MyImageView } from '@/components/image';
import PopupRate from '@/components/PopupRate';
import PopupVerifyRequest from '@/components/MyPopup';
import { useAppStore } from '@/hooks';
import SessionManager from '@/managers/SessionManager';
import { PopupActionTypes } from '@/models/typesPopup';
import { UserInfoModel } from '@/models/user-model';
import Navigator from '@/routers/Navigator';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils/DimensionUtils';
import ToastUtils from '@/utils/ToastUtils';
import Utils from '@/utils/Utils';
import { COLORS, IconSize, Styles } from '@/theme';
import AnalyticsUtils from '@/utils/AnalyticsUtils';
import { ENUM_BIOMETRIC_TYPE } from '@/commons/constants';

const Account = observer(() => {
    // const mounted = useRef<boolean>(false);
    const { apiServices, userManager, fastAuthInfoManager } = useAppStore();

    const [userInfo, setUserInfo] = useState<UserInfoModel | undefined>(
        userManager.userInfo
    );
    const [isRatingShowing, setRatingShow] = useState<boolean>(false);
    const [rate, setRate] = useState<any>(SessionManager.getRatingPoint());
    const [contentRate, setContentRate] = useState<string>('');
    const popupAlert = useRef<PopupActionTypes>(null);
    const popupRateRef = useRef<PopupActionTypes>(null);

    const isFocused = useIsFocused();
    useEffect(() => {
        AnalyticsUtils.trackEvent(ScreenNames.history);
    }, []);

    useEffect(() => {
        setUserInfo(userManager.userInfo);
        if (!userManager?.userInfo) {
            Navigator.navigateScreen(ScreenNames.auth);
        }
    }, [userManager?.userInfo, isFocused]);

    const renderItem = useCallback(
        (_title: string, _image: any, _onPress: any) => {
            return (
                <Touchable onPress={_onPress} style={styles.itemList}>
                    {_image}
                    <Text style={styles.txtItem}>{_title}</Text>
                    <RightArrows />
                </Touchable>
            );
        },
        []
    );

    const logOut = useCallback(() => {
        popupAlert.current?.show();
    }, []);

    const onLogOutSuccess = useCallback(() => {
        popupAlert.current?.hide?.();
        SessionManager.logout();
        userManager.updateUserInfo(null);
    }, [userManager]);

    const profileAuth = () => {
        Navigator.navigateScreen(ScreenNames.profile);
    };

    const changePassword = () => {
        Navigator.navigateScreen(ScreenNames.changePassword);
    };

    const navigateToAuth = () => {
        Navigator.navigateScreen(ScreenNames.SettingQuickAuth);
    };

    const referFriend = () => {
        Navigator.navigateScreen(ScreenNames.referFriend);
    };

    const onShowRatingPopup = useCallback(() => {
        if (SessionManager.getRatingPoint() < 4) {
            setRatingShow(true);
        }
    }, []);

    const renderInput = useCallback((_value: string, onChangeText: any) => {
        return (
            <>
                <MyTextInput
                    value={_value}
                    multiline={true}
                    containerInput={styles.input}
                    onChangeText={onChangeText}
                />
            </>
        );
    }, []);

    const onChangeText = useCallback((value: string) => {
        setContentRate(value);
    }, []);

    const renderStar = useCallback((defaultRating?: any) => {
        return (
            <View style={styles.wrapStar}>
                <AirbnbRating
                    count={5}
                    defaultRating={defaultRating || 0}
                    size={20}
                    showRating={false}
                    isDisabled={false}
                />
            </View>
        );
    }, []);

    const openLink = useCallback(() => {
        Utils.openURL(STORE_APP_LINK);
    }, []);

    const renderModal = useMemo(() => {
        const onSendRate = () => {
            apiServices.common.getRate(rate, contentRate);
            SessionManager.setRatingPoint(rate);
            setContentRate('');
            setRatingShow(false);

            if (rate >= 4) {
                openLink();
            } else {
                ToastUtils.showSuccessToast(Languages.feedback.sentSuccess);
            }
        };

        const onBackdropPress = () => {
            setContentRate('');
            setRate(SessionManager.getRatingPoint());
            setRatingShow(false);
        };

        return (
            <PopupRate
                ref={popupRateRef}
                onBackdropPress={onBackdropPress}
                isVisible={isRatingShowing}
                onSendRate={onSendRate}
                renderInput={renderInput(contentRate, onChangeText)}
                rate={rate}
                setRate={setRate}
            />
        );
    }, [
        apiServices.common,
        contentRate,
        isRatingShowing,
        onChangeText,
        openLink,
        rate,
        renderInput
    ]);

    const navigateAboutUs = () => {
        Navigator.pushScreen(ScreenNames.myWebview, {
            title_vi: Languages.itemInForAccount.introduction,
            content_vi: LINKS.ABOUT_US,
            uri: true
        });
    };

    const navigatePolicy = () => {
        Navigator.pushScreen(ScreenNames.myWebview, {
            title_vi: Languages.itemInForAccount.termSandCondition,
            content_vi: LINKS.POLICY,
            uri: true
        });
    };

    const navigateFaqs = () => {
        Navigator.pushScreen(ScreenNames.myWebview, {
            title_vi: Languages.itemInForAccount.support,
            content_vi: LINKS.FAQ,
            uri: true
        });
    };
    const navigateToLinkAccount = () => {
        Navigator.pushScreen(ScreenNames.linkAccountSocial);
    };

    const popupVerifyRequest = useMemo(() => {
        return (
            <PopupVerifyRequest
                icon={<Warning width={50} height={50} />}
                content={Languages.errorMsg.logoutMessage}
                onConfirm={onLogOutSuccess}
                ref={popupAlert}
            />
        );
    }, [onLogOutSuccess]);

    return (
        <View style={styles.container}>
            <HeaderBar title={Languages.tabs.account} exitApp />

            <View style={styles.inF}>
                <MyImageView style={styles.imageAvatar} imageUrl={userInfo?.avatar} />
                <View style={styles.textInfo}>
                    <Text style={styles.textName}>{userInfo?.full_name}</Text>
                    <Text style={styles.textPhone}>{userInfo?.phone_number}</Text>
                </View>
                <TouchableOpacity onPress={logOut}>
                    <Logout style={styles.logout} {...IconSize.size25_25} />
                </TouchableOpacity>
                {popupVerifyRequest}
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {renderItem(Languages.itemInForAccount.inFor, <User />, profileAuth)}
                {renderItem(
                    Languages.itemInForAccount.changePwd,
                    <LockUser />,
                    changePassword
                )}
                {renderItem(
                    Languages.itemInForAccount.authentication,
                    fastAuthInfoManager?.supportedBiometry===ENUM_BIOMETRIC_TYPE.TOUCH_ID? <Fingerprint />:<FaceIdActive width={20} height={20}/>,
                    navigateToAuth
                )}
                {renderItem(
                    Languages.itemInForAccount.reFerFriends,
                    <Friends />,
                    referFriend
                )}
                {renderItem(
                    Languages.itemInForAccount.afFiLiateAccount,
                    <Link />,
                    navigateToLinkAccount
                )}
                <View style={styles.step2}>
                    {renderItem(
                        Languages.itemInForAccount.introduction,
                        <Question />,
                        navigateAboutUs
                    )}
                    {renderItem(
                        Languages.itemInForAccount.termSandCondition,
                        <File />,
                        navigatePolicy
                    )}
                    {renderItem(
                        Languages.itemInForAccount.support,
                        <Help />,
                        navigateFaqs
                    )}
                </View>
                <Touchable
                    style={styles.fedBack}
                    onPress={onShowRatingPopup}
                    disabled={SessionManager.getRatingPoint() >= 4}
                >
                    <View style={styles.starLeft}>
                        <Text style={styles.textTitleFeed}>{Languages.feedback.title}</Text>
                        <Text style={styles.textTitleDescriptionFeed}>
                            {Languages.feedback.description}
                        </Text>
                        {renderStar(SessionManager.getRatingPoint())}
                    </View>
                    <Woman />
                </Touchable>
            </ScrollView>
            {renderModal}
        </View>
    );
});

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GRAY_10
    },
    scrollView: {
        paddingTop: 5,
        paddingBottom: BOTTOM_HEIGHT
    },
    inF: {
        padding: 15,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    textInfo: {
        flex: 1,
        marginLeft: 15
    },
    logout: {
        flex: 1
    },
    textName: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size16
    },
    textPhone: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size14,
        color: COLORS.BLACK
    },
    itemList: {
        backgroundColor: COLORS.WHITE,
        marginBottom: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: 20
    },
    itemTitle: {
        flex: 1,
        marginLeft: 10
    },
    step2: {
        marginTop: 15
    },
    fedBack: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: COLORS.WHITE,
        padding: 20,
        margin: 20,
        marginTop: 10,
        borderRadius: 20
    },
    starLeft: {
        flex: 2
    },
    textTitleFeed: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size16,
        marginBottom: 5
    },
    textTitleDescriptionFeed: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size12,
        color: COLORS.DARK_GRAY
    },
    txtItem: {
        ...Styles.typography.regular,
        flex: 1,
        marginLeft: 10
    },
    imageAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: COLORS.GRAY_5,
        borderWidth: 1
    },
    modalWrap: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: COLORS.WHITE,
        borderRadius: 10
    },
    wrapStar: {
        flexDirection: 'row',
        marginTop: 3,
        marginHorizontal: 4
    },
    titleRate: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size16,
        color: COLORS.DARK_GRAY
    },
    contentRateTitle: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size13,
        color: COLORS.DARK_GRAY
    },
    wrapContentRate: {
        width: '100%',
        height: SCREEN_HEIGHT / 7,
        justifyContent: 'space-between',
        marginBottom: 40
    },
    input: {
        borderColor: COLORS.GRAY_10,
        fontSize: Configs.FontSize.size14,
        borderRadius: 10,
        height: SCREEN_HEIGHT / 7,
        marginVertical: 5
    },
    rate: {
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20
    },
    containerRate: {
        flexDirection: 'column-reverse',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.8,
        marginTop: 7
    },
    reviewTitle: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size12,
        color: COLORS.DARK_GRAY
    }
});
