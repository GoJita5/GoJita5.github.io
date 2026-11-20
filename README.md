# Personal site (Hugo, GitHub Pages)

Local preview:  `hugo server`      Build:  `hugo --minify`

## Deploy
1. Create a GitHub repo named `GoJita5.github.io` (user site) and push this folder to `main`.
2. Repo Settings > Pages > Source: **GitHub Actions**. The workflow in `.github/workflows/pages.yml` builds and deploys on every push.
3. If you use a project repo instead, change `baseURL` in `hugo.toml` to `https://gojita5.github.io/<repo>/`.

## Edit
- Home text: `content/_index.md`; projects, talks, notes: `content/<section>/*.md`
- New note: `hugo new content notes/my-note.md`; add `math: true` in the front matter for LaTeX (`\( ... \)` inline, `$$ ... $$` display)
- CV button points to `static/cv.pdf`: replace it with your latest CV
- Colors: variables at the top of `assets/css/main.css`
