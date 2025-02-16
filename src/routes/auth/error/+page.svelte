<script lang="ts">
	import { page } from '$app/state';
	const message = page.url.searchParams.get('message')

	function humanize(str) {
		return str
			.replace(/^[\s_]+|[\s_]+$/g, '')
			.replace(/[_\s]+/g, ' ')
			.replace(/^[a-z]/, function(m) { return m.toUpperCase(); });
	}
</script>

<p>Login error: {humanize(message)}</p>
<p><button onclick={() => history.back()}>Try again</button></p>