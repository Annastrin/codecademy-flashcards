import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('text=Topics').click();
  await expect(page).toHaveURL('http://localhost:3000/topics');
  await page.locator('text=Create New Topic').click();
  await expect(page).toHaveURL('http://localhost:3000/topics/new');
  await page.locator('[placeholder="Topic Name"]').click();
  await page.locator('[placeholder="Topic Name"]').fill('Topic 0');
  await page.locator('select[name="topicIcon"]').selectOption('book');
  await page.locator('text=Add Topic').click();
  await expect(page).toHaveURL('http://localhost:3000/topics');
  await page.locator('text=Topic 0').click();
  await expect(page.locator('text=Topic: Topic 0')).toBeVisible();
  await expect(page.url().startsWith('http://localhost:3000/topics')).toBeTruthy();
  await expect(page.url()).not.toEqual('http://localhost:3000/topics');
  await page.locator('text=Create a New Quiz').click();
  await expect(page.url().startsWith('http://localhost:3000/quizzes/new')).toBeTruthy();
  await expect(page.url()).not.toEqual('http://localhost:3000/quizzes/new');
  await page.locator('[placeholder="Quiz Title"]').click();
  await page.locator('[placeholder="Quiz Title"]').fill('Quiz 0');
  await page.locator('[placeholder="Front"]').click();
  await page.locator('[placeholder="Front"]').fill('Card 0 Front');
  await page.locator('[placeholder="Back"]').click();
  await page.locator('[placeholder="Back"]').fill('Card 0 Back');
  await page.locator('text=Create Quiz').click();
  await expect(page).toHaveURL('http://localhost:3000/quizzes');
  await page.locator('text=Quiz 0').click();
  await expect(page.url().startsWith('http://localhost:3000/quizzes')).toBeTruthy();
  await expect(page.url()).not.toEqual('http://localhost:3000/quizzes');
  await page.locator('text=Card 0 Front').click();
  await page.locator('text=Card 0 Back').click();
});