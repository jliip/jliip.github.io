<template>
  <div class="sidebar-avatar">
    <img src="/avatar.png" alt="Avatar" />
    <div class="sidebar-avatar__name">jliip</div>
    <div class="sidebar-avatar__title">Just having fun</div>
    <div class="sidebar-avatar__bio"> I would like to share the things I do and learn in this space.</div>
  </div>
</template>

<style scoped>
.sidebar-avatar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 120px 8px 8px;
  margin-top: auto;
  position: sticky;
  bottom: 12px;
}

.sidebar-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
}

.sidebar-avatar__name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  letter-spacing: 0.01em;
}

.sidebar-avatar__title {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.sidebar-avatar__bio {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
</style>
