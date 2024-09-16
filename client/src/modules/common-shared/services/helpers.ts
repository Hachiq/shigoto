export class Helpers {
  static async wait(timeout = 1000) {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  }

  static async until(condition: any, callback: any) {
    return new Promise<void>(async (resolve, reject) => {
      while (true) {
        await Helpers.wait(200);
        if (condition() === true) {
          await callback();
          resolve();
          return;
        }
      }
    });
  }

  static decodeJwt(token: string) {
    if (!token) {
      return null;
    }

    const stringSplit = token.split('.');

    const tokenObject: any = {};
    tokenObject.raw = tokenObject;
    tokenObject.header = JSON.parse(window.atob(stringSplit[0]));
    tokenObject.payload = JSON.parse(window.atob(stringSplit[1]));
    return tokenObject;
  }
}