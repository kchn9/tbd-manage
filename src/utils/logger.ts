import npmlog from "npmlog";
import dayjs from "dayjs";

function generateTimestamp() {
    return dayjs().format();
}

function info(msg: string): void {
    return npmlog.info(generateTimestamp(), msg);
}

function http(msg: string): void {
    return npmlog.http(generateTimestamp(), msg);
}

function error(msg: string): void {
    return npmlog.error(generateTimestamp(), msg);
}

export { info, http, error };
