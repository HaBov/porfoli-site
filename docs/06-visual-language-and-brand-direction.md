# Visual Language and Brand Direction

## 1. Document Information

**Document:** Visual Language and Brand Direction
**File:** `06-visual-language-and-brand-direction.md`
**Project:** Khasandjon Babadzhanov — Software Developer Portfolio
**Version:** 1.0
**Status:** Approved visual foundation
**Website language:** English
**Documentation language:** Russian

---

## 2. Purpose of This Document

Этот документ определяет визуальное направление портфолио Khasandjon Babadzhanov.

Он фиксирует:

- визуальный характер сайта;
- дизайн-принципы;
- цветовую палитру;
- dark и light themes;
- типографику;
- spacing system;
- grid и layout;
- border, radius и shadow rules;
- оформление карточек;
- motion и animation;
- отображение code samples;
- оформление architecture diagrams;
- правила работы с screenshots;
- иконографику;
- accessibility requirements;
- responsive behavior;
- визуальные anti-patterns;
- критерии готовности дизайна.

Документ описывает общий visual language. Конкретная структура компонентов будет зафиксирована в `07-design-system-and-components.md`.

---

# 3. Visual Direction Summary

Общее направление сайта:

> A restrained technical portfolio that combines the clarity of professional documentation with the polish of a modern software product.

Сайт должен выглядеть:

- профессионально;
- технически;
- спокойно;
- структурированно;
- современно;
- надежно;
- визуально дорого, но не декоративно;
- достаточно индивидуально, но без creative-overload.

Сайт не должен выглядеть как:

- generic portfolio template;
- startup landing page;
- agency website;
- gaming interface;
- terminal-only website;
- frontend animation showcase;
- dashboard application;
- resume converted directly into HTML.

---

# 4. Brand Attributes

Визуальный язык должен передавать следующие качества.

## 4.1. Reliable

Интерфейс должен выглядеть стабильным и предсказуемым.

Визуальные признаки:

- строгая сетка;
- последовательная spacing system;
- спокойные transitions;
- четкая иерархия;
- отсутствие случайных декоративных элементов.

---

## 4.2. Technical

Сайт должен показывать инженерную направленность.

Визуальные признаки:

- monospaced labels;
- code blocks;
- architecture diagrams;
- structured metadata;
- technical annotations;
- precise borders and spacing.

---

## 4.3. Clear

Контент должен легко просматриваться.

Визуальные признаки:

- высокий contrast;
- ограниченная ширина текста;
- понятные headings;
- видимые section boundaries;
- краткие labels;
- большие отступы между смысловыми блоками.

---

## 4.4. Professional

Дизайн должен быть пригоден для международного hiring process.

Визуальные признаки:

- умеренная палитра;
- отсутствие визуальных gimmicks;
- нейтральная типографика;
- сдержанные animations;
- понятные CTA;
- аккуратные project cards.

---

## 4.5. Evidence-Oriented

Главный визуальный акцент должен быть на доказательствах.

Визуальные приоритеты:

1. metrics;
2. project outcomes;
3. architecture;
4. code;
5. technical decisions;
6. experience.

Декоративные изображения имеют более низкий приоритет.

---

# 5. Reference Combination

Визуальное направление объединяет четыре подхода.

## 5.1. Magic UI Structure

Использовать:

- чистые section blocks;
- аккуратные cards;
- современные layout patterns;
- restrained motion;
- responsive structure.

Не копировать:

- избыточное количество glow effects;
- декоративные gradient meshes;
- animation ради animation.

---

## 5.2. Brittany Chiang Restraint

Использовать:

- dark technical atmosphere;
- аккуратную навигацию;
- muted secondary text;
- clear accent color;
- спокойную композицию.

Не копировать полностью:

- слишком узкую колонку;
- чрезмерно длинную single-page structure;
- portfolio pattern, ориентированный преимущественно на frontend.

---

## 5.3. Technical Documentation Clarity

Использовать:

- readable code;
- tables of contents;
- callouts;
- diagrams;
- metadata rows;
- side navigation для длинных case studies.

---

## 5.4. Product Interface Polish

Использовать:

- consistent states;
- button hierarchy;
- accessible form controls;
- responsive behavior;
- quality empty/error states;
- structured component system.

---

# 6. Primary Visual Concept

Основная визуальная концепция:

> Dark technical editorial interface.

Она объединяет:

- dark navy background;
- soft neutral surfaces;
- bright but controlled emerald accent;
- clear typography;
- code-inspired details;
- large whitespace;
- minimal shadows;
- subtle borders;
- occasional data-grid patterns.

Сайт должен восприниматься как персональная technical publication, а не как маркетинговый лендинг.

---

# 7. Theme Strategy

## 7.1. Default Theme

Основная тема:

> Dark

Причины:

- соответствует developer portfolio context;
- хорошо работает с code samples;
- делает architecture visuals выразительнее;
- поддерживает технический характер;
- соответствует выбранному визуальному направлению.

---

## 7.2. Secondary Theme

Light theme обязательна.

Причины:

- accessibility;
- personal preference;
- daylight usage;
- improved print and screenshot readability;
- демонстрация зрелой design system.

---

## 7.3. Theme Behavior

При первом открытии:

1. учитывать system preference;
2. при отсутствии preference использовать dark;
3. сохранять выбор пользователя;
4. не показывать flash неправильной темы;
5. theme switcher должен быть keyboard accessible.

---

# 8. Color System

## 8.1. Color Principles

Цвет используется для:

- hierarchy;
- status;
- interactive states;
- highlights;
- metrics;
- code syntax;
- diagrams.

Цвет не используется только для decoration.

Основной интерфейс должен оставаться нейтральным.

---

## 8.2. Dark Theme Palette

### Background

```text
--background: #08111F
```

Используется для:

- body;
- main page background;
- large empty areas.

---

### Elevated Background

```text
--background-elevated: #0C1728
```

Используется для:

- sticky header;
- large feature sections;
- secondary page surfaces.

---

### Surface

```text
--surface: #111D2E
```

Используется для:

- project cards;
- metric cards;
- code containers;
- form sections.

---

### Surface Hover

```text
--surface-hover: #162338
```

---

### Primary Text

```text
--text-primary: #F1F5F9
```

---

### Secondary Text

```text
--text-secondary: #A6B3C5
```

---

### Muted Text

```text
--text-muted: #718096
```

Muted text нельзя использовать для важной информации.

---

### Border

```text
--border: #233248
```

---

### Strong Border

```text
--border-strong: #34445C
```

---

### Primary Accent

```text
--accent: #5EE0A0
```

Используется для:

- primary links;
- active states;
- selected tags;
- small emphasis;
- focus ring;
- metric highlights.

---

### Accent Hover

```text
--accent-hover: #78E8B3
```

---

### Accent Muted

```text
--accent-muted: rgba(94, 224, 160, 0.12)
```

---

## 8.3. Light Theme Palette

### Background

```text
--background: #F6F8FB
```

---

### Elevated Background

```text
--background-elevated: #EEF2F7
```

---

### Surface

```text
--surface: #FFFFFF
```

---

### Surface Hover

```text
--surface-hover: #F1F5F9
```

---

### Primary Text

```text
--text-primary: #102033
```

---

### Secondary Text

```text
--text-secondary: #46576B
```

---

### Muted Text

```text
--text-muted: #6B7A8D
```

---

### Border

```text
--border: #D8E0E9
```

---

### Strong Border

```text
--border-strong: #BBC7D4
```

---

### Primary Accent

```text
--accent: #087F5B
```

---

### Accent Hover

```text
--accent-hover: #066A4B
```

---

### Accent Muted

```text
--accent-muted: rgba(8, 127, 91, 0.10)
```

---

# 9. Semantic Colors

Semantic colors должны использоваться только по смыслу.

## Success

Dark:

```text
#56D795
```

Light:

```text
#087F5B
```

---

## Warning

Dark:

```text
#F4C36A
```

Light:

```text
#9A6700
```

---

## Error

Dark:

```text
#FF7B86
```

Light:

```text
#C73745
```

---

## Information

Dark:

```text
#70B7FF
```

Light:

```text
#1261A0
```

---

## Rules

Нельзя:

- использовать red как decorative accent;
- показывать success только green color;
- передавать status только цветом;
- использовать слишком насыщенные status backgrounds.

Каждый status должен иметь:

- color;
- text label;
- icon или shape, когда это уместно.

---

# 10. Accent Usage

Accent color должен занимать не более примерно 10–15% визуального интерфейса.

Использовать для:

- links;
- focus states;
- active navigation;
- small labels;
- code line highlights;
- selected filter;
- primary metrics;
- button emphasis.

Не использовать для:

- больших background areas;
- всех headings;
- каждого technology badge;
- длинных paragraphs;
- всех card borders;
- decorative gradients на каждой странице.

---

# 11. Typography

## 11.1. Primary Typeface

Основной шрифт:

> Inter

Использование:

- headings;
- body text;
- buttons;
- navigation;
- metadata;
- forms.

Причины:

- высокая читаемость;
- нейтральный профессиональный характер;
- хорошая поддержка размеров;
- подходит для dense technical content.

---

## 11.2. Monospace Typeface

Шрифт для кода и technical labels:

> JetBrains Mono

Использование:

- code;
- terminal-like labels;
- eyebrow text;
- small metadata;
- route names;
- technology identifiers;
- architecture annotations.

Monospace нельзя использовать для:

- длинных paragraphs;
- всех navigation links;
- основных headings.

---

## 11.3. Font Loading

Использовать:

- optimized local or framework-managed fonts;
- variable font versions;
- preload only required weights;
- `font-display: swap`.

Не подключать большое количество font families.

---

# 12. Type Scale

## 12.1. Display

Desktop:

```text
font-size: 64px
line-height: 1.05
font-weight: 650–700
letter-spacing: -0.035em
```

Tablet:

```text
font-size: 52px
```

Mobile:

```text
font-size: 38–42px
line-height: 1.08
```

Используется только для homepage hero.

---

## 12.2. Page Title

Desktop:

```text
font-size: 48px
line-height: 1.1
font-weight: 650
letter-spacing: -0.025em
```

Mobile:

```text
font-size: 34px
```

---

## 12.3. Section Heading

Desktop:

```text
font-size: 30–34px
line-height: 1.2
font-weight: 620
```

Mobile:

```text
font-size: 26px
```

---

## 12.4. Subsection Heading

```text
font-size: 20–24px
line-height: 1.3
font-weight: 600
```

---

## 12.5. Body Large

```text
font-size: 18px
line-height: 1.7
```

Используется:

- hero description;
- project executive summary;
- About introduction.

---

## 12.6. Body

```text
font-size: 16px
line-height: 1.7
```

---

## 12.7. Body Small

```text
font-size: 14px
line-height: 1.55
```

---

## 12.8. Caption

```text
font-size: 12–13px
line-height: 1.5
```

Caption не должен использоваться для critical information.

---

# 13. Text Width

Оптимальная ширина обычного текста:

```text
60–72 characters per line
```

Recommended content width:

```text
680–760px
```

Для technical case studies общий layout может быть шире, но paragraphs должны сохранять ограниченную ширину.

Нельзя растягивать body text на всю ширину desktop screen.

---

# 14. Heading Style

Headings должны:

- использовать sentence case;
- быть короткими;
- иметь clear hierarchy;
- не содержать decorative punctuation без необходимости.

Правильно:

> Technical decisions

Неправильно:

> TECHNICAL DECISIONS!!!

Исключение:

- небольшие eyebrow labels могут использовать uppercase.

---

# 15. Label Style

Eyebrow и technical labels:

```text
font-family: JetBrains Mono
font-size: 12px
font-weight: 500
letter-spacing: 0.08em
text-transform: uppercase
```

Примеры:

- SOFTWARE DEVELOPER;
- FEATURED PROJECT;
- INTERNAL PRODUCTION;
- PYTHON;
- API DESIGN.

---

# 16. Spacing System

Используется base unit:

```text
4px
```

Approved scale:

```text
4
8
12
16
20
24
32
40
48
64
80
96
128
```

Не создавать случайные значения без необходимости.

---

## 16.1. Section Spacing

Desktop:

```text
96–128px
```

Tablet:

```text
80–96px
```

Mobile:

```text
64–80px
```

---

## 16.2. Card Padding

Large card:

```text
28–32px
```

Standard card:

```text
20–24px
```

Compact card:

```text
16px
```

---

## 16.3. Content Gaps

Heading to description:

```text
12–16px
```

Description to CTA:

```text
24–32px
```

Cards grid gap:

```text
20–24px
```

---

# 17. Layout Grid

## 17.1. Main Container

Maximum width:

```text
1280px
```

Common content width:

```text
1120–1200px
```

Article content width:

```text
720px
```

---

## 17.2. Page Padding

Desktop:

```text
32–48px
```

Tablet:

```text
24–32px
```

Mobile:

```text
20px
```

Minimum mobile padding:

```text
16px
```

---

## 17.3. Column Grid

Desktop:

- 12 columns;
- 24px gutters.

Tablet:

- 8 columns;
- 20px gutters.

Mobile:

- 4 columns;
- 16px gutters.

---

## 17.4. Case Study Layout

Desktop:

```text
Sticky table of contents: 220–260px
Main content: 680–760px
Optional annotation area: remaining width
```

Mobile:

- single column;
- collapsible table of contents;
- no fixed sidebars.

---

# 18. Borders

Основной визуальный separation создается borders, а не shadows.

Default:

```text
1px solid var(--border)
```

Strong:

```text
1px solid var(--border-strong)
```

Accent border используется редко:

```text
1px solid color-mix(in srgb, var(--accent) 45%, transparent)
```

Нельзя добавлять accent border ко всем cards.

---

# 19. Border Radius

Рекомендуемая система:

```text
--radius-sm: 6px
--radius-md: 10px
--radius-lg: 14px
--radius-xl: 20px
```

Использование:

- badges: 6px или full pill;
- buttons: 8–10px;
- cards: 12–14px;
- large visual containers: 16–20px;
- modals: 16px.

Сайт не должен состоять из чрезмерно rounded элементов.

---

# 20. Shadows

Dark theme:

- shadows почти не используются;
- separation создается border и surface contrast.

Light theme:

```text
0 8px 30px rgba(15, 23, 42, 0.06)
```

Hover shadow:

```text
0 12px 36px rgba(15, 23, 42, 0.09)
```

Не использовать:

- strong black shadows;
- colored glow вокруг каждой карточки;
- neon shadows;
- multiple shadow layers без необходимости.

---

# 21. Background Treatment

Основной background остается чистым.

Допустимые subtle effects:

- radial accent glow в hero;
- faint grid;
- soft noise texture;
- subtle line patterns;
- section boundary gradients.

Ограничения:

- opacity не выше 4–8%;
- pattern не должен ухудшать text readability;
- effects должны отключаться или упрощаться на mobile;
- не использовать animated background continuously.

---

# 22. Hero Visual Direction

Hero должен быть преимущественно typography-driven.

## 22.1. Left Area

Содержит:

- eyebrow;
- heading;
- supporting text;
- location;
- CTA.

---

## 22.2. Right Area

Рекомендуемый вариант:

- compact technical profile panel;
- key metrics;
- small architecture-inspired visual;
- code-like metadata;
- availability status.

Не использовать:

- generic stock illustration;
- 3D avatar;
- floating technology logos;
- animated laptop;
- excessive terminal animation.

---

## 22.3. Optional Technical Panel

Пример содержания:

```text
role: Software Developer
focus: Backend systems
stack: Python / PostgreSQL / TypeScript
location: Tajikistan
availability: Open to relocation
```

Панель должна выглядеть как structured metadata, а не fake terminal.

---

# 23. Navigation Visual Style

## 23.1. Header

- sticky;
- semi-transparent;
- background blur;
- bottom border;
- compact height;
- maximum clarity.

Desktop height:

```text
68–72px
```

Mobile height:

```text
60–64px
```

---

## 23.2. Logo

Рекомендуемый формат:

> KB

или:

> Khasandjon Babadzhanov

Desktop может использовать полное имя.

Mobile может использовать:

> KB

Logo не должен быть сложным graphic mark на первой версии.

---

## 23.3. Active State

Использовать:

- underline;
- small accent line;
- accent text plus shape.

Не использовать только изменение цвета.

---

## 23.4. Resume Button

Resume отображается как secondary outlined button.

Primary visual emphasis остается на Projects.

---

# 24. Button System Direction

## Primary Button

- accent background;
- dark readable text;
- medium weight;
- subtle hover;
- visible focus ring.

## Secondary Button

- transparent background;
- border;
- primary text;
- surface hover.

## Tertiary Button

- text or link style;
- small arrow;
- no heavy container.

---

## 24.1. Button Sizing

Standard:

```text
height: 44px
padding-inline: 18–20px
```

Large:

```text
height: 48px
padding-inline: 22–24px
```

Mobile tap target:

```text
minimum 44 × 44px
```

---

# 25. Project Cards

Project cards должны выглядеть как краткие technical case study summaries.

## 25.1. Required Visual Elements

- category label;
- title;
- summary;
- metric;
- technology tags;
- arrow or CTA;
- optional architecture preview.

---

## 25.2. Card Hierarchy

1. Category.
2. Project name.
3. Problem or purpose.
4. Result.
5. Stack.
6. CTA.

---

## 25.3. Featured Card

На desktop может использовать:

- two-column layout;
- larger visual area;
- highlighted metric;
- short architecture diagram.

---

## 25.4. Hover Behavior

Допустимо:

- border contrast increase;
- small upward translation, максимум 2–4px;
- arrow movement;
- surface change.

Не использовать:

- card rotation;
- large scale;
- 3D tilt;
- strong glow.

---

# 26. Metric Cards

Metric cards должны быть компактными и factual.

Структура:

```text
Value
Label
Context
```

Пример:

```text
188+
REST API endpoints
Across 11 functional modules
```

Value:

- large;
- high contrast;
- accent optionally.

Context:

- muted;
- smaller;
- visible.

Не использовать animated count-up, если это задерживает понимание или мешает reduced motion.

---

# 27. Technology Badges

Badges должны быть secondary elements.

Style:

- small;
- neutral background;
- subtle border;
- compact padding;
- consistent label.

Accent badge используется только для:

- selected filter;
- main technology;
- active state.

Не использовать:

- разные brand colors всех technologies;
- крупные logos в каждой карточке;
- rainbow badges.

---

# 28. Status Badges

Примеры:

- Internal Production;
- Production;
- Deployed;
- Active Development;
- MVP;
- Anonymized Case Study.

Каждый badge содержит:

- dot или icon;
- text;
- semantic color;
- accessible label.

---

# 29. Code Block Direction

Code blocks — ключевой визуальный элемент.

## 29.1. Required Structure

- filename header;
- language label;
- copy button;
- line numbers;
- syntax highlighting;
- horizontal scroll;
- highlighted lines;
- optional explanatory annotations.

---

## 29.2. Code Surface

Dark theme:

```text
background: #07101C
border: #26364C
```

Light theme:

```text
background: #F4F7FA
border: #D7E0E8
```

---

## 29.3. Code Typography

```text
font-family: JetBrains Mono
font-size: 13–14px
line-height: 1.65
```

Mobile:

```text
font-size: 12.5–13px
```

---

## 29.4. Syntax Colors

Colors должны:

- иметь sufficient contrast;
- не быть overly saturated;
- работать в обеих themes;
- сохранять consistency.

Suggested semantic mapping:

- keywords: violet or blue;
- strings: green;
- types: cyan;
- numbers: orange;
- comments: muted gray;
- functions: soft yellow;
- errors: red only when necessary.

---

## 29.5. Highlighted Lines

Использовать:

- subtle accent background;
- left accent border;
- optional annotation number.

Не использовать flashing или animated code highlighting.

---

# 30. Architecture Diagrams

Диаграммы должны быть визуально согласованы с сайтом.

## 30.1. Style

- neutral component boxes;
- subtle borders;
- accent connectors;
- short labels;
- consistent icon set;
- readable typography;
- clear hierarchy.

---

## 30.2. Components

Typical visual types:

- user;
- frontend;
- API;
- database;
- queue;
- worker;
- storage;
- external service.

---

## 30.3. Colors

Использовать:

- neutral surface для components;
- accent для primary flow;
- blue для external systems;
- yellow для async processing;
- red только для failure path.

---

## 30.4. Diagram Background

- transparent or surface;
- должен поддерживать обе themes;
- не использовать screenshot diagrams с fixed white background.

---

## 30.5. Diagram Labels

Использовать:

- Inter для основного текста;
- JetBrains Mono для service names и protocols.

---

## 30.6. Interactive Diagrams

Допустимо:

- hover descriptions;
- selectable steps;
- collapsible detail.

Не требуется для Version 1.

Static SVG или Mermaid достаточно.

---

# 31. Screenshots

## 31.1. Purpose

Screenshots показывают реальный продукт, но не заменяют technical explanation.

---

## 31.2. Framing

Использовать единый browser frame:

- minimal browser chrome;
- no personal bookmarks;
- no operating system clutter;
- consistent corner radius;
- clean shadows in light theme;
- border in dark theme.

---

## 31.3. Data

Все screenshots закрытых проектов должны использовать:

- demo names;
- demo email;
- synthetic dates;
- fake departments;
- safe metrics.

---

## 31.4. Screenshot Variants

- full page;
- focused feature;
- cropped workflow;
- before-and-after;
- mobile screen, если релевантно.

---

## 31.5. Captions

Каждый screenshot должен иметь caption:

- what is shown;
- why it matters;
- whether data is anonymized.

---

# 32. Photography

Фотография не обязательна на первой версии.

Если используется:

- одна профессиональная portrait photo;
- нейтральный background;
- natural lighting;
- без aggressive retouching;
- не использовать как fullscreen hero image.

Recommended placement:

- About page;
- small profile block;
- Contact page.

Не использовать:

- casual selfie;
- lifestyle gallery;
- multiple portraits;
- photo as dominant homepage content.

---

# 33. Iconography

Рекомендуемая библиотека:

- Lucide Icons.

Причины:

- consistent stroke;
- technical neutral style;
- broad coverage;
- small bundle with selective imports.

---

## 33.1. Icon Style

- stroke width consistent;
- 16–20px для UI;
- 20–24px для feature cards;
- text labels обязательны для critical actions.

---

## 33.2. Avoid

- mixing icon libraries;
- emoji as primary interface icons;
- filled colorful icons;
- decorative oversized icons.

---

# 34. Motion Direction

Motion должен поддерживать hierarchy и feedback.

## 34.1. Allowed Motion

- fade in;
- small vertical reveal;
- hover transition;
- button feedback;
- active tab transition;
- page transition, если она быстрая;
- diagram step highlight.

---

## 34.2. Duration

Micro-interaction:

```text
120–180ms
```

Component transition:

```text
180–240ms
```

Section reveal:

```text
300–450ms
```

---

## 34.3. Easing

Recommended:

```text
cubic-bezier(0.22, 1, 0.36, 1)
```

---

## 34.4. Movement Limits

Translation:

```text
2–16px
```

Scale:

```text
maximum 1.02
```

---

## 34.5. Reduced Motion

При `prefers-reduced-motion`:

- отключить section reveals;
- убрать smooth scrolling;
- убрать count animations;
- убрать decorative transforms;
- сохранить instant state feedback.

---

## 34.6. Prohibited Motion

Не использовать:

- looping background animations;
- floating icons;
- cursor followers;
- parallax text;
- rotating technology logos;
- loading screen без необходимости;
- text typing animation;
- auto-playing carousels;
- 3D card tilting.

---

# 35. Section Transitions

Разделы отделяются через:

- spacing;
- border-top;
- subtle background change;
- heading hierarchy;
- small technical label.

Не использовать wave separators или large decorative SVG shapes.

---

# 36. Tables

Tables могут использоваться для:

- before-and-after;
- architecture comparisons;
- project metadata;
- testing scenarios.

Rules:

- horizontal scrolling на mobile;
- sticky first column только при необходимости;
- visible headers;
- row borders;
- no zebra-striping with strong colors;
- text remains selectable.

---

# 37. Callouts

Callout types:

- Note;
- Decision;
- Constraint;
- Security;
- Result;
- Limitation.

Structure:

- icon;
- label;
- short content;
- semantic border.

Пример:

> **Security note**
> Employee data shown in screenshots has been replaced with synthetic demo records.

Callouts не должны использоваться для каждого paragraph.

---

# 38. Forms

Contact form должен выглядеть простым и надежным.

## 38.1. Field Style

- visible label above field;
- not placeholder-only;
- medium radius;
- clear border;
- surface background;
- visible focus ring;
- inline validation.

---

## 38.2. States

- default;
- hover;
- focus;
- filled;
- disabled;
- error;
- success.

---

## 38.3. Error State

Error включает:

- color;
- icon;
- text;
- `aria-describedby`.

---

# 39. Focus States

Каждый interactive element должен иметь видимый focus.

Recommended:

```text
2px solid var(--accent)
2px offset
```

Нельзя:

- полностью удалять outline;
- показывать focus только через subtle color change.

---

# 40. Link Styling

Inline links должны иметь:

- accent color;
- underline or visible hover underline;
- clear focus state.

Navigation links могут использовать no underline в default state, но active и focus state должны быть заметны.

---

# 41. Responsive Visual Behavior

## 41.1. Desktop

- wider project cards;
- multi-column grids;
- sticky navigation;
- side table of contents;
- architecture diagrams displayed at full size.

---

## 41.2. Tablet

- reduced columns;
- simplified header;
- diagrams adapt to width;
- cards may move from three to two columns.

---

## 41.3. Mobile

- single-column content;
- large tap targets;
- no horizontal page overflow;
- code scrolls inside container;
- metric cards may use two-column grid;
- project metadata stacks vertically;
- sticky table of contents becomes dropdown;
- motion reduced.

---

# 42. Breakpoints

Recommended:

```text
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Design should not depend only on fixed breakpoints.

Use fluid sizing where practical:

```css
font-size: clamp(...);
padding-inline: clamp(...);
```

---

# 43. Accessibility Visual Requirements

## 43.1. Contrast

Minimum:

- normal text: 4.5:1;
- large text: 3:1;
- interactive controls: 3:1 against surrounding color.

---

## 43.2. Text Size

- body text не меньше 16px;
- captions не меньше 12px;
- important metadata предпочтительно 14px.

---

## 43.3. Color Independence

Не передавать смысл только цветом.

Дополнительно использовать:

- labels;
- icons;
- shapes;
- text.

---

## 43.4. Zoom

Layout должен оставаться usable при:

- 200% browser zoom;
- enlarged system fonts.

---

## 43.5. Touch Targets

Минимум:

```text
44 × 44px
```

---

# 44. Visual Content Hierarchy

На любой странице пользователь должен видеть приоритеты.

## Project Page Hierarchy

1. Project title.
2. Project purpose.
3. Primary metric.
4. Role and stack.
5. Problem.
6. Architecture.
7. Technical decisions.
8. Code.
9. Testing.
10. Result.

## Home Hierarchy

1. Professional identity.
2. Main value proposition.
3. Projects.
4. Metrics.
5. Skills.
6. Experience.
7. Contact.

---

# 45. Dark Theme Quality Rules

Dark theme должна избегать common problems.

Не использовать:

- pure black `#000000`;
- pure white long text;
- extremely low contrast gray;
- bright saturated borders;
- neon glow;
- transparent cards without separation.

Использовать:

- layered navy surfaces;
- off-white text;
- muted blue-gray secondary text;
- restrained emerald accent.

---

# 46. Light Theme Quality Rules

Light theme не должна выглядеть как автоматически inverted dark mode.

Необходимо отдельно настроить:

- border contrast;
- shadows;
- code colors;
- accent shade;
- muted text;
- diagram surfaces;
- image framing.

---

# 47. Favicon and Identity Mark

Первая версия favicon:

> KB

Design:

- dark navy background;
- emerald letters или line detail;
- minimal geometry;
- readable at 16×16px.

Дополнительные assets:

- 32×32 favicon;
- 180×180 Apple touch icon;
- 192×192 app icon;
- 512×512 app icon.

---

# 48. Open Graph Visual

Open Graph image должна содержать:

- Khasandjon Babadzhanov;
- Software Developer;
- short descriptor;
- primary stack;
- site domain;
- subtle architecture or code pattern.

Recommended text:

```text
Khasandjon Babadzhanov
Software Developer
Python · PostgreSQL · TypeScript · Docker
```

Размер:

```text
1200 × 630px
```

Не использовать screenshot главной страницы как единственный OG image.

---

# 49. Page-Specific Visual Direction

## 49.1. Homepage

- typography-driven hero;
- metric grid;
- large featured cards;
- technical profile panel;
- restrained background effect.

## 49.2. Projects

- clean filter bar;
- mixed-size cards;
- clear project status;
- stronger visuals than Experience page.

## 49.3. Project Details

- editorial article layout;
- sticky table of contents;
- diagrams;
- callouts;
- code blocks;
- limited content width.

## 49.4. Code Samples

- documentation-like interface;
- language filters;
- code-first cards;
- strong readability.

## 49.5. Experience

- timeline;
- minimal cards;
- role hierarchy;
- related projects.

## 49.6. About

- long-form narrative;
- optional portrait;
- engineering principles;
- current focus.

## 49.7. Contact

- calm layout;
- direct email before form;
- minimal distractions.

---

# 50. Visual Anti-Patterns

Запрещенные или нежелательные решения:

- full-screen animated terminal;
- typing hero headline;
- matrix background;
- 3D objects;
- floating technology icons;
- excessive gradients;
- glassmorphism on every component;
- neon cyberpunk style;
- huge profile photo;
- progress bars for skills;
- skill percentages;
- GitHub contribution calendar as primary proof;
- carousels for projects;
- hidden navigation;
- tiny body text;
- auto-playing animation;
- cursor replacement;
- complex page transitions;
- low-contrast dark mode;
- template branding.

---

# 51. Tailwind Token Direction

Рекомендуемая система CSS variables:

```css
:root {
  --background: #f6f8fb;
  --background-elevated: #eef2f7;
  --surface: #ffffff;
  --surface-hover: #f1f5f9;

  --text-primary: #102033;
  --text-secondary: #46576b;
  --text-muted: #6b7a8d;

  --border: #d8e0e9;
  --border-strong: #bbc7d4;

  --accent: #087f5b;
  --accent-hover: #066a4b;
  --accent-muted: rgba(8, 127, 91, 0.1);

  --success: #087f5b;
  --warning: #9a6700;
  --error: #c73745;
  --info: #1261a0;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
}

.dark {
  --background: #08111f;
  --background-elevated: #0c1728;
  --surface: #111d2e;
  --surface-hover: #162338;

  --text-primary: #f1f5f9;
  --text-secondary: #a6b3c5;
  --text-muted: #718096;

  --border: #233248;
  --border-strong: #34445c;

  --accent: #5ee0a0;
  --accent-hover: #78e8b3;
  --accent-muted: rgba(94, 224, 160, 0.12);

  --success: #56d795;
  --warning: #f4c36a;
  --error: #ff7b86;
  --info: #70b7ff;
}
```

Final Tailwind implementation может использовать HSL или OKLCH, но визуальные значения должны оставаться близкими к утвержденному направлению.

---

# 52. Visual QA Checklist

Перед утверждением страницы проверить:

## Hierarchy

- главный heading очевиден;
- primary CTA заметен;
- secondary content не конкурирует с основным;
- metrics читаются быстро.

## Typography

- размер body достаточен;
- line length ограничена;
- нет слишком плотных paragraphs;
- monospace используется умеренно.

## Color

- contrast достаточен;
- accent не перегружает страницу;
- status понятен без цвета;
- обе темы настроены отдельно.

## Layout

- spacing последовательный;
- cards выровнены;
- нет случайных widths;
- mobile layout не требует horizontal scroll.

## Motion

- animations короткие;
- reduced motion поддерживается;
- нет distracting loops.

## Technical Content

- code readable;
- diagrams readable;
- screenshot captions присутствуют;
- confidential data отсутствует.

---

# 53. Visual Decision Principles

При выборе между несколькими вариантами использовать следующий приоритет:

1. Clarity over decoration.
2. Evidence over visual novelty.
3. Readability over density.
4. Borders over heavy shadows.
5. Typography over illustration.
6. Static clarity over unnecessary motion.
7. Technical credibility over trend imitation.
8. Accessibility over aesthetic subtlety.
9. Consistency over page-specific experimentation.
10. Long-term maintainability over visual complexity.

---

# 54. Definition of Done

Визуальное направление считается реализованным, когда:

- dark и light themes созданы;
- цветовые tokens используются централизованно;
- accent usage ограничен;
- типографическая система реализована;
- Inter и JetBrains Mono подключены оптимально;
- spacing основан на общей шкале;
- main container и article widths единообразны;
- project cards соответствуют выбранной иерархии;
- metric cards читаемы;
- code blocks имеют consistent style;
- architecture diagrams используют общую палитру;
- screenshots имеют единый frame;
- navigation одинакова на всех страницах;
- focus states видимы;
- contrast проверен;
- mobile layout протестирован;
- reduced motion поддерживается;
- favicon и OG image подготовлены;
- отсутствуют запрещенные visual anti-patterns;
- сайт выглядит как самостоятельный продукт, а не измененный template.

---

# 55. Final Visual Statement

Итоговый сайт должен сочетать:

- dark technical atmosphere;
- professional typography;
- calm product design;
- documentation-level clarity;
- readable architecture and code;
- restrained emerald accent;
- strong evidence hierarchy.

Главный визуальный принцип:

> The design should make the engineering work easier to understand, not compete with it.
