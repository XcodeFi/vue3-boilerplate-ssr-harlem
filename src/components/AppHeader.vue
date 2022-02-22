<template>
  <header>
    <div class="main-header">
      <div class="search-bar">
        <svg
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
          class="search-bar__search-icon"
        >
          <g fill-rule="evenodd">
            <path
              d="M6.5 12C9.537 12 12 9.537 12 6.5S9.537 1 6.5 1 1 3.463 1 6.5 3.463 12 6.5 12z"
            />
            <path
              d="M10.69873047 10.76025391L13 13"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
        <input
          class="search-bar__search-input"
          type="search"
          name="search"
          autocomplete="off"
        >
      </div>
      <div class="control-icon">
        <div class="navbar-icon-cart">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            width="24"
            height="24"
            color="currentColor"
            class="navbar-icon-cart__icon"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 2.75h3.713l4.065 14.453a.75.75 0 00.722.547H20a.75.75 0 00.721-.544l3-10.5A.75.75 0 0023 5.75H6.115L5.003 1.797 4.85 1.25H0v1.5zm9.068 13.5l-2.531-9h15.469l-2.572 9H9.068zM9.75 22a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zm9 0a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
              fill="currentColor"
            />
          </svg>
          <div class="navbar-icon-cart__count">
            12
          </div>
        </div>
        <div class="user-icon">
          <a
            class="_1FD9d-"
          ><svg
            viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
            class="GXALos"
            width="24"
            height="24"
          >
            <path
              d="M10.8166 17.0039531c-1.5729-1.03425-2.6166-2.8161-2.6166-4.82895v-2.1c0-3.17625 2.5977-5.775 5.775-5.775 3.17625 0 5.775 2.59875 5.775 5.775v2.1c0 2.016-1.04685 3.801-2.625 4.8342v-.0042l6.18975 2.667c.3864.1659.63525.546.63525.9639v2.5641c0 .5775-.4725 1.05-1.05 1.05H5.05c-.5775 0-1.05-.4725-1.05-1.05v-2.5641c0-.4179.24885-.798.6342-.9639l6.1908-2.667-.0084-.00105z"
              stroke="#FFF"
              stroke-width="1.5"
              fill="none"
              fill-rule="evenodd"
              stroke-linejoin="round"
            /></svg></a>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppHeader',
})
</script>

<style lang="scss">
.main-header {
  @apply relative w-full px-3;
  @apply bg-transparent;
  @apply flex content-center items-center;
  @apply h-14;
  @apply  py-2;
  @apply bg-green-500;
}

.search-bar {
  @apply bg-light-50 rounded-sm h-9;
  @apply flex flex-1 items-center;
  @apply mx-5;
  &__search-icon {
    stroke: rgba(0, 0, 0, 0.4);
    width: 0.875rem;
    height: 0.875rem;
    @apply block fill-transparent;
    @apply ml-2;
  }

  &__search-input {
    border: 0;
    @apply h-full w-full;
  }
}

.control-icon {
  @apply flex flex-row justify-between items-center flex-shrink-0;
  @apply text-light-50;
}

.navbar-icon-cart {
  @apply relative cursor-pointer;
  @apply flex items-center justify-center;
  &__count {
    @apply absolute right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold;
    @apply leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full;
    @apply border-transparent border-solid ring-2 ring-inset ring-light-50;
  }
}

.user-icon {
  @apply flex justify-center items-center ml-5;
}
</style>
