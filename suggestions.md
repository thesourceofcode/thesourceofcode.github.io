# Critique & Suggestions — "Payments 101: The Credit Card Chronology"

Reviewed draft: `_posts/2026-05-15-payments-101-credit-card-chronology.md` (960 lines, ~12,400 words ≈ 50–60 min read). Line numbers refer to that version of the file and will drift as you edit.

---

## The short version

The bones of this post are excellent. The archival imagery — 1877 newspaper clippings, the 1912 Western Union card, the Wanamaker revolving-credit ad, launch ads for Charg-It, Diners Club, BankAmericard, Amex, and Master Charge — is genuinely differentiating. Most published credit-card histories recycle the same three myths; you have receipts.

Three things stand between this draft and publishable:

1. **Unfinished scaffolding** — placeholder headings, raw research notes, an empty section, and a literal "hey" in the middle of the post.
2. **Unassimilated source text** — long passages pasted verbatim from an external history (with PDF line-break artifacts intact), which is both an attribution problem and a voice problem.
3. **A cluster of factual errors**, several in the modern sections where your fintech readership is most expert (EMV cryptography, India's first credit card, contactless limits, TILA).

And one big structural opportunity: the "A transaction in 19XX" walkthroughs and the "Familiar Feature" boxes are your signature devices. Make them the spine of the post, and end with **"A credit card transaction in 2026"** that pays off the 200-millisecond tap from your intro. Right now the post just stops.

---

## What's working — protect these

- **Primary sources over folklore.** The 1877 *Ottawa Weekly Republic* find, the 1912 collect card, the 1938 Wanamaker ad, the Newsday Charg-It clippings. Consider explicitly myth-busting where your evidence beats the standard story — e.g., nearly every pop history claims Western Union issued metal charge cards in **1914**; your 1912 paper card and 1913 news article are better evidence than the myth. Say so.
- **The "Familiar Feature" device** (account number, signature, embossing) — the connective tissue between 1900 and now. See structure §8 for how to extend it.
- **The transaction walkthroughs** (1950 at line 679, 1958 at line 819) — the most instructive passages in the post.
- **The asides.** The carbon-paper love story (line 825) is the best paragraph in the piece. The cross-civilization pattern aside (line 214) is the thesis of the whole ancient section in five sentences.
- **The Systemantics epigraph** — currently set up and never paid off. Echo it in a conclusion.
- **India texture** — the kirana ledger, the Diners Club India merchant page, RuPay/UPI. No Western history of cards has this perspective. Lean in (and see the factual fix on India's first credit card below).

---

## P0 — Draft scaffolding to finish or cut

| Line | What's there | Action |
|---|---|---|
| 238 | `## Medieval evolution of credit` — empty section | Write it or cut it (see structure §2) |
| 563–571 | Orphan paragraphs (Franklin National, WWII wallet, "All of these early versions…") stranded inside the Airlines section | Rehome into "Universal Payment Card" intro |
| 679 | `**A charge card transaction in 1950**` bold text posing as a heading | Make it `###` so it joins the 1958 walkthrough in the sticky TOC |
| 782 | "t wasn't until the 1960s…" — truncated sentence, orphan paragraph | Fix and rehome (also contradicts line 777 — see errors §8) |
| 784 | `## 1965:` — date-only heading over raw pasted text | Fold into the Amex section as prose |
| 811 | "Now we'll see how credit card payments evolved with time, using new innovations…" — dangling modifier ("using" attaches to *payments*) | Rephrase |
| 816 | `hey` | Remove 🙂 |
| 852 | `## 1983:` — Verifone note fragment | Fold into transactions-evolution narrative |
| 855 | `## tele transactions` — lowercase heading, tangent section | Rewrite or cut (see verify list, SS7) |
| 869 | "1969: Get your money now!" — stray note | Remove; see structure §7 for the ATM ordering fix |
| 888–890 | "1984 (Rewards Programs): …" / "1991 amex launches firsst credit card loyalty program" — raw notes with typos | Write a proper Rewards paragraph (Diners Club Club Rewards 1984; Amex Membership Miles 1991 → renamed Membership Rewards 1995; Discover cashback 1986) |
| 906–908 | "Barclays and orange launched first contactless credit card" / "Mastercard key credit card small" — raw notes | Note: these conflate two things — Barclaycard **OnePulse** (2007) was the UK's first contactless credit card; the Orange partnership was **Quick Tap** (2011), the UK's first contactless *phone* payments. US timeline: MasterCard PayPass trial 2003, Amex ExpressPay 2005 |
| 911 | "2007: Cards get personal and a little more futuristic" — note-style pseudo-heading in body text | Rewrite as prose (and verify the claims — see verify list) |
| 915 | `Virtual Credit Card` — orphan line | Write it (ephemeral card numbers are squarely your readers' world) or cut |
| 960 | Post ends mid-thought after "Business Innovations" | Write a conclusion (structure §8) |

---

## P0 — Unassimilated source text (attribution + voice)

Several long passages appear to be pasted verbatim from an external history — almost certainly **Lewis Mandell, *The Credit Card Industry: A History* (1990)**. The tells:

- **PDF line-break hyphens that will render mid-sentence**: "revolv- ing" (248), "particu- larly" (253), "Install- ment" (255), "mem- bers" (278), "ac- quired" (312), "pro- mote" (692), "Bulle- tin" (785), "Conse- quently" (804). In rendered Markdown these appear as broken words with stray hyphens.
- **Line 600: "Diners Club, as we have already seen, was the first…"** — the post has *not* already seen Diners Club at that point; the book's earlier chapters had. This is a dead giveaway to any reader.
- **Bold-formatted paste blocks** (lines 406, 408, 599, 638) that look like "rewrite me" markers left in.
- **A verbatim duplicate**: the "Although Biggins was the first… Diners Club was the first to implement" passage appears twice back-to-back (599–601 and 603–606).

Affected ranges (approximate): 248–316, 406–413, 567–571, 583–588, 599–606, 614–625, 638–644, 692–714, 731–761, 785–788, 803–807.

Why this is the single biggest issue:

1. **Attribution.** Published as-is, this is plagiarism, and the source is a well-known book in exactly this niche.
2. **Rendering.** The hard-wrapped hyphens will visibly break on the page.
3. **Voice.** The post oscillates between three registers — your clear expository voice, Mandell's 1990 academic prose, and a dramatic-nonfiction voice ("a dance of paper and trust", "The wallet bulged"). The seams show.

**Fix:** rewrite every pasted passage in your own voice; quote sparingly and by name where the original wording matters (you already do this correctly with the Nugent quotes). Add a **References / Further Reading** section: Mandell (1990); Joe Nocera, *A Piece of the Action* (1994) — the source for most Fresno Drop lore; David Stearns, *Electronic Value Exchange* (2011) — the definitive BASE I/II and Visa history; Evans & Schmalensee, *Paying with Plastic*; plus your newspaper archives. Related: the draft has exactly two academic-style citations in 12,000 words — "(Katz, 1962)" at 222 and "(Olivelle, 2005)" at 230 — which betray a pasted origin; either adopt a consistent citation style or drop them.

---

## P1 — Factual errors (high confidence)

1. **Line 727 — "The Truth in Lending Act of 1968 later made unsolicited credit card mailings illegal."** The ban came via a **1970 amendment** to TILA (Pub. L. 91-508, Oct 1970). Bonus story: the proximate cause was the 1966–67 unsolicited-mailing fiascos, most famously the **Chicago Christmas debacle** — cards mailed to convicted felons, infants, and dogs, with organized mail-theft rings. It pairs perfectly with your Fresno Drop material.
2. **Line 729 — "National Banking Incorporated (NBI)"** is a wrong expansion. NBI = **National BankAmericard, Inc.** (line 754, inside the pasted text, has it right). Also worth adding: NBI renamed the card **Visa in 1976**, and its founding CEO **Dee Hock** — arguably the most important individual in this whole history — is never mentioned. "This is what later became Visa" (763) deserves more than one line.
3. **Line 940 — "the first structured credit card was launched by the State Bank of India (SBI) in 1988."** Wrong issuer and date. India's first credit card is generally credited to **Central Bank of India ("Centralcard", 1980)**, with **Andhra Bank** following in 1980–81. **SBI Card launched in 1998** (SBI–GE Capital JV). Given your audience, this is the error most likely to get called out.
4. **Lines 897–899 — EMV cryptogram description is technically wrong.** The transaction cryptogram (ARQC) is generated with a **symmetric** session key (3DES/AES, derived from an issuer master key) — not the RSA key pair. The **asymmetric** certificates are used for *offline card authentication* (SDA/DDA/CDA), not cryptogram generation. The "clone-proof because the secret never leaves the chip" conclusion survives the correction, but as written a payments-literate reader will catch it. The Diffie–Hellman aside (903) can stay if you anchor it to card authentication instead of cryptograms.
5. **Line 920 — "1996: First widely cited secure online card transaction."** The widely cited first is **August 11, 1994** — Dan Kohn's **NetMarket** selling Sting's *Ten Summoner's Tales* CD (PGP-encrypted), with Pizza Hut's PizzaNet the same month. Consider also the **SET protocol (Visa/MC, 1996)** — its failure is the missing prologue to your 3-D Secure section.
6. **Line 950 — "transaction limits… typically $100 in the US."** The US has **no hard contactless limit** analogous to the UK's £100 or India's ₹5,000 no-PIN thresholds; US networks handle it with risk rules (and dropped signature requirements in 2018). Rephrase.
7. **Line 556 — "Universal Air Travel Program"** → Universal Air Travel **Plan**. Same sentence is missing a word: "the ~~allowed~~ **card allowed** business travelers…".
8. **Lines 777 vs 782 — direct contradiction.** 777: Amex issued the first embossed **plastic** cards in May 1959. 782: "[I]t wasn't until the 1960s that the first PVC plastic cards were introduced." Reconcile (e.g., Amex 1959 first plastic; PVC became the standard substrate in the 1960s).
9. **Lines 801 vs 803–807 — the Master Charge origin is told twice, differently.** ICA didn't "merge with" WSBA in 1969; it **purchased the Master Charge name and marks** from it. Also 801 conflates the casts: the **Western States Bankcard Association** (Wells Fargo, United California Bank, Crocker, Bank of California) created Master Charge in 1967; the **Interbank Card Association** (Karl Hinke, Marine Midland) formed in 1966 and acquired the brand in 1969. Merge the two paragraphs into one correct account.
10. **Line 718 — "Started by an Italian banker."** **A. P. Giannini** was Italian-*American* (born San Jose). Name him — Bank of Italy (1904) → renamed Bank of America (1930) is a better story than the anonymous version, and it explains the bank's consumer-credit DNA.
11. **Lines 120 vs 124 — Laws of Eshnunna dated two centuries apart.** Caption says "18th century BCE"; body says "1930 BCE." Reconcile with whichever source you trust (c. 1800 BCE is the common dating).
12. **Line 230 — Manusmriti and Arthashastra interest rates are *per month*** (2–5%/month by varna; Kautilya's 1.25%–20% likewise monthly). As written they read as annual and appear bizarrely *lower* than your Mesopotamian annual rates (20%, 33⅓%) two sections earlier.
13. **Line 234 — "Alagaddupama Sutta (S.I,171)"** — the Alagaddūpama Sutta is **MN 22** (Majjhima Nikāya), and the debt-freedom simile is usually cited from DN 2 (Samaññaphala Sutta) or AN 4.62 (Anana Sutta). The citation is garbled; check all three Pali citations in this paragraph against your source.
14. **Line 671 — "Revolving credit cards… were introduced in 1951 in New York by Franklin National Bank."** Most histories say Franklin's 1951 card (the first *bank* card) required payment in full, and revolving credit on a universal bank card arrived with **BankAmericard in 1958**. This also collides with your own lines 563 and 779. Related: line 581 calls Franklin's program "'Charge-It' style" — Charg-It was Biggins's name, not Franklin's.
15. **Line 565 — "the average American carried a dozen or so card-like objects" by the end of WWII.** Card-holding was a minority, affluent, urban phenomenon. "A traveling salesman's wallet bulged with…" keeps the image honestly.
16. **"Diner's Club" → "Diners Club"** (no apostrophe) — the heading (590), captions, and prose all need it; the pasted passages spell it correctly, your own text doesn't, which makes the seams more visible.

---

## P1 — Verify before publishing (plausible but unsourced or suspect)

- **Line 439 — the Svenska Handelsbanken 1912 report and KaDeWe stamped payment cards.** I can't place either claim in any standard history, and the paragraph reads like generated filler. Cite it or cut it. *(Strongest flag in this list.)*
- **Line 419** — charge coins valuable "in farming communities… settle after the harvest" — sounds like a conflation with open-book store credit; charge coins were a department-store/hotel/urban instrument.
- **Line 725** — "$500 line of credit" per Fresno card: sources (Nocera) usually say $300–$500. Also "'nondescript enough'… in the words of one executive" — attribute the quote or soften it.
- **Line 727** — "$20 million by 1959": the officially admitted figure was ~$8.8M for the first 15 months; ~$20M is the informal all-in estimate. Say both (it's a better story: the bank lowballed publicly).
- **Lines 718/720** — "California, whose economy was larger than Japan" and "one-third of California residents" banked with BofA: plausible-sounding, verify both; also "Its said" → "It's said."
- **Line 661** — "Membership cost $3 a year" at launch: the fee is generally reported as introduced ~1951–52, launch being free. The 42,000-members figure varies by source; also consider adding the famous **7% merchant discount** — it's the economic engine of the whole model and the ancestor of every interchange fight since.
- **Line 775** — Diners at "400,000 by 1957": check against Mandell/Nocera figures.
- **Line 838** — BASE II's working name "SPAN / Shared Paperless Activity Network," and "first [IBM mainframe] to use silicon memory": the first monolithic-memory IBM was the System/370 Model 145 (1970) — which is the machine **BASE I** ran on. The claim looks misattached; check Stearns.
- **Line 850** — magstripe "adopted as a US standard in 1969 and internationally in 1971": standardization actually ran through the early '70s (ANSI/ISO 2894/3554); check dates.
- **Line 859** — SS7 "deployed in 1983": rollout was mid-to-late '80s. Bigger issue: the section asserts phreaking mattered to card authorization ("subtle but real") without a single concrete case. Find one or trim the section to a one-paragraph aside.
- **Line 883** — "Visa followed in 1983" vs. "Visa's dove hologram, introduced in 1984" — pick one dated claim and source it (MasterCard 1982 is well attested).
- **Line 913** — "Capital One pioneered the first personalized credit cards" under a 2007 heading; and "interactive cards with LED screens" — display cards are ~2012 (MasterCard/Standard Chartered). Re-date or generalize.
- **Line 924** — CVV1/CVV2 "generated using different secret keys": typically the same CVKs with a different service-code input. Simplify to "computed differently, so stripe data can't reveal the printed code."
- **Line 944–946** — RuPay: "$50,000 or more in membership fees," "cutting costs by roughly 40%," and especially "50% by volume in 2018" — that 50% figure is share of **cards issued**, overwhelmingly Jan Dhan **debit** cards. In a *credit-card* post, presenting it without that caveat misleads; RuPay *credit* was tiny until UPI linkage.
- **Line 954** — "available through sixteen banks" will be stale by publication (post is dated 2026; the sixteen-bank figure is from 2022–23) — date-stamp or update. Also verify the "virtual RuPay credit cards mapped to their existing accounts" mechanism (what exists are companion/standalone RuPay virtual cards sharing a credit line, via banks and apps like Kiwi). Consider mentioning **credit lines on UPI (2023)** as the adjacent development.
- **Line 952** — minor: Google Pay uses cloud-based HCE tokens, not a hardware Secure Element like Apple; either generalize the sentence or note the difference.
- **Line 112** — verify the lender/borrower names (Shi-sharrat, Hunabatum) against the museum record; fix "sheckels" regardless.
- **Line 263** — "Cowperwaite and Sons": sources also spell it Cowperthwait(e) & Sons; check.
- **Line 224** — Council of Carthage (345/348) condemned **clerical** usury specifically; worth the nuance.
- **Line 343** — say which Ottawa (presumably Ottawa, **Kansas**) so readers don't picture Canada.

---

## P2 — Structure

1. **Reorder the big four: Diners (1950) → Amex (Oct 1958) → BankAmericard (Sept 1958) → Master Charge (1966).** The Amex section currently *ends* by teasing the Fresno Drop as the coming revolution (779) — but BankAmericard already ran 100 lines earlier. Moving Amex before BankAmericard groups the T&E charge cards together and turns 779 into a perfect transition. (Alternative: keep chronology and rewrite 779, but the grouping is worth more than the two weeks of strict chronology.)
2. **The medieval gap (238).** Options: (a) write it — bills of exchange, Templar letters of credit (deposit in Paris, withdraw in Jerusalem — a literal proto-card network), English tally sticks, *hundi*/hawala (your India thread), Tang-dynasty "flying money"; or (b) cut the heading and bridge in one paragraph. Either way, consider **folding the religious-usury material into this arc** — it already runs chronologically to 1713 (Aquinas → Calvin → Henry VIII → 5% by 1713), so placing it before a "medieval" section makes the timeline zigzag.
3. **Merge "Origins of the credit card" (337) and "Precursors to the credit card" (382).** The 1877 newspapers, 1889 patent, and 1896 card *are* precursors; the current split implies a distinction the content doesn't support. One umbrella ("Before the network, 1865–1946") with the existing subsections works.
4. **Rehome lines 563–571** (Franklin sentence, WWII-wallet image, "All of these early versions…") into the "Universal Payment Card" intro — wallet fragmentation is your best setup for Diners Club.
5. **BankAmericard section is internally jumbled** (705 → 708 "A major advantage was **its**…" with no antecedent → 716 → 718). Order: banks' disdain for consumer credit → 27-of-100 schemes survived → enter BofA (Giannini, branch network, one-third of Californians) → The Drop.
6. **Fold the fragments**: "1965" content into Amex; Verifone (852) and phreaking (855) into "Evolution of credit card transactions" as prose.
7. **ATM section (861)**: it leads with the US-1969 note, then backtracks to Barclays 1967. Run it chronologically; optionally add one line on the contested invention (Simjian's 1960 Bankograph, James Goodfellow's 1966 PIN patent) since you clearly enjoy priority disputes.
8. **Write the ending the intro promises.** Add **"A credit card transaction in 2026"** as the final walkthrough: the 200 ms tap from your first paragraph, annotated layer by layer — NFC (1990s–2000s) → tokenized DAN (2014) → EMV cryptogram (1996) → processor → network (1966–76) → issuer risk engine → 3DS2 if risky (2016) — each element stamped with the section of history that produced it. Then a two-line coda back to Gall: *a complex system that works…* This single section converts 12,000 words of chronology into an argument. Consider also intermediate walkthroughs (1975 BASE I era; 1995 dial-up POS) to complete the series.
9. **The four-party model never gets assembled.** The intro names issuers, acquirers, networks, processors; the body's only gesture is the arrow chain at 928. Either add a short "the shape of the network settles" section (Diners' 7% discount → interchange → the NBI/Interbank duality) or explicitly defer: "how the money moves — interchange, settlement, disputes — is the next post." Don't leave the promise silently unmet.
10. **Consider a precursor summary table** (instrument / year / issuer / what it added / what it lacked: charge coin, Charga-Plate, WU collect card, courtesy card, Air Travel Card, Charg-It). It compresses ~80 lines of parallel prose and sets up "what was still missing" for Diners.
11. **TOC hygiene** (`toc_sticky` is on, so headings are UI): consistent title-casing ("tele transactions", "Religious Perspective on credit"), no trailing colons (370), no bare-date headings (784, 852), promote 679 to a real heading.
12. **Length.** ~12,400 words. If you don't want to cut, split the series (Part 1: credit before cards — antiquity through religion/medieval; Part 2: the card century). If it stays one post, compress antiquity by ~40% — the aside at 214 already states that section's entire thesis, beautifully. The title promises a credit-card chronology, and the first card is ~4,500 words in.

---

## P2 — Stories you're missing (cheap wins)

- **Edward Bellamy coined "credit card" in *Looking Backward* (1888)** — irresistible *because* your 1877 newspaper find predates him: "the phrase appeared in a Kansas weekly eleven years before the novel usually credited with inventing it." That's your archival work paying off; don't leave it implicit.
- **The Diners Club founding legend** — McNamara's forgotten wallet at Major's Cabin Grill ("The First Supper") — told and then debunked (Diners' own PR man, Matty Simmons, later admitted it was invented). The genre's most famous myth is conspicuously absent from a post that loves myth-busting.
- **Carte Blanche (Hilton, 1958)** — the third T&E card; one paragraph completes the trio and gives "T&E card" as a category name.
- **Dee Hock and the 1976 Visa rename** — see errors §2.
- **The Chicago 1966 mailing debacle** → the 1970 unsolicited-mail ban — see errors §1.
- **Marquette v. First of Omaha (1978)** — the Supreme Court decision that exported interest-rate deregulation nationwide (why your card is issued from South Dakota or Delaware). This is the modern rhyme to your ancient interest-cap material — it would complete the arc your line-214 aside opens ("regulations are humanity's answer") with the 20th century's great *de*-regulation, and the CARD Act (2009) as the counter-swing.
- **The world outside America**: Barclaycard (1966, first credit card outside the US) and JCB (Japan, 1961) fix the US-only frame in one paragraph. **UnionPay (2002)** — now the largest card scheme on earth — and **Mir (Russia, post-sanctions)** belong in "Digital Sovereignty" beside RuPay; their absence is glaring given the section's title.
- **Diners Club today**: owned by Discover since 2008 — closes the loop at line 673.

---

## P3 — Copyedits

| Line | Fix |
|---|---|
| 69/71/73 | Three consecutive paragraphs open with "As …" — vary |
| 112 | "sheckels" → shekels; "interest free" → interest-free |
| 116 | "more money **that** borrowed" → "than was borrowed" |
| 124 | "dating back to 1930 BCE **define**" → defined (and see errors §11) |
| 130 | Caption "Hamurabbi" → Hammurabi (alt text too; body at 126 says c. 1750, caption c. 1753 — pick one) |
| 145 | "As opposed to mesopotamia… ancient egypt, **owning** partly to" → "Unlike Mesopotamia… ancient Egypt, owing partly to…" (capitalize both) |
| 151, 159 | "Heqanakth" → Heqanakht (the alt text has it right); "MM 22.3.516" → MMA 22.3.516 |
| 236 | "**So** we can establish… **So** what was it" — double "So"; also move the question next to the section that answers it (currently an empty section intervenes) |
| 350 | "ingenuos[sic]" — good; keep the [sic] |
| 370 | Trailing colon in heading |
| 378 | "a transports company" → transport company; drop commas in "first customer card, that we know of, to use" |
| 384 | "attidue" → attitudes; "stretched to **its** limits" → their; "instalment" here vs "installment" elsewhere — pick US spelling |
| 462 | Caption "containig" → containing |
| 472 | "betwen" → between |
| 474 | "hve" → have |
| 608 | Capitalize: "Diner**'s club** was started by **frank mcnamara, alfred bloomingdale,** and **ralph schneider**" |
| 612 | "Major's cabin grill" → Major's Cabin Grill |
| 635 vs 638–644 | "It wasn't even a card, it was a booklet!" — the point is then remade by the pasted block; keep one |
| 661 vs 671 | "It was, strictly speaking, a charge card" — made twice; keep one |
| 673 | "albeit a much smaller player" → "albeit as a much smaller player" |
| 720 | "Its said" → It's said; "california" → California (also 718) |
| 782 | "t wasn't" → It wasn't |
| 890 | "firsst" → first; "amex" → American Express |
| Global | Mixed " - " and "—" as dash (116, 484, …); prose dates mix "February 8, 1950" and "25 August 1950" styles (caption style is fine for newspaper citations — just keep prose consistent) |

---

## P3 — Rendering & theme notes

- **Image paths**: 25 of 28 `figure` includes use `assets/…` (no leading slash) while the front-matter galleries use `/assets/…`. Your local `_includes/figure` pipes through `relative_url`, which adds the slash, so **nothing is currently broken** (I verified all 28 referenced files exist on disk) — but normalize to a leading `/` so a future theme/include change doesn't silently 404 twenty-five images.
- **Fixed-percentage wrappers aren't responsive**: `<div style="width: 25%">` means ~90 px images on a phone. Prefer `style="max-width: 220px; margin: 0 auto;"` (caps large screens, fills small) or the theme's alignment classes.
- **Three different aside formats**: blockquote `> **Aside:**` (214, 825, 903), bold + `{: .notice--info}` (454), bare `{: .notice--info}` (518). Standardize on `.notice--info` — it renders as a callout box in Minimal Mistakes, whereas blockquotes read as quotations (confusing in a post full of real quotations).
- `laws_of_eshnunna.webp` is unused (only the `.png` is referenced) — delete one. Optionally rename `code_of_hamurabbi.jpg`.
- **Front matter**: add a `header:` with `og_image`/`teaser` (the Diners booklet or a charge coin would make a great social card); consider a livelier `excerpt` than "Sociotechnical history of credit cards" — e.g., the tap-to-4,000-years hook from your intro.
- **Zero hyperlinks in 12,000 words.** Even just a References section (Mandell, Nocera, Stearns, Evans & Schmalensee, your newspaper archives) would substantially raise trust in a genre this myth-ridden — and it's required anyway per the attribution fix above.
- `text-justify` without hyphenation produces rivers of whitespace on narrow screens; consider default alignment or `hyphens: auto`.

---

## Suggested order of attack

1. Strip/finish all P0 scaffolding (an hour of deletions and triage).
2. Rewrite the pasted passages in your voice; add the References section.
3. Apply the P1 corrections; run down the verify list (the Svenska/KaDeWe paragraph, the Fresno numbers, and the RuPay volume claim matter most).
4. Restructure: Amex ↔ BankAmericard swap, medieval decision, orphan rehoming.
5. Write "A credit card transaction in 2026" + conclusion.
6. Copyedit pass with the P3 table.
