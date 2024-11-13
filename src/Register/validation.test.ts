import puppeteer, { Browser, Page } from "puppeteer";
import { generateRandomEmail } from "./autoGenEmail";

function generateRandomString(length: number = 4): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
  }
  return result;
}

function generateSpecialCharactersString(length: number): string {
  const specialCharacters = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/~`";
  let result = "";

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * specialCharacters.length);
      result += specialCharacters[randomIndex];
  }

  return result;
}

function generateRandomUsername(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

describe("Registration Test", () => {
  let browser: Browser;
  let page: Page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    page = await browser.newPage();
  });

  afterEach(async () => {
    await browser.close();
  });

  test('Đăng kí tài khoản với email tên miền không hợp lệ', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const random = generateRandomString()
    await page.type("#username", "clouid");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#email", `Cloumail123${random}@sdghnhnhghgsd`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#password", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#confirmPassword", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const errorMessage = await page.$eval("#email:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

  test('Đăng kí tài khoản với email thiếu @', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.type("#username", "admin123");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#email", "admin123");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#password", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#confirmPassword", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 500));
    const errorMessage = await page.$eval("#email:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

  test('Đăng kí tài khoản với email chứa khoảng trắng', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.type("#username", "admin");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#email", "ad min@gmail.com");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#password", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#confirmPassword", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 500));
    const errorMessage = await page.$eval("#email:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

  test('Đăng kí tài khoản với email chứa kí tự có dấu', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.type("#username", "admin");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#email", "ádmin@gmail.com");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#password", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#confirmPassword", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const errorMessage = await page.$eval("#email:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

  test('Đăng kí tài khoản với email chứa kí tự đặc biệt', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const random = generateRandomString();
  
    await page.type("#username", "admin");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#email", `a#%11${random}dmin@gmail.com`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#password", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#confirmPassword", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const errorMessage = await page.$eval("#email:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

  test('Tên người dùng chứa kí tự đặc biệt', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const random = generateRandomEmail();
    const specialString = generateSpecialCharactersString(10);
  
    await page.type("#username", specialString);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#email", random);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#password", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#confirmPassword", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const errorMessage = await page.$eval("#username:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

  test('Tên người dùng chứa kí tự số', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const random = generateRandomEmail();
    const randomString = generateRandomString(10);
  
    await page.type("#username", randomString + "123");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#email", random);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#password", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#confirmPassword", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const errorMessage = await page.$eval("#username:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

  test('Đăng kí tài khoản với mật khẩu dưới 6 kí tự', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const email = generateRandomEmail();
    const username = generateRandomUsername(10)
    const password = generateRandomUsername(4)
  
    await page.type("#username", username);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#email", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#password", password);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#confirmPassword", password);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const errorMessage = await page.$eval("#password:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

  test('Bỏ trống email', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const username = generateRandomUsername(10)
    const password = generateRandomUsername(8)
  
    await page.type("#username", username);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#password", password);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#confirmPassword", password);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const errorMessage = await page.$eval("#email:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

  test('Bỏ trống mật khẩu', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const email = generateRandomEmail();
    const username = generateRandomUsername(10)
    const password = generateRandomUsername(8)
  
    await page.type("#username", username);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#email", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#confirmPassword", password);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const errorMessage = await page.$eval("#password:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

  test('Bỏ trống tên người dùng', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const email = generateRandomEmail();
    const password = generateRandomUsername(8)
  
    await page.type("#email", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#password", password);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#confirmPassword", password);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const errorMessage = await page.$eval("#username:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

  test('Bỏ trống xác nhận mật khẩu', async () => {
    await page.goto("http://localhost:5173/home");
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const email = generateRandomEmail();
    const username = generateRandomUsername(10)
    const password = generateRandomUsername(8)
  
    await page.type("#username", username);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#email", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#password", password);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const errorMessage = await page.$eval("#confirmPassword:invalid", (el) => el !== null);
    expect(errorMessage).toBe(true);
  }, 20000);

});
