export function parseFrontmatter(raw: string): { frontmatter: Record<string, any>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { frontmatter: {}, body: raw.trim() }

  const frontmatter: Record<string, any> = {}
  for (const line of match[1]!.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    let value: any = line.slice(colonIdx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    } else if (value === 'true') {
      value = true
    } else if (value === 'false') {
      value = false
    } else if (value !== '' && !isNaN(Number(value))) {
      value = Number(value)
    }
    frontmatter[key] = value
  }

  return { frontmatter, body: match[2]!.trim() }
}

export function buildMarkdown(
  title: string,
  slug: string,
  year: number,
  draft: boolean,
  content: string
): string {
  const safeTitle = title.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return `---\ntitle: "${safeTitle}"\nslug: "${slug}"\nyear: ${year}\ndraft: ${draft}\n---\n\n${content}`
}

export function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
