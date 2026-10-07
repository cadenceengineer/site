// Public offerings during the testing phase. Future paid plans are intentionally absent.
export const testPlan = {
	name: 'Test',
	subtitle:
		'Help shape CadenceEngineer while it’s actively evolving. Features, limits, and availability may change.',
	price: '€0',
	period: 'during the testing phase',
	scope: [
		'3 users included — you and 2 invited members',
		'All supported integrations included',
		'Standard background analysis capacity',
		'Adaptive AI models for routine and complex work',
		'One personalized Daily per user per day',
		'10 Bot messages per user per day'
	],
	notice:
		'The CadenceEngineer Test plan ends when the testing phase finishes. Continuing afterward requires choosing a paid plan. No automatic upgrade or charges.'
};

export const enterprisePlan = {
	name: 'Enterprise',
	subtitle: 'Your organization’s private environment, powered by your own AI.',
	tone: 'enterprise' as const,
	scope: [
		'Private environment for your organization',
		'Connect your company’s AI through a public endpoint or VPN gateway',
		'Adaptive routing across your company’s configured AI models',
		'Unlimited users & messages',
		'All supported integrations included',
		'One personalized Daily per user per day',
		'Customizable processing budgets and background analysis capacity'
	]
};
