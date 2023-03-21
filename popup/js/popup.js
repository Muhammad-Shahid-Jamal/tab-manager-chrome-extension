const tabs = await chrome.tabs.query({
  url: '<all_urls>',
});
const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById('li_template_for_tabs');

const elements = new Set();

for (const tab of tabs) {
  const element = template.content.firstElementChild.cloneNode(true);
  const { title, favIconUrl, url } = tab;
  if (url && url.indexOf('127.0.0.1') === -1) {
    const pathName = new URL(url).origin;

    element.querySelector('.title').textContent = title;
    element.querySelector('img').src = favIconUrl;
    element.querySelector('.pathname').textContent = pathName;
    element.querySelector('a').addEventListener('click', async () => {
      console.log(tab);
    });
    elements.add(element);
  }
}
document.querySelector('main ul').append(...elements);
