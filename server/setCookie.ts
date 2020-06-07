import Cookies from "cookies";

export function setCookie(
  accessToken: string,
  refreshToken: string,
  req: any,
  res: any
): void {
  const cookies = new Cookies(req, res);
  cookies.set("refresh-token", refreshToken, {
    httpOnly: true,
    path: "/",
  });
  cookies.set("access-token", accessToken, {
    httpOnly: true,
    path: "/",
  });
}

export function deleteCookie(req: any, res: any): void {
  const cookies = new Cookies(req, res);
  cookies.set("refresh-token", "", { httpOnly: true, path: "/" });
  cookies.set("access-token", "", { httpOnly: true, path: "/" });
}
