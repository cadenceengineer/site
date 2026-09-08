<script lang="ts">
	import { base } from '$app/paths';
	import {
		ActionToolbar,
		AiMessage,
		Button,
		ChatInput,
		CitationsModal,
		FeatureCard,
		FeatureShowcase,
		IconButton,
		PricingCard,
		ProviderSection,
		Section,
		UserMessage
	} from '$lib';
	import { appLinksEnabled, pricingEnabled, signInUrl, siteOrigin } from '$lib/app';
	import anthropicLogo from '$lib/assets/providers/anthropic.svg';
	import githubLogo from '$lib/assets/providers/github.svg';
	import mondayLogo from '$lib/assets/providers/monday.svg';
	import openaiLogo from '$lib/assets/providers/openai.svg';
	import bracketsIcon from '$lib/assets/icons/brackets.svg';
	import copyIcon from '$lib/assets/icons/copy.svg';
	import thumbsDownIcon from '$lib/assets/icons/thumbs-down.svg';
	import thumbsUpIcon from '$lib/assets/icons/thumbs-up.svg';

	const title = 'CadenceEngineer · Know what happened. Understand why.';
	const description =
		"A knowledge base built from your organization's activity, so anyone can ask what happened, why, and what comes next.";

	const aiProviders = [
		{ name: 'OpenAI', logo: openaiLogo },
		{ name: 'Anthropic', logo: anthropicLogo }
	];

	const toolProviders = [
		{ name: 'GitHub', logo: githubLogo },
		{ name: 'monday.com', logo: mondayLogo }
	];

	// Illustrative Citations for the sample Daily. Each links to the kind of source a real
	// Citation points at; the sample describes CadenceEngineer's own development.
	const dailyCitations = [
		{
			claim: 'The Daily feature was completed and released.',
			source: 'GitHub · cadenceengineer/summarizer · pull request',
			url: 'https://github.com/cadenceengineer'
		},
		{
			claim: 'It brings activity from GitHub and monday.com together in one update.',
			source: 'GitHub · cadenceengineer/api · pull request',
			url: 'https://github.com/cadenceengineer'
		},
		{
			claim: 'No blockers remain for the initial release.',
			source: 'monday.com · Release board · item',
			url: 'https://github.com/cadenceengineer'
		}
	];

	const chatCitations = [
		{
			claim: 'The Jira Cloud pairing shipped through an installed Forge app.',
			source: 'GitHub · cadenceengineer/api · pull request',
			url: 'https://github.com/cadenceengineer'
		},
		{
			claim: 'The first Premium organization connected a Jira site.',
			source: 'GitHub · cadenceengineer/web · pull request',
			url: 'https://github.com/cadenceengineer'
		},
		{
			claim: 'One issue about hourly token rotation is still open and not blocking.',
			source: 'GitHub · cadenceengineer/api · issue',
			url: 'https://github.com/cadenceengineer'
		}
	];

	const trustPoints = [
		{
			title: 'Every claim links to its evidence',
			body: 'Each sentence in a Daily or a Chat answer carries a Citation to the pull request, ticket, or thread it came from. When the evidence is unclear, CadenceEngineer says so instead of guessing.'
		},
		{
			title: 'Teams and projects, never people',
			body: 'CadenceEngineer describes what your organization is working on. It does not rate individuals, track who did what, or build profiles of contributors.'
		},
		{
			title: 'Nothing new to maintain',
			body: 'Your tools remain the systems of record. There is no extra board to update and no status report to write; the understanding comes from the work itself.'
		}
	];

	const steps = [
		{
			title: 'Sign in with GitHub',
			body: 'Create your organization in CadenceEngineer with the account you already have.'
		},
		{
			title: 'Install the GitHub App',
			body: 'Someone with administrator rights on your GitHub organization installs it and chooses the repositories. About five minutes.'
		},
		{
			title: 'Read your first Daily',
			body: 'It arrives about half an hour later. Connect monday.com or Jira whenever you want more context.'
		}
	];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CadenceEngineer" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={`${siteOrigin}${base}/`} />
	<meta property="og:image" content={`${siteOrigin}${base}/og.png`} />
	<meta property="og:image:width" content="2400" />
	<meta property="og:image:height" content="1260" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={`${siteOrigin}${base}/og.png`} />
</svelte:head>

<main>
	<section class="hero">
		<div class="hero__container">
			<h1 class="type-display type-display--responsive">
				Know what happened.<br />Understand why.
			</h1>
			<div class="hero__copy">
				<p class="type-body">{description}</p>
			</div>
		</div>
	</section>

	<Section>
		<div class="intro">
			<h2 class="type-section-title">Understand the technical side of your company.</h2>
			<p class="type-body">
				Work leaves evidence everywhere: pull requests in GitHub, tickets in Jira, boards in
				monday.com. CadenceEngineer connects that evidence into one coherent account of what your
				organization is doing and makes it available to everyone in it, not only to the people who
				live in those tools.
			</p>
			<p class="type-body">
				It is built for founders, product managers, sales, customer success, designers, and
				leadership: anyone who needs to know what engineering is working on, why, and what comes
				next, without asking for another status report.
			</p>
		</div>
	</Section>

	<FeatureShowcase
		caption="Every day tells a story."
		description="CadenceEngineer turns your organization's activity into one concise update each morning, the Daily. See what moved forward, what changed, and what needs attention next, without chasing updates or adding reporting work for anyone."
	>
		<article class="daily-summary font-generated">
			<h4 class="type-section-title">Good morning, Dominik</h4>

			<div class="daily-summary__body">
				<p>
					Yesterday, the Daily feature was completed and released in CadenceEngineer. It now brings
					activity from GitHub and monday.com together in one clear update.
				</p>

				<p>
					Final review went smoothly, and the remaining inconsistencies in how project updates were
					grouped and explained were resolved. No blockers remain for the initial release.
				</p>

				<p>
					Today, the focus shifts to reviewing the first generated dailies, monitoring their
					quality, and gathering feedback before making the feature available more broadly.
				</p>
			</div>

			<ActionToolbar label="Daily summary actions">
				<IconButton icon={copyIcon} label="Copy daily summary" />
				<IconButton icon={thumbsUpIcon} label="Helpful" />
				<IconButton icon={thumbsDownIcon} label="Not helpful" />
				<CitationsModal citations={dailyCitations} label="Show citations" />
			</ActionToolbar>
		</article>
	</FeatureShowcase>

	<FeatureShowcase
		cardPosition="left"
		caption="Go ahead. Ask away."
		description="Ask about a feature, a project, or anything happening across your organization, in plain language. CadenceEngineer answers from the activity itself, says what it does not know, and links every claim to its source."
	>
		<div class="chat-ui">
			<div class="chat-messages">
				<UserMessage>Is the Jira integration done? A customer is asking.</UserMessage>

				<div class="chat-answer">
					<AiMessage>
						For Jira Cloud, yes. The pairing through an installed Forge app shipped on Tuesday, and
						the first Premium organization connected its site the day after. Jira Server and Data
						Center are not supported, and nothing in the recent activity suggests that is planned.
						One issue about hourly token rotation is still open; it is not blocking.
					</AiMessage>
					<ActionToolbar label="Chat answer actions">
						<IconButton icon={copyIcon} label="Copy answer" />
						<CitationsModal citations={chatCitations} label="Show citations" />
					</ActionToolbar>
				</div>
			</div>

			<ChatInput />
		</div>
	</FeatureShowcase>

	<Section>
		<div class="feature-grid" aria-labelledby="trust-title">
			<h2 class="type-section-title" id="trust-title">Built to be checked.</h2>
			<div class="feature-grid__cards">
				<FeatureCard>
					<div class="feature-grid__card feature-grid__card--illustrated">
						<div class="trust-visual" aria-hidden="true">
							<p class="trust-visual__surface font-generated">
								Yesterday, the release moved to Thursday after the payment review found two blocking
								issues.
							</p>
							<p class="trust-visual__surface trust-visual__surface--source type-supporting">
								<span class="trust-visual__icon" style:--icon-source={`url("${bracketsIcon}")`}
								></span>
								<span>
									<u>The release moved to Thursday.</u><br />
									GitHub · api · pull request #142
								</span>
							</p>
						</div>
						<h3 class="type-component-heading">{trustPoints[0].title}</h3>
						<p class="type-body">{trustPoints[0].body}</p>
					</div>
				</FeatureCard>
				<FeatureCard>
					<div class="feature-grid__card feature-grid__card--illustrated">
						<div class="trust-visual trust-visual--chat" aria-hidden="true">
							<UserMessage>Who fixed the checkout bug?</UserMessage>
							<AiMessage>
								The payments team shipped the fix on Tuesday after two rounds of review. I describe
								work by team and project rather than by person.
							</AiMessage>
						</div>
						<h3 class="type-component-heading">{trustPoints[1].title}</h3>
						<p class="type-body">{trustPoints[1].body}</p>
					</div>
				</FeatureCard>
				<FeatureCard>
					<div class="feature-grid__card feature-grid__card--illustrated">
						<div class="trust-visual trust-visual--sources" aria-hidden="true">
							<p class="trust-visual__surface type-supporting">
								<strong>GitHub</strong><br />Pull requests, issues, reviews, releases
							</p>
							<p class="trust-visual__surface type-supporting">
								<strong>monday.com</strong><br />Boards and items
							</p>
							<p class="trust-visual__surface type-supporting">
								<strong>Jira</strong><br />Tickets and sprints
							</p>
						</div>
						<h3 class="type-component-heading">{trustPoints[2].title}</h3>
						<p class="type-body">{trustPoints[2].body}</p>
					</div>
				</FeatureCard>
			</div>
		</div>
	</Section>

	<ProviderSection
		title="Connect your tools"
		description="Bring the tools your organization already uses into one place. GitHub is all it takes to start; monday.com and Jira add context whenever you connect them."
		providers={toolProviders}
	/>

	<ProviderSection
		title="Choose your AI provider"
		description="Select the AI provider that fits your organization, with the flexibility to use the models and infrastructure you already trust. Self-hosted models are available on request."
		providers={aiProviders}
	/>

	<Section>
		<div class="feature-grid" aria-labelledby="steps-title">
			<h2 class="type-section-title" id="steps-title">Up and running in half an hour.</h2>
			<ol class="feature-grid__cards feature-grid__cards--steps">
				{#each steps as step, index (step.title)}
					<li>
						<FeatureCard>
							<div class="feature-grid__card">
								<h3 class="type-component-heading">{index + 1}. {step.title}</h3>
								<p class="type-body">{step.body}</p>
							</div>
						</FeatureCard>
					</li>
				{/each}
			</ol>
			<div class="feature-grid__action">
				{#if appLinksEnabled}
					<Button href={signInUrl}>Get started</Button>
				{:else}
					<Button href={`${base}/contact/?topic=test_access`}>Request access</Button>
				{/if}
			</div>
		</div>
	</Section>

	{#if pricingEnabled}
		<Section>
			<div class="pricing" aria-labelledby="pricing-title">
				<h2 class="type-section-title" id="pricing-title">Pricing</h2>

				<div class="pricing__grid">
					<PricingCard
						name="Basic"
						price="€30"
						period="/ month"
						actionLabel={appLinksEnabled ? 'Get Started' : undefined}
						actionHref={appLinksEnabled ? signInUrl : undefined}
						sections={[
							{ label: 'Scope', items: ['1 organization', '1 user'] },
							{ label: 'Features', items: ['Daily', 'Chat', '30 messages per day'] },
							{ label: 'AI providers', items: ['OpenAI', 'Anthropic', 'Mistral', 'Novita'] },
							{ label: 'Tools', items: ['GitHub', 'monday.com'] }
						]}
					/>

					<PricingCard
						tone="premium"
						name="Premium"
						price="€50"
						period="/ month"
						actionLabel={appLinksEnabled ? 'Get Started' : undefined}
						actionHref={appLinksEnabled ? signInUrl : undefined}
						sections={[
							{ label: 'Scope', items: ['1 organization', '5 users'] },
							{ label: 'Features', items: ['Daily', 'Chat', 'Unlimited messages per day'] },
							{ label: 'AI providers', items: ['OpenAI', 'Anthropic', 'Mistral', 'Novita'] },
							{ label: 'Tools', items: ['GitHub', 'monday.com', 'Jira', 'Slack'] }
						]}
					/>

					<PricingCard
						tone="enterprise"
						name="Enterprise"
						price="Custom"
						actionLabel="Contact"
						actionHref="mailto:dominik.strasser@cadence.engineer"
						sections={[
							{ label: 'Scope', items: ['Fully customizable'] },
							{ label: 'Features', items: ['All features'] },
							{
								label: 'AI provider',
								items: ['Fully self-hosted', 'or', 'Custom AI endpoint']
							},
							{ label: 'Tools', items: ['Support for all available tools'] }
						]}
					/>
				</div>
			</div>
		</Section>
	{/if}
</main>

<style>
	.hero {
		padding: 8rem 1rem;
	}

	.hero__container {
		display: grid;
		max-width: 75rem;
		margin-inline: auto;
		gap: 4rem;
		text-align: center;
	}

	.hero h1,
	.hero p {
		margin: 0;
	}

	.hero h1 {
		line-height: normal;
	}

	.hero__copy {
		display: grid;
		max-width: 48rem;
		margin-inline: auto;
		gap: 1rem;
	}

	.intro {
		display: grid;
		max-width: 48rem;
		margin-inline: auto;
		gap: 2rem;
	}

	.intro h2,
	.intro p {
		margin: 0;
	}

	.intro h2 {
		text-align: center;
	}

	.chat-answer {
		display: grid;
		gap: 1rem;
	}

	.feature-grid {
		display: grid;
		max-width: 75rem;
		margin-inline: auto;
		gap: 4rem;
	}

	.feature-grid > h2 {
		margin: 0;
		text-align: center;
	}

	.feature-grid__card h3,
	.feature-grid__card p {
		margin: 0;
	}

	.feature-grid__cards {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: 0;
		padding: 0;
		gap: 2rem;
		list-style: none;
	}

	/* Illustrated cards clip their visual at the card edge, so the wrapper takes the card's shape. */
	.feature-grid__card--illustrated {
		border-radius: inherit;
		corner-shape: inherit;
		padding-top: 0;
		overflow: hidden;
	}

	.trust-visual {
		display: grid;
		height: 12rem;
		box-sizing: border-box;
		align-content: start;
		margin-inline: -2rem;
		margin-bottom: 1rem;
		padding: 1rem 0 0 2rem;
		gap: 1rem;
		overflow: hidden;
	}

	/* Fades the bottom of the visual into the card's white ground before the heading. */
	.trust-visual {
		-webkit-mask-image: linear-gradient(to bottom, var(--brand-color-black) 60%, transparent 100%);
		mask-image: linear-gradient(to bottom, var(--brand-color-black) 60%, transparent 100%);
	}

	.trust-visual p {
		margin: 0;
	}

	/* The documented compact input surface. */
	.trust-visual__surface {
		width: max-content;
		max-width: 28rem;
		box-sizing: border-box;
		border-radius: 1rem;
		padding: 0.5rem 1rem;
		background: var(--brand-color-white);
		box-shadow: var(--shadow-surface);
	}

	@supports (corner-shape: squircle) {
		.trust-visual__surface {
			border-radius: 2rem;
			corner-shape: squircle;
		}
	}

	.trust-visual .trust-visual__surface--source {
		display: flex;
		align-items: center;
		margin-top: 2rem;
		margin-left: 4rem;
		gap: 0.5rem;
	}

	.trust-visual__icon {
		display: block;
		width: 1rem;
		height: 1rem;
		flex: none;
		background: currentColor;
		-webkit-mask: var(--icon-source) center / contain no-repeat;
		mask: var(--icon-source) center / contain no-repeat;
	}

	.trust-visual--chat {
		gap: 3rem;
	}

	.trust-visual--chat :global(.user-message) {
		justify-self: end;
		margin-right: -1rem;
	}

	.trust-visual--sources {
		gap: 0.5rem;
	}

	.trust-visual--sources .trust-visual__surface:nth-child(2) {
		margin-left: 3rem;
	}

	.trust-visual--sources .trust-visual__surface:nth-child(3) {
		margin-left: 6rem;
	}

	.feature-grid__cards--steps > li {
		display: flex;
	}

	.feature-grid__card {
		display: grid;
		height: 100%;
		box-sizing: border-box;
		align-content: start;
		padding: 2rem;
		gap: 1rem;
	}

	.feature-grid__action {
		display: flex;
		justify-content: center;
	}

	@media (max-width: 56rem) {
		.feature-grid__cards {
			grid-template-columns: 1fr;
		}
	}

	.daily-summary {
		display: grid;
		gap: 2rem;
		padding: 2rem;
	}

	.daily-summary h4,
	.daily-summary p {
		margin: 0;
	}

	.daily-summary__body {
		display: grid;
		gap: 1rem;
	}

	.chat-ui,
	.chat-messages {
		display: flex;
		flex-direction: column;
	}

	.chat-ui {
		gap: 8rem;
		padding: 2rem;
	}

	.chat-messages {
		gap: 4rem;
	}

	.chat-messages :global(.user-message) {
		align-self: flex-end;
	}

	.chat-messages :global(.ai-message) {
		align-self: flex-start;
	}

	.pricing {
		display: grid;
		max-width: 75rem;
		margin-inline: auto;
		gap: 4rem;
	}

	.pricing h2 {
		margin: 0;
		text-align: center;
	}

	.pricing__grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 2rem;
	}

	@media (max-width: 40rem) {
		.pricing__grid {
			grid-template-columns: 1fr;
		}
	}

	@media (min-width: 40.001rem) and (max-width: 56rem) {
		.pricing__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
