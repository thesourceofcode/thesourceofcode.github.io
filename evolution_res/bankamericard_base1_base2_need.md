To understand the various operational and organizational problems, we must first
understand what it was like to initiate, authorize, clear, and settle transactions in the
BankAmericard system of 1968. This is best done by walking through the process
of a typical domestic purchase. Note that in this example, we will discuss only
the details that will help us understand the specific operational and organizational
problems faced by the BankAmericard system; other interesting but less relevant
details will be examined in later chapters. This example is also the ideal case; the
unfortunate realities of the process will be noted in the following section.2
Imagine yourself in 1968, holding a shiny new BankAmericard. As discussed
in the previous chapter, all cards had the same blue, white, and gold bands across
the face of the card so that merchants could easily identify your card as acceptable,
regardless of which bank actually issued it. Merchants also hung signs with the
same marks in their windows, so that you could easily identify those that accepted
the card, regardless of which bank represented the merchant in the system.3 You spy
a merchant that you need to visit, select your items and present your BankAmericard
for payment.
If your purchase amount is below the merchant’s floor limit the merchant can
complete the transaction immediately without authorization.4 The floor limit varied
by merchant type and by card type: some cards had a star on the front, while others
did not.5 The floor limit for a general merchant was typically $50 for a non-starred
and $100 for a starred card, but airlines, hotels and other services were often granted
higher floor limits.

If your purchase is above the merchant’s floor limit, the merchant is required to
call for authorization. The merchant dials the acquirer’s authorization center and
verbally conveys the transaction details to the authorization operator. The autho-
rizer first determines if the card was issued by the same bank or another by looking
at the first four digits of your account number. If it is the same bank, the transac-
tion is known as local or on-us, otherwise it is known as an interchange transac-
tion.
If this is an on-us transaction, the authorizer then consults a series of printed re-
ports to determine if the transaction should be authorized. At this time, there were
no interactive computer systems with CRT terminals installed at the BankAmeri-
card authorization centers. When your bank became a BankAmericard licensee, it
did receive some “computer software” from the Bank of America, but this was just
a simple punch card-based accounting system. This system produced two reports
to help the authorizers: a list of known hot cards, which were either stolen or on
hold for some other reason; and a summary of each cardholder’s account, listing
their current balance, credit limit, purchase and payment history. The authorizer first
searches through the hot card list to ensure your account number does not appear
there. Then the authorizer manually wades through the massive binder of account
sheets to find yours, reviews your details, and consults the hand-written list of au-
thorizations already given since the report was last printed. If all is in order, the
authorizer gives the merchant an authorization code, consisting of a few letters and
digits, and the merchant writes that on to the sales draft.
If this is an interchange case, however, the merchant’s authorizer does not have
access to your records and is thus required to call or telex your bank’s authorization
center. The authorizer puts the merchant on hold, dials your bank’s center and relays
the transaction details. Your bank’s authorizer then consults the same type of reports
already discussed, and supplies an authorization code. The original authorizer then
relays this code to the merchant. At this time, interchange was rare on the average, but there were localized exceptions to this. For
example, the National Bank of Commerce in Seattle and Puget Sound National Bank in Tacoma
experienced a high level of interchange due to the large amount of business that takes place be-
tween those two cities, which are roughly 30 miles apart. The authorization centers at these two
banks simply called each other in the morning and kept a line open, allowing them to authorize
interchange transactions quickly over a speakerphone
After authorization, the merchant then completes the sales draft. The draft is
a multi-layer document: the top two layers are like tissue-paper, one for you and
one for the merchant. The bottom layer is an IBM 80-column punch card, com-
plete with the corner notch. The merchant puts your card and the sales draft into
an imprinter, informally known as a “zip-zap machine,” which squeezes the em-
bossed characters on your card against the sales draft, thereby transferring your
card number, expiration date and name onto each layer via carbon paper. The
imprinter also holds another embossed plate containing the merchant’s details.
The merchant manually adds the transaction date and purchase amount to the
draft, and you sign it to complete the purchase. The merchant is then required
to check the signature on the card against your signature on the draft to ensure
that you are the proper cardholder, but few do. The merchant tears off the cus-
tomer copy and hands it to you, putting the other two layers in the cash regis-
ter.
On a regular basis, the merchant deposits the punch card layer just like a check.
Unlike a check, however, the merchant receives an instant credit, less the discount,
the amount of which is negotiated when the merchant signs the contract with the
bank (merchant discounts at this time ranged anywhere from 0 to 8 percent, averag-
ing 3.5 percent).7 From the merchant’s perspective, the transaction is now complete,
but the clearing and settlement process has in fact only just begun.
Although the drafts are computer punch cards, they are not yet machine-readable.
Banks with very low volume may just manually sort and total the drafts, but others
send them to the proofing and data-entry departments to be manually key punched
and proofed.Proofing involves verifying that the drafts total to the same amount claimed by the depositor. This
was often done by encoding the human-readable elements of a draft into machine-readable form,
so that the drafts can be machine-totaled. The drafts are then sorted by card number. On-us transactions are fed
into the computer to update the cardholder accounts, and are then added by collation
to the drafts already processed for each cardholder since the last billing cycle. At this
time, most banks are still performing country-club billing, where the physical drafts
are included with each statement.
All interchange drafts are then grouped and totaled by issuing bank. The mer-
chant’s bank completes a special clearing draft against the issuing bank for the total
of all the sales drafts. The clearing draft looks very much like a cashier’s check,
complete with the magnetic ink routing characters, and can be submitted through
the normal checkclearing system for payment. The physical sales drafts on the other
hand are mailed directly to the issuing bank through the US postal system. The
clearing draft is often processed before the individual sales drafts arrive at the is-
suer, so the issuer is forced to transfer funds, but must wait until the sales drafts
arrive to reconcile and add the charges to the relevant cardholders’ accounts. Once
they arrive, the issuer reconciles the sales drafts against the settlement payments,
and then performs the same actions the original bank did for the on-us case.

Operational Problems
Within this simple transaction scenario, we can begin to see a number of operational
problems that were greatly exacerbated by the system’s increasing scope and sales
volume.
Authorization, Floor Limits, and Fraud
The first notable operational problem was the interaction of authorization, floor lim-
its, and fraud. Payment card transactions differ from those in other payment systems
in one important way: they are guaranteed. If the merchant follows the rules of the
program, the merchant is guaranteed payment, even if the transaction was fraud-
ulent. In the case of a personal check, the issuer simply returns the bad checkand
the merchant must absorb the loss; in a payment card transaction, the issuer must
absorb the loss. This introduces a certain amount of risk to the issuing bank, and
in an ideal world, the issuing bank would like to eliminate that risk by authoriz-
ing every transaction. This was not a realistic option in 1968, however, as the la-
bor and telecommunication costs would easily outweigh the revenue gained from
a low-value transaction. Additionally, authorizing every transaction would delay an
already slow process, risking the use of cash or a checkinstead of the card.
The floor limit concept is essentially a cost/risk tradeoff made by the banks. Not
all transactions are equally risky, and the easiest way to distinguish the higher-risk
ones is by the combination of purchase amount and merchant type: a high-value pur-
chase from a jewelry store is more risky than a low-value purchase from a shoe store.
What most banks did not anticipate, however, was that criminals would quickly dis-
cover the various floor limits and make numerous under-limit charges, resulting in
significant losses. A new card stolen from a mailbox could be used for a week or
more before the issuing bank even saw the first sales draft, and over a month be-
fore the cardholder received the first statement for a card the customer did not even
know was issued.10 Once detected, banks would notify other authorization centers
and mail a postcard to merchants that might likely see the card.11
But relying on the merchants to catch the cards was problematic. The main in-
centive for merchants to use the authorization system is the guarantee of payment,
not the reward for catching a stolen card. The authorization process is more than just
a technical function—it also formally transfers the responsibility for fraud from the
merchant to the issuer. A merchant was (and still is) allowed to take a transaction
above the floor limit without authorization, but the merchant then assumes the risk
of fraud. If an issuer can prove that the merchant did not authorize the transaction,
or that the bank warned the merchant about the card number prior to the transaction,
the issuer can submit a chargeback into the system, which will eventually debit
the merchant’s account. Proving a chargeback required a manual audit, however,
and most bankcard processing centers were already struggling to keep up with the
sharply-increased sales volume.
10Often the cards were actually stolen by the postal sorters and carriers. The practice of mailing
unsolicited cards to consumers was eventually banned by the US Congress in 1970, and most other
countries have since passed similar laws.
11Jutilla (1973), pp. 221–223. Eventually the Visa system produced a weekly booklet of hot card
numbers, but this was ultimately replaced by online authorization via inexpensive point of sale dial
terminals (see Chap. 7).
34 2 Associating: Dee Hock and the Creation of the Organization
Merchants were also not inclined to call for authorizations due to the delay it
would cause at the point of sale—sources from the time estimated that the aver-
age authorization took anywhere from five to twenty minutes, depending on how
quickly the merchant could get through to the authorization center, and how quickly
the merchant’s bank could call or telex the issuing bank in an interchange case.12
Stallwitz found that nearly all merchants in his study complained about the speed of
authorization, and some admitted that they encouraged the use of cash or a check-
when the purchase was above their floor limit.13 Others would rely on their own
assessment of the customer (often based on appearance) and take the card without
authorization, or simply reuse an authorization code from a prior transaction as it
was unlikely that the issuing bank would detect this under the manual system of
the time.14 Stallwitz also found that suburban merchants in particular would avoid
consulting the hot card lists and calling for authorization as it might offend their
customers and risk the loss of the sale. Lastly, some merchants were themselves
creating or participating in fraudulent transactions. Restaurant cashiers would make
additional sales drafts with a customer’s card, or less reputable merchants would
submit under-limit drafts using a stolen card and split the proceeds with the thief.15
The actual amount of fraud occurring at this time is difficult to estimate as banks
were not required to disclose such information, nor were they particularly eager to
do so. Those that did were either inconsistent in the way they calculated and reported
losses, or as Spencer Nilson claims “doctored the records so that it would come out
to a ratio acceptable to their peers.”16 Nevertheless, Nilson and others attempted to
estimate how much the banks were losing on their card programs. Unfortunately,
the estimates are difficult to compare as they are for different time periods, different
sets of card programs (e.g., bankcards only, bank and T&E and retail, etc.), and
different loss categories (total losses as opposed to losses specifically attributable
to fraud). Nilson estimated that fraud-specific losses on bankcards increased from a
mere $140,000 in 1967 to $2.2 million by 1969.17 Various Federal Reserve studies
reported that total losses for bankcards rose from $12 million in 1967 to $115.5
million in 1970.18 Nocera claimed that throughout the late 1960s, the Chicago banks
alone lost over $25 million, and the New York banks over $250 million.19
12“It took about 15 to 20 minutes to make a $35 purchase, which didn’t make you very popular at
the point of sale” (Russell interview). See also Stallwitz (1968), pp. 44–45.
13Stallwitz (1968), p. 45.
14Reusing authorization codes became much easier to detect after NBI computerized both autho-
rization and clearing and settlement, the story of which will be told in the next two chapters.
15Jutilla (1973), pp. 219–229, Nocera (1994), p. 30, Galanoy (1980), p. 149.
16Nilson (11 April 1977), Report No 161. The general accuracy of the Nilson Report was contested
by many of my interview sources, so some of his claims and statistics should be approached with
caution.
17Nilson (11 April 1977), Report No 161. Dollar amounts are in USD.
181967 data from (Federal Reserve System July 1968); 1970 data reported in Brooke
(18 May 1971).
19Nocera (1994), p. 61.
Problems in the Licensing Program 35
The growing amount of fraud was clearly a concern for those banks participating
in the BankAmericard licensing program. Beyond the actual monetary losses, the
shocking headlines were creating a perception that fraud was rampant and bankers
were doing nothing to protect their cardholders.20 This perception could not only
erode the confidence of cardholders and merchants, but also attract the unwanted
attention of lawmakers and regulators. Indeed the US Congress held hearings on
the practice of mailing unsolicited cards in 1967 and was drafting legislation to not
only prohibit it, but also protect consumers from the cost of fraudulent charges.21
As is typical, these hearings became a thinly-veiled public trial of the entire bank
credit card industry, accusing the banks of fueling inflation and tempting innocent
consumers to abandon the traditional values of thrift in favor of reckless debt spend-
ing.22
Clearing and Settlement of Interchange Transactions
The second major operational problem area was the clearing and settlement of in-
terchange transactions. Like a check, a payment card sales draft is a claim on funds
that must be cleared and settled with the issuing bank. If a different bank would
acquire that transaction, there would have to be a mechanism by which the draft can
be routed to the issuer, and payment made to the acquirer.
As noted in the previous chapter, most banks at this time cleared and settled their
checks through the national clearinghouse operated by the Federal Reserve. It would
seem that using this same system to clear and settle credit card sales drafts, which
were small in number compared to checks at this time, would be a sensible thing
to do. The bankcard associations approached the Fed about processing credit card
drafts, but the Fed refused to handle them.23 Technically, it would have required
20For example, see Galanoy (1980). Formerly the Director of Communications for NBI, Galanoy
accused bankers of being blinded by their desire to build an all-encompassing electronic funds
transfer system, ignoring the costs of fraud to consumers. For an example of this concern voiced
in the popular press, see O’Neil (1970).
21These laws were passed in 1970 as an amendment to the Truth in Lending Act (Brandel and
Terraciano 1980; Fisher et al. 1980, p. 257). The 1967 hearings are documented in 19th Congress,
First Session (8 and 9 November 1967).
22Dee Hock provided perhaps the best rebuttal to this in a 1979 interview: “Sure, consumer debt
is high, but if you want the consumer to stay out of debt, business and government have to set
the example. If we expect consumers to reduce debt and increase savings, then we must create an
environment without inflation and with tax laws that favor saving and not debt. After all, interest
paid on debt is tax deductible and interest earned on savings is taxed. How can that encourage
thrift? We should not criticize the consumer who is learning to play the government invented game
of buying now through debt and paying later with inflated dollars.” Streeter (1979), p. 75.
23Russell interview. Hock also commented on this in a 1974 speech: “Had the Federal Reserve
agreed when asked (and they were) to clear bank card activity, would the service have evolved as
it subsequently has? . . . It is clear there would be no BASE II and no INAS today had the Federal
Reserve said yes, and clear that present bank card service would be radically different” (Hock
1974, p. 21).
36 2 Associating: Dee Hock and the Creation of the Organization
some modifications to the automated systems: the sales drafts were 80 column IBM
punch cards, larger in size than most checks of the day; and they encoded infor-
mation as punched holes instead of magnetic characters printed along the bottom
edge. But the technical reasons were secondary to the more ideological belief that
debt instruments, especially those involving a discount, simply did not belong in
the Federal Reserve’s clearing system.24 Recall that one of the Fed’s goals was to
eliminate discounts on cleared checks, so it is not surprising that they would refuse
to process BankAmericard transactions.
With the Fed’s refusal to handle credit card drafts, the BankAmericard Service
Corporation (BASC) was faced with a problem: how should the licensee banks clear
and settle their interchange transactions? One logical option would have been for
the BASC to create their own centralized clearinghouse for BankAmericard trans-
actions, but the BASC chose not to do this, partly because the amount of interchange
was still very low in the late 1960s.25 Instead, the BASC stipulated that acquiring
banks must mail interchange drafts directly to the issuing bank, similar to the way
they handled out-of-town checks in the nineteenth century. The issuing bank would
then reimburse the acquiring bank, less a discount fee, called the interchange reim-
bursement fee.
26
This solved only the clearing half of the problem—the licensee banks still needed
a way to settle those transactions (i.e., transfer “good and final funds” from the
issuer to the acquirer). Recall that the Federal Reserve System eliminated the need
to transfer physical currency between banks when settling payment transactions, and
the BASC decided to leverage this system by creating a special clearing draft, which
looked like a bit like a cashier’s check. To receive payment for a set of interchange
drafts, acquirers completed one of these clearing drafts against the issuer for the
total amount of the sales drafts, less interchange fees, and submitted it along with
their other inter-bank funds transfer requests.
This separation of the clearing draft from the sales drafts allowed banks to use
their existing funds transfer mechanisms, but it also created a timing problem that
jeopardized the functioning of the entire system. When the issuing bank received
payment notice of the clearing draft, it would enter that amount into a suspense
ledger and wait for the individual sales drafts to arrive in order to reconcile and bill
the cardholder. Unfortunately, this often took quite a long time. This is how Visa’s
founder described it:
Meanwhile, the merchant bank, having already been paid and under immense pressure to
handle its own cardholder transactions, had no incentive to process [interchange] transac-
tions and get them to the issuing bank for billing to the cardholder. Since each bank was
24Russell interview.
25Sources estimated that it was between one and five percent of transactions at the most. There
were of course localized exceptions to this. In regions where banks were not allowed to operate
branches across an entire metropolitan area, the interchange level would naturally be higher.
26Note that the laws governing checkclearing discussed in the previous chapter did not apply to
credit card sales drafts. Any similarity in their clearing method was coincidental and not required
by law. The legal basis for credit card sales drafts came from the contracts signed by licensee
banks, cardholders, and merchants (Katz interview).
Problems in the Licensing Program 37
both a merchant-signing bank and a card-issuing bank, they began to play tit-for-tat, while
back rooms filled with unprocessed transactions, customers went unbilled, and suspense
ledgers swelled like a hammered thumb. It became an accounting nightmare.27
This immense backlog in the system also compounded the fraud problems dis-
cussed earlier. Issuing banks would have no way of knowing if sub-floor-limit fraud
was occurring on a card until the actual sales drafts arrived and were processed. By
the time they arrived, thousands of dollars worth of fraud could have taken place.
Even when the sales drafts did arrive, it was often the case that their total did not
match the clearing draft amount. Many smaller merchant banks would simply run
an adding machine tape over the drafts instead of key punching them, and would
inevitably make mistakes. Chuck Russell, who succeeded Hock as CEO, recalled
that “Banks couldn’t balance from day to day because they couldn’t get their drafts
drawn on other banks settled. It was a disaster.”28 To provide a sense of the scale of
the problem, he relayed this story:
I was shown a room that was warehoused-sized, full of IBM 80-column tab cards (which
were the drafts) that they couldn’t settle. We’re talking millions and millions of dollars ...
they had never got the debit or the credit side of the transaction through clearing because
they couldn’t find them!29
Finally, it should be noted that not all banks experienced problems to the degree
described here. But the lack of a centralized clearinghouse, compounded with the
timing problems introduced by the clearing drafts, created operational problems
that were most definitely threatening the overall system’s stability and impeding
its future growth

Organizational Problems
Although the operational problems just described may have had potential solutions
within a health franchising organization, the organization had problems of its own
that further compounded the operational difficulties. It was these organizational
problems, even more than the operational ones, that convinced the licensees that
a new organizational structure was necessary.
The BankAmericard licensing system, like any cooperative payment system,
faced a central organizational tension—balancing competition and cooperation.31
27Hock (2005), p. 77.
28Russell interview.
29Russell interview. The “stacks of unprocessed drafts” story was also relayed by others in various
forms.
30Jutilla indicated that his bank was typically able to reconcile, but the delays in receiving the
interchange drafts were especially dangerous due to fraud. He concluded that the system could not
have survived the way it was as the transaction volume increased.
31Evans and Schmalensee (2005).
38 2 Associating: Dee Hock and the Creation of the Organization
The licensing system created a new meta-organization comprised of competing fi-
nancial institutions that needed to cooperate, at least to some degree, in order to pro-
vide a universal payment system that none could have realistically provided alone.
Competing organizations in a marketplace normally seek their own self-interests in
an assumed zero-sum game for market share. A cooperative organization, on the
other hand, offers a different possibility—if all members cooperate, they can pro-
vide a larger, universal system that allows them all to benefit even more than if they
chose not to cooperate. In other words, each participant’s slice of the cooperatively
baked pie would likely be larger than any pie the participant could have baked alone.
To accomplish this, however, they need mechanisms that would create trust within
the organization, mechanisms that balance out their power and interests and dic-
tate how inter-organizational work will be accomplished. In other words, they need
something akin to a constitution, as well as operating regulations, to which all mem-
ber organizations agree. As we shall see, the licensing program’s key organizational
problems lay precisely in these balancing mechanisms and operating regulations.
Under the BankAmericard licensing system, BofA retained not only the owner-
ship of the BankAmericard name and marks, but also all the power, and this led
to a fundamental distrust between BofA and the licensees. The licensees knew that
BofA would have opened branches in their territories if the banking regulations had
allowed it, and if those regulations ever changed, BofA could easily revoke their
license and become the sole BankAmericard issuer.32 The licensees also doubted
if BofA had the desire and even the ability to solve the operational problems dis-
cussed earlier.33 The licensees believed that any solutions developed by BofA would
naturally be in BofA’s best interest and not those of the licensee banks.
Although BofA retained nearly all the power in the system, their power to en-
force and modify the operating regulations was neutered by two critical flaws in the
license contracts. First, the contracts lacked mechanisms for financially punishing
banks that skirted or bent the operating regulations, nor did they contain a method
for resolving grievances between the licensee banks. The only recourse BofA had
was to revoke a bank’s license, but since most of these banks held large correspon-
dent deposits with the BofA, and were dominant in their geographic area, this was
not likely to happen. Second, the contracts also lacked a clause allowing BofA to
change the operating regulations in response to new developments. If BofA needed
to modify or add a rule, they had to re-negotiate a new contract. Again, BofA had
no recourse if banks simply refused to sign the new license, which they often did if
the rules were not in their best interests.34
The fundamental distrust and the flaws in the contracts created a number of orga-
nizational instabilities. The most significant and pernicious was the tension over the
32Hock (2005), p. 85. Of course, these regulations were abolished in the 1980s, but by then it was
too late, as the Visa system had already been established.
33Russell interview. The BofA paid very low salaries at the time, and the most talented operational
people tended to go to their main local competitor, Wells Fargo, which was a member of the
Interbank system.
34Katz interview. See also Hock (2005), pp. 83–87.
Dee Hock 39
interchange reimbursement fee. As noted earlier, this fee was paid by the acquirer
to the issuer during the settlement of an interchange transaction.35 At this time, the
intent of the fee was to compensate the issuer for the cost and risk of extending the
cardholder credit for the transaction. The rule established under the licensing sys-
tem for interchange fees was essentially unenforceable. This is how Bennett Katz,
Visa’s long-time general counsel, described it:
When I came on board, the rule was. . . if a customer of your bank goes into a merchant
belonging to another bank, outside of that territory, then the bank that signed the merchant
has a choice as to what it sends to the issuer. It could send the amount of the discount that
it received from the merchant less a processing fee (for processing the transaction), or if
it didn’t want to calculate each and every one. . . it could send the average discount it was
getting from all of its merchants less a processing fee. Well they would say ‘my average is
two percent.’ How are you going to audit that? And if the merchant put up a big deposit,
their merchant discount might be close to zero, and the issuer would get almost nothing!
So the issuer has all the costs because he’s extending the credit and eating defaults, but he
was getting almost nothing when the customer traveled. The losses were horrendous. It was
literally chaos in the BankAmericard system.

In October of 1968, the BASC called a special meeting of the licensees to discuss the
operational and organizational problems facing the BankAmericard system. Card
program managers from each of the licensee banks descended on Columbus, Ohio,
but the BASC neglected to send their most senior officers. The licensees were in-
censed that the BASC apparently did not recognize the seriousness of the situation,
and began to make accusations that the BASC was either unwilling or incapable of
solving the system’s problems. By the middle of the second day, the meeting had
devolved into “acrimonious argument.”37 Unsure of how to rescue the situation, the
BASC representatives attempted to create a committee of licensees that would look
into the most critical problems. One of those selected to be on the committee, how-
ever, had a different idea of what it would take to solve the system’s problems, and
after lunch the rest of the licensees were greeted by the card-center manager from
the Seattle National Bank of Commerce: Dee Ward Hock.


Dee Hock had been slowly coming to the realization that “money” had become nothing
more than “guaranteed alphanumeric data” and that a bank is nothing more than an
“institution for the custody, loan, and exchange” of this data. Furthermore, that data
was increasingly being stored and manipulated by computers, and would eventually
“move around the world at the speed of light at minuscule cost by infinitely diverse
paths.”59 He then came to one of his most important conclusions:
Any institution that could move, manipulate, and guarantee alphanumeric data in the form of
arranged energy in a manner that individuals customarily used and relied upon as a measure
of equivalent value and medium of exchange was a bank. It went even beyond that. Inherent
in all this might be the genesis of a new form of global currency.

Lastly, Hock realized that he, and most of his fellow bankcard managers, had
misunderstood what business they were in:
It seems ordinary and obvious now. It was a revelation then. We were not in the credit card
business. “Credit card” was a misnomer based on banking jargon. The card was no more
than a device bearing symbols for the exchange of monetary value. That it took the form of
a piece of plastic was nothing but an accident of time and circumstance. We were really in
the business of the exchange of monetary value.62

See creation_of_national_bankamericard_inc.md