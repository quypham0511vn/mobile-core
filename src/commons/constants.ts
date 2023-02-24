
export const PHONE_PREFIX = '+84';

export const PHONE_REGEX = /^0+[3,5,7,8,9]{1}[0-9]{1}[1-9]{1}[0-9]{6}$/;
export const NUMBER_REGEX = /^[0-9]*$/;
export const EMAIL_REGEX = /^[\w+][\w\.\-]+@[\w\-]+(\.\w{2,10})+$/;
export const PASSWORD_REGEX = /^\w{6,20}$/;

export const SECONDS_IN_DAY = 864e5;
export const DELAY_CLICK = 3e2;
export const INDEX_ITEM = 4;

export enum StorageKeys {
    KEY_ACCESS_TOKEN = 'KEY_ACCESS_TOKEN',
    KEY_DEVICE_TOKEN = 'KEY_DEVICE_TOKEN',
    KEY_DEVICE_TOKEN_FIREBASE = 'KEY_DEVICE_TOKEN_FIREBASE',
    KEY_USER_INFO = 'KEY_USER_INFO',
    KEY_SKIP_ONBOARDING = 'KEY_SKIP_ONBOARDING',
    KEY_LAST_POSITION = 'KEY_LAST_POSITION',
    KEY_LAST_LOGIN_INFO = 'KEY_LAST_LOGIN_INFO',
    KEY_LATEST_NOTIFY_ID = 'KEY_LATEST_NOTIFY_ID',
    KEY_SAVED_API_VERSION = 'KEY_SAVED_API_VERSION',
    KEY_BIOMETRY_TYPE = 'KEY_BIOMETRY_TYPE',
    KEY_FAST_AUTHENTICATION = 'KEY_FAST_AUTHENTICATION',
    KEY_PASSCODE = 'KEY_PASSCODE',
    KEY_RATE = 'KEY_RATING',
    KEY_ENABLE_FAST_AUTHENTICATION = 'KEY_FAST_AUTHENTICATION',
    KEY_PIN = 'KEY_PIN',
    KEY_TEMP_DATA_FOR_PROPERTY_VALUATION = 'TEMP_DATA_FOR_PROPERTY_VALUATION',
    KEY_SAVE_LOGIN_PHONE = 'KEY_SAVE_LOGIN_PHONE',
}

export enum ENUM_BIOMETRIC_TYPE {
    TOUCH_ID = 'TouchID',
    FACE_ID = 'FaceID',
    KEY_PIN = 'KEY_PIN',
}
export enum ERROR_BIOMETRIC {
    // ios
    RCTTouchIDNotSupported = 'RCTTouchIDNotSupported',
    RCTTouchIDUnknownError = 'RCTTouchIDUnknownError',
    LAErrorTouchIDNotEnrolled = 'LAErrorTouchIDNotEnrolled',
    LAErrorTouchIDNotAvailable = 'LAErrorTouchIDNotAvailable',
    LAErrorTouchIDLockout = 'LAErrorTouchIDLockout',
    LAErrorAuthenticationFailed = 'LAErrorAuthenticationFailed',
    // android
    NOT_SUPPORTED = 'NOT_SUPPORTED',
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    NOT_ENROLLED = 'NOT_ENROLLED',
    FINGERPRINT_ERROR_LOCKOUT_PERMANENT = 'FINGERPRINT_ERROR_LOCKOUT_PERMANENT',
    ErrorFaceId = 'ErrorFaceId',
    FINGERPRINT_ERROR_LOCKOUT = 'FINGERPRINT_ERROR_LOCKOUT',
}


export enum Events {
    TOAST = 'TOAST',
    LOGOUT = 'LOGOUT',
    SWITCH_KEYBOARD = 'SWITCH_KEYBOARD',
}

