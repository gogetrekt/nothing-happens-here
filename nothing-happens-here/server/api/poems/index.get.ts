import { getAllPoems } from '../../utils/db'

export default defineEventHandler(async () => {
  return getAllPoems()
})
