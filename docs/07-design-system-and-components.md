# Design System and Components

## 1. Document Information

**Document:** Design System and Components
**File:** `07-design-system-and-components.md`
**Project:** Khasandjon Babadzhanov — Software Developer Portfolio
**Version:** 1.0
**Status:** Approved component specification
**Website language:** English
**Documentation language:** Russian

---

## 2. Purpose of This Document

Этот документ определяет компонентную систему сайта-портфолио Khasandjon Babadzhanov.

Он фиксирует:

- базовые layout primitives;
- структуру страниц;
- контейнеры и секции;
- navigation components;
- buttons и links;
- project cards;
- metric cards;
- badges;
- skills и technology components;
- code viewer;
- architecture diagram container;
- tables;
- callouts;
- forms;
- timelines;
- filters;
- breadcrumbs;
- table of contents;
- loading, empty и error states;
- responsive behavior;
- accessibility requirements;
- component APIs;
- правила композиции компонентов;
- критерии готовности design system.

Основная задача design system — обеспечить единообразие, доступность и поддерживаемость интерфейса.

---

# 3. Design System Principles

## 3.1. Reusability

Одинаковые UI patterns должны реализовываться через общие компоненты.

Нельзя создавать отдельные версии одинаковой карточки для каждой страницы без объективной причины.

---

## 3.2. Composability

Компоненты должны быть небольшими и комбинироваться между собой.

Пример:

```text
ProjectCard
├── ProjectCategory
├── ProjectTitle
├── ProjectSummary
├── ProjectMetric
├── TechnologyList
└── CardLink
```

---

## 3.3. Accessibility by Default

Каждый базовый компонент должен изначально поддерживать:

- keyboard navigation;
- focus states;
- semantic HTML;
- ARIA только при необходимости;
- sufficient contrast;
- screen readers;
- reduced motion.

Accessibility не должна добавляться отдельно после завершения UI.

---

## 3.4. Content-Driven Design

Компоненты должны адаптироваться под реальный контент.

Нельзя сокращать важную информацию только для сохранения одинаковой высоты карточек.

---

## 3.5. Predictable Behavior

Одинаковые действия должны выглядеть и работать одинаково.

Пример:

- все primary buttons имеют одинаковые states;
- все external links имеют одинаковую external indicator;
- все filters работают по одному pattern;
- все code blocks имеют copy action в одном месте.

---

## 3.6. Minimal Variants

Каждый компонент должен иметь только необходимые variants.

Не создавать:

- десять видов buttons;
- множество почти одинаковых cards;
- отдельные badge components для каждой страницы.

---

# 4. Component Architecture

Рекомендуемая структура компонентов:

```text
src/
└── components/
    ├── ui/
    │   ├── button.tsx
    │   ├── badge.tsx
    │   ├── card.tsx
    │   ├── input.tsx
    │   ├── textarea.tsx
    │   ├── select.tsx
    │   ├── dialog.tsx
    │   ├── tooltip.tsx
    │   ├── tabs.tsx
    │   └── separator.tsx
    │
    ├── layout/
    │   ├── site-header.tsx
    │   ├── site-footer.tsx
    │   ├── page-container.tsx
    │   ├── content-container.tsx
    │   ├── section.tsx
    │   ├── section-header.tsx
    │   └── article-layout.tsx
    │
    ├── navigation/
    │   ├── desktop-navigation.tsx
    │   ├── mobile-navigation.tsx
    │   ├── breadcrumbs.tsx
    │   ├── table-of-contents.tsx
    │   └── project-navigation.tsx
    │
    ├── portfolio/
    │   ├── hero.tsx
    │   ├── profile-panel.tsx
    │   ├── project-card.tsx
    │   ├── project-grid.tsx
    │   ├── metric-card.tsx
    │   ├── experience-item.tsx
    │   ├── skill-group.tsx
    │   ├── technology-badge.tsx
    │   ├── availability-status.tsx
    │   └── resume-card.tsx
    │
    ├── project/
    │   ├── project-header.tsx
    │   ├── project-metadata.tsx
    │   ├── project-metrics.tsx
    │   ├── project-feature.tsx
    │   ├── technical-decision.tsx
    │   ├── challenge-card.tsx
    │   ├── result-comparison.tsx
    │   └── confidentiality-note.tsx
    │
    ├── code/
    │   ├── code-block.tsx
    │   ├── code-header.tsx
    │   ├── copy-code-button.tsx
    │   ├── code-sample-card.tsx
    │   └── code-explanation.tsx
    │
    ├── diagrams/
    │   ├── diagram-container.tsx
    │   ├── architecture-diagram.tsx
    │   ├── flow-diagram.tsx
    │   └── diagram-legend.tsx
    │
    ├── content/
    │   ├── callout.tsx
    │   ├── data-table.tsx
    │   ├── definition-list.tsx
    │   ├── media-frame.tsx
    │   └── content-meta.tsx
    │
    └── forms/
        ├── contact-form.tsx
        ├── form-field.tsx
        ├── form-message.tsx
        └── submit-button.tsx
```

---

# 5. Component Naming Rules

Компоненты должны называться по назначению, а не по внешнему виду.

Правильно:

- `ProjectCard`;
- `MetricCard`;
- `TechnicalDecision`;
- `ContactForm`;
- `TableOfContents`.

Неправильно:

- `GreenCard`;
- `BigBox`;
- `FancySection`;
- `CoolButton`;
- `LeftPanel`.

---

# 6. Layout Primitives

## 6.1. PageContainer

Основной horizontal container страницы.

### Responsibilities

- ограничение максимальной ширины;
- responsive horizontal padding;
- центрирование content;
- поддержка стандартной grid.

### Suggested API

```tsx
type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "article";
  as?: "div" | "main" | "section";
};
```

### Sizes

```text
default: 1200px
wide: 1280px
article: 760px
```

### Rules

- не добавлять vertical spacing;
- не управлять background;
- не использовать nested `PageContainer`, если это не обосновано.

---

## 6.2. Section

Компонент для крупных смысловых секций.

### Responsibilities

- vertical spacing;
- optional background variation;
- optional border;
- semantic element;
- section anchor.

### Suggested API

```tsx
type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant?: "default" | "muted" | "bordered";
  spacing?: "compact" | "default" | "large";
  as?: "section" | "div";
};
```

### Default Spacing

Desktop:

```text
96–128px
```

Mobile:

```text
64–80px
```

---

## 6.3. ContentContainer

Используется для long-form content.

### Responsibilities

- ограничить длину строки;
- управлять article typography;
- поддерживать MDX content.

### Width

```text
680–760px
```

---

## 6.4. ArticleLayout

Layout для project и code detail pages.

### Desktop Structure

```text
Left: sticky table of contents
Center: article content
Right: optional metadata or empty spacing
```

### Mobile Structure

```text
Single column
Collapsible table of contents
```

### Suggested API

```tsx
type ArticleLayoutProps = {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  aside?: React.ReactNode;
};
```

---

## 6.5. Stack

Utility component для vertical или horizontal grouping.

```tsx
type StackProps = {
  direction?: "row" | "column";
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "between" | "end";
  wrap?: boolean;
};
```

Использование должно быть ограниченным. Для простых layouts допустим обычный CSS или Tailwind.

---

# 7. SectionHeader

Используется в начале смысловых секций.

## Required Elements

- optional eyebrow;
- heading;
- optional description;
- optional action.

## Variants

### Default

Heading и description слева.

### Split

Heading слева, action справа.

### Centered

Используется редко:

- Contact CTA;
- final page CTA.

## Suggested API

```tsx
type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  size?: "default" | "large";
};
```

## Rules

- один `h2` или `h1` в зависимости от context;
- heading level передается через prop;
- description не более 2–3 строк на desktop;
- centered layout не использовать для technical article sections.

---

# 8. Site Header

## 8.1. Responsibilities

- identity;
- primary navigation;
- Resume CTA;
- theme switcher;
- mobile menu.

---

## 8.2. Desktop Structure

```text
Logo / Name
Navigation
Theme Switcher
Resume Button
```

---

## 8.3. Mobile Structure

```text
Logo
Theme Switcher
Menu Button
```

Resume располагается внутри mobile menu.

---

## 8.4. Behavior

- sticky top;
- background blur;
- border-bottom;
- state changes after scroll;
- active route indication;
- menu closes on navigation;
- menu closes with Escape;
- focus returns to trigger after closing.

---

## 8.5. States

- top of page;
- scrolled;
- menu open;
- route active;
- keyboard focused.

---

## 8.6. Suggested Height

Desktop:

```text
72px
```

Mobile:

```text
64px
```

---

# 9. Site Footer

## Required Sections

### Identity

- name;
- professional title;
- short descriptor.

### Navigation

- Projects;
- Code Samples;
- Experience;
- About;
- Contact.

### Professional Links

- Email;
- GitHub;
- Resume;
- LinkedIn when available.

### Technical Note

- technology stack;
- current year.

---

## Responsive Behavior

Desktop:

- three or four columns.

Mobile:

- stacked sections;
- visible spacing;
- links remain at least 44px high when appropriate.

---

# 10. Navigation Link

## Variants

- header;
- footer;
- inline;
- breadcrumb;
- table of contents.

## States

- default;
- hover;
- focus;
- active;
- visited where appropriate;
- disabled only when absolutely necessary.

## Rules

- internal links use framework navigation;
- external links indicate new destination;
- external links should not automatically open new tabs unless justified;
- active state cannot rely only on color.

---

# 11. Button Component

## 11.1. Variants

### Primary

Use for one main action per section.

Examples:

- View Projects;
- Send Message;
- Open Live Demo.

### Secondary

Use for supporting actions.

Examples:

- Download Resume;
- View Experience.

### Outline

Use for low-emphasis contained action.

### Ghost

Use in compact controls.

Examples:

- copy code;
- theme switcher;
- mobile menu.

### Link

Use when action is semantically navigation.

---

## 11.2. Sizes

```text
sm: 36px
md: 44px
lg: 48px
icon: minimum 44 × 44px
```

---

## 11.3. States

- default;
- hover;
- active;
- focus-visible;
- disabled;
- loading.

---

## 11.4. Loading State

Loading button должен:

- сохранять ширину;
- показывать spinner;
- менять label;
- быть disabled;
- использовать `aria-busy`.

Example:

> Sending...

---

## 11.5. Suggested API

```tsx
type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};
```

---

## 11.6. Rules

- не использовать больше одного primary button в небольшом блоке;
- icon-only button требует accessible label;
- buttons не используются для обычной навигации, если semantic link подходит лучше;
- links не используются для form submit.

---

# 12. Icon Button

Используется для:

- theme switch;
- menu;
- copy;
- expand;
- previous/next;
- close.

## Requirements

- minimum 44×44px;
- tooltip на desktop;
- `aria-label`;
- visible focus;
- active state where needed.

---

# 13. Badge Component

## 13.1. Variants

- neutral;
- accent;
- success;
- warning;
- information;
- restricted;
- outline.

---

## 13.2. Use Cases

- technology;
- project status;
- category;
- confidentiality;
- code language;
- feature type.

---

## 13.3. Sizes

- small;
- default.

Badges не должны быть крупнее supporting text.

---

## 13.4. Status Badge

Status badge включает:

- semantic dot или icon;
- label;
- optional tooltip.

Examples:

- Production;
- Internal Production;
- Deployed;
- Active Development;
- MVP.

---

## 13.5. Technology Badge

По умолчанию neutral.

Selected filter использует accent variant.

Не использовать individual brand color каждой технологии.

---

# 14. Card Base Component

Base card задает:

- surface;
- border;
- radius;
- padding;
- optional hover behavior.

## Variants

- default;
- interactive;
- elevated;
- subtle;
- bordered.

## Suggested API

```tsx
type CardProps = {
  children: React.ReactNode;
  variant?: "default" | "interactive" | "subtle" | "bordered";
  padding?: "none" | "sm" | "md" | "lg";
  asChild?: boolean;
};
```

## Rules

- card не должна быть clickable частично;
- если вся card является ссылкой, inner interactive elements должны быть исключены;
- hover effect только для interactive cards;
- card не должна использовать shadow в dark theme без необходимости.

---

# 15. ProjectCard

## 15.1. Purpose

Кратко представить проект и привести посетителя на case study.

---

## 15.2. Required Content

- category;
- title;
- summary;
- key metric;
- technologies;
- status;
- CTA;
- optional visual.

---

## 15.3. Variants

### Featured

- large;
- visual area;
- metric emphasis;
- 2-column desktop layout.

### Standard

- project grid;
- compact content.

### Compact

- related projects;
- footer navigation;
- smaller content.

---

## 15.4. Suggested API

```tsx
type ProjectCardProps = {
  title: string;
  slug: string;
  summary: string;
  categories: string[];
  technologies: string[];
  status: ProjectStatus;
  metric?: ProjectMetric;
  image?: ProjectAsset;
  variant?: "featured" | "standard" | "compact";
};
```

---

## 15.5. Accessibility

- title должен быть heading;
- card link получает descriptive accessible name;
- image имеет alt text или decorative empty alt;
- hover state дублируется focus state.

---

# 16. MetricCard

## Required Content

- value;
- label;
- context;
- optional link;
- optional icon.

## Suggested API

```tsx
type MetricCardProps = {
  value: string;
  label: string;
  context?: string;
  href?: string;
  emphasized?: boolean;
};
```

## Rules

- value не должен переноситься на несколько строк без необходимости;
- context остается visible;
- linked metric имеет clear focus;
- no count animation by default.

---

# 17. ProfilePanel

Используется в homepage hero.

## Content

- role;
- focus;
- stack;
- location;
- availability;
- optional current status.

## Visual Pattern

Structured metadata table или definition list.

## Example

```text
role         Software Developer
focus        Backend systems
stack        Python / PostgreSQL / TypeScript
location     Tajikistan
availability Open to relocation
```

## Rules

- не имитировать terminal command prompt;
- не использовать blinking cursor;
- не превращать panel в большой code block.

---

# 18. AvailabilityStatus

## Variants

- open;
- limited;
- unavailable.

Для текущей версии:

> Open to relocation and international opportunities

## Visual Elements

- small status dot;
- text;
- optional location.

## Accessibility

Dot не является единственным источником информации.

---

# 19. SkillGroup

## Purpose

Группирует связанные навыки и связывает их с evidence.

## Required Content

- group title;
- short description;
- technologies;
- optional related project links.

## Example Groups

- Backend Development;
- Data and Processing;
- Integrations and Automation;
- Infrastructure;
- Testing and Reliability;
- TypeScript and Serverless.

## Rules

- максимум 5–7 badges visible;
- additional items can wrap;
- не использовать percentage bars;
- description обязательна для homepage technical focus.

---

# 20. ExperienceItem

## Required Content

- role;
- company;
- dates;
- location;
- format;
- summary;
- contributions;
- technologies;
- related projects.

## Variants

- detailed;
- timeline;
- compact.

## Suggested API

```tsx
type ExperienceItemProps = {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  location: string;
  employmentType?: string;
  summary?: string;
  contributions: string[];
  technologies?: string[];
  relatedProjects?: ProjectReference[];
  variant?: "detailed" | "timeline" | "compact";
};
```

## Rules

- current role получает больше depth;
- previous positions отображаются компактнее;
- official title сохраняется;
- dates должны быть visually scannable.

---

# 21. Timeline Component

Используется на Experience и homepage.

## Structure

- vertical line;
- period marker;
- role content;
- optional current indicator.

## Responsive Behavior

Desktop:

- marker and content aligned.

Mobile:

- compact left line;
- dates above role.

## Accessibility

Timeline должен оставаться понятным без line graphics.

Использовать ordered list.

---

# 22. ProjectHeader

## Required Content

- title;
- summary;
- categories;
- role;
- status;
- timeframe;
- technologies;
- primary metric;
- repository/live links;
- confidentiality status.

## Layout

Desktop:

- content left;
- metadata or metric panel right.

Mobile:

- single column;
- actions stacked.

## Suggested API

```tsx
type ProjectHeaderProps = {
  title: string;
  summary: string;
  categories: string[];
  role: string;
  status: ProjectStatus;
  timeframe: string;
  technologies: string[];
  primaryMetric?: ProjectMetric;
  repositoryUrl?: string;
  liveUrl?: string;
  confidentialityLevel: ConfidentialityLevel;
};
```

---

# 23. ProjectMetadata

Используется как semantic definition list.

## Fields

- Role;
- Status;
- Timeframe;
- Team;
- Stack;
- Confidentiality.

## HTML Pattern

```html
<dl>
  <div>
    <dt>Role</dt>
    <dd>Backend Developer</dd>
  </div>
</dl>
```

Не использовать table, если данные являются definition list.

---

# 24. ProjectMetrics

Grid из 2–4 MetricCard.

## Responsive Layout

Desktop:

- 3–4 columns.

Tablet:

- 2 columns.

Mobile:

- 1 или 2 columns в зависимости от ширины.

## Rules

- одинаковая структура;
- различная длина context допустима;
- metric order соответствует важности.

---

# 25. ProjectFeature

## Required Content

- title;
- explanation;
- optional icon;
- optional related technology.

## Layout

- grid;
- list;
- alternating sections для крупных features.

## Rules

- feature title не является marketing slogan;
- explanation показывает functional value;
- icon вторичен.

---

# 26. TechnicalDecision

## Structure

- decision title;
- context;
- options considered;
- selected approach;
- reasoning;
- trade-offs.

## Visual Pattern

Expandable card или editorial block.

Для первой версии рекомендуется editorial block с clear subsections.

## Suggested API

```tsx
type TechnicalDecisionProps = {
  title: string;
  context: React.ReactNode;
  options?: string[];
  approach: React.ReactNode;
  reasoning: React.ReactNode;
  tradeoffs?: React.ReactNode;
};
```

## Rules

- sections always visible;
- не скрывать основное содержание в accordion на desktop;
- mobile accordion допустим только для secondary detail.

---

# 27. ChallengeCard

## Structure

- challenge;
- why it mattered;
- approach;
- result;
- remaining limitation.

## Variants

- default;
- warning;
- resolved;
- ongoing.

Semantic colors используются умеренно.

---

# 28. ResultComparison

Используется для before-and-after.

## Structure

```text
Before
→
After
```

или table:

| Before | After |
| ------ | ----- |

## Use Cases

- 90-day retention → 2-year retention;
- 150 videos/week → 1,500–2,000;
- manual access removal → automated lifecycle.

## Accessibility

Arrow не должен быть единственным обозначением изменения.

---

# 29. ConfidentialityNote

## Variants

- internal project;
- rewritten code;
- anonymized screenshot;
- public project.

## Standard Content

### Internal Project

> This project was developed for internal company use. The architecture, examples, and screenshots shown here were simplified or anonymized.

### Rewritten Code

> This code sample was independently rewritten for the portfolio and does not reproduce proprietary source code.

## Visual Style

- subtle information callout;
- shield icon;
- no alarming red or warning styling.

---

# 30. CodeBlock

## 30.1. Required Features

- syntax highlighting;
- filename;
- language label;
- line numbers;
- copy button;
- highlighted lines;
- horizontal scrolling;
- theme support.

---

## 30.2. Optional Features

- annotations;
- collapsible long sections;
- diff mode;
- line focus.

---

## 30.3. Suggested API

```tsx
type CodeBlockProps = {
  code: string;
  language: string;
  filename?: string;
  highlightedLines?: number[];
  caption?: string;
  showLineNumbers?: boolean;
  allowCopy?: boolean;
};
```

---

## 30.4. Copy Behavior

States:

- Copy;
- Copied;
- Failed.

Success message:

> Copied

State returns to default after a short delay.

Screen reader announcement required.

---

## 30.5. Mobile Behavior

- horizontal scrolling inside code block;
- header remains visible;
- copy button remains accessible;
- no page-level horizontal overflow.

---

# 31. CodeSampleCard

## Required Content

- title;
- language;
- category;
- purpose;
- related project;
- engineering concepts;
- small code preview;
- link.

## Variants

- grid;
- featured;
- related.

## Rules

- code preview must not exceed 8–12 lines;
- fade or truncation can indicate more content;
- code remains decorative in card and full sample opens separately.

---

# 32. CodeExplanation

Reusable content block.

## Sections

- What it does;
- Why this structure;
- Important details;
- Production considerations;
- Testing.

Может использовать tabs только если content remains accessible without JavaScript.

Для первой версии рекомендуется vertical layout.

---

# 33. DiagramContainer

## Required Features

- title;
- short description;
- diagram;
- legend;
- zoom or fullscreen option when needed;
- textual alternative.

## Suggested API

```tsx
type DiagramContainerProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  legend?: DiagramLegendItem[];
  caption?: string;
  allowZoom?: boolean;
};
```

## Rules

- diagram должен масштабироваться;
- text внутри остается readable;
- alt description обязательна;
- fullscreen dialog keyboard accessible.

---

# 34. DiagramLegend

## Content

- color or shape;
- label;
- optional explanation.

## Rules

- не использовать color alone;
- legend order соответствует diagram reading order.

---

# 35. MediaFrame

Используется для screenshots, videos и interface previews.

## Required Features

- image;
- caption;
- alt text;
- optional browser frame;
- optional zoom.

## Variants

- browser;
- plain;
- mobile;
- diagram.

## Browser Frame

Содержит:

- minimal top bar;
- neutral controls;
- optional safe demo URL.

Не показывать реальный internal URL.

---

# 36. Callout

## Variants

- note;
- information;
- decision;
- security;
- result;
- limitation;
- warning.

## Structure

- icon;
- label;
- content.

## Suggested API

```tsx
type CalloutProps = {
  variant?: "note" | "info" | "decision" | "security" | "result" | "limitation" | "warning";
  title?: string;
  children: React.ReactNode;
};
```

## Rules

- не использовать callout для обычного абзаца;
- warning используется только для настоящего риска;
- security note закрытого проекта использует neutral information style.

---

# 37. DataTable

## Use Cases

- before-and-after;
- project comparison;
- testing scenarios;
- API field reference;
- technical matrix.

## Required Features

- table caption;
- semantic header cells;
- responsive horizontal scroll;
- readable borders;
- no layout tables.

## Suggested API

Data may be passed as structured objects.

---

## Mobile Behavior

- scroll container;
- visible scroll affordance;
- first column may remain sticky only where useful;
- no forced shrinking of text.

---

# 38. DefinitionList

Используется для:

- project metadata;
- profile panel;
- code sample metadata;
- contact details.

## Layout

Desktop:

- two-column key/value.

Mobile:

- stacked.

---

# 39. FilterBar

Используется на Projects и Code Samples.

## Required Elements

- filter label;
- filter buttons;
- clear action where needed;
- result count.

## Behavior

- selected state;
- keyboard navigation;
- filters can wrap;
- filter state optionally stored in URL;
- empty result handled.

## Suggested API

```tsx
type FilterOption = {
  value: string;
  label: string;
  count?: number;
};
```

## Rules

- buttons, not select, for small number of options;
- mobile select допустим при большом количестве;
- selected state has `aria-pressed`.

---

# 40. Tabs

Используются ограниченно.

Possible Use Cases:

- code language variants;
- architecture views;
- API request/response.

Не использовать tabs для:

- скрытия обязательных project sections;
- primary navigation;
- длинных paragraphs.

## Accessibility

- arrow-key navigation;
- proper tab roles;
- active state;
- focus management.

---

# 41. Breadcrumbs

## Use Cases

- project detail;
- code sample detail.

## Structure

```text
Home / Projects / Internal HR Platform
```

## Rules

- current page not clickable;
- visually compact;
- hidden labels not required;
- structured data supported;
- mobile may truncate intermediate labels.

---

# 42. TableOfContents

## Desktop

- sticky;
- active section indicator;
- compact hierarchy;
- smooth scrolling where motion allowed.

## Mobile

- disclosure component;
- current section summary;
- opens list of anchors.

## Suggested API

```tsx
type TocItem = {
  id: string;
  label: string;
  level: 2 | 3;
};
```

## Behavior

- active section based on intersection observer;
- URL hash updates without excessive history entries;
- focus moves correctly after anchor navigation.

---

# 43. ProjectNavigation

Используется в конце case study.

## Content

- previous project;
- next project;
- View All Projects.

## Layout

Desktop:

- two cards side by side.

Mobile:

- stacked.

## Rules

- project order based on curated priority;
- titles visible;
- direction labels clear.

---

# 44. ResumeCard

## Required Content

- resume title;
- short description;
- last updated;
- PDF action;
- online view action;
- file format.

## Suggested Actions

- Download PDF;
- View Experience.

## Rules

- stable `/resume` route;
- no ambiguous file names;
- download icon secondary.

---

# 45. Contact Form

## Required Fields

- Name;
- Email;
- Company, optional;
- Subject;
- Message.

## Technical Hidden Fields

- honeypot;
- submission timestamp;
- source route;
- optional CSRF or integrity token.

---

# 46. FormField

## Structure

- label;
- optional hint;
- input;
- error;
- character count where needed.

## Suggested API

```tsx
type FormFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};
```

## Rules

- label always visible;
- placeholder is example, not label;
- required status explained;
- error associated via ARIA.

---

# 47. Input

## States

- default;
- hover;
- focus;
- filled;
- disabled;
- invalid.

## Requirements

- minimum height 44px;
- readable text;
- browser autofill styling;
- visible focus;
- no unnecessary icons.

---

# 48. Textarea

## Requirements

- minimum initial height around 140px;
- vertical resize;
- maximum message length;
- character count when near limit;
- mobile-friendly.

---

# 49. Form Message

## Types

- success;
- validation error;
- server error;
- rate limit;
- network error.

## Examples

### Success

> Thanks for reaching out. Your message has been received.

### Server Error

> The message could not be sent. Please contact me directly by email.

### Rate Limit

> Too many messages were submitted. Please try again later or use email.

---

# 50. ThemeSwitcher

## Behavior

- dark;
- light;
- system.

Можно использовать cycle button или menu.

Для clarity рекомендуется menu:

- System;
- Light;
- Dark.

## Requirements

- current selection announced;
- no theme flash;
- accessible icon and label;
- stored preference.

---

# 51. MobileNavigation

## Pattern

Slide-over или full-screen dialog.

## Required Features

- menu title;
- close button;
- navigation;
- Resume CTA;
- contact link;
- theme control;
- focus trap;
- Escape close;
- scroll lock.

## Rules

- menu не должен зависеть от hover;
- links have large tap area;
- active item visible;
- menu closes after route change.

---

# 52. Tooltip

Используется для:

- icon-only buttons;
- technical abbreviations;
- confidentiality level explanations;
- diagram nodes where needed.

## Rules

- tooltip не содержит critical information;
- keyboard accessible;
- delay moderate;
- mobile does not depend on tooltip.

---

# 53. Dialog

Use Cases:

- fullscreen diagram;
- image zoom;
- mobile navigation;
- optional resume preview.

## Requirements

- accessible name;
- focus trap;
- Escape close;
- restore focus;
- scroll lock;
- close button;
- background inert.

---

# 54. EmptyState

## Structure

- title;
- explanation;
- recovery action.

## Projects Example

> No projects match the selected filters.

Action:

> Clear Filters

## Code Example

> No code samples match the selected language.

---

# 55. ErrorState

## Structure

- title;
- plain explanation;
- recovery actions;
- optional error reference, not raw stack trace.

## Examples

### Project Error

> This project case study could not be loaded.

### Resume Error

> The resume file is temporarily unavailable.

### Form Error

> The message could not be sent.

---

# 56. LoadingState

## Rules

Loading UI должен использоваться только для truly asynchronous areas.

Use Cases:

- contact submission;
- dynamic demo;
- content filter with delay;
- lazy diagram.

Static content should be server rendered.

## Variants

- spinner;
- skeleton;
- inline status.

Avoid full-page loader.

---

# 57. Skeleton

Используется ограниченно.

Allowed:

- project card during remote fetch;
- dynamic demo result.

Not needed:

- static MDX;
- server-rendered project page;
- header and navigation.

---

# 58. Toast Notifications

Use Cases:

- code copied;
- form submitted;
- theme changed only if necessary;
- failed action.

## Rules

- not the only place for form errors;
- screen reader live region;
- short duration;
- dismissible where persistent.

---

# 59. API Demo Components

Interactive API demo является optional Version 1 feature.

## Components

- request method badge;
- endpoint;
- request fields;
- submit button;
- response status;
- JSON response;
- reset.

## Restrictions

- only mock or safe demo data;
- rate limited;
- no internal endpoints;
- no credentials;
- clearly labeled demonstration.

---

# 60. Component State Matrix

Каждый interactive component должен быть проверен в следующих states.

| State          | Required            |
| -------------- | ------------------- |
| Default        | Yes                 |
| Hover          | Desktop             |
| Focus visible  | Yes                 |
| Active         | When applicable     |
| Disabled       | When applicable     |
| Loading        | Async actions       |
| Error          | Inputs and data     |
| Success        | Forms and actions   |
| Empty          | Lists and filters   |
| Reduced motion | Animated components |

---

# 61. Responsive Component Rules

## Desktop

- multi-column cards;
- sticky TOC;
- expanded metadata;
- larger diagrams.

## Tablet

- reduced grid columns;
- compact spacing;
- responsive header;
- flexible cards.

## Mobile

- single-column;
- stacked actions;
- no fixed sidebar;
- scrollable code;
- full-width buttons where useful;
- compact badges;
- accessible mobile navigation.

---

# 62. Accessibility Requirements

## Buttons and Links

- descriptive labels;
- visible focus;
- correct semantic element;
- 44px target.

## Forms

- explicit labels;
- error association;
- autocomplete attributes;
- keyboard support.

## Cards

- heading structure;
- full-card link only when semantically safe;
- no nested interactive conflicts.

## Code

- selectable;
- copy action labeled;
- syntax colors with sufficient contrast.

## Diagrams

- text description;
- no color-only meaning;
- zoom option if necessary.

## Navigation

- skip link;
- current page indication;
- keyboard operation;
- mobile focus trap.

---

# 63. Component Content Rules

Компоненты не должны hardcode project-specific content.

Правильно:

```tsx
<ProjectCard project={project} />
```

Неправильно:

```tsx
<InternalHRPlatformCard />
```

Исключение:

- unique hero composition;
- special demonstration component;
- highly specific diagram.

---

# 64. Component Styling Rules

Рекомендуемый подход:

- Tailwind CSS;
- CSS variables for tokens;
- class variance utility for variants;
- no inline hardcoded color values;
- no large global CSS files;
- theme values via semantic tokens.

## Example Semantic Classes

- `bg-background`;
- `bg-surface`;
- `text-primary`;
- `text-secondary`;
- `border-default`;
- `text-accent`.

---

# 65. Component Variant Management

Рекомендуется использовать `class-variance-authority` или аналогичный pattern.

Пример:

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition",
  {
    variants: {
      variant: {
        primary: "...",
        secondary: "...",
        ghost: "...",
      },
      size: {
        sm: "...",
        md: "...",
        lg: "...",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
```

Не создавать conditional class logic в каждом usage.

---

# 66. Server and Client Component Boundaries

По возможности использовать server components.

## Server Components

- project cards;
- page sections;
- experience;
- content rendering;
- static diagrams;
- footer;
- metadata.

## Client Components

- theme switcher;
- mobile navigation;
- filters;
- contact form;
- code copy;
- dialog;
- active TOC;
- interactive demo.

Не помечать крупные page trees как client components без необходимости.

---

# 67. Content Rendering Components

MDX должен поддерживать mapping:

```tsx
const mdxComponents = {
  h2: SectionHeading,
  h3: SubsectionHeading,
  p: ArticleParagraph,
  a: ContentLink,
  pre: CodeBlock,
  blockquote: Quote,
  table: DataTable,
  Callout,
  Diagram,
  MediaFrame,
  TechnicalDecision,
  ConfidentialityNote,
};
```

Это обеспечивает единый style для всех case studies.

---

# 68. Icons

Использовать Lucide Icons через selective imports.

## Common Icons

- ArrowRight;
- ArrowUpRight;
- Download;
- Mail;
- Github;
- FileText;
- Code2;
- Database;
- Server;
- Shield;
- Check;
- AlertTriangle;
- Copy;
- CheckCircle;
- ExternalLink;
- Menu;
- X;
- Sun;
- Moon;
- Monitor.

Не использовать icon для каждого heading.

---

# 69. Content Density Rules

## Home

- moderate density;
- clear visual breaks;
- no more than four featured projects;
- no full case study content.

## Project Detail

- high information density;
- narrow paragraphs;
- frequent subheadings;
- diagrams and code separate long text.

## Code Samples

- code-first;
- explanation follows;
- metadata compact.

## Experience

- concise;
- current role detailed;
- older roles compact.

---

# 70. Component Composition Examples

## Featured Project

```tsx
<ProjectCard variant="featured">
  <ProjectCategory />
  <ProjectTitle />
  <ProjectSummary />
  <ProjectMetric />
  <TechnologyList />
  <CardLink />
  <ProjectVisual />
</ProjectCard>
```

## Technical Decision

```tsx
<TechnicalDecision
  title="Move long-running work to Celery"
  context={...}
  options={[...]}
  approach={...}
  reasoning={...}
  tradeoffs={...}
/>
```

## Code Sample Section

```tsx
<CodeBlock
  filename="permissions.py"
  language="python"
  code={code}
/>

<CodeExplanation>
  ...
</CodeExplanation>

<ConfidentialityNote variant="rewritten-code" />
```

---

# 71. Component Anti-Patterns

Не создавать:

- visually identical cards with separate components;
- nested clickable elements;
- button implemented as `div`;
- heading selected only by visual size;
- icon without accessible label;
- text inside image when HTML text is possible;
- card height fixed despite variable content;
- horizontal page scroll;
- hover-only functionality;
- animation without reduced-motion support;
- component with dozens of unrelated props;
- theme-specific duplicated components;
- uncontrolled inconsistent spacing.

---

# 72. Component Documentation

Каждый reusable component должен иметь:

- purpose;
- props;
- variants;
- states;
- usage example;
- accessibility notes;
- responsive behavior;
- prohibited uses.

Documentation can be maintained through:

- Storybook;
- local component showcase route;
- Markdown documentation.

Для Version 1 Storybook optional.

Рекомендуемый internal route:

```text
/dev/components
```

Этот route не должен быть доступен в production или должен быть protected.

---

# 73. Component Testing

## Unit Tests

Подходят для:

- button variant logic;
- filters;
- form validation;
- theme behavior;
- copy action.

## Interaction Tests

- mobile menu;
- dialog;
- tabs;
- contact form;
- filters;
- table of contents.

## Accessibility Tests

- semantic roles;
- keyboard navigation;
- focus management;
- labels;
- contrast manual review.

## Visual Tests

- both themes;
- breakpoints;
- long content;
- missing optional fields;
- large metrics;
- long project titles.

---

# 74. Component Edge Cases

Каждый компонент должен быть проверен с:

- длинным title;
- отсутствующим image;
- отсутствующей metric;
- большим количеством technologies;
- одним technology;
- длинным context;
- отсутствующим live URL;
- отсутствующим repository;
- unavailable resume file;
- long error message;
- mobile width 320px;
- 200% zoom.

---

# 75. Design Token Integration

Компоненты должны использовать semantic tokens.

## Example

Не использовать:

```css
color: #5ee0a0;
```

Использовать:

```css
color: var(--accent);
```

Tailwind equivalent:

```text
text-accent
```

Это позволяет:

- поддерживать themes;
- менять visual direction централизованно;
- сохранять consistency.

---

# 76. Component Priority for Development

## Phase 1 — Foundation

1. PageContainer;
2. Section;
3. SectionHeader;
4. Button;
5. Badge;
6. Card;
7. typography components.

## Phase 2 — Global Layout

1. SiteHeader;
2. DesktopNavigation;
3. MobileNavigation;
4. ThemeSwitcher;
5. SiteFooter.

## Phase 3 — Homepage

1. Hero;
2. ProfilePanel;
3. MetricCard;
4. ProjectCard;
5. SkillGroup;
6. ExperienceItem.

## Phase 4 — Project Pages

1. ProjectHeader;
2. ProjectMetadata;
3. ProjectMetrics;
4. TableOfContents;
5. TechnicalDecision;
6. ChallengeCard;
7. ResultComparison;
8. ConfidentialityNote.

## Phase 5 — Technical Content

1. CodeBlock;
2. CodeSampleCard;
3. DiagramContainer;
4. MediaFrame;
5. Callout;
6. DataTable.

## Phase 6 — Forms and States

1. ContactForm;
2. FormField;
3. Input;
4. Textarea;
5. EmptyState;
6. ErrorState;
7. LoadingState.

---

# 77. Version 1 Required Components

Обязательны:

- SiteHeader;
- MobileNavigation;
- ThemeSwitcher;
- SiteFooter;
- PageContainer;
- Section;
- SectionHeader;
- Button;
- Badge;
- Card;
- ProjectCard;
- MetricCard;
- ExperienceItem;
- SkillGroup;
- ProjectHeader;
- ProjectMetadata;
- ProjectMetrics;
- TableOfContents;
- TechnicalDecision;
- ChallengeCard;
- ConfidentialityNote;
- CodeBlock;
- CodeSampleCard;
- DiagramContainer;
- MediaFrame;
- Callout;
- ContactForm;
- EmptyState;
- ErrorState.

---

# 78. Optional Version 1 Components

Могут быть добавлены, если не задерживают запуск:

- interactive API demo;
- diagram fullscreen;
- image lightbox;
- tabs;
- tooltip;
- resume preview;
- animated metric;
- project search;
- advanced filter URL synchronization.

---

# 79. Component Review Checklist

Для каждого компонента проверить:

## Function

- выполняет одну ясную задачу;
- не дублирует существующий component;
- API понятен.

## Visual

- использует tokens;
- поддерживает themes;
- spacing consistent;
- states designed.

## Responsive

- работает на mobile;
- не вызывает overflow;
- long content supported.

## Accessibility

- semantic HTML;
- keyboard support;
- focus visible;
- label available;
- ARIA used correctly.

## Technical

- type-safe props;
- server/client boundary justified;
- no unnecessary dependency;
- reusable without project-specific assumptions.

---

# 80. Definition of Done

Design system считается реализованным, когда:

- базовые layout primitives созданы;
- typography и color tokens используются централизованно;
- buttons имеют все states;
- badges покрывают technology, category и status;
- card system поддерживает required variants;
- ProjectCard используется на Home и Projects;
- MetricCard используется единообразно;
- navigation responsive и keyboard accessible;
- theme switch работает без flash;
- project detail components поддерживают единый template;
- code blocks поддерживают copy и horizontal scroll;
- diagrams имеют textual alternative;
- forms имеют labels и validation states;
- empty и error states реализованы;
- components проверены в dark и light themes;
- mobile width 320px поддерживается;
- 200% zoom не ломает layout;
- reduced motion учитывается;
- отсутствуют duplicated project-specific UI patterns;
- все critical components имеют documented usage.

---

# 81. Final Component Principle

Компонентная система должна позволить создавать новые страницы проектов и code samples без разработки нового интерфейса для каждого материала.

Основной принцип:

> Build a small set of predictable, accessible, and composable components that make technical evidence easy to present and easy to understand.
