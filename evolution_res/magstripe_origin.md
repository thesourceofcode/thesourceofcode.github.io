Although a few banks began deploying
POS terminals in the early 1970s, most merchants were still referencing dense lists
of invalid card numbers, telephoning for verbal authorization, and manually com-
pleting paper sales drafts. Floor limits reduced the number of transactions requiring
authorization, but they also allowed too much undetectable fraud and credit losses:
an estimated one billion USD each year.1 If the Visa payment system was ever to
become a true replacement for cash and checks, this first link in the payment chain
needed to be automated fully, even at the smallest of merchants.
Hock’s philosophy typically dictated that what happened between the merchant
and the acquirer was their business, and Visa’s influence on that relationship should
be limited only to those aspects necessary to ensure the health and stability of the
overall system. For most of the 1970s, Visa stayed out of the point of sale, concen-
trating instead on automating the exchange of information between members. This
allowed the innovative banks to experiment with various kinds of POS terminals
and card-encoding methods. As the banks committed significant amounts of time
and money to their various solutions, intense debates broke out regarding which
should become the national, and ultimately international, standard.
At the turn of the 1980s, Visa decided it was time to intervene, and forced a cer-
tain amount of closure to these debates through two important actions. First, they
mandated that all Visa cards issued after 1980 include a magnetic stripe encoded
to their standard, effectively ending the card-encoding debate. Second, they encour-
aged the widespread use of POS terminals by stimulating equipment manufacturers
to build inexpensive devices that used standard voice telephone lines, and providing
1‘Visa dial terminal pilot project final report’ (April 1982), p. 1.
D.L. Stearns, Electronic Value Exchange, History of Computing,
DOI 10.1007/978-1-84996-139-4_7, © Springer-Verlag London Limited 2011
135
136 7 Automating the Point of Sale: Encoding Standards and Merchant Dial Terminals
the economic incentives necessary for merchants to adopt them. These actions cre-
ated the conditions by which full POS automation could be achieved at the national,
and eventually international, level.
Before we examine these two moves in detail, however, we must first briefly
discuss the technical vision that informed them. This vision, and the various steps
needed to achieve it, were developed during a project known as BASE IV.
Dreaming the Future: BASE IV
In 1974, after BASE II was put into production and the first version of BASE III was
nearing completion, Hock began another systems development project that was his
most ambitious yet. It was duly named BASE IV, but it also went by another name
that was perhaps more descriptive for Hock: Electronic Value Exchange (EVE).
Electronic Value Exchange
Throughout the mid-1970s, the American banking industry was preoccupied with
the possibilities of electronic funds transfer (EFT). Bankers were eager to replace
cash and checks with seemingly less expensive cards, terminals, and automated
clearing houses (ACHs). ATMs also promised to reduce the need for tellers and
their corresponding labor costs. From Hock’s perspective however, the bankers were
simply trying to automate the existing forms of banking rather than re-imagining
how banking’s central function, value exchange, should occur in an entirely elec-
tronic world. In his speeches, he exhorted bankers to think not just of EFT, but also
the broader concept of EVE, lest they “may swiftly be hooting in the commercial
graveyard where the ghosts of form, which did not follow function, are buried.”2
BASE IV was Hock’s own attempt at imagining a world in which every financial
transaction was completed entirely in electronic form. In this world, transactions
could originate from any device, be it a POS terminal, a cash dispensing machine, a
pre-authorized transfer, or even a telephone banking interface.3 Those transactions
might access any asset the payor owns: not just a credit line, but also deposits,
or even liquid investments. Similarly, those transactions might credit any asset the
payee owns. In the middle would be a switching system that has connections to all
the devices and all the assets, or at least to other networks that can reach those assets.
This switching system, which would of course be built and operated by NBI/Visa,
2Hock (1974), p. 8.
3In the 1970s, the word “terminal” was often used for any kind of origination device. In order to
avoid confusion, I will use the more distinctive terms employed today. By “POS terminal,” I mean
a device used to authorize (and possibly capture) transactions at the point of sale, and by “ATM”
or “cash dispenser,” I mean a device used primarily to obtain currency.
Dreaming the Future: BASE IV 137
would connect everyone’s assets together, making them accessible from any device,
at any time. This, for Hock, was the essence of electronic value exchange.
IBM and Compata were hired to write the functional specifications for a system
that could bring Hock’s vision of EVE to life, and by 1975, their work filled a num-
ber of large binders. But that was as concrete as the system ever became. When
BASE III was canceled, BASE IV met a similar demise, for three principal reasons.
First, most of BASE IV’s components were intended to run in the member process-
ing centers, and BASE III had demonstrated that NBI should not be in that business.
Second, the necessary technologies were either unavailable at that time, or were
far too expensive for the system to be economically feasible. Third, it was unclear
whether the public was actually ready to abandon cash and checks for electronic
transactions. Peirce counseled Hock and Russell to “stick [the design] on the shelf
and go on with something else, because you’ll never be able to build this system.
The world’s not ready for this.”4
Gems in the Rubble
Although BASE IV was never built, it still had a profound influence on the evolution
of the core payment system. Peirce explained:
The value of BASE IV was that it defined an end point and identified the building blocks
and standards required to reach that end point. Almost everything we did subsequent to
BASE IV was consistent with it.5
Two of Visa’s subsequent actions—standardizing how the cards should be en-
coded, and stimulating the development and adoption of affordable POS terminals—
will be discussed in detail in the following sections. But there was another key idea
generated during the BASE IV design that is worth mentioning here: a new kind of
extensible message format. The original BASE I message format was fixed both in
length and content, containing only the few fields necessary for credit authorization.
This would simply not suffice in the all-electronic world envisioned for BASE IV.
Multiple transaction types were already needed, and the payment and banking in-
dustries were still experiencing profound change, making it likely that entirely new,
unforeseen products and services might arise in the future, requiring completely new
types of transactions and message fields. As with any large, decentralized system,
changes to the messages would need to occur gradually, and the format had to allow
for some messages to include new fields while others omitted them.
To accommodate these requirements, IBM developed a dynamic format that
could be extended gradually over time without significant changes to the switch-
ing software. Each message began with a type indicator that distinguished between
4Peirce interview. Peirce stressed that as an IBM salesperson, he had every incentive to encourage
NBI to pursue the plan, but he knew that it would end in disaster, and thus was unwilling to risk
the long-term relationship between the two organizations.
5Peirce correspondence.
138 7 Automating the Point of Sale: Encoding Standards and Merchant Dial Terminals
authorization requests, financial transfers, reversals, administrative messages, or any
other kind of transaction that might be needed in the future. Following the type were
eight bytes treated as a bitmap: each of the 64 bits corresponded to a data field de-
fined in an external dictionary, and the value of the bit indicated if that field was
present or absent in the message. To enable more than 64 fields, one of the bits was
eventually reserved to indicate whether another bitmap and set of fields followed the
current one.6 Thus, messages could contain only the necessary and relevant fields,
densely packed, with a relatively small eight-byte overhead per fieldset to indicate
which fields were present.
As new fields were defined, the only change necessary to the switching soft-
ware was a new entry in a field definition table. Although the standard allowed for
variable-length fields, the values of such fields were always prefixed by their actual
length, enabling the switching and logging systems to handle them opaquely. Issuers
could also take advantage of new field values when present, or safely ignore them.
After a battle with the airline industry, which is unfortunately too detailed to
cover here, this format was eventually ratified as the standard for all electronic fi-
nancial messages by the ANSI and ISO banking industry committees. The format,
known as ISO 8583, allowed Visa to not only support new types of transactions over
time, such as single-message debit, but also add new fields incrementally to existing
transactions, such as the Card Verification Value (CVV) or the related three-digit
number in the signature panel used when the card is not swiped through a terminal
(CVV2).7
Encoding the Card: Magnetic Stripes and Magic Middles
One of BASE IV’s key design goals was to remove the paper sales drafts entirely
from the system. All transactions were to be originated in electronic form at the
point of sale, and that implied not only some sort of counter-top electronic device,
but also a machine-readable card. A POS terminal that required manual entry of the
card details would suffer from the same data entry errors that occurred before the
use of embossed cards and imprinters discussed in Chap. 1. Thus, the POS terminals
needed to “read” the card directly, and that implied a mechanism for encoding the
account details onto the card itself in some sort of machine-readable form.
The BASE IV design did not specify any particular method for encoding the
card, primarily because there was considerable debate at the time within the banking
and airline industries as to how this should be done. Visa would eventually force a
temporary closure of this debate, but to understand the issue fully, we must first
review the various encoding options and the ways in which certain groups made
claims about the superiority of their technique over others.
6According to Derman, this chaining of bitmaps and fields was added during the ANSI standards
process and was not part of the original IBM design.
7For a description of single-message debit transactions, see Chap. 8.
Encoding the Card: Magnetic Stripes and Magic Middles 139
Encoding Options and Standards
In the early 1970s, there were two general approaches to making the card machine-
readable: optics and magnetics. Within these two approaches, issuers experimented
with various techniques, but they eventually standardized on Optical Character
Recognition (OCR) and the magnetic stripe (often abbreviated as “magstripe”). The
approach used generally depended upon the issuer’s industry; the oil and retail in-
dustries normally preferred OCR, while the banking and airline industries typically
favored the magstripe. This was not entirely universal, however, and as we shall see,
one powerful bank developed and promoted its own unique optical technique.
Simply defined, an OCR system “reads” alpha-numeric characters printed in
specific fonts (or encoded in variable-width bars) using optical sensors and shape-
detecting algorithms. The retail and oil industries both made early commitments
to this technology. Standard Oil of California installed what seems to be the first
OCR-based data capture system for card sales drafts in 1956.8 The National Re-
tail Merchants Association formed an optical scanning standards committee in the
late 1950s, which subsequently recommended the use of a similar system that could
read product identifiers printed on labels.9 In the 1960s, Addressograph-Multigraph
perfected their “barcode” technique, which encoded the characters into a series of
parallel vertical bars, and these proved easier for the machines to read reliably.10
Most of the retail industry eventually adopted the barcode technique, especially the
supermarkets, and electronic cash register manufactures began to build-in scanning
wands to read them.11
Because the oil and retail industries were already using OCR to capture their
payment card drafts, it was a relatively easy step to propose reading the card directly
at the point of sale using a similar technique. The embossed characters on the card
were already printed in an OCR-readable font so that they could be read from the
imprinted draft, and the OCR sensors were beginning to reduce in size and cost.
The Data Source Corporation seems to be the first vendor to have developed
an OCR-based, card-reading POS terminal. NDC, the large processor discussed in
Chap. 4, installed these terminals at numerous service stations and retail locations
in 1971, and the first unit installed reportedly caught an unauthorized card on its
14th transaction.12 Data Source and NDC claimed that OCR was the best technique
for POS terminals, as issuers did not need to add anything to their cards. They
often neglected, however, to mention that although the POS terminals could read
the account number, which was embossed in the standard IMR-7B OCR font, they
8Schantz (1982), p. 11.
9Schantz (1982), p. 13.
10Schantz (1982), pp. 15–16.
11Campbell-Kelly and Aspray (1996), pp. 176–180. In the early 1980s, Visa considered requiring a
barcode on their debit card, which they were trying to sell to the supermarkets, but decided against
it because it lacked the necessary capacity.
12‘NDC credit authorization pilot underway’, Payment Systems Newsletter (July 1971), p. 7, ‘Op-
erations and systems notes’ American Banker (16 February 1972), p. 6.
140 7 Automating the Point of Sale: Encoding Standards and Merchant Dial Terminals
could not yet read the expiration date, which was inexplicably printed in a different
font.
The banking and airline industries also made early commitments, but to magnet-
ics instead of OCR. As noted in Chap. 1, the banks standardized on the Magnetic
Ink Character Recognition (MICR) technique in 1957 for automating the processing
of checks and other bank drafts. MICR was never considered as a candidate for card
encoding, but in the late 1960s, the airlines and IBM developed another magnetic
technique that seemed promising: the magnetic stripe.13
The magstripe is essentially a piece of magnetic tape, similar to that used for
computer data storage or audio recording, affixed by heat to a paper ticket or plastic
card. Just like a computer storage tape, the magstripe can be encoded with binary
data, which can then be extracted by passing the tape over a relatively inexpensive
reader head. The airlines used this technique for their automated ticket vending
systems, and adopted it as a standard for their own, privately-issued payment cards
in 1969. The various cash dispenser manufacturers also adopted this technique for
their access cards in the early 1970s.
As discussed in Chap. 4, many banks conducted POS terminal tests using the
magstripe during 1971. When plans for these tests became known, the American
Bankers Association (ABA) formed a task force to develop standards for card en-
coding, hoping to avoid unnecessary duplication and fragmentation in the market-
place.
The ABA task force evaluated a few different encoding techniques according
to four basic criteria: availability, reliability, cost, and security.14 In MacKenzie’s
terms, these criteria were four “properties” of the artifact, about which the task force
would construct knowledge and disseminate it via the authority of the ABA.15
In their report, they concluded that the magstripe “offered the greatest opportu-
nity to satisfy a wide variety of requirements for both present and future needs.”16 In
many ways, their conclusion was entirely expected, as most of the task force mem-
bers came from those banks already planning POS terminal tests using magstripes.
Later critics would question whether the task force members recommended the
magstripe primarily because the members had already made large investments in
it.17 But this accusation had an obvious defense: those who had already made in-
vestments in the magstripe would have done so only after their own investigations,
13It may be surprising that MICR was never considered, but Perry Hudson, who served as chairman
of the ABA card standardization task force, remarked that it was simply never suggested (Hudson
interview).
14Hudson noted that OCR was the only serious competitor to the stripe, but at the time of their
investigation (1970), OCR POS terminals were not yet available. Additionally, Magtek was already
selling a magstripe POS reader that was being used by the airlines.
15MacKenzie argues that we construct knowledge about the properties of artifacts according to four
methods: testimony of authority; induction through testing; induction through use; and deduction.
Each of these methods involves a social dynamic, even deduction, which is typically thought to be
asocial. See MacKenzie (1996).
16‘Magnetic stripe for credit cards urged by ABA unit’, American Banker (16 February 1971), p. 1.
17For example, see Brooke (3 November 1971), p. 6.
Encoding the Card: Magnetic Stripes and Magic Middles 141
and their conclusions were unlikely to change when they made the same investiga-
tion as a member of the task force just a few months later. Not enough time had
passed yet for them to discover the various problems that would eventually surface
after the magstripe was used in production with payment cards.
The report offered several reasons why the magstripe was recommended over
other techniques. It was already widely available, and, as an established technology,
had proven its reliability and durability in the field. Although adding the stripe vir-
tually doubled the cost of the card, the reader heads were less expensive, simpler,
and more reliable than OCR sensors. The stripe also offered a large capacity, allow-
ing the inclusion of data beyond the basic account information visible on the card.
Finally, the stripe was volatile, allowing for the possibility of devices that could
write back to the stripe, which the task force thought might be desirable for off-line
systems.
In terms of availability, reliability, and cost, the magstripe genuinely seemed to
be the best option, and in the subsequent debates, these points remained largely
uncontested. The final criterion of security, however, was not so straightforward.
Regarding this property, the task force originally wrote:
While no encoding technology was thought to be foolproof against fraud, the magnetic
stripe was thought to have the greatest security against casual fraud because it is difficult to
alter, the data is not visible, and it requires a fairly high level of sophistication and collusion
to counterfeit.18
As we shall see, all of these claims, as well as the understanding of where security
should be evaluated, would soon be contested.
Magstripe Tracks
Although the airlines and the ABA recommended the magstripe for their cards, they
did not agree as to how the card information should be encoded upon it. Of cen-
tral concern was the density at which the data should be recorded. Magnetic tape
contains a large number of contiguous ferrite-oxide particles, and it is somewhat
arbitrary as to how one divides them into discrete segments representing binary val-
ues. The technology in general use at the time was able to read reliably at a density
of 75 bits per inch (bpi), but newer equipment in testing promised to read just as
reliably at 210 bpi.
The ABA wanted to establish a standard quickly because the various pilot tests
were scheduled to begin in the near future. Because the POS terminals being used
in these tests would perform online authorization only, the banks needed only two
fairly short fields on the magstripe: a 13-digit account number and a four-digit ex-
piration date.19 Using a 5-bit per character encoding at 75 bpi would provide the
18Quoted in ‘Magnetic stripe for credit cards urged by ABA unit’ American Banker
(16 February 1971).
19At this time, the account number was actually variable in length, but tended to be around 13
digits. Sixteen-digit numbers were not used until later.
142 7 Automating the Point of Sale: Encoding Standards and Merchant Dial Terminals
banks with space for 40 numeric characters, which was more than enough for their
needs.20 Additionally, they felt that the lower density would be more durable, as the
lighter packing created a lower potential for bit-dropout, a condition often caused
from damage incurred by the many unorthodox activities for which the cards were
often used, such as scraping ice off windshields or opening locked doors.21
The airlines, however, required more than the account number and expiration
date. To enable fully-automated ticketing, the magstripe also needed to carry the
cardholder’s name. Names require alpha-numeric characters, which implied at least
a 7-bit per character encoding. A density of 75 bpi simply did not provide enough
characters, so the airlines were willing to wait until 210 bpi readers were commer-
cially available.22
The issue was eventually resolved by subdividing the stripe into two tracks, the
first recorded at 210 bpi and the second at 75. The airlines claimed the first track and
defined a field layout that included the cardholder name, account number, expiration,
and a few airline-specific fields. The ABA took the second track and defined a field
layout that included only the account number and expiration. The magstripe on all
cards would contain both tracks, and devices could read either or both. To this day,
payment card magstripes still contain two tracks, encoded at different densities,
containing roughly the same information.23
Soon after this compromise, a third track at 210 bpi was also defined. Recall that
one of the benefits of the magstripe cited by the ABA task force was its change-
ability. The ABA allocated this track primarily for read/write scenarios, where ter-
minals and cash dispensing units would alter the contents based on the last transac-
tion. The definition of the track was given over to the thrift industry, and although
they recognized the value of writability, they saw it more as a chance to encode so-
phisticated personal identification data, such as a digitized finger or voice print.24
The third track was briefly used in a read/write mode for off-line cash dispensing
units, but was quickly abandoned after bankers realized just how easily it could
be read and altered using widely-available audio equipment. As telecommunica-
tion costs in the US dropped, and ATMs and other terminal devices became strictly
online, most issuers removed the third track in order to reduce the height of the
stripe.
20The encoding scheme used four data bits plus one parity bit per character, allowing for 16 distinct
values. This was enough for the digits 0 through 9, plus a few special values used as field separators
and begin/end markers.
21This point was made by Bertram Tobin of Chase Manhattan Bank, quoted in ‘Standards are the
glue’, Payment Systems Newsletter (July 1972), p. 1.
22The airline encoding scheme used 6 data bits plus one parity bit per character, providing a max-
imum of 79 alpha-numeric characters on the stripe.
23Derman interview.
24Brooke (14 September 1973), p. 6.
Encoding the Card: Magnetic Stripes and Magic Middles 143
Magstripe Security
Shortly after the ABA task force defined the encoding standards for the second track,
George Warfel from the Western States Bankcard Association began questioning its
security, pitting his authority as a trained engineer against that of the ABA. He
did not mince words: “Upon encodement with the American Bankers Association-
proposed format, you create a fraudable document that can plague the entire credit
card community. . . ”25 He revealed that for about $150, an amateur can build a fairly
simple device using widely-available audio parts and transistors that could copy the
contents of one ABA-encoded stripe to another. He called it a “skimmer,” and noted
that “It is just like the tape-dubbing machine used by college students to copy tape
cassettes—except it works for cards.”
Playing on the fear of the counter-culture, he presented a scenario where a young
gas station attendant could use one of these devices to copy the data from the stripe
of a legitimate card to the stripe of a stolen one. Because POS terminals read only
the stripe on the stolen card, and not the embossed numbers on the front, any typical
transaction the thief made with the stolen card would be authorized. But sales drafts
generated using a card imprinter would pick up the embossed numbers, which were
for an account that was no longer valid.26 At this pre-BASE II time, it might take
weeks before that draft reached the issuer, and only then would the issuer realize
that the stolen card now had a new stripe. By the time the issuer could determine
which account had been skimmed, the attendant could easily skim a different card,
creating a near endless cycle of unstoppable fraud. Furthermore, if the stripes and
terminals were shared between the different payment networks, one could easily
skim the stripe from a BankAmericard and copy it to a Master Charge or American
Express; it would likely take months for the card organizations to determine what
had happened.
To be clear, Warfel’s concern was not with the magstripe itself, but with the way
the ABA proposed to encode it, and the environment in which it would be used.
Warfel observed that the only environment in which the magstripe was currently
used was cash dispensing. The access cards for these devices employed magstripes,
but they were encoded and used in much more secure ways. For example, Docutel
used four tracks to hold a “deviously scrambled code” that must be input by the
cardholder to complete the transaction. Burroughs included a second, unalterable
stripe that was encoded at the time of manufacture. IBM used a 45-degree rotation
on their more sophisticated reader heads. The cash dispenser manufacturers could do
all this because their devices were used under controlled conditions, and the added
encoding security contributed little to the $15,000 to $25,000 cost of a dispenser.
25Brooke (3 November 1971), p. 1. This article is an edited version of Warfel’s speech to the Data
Processing Supplies Association.
26Recall that these early POS terminals performed authorization only. Merchants still completed
a paper sales draft for each transaction, and it was these paper drafts that would be cleared and
settled.
144 7 Automating the Point of Sale: Encoding Standards and Merchant Dial Terminals
In contrast, the ABA-encoded stripe would be included on millions of cards and
used in hundreds of thousands of POS terminals that need to be purchased by rela-
tively low-volume merchants. In order for this to be economically feasible, the ABA
proposed a format that was much simpler and did not require any additional user in-
put. But Warfel felt that the ABA went too far, suggesting that their format was the
“extreme in simplicity” and was thus vulnerable to unimaginable amounts of fraud.
Although the format may have been adequate a few years earlier, technology had
developed in the meantime to the point where any hobbyist could build a skimmer:
Today you can buy transistors like gum-drops, in plastic bags by the dozen. The radio cat-
alogs list ‘credit card reader heads’ along with hi-fi components. Thus, what was secret in
‘67 is common knowledge today. What was secure in ‘67 is vulnerable today.27
Given the vulnerability of the ABA-proposed stripe, Warfel questioned whether
the banking industry should adopt OCR instead. By this time, Data Source was
offering their OCR terminal, and since it read the embossed numbers on the front,
the authorization and sales draft would always refer to the same account. This was
not completely secure though, as the numbers could be cut off and re-arranged,
or melted down and re-embossed, but it would be easier to detect than a skimmed
magstripe. Nevertheless, Warfel realized that switching to OCR may not be possible
given the existing investments in magstripes, so he also suggested that the ABA at
least require the use of high-coercivity materials. Once encoded, this kind of stripe
was essentially unalterable by a hobbyist, as changing it required special writing
heads and high amounts of magnetic energy.
The ABA task force quickly responded to Warfel’s criticisms by acknowledging
the vulnerabilities of the magstripe, but arguing that with some minor adjustments,
such as the use of high-coercivity materials, the magstripe was still more secure
than any other available option.28 They urged the banking industry to wait for the
results of the various POS terminal tests being conducted by the banks, as these
would reveal not only how secure the stripe was in practice, but also ways in which
it could be made more secure.
This was a subtle but important shift in the task force’s approach. They now
asserted that the proper level at which security should be discussed is the entire pay-
ment system, not just the particular card-encoding technique. In this way, they were
redefining the locus of the security property, focusing the participants away from the
magstripe artifact toward the system as a whole. The task force was envisioning a
future environment where the POS terminals would not only authorize transactions,
but also capture and transmit them electronically for clearing. Thus the stripe would
become the sole location of account data, eliminating the central problem Warfel
described. Even if a card was skimmed, the task force believed that fraud detection
algorithms running at the issuer or on the switches would quickly detect it, and a
simple examination of the transaction logs for the affected accounts would reveal
the merchant location where the skimming occurred.
27Warfel quoted in Brooke (3 November 1971), p. 1.
28Brooke (3 November 1971), p. 1.
Encoding the Card: Magnetic Stripes and Magic Middles 145
The debate subsided for nearly two years as various issuers conducted their POS
terminal tests, but it resurfaced again in April 1973. Jack Scantlin, chairman of
Transaction Technology Incorporated (TTI), a subsidiary of Citicorp, had been “sus-
picious of magnetics technology for quite some time,” and decided to see just how
easy it was to compromise the ABA-encoded stripe. Scantlin invited 22 students
from the California Institute of Technology (Cal Tech) to design devices that posed
a serious fraud potential, promising an attractive $5,000, $2,500, and $1,000 for the
three best entries. Each team submitted their devices, along with a detailed report,
and although TTI refused to discuss the devices for fear of giving criminals too
many good ideas, Business Week described two types of skimmers built for as little
as $25.29 Scantlin then issued a press release announcing that he had discovered a
“cheap and easy way to defraud the magnetic stripe,” and called into question the
ABA’s commitment to the technique.30
The ABA’s response to Scatlin was the same as their response to Warfel. This
time, however, the ABA questioned the actions of TTI, as its sibling Citibank was
already represented on the ABA task force. If TTI or Citibank had any exceptions
to the magstripe, or any suggestions for improving it, they could have raised them at
one of the task force meetings. Instead, they chose to issue a press release designed
to characterize the magstripe as the “Achilles heel of the whole credit card sys-
tem.”31 In response, Citicorp attempted to distance themselves from TTI’s actions,
stating that corporate management was unaware of the contest and would have never
condoned it.
When asked why they encouraged students to develop devices capable of gen-
erating fraud, John Reed, the Executive Vice President of Operations for Citibank
replied “we simply wanted to know about card-reading technology.” Unlike Warfel,
however, TTI and Citibank had an economic motivation for questioning the security
of the magstripe. They had recently invested more than $30 million developing a
different kind of proprietary, non-magnetic encoding technique. They were also just
about to use it for nearly a million Citicards, and would soon offer it to other banks
on a licensing basis. They called it the “Magic Middle.”
The Magic Middle
Citibank and TTI never publicly revealed the technical details about the Magic Mid-
dle, but much can be deduced from the patents granted to TTI in 1972 and 1973.32
The Magic Middle was essentially an optical form of a computer punch-card. As
the name indicates, a payment card using this technique contained a special middle
29‘Beating the new credit cards’, Business Week (11 August 1973), pp. 120–122.
30Brooke (9 April 1973), p. 1.
31Brooke (13 April 1973), p. 1.
32For the basic concept, see United States Patent number 3819910. For details of the actual encod-
ing method, see numbers 3775755 and 3858032.
146 7 Automating the Point of Sale: Encoding Standards and Merchant Dial Terminals
layer, sandwiched between the normal top and bottom layers of plastic. The outer
layers were opaque to the human eye, but infrared light could shine through them.
The middle layer was made of a material that would reflect infrared light, except for
the places where holes were punched through it. Thus, a reader could shine infrared
light from one side, and a sensor on the other side could detect light coming through
the holes, determining which were punched and which were not.
The middle layer contained four horizontal data tracks and one clocking track
in the center. The clocking track had every other row punched, providing a simple
means for ensuring proper alignment. The tracks were read vertically, one column
per character, allowing for a 4-bit encoding scheme. The width of the tracks, and
thus the maximum capacity on a standard payment card, was not disclosed, but since
it was used by Citibank for many years, it was likely as much as the lower-density
ABA track on the magstripe. The tracks ran across the width of the card, below the
magnetic stripe and embossed account numbers, allowing it to coexist with the other
encoding methods.
Armed with the results of their Cal Tech contest, Citibank and TTI claimed that
the Magic Middle was far more secure than the magstripe for two reasons. First, the
encoding technology was not even visible to the human eye, so it had a measure
of security through obscurity. Second, even if the technique became well-known, it
could not be copied without highly-specialized equipment. A Magic Middle skim-
mer would require an infrared light emitter and sensor, devices that were harder to
obtain in the early 1970s than a magnetic tape reader head. Of course, this also im-
plied that the card was far more expensive to manufacture, but Citibank argued that
this was a small price to pay for a completely secure encoding technique.
Citibank and TTI christened the Magic Middle in October 1973, after they had al-
ready issued nearly a million Citicards containing it and installed terminals at 1,200
merchants that could read it.33 Customers could use their Citicards for purchases at
those merchant locations, in Citibank ATMs, and for identification and checkcash-
ing at any of Citibank’s 226 branches. Two years later, Citibank would also install
special interactive terminals, called “Citicard Centers,” in their branches that would
enable cardholders to complete basic account management tasks without waiting
for, or speaking to, a teller. Interestingly, they admitted the Citicard Centers were
“designed to begin conditioning customers to use the terminals and to allay their
fears of computer technology.”34
When the Magic Middle was announced in 1973, Citibank articulated a non-
confrontational strategy regarding industry standards. Their spokesperson said:
Realistically, it is not within our plans to convert the whole industry. We feel we have a
better mousetrap than the mag stripe and embossed systems. We honestly feel this is a
better way. Whether our technology dominates is not relevant to us. It was developed for
our own use.35
33Tyson (25 October 1973), p. 1.
34Brooke (8 May 1975), p. 1.
35Mark Ponton, VP of Marketing, Personal Banking Group, quoted in Tyson (25 October 1973),
p. 1.
Encoding the Card: Magnetic Stripes and Magic Middles 147
Citibank changed its position less than a year later, however, announcing that they
would make the Magic Middle available for licensing nationwide.36 Furthermore,
they began working with National Cash Register (NCR) and Docutel to add Magic
Middle readers to their electronic registers and cash dispensing machines. Citibank
was now directly challenging the de jure ABA magstripe standard, hoping to estab-
lish their own proprietary technology as the new de facto standard.
In a somewhat cheeky move, the ABA responded to Citibank and the Magic
Middle by simply adjusting the card-encoding requirements to exclude proprietary
technologies.37 In a new amendment to their report, they required that any encod-
ing technique proposed as a standard must not incur licensing fees; have sufficient
capacity for recording all necessary information; and be available to any card issuer
regardless of industry. The ABA spokesperson admitted that these requirements ef-
fectively disqualified both the Magic Middle and OCR, but assured that they were
in the best interest of all issuers.
Citibank continued with its licensing plan, but was unable to sign enough banks
to pose a serious threat. In many ways, this was not surprising, as few banks would
be willing to pay the licensing fees and higher manufacturing costs, not to mention
trusting what Spencer Nilson called “the world’s most hated bank” with their en-
coding technology.38 When the major West Coast banks, such as BofA and Wells
Fargo, ventured into POS terminals, they chose the new devices from Data Source
instead, which could read both the magstripe and the embossed account numbers
and compare them to detect skimming.
Visa and the Magstripe
Throughout all of these debates, NBI/Visa remained mostly a passive observer, oc-
casionally commenting that although the magstripe seemed likely to become the
accepted standard, they would not rule out the emergence of a better encoding tech-
nique.39 As the 1970s drew to a close, Hock decided that it was time to encourage
full automation of the point of sale. This would not only bring Visa one step closer
to the all-electronic value-exchange system he envisioned in BASE IV, it would also
enable a zero floor limit environment, which would dramatically reduce the effects
of fraud (in a zero floor limit environment, every transaction is authorized, which
allows issuers to identify and stem fraud quickly). But this also implied that Visa
needed to mandate a standard encoding technique for all cards bearing their mark,
both domestically and internationally.
36Brooke (11 September 1974), p. 1.
37American Banker (14 November 1973), p. 1.
38Nilson (March 1978), Report No 182, p. 1.
39For example, see Brooke (18 October 1972), p. 1.
148 7 Automating the Point of Sale: Encoding Standards and Merchant Dial Terminals
The task of establishing Visa’s encoding standard fell to Win Derman, who had
already been working with the various standards groups on the bitmap message for-
mat.40 In addition to the basic ABA-defined fields, Derman defined two new ones
that would be needed in the Visa context. The first was a three-digit “service code,”
which at the time, merely indicated if the card could be used in international in-
terchange, domestic interchange, or no interchange at all. Some members of Visa
International operated in non-exchangeable currencies, so the magstripe needed to
include information that would prohibit use outside the country of issue. Although
one digit would have sufficed at the time, Derman argued that they should reserve
two more for future needs, and today, these are used to indicate what kind of au-
thorization is required, and what services the card supports. The second field was
a PIN verification value (PVV), which is generated through a one-way encryption
algorithm. The PVV allows a terminal or ATM to verify a PIN in an off-line envi-
ronment.
Although these two fields were small-enough to fit into the remaining space on
the ABA-defined second track, Derman also wanted to take advantage of the larger
capacity of the first track. By this time, 210 bpi magnetic reader heads had become
standard, and the ABA, wanting to take advantage of the larger capacity, had unfor-
tunately established a banking-specific format for the first track that differed from
that used by the airlines. To distinguish the two, both industries agreed to add a
single-character format code to the front of the stripe: A for airline and B for bank-
ing.
Derman wanted to build upon the airline’s format so that Visa cards could be read
easily by airline POS terminals. During this period, Visa was also concentrating on
improving their presence in the T&E market, so compatibility with the airlines’
systems, which American Express already had, was paramount. But convincing the
member banks to switch to the airline format for the first track would be difficult, as
many were already issuing cards using the banking format.
His solution was to recast the debate as a domestic versus international one,
knowing that Visa was now an international organization, and any standard they
proposed would need to be seen as international as well. Fortunately for Derman,
when the ABA defined their format for the first track, they encoded the expiration
date in the American MMYY format (that is, a two-digit month followed by a two-
digit year). The airline format, which was established through the International Air
Transport Association (IATA), used the more international form of YYMM. Since
the ABA recommended standards only for the US, international banks also tended
to use IATA’s YYMM format.
Derman presented his case to the US banks, arguing that the ABA format for the
first track was US-centric, and since Visa was an international organization, their
encoding standard should use an international date layout. Since the airline format
already expressed the expiration date in an international manner, it would make
sense to build upon that. The existing format code would then allow the US banks
40Information on the Visa magstripe standard comes from interviews with Derman.
Dialing for Dollars: The Merchant Dial Terminal Project 149
to gradually transition to the airline format, as the POS terminals could still read the
banking format during the changeover.
The US banks eventually agreed, and Derman got the standard ratified by In-
terbank, the ABA, ANSI and ISO. The banks and the airlines were now finally on
a common standard for the first track, although Visa cards would also continue to
carry the now-extended second track. In 1979, Visa adopted a bylaw requiring all
cards bearing their mark issued after 1980 to include a magnetic stripe, encoded
according to the Visa standard.41 Citibank, which had joined Visa after the ban on
dual membership was lifted, threatened to sue Visa for effectively destroying their
potential licensing market. They ultimately capitulated, however, in exchange for a
three month extension of the magstripe deadline.
Visa’s mandate of the magstripe forced a temporary closure to the card-encoding
debate. It would resurface again when card manufacturers perfected the embedding
of a computer chip in plastic, but for now, the path toward the development and
mass-adoption of inexpensive POS terminals was paved.



See visa_pos_origin.md