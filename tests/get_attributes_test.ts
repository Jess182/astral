/// <reference lib="dom" />

import { assertEquals } from "https://deno.land/std@0.205.0/assert/assert_equals.ts";
import { assertExists } from "https://deno.land/std@0.205.0/assert/assert_exists.ts";

import { launch } from "../mod.ts";

Deno.test("Testing attributes", async (t) => {
  const browser = await launch();
  const content = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Astral</title>
    </head>
    <body>
      <a href="https://example.com" target="_blank" disabled>Hello world</a>
    </body>
  </html>`;

  // Open the webpage and set content
  const page = await browser.newPage();
  await page.setContent(content);

  const element = await page.$("a");

  assertExists(element);

  const attributes = await element.getAttributes();

  assertEquals(attributes, {
    href: "https://example.com",
    target: "_blank",
    disabled: "",
  });

  const target_attribute = await element.getAttribute("target");

  assertEquals(target_attribute, "_blank");

  const disabled_attribute = await element.getAttribute("disabled");

  assertEquals(disabled_attribute, "");

  const nonexistent_attribute = await element.getAttribute("nonexistent");

  assertEquals(nonexistent_attribute, null);

  // Close browser
  await browser.close();
});
