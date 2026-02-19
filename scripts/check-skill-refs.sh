#!/usr/bin/env bash
# Check if component, layout, or theme files changed without corresponding
# skill reference updates. Used by the Claude Code Stop hook.

set -euo pipefail

REPO_ROOT="$(git -C "$(dirname "$0")/.." rev-parse --show-toplevel 2>/dev/null || echo "$(dirname "$0")/..")"
cd "$REPO_ROOT"

# Collect all changed files (staged + unstaged + untracked)
changed_files=$(
  {
    git diff --name-only 2>/dev/null
    git diff --cached --name-only 2>/dev/null
    git ls-files --others --exclude-standard 2>/dev/null
  } | sort -u
)

[ -z "$changed_files" ] && exit 0

# Track which references might be stale
stale_refs=()

# Components changed → components.md may need update
if echo "$changed_files" | grep -q "^packages/components/components/"; then
  if ! echo "$changed_files" | grep -q "skills/new-talk/references/components.md"; then
    stale_refs+=("components.md (component files changed)")
  fi
fi

# Layouts changed → slidev-syntax.md may need update
if echo "$changed_files" | grep -q "^packages/theme/layouts/"; then
  if ! echo "$changed_files" | grep -q "skills/new-talk/references/slidev-syntax.md"; then
    stale_refs+=("slidev-syntax.md (layout files changed)")
  fi
fi

# Variant system changed → theme-variants.md may need update
if echo "$changed_files" | grep -q -E "^packages/theme/(styles/variants\.css|global-bottom\.vue)"; then
  if ! echo "$changed_files" | grep -q "skills/new-talk/references/theme-variants.md"; then
    stale_refs+=("theme-variants.md (variant system changed)")
  fi
fi

# Theme styles changed → design-guide.md may need update
if echo "$changed_files" | grep -q "^packages/theme/styles/"; then
  if ! echo "$changed_files" | grep -q "skills/new-talk/references/design-guide.md"; then
    stale_refs+=("design-guide.md (theme styles changed)")
  fi
fi

if [ ${#stale_refs[@]} -gt 0 ]; then
  echo "SKILL REFERENCES MAY BE STALE"
  echo ""
  echo "The following reference docs may need updating:"
  for ref in "${stale_refs[@]}"; do
    echo "  - .claude/skills/new-talk/references/$ref"
  done
  echo ""
  echo "Run /update-refs to regenerate, or update manually."
fi
