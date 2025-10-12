---
title: "Iceberg Theme Implementation Plan"
date: 2025-10-12
tags:
  - planning
  - theme
  - design-system
  - iceberg
draft: false
---

# Iceberg Theme Implementation Plan

This document outlines the comprehensive plan for implementing and refining the Iceberg theme across the digital garden. The current implementation already uses Iceberg colors in `quartz.config.ts`, but we need to enhance it with additional styling and ensure full consistency.

> **⚠️ IMPORTANT CONSTRAINT**: All customizations MUST be done in `quartz-custom/` directory only. The `quartz/` directory gets replaced during updates and should never be modified. We will use CSS overrides and custom components to achieve the Iceberg theme enhancements.

## Current State Analysis

### ✅ Already Implemented

1. **Configuration** (`quartz.config.ts`)
   - Iceberg colors properly configured for both light and dark modes
   - Typography set to Inter (body/header) and JetBrains Mono (code)
   - Google Fonts CDN configured

2. **Theme System** (`quartz/util/theme.ts`)
   - CSS variable generation working
   - Uses `:root[saved-theme="dark"]` for dark mode
   - Color scheme properly mapped from config to CSS variables

3. **Base Styles** (`quartz/styles/base.scss`)
   - Basic layout and typography
   - Uses CSS variables throughout
   - Responsive grid system

4. **Theme Toggle** (`quartz/components/styles/darkmode.scss`)
   - Dark mode toggle button styled
   - Icon switching based on theme

### 🎯 Needs Enhancement

1. **Custom Styling** (NEW: `quartz-custom/styles/`)
   - Create new styles directory in quartz-custom
   - Add Iceberg-specific CSS overrides

2. **Syntax Highlighting**
   - Currently uses GitHub themes (github-light/github-dark)
   - Should be replaced with Iceberg syntax theme

3. **Custom Components**
   - Need Iceberg-specific styling in custom components
   - Enhance visual consistency

4. **Interactive Elements**
   - Tags, cards, buttons need Iceberg styling
   - Terminal-style code blocks
   - Highlight boxes

## Implementation Plan

### Phase 1: Core Iceberg Enhancements (High Priority)

#### 1.1 Create Custom Styles Directory and Iceberg Overrides
**NEW Directory**: `quartz-custom/styles/`
**NEW File**: `quartz-custom/styles/iceberg.scss`

**Structure**:
```
quartz-custom/
├── components/
│   └── styles/
│       ├── footer.scss
│       ├── contentMeta.scss
│       ├── image-grid.inline.scss
│       └── image-zoom.inline.scss
└── styles/  # NEW
    ├── iceberg.scss  # Main Iceberg enhancements
    ├── _variables.scss  # Iceberg color variables
    └── _overrides.scss  # Quartz component overrides
```

**Changes to add in `iceberg.scss`**:
```scss
// Import Iceberg variables
@use "./variables";

// Enhanced code blocks with terminal style
pre {
  background: var(--iceberg-bg-dark) !important;
  border: 1px solid var(--iceberg-selection-dark);
  border-radius: 8px;
}

// Terminal-style code blocks
.terminal {
  position: relative;
  background: var(--iceberg-bg-dark);
  border-radius: 8px;
  overflow: hidden;

  &::before {
    content: "● ● ●";
    display: block;
    background: var(--iceberg-bg-dark-alt);
    padding: 0.75rem 1rem;
    color: var(--iceberg-comment-dark);
  }
}

// Tag styling
.tag {
  background: var(--bg-secondary);
  color: var(--iceberg-blue);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;

  &:hover {
    background: var(--iceberg-blue);
    color: var(--iceberg-bg-dark);
  }
}

// Highlight boxes
.highlight-box {
  background: var(--bg-secondary);
  border-left: 4px solid var(--iceberg-blue);
  padding: 1rem 1.25rem;
  border-radius: 4px;

  &.info { border-left-color: var(--iceberg-cyan); }
  &.success { border-left-color: var(--iceberg-green); }
  &.warning { border-left-color: var(--iceberg-yellow); }
  &.danger { border-left-color: var(--iceberg-red); }
}

// Enhanced link hover states
a {
  transition: color 0.2s ease;

  &:hover {
    color: var(--iceberg-cyan);
  }
}

// Better selection
::selection {
  background: var(--highlight);
  color: var(--textNormal);
}

// Smooth theme transitions
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

// Override Quartz component styles
@import "./overrides";
```

**Tasks**:
- [ ] Create `quartz-custom/styles/` directory
- [ ] Create `_variables.scss` with Iceberg color variables
- [ ] Create `iceberg.scss` with main enhancements
- [ ] Create `_overrides.scss` for Quartz component overrides
- [ ] Import in layout/component that loads styles
- [ ] Test CSS is being loaded

**Files to create**:
- `/quartz-custom/styles/iceberg.scss`
- `/quartz-custom/styles/_variables.scss`
- `/quartz-custom/styles/_overrides.scss`

**Estimated time**: 2-3 hours

---

#### 1.2 Custom Syntax Highlighting Theme
**File**: `quartz.config.ts` (line 65-70)

**Current**:
```typescript
Plugin.SyntaxHighlighting({
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
}),
```

**Proposed Changes**:
1. **Option A**: Use existing compatible theme
   - Try "nord" or "material-theme-darker" as close alternatives
   - Quick implementation, may not be perfect match

2. **Option B**: Create custom Iceberg Shiki theme
   - Create `iceberg-light.json` and `iceberg-dark.json`
   - Perfect color matching
   - More work but better result

**Tasks**:
- [ ] Research available Shiki themes similar to Iceberg
- [ ] Test "nord" or "material-theme" as alternatives
- [ ] If needed, create custom Iceberg theme files
- [ ] Update `quartz.config.ts` to use new theme
- [ ] Test syntax highlighting on various code samples

**Files to modify**:
- `/quartz.config.ts` (line 65-70)
- Potentially create: `/quartz-custom/themes/iceberg-dark.json` and `/quartz-custom/themes/iceberg-light.json`

**Estimated time**: 3-5 hours (Option B), 1 hour (Option A)

---

#### 1.3 Custom Component Styling
**Files**: Custom components in `quartz-custom/components/styles/`

**Existing custom styles to audit**:
- `footer.scss` - Ensure Iceberg colors
- `contentMeta.scss` - Metadata styling
- `image-grid.inline.scss` - Image grid colors
- `image-zoom.inline.scss` - Zoom overlay colors

**Tasks**:
- [ ] Audit `footer.scss` for Iceberg consistency
- [ ] Check `contentMeta.scss` for proper variable usage
- [ ] Ensure image components respect theme
- [ ] Add any missing Iceberg variables
- [ ] Test in both light and dark modes

**Files to modify**:
- `/quartz-custom/components/styles/footer.scss`
- `/quartz-custom/components/styles/contentMeta.scss`
- `/quartz-custom/components/styles/image-grid.inline.scss`
- `/quartz-custom/components/styles/image-zoom.inline.scss`

**Estimated time**: 2 hours

---

### Phase 2: Enhanced Components via CSS Overrides (Medium Priority)

> **Note**: Since we can't modify `quartz/` files, we'll add CSS overrides in `quartz-custom/styles/_overrides.scss` to style Quartz components with Iceberg colors.

#### 2.1 Callouts & Admonitions Override
**File**: `quartz-custom/styles/_overrides.scss`

**CSS Overrides**:
```scss
// Callout color overrides for Iceberg theme
.callout {
  &[data-callout="note"],
  &[data-callout="info"] {
    --callout-color: var(--iceberg-blue);
  }

  &[data-callout="tip"],
  &[data-callout="success"] {
    --callout-color: var(--iceberg-green);
  }

  &[data-callout="warning"],
  &[data-callout="caution"] {
    --callout-color: var(--iceberg-yellow);
  }

  &[data-callout="danger"],
  &[data-callout="error"] {
    --callout-color: var(--iceberg-red);
  }

  border-left-color: var(--callout-color);

  .callout-title {
    color: var(--callout-color);
  }
}
```

**Tasks**:
- [ ] Add callout overrides to `_overrides.scss`
- [ ] Test all callout types with Iceberg colors
- [ ] Ensure visibility in both light and dark modes

**Files to modify**:
- `/quartz-custom/styles/_overrides.scss`

**Estimated time**: 1 hour

---

#### 2.2 Search Component Override
**File**: `quartz-custom/styles/_overrides.scss`

**CSS Overrides**:
```scss
// Search component Iceberg styling
#search-container {
  input {
    border-color: var(--iceberg-comment-dark);

    &:focus {
      border-color: var(--iceberg-blue);
      box-shadow: 0 0 0 2px rgba(132, 160, 198, 0.2);
    }
  }

  .search-result {
    &:hover {
      background: var(--highlight);
    }

    mark {
      background: var(--iceberg-yellow);
      color: var(--textNormal);
    }
  }
}
```

**Tasks**:
- [ ] Add search overrides to `_overrides.scss`
- [ ] Test search functionality
- [ ] Verify highlighting visibility

**Files to modify**:
- `/quartz-custom/styles/_overrides.scss`

**Estimated time**: 1 hour

---

#### 2.3 Graph & Explorer Component Overrides
**File**: `quartz-custom/styles/_overrides.scss`

**CSS Overrides**:
```scss
// Graph component Iceberg colors
#graph-container {
  .node {
    fill: var(--iceberg-blue);

    &:hover {
      fill: var(--iceberg-cyan);
    }
  }

  .link {
    stroke: var(--iceberg-comment-dark);
  }
}

// Explorer component Iceberg colors
.explorer {
  .folder-button {
    &:hover {
      background: var(--highlight);
      color: var(--iceberg-blue);
    }
  }

  .folder-title,
  .explorer-link {
    &:hover {
      color: var(--iceberg-cyan);
    }
  }

  .folder-outer.collapsed {
    .folder-button {
      color: var(--textMuted);
    }
  }
}
```

**Tasks**:
- [ ] Add graph and explorer overrides
- [ ] Test interactive states
- [ ] Verify hover effects

**Files to modify**:
- `/quartz-custom/styles/_overrides.scss`

**Estimated time**: 1.5 hours

---

### Phase 3: Additional Overrides (Low Priority)

> **Note**: All Phase 3 enhancements will be added to `quartz-custom/styles/_overrides.scss`

#### 3.1 Popover Styling Override
**CSS Overrides**:
```scss
// Popover Iceberg styling
.popover {
  background: var(--bg-secondary);
  border: 1px solid var(--iceberg-comment-dark);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  :root[saved-theme="dark"] & {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
}
```

**Tasks**:
- [ ] Add popover overrides
- [ ] Test popover appearance

**Estimated time**: 30 minutes

---

#### 3.2 Breadcrumbs Enhancement Override
**CSS Overrides**:
```scss
// Breadcrumbs Iceberg styling
.breadcrumb-container {
  a {
    color: var(--secondary);

    &:hover {
      color: var(--iceberg-cyan);
    }
  }

  .breadcrumb-separator {
    color: var(--textMuted);
  }
}
```

**Tasks**:
- [ ] Add breadcrumbs overrides
- [ ] Test navigation

**Estimated time**: 30 minutes

---

#### 3.3 Table of Contents Override
**CSS Overrides**:
```scss
// TOC Iceberg styling
.toc {
  a {
    &.active {
      color: var(--iceberg-blue);
      background: var(--highlight);
    }

    &:hover {
      color: var(--iceberg-cyan);
    }
  }
}
```

**Tasks**:
- [ ] Add TOC overrides
- [ ] Test scrolling behavior

**Estimated time**: 30 minutes

---

### Phase 4: Documentation & Testing (Essential)

#### 4.1 Create Example Content
**Location**: `content/digital-garden/`

**Create test pages**:
- [ ] Code samples showcase (all languages)
- [ ] Callouts/admonitions examples
- [ ] Typography scale examples
- [ ] Interactive elements demo
- [ ] Theme comparison page

**Files to create**:
- `/content/digital-garden/theme-showcase.md`
- `/content/digital-garden/syntax-examples.md`

**Estimated time**: 2 hours

---

#### 4.2 Testing Checklist

**Visual Testing**:
- [ ] Dark mode displays correctly
- [ ] Light mode displays correctly
- [ ] Theme toggle transitions smoothly
- [ ] All text readable in both modes
- [ ] Links distinguishable from text
- [ ] Code blocks styled properly
- [ ] Inline code has visible background
- [ ] Images appropriate in both themes
- [ ] Selection highlight visible

**Functional Testing**:
- [ ] Theme preference persists on refresh
- [ ] Theme preference persists across pages
- [ ] No console errors during theme switch
- [ ] Transitions are smooth (not jarring)
- [ ] No FOUC (Flash of Unstyled Content)

**Accessibility Testing**:
- [ ] All text meets WCAG AA contrast (4.5:1)
- [ ] Headings ideally meet WCAG AAA (7:1)
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader friendly
- [ ] Reduced motion respected

**Cross-Browser Testing**:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Performance Testing**:
- [ ] No layout shift during theme load
- [ ] Font loading doesn't cause FOUT
- [ ] CSS is minified in production
- [ ] No unused CSS

**Estimated time**: 3-4 hours

---

## File Change Summary

> **🎯 All changes in `quartz-custom/` directory only - NO modifications to `quartz/`**

### Files to Create

| Priority | File Path | Purpose | Estimated LOC | Notes |
|----------|-----------|---------|---------------|-------|
| **HIGH** | `quartz-custom/styles/_variables.scss` | Iceberg color variables | ~50 | New file |
| **HIGH** | `quartz-custom/styles/iceberg.scss` | Main Iceberg enhancements | ~150 | New file |
| **HIGH** | `quartz-custom/styles/_overrides.scss` | Quartz component overrides | ~200 | New file |
| MEDIUM | `quartz-custom/themes/iceberg-dark.json` | Custom syntax theme | ~100 | Optional |
| MEDIUM | `quartz-custom/themes/iceberg-light.json` | Custom syntax theme | ~100 | Optional |
| LOW | `content/digital-garden/theme-showcase.md` | Documentation | ~200 | Testing |
| LOW | `content/digital-garden/syntax-examples.md` | Testing | ~150 | Testing |

### Files to Modify

| Priority | File Path | Type | Estimated LOC | Notes |
|----------|-----------|------|---------------|-------|
| **HIGH** | `quartz.config.ts` | Config | ±10 | Syntax theme only |
| **HIGH** | `quartz-custom/components/styles/footer.scss` | Audit | ±20 | Existing file |
| **HIGH** | `quartz-custom/components/styles/contentMeta.scss` | Audit | ±20 | Existing file |
| MEDIUM | `quartz-custom/components/styles/image-grid.inline.scss` | Audit | ±10 | Existing file |
| MEDIUM | `quartz-custom/components/styles/image-zoom.inline.scss` | Audit | ±10 | Existing file |

### How to Load Custom Styles

You'll need to import the custom Iceberg styles. This can be done in one of these ways:

**Option A**: Import in a custom component (Recommended)
```typescript
// quartz-custom/components/Head.tsx or similar
import "../styles/iceberg.scss"
```

**Option B**: Import in existing component style
```scss
// quartz-custom/components/styles/footer.scss (or any existing style file)
@use "../../styles/iceberg.scss";
```

**Option C**: Create a custom emitter that includes the styles

---

## Detailed Implementation Strategy

### Strategy 1: Incremental Enhancement (Recommended)

**Approach**: Implement changes incrementally, testing after each phase.

**Pros**:
- Less risk of breaking existing functionality
- Can deploy improvements gradually
- Easier to identify issues
- Can pause at any phase

**Cons**:
- Takes longer overall
- Multiple testing cycles

**Recommended order**:
1. Phase 1.1 (Custom styles) → Deploy → Test
2. Phase 1.2 (Syntax highlighting) → Deploy → Test
3. Phase 1.3 (Custom components) → Deploy → Test
4. Phase 2 (Enhanced components) → Deploy → Test
5. Phase 3 (Polish) → Deploy → Test

---

### Strategy 2: All-At-Once (Fast but Risky)

**Approach**: Implement all changes in a feature branch, test thoroughly, then merge.

**Pros**:
- Single testing cycle
- One deployment
- Consistent rollout

**Cons**:
- Higher risk
- Harder to debug issues
- Longer delay before any improvements ship

**Recommended for**: If you have a staging environment and can do thorough testing before production.

---

## Risk Assessment

### Low Risk Changes ✅
- Creating new files in `quartz-custom/styles/` (won't affect existing styles)
- Creating new theme showcase pages
- Auditing and enhancing existing custom component styles
- CSS overrides (can be disabled easily)

### Medium Risk Changes ⚠️
- Modifying syntax highlighting theme in `quartz.config.ts` (visual change)
- CSS overrides affecting Quartz components (may need specificity adjustments)
- Callout color overrides (affects existing content appearance)

### High Risk Changes ❌
- **NONE** - We're not modifying any `quartz/` files, so no risk of breaking core functionality or losing changes during updates

---

## Rollback Strategy

If issues arise after deployment:

1. **Quick Fix Available**:
   - Fix the issue immediately
   - Deploy hotfix

2. **Complex Issue**:
   - Revert the problematic commit
   - Investigate offline
   - Re-deploy when fixed

3. **Emergency**:
   - Revert entire theme change
   - Use previous color scheme temporarily

**Git Strategy**:
```bash
# Create feature branch
git checkout -b feature/iceberg-enhancements

# Work on changes with atomic commits
git commit -m "feat: add Iceberg custom styles to custom.scss"
git commit -m "feat: update syntax highlighting to Iceberg theme"
git commit -m "style: enhance custom component colors"

# Merge when ready
git checkout main
git merge feature/iceberg-enhancements
```

---

## Success Criteria

### Must Have
- [ ] All text readable in both light and dark modes
- [ ] Theme toggle works smoothly
- [ ] No visual regressions
- [ ] Passes WCAG AA accessibility
- [ ] No console errors
- [ ] Works on all major browsers

### Should Have
- [ ] Custom syntax highlighting with Iceberg colors
- [ ] Enhanced code blocks with terminal style
- [ ] Consistent tag and button styling
- [ ] Smooth theme transitions
- [ ] Proper callout colors

### Nice to Have
- [ ] Theme showcase documentation page
- [ ] Comprehensive syntax examples
- [ ] Perfect Iceberg color matching across all components
- [ ] Custom scrollbar styling
- [ ] Enhanced hover animations

---

## Timeline Estimate

### Minimum Viable Enhancement (Phase 1 only)
- **Duration**: 1-2 days
- **Effort**: 8-12 hours
- **Includes**: Core enhancements, syntax highlighting, custom components

### Full Implementation (All Phases)
- **Duration**: 3-5 days
- **Effort**: 20-25 hours
- **Includes**: All enhancements, testing, documentation

### With Testing & Documentation
- **Duration**: 5-7 days
- **Effort**: 30-35 hours
- **Includes**: Everything + thorough testing + showcase pages

---

## Next Steps

### Immediate Actions
1. ✅ Create this planning document
2. ⏳ Review and approve plan
3. ⏳ Decide on implementation strategy (Incremental vs All-at-once)
4. ⏳ Create feature branch
5. ⏳ Start with Phase 1.1 (custom.scss enhancements)

### Viewing Progress
After building with `npm run quartz build`, you can view the current implementation progress at:
- **Local URL**: https://brain.localhost/
- Use browser MCP to navigate and inspect the theme changes
- Verify Iceberg colors, syntax highlighting, and component styling in both light and dark modes

### Before Starting
- [ ] Backup current theme configuration
- [ ] Set up local testing environment
- [ ] Prepare test content for validation
- [ ] Review documentation (state.md, theme-guide.md)

---

## Questions to Answer

1. **Syntax Highlighting**: Option A (use existing similar theme) or Option B (create custom)?
   - **Recommendation**: Start with Option A, upgrade to Option B if needed

2. **Implementation Strategy**: Incremental or All-at-once?
   - **Recommendation**: Incremental (safer, easier to test)

3. **Deployment**: Should we deploy after each phase or at the end?
   - **Recommendation**: Deploy after each major phase for user feedback

4. **Documentation**: Create showcase pages now or later?
   - **Recommendation**: Create basic showcase in Phase 1, enhance in Phase 4

---

## References

- [state.md](../../../docs/state.md) - Theme state management guide
- [theme-guide.md](../../../docs/theme-guide.md) - Complete Iceberg implementation guide
- [quartz.config.ts](../../../quartz.config.ts) - Current theme configuration
- [Iceberg Vim Theme](https://github.com/cocopon/iceberg.vim) - Original inspiration
- [Shiki Themes](https://github.com/shikijs/shiki/tree/main/packages/shiki/themes) - Available syntax themes

---

## Appendix A: Iceberg Color Reference

Quick reference for implementation:

```scss
// Dark Mode
--iceberg-bg-dark: #161821
--iceberg-bg-dark-alt: #1e2132
--iceberg-fg-dark: #c6c8d1
--iceberg-comment-dark: #6b7089
--iceberg-selection-dark: #272c42

// Light Mode
--iceberg-bg-light: #e8e9ec
--iceberg-bg-light-alt: #d2d4de
--iceberg-fg-light: #33374c
--iceberg-comment-light: #8389a3
--iceberg-selection-light: #c0c5ce

// Accents (universal)
--iceberg-blue: #84a0c6
--iceberg-cyan: #89b8c2
--iceberg-green: #b4be82
--iceberg-yellow: #e2a478
--iceberg-orange: #c9a085
--iceberg-red: #e27878
--iceberg-purple: #a093c7
```

---

## Appendix B: Quick Win Optimizations

If time is limited, focus on these high-impact, low-effort changes:

### 1. Create Minimal `quartz-custom/styles/iceberg.scss` (30 minutes)

Create directory and file:
```bash
mkdir -p quartz-custom/styles
touch quartz-custom/styles/iceberg.scss
```

Add minimal enhancements:
```scss
// Minimal Iceberg enhancements
:root {
  --iceberg-blue: #84a0c6;
  --iceberg-cyan: #89b8c2;
  --iceberg-bg-dark: #161821;
  --iceberg-selection-dark: #272c42;
}

// Enhanced code blocks
pre {
  background: var(--iceberg-bg-dark) !important;
  border: 1px solid var(--iceberg-selection-dark);
}

// Better selection
::selection {
  background: var(--highlight);
  color: var(--darkgray);
}

// Enhanced links
a:hover {
  color: var(--iceberg-cyan);
  transition: color 0.2s ease;
}
```

### 2. Import in Existing Component (10 minutes)

Add to `quartz-custom/components/styles/footer.scss`:
```scss
@use "../../styles/iceberg.scss";

// existing footer styles...
```

### 3. Update Syntax Theme (5 minutes)
Change `quartz.config.ts` line 66 to:
```typescript
dark: "nord",  // or "github-dark-dimmed"
```

### 4. Test Both Themes (15 minutes)
Quick visual check in light and dark modes.

**Total Quick Win Time**: ~1 hour for noticeable improvement!

**Benefits**:
- ✅ All changes in `quartz-custom/` - safe from updates
- ✅ Easy to disable (just remove the import)
- ✅ Can expand incrementally later

---

*This plan is a living document and should be updated as implementation progresses.*

---

**Status**: 📋 Planning Complete - Ready for Review
**Created**: 2025-10-12
**Last Updated**: 2025-10-12
**Author**: Claude (with human review required)
