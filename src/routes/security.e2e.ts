import { expect, test } from '@playwright/test';

test('static public pages load without browser errors', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	for (const route of ['/', '/contact/', '/privacy/', '/terms/', '/404/']) {
		await page.goto(`http://localhost:4173${route}`);
		await expect(page.locator('main').first()).toBeVisible();
	}
	expect(errors).toEqual([]);
});

test('contact submits through the same-origin proxy and shows confirmation', async ({ page }) => {
	let payload: Record<string, unknown> | undefined;
	await page.route('**/api/contact', async (route) => {
		expect(route.request().method()).toBe('POST');
		payload = route.request().postDataJSON();
		expect(route.request().headers()['x-contact-site']).toBeUndefined();
		await route.fulfill({ status: 202, contentType: 'application/json', body: '{}' });
	});
	await page.goto('http://localhost:4173/contact/?topic=question');
	await expect(page.getByLabel('Topic', { exact: true })).toHaveValue('question');
	await page.getByLabel('Name', { exact: true }).fill('Test Reader');
	await page.getByLabel('Work email').fill('reader@example.test');
	await page.getByLabel('Message', { exact: true }).fill('A test question');
	await page.getByRole('button', { name: 'Send', exact: true }).click();
	await expect(page.getByRole('dialog')).toBeVisible();
	expect(payload).toMatchObject({
		topic: 'question',
		name: 'Test Reader',
		email: 'reader@example.test'
	});
});
