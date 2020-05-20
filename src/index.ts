import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as streamToString from 'stream-to-string';

export const scrapeImages = async (url: string): Promise<string[]> => {
  if (url.indexOf('http') !== 0) url = 'http://' + url;
  if (!checkValidUrl(url)) return [];

  try {
    const { body } = await fetch(url);
    const data = await streamToString(body);
    const $ = cheerio.load(data);

    const imagesElements = $('img');
    const images: string[] = [];
    if (imagesElements && imagesElements.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < imagesElements.length; i++) {
        const imgSrc = $(imagesElements[i]).attr('src');
        if (imgSrc && checkValidUrl(imgSrc)) images.push(imgSrc);
      }
    }

    return images;
  } catch (e) {
    throw e;
  }
};

const checkValidUrl = (str: string): boolean => {
  const urlRegex =
    '^(?:(?:http|https)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  const url = new RegExp(urlRegex, 'i');
  return str !== undefined && str.length < 2083 && url.test(str);
};
