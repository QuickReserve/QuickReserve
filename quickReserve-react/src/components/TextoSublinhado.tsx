import { ReactNode } from 'react'
import '../components/TextoSublinhado.scss'

interface TextoSublinhadoProps {
  children: ReactNode
}

export function TextoSublinhado({ children }: TextoSublinhadoProps) {
  return <h1 className={'texto-sublinhado'}>{children}</h1>
}
