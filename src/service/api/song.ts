import Request, { IRequestConfig } from '.';

const BASEURL = '/song';

function getSongList<T>({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }, extraConfig?: IRequestConfig) {
    return Request<T>({ url: `${BASEURL}/list`, method: 'get', params: { pageIndex, pageSize } }, extraConfig);
}

export { getSongList };
