# Publishing and hosting

User instruction confirmed on 2026-11-09: run the public patient guide only at https://cucube1985.github.io/eye-guide/.

- GitHub repository: https://github.com/cucube1985/eye-guide. Publish approved website changes through the existing GitHub Pages workflow on `main`.
- The former ChatGPT Sites project (`appgprj_6add7768c35081918c6f8cda83087497`) is retained privately for its owner. Do not publish, deploy, synchronize source to, or broaden access to that project unless the user explicitly asks.
- `.openai/hosting.json` records the historical Sites identity. Its presence is not permission to resume Sites hosting.
- Keep the clinical content and licensed images intact during hosting-only maintenance. Do not remove source history or the Sites project merely to stop public access.

# Content and checks

Use `content/guide.md` as the clinical prose source. Build with `npm run build` and check with `npm run check` for changes to content, image generation, or the application. Documentation-only changes do not require rebuilding clinical content.

Before a new medical image or numeric claim is added, check that it agrees with the detailed guide and primary sources; a cartoon thumbnail can otherwise reintroduce a simplification that the article previously corrected.
