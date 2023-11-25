import postUserLogin from "../api/axios";
export async function getUser(email: string, password: string) {
  try {
    const response = await postUserLogin.post(
      "/rest/user/login",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      {
        auth: {
          username: email,
          password: password,
        },
      }
    );

    sessionStorage.setItem("token", response.data);
    location.replace("/");
  } catch (error) {
    console.error(error);
    alert("Wrong Valid email or password");
  }
}
