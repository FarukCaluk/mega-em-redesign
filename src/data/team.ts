import content from './generated/content.json'

export interface TeamMember {
  name: string
  role: string
  phone?: string
  email?: string
}

export interface Department {
  id: string
  label: string
  members: TeamMember[]
}

export const departments = content.team as Department[]
