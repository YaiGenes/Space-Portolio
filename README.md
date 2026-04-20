# Yaiser Avila Rodríguez — Portfolio

Personal portfolio site for Yaiser Avila Rodríguez, Site Reliability Engineer.

Live: **[yaigenes.infrabio.dev](https://yaigenes.infrabio.dev)**

## Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D**: Three.js / @react-three/fiber

## Sections

- **Hero** — headline, bio, CTA buttons (About / Download CV)
- **About** — profile, key stats, contact links
- **Experience** — vertical timeline across Hydrolix, Triggle, Knowmad mood, Accenture
- **Skills** — icon marquee + categorised skill grid
- **Projects** — project cards with impact metrics and GitHub links
- **Contact** — email form + direct links

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
```

## Project Structure

```
app/              # Next.js App Router pages + metadata
components/
  main/           # Page-level sections (Hero, About, Experience, Skills, Projects, Contact)
  sub/            # Reusable components (ProjectCard, HeroContent, SkillDataProvider)
constants/        # Skill data, social links
public/           # Static assets, icons, resume.pdf
utils/            # Framer Motion variants
```
