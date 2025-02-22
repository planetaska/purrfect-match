<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props()
	let { profile, supabase, user } = $derived(data)
</script>

<h1>Profile page for user: {user?.email}</h1>
<p>Location: {profile.location}</p>
<p>Admin: {profile.admin}</p>