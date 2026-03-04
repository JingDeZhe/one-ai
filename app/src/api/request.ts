import ky from 'ky'

export const request = ky.extend({
  prefixUrl: `/api`,
})
