With interchange authorizations automated via BASE, NBI turned their attention to
the other half of their operational problems: clearing and settlement. In this chapter,
I will discuss NBI’s next major computer system development projects, known as
BASE II and III. BASE II replaced the cumbersome mailing of paper drafts between
members with a centralized, batch-oriented, electronic clearinghouse. BASE III was
intended to replace the old BofA punched-card accounting system given to new
members with a modern, sophisticated mainframe computer program capable of
seamless integration with BASE I and II. Although BASE II was highly successful,
building generic software for the member banks’ processing centers was not only
a significant departure from NBI’s core purpose, but also an activity they did not
entirely understand. As a result, the BASE III system failed to meet its objectives,
and was eventually canceled. As we shall see, however, Hock ultimately managed to
turn this first serious defeat into a personal victory that helped to ensure the financial
success of the organization.
Truncating the Paper: BASE II
In Chap. 2, I described the manual, tedious, and error-prone process for clearing and
settling interchange transactions in 1968. Although the BankAmericard organiza-
tion had been restructured in 1970, and the switching of interchange authorizations
had been automated in 1973, there was still no centralized clearinghouse. Acquir-
ing banks continued to sort and mail the physical sales drafts to each issuing bank,
where they were reconciled against clearing drafts that had already been received
and paid separately.
The member banks were able to cope with this process while the volumes re-
mained low, but as more banks joined NBI, and the sales volume increased by 30 to
40 percent each year, so did the number of interchange transactions. During 1972,
the NBI member banks exchanged 95 million drafts, and they projected that this
D.L. Stearns, Electronic Value Exchange, History of Computing,
DOI 10.1007/978-1-84996-139-4_5, © Springer-Verlag London Limited 2011
91
92 5 Automating Clearing and Settlement: BASE II and III
would rise to 225 million by the end of 1975.1 It was clear that without an auto-
mated, centralized clearinghouse, the BankAmericard system would grind to a halt.
As noted in the previous chapter, automating interchange authorizations was just
the first phase of Hock’s overall plan to build an electronic value exchange sys-
tem. Once BASE was put into operation in 1973, Hock quickly began the second
phase, which was aptly named BASE II.2 In this phase, he intended to automate
the clearing and settlement of interchange transactions, but instead of using high-
speed Magnetic Ink Character Recognition (MICR) readers and sorters as the Fed
had done with checks, he wanted to truncate the paper, transforming the sales drafts
into electronic records, and clearing them through a centralized computer system.3
Using this approach, interchange transactions could be cleared and settled as early
as the night after they were deposited.
But building an electronic clearing system would require engineering more than
just computers and telecommunications. It also required the “engineering” of a more
cultural dynamic: the consumer preference for country-club billing.4
Country-Club, Descriptive, and Facsimile Billing
In 1973, most NBI member banks performed country-club billing, which is the prac-
tice of returning the punch-card layer of each sales draft to the cardholder, along
with a summarized bill. The term originates from the traditional practice of coun-
try clubs in the US, nearly all of which would bill their members by returning the
“chits” signed when charging purchases at the club.5 For most cardholders, however,
this billing method was not as reminiscent of the genteel country club as much as it
was of their monthly checking account statements. At this time, most banks returned
canceled checks to account holders, providing them with not only a visual memory
of the transaction, but also a legal proof of payment. Thus, it seemed “natural” to
return bankcard sales drafts as well.
Interview sources noted several reasons why many cardholders preferred country-
club billing. First, the drafts provided them with instant visual memories of each
transaction, as merchants occasionally wrote a short description of the purchased
merchandise in the detail area. Second, cardholders could also quickly verify their
1‘NBI planning paperless card drafts’, American Banker (18 December 1973), p. 1.
2The original working name for BASE II was actually “Shared Paperless Activity Network” or the
“SPAN between the banks” (Derman interview). “Paperless” commonly appeared in the names of
electronic clearing systems at this time, highlighting that the primary goal was to eliminate the
flow of paper.
3Note that with the passage of the “Check 21” Act in October 2003, checks in the US may now be
truncated and cleared electronically. See Wade (28 October 2003), p. 23. In fact, some merchants
now simply pass checksthrough a scanner and hand the physical paper back to the customer.
4My language here draws upon John Law’s idea of “heterogenous engineering.” See Law (1987).
5Jutilla (1973), p. 181.
Truncating the Paper: BASE II 93
signatures on each draft to ensure that each was a legitimate charge. Third, those
who kept the customer receipt layers from the time of sale could easily compare
those against the punch-card layers returned by the issuer, ensuring that amounts
had not been altered, and noting which transactions were still pending. Fourth, for
those who did not wish to keep the customer receipts, the punch-cards returned by
the issuer could be used as an evidence of payment for expense reports and income
tax returns. Technically, bankcard sales drafts were not legal proofs of payment
like canceled checks, but they were effectively treated as such by cardholders, their
employers, and most importantly, the US Internal Revenue Service.6
Country-club billing was also advantageous for smaller issuers. Because the
drafts were punch-cards, they could be sorted, tabulated and collated by rather sim-
ple mechanical devices, instead of expensive mainframe computers.7 Summary bills
could be generated using the old BofA software that was still given to new mem-
bers when they joined NBI. Additionally, because the drafts were returned to the
cardholder, the issuer did not need to capture the merchant names and locations in
electronic form, as they were printed directly onto the drafts.
An alternative to country-club billing, called descriptive billing, began to appear
in the late 1960s, but was not widely used in the BankAmericard system until after
BASE II was completed.8 In this method, the issuer captured the information from
the sales drafts in electronic form, stored it in a computer file, and sent cardholders
only a simple list of their transactions. For each transaction, the statement listed the
purchase or posting date, the merchant name and location, and the amount. Because
the transaction information was reproduced in descriptive form, the physical drafts
were not returned to the cardholder.9 The issuer stored the drafts for a short period
of time, and then maintained a microfilm copy in case the cardholder disputed the
charge.
The descriptive billing method was preferred by issuers with larger volumes be-
cause it required handling the paper only once, which greatly reduced their labor and
postage costs. It was also preferred by NBI, because it did not require the movement
of paper from acquirers to issuers. Ultimately, NBI wanted to truncate the paper at
the acquirer and clear the transactions in electronic form, but this would be impos-
sible if cardholders continued to demand the original drafts.
Neither Hock nor his staff at NBI, however, believed that all cardholders were
actually “demanding” the original drafts; they were merely accustomed to receiving
them. Although some cardholders were no doubt reassured by the original, most
6See the “Supporting Documents” section of IRS publication number 583, http://www.irs.gov/
publications/p583/ar02.html (accessed on 18 December 2006). The difference between “proof”
and “evidence” of payment is subtle—the former is a legal proof recognized by the courts, and
supported by the Universal Commercial Code, while the latter is something that a particular party
(e.g., an employer or the IRS) would accept as sufficient evidence.
7Dumler interview.
8For an explanation of descriptive billing and its benefits for the banks, see Magnis (1970).
9Some banks used a hybrid method, returning the physical drafts for on-us transactions, but pro-
viding a descriptive bill for interchange transactions (Dumler interview).
94 5 Automating Clearing and Settlement: BASE II and III
would probably not notice if they received something that merely looked like the
original, as long as it contained the most important information: the merchant name
and location; the date of the transaction; and the amount. In fact, cardholders already
received on occasion a clone of the original draft if it was badly mangled by the
merchant or the punch-card readers.10 If the issuer could print what NBI called a
facsimile draft, based upon transaction information electronically transmitted from
the acquirer, most customers might not even notice the difference, and even if they
did, the facsimile would still be an adequate evidence of payment. If the cardholders
accepted the facsimile drafts without serious complaint, the bank was then one step
closer to implementing descriptive billing.
To test this hypothesis, NBI conducted an experiment with six of its more
technically-advanced banks starting in early 1973.11 Acquirers of interchange drafts
captured the descriptive billing information in electronic form, and then transmitted
it to the issuer. The issuer then computer-printed the transaction information onto the
punch-card layer of a new, blank sales draft and sent that to the cardholder with their
summarized bill.12 The facsimile looked nearly the same as the original, but did not
contain any details of the purchased merchandise, nor the cardholder’s signature.
The lack of item detail actually posed little problem as most merchants neglected
to write anything meaningful, and as long as the customer recognized the charge,
their signature was superfluous. If the customer could not recognize the charge, or
needed the original for some other purpose, the customer could still request it from
their issuer. The issuer would then request it from the acquirer, who would send
it through the mail. Effectively, the movement and return of physical sales drafts
became the exception instead of the rule.
In October 1973, NBI announced that “neither its member banks nor cardholders
have related any major problems or objections to the facsimile drafts. . . ”13 Again, it
was not that cardholders were delighted by the facsimile drafts; they simply did not
care enough to complain about them to any significant extent. After a few months,
they also became accustomed to them, and requests for originals were infrequent.
During the test, cardholders requested only 1 original for every 500 facsimiles.
Forty-five percent of those were due to the cardholder not recognizing the acquirer’s
processing name for the merchant, which often differed from the merchant’s trade
name, but this could easily be adjusted. Nineteen percent were requested for busi-
ness purposes, typically for employers who were wary of the facsimiles, and those
cardholders quickly learned to keep the customer receipt layer of the original draft.
The remaining 17 percent were requested by the issuer for fraud analysis and pros-
ecution.14
10Dumler interview.
11‘NBI finds no major problems with facsimile drafts’, American Banker (10 October 1973), p. 81.
Confirmed in Dumler, Derman, and Russell interviews.
12Note that this was not an exact, pixel-for-pixel copy of the original draft. The new draft was
printed from discrete, alpha-numeric data.
13NBI finds no major problems.
14A later story from December quotes Hock as saying that 1 in 300 were requested, so either
the ratio increased somewhat over the two-month period, or it was reported incorrectly. See ‘NBI
Truncating the Paper: BASE II 95
In essence, this test was the key to determining if BASE II was culturally pos-
sible. NBI could engineer the computer systems and telecommunication networks,
but if they could not also “engineer” the cardholder acceptance of facsimile drafts
(which were just descriptive billing in a more recognizable form), cardholders would
have demanded so many of their originals as to negate the benefits of an electronic
clearing and settlement system.
As consumers used the card for more purchases, and descriptive billing became
the norm, some cardholders did begin to complain, and in 1977, Rep. Frank Annun-
zio (D-Ill) proposed a bill that would have effectively outlawed descriptive billing.15
This section was removed, however, from the final bill, as it was then too late to
mandate a return to country-club billing, and the committee eventually realized that
ensuring cardholder rights during charge disputes was the real issue. The 1973 test,
however, showed that facsimile drafts would be acceptable to the current cardholder
base, allowing NBI to continue with the design and implementation of BASE II.
Design of BASE II
The design of BASE II fell to a newly-hired employee named Win Derman.16
A graduate of MIT and Stanford, Derman became NBI’s 25th employee after a stint
with the Stanford Research Institute, where he had specialized in management en-
gineering and systems design. B Ray Traweek was also hired to manage the overall
project. Traweek’s extensive experience with computer systems began while earn-
ing a Masters in Mathematics from the University of Texas, and was honed while
working for Convair (now part of General Dynamics) and TRW. While at TRW,
he had worked on a banking system with Aram Tootelian, and when the BASE II
project began, Tootelian convinced Traweek to come to NBI to lead it.
NBI had originally planned to use the same network of Sanders terminals de-
veloped for BASE (now renamed BASE I to avoid confusion) for the electronic
clearing and settlement of interchange transactions. They assumed that acquirers
could manually key the transactions into the terminal, sending each as a new type
of message to the central switching computer. But Derman quickly realized that the
growing number of transactions would ultimately make this approach impractical,
so he convinced the NBI management that BASE II should use a batch transmission
approach instead.
planning paperless card drafts’, American Banker (18 December 1973), p. 1. Either way, the ratio
was still small enough to justify building BASE II.
15The text of the original bill, HR 8753, and a transcript of the hearings is available in ‘The Con-
sumer Credit Protection Act Ammendments of 1977’, 95th Congress, First Session (March 1977).
See also Nilson (August 1977), Report No 169, p. 1.
16Details of the BASE II project primarily come from interviews with Derman, Traweek, Russell,
Goldsmith, and Peirce.
96 5 Automating Clearing and Settlement: BASE II and III
In essence, the new BASE II design was a computerized version of the clear-
inghouse concept discussed in Chap. 1. Although BASE II was not the first im-
plementation of this idea, commonly called an automated clearinghouse (ACH), it
was by far the largest and most ambitious, the first with a national scope, and the
first in the domain of bankcards.17 With the BASE II system, NBI would act as
the centralized clearinghouse of all BankAmericard interchange transactions, but
instead of exchanging paper, the acquirers and issuers would exchange electronic
records of those transactions. Instead of maintaining high-speed MICR readers and
sorters, NBI would maintain one central mainframe computer to collect, sort, total,
and distribute the transaction data. Furthermore, because the electronic transactions
could be transmitted over telecommunication lines, all the BankAmericard process-
ing centers in the entire nation could clear and settle through the clearinghouse every
night.
Additionally, members would now also settle with the clearinghouse instead of
each other. Prior to BASE II, the BankAmericard system performed bilateral gross
settlement, meaning that each acquiring bank B1 collected from each issuing bank
B2 the total amount (less interchange fees) of all transactions involving the issuer’s
cards. Since nearly every acquirer was also an issuer at this time, B2 might also col-
lect roughly the same amount from B1 on the same day. In theory, this could result
in n(n− 1) transfers of similar amounts between every pair of members every day.
With BASE II, each member would settle only with the clearinghouse, resulting
in just one value transfer per member per day. Furthermore, BASE II would per-
form net settlement, meaning that the amount each member owed the clearinghouse
would be subtracted from the amount the clearinghouse owed the member, and the
member would pay or receive only the difference.18
Data Capture
In order for all of this to work, however, the acquirers needed to encode the paper
sales drafts into an electronic form that could be transmitted to NBI’s data cen-
ter. This process, known as data capture, could be accomplished either by manual
entry, or by scanning the drafts using an Optical Character Recognition (OCR) de-
vice. The latter promised to be faster and more accurate than the former, but even
in the ideal case, the OCR scanners of the early 1970s could capture only half of
17In the late 1960s, the California commercial banks organized the Special Committee on Paper-
less Entries (SCOPE), which resulted in the creation of the California Automated Clearinghouse
Association (CACHA) (Yeatrakas interview). This organization, with the help of the Federal Re-
serve Bank of San Francisco, began operating what seems to be the first ACH in the US on 13
October 1972. See Brooke (4 June 1973), p. 13. This was only a regional system for direct de-
posit and pre-authorized debit transactions, whereas BASE II was a national system for bankcard
transactions.
18Although this was new for the BankAmericard system, most other clearinghouses already used
the net settlement technique to reduce the amount of funds transferred.
Truncating the Paper: BASE II 97
the information.19 The card and merchant numbers were printed in a standard OCR
font, but the transaction date and amount were typically hand-written on the draft by
the merchant. Eventually imprinters with adjustable embossed wheels for the date
and amount became available, allowing the OCR scanners to read the entire draft
automatically. These imprinters were not widely adopted, however, as they were
more expensive and consumed more counter space. Counter space is actually an of-
ten overlooked, yet critically-important dynamic in the history of payment systems.
Many merchants have very limited counter space, and any system that requires a
separate, large counter-top device faces a significant barrier to adoption. Addition-
ally, the hype surrounding Electronic Funds Transfer Systems (EFTS) promised that
all paper would soon be eliminated from all aspects of banking, so acquirers were
not concentrating on how to make the processing of paper drafts more efficient.20
In fact, many of the largest acquirers continued to use manual data capture until the
widespread adoption of merchant point of sale terminals in the mid 1980s.
Although moving to a system of electronic data capture required an enormous
amount of work and expense on the part of acquirers, they were, in many ways,
eager to change. This is how Derman explained it:
The reason that the member banks turned heaven and earth to do BASE II can be exemplified
by one comment: a banker in New Jersey took me out in the hall and said, “look, you’re
going to make me do a tremendous amount of work to change . . . but I’m going to do it.
And you know why? Look up there on the wall; see that line? That’s how high we stack
the sales drafts that come in from our merchant banks when they process their Christmas
volume, which is when we do half our business. And it takes us four months to work through
that! And we’re at risk for all those transactions and all that fraud during that four month
period.”21
Recall that acquirers credited a merchant’s account upon deposit of the drafts, but
the acquirer could not recover those funds until the drafts were processed, either by
billing the cardholder for local transactions, or clearing and settling the non-local
drafts through interchange. Any delays in processing resulted in increased float, and
corresponding costs for the acquirer. Additionally, issuers were liable for any fraud-
ulent transactions, and had no way to stop further purchases until they processed
the drafts and detected that the card had been compromised. Thus, by shifting to
semi- or fully-automated OCR data capture, acquirers could not only process their
local transactions more quickly, they could also clear and settle their interchange
transactions the same night through BASE II.
19What credit card executives should know about OCR readers, Nilson (November 1977), Report
No 174, p. 1.
20Nilson rebuked this approach as myopic: “At this point in time, handling credit/debit transactions
via electronic terminals in any volume is only a mirage. Except for automated teller machines and
cash dispensers, EFTS is a bust! . . . Banks, which until recent months had hoped EFTS would
reduce the paper flow, must now find other ways to deal with the volume of sales slips which will
increase at least 100% in the next five years as predicted in my last issue” (Nilson November 1977,
Report No 174, p. 1).
21Derman interview.
98 5 Automating Clearing and Settlement: BASE II and III
Edit Package and TTUs
After acquirers captured the draft information in electronic form, they could then
easily separate interchange transactions from local ones. They were, however, no
longer required to sort and total the interchange transactions by issuer. Instead they
simply submitted them in batch to the central clearing computer, which would sort
and total all transactions submitted from all acquirers.
To get the transactions to the BASE II central computer, acquirers first needed to
transform their data records into the BASE II format and validate them. The acquir-
ers wrote their own software to convert formats, but validation was accomplished
by running a program supplied by NBI, called the edit package.
22 This program en-
sured that all data were present, dates were in the correct format, card numbers were
valid, and anything else that was necessary to ensure that all the transactions in the
batch could be properly cleared and settled. The program also produced a number
of reports that the member banks could use as a printed record of their outgoing
transactions.
Although it was costly for NBI to maintain a version of the edit package for each
kind of computer used by the processing centers, it was ultimately advantageous
because they could clear and settle batches of transactions without having to handle
individual exceptions. If the batch passed the edit package, every transaction could
be cleared; if it did not, the acquirer had to correct the problematic transactions, or
remove them from the batch. By making the batch the atomic unit, NBI greatly sim-
plified the task of interchange accounting, as the amount submitted to interchange
would always equal the amount credited, minus fees.23
After validating the interchange transactions using the edit package, acquirers
copied them onto a magnetic tape, which was then mounted onto their tape trans-
mission unit (TTU). The TTUs were custom-engineered DEC PDP-11/10 minicom-
puters equipped with a tape drive, modem, and a bell (explained later).24 NBI con-
tracted with DEC to install and maintain one of these devices in each of the 88
BankAmericard processing centers in the US.
Central Clearing Computer
At the core of the BASE II system was a large mainframe computer. Each night,
starting at 5:00 PM Pacific Time, the central computer would begin calling each of
the TTUs according to a schedule established with the processing centers. Because
the TTU was a minicomputer, it could answer the call and establish communica-
tions automatically. For five hours, known as the input phase, the central computer
22Derman and Traweek interviews.
23Reportedly, Interbank’s automated clearing and settlement system initially allowed individual
exceptions, but they quickly moved to NBI’s model as the exceptions were too difficult to manage
(Derman and Powar interviews).
24Derman interview.
Truncating the Paper: BASE II 99
initiated connections to each TTU and read all the transactions contained on each
tape. During the validation process, the edit package inserted verification amounts
onto the tape so that the mainframe program could ensure that the information was
transmitted accurately; if it had not, the TTU could automatically backup to the
last checkpoint and resume transmission.25 At the end of a successful transmission,
the central mainframe then sent an instruction to the TTU that triggered it to ring
the aforementioned bell. This bell told the operator in the processing center to un-
mount the tape containing the outgoing transactions, and mount a new blank tape
for the incoming transactions and summary reports.26 Unfortunately, the tapes at
this time did not contain enough capacity for both the outgoing and incoming trans-
actions.
The central computer then moved into a two hour sort and calculation phase,
during which it performed a number of tasks necessary for clearing and settlement.
It first calculated the amount owed to each acquirer, which was the total of their
submitted transactions, minus the interchange reimbursement and NBI’s processing
fees (1.95 percent and 2.5 cents per item respectively). It then sorted the transactions
by issuer and calculated how much each issuer owed. Finally, it computed the net
amount each member owed or was due from the clearinghouse. This information
was then printed by NBI for use in the actual settlement, as well as auditing and
accounting.
The final phase of the BASE II cycle was called the output phase. For five more
hours, the mainframe again established connections with each of the TTUs, and
streamed back all the interchange transactions for which that bank was the issuer.
The member banks could then extract these transactions using the edit package, and
incorporate them into their own billing systems. In addition to the incoming trans-
actions, the central system also transmitted a full clearing report (which the member
could use for bookkeeping and reconciliation), as well as the net settlement amount
for that bank. By 5:00 AM Pacific Time the next morning, each bank had all the
information they needed to bill their cardholders and settle with the clearinghouse.
The actual movement of “good and final funds” was still accomplished with
clearing drafts, but now NBI completed these drafts on behalf of the members. Iron-
ically, this last step in the process was not initially automated by BASE II, so after
the drafts were prepared, an NBI employee literally got in her car and drove them to
a BofA branch located just down the hill from NBI’s data center.27 This settlement
process was eventually automated in the 1980s by transmitting the net settlement
amounts electronically to a clearing bank.
Although 5:00 PM seems like an appropriate “close of business” time to begin
the BASE II process, Derman explained that this start time was actually chosen for
a more significant reason:
25Traweek interview. Confirmed in Brooke (6 November 1974), p. 1.
26Derman interview.
27Kollmann, Nordemann, and Harrison interviews.
100 5 Automating Clearing and Settlement: BASE II and III
We, even in those days, thought this was a worldwide system, so we ran everything world-
wide. We didn’t arbitrarily pick 5:00 PM. We said 5:00 PM is GMT 0:00.28
Although the original BASE II provided nightly clearing and settlement for the US
member banks only, as we shall see, it was eventually expanded to be the clearing-
house for all members worldwide.
Making Up With IBM
The original capacity target for BASE II was to clear one million transactions within
their allotted 12-hour processing window.29 Considering the rate at which the sys-
tem volume was increasing, it was also likely that they would need to expand their
capacity within just a few years. Unfortunately for Hock, the only mainframe com-
puter capable of processing that kind of load and enabling seamless capacity up-
grades was made by IBM. Recall that Hock had previously sworn never to do busi-
ness with IBM again, but the capacity requirements for BASE II made that pledge
difficult to maintain.
Fortunately, IBM had recently transferred the NBI account from the Banking to
the Manufacturing and Distribution Office, and it was now in the capable hands of
an IBM sales representative named Roger Peirce. Peirce had been with IBM since
1963, first as a systems engineer and later as a direct commissioned salesperson. He
had all the qualities that Hock respected: a sharp intellect, technical competence,
business savvy, and a direct, no-nonsense communication style. Additionally, while
developing numerous information systems, Peirce had learned not only what was
required for a successful project, but also how to handle difficult customers.
Traweek and Derman knew that BASE II required an IBM mainframe, but con-
vincing Hock to buy one would be a challenge considering that Hock typically re-
fused to talk with IBM sales representatives. They approached Peirce and asked him
to do something to soften Hock’s temper. Peirce explained what they did:
We arranged what we called “the pillow call.” . . . We got the highest ranking guy we could
find in IBM. . . and we convinced him to come out. We said “look, this is going to be an
unpleasant call—strap a pillow on your ass because you’re going to get beaten!” So we
went into this meeting and Dee basically railed and ranted at the guy for an hour and then
went out, but after it was all done, it worked, and they decided they would do business with
IBM.30
NBI ordered a System/370 model 145, and Peirce called in a number of favors to
advance its delivery so that it could be installed in time.31
28Derman interview.
29Derman interview.
30Peirce interview.
31Peirce interview. This was the first IBM mainframe to use silicon memory chips instead of a mag-
netic core. See http://www-03.ibm.com/ibm/history/exhibits/mainframe/mainframe_PP3145.html
(accessed on 15 December 2006).
Truncating the Paper: BASE II 101
Peirce personally oversaw the installation of the mainframe in April 1974, which
no doubt endeared him to Hock. IBM, the most important computer company in
the world, was now treating Hock as the important client he saw himself to be.
As a result, Hock became more amenable to IBM, and Peirce in particular, which
would eventually enable IBM to sell Hock on moving BASE I to their platform
as well.32 Peirce would also later join NBI and become Vice President of Systems
Development, Operations, and Member Relations.
Final Development and Rollout
In addition to IBM, NBI contracted with a number of other vendors to construct the
various pieces of BASE II. DEC built, installed, tested, and maintained the TTUs
at the 88 BankAmericard processing centers. AT&T again supplied the telecom-
munications. Arthur Andersen designed the audit control system, and the Stanford
Research Institute (SRI) performed the technical acceptance tests.33 Compata, the
organization that had written the BASE software, also returned to write the software
for BASE II.34 Using the same project management techniques they used for BASE,
NBI completed the new system by November 1974, within its allocated budget of
$7 million, and timeframe of 18 months.35
Some of the processing centers, however, still had not yet implemented their data
capture systems by November. Thus all could receive interchange transactions from
BASE II, but not all could send them. Therefore, NBI mandated that on 1 November
1974, every issuer had to receive electronic interchange transactions via BASE II,
but the acquirers who had not yet automated could continue to mail paper drafts
through the Christmas season; by 1 March 1975, all interchange transactions had to
be cleared electronically. Both deadlines were met by the members, and the mailing
of original drafts became the exception rather than the rule for the entire system.
It is important to note that on this latter date, the paper did not entirely disappear
from the system. The paper was eliminated for the most part from interchange, but
most merchants still completed and deposited paper drafts, and acquirers still han-
dled that paper during data capture. The paper was not removed from this segment
of the clearing path until Visa coordinated the development of small, inexpensive
point of sale dial terminals. That story will be discussed in Chap. 7.
32Details of the BASE I port to IBM and the TPF operating system will be discussed in the next
chapter.
33Although SRI had already separated from Stanford University in 1970, they did not for-
mally change their name to SRI International until 1977. See http://www.sri.com/about/facts.html
(accessed on 11 November 2010).
34Brooke (6 November 1974), p. 1.
35Hock (1974), p. 13.
102 5 Automating Clearing and Settlement: BASE II and III
Effects of the System
BASE II altered the BankAmericard system in five important ways. First, BASE II
dramatically reduced the time it took to clear and settle interchange transactions.
Under the manual system, it took an average of six to eight days for sales drafts to
reach the issuer, where they often failed to reconcile with the already paid clear-
ing draft; with BASE II, all sales drafts were now cleared and settled, in batch,
overnight.36
Second, the reduction in clearing time resulted in a corresponding reduction in
float, mostly for the acquirers, but also for the issuers. BASE II essentially forced the
acquirers to implement an automated data capture system, enabling them to submit
transactions to interchange much more quickly, and thus recover the funds they had
already credited to their merchants. Issuers received the transaction details electron-
ically at the same time they paid the acquirers, which not only eliminated the painful
reconciliation process, but also provided an easy way to import the transactions into
their billing systems in order to recover funds from the cardholder.
Third, automating the interchange process dramatically reduced the labor and
postage costs associated with the clearing and settlement of interchange transac-
tions. NBI estimated at the time that BASE II saved the members between $14
and $17 million in gross clearing costs during its first year of operation alone.37
Although the exact amount would have been difficult to substantiate, as so many as-
pects of the business were in constant flux, there is no question that the labor costs
alone would have made the existing manual process uneconomical as the number of
interchange transactions increased.
Fourth, faster clearing also meant that issuers now received fraudulent inter-
change transactions in a more timely manner. Although BASE I stopped many
fraudulent transactions, it only saw those that were over the merchant’s floor limit.
A compromised card number could still be used for numerous charges under the
floor limit. The issuer would have no way of knowing that fraud was occurring until
those transactions were cleared through interchange. The faster transactions were
cleared, the faster the issuer could detect fraud, and take steps to cancel and recover
the card.
Lastly, BASE II established a platform upon which NBI could offer other batch-
oriented data transfer services between the members, just as BASE I provided a plat-
form for online message exchange.38 From its inception, BASE II allowed members
to transmit other administrative transactions such as chargebacks, reversals, and re-
quests for originals, in addition to interchange drafts.39 BASE II was later extended
36Brooke (6 November 1974), p. 1.
37Brooke (6 November 1974), p. 1.
38The term “online” is often used in many different ways. Here I mean a system that maintains con-
stant communication links between nodes, passing individual messages in a near-real-time manner.
Some news accounts referred to BASE II as being “online” because it transmitted data over com-
munication lines (as opposed to mailing magnetic tapes), but it is more appropriately described as
a batch-oriented data exchange system.
39Brooke (6 November 1974), p. 1.
Losing Focus: BASE III 103
to include other kinds of clearing messages as well, such as rewards for recover-
ing stolen cards, or reimbursements for telex costs incurred by foreign acquirers.40
With the combination of BASE I and II, NBI could now facilitate any type of data
exchange between its members. These two systems became the information pro-
cessing backbone upon which Hock could eventually provide his “premier system
for the exchange of value.”