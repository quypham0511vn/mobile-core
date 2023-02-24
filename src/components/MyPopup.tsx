import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import { COLORS, Styles } from '@/theme';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import { Touchable } from '.';
import { PopupActions } from './popup/types';
import { PopupPropsTypes } from '@/models/typesPopup';

export interface PopupVerifyRequestProps extends PopupPropsTypes {
    icon?: any;
    showBtn?: boolean;
}

const PopupVerifyRequest = forwardRef<PopupActions, PopupVerifyRequestProps>(
    ({ onClose, icon, content, onConfirm, title, showBtn = true }: PopupVerifyRequestProps, ref) => {
        const [visible, setVisible] = useState<boolean>(false);
        const show = useCallback(() => {
            setVisible(true);
        }, []);

        const hide = useCallback(() => {
            setVisible(false);
        }, []);

        useImperativeHandle(ref, () => ({
            show,
            hide
        }));

        return (
            <Modal
                isVisible={visible}
                animationIn="slideInUp"
                useNativeDriver={true}
                onBackdropPress={hide}
                avoidKeyboard={true}
                hideModalContentWhileAnimating
            >
               
            </Modal>
        );
    }
);

export default PopupVerifyRequest;

const styles = StyleSheet.create({
    popup: {
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.TRANSPARENT,
        borderRadius: 6,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    ic: {
        marginTop: 10,
        marginBottom: -10,
        width: Configs.IconSize.size39,
        height: Configs.IconSize.size39
    },
    txtTitle: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size16,
        marginVertical: 20,
        marginHorizontal: 10,
        textAlign: 'center'
    },
    btn: {
        width: '50%',
        marginTop: 10
    },
    txtContent: {
        ...Styles.typography.regular,
        textAlign: 'center'
    },
    wrapButton: {
        flexDirection: 'row',
        width: SCREEN_WIDTH - 90,
        marginTop: 30
        // backgroundColor:COLORS.RED
    },
    cancelButton: {
        width: (SCREEN_WIDTH - 90) / 2,
        backgroundColor: COLORS.GRAY,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    confirmButton: {
        width: (SCREEN_WIDTH - 110) / 2,
        backgroundColor: COLORS.GREEN,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginLeft: 15
    },
    txtVerify: {
        color: COLORS.WHITE,
        fontSize: Configs.FontSize.size14
    },
    txtCancel: {
        color: COLORS.BLACK,
        fontSize: Configs.FontSize.size14
    }
});
