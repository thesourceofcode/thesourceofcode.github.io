(function () {
  const form = document.getElementById("credit-card-unlock");
  const content = document.querySelector("section.page__content");
  if (!form || !content) return;

  const decode = (value) => Uint8Array.from(atob(value), (character) => character.charCodeAt(0));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = form.elements.password.value;
    const message = document.getElementById("credit-card-unlock-message");
    const button = form.querySelector("button");
    button.disabled = true;
    message.textContent = "Unlocking…";

    try {
      const response = await fetch(form.dataset.contentUrl);
      if (!response.ok) throw new Error("The article could not be loaded.");
      const payload = await response.json();
      const passwordKey = await crypto.subtle.importKey(
        "raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]
      );
      const key = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: decode(payload.salt), iterations: 250000, hash: "SHA-256" },
        passwordKey, { name: "AES-GCM", length: 256 }, false, ["decrypt"]
      );
      const html = new TextDecoder().decode(await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: decode(payload.iv) }, key, decode(payload.data)
      ));

      content.innerHTML = html;
      document.body.classList.add("credit-card-unlocked");
      if (window.jQuery) {
        const images = window.jQuery(content).find("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']").has("> img");
        images.addClass("image-popup");
        if (window.jQuery.fn.magnificPopup) images.magnificPopup({ type: "image", gallery: { enabled: true } });
        if (window.jQuery.fn.fitVids) window.jQuery(content).fitVids();
      }
      if (window.Gumshoe && content.querySelector("nav.toc")) {
        new window.Gumshoe("nav.toc a", { offset: 20, reflow: true, navClass: "active", contentClass: "active" });
      }
      const diagrams = content.querySelectorAll("pre code.language-mermaid");
      if (diagrams.length) {
        const mermaid = (await import("https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs")).default;
        mermaid.initialize({ startOnLoad: false, theme: "dark" });
        diagrams.forEach((code) => {
          const diagram = document.createElement("div");
          diagram.className = "mermaid";
          diagram.textContent = code.textContent;
          code.closest("pre").replaceWith(diagram);
        });
        await mermaid.run({ querySelector: ".mermaid" });
      }
    } catch (error) {
      message.textContent = error.name === "OperationError" ? "Incorrect password." : "Could not unlock the article. Please try again.";
      button.disabled = false;
    }
  });
})();
