# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Quartz v4**, a static site generator for publishing digital gardens and notes as websites. It transforms Markdown files into a fully-featured website with features like graph view, backlinks, search, and more. The project is built with TypeScript and uses a plugin-based architecture.

This is a fork/customization with custom plugins and components in `quartz-custom/`.

## Common Commands

### Development
```bash
npm run quartz build           # Build the site once
npm run quartz build --serve   # Build and serve with live reload
npm run quartz build -- --serve -d content  # Specify content directory
npm run docs                   # Build and serve docs directory
```

### Quality Checks
```bash
npm run check                  # Type check and format check
npm run format                 # Format code with Prettier
npm test                       # Run tests with tsx
```

### Other Commands
```bash
npm run quartz create          # Initialize new Quartz site
npm run quartz update          # Get latest Quartz updates
npm run quartz sync            # Sync to/from GitHub
```

## Architecture

### Core Build Pipeline

The build process follows a three-stage pipeline defined in `quartz/build.ts`:

1. **Parse** (`quartz/processors/parse.ts`): Markdown files → AST
   - Uses `unified`, `remark-parse`, and `remark-rehype`
   - Supports parallel processing with worker pools
   - Applies transformer plugins to MD AST and HTML AST

2. **Filter** (`quartz/processors/filter.ts`): Remove unpublishable content
   - Applies filter plugins (e.g., RemoveDrafts)

3. **Emit** (`quartz/processors/emit.ts`): Generate output files
   - Emitter plugins generate HTML, assets, indexes, etc.
   - Supports incremental rebuilds with `partialEmit`

### Plugin System

Three plugin types defined in `quartz/plugins/types.ts`:

- **Transformers**: Process Markdown/HTML AST (e.g., syntax highlighting, LaTeX, link crawling)
- **Filters**: Determine if content should be published
- **Emitters**: Generate output files (HTML pages, assets, indexes, etc.)

Built-in plugins are in `quartz/plugins/`, custom plugins in `quartz-custom/plugins/`.

### Component System

React-like components using Preact (`quartz/components/`):
- Type definition: `QuartzComponent` in `quartz/components/types.ts`
- Components can include CSS, client-side scripts (beforeDOMLoaded/afterDOMLoaded)
- Layout is configurable via `FullPageLayout` interface in `quartz/cfg.ts`
- Custom components in `quartz-custom/components/`

### Configuration

Main config file: `quartz.config.ts`
- Exports a `QuartzConfig` object with `configuration` and `plugins`
- `configuration`: Global settings (title, theme, analytics, locale, etc.)
- `plugins`: Lists of transformers, filters, and emitters to use

Type definition: `quartz/cfg.ts`

### File Watching & Hot Reload

`quartz/build.ts` includes watch mode using `chokidar`:
- Tracks content changes (add/change/delete)
- Incremental rebuilds using contentMap and changeEvents
- WebSocket-based client refresh

### Custom Extensions

This fork includes custom plugins:
- `quartz-custom/plugins/transformers/removeTags.ts`: Remove specific tags
- `quartz-custom/plugins/transformers/img.ts`: Image processing
- `quartz-custom/plugins/emitters/static.ts`: Custom static file handling
- Support utilities in `quartz-custom/utils/`

## Key Files

- `quartz/bootstrap-cli.mjs`: CLI entry point
- `quartz/build.ts`: Core build logic and file watching
- `quartz/cfg.ts`: Configuration type definitions
- `quartz.config.ts`: User configuration file
- `quartz/processors/`: Parse, filter, emit pipeline
- `quartz/plugins/`: Built-in plugin implementations
- `quartz/components/`: UI component library
- `quartz-custom/`: Custom plugins and components for this fork

## Development Notes

- Node >= 22, npm >= 10.9.2 required
- TypeScript with strict mode enabled
- Uses Preact for components (JSX with `jsxImportSource: "preact"`)
- Worker pool for parallel Markdown parsing
- Incremental builds track changes via `ContentMap` and `ChangeEvent`
