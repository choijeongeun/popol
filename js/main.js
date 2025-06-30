//login 됐을 경우

const isLoggedIn = sessionStorage.getItem("isLoggedIn");
const userName = sessionStorage.getItem("userName");
const signIn = document.querySelector(".signIn a");
const signUp = document.querySelector(".signUp a");
/*
  if (isLoggedIn === "true") {
    // 로그인 자리 → 이름 출력, 배경 제거
    signIn.textContent = userName || "로그인됨";
    signIn.style.background = "none";

    // 회원가입 자리 → 로그아웃 출력, 배경 이미지 추가
    signUp.textContent = "로그아웃";
    signUp.style.background = "url('images/ut_top_login.png') no-repeat 0 50%";
  }
*/
if (isLoggedIn === "true") {
  // 로그인 상태 UI 변경
  signIn.textContent = userName || "최정은님";
  signIn.style.background = "none";

  signUp.textContent = "로그아웃";
  signUp.style.background = "url('images/ut_top_login.png') no-repeat 0 50%";

  // 로그아웃 클릭 이벤트
  signUp.addEventListener("click", (e) => {
    e.preventDefault();

    // 세션 로그아웃 처리
    sessionStorage.clear();

    // UI 원래대로 복구
    signIn.textContent = "로그인";
    signIn.style.background = "url('images/ut_top_login.png') no-repeat 0 50%";

    signUp.textContent = "회원가입";
    signUp.style.background = "url('images/ut_top_entry.png') no-repeat 0 50%";
  });
}

//예약하기
// DOMContentLoaded로 DOM이 모두 로드된 후 실행

const selP = document.getElementById("selP");
const pBtn1 = document.getElementById("pBtn1");
const pBtn2 = document.getElementById("pBtn2");

pBtn1.addEventListener("click", function () {
  console.log("clicked");
  let current = parseInt(selP.textContent, 10);
  if (current > 1) {
    selP.textContent = current - 1;
  } else {
    alert(`인원은 최소 1명이 기준입니다.
        \n\n
* 모바일 이용시 일부 브라우저에서 차단 버튼이 나올 수 있습니다. 클릭하지 마세요`);
  }
});

pBtn2.addEventListener("click", function () {
  let current = parseInt(selP.textContent, 10);
  selP.textContent = current + 1;
});

//배너 슬라이드

const banner = document.querySelector(".banner");
const items = banner.querySelectorAll("li");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const toggleBtn = document.querySelector(".toggle");

let currentIndex = 0;
let isPlaying = true;
let interval;
const itemHeight = items[0].offsetHeight + 15; // li height + gap
const totalItems = items.length;

// 클론 추가 (자연스러운 무한 루프용)
const clone = items[0].cloneNode(true);
banner.appendChild(clone);

function moveTo(index) {
  banner.style.transition = "transform 0.5s ease-in-out";
  banner.style.transform = `translateY(-${index * itemHeight}px)`;
  currentIndex = index;

  // 마지막 복제 요소에 도달하면 원본으로 리셋
  if (index === totalItems) {
    setTimeout(() => {
      banner.style.transition = "none";
      banner.style.transform = "translateY(0)";
      currentIndex = 0;
    }, 500);
  }
}

function nextSlide() {
  moveTo(currentIndex + 1);
}

function prevSlide() {
  // 맨 처음에서 뒤로 가면 끝으로 이동
  if (currentIndex === 0) {
    banner.style.transition = "none";
    banner.style.transform = `translateY(-${totalItems * itemHeight}px)`;
    currentIndex = totalItems;
    setTimeout(() => {
      moveTo(currentIndex - 1);
    }, 20);
  } else {
    moveTo(currentIndex - 1);
  }
}

function startAutoSlide() {
  interval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
  clearInterval(interval);
}

// 초기 자동 슬라이드 시작
startAutoSlide();

// 버튼 이벤트 연결
nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  nextSlide();
});

prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  prevSlide();
});

toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  isPlaying = !isPlaying;

  if (isPlaying) {
    toggleBtn.style.backgroundImage = "url(../images/s_3_b_control_stop.png)";
    startAutoSlide();
  } else {
    toggleBtn.style.backgroundImage = "url(../images/s_3_b_control_play.png)";
    stopAutoSlide();
  }
});
