# Charge coins: research and rewrite sources

Research checked 17 October 2026 for the “Charge coins” section of `_posts/2026-05-15-payments-101-credit-card-chronology.md`. The Diners Club in India section supplied the writing model: named people and establishments, dated documents, concrete transactions, and human reactions.

## Local research first

The starting folder has **three files representing two newspaper items**, not three independent sources:

1. `books_papers/newspapers/shopping-coin/San_Antonio_Express_News_1901_05_26_23.jpg`: a readable clipping headed **“Credit Coin System.”** Its last line attributes the item to the **Philadelphia Record**. The filename uses a later newspaper brand; the historical issue's masthead is **San Antonio Daily Express**.
2. `books_papers/newspapers/shopping-coin/The_Philadelphia_Times_1902_06_19_Page_14.jpg`: a detail headed **“A Shopping Coin”** within a Gimbel Brothers advertisement.
3. `books_papers/newspapers/shopping-coin/shopping_coin_Philadelphia-Times-Jun-19-1902-p-14.pdf`: the complete page behind that detail, with masthead, date, page number, store identity and introductory account terms missing from the crop.

Both supplied JPGs were visually read. The Philadelphia PDF was extracted as text and rendered to verify the full page. The newspaper heading confirms **Thursday, 19 June 1902, p. 14**. Its archive reference is [NewspaperArchive](https://access.newspaperarchive.com/philadelphia-times/1902-06-19/page-14/); the local saved copy, rather than a newly purchased database image, was used.

The research then extracted and searched **44 PDFs under `books_papers`**, including every PDF in that tree at the time, followed by **45 additional PDFs under `bank_credit_cards`, `research` and `oil_credit_cards`**. Search terms included charge/shopping/credit/identification coin, charge token, fob, medallion, celluloid and Stearns, with spacing and hyphen variants. Broader coin matches were inspected for context instead of being assumed to concern charge coins. The existing research Markdown and the retail-credit text file were also searched.

This was a corpus search followed by close reading of relevant passages, not a claim to have read all 89 PDFs cover to cover. Empty extraction from an image-only document was not treated as evidence that it contained no relevant information. A per-file coverage inventory follows below.

## Contemporary shopping experience

### Gimbel Brothers, 1902

The full-page advertisement describes an **accommodation account**, with an itemised bill and payment **once a month**. This text appears above the supplied crop. The coin is described as half-dollar sized; the salesperson takes its number and the customer leaves with the goods. The customer retains the coin.

The ad claims **25,300 people** know the convenience of an account at Gimbels. This is a retailer's advertised figure, not an audited count or proof of how many separate accounts or coins existed. Its provision for coins issued to family members entrusted with shopping supports the comparison to an additional family card. It does not establish independently owned credit accounts for every family member.

The newspaper date proves use **by June 1902**. It does not establish the launch date of the Gimbels program or priority over other stores.

### “Credit Coin System,” 1901

The item describes an anonymous shopper with **eight coins on one metal ring, identifying her credit at eight stores**. It also describes stores mailing coins to regular customers and customers declining them for reasons of independence, losing small objects and avoiding temptation or additional obligations. The final correspondent's preference for her own coin plays on the difference between money and credit identification.

The writer's claim of almost universal adoption is not a survey. The correspondence is reported anonymously and may be selected for humour; the article presents it as a newspaper anecdote, not verified customer testimony or a measure of sentiment.

After the local material was read, an online check located the same issue in the [University of North Texas archive](https://texashistory.unt.edu/ark:/67531/metapth1868147/m1/23/). Its [page OCR](https://texashistory.unt.edu/ark:/67531/metapth1868147/m1/23/ocr.txt) was retrieved and matches the clipping, including the eight-store observation and closing attribution. The library metadata dates the issue **26 May 1901**; the OCR misreads some masthead digits. The graphical viewer returned an access challenge, so no claim is made to having newly inspected its full-page image. The supplied crop remains the visual authority for quotations.

## Relevant books and papers in the repo

### Agostinho Campos Ferreira, _The Origins of MasterCard_

Local file: `books_papers/THE ORIGINS OF MASTERCARD.pdf`.

This is the most substantial local source on the objects themselves. The supplied version has a **2019 title page** and thesis approval signed in December 2019; the [university record](https://portalinvestigacion.udc.gal/documentos/60f633fd8d1bc0320c2938d9) gives a **24 November 2020 defence**. It should not be confused with the commercial edition advertised by its publisher with a different date and pagination.

Close reading covered **pp. 34–43**, **Appendix I, pp. 202–206 and related specimen plates**, and **notes 5–18, pp. 264–265**. PDF and printed page numbers coincide in this supplied version. Pages **38–42** were rendered and visually inspected. Reading the illustrations matters: the text layer does not transcribe the pictured notices or letters.

- **Pp. 34–37:** open-book accounts, materials, celluloid cards, and disagreement over which identification pieces came first. Celluloid cards and metal coins are distinct forms; they should not be collapsed into a single metal-and-celluloid “coin.”
- **P. 38, fig. 4:** early Wanamaker and Abraham & Straus specimens are dated only tentatively, based on collector correspondence. The page's broad 1880s claim is less secure than a precisely dated contemporary document.
- **P. 38, fig. 5:** a reproduced **Strawbridge & Clothier notice of 1 March 1920**, asking customers to exchange an old design before **15 March 1920**. It expressly withdraws old coins for **“take with” purchases**. It does not prove all of a customer's credit privileges or delivered orders were cancelled. The notice is credited to the **Edmund Tylenda collection**, with the accompanying specimen coins from Ferreira's collection.
- **P. 39, fig. 6:** a **21 November 1927** letter sending a coin for an account payable monthly, together with a folder describing identification for goods taken away and prompt reporting of a lost or mislaid coin so the number can be cancelled and another sent. The material is credited to the author's collection. The date is the specimen letter's date, not the first use of the coin system.
- **P. 40, fig. 7:** further coin mailers, including an Abraham & Straus instruction to notify the store immediately if the coin is lost or stolen. This independently contradicts a blanket claim that issuers had no security procedures.
- **Pp. 41–42:** store names, monograms and account numbers; various shapes and metals; manual record matching. The use of a coin does not establish a uniform verification routine at every shop.
- **P. 42, fig. 10:** an alleged cast counterfeit Gimbels coin, identified by collectors. Its date is not established; it was not turned into a dated historical fraud episode in the article.
- **Appendix I:** hotel, taxicab, clothing and jewellery specimens substantiate the breadth of issuers. There are also warnings about misidentified objects: a numbered tag is not necessarily a charge coin.
- **Notes, pp. 264–265:** collector accounts disagree over celluloid versus metal priority and the earliest date. The notes explicitly quote Stephen Alpert's uncertainty about the first issuer. Neither the 1865 claim nor a named first metal-coin issuer was adopted.

The thesis discusses **Wanamaker v. Megary (1915)**. It supplied a lead for checking court opinions online, rather than being treated as the only authority for the legal account.

### Sean H. Vanatta, _Plastic Capitalism_ (2024)

Local file begins `books_papers/Plastic Capitalism_ Banks, Credit Cards...pdf`. **Printed pp. 23–24, PDF pp. 41–42**, explain approved department-store accounts, identifying metal badges/fobs and the usefulness of account identification in large cities. Useful for the institutional setting and the distinction between instalment lending and monthly charge accounts. It does not identify a securely dated first coin issuer.

### David L. Stearns, _Electronic Value Exchange_ (2011)

Local Springer PDF; **printed pp. 6–8, PDF pp. 35–37**, including fig. 1.1, a department-store charge fob. Used for handwritten transfer of account details to sales drafts and the copying errors that imprinters subsequently addressed. This supports the transition into the next section.

Its compressed narrative puts department-store devices after Western Union's 1914 card. The 1901–1902 newspaper documents establish earlier coin use, so the book's ordering was not repeated. Its discussion of farmers' seasonal credit concerns the general history of nineteenth-century credit, not evidence that department-store coins specifically financed farming seasons. That distinction corrects a claim in the old section.

### Emily Remus, “Credit and Coverture in the Age of American Mass Consumption” (2026)

Local file: `books_papers/credit_and_coverture_in_the_age_of_american_mass_consumption.pdf`. **Pp. 1–4 and 11–12** tie a numbered Wanamaker account and identification coin to Alice Weaver in **1900**, and discuss the store's credit manager and legal uncertainty. This independently supports coin use before 1914. The preceding consumer-credit section already tells the Weaver story, so it was not repeated here.

### Lewis Mandell and Matty Simmons

Mandell, _The Credit Card Industry_ (1990), **introduction pp. xii–xiii and printed pp. 17–18**, was checked for retail-account function and transition to charge plates. Its general 1914 start for retail cards is not a date for the first charge coin. Simmons, _The Credit Card Catastrophe_ (1995), **pp. 12–13**, gives a compressed early-card chronology that also conflicts with the closer newspaper evidence. Neither overrides the contemporary advertisements.

## Online additions after the local review

### Stearns collection record, Fall 2018

The post already contained a Stearns image and a pasted caption from _American Ancestors_. The [NEHGS issue](https://www.americanancestors.org/sites/default/files/2021-11/Fall%202018.pdf) was retrieved to verify **Curt DiCamillo, “Department Stores, Boston & the Stearns Family,” printed p. 62 / PDF p. 64**. The page was rendered and inspected. It identifies the **20712** specimen as **ca. 1895**, explains the RHSCo monogram and describes the clerk-to-accounting-to-monthly-bill process. The dating remains approximate.

The existing image was retained, its caption corrected, and the pasted source text replaced with a short sourced explanation.

### Court opinions

- [_Lit Bros. v. Haines_, 98 N.J.L. 658, 121 A. 131 (5 June 1923)](https://openjurist.org/98/njl/658/lit-bros-v-haines-8105112): read the court's opinion. It supports the wallpaper-workman theft episode and its fact-specific result, and discusses/rejects the reasoning of _Wanamaker v. Megary_ (1915). The original 1915 report was not separately obtained; the article's account follows the 1923 court's discussion.
- [_John Wanamaker, Philadelphia v. Chase_, 81 Pa. Super. 201](https://openjurist.org/81/pasuper/201/john-wanamaker-phila-v-chase): checked as supplementary evidence of manual sales slips and a customer knowingly allowing family and a servant to use her coin. Sources disagree in their displayed decision/reporting dates; this case was not used as a dated episode in the article.
- [Boston College law-review discussion](https://bclawreview.bc.edu/articles/2348/files/63e204d1d8492.pdf) and the opinion in [Gulf Refining Co. v. Plotnick (1935)](https://law.counselstack.com/opinion/gulf-refining-co-v-plotnick-pactcompllancas-1935) were discovery/cross-check sources, not substitutes for the Haines opinion.

The section describes historical disputes, not a uniform liability rule. It does not import modern cardholder protections into the coin era.

### A documented Swedish example

The [Swedish museum record for “NK nr 30700,” object 3160607](https://samlingar.shm.se/object/0c737802-1689-41a2-a69f-d37977ec91c3), identifies a **bronze Nordiska Kompaniet badge**, dated **1920–1955**, and describes the 1920s account-number system and later replacement by paper credentials. The museum's [English exhibition text](https://dev.pengar.ekonomiskamuseet.se/object_details.php?e=no&l=en&object=0c737802-1689-41a2-a69f-d37977ec91c3) was also retrieved. This supplies a collection-backed international example in place of the previous unsupported 1912 Handelsbanken and KaDeWe assertions. No museum image was downloaded or added.

## Editorial decisions and illustrations

- Preserve the existing charge-coin gallery and the “Familiar Feature: Account Number” heading.
- Explain the number as a link to an existing credit account, rather than credit's invention or proof of a clerk recognising the bearer personally.
- Keep handwritten accounting visible; the coin did not eliminate the ledger.
- Use the Gimbels account-user figure as an advertising claim, and the eight-store shopper as a reported anecdote.
- Do not assign an exact inventor, first issuer, 1865 launch, automatic credit-status check on every sale, or universal absence of safeguards.
- Remove the unsupported claim that coin issuers required customers to advertise a loss in newspapers. The actual store documents support **notifying the store**.
- Do not repeat the Alice Weaver story, already told earlier in the article.
- Avoid describing every account's terms as identical; NK's payment at the end of the following month is attributed separately.

| Asset | Provenance and treatment |
| --- | --- |
| `stearns_charge_coin_1895.png` | Existing user-supplied asset; retained with specific number, approximate date and NEHGS attribution. |
| `gimbels_shopping_coin_ad_1902_06_19_p14.jpg` | Unchanged copy of the supplied Philadelphia JPG detail. Full page checked separately for terms outside the crop. |
| `strawbridge_shopping_coin_replacement_1920.png` | Region rendered from p. 38 of the local Ferreira thesis, fig. 5, preserving the notice and specimen images in their displayed orientation. Caption retains Tylenda/Ferreira collection credits. |

## Per-file corpus coverage

The inventory below records automated text screening; the close-reading sources and illustrated pages are distinguished above. “No direct match” is a search result, not proof of absence. Modern phone-credit tokens, medieval money, celluloid billfold windows and Bear Stearns references were excluded as false positives. Image-only extracts and database wrappers require separate visual/OCR work if a later question specifically concerns them.

| Local PDF | Screening result |
| --- | --- |
| `books_papers/A Billion Little Pieces_ RFID and Infrastructures of -- Jordan Frith -- 2024 -- MIT Press -- isbn13 9780262551281 -- 8f903bab1bdd53eba780e99989474e6e -- Anna’s Archive.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/A Cultural History of Money in the Modern Age Volume 6 -- Nelms, Taylor C_ (editor);Maurer, Bill (editor);Krmnicek, -- Bloomsbury UK, London, England, -- isbn13 9781350253551 -- 5938adcfdbd65e462a222c17fed076e7 -- A.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/A STUDY OF CHARGE ACCOUNT BANKING 1963.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/Buy now, pay later -- Black, Hillel -- 1961 -- New York, Morrow -- oclc 45683910 -- 72ce07d66520a648018f49f0810bb626 -- Anna’s Archive.pdf` | Candidate PDF pages: 41, 42, 43, 61, 63, 64, 136, 192. See assessment above; some are false positives. |
| `books_papers/Consumer-Credit-Economic-Stability.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/David S. Evans, Richard Schmalensee - Paying with Plastic, 2nd Edition_ The Digital Revolution in Buying and Borrowing (2004) - libgen.li.pdf` | Candidate PDF pages: 91, 106. See assessment above; some are false positives. |
| `books_papers/Debtor Nation_ The History of America in Red Ink (Politics -- Louis Hyman -- Politics and Society in Twentieth-Century America, First -- Princeton -- isbn13 9780691140681 -- 1d805186324ab4b5d3d5f41c88d1e43a -- Anna’s Archive.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/Graeber, David - Debt_ The First 5,000 Years (2011, Melville House) - libgen.li.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/Ilya Dubinsky (Author) - Acquiring Card Payments (2019, Auerbach Publications) [10.1201_9780429329937] - libgen.li.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/Money Changes Everything _ How Finance Made Civilization -- William N_ Goetzmann; William N_ Goetzmann -- 2017 dec 31 -- Princeton University Press -- isbn13 9780691143781 -- eeeb7ab36c7d9ec2006eb909eccb688d -- Anna.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/Paid_book.pdf` | Candidate PDF pages: 267. See assessment above; some are false positives. |
| `books_papers/Payments Systems in the U_S_ - Third Edition_ A Guide for -- Benson, Carol Coye, author, Loftesness, Scott, author; -- Place of publication not -- isbn13 9780982789742 -- 935cfac001b70aba45f61c7a09b83f6a -- Anna’s.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/Plastic Capitalism_ Banks, Credit Cards, and the End of -- Sean H_ Vanatta -- PS, 2024 -- Yale University Press -- isbn13 9780300247343 -- 74b868fec98edff5773f26af755e13b0 -- Anna’s Archive.pdf` | Candidate PDF pages: 41, 42, 59, 75, 91, 93, 146, 147, 160, 162, 210, 409. See assessment above; some are false positives. |
| `books_papers/THE ORIGINS OF MASTERCARD.pdf` | Candidate PDF pages: 9, 14, 16, 23, 34, 35, 36, 38, 39, 40, 41, 42, 43, 143, 202, 203, 204, 205, 206, 209, 211, 214, 252, 253, 256, 264, 265, 267, 286, 306. See assessment above; some are false positives. |
| `books_papers/The Case of the Cashless Society.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/The credit card catastrophe _ the 20th century phenomenon -- Simmons, Matty, None -- New York, New York State, 1995 -- New York _ Barricade Books -- isbn13 9781569800386 -- 7f894c4d8f9b68b67c74c12d7a59a86c -- Anna.pdf` | Candidate PDF pages: 16, 54, 124, 126, 223. See assessment above; some are false positives. |
| `books_papers/The credit card industry _ a history -- Mandell, Lewis -- Twayne's evolution of American business series ;, no_ 4, -- Boston _ Twayne Publishers -- isbn13 9780805798104 -- e402fd69a08239a3fb91eb2e6940c5b6 -- Anna’.pdf` | Candidate PDF pages: 142, 164. See assessment above; some are false positives. |
| `books_papers/The first conglomerate _ 145 years of the Singer Sewing -- Bissell, D_ C_ -- Brunswick, ME, Maine, 1999 -- Brunswick, ME_ Audenreed Press -- isbn13 9781879418721 -- 193806d7cbb70e3e42de7b9f7b4d0158 -- Anna’s Archi.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/The victorian internet.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/The+Evolution+of+Banking+and+Financial+Systems+in+Ancient+India.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/William N. Goetzmann (editor), K. Geert Rouwenhorst (editor) - The Origins of Value_ The Financial Innovations that Created Modern Capital Markets (2005, Oxford University Press) - libgen.li.pdf` | Sparse/image-only text; no negative inference. |
| `books_papers/[History of Computing ] David L. Stearns (auth.) - Electronic Value Exchange_ Origins of the VISA Electronic Payment System (2011, Springer) [10.1007_978-1-84996-139-4] - libgen.li.pdf` | Candidate PDF pages: 237. See assessment above; some are false positives. |
| `books_papers/ascent of plastic money.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/attention-shoppers-american-retail-capitalism-and-the-origins-of-the-amazon-economy-9780691266510-0691266514_compress.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/charge_account_banking.pdf` | Candidate PDF pages: 14. See assessment above; some are false positives. |
| `books_papers/cole-1955-financing-retail-credit-sales-ocr.pdf` | Candidate PDF pages: 45, 47, 95. See assessment above; some are false positives. |
| `books_papers/credit card use in the united states ( etc.) (z-library.sk, 1lib.sk, z-lib.sk).pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/credit_and_coverture_in_the_age_of_american_mass_consumption.pdf` | Candidate PDF pages: 12. See assessment above; some are false positives. |
| `books_papers/mussey-the-fake-instalment-business-1903-ocr.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/newspapers/buy-o-matic/buy-o-matic-the-nassau-daily-review-star-1940-07-25_012.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/newspapers/department-stores/August_29,_1936_(Page_22_of_22.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/newspapers/department-stores/ProQuestDocuments-2026-09-02 (2).pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/newspapers/department-stores/ProQuestDocuments-2026-09-02 (3).pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/newspapers/department-stores/September_12,_1935_(Page_20_of.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/newspapers/department-stores/September_13,_1935_(Page_20_of.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/newspapers/department-stores/September_6,_1935_(Page_20_of_.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/newspapers/department-stores/September_9,_1938_(Page_22_of_.pdf` | No direct coin/token match; broader matches checked for context. |
| `books_papers/newspapers/diners_club/nyt_2_aug_1953_p19.pdf` | Sparse/image-only text; no negative inference. |
| `books_papers/newspapers/diners_club/nyt_2_dec_1956_p26.pdf` | Sparse/image-only text; no negative inference. |
| `books_papers/newspapers/diners_club/nyt_2_nov_1958_p1,12.pdf` | Sparse/image-only text; no negative inference. |
| `books_papers/newspapers/diners_club/nyt_3_dec_1955_p27.pdf` | Sparse/image-only text; no negative inference. |
| `books_papers/newspapers/diners_club/nyt_4_june_1953_p50.pdf` | Sparse/image-only text; no negative inference. |
| `books_papers/newspapers/shopping-coin/shopping_coin_Philadelphia-Times-Jun-19-1902-p-14.pdf` | Candidate PDF pages: 1. See assessment above; some are false positives. |
| `books_papers/singer-sewing-harvard-2024-03-06-20-32-37.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/EBSCO-FullText-09_03_2026.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/From Airline Reservations to Sonic the Hedgehog_ A History -- Martin Campbell-Kelly -- History of computing, 1st MIT Press pbk_ ed, Cambridge, -- The -- isbn13 9780262033039 -- d9724e73613b744854b46efe6c04e839 -- Anna’s Archive.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/Radio-News-1946-10-R.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/The impact of computers on banking -- James A_ O'Brien -- 1968-01-01 -- Bankers Pub_ Co_ -- 0b228a3e2b100b0160deb6a6986f6313 -- Anna’s Archive.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/Waves of change  business evolution through information technology (McKenney, James L, Copeland, Duncan G. etc.) (z-library.sk, 1lib.sk, z-lib.sk).pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/bank_credit_card_report.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/bank_of_america_ERMA.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/businessweek_4-11-1953.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/chargePlans_simplified.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/commercialwest_19590214.pdf` | Candidate PDF pages: 45. See assessment above; some are false positives. |
| `bank_credit_cards/congressional_record_franklin_charge_card.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/credit_card_description_1968.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/credit_card_type_images.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/datamation.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/franklin national bank launch 1952.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/franklin national bank launch may 5 1952 p. 8.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/franklin national bank launch may 5 1952.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/franklin_ap_oil_origins_19520505_ttu.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/islandora2130903.pdf` | Sparse/image-only text; no negative inference. |
| `bank_credit_cards/midcontinentbanker_195211.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/monthlybanknews_196612.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/nwbanker_195311.pdf` | No direct coin/token match; broader matches checked for context. |
| `bank_credit_cards/nwbanker_195904.pdf` | Candidate PDF pages: 105. See assessment above; some are false positives. |
| `bank_credit_cards/nyt_charg-it_article_1951.pdf` | Sparse/image-only text; no negative inference. |
| `bank_credit_cards/timothy-wolters-carry-your-credit-in-your-pocket-the-early-h -- ef61c2fb3c84ab559d094f679d8d0650 -- Anna’s Archive.pdf` | No direct coin/token match; broader matches checked for context. |
| `oil_credit_cards/businessweek_3_may_1941.pdf` | No direct coin/token match; broader matches checked for context. |
| `oil_credit_cards/sim_npn-national-petroleum-news_1923-04-25_15_17.pdf` | Candidate PDF pages: 45. See assessment above; some are false positives. |
| `oil_credit_cards/sim_npn-national-petroleum-news_1923-08-01_15_31.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/amex/American Express _ the unofficial history of the people who -- Grossman, Peter Z_, 1948- -- 1st ed_, New York, New York State, 1987 -- New York _ -- isbn13 9780517562383 -- 9afea674f1abb1be09976173d7ce84fd -- Anna’s Archive.pdf` | Candidate PDF pages: 42, 413. See assessment above; some are false positives. |
| `research/amex/EBSCO-FullText-08_21_2026.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/amex/forbes-amex.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/bankway_research/1948_04_03_005.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/bankway_research/1951_04_17_005.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/bankway_research/1951_05_15_002.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/bankway_research/1952_04_26_005.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/bankway_research/bankway_card_Dziennik Dla Wszystkich = Polish Everybody’s Daily_1945_10_27_p5.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/centralcard-media/central bank card.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/centralcard-media/central_vysya.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/centralcard-media/centralcard_ad.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/centralcard-media/centralcard_cash_advance.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/centralcard-media/centralcard_mastercard_tieup.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/centralcard-media/centralcard_mastercard_tieup_ad.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/centralcard-media/toi_12_aug_1980_4.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/centralcard-media/toi_21_aug_1980_7.pdf` | No direct coin/token match; broader matches checked for context. |
| `research/centralcard-media/toi_6_july_1980_18.pdf` | No direct coin/token match; broader matches checked for context. |
