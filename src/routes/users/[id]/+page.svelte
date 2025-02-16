<script lang="ts">
	import type { PageData } from '../../../../.svelte-kit/types/src/routes'

	let { data } = $props()
	let { profile, supabase, user } = $derived(data)
</script>

<h1>Profile page for user: {user?.email}</h1>
<p>Location: {profile.location}</p>