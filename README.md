# wanted-pre-onboarding-frontend

## 지원자

- 이름 : 전이진
- 이메일 : pongdang0121@gmail.com

---

## 배포링크

[✨ 배포링크](https://todo.pongdang.today/)

## 프로젝트의 실행 방법

https://todo.pongdang.today 로 접속하여 실행합니다.

혹은 아래 command를 이용하여 실행할 수 있습니다.

```
git clone git@github.com:pongdang/wanted-pre-onboarding-frontend.git

cd wanted-pre-onboarding-frontend

yarn install

yarn start

open http://localhost:3000
```

## 데모 영상

- 로그인 / 회원가입 유효성

  ![로그인-회원가입-유효성](https://user-images.githubusercontent.com/76990149/196020585-e21e581d-823d-4c1e-8643-17d5ec8741b5.gif)

- 회원가입 에러 처리

  ![회원가입-에러-처리](https://user-images.githubusercontent.com/76990149/196020619-e4788a77-dee3-4816-9b22-657c955a7ff5.gif)

- 로그인 상태일 때 `/`, `/signup` 페이지 접근 막기

  ![로그인-경로-막기](https://user-images.githubusercontent.com/76990149/196020672-45375344-5a28-44d9-a33c-7612bf81f16a.gif)

- 로그인하지 않고 `/todo` 페이지 접근 막기

  ![todo-경로-막기](https://user-images.githubusercontent.com/76990149/196020675-c716cb79-84ae-4851-90f5-2a6b7cb20e76.gif)

- 회원 가입 후 로그인 처리

  ![회원가입후로그인](https://user-images.githubusercontent.com/76990149/196020722-481c1a97-2973-47bd-a5f8-c01fbdf5fc61.gif)

- todo 등록 / 수정

  ![todo-등록-수정](https://user-images.githubusercontent.com/76990149/196020761-0dad5b57-93bd-4882-b135-b39e2bfbe13d.gif)

- todo 완료 처리 / 삭제

  ![todo-완료-삭제](https://user-images.githubusercontent.com/76990149/196020777-94912e90-0902-470b-aba5-1a1ab1376e0b.gif)

## 작업한 내용

### 1. Context API를 활용한 라우터 가드 처리

context API로 isLogin 이라는 상태를 만들어 유저의 로그인 상태를 전역에서 관리할 수 있었습니다. 이를 이용하여 로그인 상태에 따라 접근할 수 있는 라우터를 처리했습니다.

- 각 페이지마다 접근할 수 있는 유저의 타입들(member | guest)을 명시하여 isLogin 상태와 비교합니다.
- 로그인하지 않은 상태(isLogin === false)에서 member들만 접근할 수 있는 페이지(`/todo`)를 접근하려 한다면, react-router-dom 이 제공하는 `Navigate` 컴포넌트로 로그인 페이지(`/`) 로 리다이렉트 시켜줍니다.
- 로그인한 상태(isLogin === true)에서 guset들만 접근할 수 있는 페이지(`/`, `/signup`)을 접근하려 한자면, react-router-dom 이 제공하는 `Navigate` 컴포넌트로 투두 페이지(`/todo`) 로 리다이렉트 시켜줍니다.

### 2. Suspense 를 이용한 선언적인 컴포넌트 사용 (이를 위한 useFetch 구현)

Suspense는 error 타입이 promised 일때 fallback props로 넘겨준 엘리먼트를 화면에 렌더링합니다. 이러한 점을 이용하여 데이터에 요청을 보낼 때 promise 함수의 상태에 따라 일부러 에러를 발생시켜 fallback 엘리먼트가 보이도록 했습니다.

### 3. ErrorBoundary 를 이용한 선언적인 에러 처리 (event 에러를 잡기위한 useEventErrorHandle 구현)

ErrorBoundary 클래스 컴포넌트에서는 error가 발생했을 때 어떤 UI를 보여줄 것인지 설정할 수 있습니다. 그러나 이벤트 핸들러 안에서 발생한 error나 데이터를 불러오다가 생기는 에러는 ErrorBoundary에서 catch 하지 못합니다.
이벤트 핸들러와 데이터를 불러오다가 생기는 에러를 ErrorBoundary에서 catch 하도록 ErrorBoundary 클래스 컴포넌트를 수정하였습니다.
`unhandledrejection` 라는 이벤트를 이용해 이벤트 핸들러에서 발생한 error를 전파시켜 ErrorBoundary에서 error를 catch 하도록 했습니다.
이외에도 error가 발생했을 때 보여줄 UI가 있다면 `renderFallback` 이라는 props에 컴포넌트를 반환하는 함수를 넘겨주면 됩니다.
