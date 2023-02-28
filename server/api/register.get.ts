import * as crypto from "crypto";
import * as qrcode from "qrcode";
import {log} from "unenv/runtime/node/util";

export default defineEventHandler((event: any) => {

    let uuid = crypto.randomUUID();

    let code = qrcode.create("icode.sk/uuid/" + uuid);
    let size = code.modules.size;

    let arr = code.modules.data;

    let hexString = "";
    let number = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            number += arr[i*size+j] * Math.pow(2, 7 - j % 8);
            if (j % 8 == 7 || j == size-1) {
                let x = number < 16 ? "0" : "";
                x += number.toString(16);
                hexString += x;
                number = 0;
            }
        }
    }

    return { "uuid":  uuid, "qrCode": { "data": Object.values(arr), "size": size } };
})
