<script setup lang="ts">
import 'uno.css'

import { onMessage, sendMessage } from 'webext-bridge/content-script'

const clickCount = ref(1)
const doContentScriptToBackground = async () => {
  const rz = await sendMessage('content-scipt=>background', {
    count: clickCount.value,
  }, 'background')
  clickCount.value++
  // eslint-disable-next-line no-console

  console.log('====> doContentScriptToBackground sendMessage rz :', rz)
}

onMessage('content-scipt<=background', async (msg) => {
  // eslint-disable-next-line no-console
  console.log('====> content-scipt<=background msg :', msg)
  return { cool: 'Got you! I am cool from content-script' }
})
</script>

<template>
  <div class="flex font-sans m-5 top-0 left-0 leading-1em z-100 fixed items-end select-none">
    <div
      class="bg-white rounded-lg h-min shadow w-max text-gray-800"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
    >
      <h1 class="text-lg">
        Vitesse WebExt
      </h1>
      <SharedSubtitle />
      <button @click="doContentScriptToBackground">
        content-scipt=>background
      </button>
    </div>
  </div>
</template>
