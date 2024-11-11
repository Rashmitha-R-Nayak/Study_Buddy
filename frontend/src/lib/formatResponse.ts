import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export function formatAnswer(text: string): string {
  let formattedText = text.replace(
    /\*\*(.*?)\*\*/g,
    (_, content) => `<strong>${content}</strong>`
  );
  formattedText = formattedText.replace(
    /\*(.*?)\*/g,
    (_, content) => `<em>${content}</em>`
  );
  formattedText = formattedText.replace(
    /`(.*?)`/g,
    (_, content) => `<code>${content}</code>`
  );
  formattedText = formattedText.replace(
    /```(\w+)?\n([\s\S]*?)\n```/g,
    (_, lang = "plaintext", code) =>
      `<pre><code class="${lang}">${escapeHtml(code)}</code></pre>`
  );
  formattedText = formattedText.replace(/\n/g, "<br>");
  return formattedText;
}

function escapeHtml(text: string): string {
  const escapeMap: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => escapeMap[char]);
}

export function highlightCode(html: string): string {
  return html.replace(
    /<pre><code class='(\w+)'>([\s\S]*?)<\/code><\/pre>/g,
    (_, language, code) => {
      const languageToHighlight = hljs.getLanguage(language)
        ? language
        : "plaintext";
      const highlightedCode = hljs.highlight(code, {
        language: languageToHighlight,
      }).value;
      return `<pre><code class="${languageToHighlight}">${highlightedCode}</code></pre>`;
    }
  );
}
