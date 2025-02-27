<script lang="ts">
	// Just an example, suppose we have page data loaded from +page.server.ts:
	//
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<form method="POST" action="/match">
    <p>Let us know a little more about you</p> 
    <label for="type">Type:</label>
    <select id="type" name="type">
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
    </select>

    
    <fieldset>
      <legend>What size pet are you looking for?</legend>
      <input type="checkbox" id="small" name="size" />
      <label for="small">Small</label>

      <input type="checkbox" id="Medium" name="size" />
      <label for="medium">Medium</label>

      <input type="checkbox" id="Large" name="size" />
      <label for="large">Large</label>
    
      <input type="checkbox" id="X-Large" name="size" />
      <label for="x-large">X-Large</label>
    </fieldset>


    <fieldset>
        <legend>Gender</legend>
        <input type="checkbox" id="male" name="gender" />
        <label for="male">Male</label>
  
        <input type="checkbox" id="female" name="gender" />
        <label for="female">Female</label>
  
        <input type="checkbox" id="unknown" name="gender" />
        <label for="unknown">Unknown</label>
      </fieldset>

    <fieldset>
      <legend>How old of a pet do you want?</legend>
      <input type="checkbox" id="baby" name="age" />
      <label for="baby">Baby</label>

      <input type="checkbox" id="young" name="age" />
      <label for="young">Young</label>

      <input type="checkbox" id="adult" name="age" />
      <label for="adult">Adult</label>

      <input type="checkbox" id="senior" name="age" />
      <label for="Senior">Senior</label>
    </fieldset>

    <fieldset>
        <legend>Good with Children?</legend>
        <input type="radio" id="true" name="children" />
        <label for="true">Yes</label>

        <input type="radio" id="false" name="children" />
        <label for="false">No</label>
    </fieldset>

    <fieldset>
        <legend>Good with other Dogs?</legend>
        <input type="radio" id="true" name="dogs" />
        <label for="true">Yes</label>

        <input type="radio" id="false" name="dogs" />
        <label for="false">No</label>
    </fieldset>

    <fieldset>
        <legend>Good with other Cats?</legend>
        <input type="radio" id="true" name="cats" />
        <label for="true">Yes</label>

        <input type="radio" id="false" name="cats" />
        <label for="false">No</label>
    </fieldset>

    <div>
      <input type="submit" value="Submit" />
      <input type="reset" value="Reset" />
    </div>
  </form>