<script lang="ts">
	import Button from './Button.svelte';
	import FormField from './FormField.svelte';
	import Modal from './Modal.svelte';

	type Topic = 'test_access' | 'question' | 'other';

	type Props = {
		/** Same-origin path the site's reverse proxy forwards to the API. */
		action?: string;
		topic?: Topic;
	};

	let { action = '/api/contact', topic = $bindable('test_access') }: Props = $props();

	const topics: { label: string; value: Topic }[] = [
		{ label: 'Request test access', value: 'test_access' },
		{ label: 'Question', value: 'question' },
		{ label: 'Other', value: 'other' }
	];

	const engineerCounts = [
		{ label: '1–5', value: '1-5' },
		{ label: '6–20', value: '6-20' },
		{ label: '21–50', value: '21-50' },
		{ label: 'More than 50', value: '51+' }
	];

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let message = $state('');
	let githubOrganization = $state('');
	let engineerCount = $state('1-5');
	let website = $state('');
	let status = $state<'idle' | 'pending' | 'failed'>('idle');
	let error = $state('');
	let confirmationOpen = $state(false);

	const isTestAccess = $derived(topic === 'test_access');

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		if (status === 'pending') return;
		status = 'pending';
		error = '';

		const payload: Record<string, string | null> = {
			topic,
			name,
			email,
			company: company || null,
			message,
			github_organization: isTestAccess ? githubOrganization || null : null,
			engineer_count: isTestAccess ? engineerCount : null,
			website: website || null
		};

		try {
			const response = await fetch(action, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			if (response.status === 202) {
				name = '';
				email = '';
				company = '';
				message = '';
				githubOrganization = '';
				engineerCount = '1-5';
				website = '';
				status = 'idle';
				confirmationOpen = true;
				return;
			}
			if (response.status === 400) {
				const body = (await response.json().catch(() => null)) as { reason?: string } | null;
				error = body?.reason ?? 'Please check the highlighted fields.';
			} else {
				error = 'The message could not be sent. Please try again in a moment.';
			}
		} catch {
			error = 'The message could not be sent. Please check your connection and try again.';
		}
		status = 'failed';
	}
</script>

<Modal
	label="Message sent"
	title="Thanks, your message is on its way."
	description="I'll reply within two working days with an invitation."
	bind:open={confirmationOpen}
	focusOnOpen
/>

<form class="contact-form" onsubmit={submit}>
	<FormField label="Topic" name="topic" type="select" options={topics} bind:value={topic} />
	<FormField
		label="Name"
		name="name"
		autocomplete="name"
		maxlength={120}
		required
		bind:value={name}
	/>
	<FormField
		label="Work email"
		name="email"
		type="email"
		autocomplete="email"
		maxlength={254}
		required
		bind:value={email}
	/>
	<FormField
		label="Company"
		name="company"
		autocomplete="organization"
		maxlength={120}
		bind:value={company}
	/>
	{#if isTestAccess}
		<FormField
			label="GitHub organization"
			name="github_organization"
			maxlength={120}
			bind:value={githubOrganization}
		/>
		<FormField
			label="Engineers on the team"
			name="engineer_count"
			type="select"
			options={engineerCounts}
			bind:value={engineerCount}
		/>
	{/if}
	<FormField
		label="Message"
		name="message"
		type="textarea"
		maxlength={4000}
		required
		error={status === 'failed' ? error : undefined}
		bind:value={message}
	/>
	<!-- Honeypot: people never see this field; automated senders tend to fill it. -->
	<div class="contact-form__trap" aria-hidden="true">
		<label for="contact-website">Website</label>
		<input
			id="contact-website"
			name="website"
			type="text"
			tabindex="-1"
			autocomplete="off"
			bind:value={website}
		/>
	</div>
	<div class="contact-form__actions">
		<Button width="full" type="submit" disabled={status === 'pending'}>
			{status === 'pending' ? 'Sending…' : 'Send'}
		</Button>
	</div>
</form>

<style>
	.contact-form {
		display: grid;
		width: 100%;
		max-width: 36rem;
		gap: 1rem;
	}

	/* Brand: the action group follows the fields after a 2rem gap. */
	.contact-form__actions {
		margin-top: 1rem;
	}

	.contact-form__trap {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>
