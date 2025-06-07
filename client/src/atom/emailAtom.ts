import {atom} from 'recoil';

export const forgotPasswordEmailState = atom({
    key: 'forgotPasswordEmailState',
    default: '',
});

export const VerifyEmailState = atom({
    key: 'VerifyEmailState',
    default: '',
});