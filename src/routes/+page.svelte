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
    const repoStats = await fetch('https://api.github.com/repos/partofmyid/register').then(r => r.json());

    slowIncrement(parseInt(count) || 0, 'subdomains', 50);
    slowIncrement(repoStats?.stargazers_count, 'stars', 75);
    slowIncrement(repoStats?.forks, 'forks', 75);

    const orgMembers = await fetch('https://api.github.com/orgs/partofmyid/members').then(r => r.json());
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

<div class="-z-10 fixed top-0 left-0 w-full h-full bg-size-[40px_40px] opacity-25 rotate-1" style="background-image: radial-gradient(white 1px, transparent 0);"></div>

<div class="h-[95%] flex justify-center items-center">
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
      <button class="bg-ctp-lavender text-ctp-crust py-2 px-4 font-bold" type="submit">search</button>
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

<p id="abt" class="text-center underline text-lg"><a href="/#abt">what is this?</a></p>

<div class="homepage-section centered">
  <p class="text-xl">
    part-of.my.id is a <b>free subdomain service</b> that allows you to have a nice looking subdomain for your website for free.
  </p>
  <h2>why us?</h2>
</div>

<div class="homepage-section dynamic">
  <div>
    <h3>Sleek and memorable web address</h3>
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
    <h3>Free and open-source</h3>
    <p>part-of.my.id is a free and open-source project hosted on GitHub. All you need to do to get a subdomain is to open a pull request on our register repo with your DNS records.</p>
  </div>
</div>

<div class="homepage-section dynamic reverse">
  <div>
    <h3>Powered by Cloudflare</h3>
    <p>With Cloudflare, your subdomain can opt into proxy features like CNAME flattening, DDoS protection, caching, etc. </p>
  </div>
  <div>
    <img src="https://cdn.simpleicons.org/cloudflare/fab387" alt="Cloudflare Logo" class="w-20 sm:w-60">
  </div>
</div>

<div class="homepage-section dynamic reverse">
  <div class="flex sm:grid gap-1 grid-cols-2">
  {#each members as member}
    <a href={member.link}>
      <img src={member.picture} alt={member.username} class="w-14 sm:w-28 aspect-square border-ctp-surface2 border-2 rounded-full">
    </a>
  {/each}
  </div>
  <div>
    <h3>Community-driven project</h3>
    <p>By the maintainers of is-a.dev. Rest assured you will have a smooth registration process and quick support answers.</p>
  </div>
</div>

<div class="homepage-section centered">
  <div>
    <h2>Make your website stand out!</h2>
    <p>Start by searching for your desired subdomain in the search bar above.</p>
  </div>
  <a href="/" class="text-center underline text-lg">Take me there!</a>
</div>