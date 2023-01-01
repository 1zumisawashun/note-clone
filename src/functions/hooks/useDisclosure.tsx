import { useState, useCallback } from 'react'

/**
 * 複数モーダルで使用する際は下記のように変数に格納する（具体例:productSummary.tsx）
 * const executeModal = useDisclosure();
 * const previewModal = useDisclosure();
 */

export const useDisclosure = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((state) => !state), [])

  return { isOpen, open, close, toggle }
}