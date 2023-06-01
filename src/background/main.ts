import { onMessage, sendMessage } from 'webext-bridge/background'
import { currentTabId } from '~/logic/storage'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  currentTabId.value = tabId
})

onMessage('content-scipt=>background', async (msg) => {
  // eslint-disable-next-line no-console
  console.log('====> msg :', msg)
  const keys = Object.keys(msg)
  const { sender, data } = msg
  // eslint-disable-next-line no-console
  console.log('====> keys, sender, data :', keys, sender, data)

  const rz = await sendMessage('content-scipt<=background', {
    time: new Date(),
  }, `content-script@${currentTabId.value}`)
  // eslint-disable-next-line no-console
  console.log('====> response from content-sciript', rz)

  return { yaha: 'hoho' }
})

onMessage('background<=popup', async (msg) => {
  // eslint-disable-next-line no-console
  console.log('====> msg :', msg)
  const keys = Object.keys(msg)
  const { sender, data } = msg
  // eslint-disable-next-line no-console
  console.log('====> keys, sender, data :', keys, sender, data)

  const rz = await sendMessage('background=>popup', {
    time: new Date(),
  }, 'popup')
  // eslint-disable-next-line no-console
  console.log('====> response from popup', rz)

  return { yoho: 'huhu' }
})
