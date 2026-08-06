<script lang="ts">
  import { onMount } from "svelte";

  let members = $state([]);
  let nameRolling = $state('your-name');
  let counters = $state({
    stars: 0,
    forks: 0,
    subdomains: 0,
  });

  function slowIncrement(targetCount: number, varName: keyof typeof counters, delay = 100) {
    for (let i = 0; i < targetCount; i++) setTimeout(() => counters[varName] = i+1, delay*i);
  }

  function typeCycleEntries(entries: string[], delay = 100, pauseBetween = 500) {
    let charIndex = 0;
    let extraDelay = 0;
    for (let i = 0; i < entries.length; i++) {
      const name = entries[i];
      for (let char = 0; char < name.length; char++)
        setTimeout(() => nameRolling = name.slice(0, char + 1), delay * (charIndex++) + extraDelay);
      extraDelay += pauseBetween;
    }
  }

  
  onMount(async () => {
    const count = await fetch('https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/stats/count.txt').then(r => r.text());
    const repoStats = await fetch('https://api.github.com/repos/partofmyid/register').then(r => r.json());
    const orgMembers = await fetch('https://api.github.com/orgs/partofmyid/members').then(r => r.json());

    slowIncrement(parseInt(count) || 0, 'subdomains', 50);
    slowIncrement(repoStats?.stargazers_count, 'stars', 75);
    slowIncrement(repoStats?.forks, 'forks', 75);

    setTimeout(() => typeCycleEntries([
      "satr14",
      "orangc",
      "iostpa",
      "stefdp",
      "your-name",
    ], 200), 500);

    members = orgMembers?.map((e: {
      login?: string;
      avatar_url?: string;
      html_url?: string;
    }) => ({
      username: e?.login,
      picture: e?.avatar_url,
      link: e?.html_url,
    })) || [];
  });
</script>

<div class="-z-10 fixed top-0 left-0 w-full h-full bg-size-[40px_40px] opacity-25 rotate-1" style="background-image: radial-gradient(white 1px, transparent 0);"></div>

<div class="h-full flex justify-center items-center">
  <div class="flex flex-col justify-center items-center gap-6">
    <div class="flex flex-col items-center">
      <span class="block w-fit bg-ctp-lavender font-semibold text-ctp-crust px-2 rounded-full text-sm mb-4"><strong>NEW:</strong> is-my.id subdomains are available!</span>
      <h1 class="text-center text-4xl font-bold">
        <span class="text-ctp-mauve">{nameRolling}</span>.part-of.<span class="text-ctp-red">my.id</span>
      </h1>
      <p class="text-center text-lg">your own personal id for your website</p>
    </div>
    <form>
      <input class="bg-ctp-base text-ctp-text" type="text" placeholder="steve.is-my.id">
      <button class="bg-ctp-red text-ctp-crust py-2 px-4 font-bold" type="submit">search</button>
    </form>
    <div class="flex justify-center items-center gap-6">
      <div class="flex flex-col justify-center items-center text-ctp-yellow">
        <strong class="text-4xl">{counters.stars}</strong>
        <span>stars</span>
      </div>
      <div class="flex flex-col justify-center items-center text-ctp-green">
        <strong class="text-4xl">{counters.subdomains}</strong>
        <span>subdomains</span>
      </div>
      <div class="flex flex-col justify-center items-center text-ctp-blue">
        <strong class="text-4xl">{counters.forks}</strong>
        <span>forks</span>
      </div>
    </div>
  </div>
</div>