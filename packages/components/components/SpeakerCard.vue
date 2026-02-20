<template>
  <div class="speaker-card">
    <div class="speaker-avatar">
      <img v-if="avatar" :src="avatar" :alt="name" class="avatar-img" />
      <div v-else class="avatar-initials">{{ initials }}</div>
    </div>
    <div class="speaker-info">
      <div class="speaker-name">{{ name }}</div>
      <div v-if="handle" class="speaker-handle">{{ handle }}</div>
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
  handle?: string
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
    bluesky: `https://bsky.app/profile/${handle}`,
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
  gap: var(--space-5);
  padding: var(--space-6);
  background: var(--slide-bg-raised);
  border-radius: 8px;
  border: 1px solid var(--border);
  max-width: 600px;
  margin: 0 auto;
}

.speaker-avatar {
  flex-shrink: 0;
}

.avatar-img {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-initials {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--ctp-crust);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
}

.speaker-name {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
}

.speaker-handle {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.speaker-title {
  font-size: 1.15rem;
  color: var(--text-secondary);
  margin-top: var(--space-2);
}

.speaker-company {
  font-size: 1.05rem;
  color: var(--accent);
  margin-top: 2px;
}

.speaker-links {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-3);
}

.speaker-link {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--text-muted);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.speaker-link:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
</style>
