function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(value: string) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(
      /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" rel="noopener noreferrer" target="_blank">$1</a>',
    );
}

export function renderMarkdown(markdown: string) {
  const blocks = markdown.replace(/\r\n/g, "\n").split(/\n{2,}/);
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("### ")) return `<h3>${inline(trimmed.slice(4))}</h3>`;
      if (trimmed.startsWith("## ")) return `<h2>${inline(trimmed.slice(3))}</h2>`;
      if (trimmed.startsWith("# ")) return `<h2>${inline(trimmed.slice(2))}</h2>`;
      if (trimmed.startsWith("> ")) {
        return `<blockquote>${inline(trimmed.replace(/^> /gm, ""))}</blockquote>`;
      }
      if (/^(- |\d+\. )/.test(trimmed)) {
        const items = trimmed.split("\n").map((line) => `<li>${inline(line.replace(/^(- |\d+\. )/, ""))}</li>`);
        const tag = trimmed.startsWith("- ") ? "ul" : "ol";
        return `<${tag}>${items.join("")}</${tag}>`;
      }
      return `<p>${inline(trimmed.replace(/\n/g, " "))}</p>`;
    })
    .join("");
}
