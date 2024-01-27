# modern-todo
---

## 배포링크

[✨ 배포링크](https://todo.pongdang.today/)

아이디 : pongdang1234@test.com

비밀번호 : pongdang1234@test.com

## 프로젝트의 실행 방법

```
git clone git@github.com:pongdang/modern-todo.git

cd modern-todo

yarn install

yarn start

open http://localhost:3000
```

## 데모 영상

|                                                               데모                                                               |                                                                 영상                                                                  |
| :------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
|                                                     로그인 / 회원가입 유효성                                                     |                                                        회원가입 후 로그인 처리                                                        |
|       ![유효성](https://user-images.githubusercontent.com/76990149/196036958-95761f02-7880-46c9-be2d-ff48c3f87d87.gif)       | ![회원가입후로그인](https://user-images.githubusercontent.com/76990149/196036973-52d6fb57-3049-4dc3-82f5-ffc7821ad211.gif) |
|                                         로그인 상태일 때 `/`, `/signup` 페이지 접근 막기                                         |                                            로그인 상태가 아닐 때 `/todo` 페이지 접근 막기                                             |
| ![리다이렉트(todo)](https://user-images.githubusercontent.com/76990149/196037056-c7d9f1cd-e7e4-4a74-936e-f0874c897662.gif) |   ![리다이렉트(login)](https://user-images.githubusercontent.com/76990149/196037060-7feb274f-27b4-469e-848b-d5f7d84274c0.gif)   |
|                                                         todo 등록 / 수정                                                         |                                                         todo 삭제 / 완료처리                                                          |
|  ![todo등록:수정](https://user-images.githubusercontent.com/76990149/196037226-fc72de75-ccd1-4fee-82e2-cc87d8795f66.gif)  |     ![todo삭제:완료](https://user-images.githubusercontent.com/76990149/196037232-fad3976b-5edc-4976-8715-04959a1da7c2.gif)     |

|                                             todo 등록, 수정, 완료, 삭제                                              |
| :------------------------------------------------------------------------------------------------------------------: |
| ![마지막](https://user-images.githubusercontent.com/76990149/196037414-db280536-c120-47b8-8b1a-ad3b27af6dad.gif) |

## 작업한 내용

### 1. Context API를 활용한 라우터 가드 처리 (with HoC)

**Context API**로 유저의 로그인 상태를 전역에서 관리할 수 있도록 하였고 상태에 따라 접근할 수 있는 라우터를 처리했습니다.

- [HoC로 작성된 함수](https://github.com/pongdang/modern-todo/blob/main/src/Router.tsx#L28-L42)에서 접근 대상에 따른 페이지의 타입(`member | guest`)을 명시하여 isLogin 상태와 비교합니다.
- 로그인하지 않은 상태(`isLogin === false`)에서 member들만 접근할 수 있는 페이지(`/todo`)를 접근하려 한다면 로그인 페이지(`/`) 로 리다이렉트 시켜줍니다.
- 로그인한 상태(`isLogin === true`)에서 guest들만 접근할 수 있는 페이지(`/`, `/signup`)을 접근하려 한자면 투두 페이지(`/todo`) 로 리다이렉트 시켜줍니다.

### 2. Suspense 를 이용한 선언적인 비동기 함수 처리의 로딩처리

**Suspense**를 활용하면 비동기 함수 호출의 상태에 따라 UI 를 선언적으로 보여줄 수 있습니다.

- [Suspense의 원리](https://dev.to/charlesstover/react-suspense-with-the-fetch-api-374j)에 대해 찾아보고, 이를 참고하여 라이브러리(react-query, Relay) 없이 사용할 수 있도록 필요한 부분만 [useFetch](https://github.com/pongdang/modern-todo/blob/main/src/hooks/useFetch.tsx#L11-L46)로 재구현하였습니다.
- 로딩 중일 때는 Promise를 throw 하여 Suspense 에서 fallback 엘리먼트를 렌더링하도록 합니다.
- useFetch 에서 invalidate 함수를 얻어서 특정 쿼리(fetchTodoList)를 다시 refetch 할 수 있습니다.

### 3. ErrorBoundary 를 이용한 선언적인 에러 처리 (event 에러를 잡기위한 EventErrorHandle 구현)

**ErrorBoundary**는 error가 발생했을 때 어떤 UI를 보여줄 것인지 설정할 수 있습니다.

- 그러나 이벤트 핸들러(onClick, onChange 등등)에서 발생한 error는 일반적으로 ErrorBoundary에서 catch 하지 못합니다.
- 이벤트 핸들러에서 발생한 에러를 ErrorBoundary에서 catch 하도록 ErrorBoundary 클래스 컴포넌트를 개선하였습니다.
- `unhandledrejection`/`error` 라는 이벤트를 이용해 이벤트 핸들러에서 발생한 error를 전파시켜 ErrorBoundary에서 `renderFallback` 을 이용해 UI 를 보여줄 수 있습니다.


[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fpongdang%2Fmodern-todo&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
