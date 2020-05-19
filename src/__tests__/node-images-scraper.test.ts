import { scrapeImages } from '../index';

test('scrapeImages_validUrl_Http_OK', async () => {
  //google images URL
  const result = await scrapeImages(
    'http://www.google.com/search?q=images&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj-vJ3007_pAhW2DWMBHVD-DnQQ_AUoAXoECAwQAw&cshid=1589881988259767&biw=1536&bih=722',
  );
  expect(result).not.toHaveLength(0);
});
test('scrapeImages_validUrl_Https_OK', async () => {
  //google images URL
  const result = await scrapeImages(
    'https://www.google.com/search?q=images&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj-vJ3007_pAhW2DWMBHVD-DnQQ_AUoAXoECAwQAw&cshid=1589881988259767&biw=1536&bih=722',
  );
  expect(result).not.toHaveLength(0);
});
test('scrapeImages_validUrl_NoProtocol_OK', async () => {
  //google images URL
  const result = await scrapeImages(
    'www.google.com/search?q=images&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj-vJ3007_pAhW2DWMBHVD-DnQQ_AUoAXoECAwQAw&cshid=1589881988259767&biw=1536&bih=722',
  );
  expect(result).not.toHaveLength(0);
});
test('scrapeImages_notValidUrl_KO', async () => {
  const result = await scrapeImages('testNotValidUrl');
  expect(result).toHaveLength(0);
});
