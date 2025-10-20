# Install dependencies
deps:
    npm i

# Development server with auto-rebuild
dev:
  npx quartz build --serve

# Build the Quartz site
build:
    npx quartz build

# Sync content from private vault to public vault
sync:
    #!/usr/bin/env bash
    export BRAIN_VAULT="$HOME/Documents/brain/notes"
    export BRAIN_PUBLIC_VAULT="$HOME/projects/node/brain-public/content"
    node utils/content-sync/index.js

# Publish content and changes to git
publish:
    #!/usr/bin/env bash
    cd content && git add . && git commit -m "Update" && git push
    cd ..
    git add . && git commit -m "Update content" && git push

# Deploy: sync, build, and publish
deploy: sync build publish

# Update Quartz from upstream
quartz-update:
    #!/usr/bin/env bash
    rm -rf quartz docs/quartz package.json tsconfig.json globals.d.ts package-lock.json
    mkdir -p quartz docs/quartz
    cp -r ../quartz/quartz/* quartz
    cp -r ../quartz/docs/* docs/quartz
    cp -r ../quartz/package.json package.json
    cp -r ../quartz/tsconfig.json tsconfig.json
    cp -r ../quartz/globals.d.ts globals.d.ts
    cp -r ../quartz/index.d.ts index.d.ts
    cp -r ../quartz/package-lock.json package-lock.json
