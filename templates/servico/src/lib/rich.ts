// Transforma os destaques simples do site.config.ts em HTML:
//   **texto**  -> negrito branco
//   *texto*    -> itálico em serifa
// O atributo data-k marca o trecho como "palavra-chave" para o efeito de
// acender palavra por palavra (src/scripts/word-reveal.ts).
export function rich(text: string): string {
  const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return safe
    .replace(/\*\*(.+?)\*\*/g, '<strong data-k>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em data-k>$1</em>');
}
