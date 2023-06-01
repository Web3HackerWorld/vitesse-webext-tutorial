<script setup lang="ts">
import { onMessage, sendMessage } from 'webext-bridge/popup'
import { currentTabId, storageDemo } from '~/logic/storage'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

const count = ref(0)
onMessage('content-scipt=>popup', async (msg) => {
  // eslint-disable-next-line no-console
  console.log('====> content-scipt=>popup msg :', msg)
  count.value = msg.data.count
  return { cool: 'Got you! I am cool from popup' }
})

const sendMessageToContentScript = async () => {
  console.log('====> currentTabId.value :', currentTabId.value)
  const rz = await sendMessage('content-scipt<=popup', {
    time: new Date(),
  }, `content-script@${currentTabId.value}`)
  // eslint-disable-next-line no-console
  console.log('====> response from content-sciript', rz)
}
</script>

<template>
  <main class="text-center py-5 px-4 text-gray-700 w-[300px]">
    <Logo />
    <div>Popup</div>
    <SharedSubtitle />
    currentTabId {{ currentTabId }} <br >
    count from content-script: {{ count }}
    <button class="mt-2 btn" @click="sendMessageToContentScript">
      content-scipt&lt;= popup
    </button>
    <button class="mt-2 btn" @click="openOptionsPage">
      Open Options
    </button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div>
  </main>
</template>
