"use client";
import { useSearchParams } from "next/navigation";
import Button from "@/src/components/Common/Button";
import useSignUpStore from "@/src/store/useSignUpStore";
import useKakaoStore from "@/src/store/useKakaoStore";
import SignUpProfile from "./SignUpProfile";
import AuthHeader from "../Common/Header/Auth";
import { getKaKaoToken, postKakaoToken } from "@/src/services/kakao";

function SignUpTerms() {
  const isChecked = useSignUpStore((state) => state.isChecked);
  const setIsChecked = useSignUpStore((state) => state.setIsChecked);
  const nextComponent = useSignUpStore((state) => state.nextComponent);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  const params = useSearchParams();
  const code = params.get("code");

  const onChangeHandler = () => {
    setIsChecked(!isChecked);
  };

  // 카카오 로그인 로직은 추후 삭제 예정
  const onClickHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isChecked && code) {
      const { data } = await getKaKaoToken(code);
      await postKakaoToken(data.access_token)
        .then((res) => {
          setNextComponent("SignUpProfile");
          console.log("서버에 토큰 전송 성공", res);
        })
        .catch((err) => console.log("서버 토큰 전송 실패", err));
    } else if (isChecked && !code) {
      setNextComponent("SignUpProfile");
    }
  };

  if (nextComponent === "SignUpProfile") {
    return <SignUpProfile />;
  }

  return (
    <section className="auth">
      <AuthHeader back="preComponent" />
      <div className="mb-10">
        <div className="title">
          <h2>이용약관동의</h2>
        </div>
        <p>
          Foodie-Log는 회원님의 개인정보를 안전하게 보호합니다. <br />새 계정을 만들려면 이용약관에 동의하세요.
        </p>
        <div className="flex items-center gap-x-3">
          <label htmlFor="agree">이용약관(필수)</label>
          <input className="checkbox" id="agree" type="checkbox" checked={isChecked} onChange={onChangeHandler} />
        </div>
        <p>더 알아보기</p>
      </div>
      <Button type="button" variant={"primary"} onClick={onClickHandler}>
        다음
      </Button>
    </section>
  );
}

export default SignUpTerms;
