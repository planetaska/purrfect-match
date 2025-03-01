<script lang="ts">
	// Just an example, suppose we have page data loaded from +page.server.ts:
	//
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	let size = $state([]);
	let gender = $state([]);
	let age = $state([]);
	let children = $state();
	let dogs = $state();
	let cats = $state();
</script>

<form method="POST" action="/pets/type">
    <p>Let us know a little more about you</p> 
    <label for="type">Type:</label>
    <select id="type" name="type">
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
    </select>

    
    <fieldset>
      <legend>What size pet are you looking for?</legend>
      <input type="checkbox" id="small" name="size" value = small  bind:group={size}/>
      <label for="small">Small</label>

      <input type="checkbox" id="medium" name="size" value = medium  bind:group={size} />
      <label for="medium">Medium</label>

      <input type="checkbox" id="Large" name="size" value = large  bind:group={size}/>
      <label for="large">Large</label>
    
      <input type="checkbox" id="X-Large" name="size" value = xlarge  bind:group={size}/>
      <label for="x-large">X-Large</label>
    </fieldset>


    <fieldset>
        <legend>Gender</legend>
        <input type="checkbox" id="male" name="gender" value = "male"  bind:group={gender}/>
        <label for="male">Male</label>
  
        <input type="checkbox" id="female" name="gender" value = "female"  bind:group={gender}/>
        <label for="female">Female</label>
  
        <input type="checkbox" id="unknown" name="gender" value = "unknown"  bind:group={gender} />
        <label for="unknown">Unknown</label>
      </fieldset>

    <fieldset>
      <legend>How old of a pet do you want?</legend>
      <input type="checkbox" id="baby" name="age" value = "baby"  bind:group={age}/>
      <label for="baby">Baby</label>

      <input type="checkbox" id="young" name="age" value = "young"  bind:group={age}/>
      <label for="young">Young</label>

      <input type="checkbox" id="adult" name="age" value = "adult"  bind:group={age}/>
      <label for="adult">Adult</label>

      <input type="checkbox" id="senior" name="age" value = "senior"  bind:group={age}/>
      <label for="Senior">Senior</label>
    </fieldset>

    <fieldset>
        <legend>Good with Children?</legend>
        <input type="radio" id="true" name="children" value = "true"  bind:group={children}/>
        <label for="true">Yes</label>

        <input type="radio" id="false" name="children" value = "false"  bind:group={children}/>
        <label for="false">No</label>
    </fieldset>

    <fieldset>
        <legend>Good with other Dogs?</legend>
        <input type="radio" id="true" name="dogs" value = "true"  bind:group={dogs}/>
        <label for="true">Yes</label>

        <input type="radio" id="false" name="dogs" value = "false"  bind:group={dogs}/>
        <label for="false">No</label>
    </fieldset>

    <fieldset>
        <legend>Good with other Cats?</legend>
        <input type="radio" id="true" name="cats" value = "true"  bind:group={cats}/>
        <label for="true">Yes</label>

        <input type="radio" id="false" name="cats" value = "false"  bind:group={cats}/>
        <label for="false">No</label>
    </fieldset>

    <div>
      <input type="submit" value="Submit" />
      <input type="reset" value="Reset" />
    </div>
  </form>

<p> Pets located near {data.props.zip}</p>
{#each data.props.animal as pet}
	<div>
		Pet type: {pet.type}, Name: {pet.name}, Breed: {pet.breeds['primary']}, Location: {pet.organization_id}
	</div>
{/each}
