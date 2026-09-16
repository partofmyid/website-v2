> [!TIP]
> Looking for the [register repo?](https://github.com/partofmyid/register)

# partofmyid/website-v2

IMPROVED AND UP TO DATE! the website for part-of.my.id and the redirect destination of is-my.id

anyways here is the [live site](https://part-of.my.id)

## development

note: project uses bun instead of nodejs
```bash
bun install
bun run dev
```

## build

note: automated build and deployment is handled by cloudflare workers.
```bash
bun install --frozen-lockfile
bun run build

bun run preview # optional of course
```