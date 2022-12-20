import { db } from './database.js';

export function numberFormate(mobileNumber) {
    if (mobileNumber.length == 10) {
        return "+91 " + mobileNumber;
    } else {
        return mobileNumber;
    }
}