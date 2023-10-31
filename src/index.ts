import * as cheerio from "cheerio";

import fs from "node:fs/promises";

await fs.copyFile("index.html", "index.html.bak");

try {
  const data = await fs.readFile("index.html", { encoding: "utf8" });
  const $ = cheerio.load(data);
  console.log($("#webfonts").length);

  if ($("#webfonts").length !== 0) {
    $("#webfonts").remove();
  }

  $("head").prepend(
    `
        <style id="webfonts">
          /*声明 WebFont*/
          @font-face {
            font-family: 'LXGWWenKaiLite-Regular';
            src: url('./fonts/LXGWWenKaiLite-Regular.eot');
            src:
              url('./fonts/LXGWWenKaiLite-Regular.eot?#font-spider') format('embedded-opentype'),
              url('./fonts/LXGWWenKaiLite-Regular.woff2') format('woff2'),
              url('./fonts/LXGWWenKaiLite-Regular.woff') format('woff'),
              url('./fonts/LXGWWenKaiLite-Regular.ttf') format('truetype'),
              url('./fonts/LXGWWenKaiLite-Regular.svg') format('svg');
            font-weight: normal;
            font-style: normal;
          }

          * {
            font-family: 'LXGWWenKaiLite-Regular';
          }
      </style>
    `,
  );

  const html = $.root().html();

  await fs.writeFile("index.html", html ?? "");
} catch (err) {
  console.log(err);
}
