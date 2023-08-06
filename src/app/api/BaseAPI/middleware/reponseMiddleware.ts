import { AxiosResponse } from 'axios';

/** 응답(Response) 미들웨어 namespace */
namespace responseMiddleware {
  /** [권한 응답 미들웨어] response.data.code 가 -1 일 경우 로그인화면으로 리디렉션 */
  export const auth = (response: AxiosResponse) => {
    const SHOULD_REDIRECT_TO_LOGIN_CODE = -1;
    if (response.data.code === SHOULD_REDIRECT_TO_LOGIN_CODE) {
      window.location.href = '/login';
    }
  };
}

export default responseMiddleware;
