# Theme Documentation

Complete guide to the Iceberg theme implementation for this Quartz-based digital garden. Based on the beautiful [Iceberg vim colorscheme](https://github.com/cocopon/iceberg.vim).

## Table of Contents

1. [Overview](#overview)
2. [Color Palette](#color-palette)
3. [Architecture](#architecture)
4. [Implementation](#implementation)
5. [Customization](#customization)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Overview

### What is Iceberg?

Iceberg is a well-crafted, dark-background color scheme originally designed for Vim. This implementation adapts its beautiful palette for web applications, providing both dark and light modes.

### Key Features

- **Unified Design System**: Consistent colors across the entire site
- **Dual Mode**: Polished dark and light theme variants
- **Accessible**: WCAG AA compliant contrast ratios
- **Modern Typography**: Inter for UI, JetBrains Mono for code
- **Performance**: Efficient CSS using CSS custom properties
- **Maintainable**: All customizations in `quartz-custom/` directory

### Design Philosophy

1. **Subtle & Elegant**: Muted colors that don't strain the eyes
2. **Hierarchy**: Clear visual distinction between elements
3. **Consistency**: Same design language across all components
4. **Readability**: Optimized for long-form reading

---

## Color Palette

### Dark Mode Colors

| Name               | Hex       | Usage                    |
| ------------------ | --------- | ------------------------ |
| **Background**     | `#161821` | Main background          |
| **Background Alt** | `#1e2132` | Cards, elevated surfaces |
| **Foreground**     | `#c6c8d1` | Primary text             |
| **Comments**       | `#6b7089` | Secondary text, metadata |
| **Selection**      | `#272c42` | Text selection           |

### Light Mode Colors

| Name               | Hex       | Usage                    |
| ------------------ | --------- | ------------------------ |
| **Background**     | `#e8e9ec` | Main background          |
| **Background Alt** | `#d2d4de` | Cards, elevated surfaces |
| **Foreground**     | `#33374c` | Primary text             |
| **Comments**       | `#8389a3` | Secondary text, metadata |
| **Selection**      | `#c0c5ce` | Text selection           |

### Accent Colors (Universal)

| Name       | Hex       | Usage                    |
| ---------- | --------- | ------------------------ |
| **Blue**   | `#84a0c6` | Links, primary actions   |
| **Cyan**   | `#89b8c2` | Hover states, highlights |
| **Green**  | `#b4be82` | Success, positive states |
| **Yellow** | `#e2a478` | Warnings, attention      |
| **Orange** | `#c9a085` | Special elements         |
| **Red**    | `#e27878` | Errors, danger           |
| **Purple** | `#a093c7` | Keywords, special syntax |

---

## Architecture

### Theme State Flow

```
┌─────────────────┐
│ quartz.config.ts│
│  Theme Colors   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  CSS Generation │
│  (Build Time)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CSS Variables   │
│  :root level    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Custom Styles   │
│ quartz-custom/  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Components    │
│  Use Variables  │
└─────────────────┘
```

### File Structure

```
project/
├── quartz.config.ts              # Theme configuration
├── quartz-custom/
│   ├── styles/
│   │   ├── _variables.scss       # Iceberg color variables
│   │   ├── iceberg.scss          # Main enhancements
│   │   └── _overrides.scss       # Quartz component overrides
│   └── components/
│       └── styles/
│           ├── footer.scss       # Custom component styles
│           ├── contentMeta.scss
│           ├── image-grid.inline.scss
│           └── image-zoom.inline.scss
```

### CSS Variables

#### Root Variables

Defined in `quartz-custom/styles/_variables.scss`:

```scss
:root {
  /* Dark Mode Base Colors */
  --iceberg-bg-dark: #161821;
  --iceberg-bg-dark-alt: #1e2132;
  --iceberg-fg-dark: #c6c8d1;
  --iceberg-comment-dark: #6b7089;
  --iceberg-selection-dark: #272c42;

  /* Light Mode Base Colors */
  --iceberg-bg-light: #e8e9ec;
  --iceberg-bg-light-alt: #d2d4de;
  --iceberg-fg-light: #33374c;
  --iceberg-comment-light: #8389a3;
  --iceberg-selection-light: #c0c5ce;

  /* Accent Colors */
  --iceberg-blue: #84a0c6;
  --iceberg-cyan: #89b8c2;
  --iceberg-green: #b4be82;
  --iceberg-yellow: #e2a478;
  --iceberg-orange: #c9a085;
  --iceberg-red: #e27878;
  --iceberg-purple: #a093c7;
}
```

#### Quartz Configuration

Configured in `quartz.config.ts`:

```typescript
theme: {
  fontOrigin: "googleFonts",
  cdnCaching: true,
  typography: {
    header: "Inter",
    body: "Inter",
    code: "JetBrains Mono",
  },
  colors: {
    lightMode: {
      light: "#e8e9ec",
      lightgray: "#c6c8d1",
      gray: "#9198b9",
      darkgray: "#6b7089",
      dark: "#161821",
      secondary: "hsl(215 37% 40%)",
      tertiary: "#89b8c2",
      highlight: "rgba(132, 160, 198, 0.30)",
      textHighlight: "#e2a47888",
    },
    darkMode: {
      light: "#161821",
      lightgray: "#2e3244",
      gray: "#6b7089",
      darkgray: "#c6c8d1",
      dark: "#e8e9ec",
      secondary: "#84a0c6",
      tertiary: "#89b8c2",
      highlight: "rgba(192, 202, 245, 0.15)",
      textHighlight: "#e2a47888",
    },
  },
}
```

---

## Implementation

### Current Implementation

The following enhancements are currently implemented:

#### 1. Enhanced Code Blocks

- Dark background with subtle borders
- Theme-aware styling for light/dark modes
- Smooth transitions between themes

#### 2. Inline Code

- Background highlight using selection colors
- Color-coded based on theme
- Proper contrast for readability

#### 3. Links

- Iceberg blue for normal state
- Cyan hover effects
- No background or outline on focus
- Smooth color transitions

#### 4. Tags

- Transparent background
- Blue color with cyan hover
- Subtle upward transform on hover

#### 5. Component Overrides

- Callouts with color-coded borders (blue/green/yellow/red)
- Search with Iceberg-styled focus states
- Graph with themed nodes and links
- Explorer navigation with hover states
- Table of contents with active indicators
- Enhanced popovers and breadcrumbs

#### 6. Typography

- Inter font for headers and body
- JetBrains Mono for code
- Proper line heights and spacing

#### 7. Syntax Highlighting

- Nord theme for dark mode (similar to Iceberg)
- Min-light theme for light mode
- Configured in `quartz.config.ts`

### Component Styling Patterns

#### Using CSS Variables

Always use semantic variables instead of hardcoded colors:

```scss
/* ✅ GOOD */
.component {
  background: var(--bg);
  color: var(--textNormal);
  border: 1px solid var(--lightgray);
}

/* ❌ BAD */
.component {
  background: #161821;
  color: #c6c8d1;
}
```

#### Theme-Specific Styling

Use `:root[saved-theme="..."]` selector for theme-specific rules:

```scss
.component {
  background: var(--iceberg-bg-dark);

  :root[saved-theme="light"] & {
    background: var(--iceberg-bg-light);
  }
}
```

---

## Customization

### Modifying Colors

To adjust colors, edit `quartz-custom/styles/_variables.scss`:

```scss
:root {
  /* Override specific colors */
  --iceberg-blue: #92b0d6; /* Lighter blue */
  --iceberg-cyan: #95c4ce; /* Lighter cyan */
}
```

### Adding New Components

Create new styles in `quartz-custom/styles/`:

```scss
// Import in your SCSS file
@use "../../styles/iceberg.scss";

.my-component {
  background: var(--bg-secondary);
  color: var(--textNormal);
  border: 1px solid var(--iceberg-blue);

  &:hover {
    border-color: var(--iceberg-cyan);
  }
}
```

### Overriding Quartz Components

Add overrides to `quartz-custom/styles/_overrides.scss`:

```scss
// Override any Quartz component
.quartz-component {
  background: var(--iceberg-bg-dark);
  color: var(--iceberg-fg-dark);
}
```

---

## Best Practices

### 1. Single Source of Truth

Always use CSS variables for colors:

```scss
/* ✅ Correct */
color: var(--textNormal);

/* ❌ Wrong */
color: #c6c8d1;
```

### 2. Semantic Naming

Use names that describe purpose, not appearance:

```scss
/* ✅ Good */
--text-primary
--bg-elevated
--link-hover

/* ❌ Bad */
--gray-300
--blue-500
```

### 3. Minimal Theme-Specific Rules

Let CSS variables handle most theming. Only add theme-specific rules when absolutely necessary.

### 4. Test Both Themes

Always test changes in both light and dark modes:

- Toggle theme with the UI button
- Verify colors have proper contrast
- Check hover and focus states
- Ensure text is readable

### 5. Accessibility

Maintain WCAG AA compliance:

- Text on background: >= 4.5:1 contrast
- Large text: >= 3:1 contrast
- Interactive elements have visible focus states

### 6. All Changes in quartz-custom/

**IMPORTANT**: Never modify files in `quartz/` directory. All customizations must be in `quartz-custom/` to survive Quartz updates.

---

## Troubleshooting

### Colors Look Wrong

**Issue**: Components showing incorrect colors

**Solution**:

1. Inspect element in browser DevTools
2. Check which CSS variable is being used
3. Verify variable is defined in `_variables.scss`
4. Check for hardcoded colors overriding variables

### Links Hard to See

**Issue**: Links blend in with regular text

**Solution**:

```scss
a {
  color: var(--iceberg-blue) !important;
  text-decoration: underline;
}
```

### Theme Not Switching Smoothly

**Issue**: Theme changes feel jarring

**Solution**: Check transitions are enabled in `iceberg.scss`:

```scss
body,
pre,
code {
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
```

### Syntax Highlighting Wrong

**Issue**: Code blocks don't match Iceberg colors

**Solution**: Verify syntax theme in `quartz.config.ts`:

```typescript
Plugin.SyntaxHighlighting({
  theme: {
    light: "min-light",
    dark: "nord",
  },
  keepBackground: false,
}),
```

### Build Errors

**Issue**: SCSS compilation fails

**Solution**:

1. Check SCSS syntax in custom files
2. Verify `@use` imports are correct
3. Run `npm run quartz build` to see detailed errors

### Custom Styles Not Loading

**Issue**: Custom styles aren't being applied

**Solution**: Verify import in `quartz-custom/components/styles/footer.scss`:

```scss
@use "../../styles/iceberg.scss";
```

---

## Debugging

### Inspect Current Theme

Use browser console:

```javascript
// Check current theme
const theme = document.documentElement.getAttribute("saved-theme")
console.log("Current theme:", theme)

// Get CSS variable value
const styles = getComputedStyle(document.documentElement)
console.log("--iceberg-blue:", styles.getPropertyValue("--iceberg-blue"))
```

### Common Issues

**Outline on links**: Remove with `outline: none !important`
**Background on tags**: Set `background: transparent`
**Wrong colors**: Check CSS variable names match exactly

---

## Resources

- [Iceberg Vim Theme](https://github.com/cocopon/iceberg.vim) - Original color scheme
- [Quartz Documentation](https://quartz.jzhao.xyz/) - Static site generator
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Test contrast ratios

---

## Summary

The Iceberg theme provides:

✅ **Beautiful Design**: Carefully crafted color palette
✅ **Accessibility**: WCAG AA compliant contrast
✅ **Performance**: Efficient CSS with custom properties
✅ **Flexibility**: Easy to customize and extend
✅ **Consistency**: Unified look across all components
✅ **Maintainability**: All customizations in `quartz-custom/`

**Happy theming!** 🎨🧊
