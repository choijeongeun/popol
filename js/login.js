document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const userId = document.getElementById("userId");
  const userPw = document.getElementById("userPw");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // 폼 기본 제출 막기

    const id = userId.value.trim();
    const pw = userPw.value.trim();

    // 1. 아이디 미입력
    if (id === "") {
      alert("아이디 입력하시기 바랍니다.");
      userId.focus();
      return;
    }

    // 2. 비밀번호 미입력
    if (pw === "") {
      alert("비밀번호 입력하시기 바랍니다.");
      userPw.focus();
      return;
    }

    // 3. 아이디 또는 비밀번호 틀림
    if (id !== "user" || pw !== "1234") {
      alert(
        "입력하신 아이디 또는 비밀번호가 회원정보와 일치하지 않습니다.\nid=user, pw=1234 입력하세요."
      );

      // 🔹 입력값 초기화
      userId.value = "";
      userPw.value = "";

      // 🔹 커서 다시 아이디 입력창에 위치
      userId.focus();
      return;
    }

    // 4. 로그인 성공
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userName", "최정은님");
    window.location.href = "index.html";
  });
});
