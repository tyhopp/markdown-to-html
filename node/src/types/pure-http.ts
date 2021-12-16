import { IRequestHttp, IRequestHttp2, IResponseHttp, IResponseHttp2 } from 'pure-http';

export type PureHttpRequest = IRequestHttp | IRequestHttp2;

export type PureHttpResponse = IResponseHttp | IResponseHttp2;
