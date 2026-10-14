<script lang="ts">
  import { onMount } from "svelte";

  let members: {
    username: string;
    picture: string;
    link: string;
  }[] = $state([]);
  let nameRolling = $state('your-name');
  let counters = $state({
    stars: 0,
    forks: 0,
    subdomains: 0,
  });
  let subdomainSearch = $state('');
  let fail = $state(true);

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
    setTimeout(() => typeCycleEntries([
      "satr14",
      "orangc",
      "iostpa",
      "stefdp",
      "your-name",
    ], 200), 50);
    
    const count = await fetch('https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/stats/count.txt').then(r => r.text());
    slowIncrement(parseInt(count) || 0, 'subdomains', 50);

    let  repoStats: any = null, orgMembers: any = null;
    try {
      const [ repoStatsRes, orgMembersRes ] = await Promise.all([
        fetch('https://api.github.com/repos/partofmyid/register'),
        fetch('https://api.github.com/orgs/partofmyid/members'),
      ]);
      if (!repoStatsRes.ok || !orgMembersRes.ok) { 
        fail = true;
        throw new Error('Failed to fetch GitHub API data');
      }
      repoStats = await repoStatsRes.json();
      orgMembers = await orgMembersRes.json();
      fail = false;
    } catch { fail = true; }
    if (fail) return;

    slowIncrement(repoStats?.stargazers_count, 'stars', 75);
    slowIncrement(repoStats?.forks, 'forks', 75);

    members = orgMembers?.map((e: {
      login: string;
      avatar_url: string;
      html_url: string;
    }) => ({
      username: e.login,
      picture: e.avatar_url,
      link: e.html_url,
    })) || [];
  });
</script>

<div class="h-[93vh] flex justify-center items-center gap-36">
  <div class="flex flex-col gap-6 items-center lg:items-start">
    <div class="flex flex-col items-center text-center lg:items-start lg:text-left">
      <span class="block w-fit bg-ctp-lavender font-semibold text-ctp-crust px-2 rounded-full text-sm mb-4"><strong>NEW:</strong> is-my.id subdomains are available!</span>
      <h1 class="text-4xl font-bold w-105 text-nowrap shrink-0 lg:5xl">
        <span class="text-ctp-mauve">{subdomainSearch ? subdomainSearch.split('.')[0] : nameRolling}</span>{#if subdomainSearch.endsWith('.is-my.id')}.is-my.<span class="text-ctp-red">id</span>{:else}.part-of.<span class="text-ctp-red">my.id</span>{/if}
      </h1>
      <p class="leading-5 text-ctp-subtext0">your own personal id for your website!<br>a free subdomain service</p>
    </div>
    <form method="POST" action="/query">
      <input type="text" name="subdomain" bind:value={subdomainSearch} placeholder="steve.is-my.id" maxlength="32" required>
      <button type="submit">search</button>
    </form>
    <noscript>
      <p class="text-sm italic text-ctp-subtext0">Note: Javascript is disabled, Web UI will not work.<br>Register manually from the documentation.</p>
    </noscript>
    <div class="flex justify-center items-center gap-6">
      {#if !fail}
        <div class="flex flex-col justify-center items-center text-ctp-yellow">
          <strong class="text-4xl">{counters.stars}</strong>
          <span>stars</span>
        </div>
      {/if}
      {#if counters.subdomains}
        <div class="flex flex-col justify-center items-center text-ctp-green {fail ? 'lg:items-start' : ''}">
          <strong class={fail ? 'text-xl' : 'text-4xl'}>{counters.subdomains}{fail ? ' subdomains' : ''}</strong>
          <span>{fail ? 'registered and counting...' : 'subdomains'}</span>
        </div>
      {/if}
      {#if !fail}
        <div class="flex flex-col justify-center items-center text-ctp-blue">
          <strong class="text-4xl">{counters.forks}</strong>
          <span>forks</span>
        </div>
      {/if}
    </div>
  </div>
  <div class="-z-10 hidden lg:flex justify-center items-center">
    <div class="bg-ctp-red w-100 rounded-lg -rotate-5 font-sans flex flex-col gap-2 items-center pb-6 pt-4 text-center">
      <div>
        <h2 class="font-extrabold text-5xl">HELLO</h2>
        <h3 class="font-extrabold text-xl">MY NAME IS</h3>
      </div>
      <div class="h-40 w-full bg-ctp-text flex justify-center items-center">
        <p class="text-ctp-crust font-bold text-4xl font-[Lora]">{subdomainSearch ? subdomainSearch.split('.')[0] : nameRolling}</p>
      </div>
    </div>
  </div>
</div>

<h2 id="abt" class="text-center underline text-xl text-ctp-lavender"><a href="/#abt">what is this?</a></h2>

<div class="homepage-section centered">
  <p class="text-xl">
    part-of.my.id is a <b class="text-ctp-lavender">free subdomain service</b> that allows you to have a nice looking subdomain for your website for free. register in 4 easy steps:
  </p>
  <div class="inline-flex flex-wrap md:flex-nowrap justify-center items-center gap-4">
    <div class="card flex-col text-ctp-blue"><h3 class="text-center text-4xl!">1st</h3><span>fork the repository</span></div>
    <div class="card flex-col text-ctp-yellow"><h3 class="text-center text-4xl!">then</h3><span>create the domain file</span></div>
    <div class="card flex-col text-ctp-mauve"><h3 class="text-center text-4xl!">now</h3><span>fill in your dns records</span></div>
    <div class="card flex-col text-ctp-green"><h3 class="text-center text-4xl!">lastly</h3><span>open a pull request</span></div>
  </div>
  <div class="card gap-4 md:w-full">
    <div class="animate-pulse bg-ctp-red h-10 aspect-square rounded-full"></div>
    <div class="text-left">
      <h3 class="font-normal!">your subdomain is live!</h3>
      <span class="text-sm italic text-ctp-subtext0">after your PR is merged of course</span>
    </div>
  </div>
  <h2 class="text-ctp-lavender">"why part-of.my.id?"</h2>
</div>

<div class="homepage-section dynamic">
  <div>
    <h3 class="text-ctp-lavender">Sleek and memorable web address</h3>
    <p>With part-of.my.id, you can have a nice subdomain for your website that's is easily memorable.</p>
  </div>
  <div class="flex flex-col items-end text-nowrap text-2xl">
    <s class="text-ctp-red italic">satr14.github.io</s>
    <s class="text-ctp-red italic">satr14.pages.dev</s>
    <b class="text-ctp-green italic font-semibold">satr14.part-of.my.id</b>
    <b class="text-ctp-green italic font-semibold"><span class="font-extrabold text-ctp-yellow">NEW:</span> satr14.is-my.id</b>
  </div>
</div>

<div class="homepage-section dynamic">
  <div>
    <img src="https://cdn.simpleicons.org/github/89dceb" alt="Github Logo" class="w-20 sm:w-60 aspect-square">
  </div>
  <div>
    <h3 class="text-ctp-lavender">Free and open-source</h3>
    <p>part-of.my.id is a free and open-source project hosted on GitHub. All you need to do to get a subdomain is to open a pull request on our register repo with your DNS records.</p>
  </div>
</div>

<div class="homepage-section dynamic reverse">
  <div>
    <h3 class="text-ctp-lavender">Powered by Cloudflare</h3>
    <p>With Cloudflare, your subdomain can opt into proxy features like CNAME flattening, DDoS protection, caching, etc. </p>
  </div>
  <div>
    <img src="https://cdn.simpleicons.org/cloudflare/fab387" alt="Cloudflare Logo" class="w-20 sm:w-60">
  </div>
</div>

<div class="homepage-section dynamic reverse">
  {#if !fail}
    <div class="flex sm:grid gap-1 grid-cols-2">
      {#each members as member}
        <a href={member.link}>
          <img src="{member.picture}?v=2&amp;s=96" alt={member.username} class="w-14 sm:w-24 aspect-square border-ctp-surface2 border-2 rounded-full">
        </a>
      {/each}
    </div>
  {/if}
  <div>
    <h3 class="text-ctp-lavender">Community-driven project</h3>
    <p>By the maintainers of is-a.dev. Rest assured you will have a smooth registration process and quick support answers.</p>
  </div>
</div>

<div class="homepage-section centered">
  <div>
    <h2 class="text-ctp-lavender">Make your site stand out!</h2>
    <p>View our documentation to quickstart your first subdomain.</p>
  </div>
  <a href="/docs/quickstart" class="primary text-lg">Get Started</a>
</div>