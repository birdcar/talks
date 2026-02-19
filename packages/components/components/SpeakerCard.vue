<template>
  <div class="speaker-card">
    <div class="speaker-avatar">
      <img v-if="avatar" :src="avatar" :alt="name" class="avatar-img" />
      <div v-else class="avatar-initials">{{ initials }}</div>
    </div>
    <div class="speaker-info">
      <div class="speaker-name">{{ name }}</div>
      <div v-if="title" class="speaker-title">{{ title }}</div>
      <div v-if="company" class="speaker-company">{{ company }}</div>
      <div v-if="links && Object.keys(links).length" class="speaker-links">
        <a v-for="(handle, platform) in links" :key="platform" :href="linkUrl(platform as string, handle)" target="_blank" class="speaker-link">
          {{ platform }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  title?: string
  company?: string
  avatar?: string
  links?: Record<string, string>
}>()

const initials = computed(() =>
  props.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
)

function linkUrl(platform: string, handle: string): string {
  const urls: Record<string, string> = {
    github: `https://github.com/${handle}`,
    twitter: `https://twitter.com/${handle}`,
    linkedin: `https://linkedin.com/in/${handle}`,
    website: handle.startsWith('http') ? handle : `https://${handle}`,
  }
  return urls[platform] || handle
}
</script>

<style scoped>
.speaker-card {
  display: flex;
  align-items: center;
  gap: var(--space-4, 24px);
  padding: var(--space-4, 24px);
  background: hsl(var(--brand-primary-h, 230), 20%, 14%);
  border-radius: 8px;
  border: 1px solid hsl(var(--brand-primary-h, 230), 15%, 22%);
}

.speaker-avatar {
  flex-shrink: 0;
}

.avatar-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-initials {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--brand-accent, #e89d0e);
  color: var(--slide-bg, #1a1a2e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display, sans-serif);
  font-weight: 700;
  font-size: 1.2rem;
}

.speaker-name {
  font-family: var(--font-display, sans-serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary, #e0e0e0);
}

.speaker-title {
  font-size: 0.9rem;
  color: var(--text-secondary, #888);
  margin-top: 2px;
}

.speaker-company {
  font-size: 0.85rem;
  color: var(--text-accent, #e89d0e);
  margin-top: 2px;
}

.speaker-links {
  display: flex;
  gap: var(--space-3, 16px);
  margin-top: var(--space-2, 8px);
}

.speaker-link {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  color: var(--text-secondary, #888);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.speaker-link:hover {
  color: var(--brand-accent-light, #f0b060);
  border-bottom-color: var(--brand-accent-light, #f0b060);
}
</style>
