import { expect, test } from '@playwright/test';

for (const width of [1440, 390]) {
	test(`testing-phase plans at ${width}px hide unreleased offers`, async ({ page }) => {
		await page.setViewportSize({ width, height: 1000 });
		await page.goto('http://localhost:4173/');
		const plans = page.locator('.pricing');
		const testPlan = plans.getByRole('article', { name: 'Test plan', exact: true });
		const enterprise = plans.getByRole('article', { name: 'Enterprise plan' });
		await expect(testPlan.getByText('€0', { exact: true })).toBeVisible();
		await expect(testPlan.getByText('3 users included — you and 2 invited members')).toBeVisible();
		await expect(testPlan.getByText('10 Bot messages per user per day')).toBeVisible();
		await expect(testPlan.getByText(/No automatic upgrade or charges/)).toBeVisible();
		await expect(testPlan.getByRole('link', { name: 'Get started' })).toHaveAttribute(
			'href',
			/(?:\/signin|\/contact\/\?topic=test_access)$/
		);
		await expect(enterprise.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute(
			'href',
			'/contact/?topic=question'
		);
		await expect(enterprise.locator('.pricing-card__price')).toHaveCount(0);
		await expect(page.getByText(/€30|€50|Custom pricing|Custom price/)).toHaveCount(0);
		await expect(page.getByRole('heading', { name: /^(Basic|Premium)$/ })).toHaveCount(0);
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
			true
		);
		await plans.screenshot({ path: `/tmp/cadence-site-plans-${width}.png` });
	});
}
