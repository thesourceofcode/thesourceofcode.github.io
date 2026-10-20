---
layout: single
title: "The Credit Card Chronology"
excerpt: "Work in progress"
toc: false
noindex: true
sitemap: false
credit_card_locked: true
tags:
  - Money
  - Payments
  - Credit Cards
---

<form id="credit-card-unlock" data-content-url="{{ '/assets/data/credit-card-chronology.json' | relative_url }}">
  <label for="credit-card-password">Password</label>
  <input id="credit-card-password" name="password" type="password" autocomplete="off" required>
  <button class="btn btn--primary" type="submit">Unlock</button>
  <p id="credit-card-unlock-message" role="status" aria-live="polite"></p>
</form>

<script src="{{ '/assets/js/credit-card-unlock.js' | relative_url }}" defer></script>
