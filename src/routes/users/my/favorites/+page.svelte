<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props()
</script>

<h1>Your Favorites</h1>

{#if data && data.length > 0}
  <ul>
    {#each data.favorites as pet}
      <li>
        <div>
          <img src={pet.petPhoto} alt={pet.petName} style="width: 100px; height: 100px;" />
          <h2>{pet.petName}</h2>
          <p>Type: {pet.petType}</p>
          <a href={`/pets/type/${pet.petID}`} target="_blank">View Pet</a>
        </div>
      </li>
    {/each}
  </ul>
{:else}
  <p>You have no favorites yet.</p>
{/if}