import puppeteer, { Browser, Page } from "puppeteer";
import { generateRandomEmail } from "./autoGenEmail";

describe("Registration Test", () => {
  let browser: Browser;
  let page: Page;

  // Mỗi test case sẽ mở lại trình duyệt mới
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    page = await browser.newPage();
  });

  // Đảm bảo đóng trình duyệt sau mỗi test case
  afterEach(async () => {
    await browser.close();
  });

  test("Đăng kí tài khoản với thông tin hợp lệ", async () => {
    await page.goto("http://localhost:5173/home");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Click on the account button
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate a random email and fill the form
    const randomEmail = generateRandomEmail();

    // Click on the "Register" link
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await page.waitForSelector("#username");
    await page.type("#username", "testuser");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await page.waitForSelector("#email");
    await page.type("#email", randomEmail);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await page.waitForSelector("#password");
    await page.type("#password", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await page.waitForSelector("#confirmPassword");
    await page.type("#confirmPassword", "123456");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Check for the success message
    const currentUrl = await page.url();
    expect(currentUrl).toContain("/home"); // Ensure that we are redirected to home

    const successMessage = await page.$("text=Đăng Ký Tài Khoản Thành Công!");
    expect(successMessage).toBeTruthy(); // Ensure success message appears
  }, 20000);
  
  test("Đăng kí tài khoản với email đã tồn tại", async () => {
    await page.goto("http://localhost:5173/home");
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    const existingEmail = "doxkien@gmail.com"; 
  
    await page.waitForSelector("#username");
    await page.type("#username", "existinguser");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.waitForSelector("#email");
    await page.type("#email", existingEmail);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.waitForSelector("#password");
    await page.type("#password", "20052003");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.waitForSelector("#confirmPassword");
    await page.type("#confirmPassword", "20052003");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const errorMessage = await page.$("text=Người dùng đã tồn tại"); 
    expect(errorMessage).toBeTruthy();
  }, 20000);

  test("Đăng kí tài khoản khi mật khẩu xác nhận không đúng", async () => {
    await page.goto("http://localhost:5173/home");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    await page.waitForSelector(".account");
    await page.click(".account");
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    await page.waitForSelector('a[href="/register"]');
    await page.click('a[href="/register"]');
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    const existingEmail = "doxkien3423424@gmail.com"; 
  
    await page.waitForSelector("#username");
    await page.type("#username", "existinguser");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.waitForSelector("#email");
    await page.type("#email", existingEmail);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.waitForSelector("#password");
    await page.type("#password", "20052003");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.waitForSelector("#confirmPassword");
    await page.type("#confirmPassword", "2005200");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    await page.click('button[type="submit"]');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const errorMessage = await page.$("text=Mật Khẩu Không Khớp!"); 
    expect(errorMessage).toBeTruthy();
  }, 20000);
  
});
