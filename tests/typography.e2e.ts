import { expect, test } from '@playwright/test';

test('Daily demo separates generated prose from dialog interface typography', async ({ page }) => {
	await page.goto('/');
	const daily = page.locator('.daily-summary');
	await expect(daily.getByRole('heading')).toHaveCSS('font-family', /Sentient/);
	await expect(daily.getByRole('heading')).toHaveCSS('font-weight', '900');
	await expect(daily.locator('.daily-summary__body p').first()).toHaveCSS(
		'font-family',
		/Sentient/
	);
	await expect(daily.getByRole('toolbar')).toHaveCSS('font-family', /Satoshi/);
	await daily.getByRole('button', { name: 'Show citations' }).click();
	const dialog = page.getByRole('dialog', { name: 'Citations', exact: true });
	await expect(dialog.getByRole('heading')).toHaveCSS('font-family', /Satoshi/);
	await expect(dialog.getByRole('link').first().locator('span')).toHaveCSS(
		'font-family',
		/Sentient/
	);
	await expect(dialog.locator('.modal__header p')).toHaveCSS('font-family', /Satoshi/);
	await expect(dialog.locator('.modal__header p')).toHaveCSS('font-weight', '500');
});
