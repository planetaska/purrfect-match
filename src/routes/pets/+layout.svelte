<script lang="ts">
	import Footer from '$components/Layout/Footer.svelte';

	let { children } = $props()
</script>

{@render children()}

<Footer />