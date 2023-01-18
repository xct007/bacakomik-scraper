## Baca Komik Scraper;

### Help me to test.

- install packages

```bash
yarn add github:xct007/bacakomik-scraper
```

- Example

```js
const {
  latest,
  popular,
  search,
  detail,
  getPdf,
} = require("bacakomik-scraper");

latest().then((mek) => {
  console.log(mek);
});
// go on
```

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.
Don't forget to give the project a star! Thanks again!

```
1. Fork the Repo
2. Commit your Changes
3. Push to the Branch
4. Open a Pull Request
```
