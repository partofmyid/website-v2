<script lang="ts">
  import { onMount } from "svelte";

  let nameRolling = $state('your-name');
  let counters = $state({
    stars: 0,
    forks: 0,
    subdomains: 0,
  });
  const NAMES = [
    "satr14",
    "orangc",
    "stefdp",
    "iostpa",
  ];

  function slowIncrement(targetCount: number, varName: keyof typeof counters, delay = 100) {
    for (let i = 0; i < targetCount; i++) setTimeout(() => counters[varName] = i+1, delay*i);
  }
  
  onMount(async () => {
    const count = await fetch('https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/stats/count.txt').then(r => r.text());
    const repoStats = await fetch('https://api.github.com/repos/partofmyid/register').then(r => r.json());
    const orgMembers = await fetch('https://api.github.com/orgs/partofmyid/members').then(r => r.json());

    slowIncrement(parseInt(count) || 0, 'subdomains', 50);
    slowIncrement(repoStats?.stargazers_count, 'stars', 75);
    slowIncrement(repoStats?.forks, 'forks', 75);
  });
</script>

<div class="h-full flex justify-center items-center">
  <div class="flex flex-col justify-center items-center gap-6">
    <div>
      <h1 class="text-center text-4xl font-bold">
        <span class="text-ctp-mauve">{nameRolling}</span>.part-of.<span class="text-ctp-red">my.id</span>
      </h1>
      <p class="text-center">your own personal id for your website</p>
    </div>
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