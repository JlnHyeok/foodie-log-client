"use client";
import React from "react";
import Image from "next/image";
import Button from "@/src/components/Button";
import kakao from "@/public/images/kakao_login_medium_wide.png";

function SignUpForm() {
  const handleClick = () => {
    console.log("handleClick");
  };
  return (
    <section className="flex flex-col items-center justify-center p-10 h-4/5 sm:w-[600px] sm:border border-gray-300">
      <div className="title">
        <h2>Foodie-Log</h2>
        <p>맛집 정보를 이용하려면 가입하세요.</p>
      </div>
      <form className="w-full flex flex-col  gap-4 mt-10">
        <input className="input" type="text" placeholder="이메일" />
        <input className="input" placeholder="비밀번호" />
        <input className="input" placeholder="비밀번호 확인" />
        <Button label={"회원가입"} onClick={(e) => console.log(e)} />
      </form>
      <div className="w-full flex items-center justify-center my-10 space-x-2">
        <div className="h-[0.8px] w-full bg-slate-400" />
        <span className="w-10 flex-shrink-0 font-semibold text-gray-600 text-center text-sm">또는</span>
        <div className="h-[0.8px] w-full bg-slate-400" />
      </div>
      <button type="button" className="">
        <Image src={kakao} alt="카카오 로그인 버튼" />
      </button>
    </section>
  );
}

export default SignUpForm;
