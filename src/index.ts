import * as puppeteer from 'puppeteer';

export const scrapeImages = async (address: string): Promise<string[]> => {
  if (address.indexOf('http') !== 0) address = 'http://' + address;
  if (!checkValidUrl(address)) return [];
  // the rest of the code must be enclosed in an `async` function to be able to `await` for results
  const browser = await puppeteer.launch(); // launches an "invisible" chromium browser
  const page = await browser.newPage(); // takes the browser to a new tab (page)
  await page.goto(address); // takes the page to a specific url

  // Get the "viewport" of the page,
  // as reported by the page.
  // NOTE: Anything inside of the `evaluate` function is DOM manipulation.
  // No variables outside of the evaluate function can go in, and none can come out without being returned inside of the return object.
  const images = await page.evaluate(() => {
    const sources: string[] = []; // an array of images src
    document.querySelectorAll('img').forEach((img) => {
      if (img.src) {
        sources.push(img.src);
      }
    });

    return {
      sources,
    };
  });

  // remember to close the broser (invisible chromium)
  await browser.close();
  return images.sources;
};

const checkValidUrl = (str: string): boolean => {
  const urlRegex =
    '^(?:(?:http|https)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  const url = new RegExp(urlRegex, 'i');
  return str !== undefined && str.length < 2083 && url.test(str);
};
