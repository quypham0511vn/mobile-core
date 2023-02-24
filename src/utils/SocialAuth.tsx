import appleAuth from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import {
    AccessToken, LoginManager,
    Profile
} from 'react-native-fbsdk-next';

import { configGoogleSignIn } from '@/commons/constants';



GoogleSignin.configure(configGoogleSignIn);

export const loginWithApple = async () => {
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
        });

        console.log('appleAuthRequestResponse', appleAuthRequestResponse);

        const data = appleAuthRequestResponse;
        if (data?.identityToken) {
            return data;
        }
        return null;
    } catch (error: any) {
        if (error?.code === appleAuth.Error.CANCELED) {
            console.warn('User canceled Apple Sign in.');
        } else {
            console.error(error);
        }
        return null;
    }
};
export const loginWithGoogle = async () => {
    try {
        const { idToken } = await GoogleSignin.signIn();
        if (idToken) {
            const userInfo = await GoogleSignin.signInSilently();
            if (userInfo) GoogleSignin.signOut();
            return userInfo;
        }
        return null;
    } catch (err) {
        console.log('getAccessTokenGoogle error', err);

        return null;
    }
};

export const loginWithFacebook = async () => {
    try {
        const result = await LoginManager.logInWithPermissions(
            ['public_profile', 'email'],
            'limited',
            'my_nonce'
        );
        if (!result.isCancelled) {
            let data;
            if (Platform.OS === 'android') {
                data = await AccessToken.getCurrentAccessToken();
            }
            else {
                data = await Profile.getCurrentProfile();
            }
            if (data) LoginManager.logOut();
            return data;
        }
    } catch (error) {
        return null;
    }
};
