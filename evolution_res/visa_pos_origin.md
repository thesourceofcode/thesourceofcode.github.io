Dialing for Dollars: The Merchant Dial Terminal Project
Now that all Visa cards would carry a standardized magstripe, the next step was
to create the right incentives for the mass-adoption of POS terminals. As already
discussed, a few different manufacturers were offering authorization terminals at
this time, but these devices reportedly cost between $1,000 and $2,000 each, making
them far too expensive for low-volume merchants.42
Although the unit costs were high, the real expense was in the way these early
terminals communicated with the acquiring processor, as they required separate,
dedicated leased data lines, which incurred hefty monthly fees. For merchants who
processed only a few card transactions a day, the fixed-price of the leased line com-
bined with the merchant discount seriously reduced their profit margins. If Visa was
to bring about the all-electronic BASE IV world, they needed to stimulate the de-
velopment of a new kind of terminal that every merchant could afford to purchase
and use, and then provide the right economic incentives to encourage merchants to
adopt them.
Dial Terminals
In 1979, Visa started a new project to define the requirements and functional speci-
fications for these affordable terminals. Technical leadership of the project fell to
41Kutler (6 February 1979), p. 1. See also Kutler (12 June 1979), p. 3.
42Information on the Dial Terminal Project comes from interviews with Fojtik, Harrison, Derman,
Powar, Peirce, and Pittenger, as well as the ‘Visa dial terminal pilot project final report’ produced
by Visa USA (April 1982).
150 7 Automating the Point of Sale: Encoding Standards and Merchant Dial Terminals
Frank Fojtik, who had previously spent time thinking about terminals when he
joined NBI in 1974. Given his prior experience in telecommunications and elec-
tronic cash registers, Fojtik realized that the best option for low-volume merchants
would be a terminal that could use their existing voice telephone lines. Any mer-
chant accepting cards for transactions over the floor limit was already using that
line to call for authorizations, and if the terminal dialed a similar local number, it
would incur no additional cost. In fact, the terminal should obtain the authorization
more quickly, resulting in a shorter call time.
Visa briefly considered producing the dial terminals themselves, but ultimately
realized that they lacked the necessary expertise. Furthermore, manufacturing POS
terminals was not what they considered their core purpose to be, and their foray into
writing card processing software (BASE III) had convinced them not to stray from
that again. Instead, they decided to develop the devices in cooperation with multiple
vendors. Visa would establish the requirements and write the detailed functional
specifications, and the assorted vendors would design and build compliant terminals,
competing with one another for what promised to be a sizable market.
The requirements and specifications were kept rather simple. The terminals
would perform authorization only, so there was no requirement for internal data
storage or an integrated printer. The terminal must have a small keypad with which
the merchant can enter the purchase amount and send the authorization request. It
must have some method for displaying the response and authorization code to the
merchant. It needed to be as small as possible, as merchant counter space is precious,
and it needed to run on a conventional power supply. Lastly, and most importantly,
merchants must be able to obtain the resulting device for less than $500.
The Pilot Test
Visa found four manufacturers willing to build such terminals for a pilot test: GTE,
Northern Telecom, Sweda International, and Taltek Electronics.43 By the end of
the pilot test, several more manufacturers had developed terminals based on Visa’s
specifications, including the now famous Verifone. A total of 800 units were ordered
from these vendors, and Visa USA members installed them at various types of mer-
chants in disparate geographical regions. Besides making standard local calls to an
acquiring processor, some terminals were configured to call a machine in Visa’s San
Mateo data center to test inbound Wide Area Telephone Service (WATS) lines, and
others called local access nodes for the relatively new GTE Telenet packet switching
network.44
IBM developed the software to answer calls placed to the San Mateo center and
transform the terminal requests into BASE I authorization messages. This software
43‘Visa dial terminal pilot project final report’ (April 1982), p. 3.
44Although the final report mentions local calls to acquirers as one of the telecommunication paths,
Powar recalled that all calls during the test actually came to San Mateo.
Dialing for Dollars: The Merchant Dial Terminal Project 151
ran on IBM Series/1 computers, which would soon be deployed at the member pro-
cessing centers to replace the DEC Tape Transmission Units used by BASE II.
These powerful minicomputers, known at the time as “Member Interface Proces-
sors” (MIPs), were also employed as gateways to BASE I, so it was relatively easy
to interface the dial terminals to the authorization system through those machines.45
After the pilot test, this software was made available as a standard package on the
MIP, enabling the POS terminals to call the local acquiring processor rather than the
San Mateo data center.
The pilot test ran from June 1980 to December 1981, and it proved to be a success
on nearly every front. From a technical standpoint, the terminals worked exceed-
ingly well, and merchants reported that they were almost never inoperative. Visa’s
requirements stipulated a minimum mean time to failure of 18 months, but the av-
erage in practice was nearly 36 months. The telecommunication performance was
more mixed: terminals that made local and intrastate WATS calls were reliable and
cost effective, but interstate WATS was too expensive due to tariff increases, and
the GTE Telenet service experienced operational problems. The final report noted
the need for interstate WATS would be eliminated once the answering software was
made available on the MIP, and GTE was steadily improving their reliability. De-
spite using dial-up connections, the speed of the system was also adequate. An au-
thorization made through the terminals typically took 20 seconds, which was at least
twice as fast as one obtained verbally. It also involved less manual data entry, and
thus allowed fewer opportunity for errors.
Interestingly, Visa later used the CompuServe network as an inexpensive way to
route authorizations from the dial terminals to BASE I. CompuServe had spent large
amounts of time and money building local network access points in nearly every US
city to facilitate a consumer-oriented online service, but they often had more capac-
ity than they needed, and thus made their infrastructure available to organizations
like Visa. Using the CompuServe network quickly became the preferred option for
Visa, as the merchant could dial a local number that did not incur additional costs,
and CompuServe maintained all the local telecommunications infrastructure.46
From a business and fraud-control perspective, the pilot test results were even
more impressive. The creation of BASE I had helped limit fraudulent transactions,
but even as late as 1980, only 12 to 15 percent of interchange transactions were actu-
ally authorized—the rest fell under the merchant’s floor limit. In contrast, merchants
participating in the pilot test authorized every transaction, and within the first few
days, the number of recovered cards rose sharply. Over the duration of the test, more
than 3,000 cards were recovered by participating merchants, and over 10,000 trans-
actions were declined that would have been allowed under the existing procedures.47
The terminals also served as a powerful deterrent; one member bank reported that
45The MIPs were later renamed “Visa Access Points” (VAPs). Powar noted that they used the
limited number of MIPs available that year as an incentive for terminal adoption; to get a MIP, the
member had to purchase 200 terminals.
46Pittenger and Powar interviews.
47‘Visa dial terminal pilot project final report’ (April 1982), p. 3.
152 7 Automating the Point of Sale: Encoding Standards and Merchant Dial Terminals
“. . . incidents have already occurred in which a thief, upon seeing his stolen card
being put through the terminal, has turned and literally run from the store.”48
The terminal’s ability to deter fraud benefited not only the issuers, but also the
merchants. For transactions under the floor limit, merchants were supposed to check
the card number against a large, dense list printed in a warning bulletin, but many
found this arduous, time-consuming, and potentially insulting to the customer. If
the number was in the warning bulletin and the transaction proved to be fraudulent,
the issuer could levy a chargeback against the merchant, resulting in a deduction
from the merchant’s account for the transaction amount plus a ten dollar penalty
fee. Merchants participating in the pilot test simply swiped every card through the
terminal, resulting in an 82 percent decrease in their chargebacks.
Adoption Incentives
Although a promised reduction in chargebacks might have been attractive enough,
Visa USA realized that they needed to offer merchants a stronger, positive incentive
to adopt the terminals. Their solution was a reduction in the interchange reimburse-
ment fee, the powerful economic setting used to balance the issuing and acquiring
sides of the system.49 Transactions authorized through POS terminals would qual-
ify for a special Terminal Interchange Reimbursement Fee (TIRF) of one percent,
which was 20 percent less than the current average. Since this is the fee acquir-
ers pay issuers, the TIRF provided an incentive for acquirers to push the terminals,
which they did by reducing the merchant discount fee by a similar (though perhaps
not equal) amount. For merchants, the lower discount fee, reduction in chargebacks,
increase in authorization speed, and inexpensive unit price, all combined to make
the terminals a net benefit.50
The TIRF provided the economic incentive necessary for mass-adoption of the
terminals, but obtaining Board approval for such a reduction would be difficult. The
interchange fee was an important source of revenue for issuers and the large banks
were reluctant to fund automation that would primarily help acquirers and mer-
chants more than them. For these larger issuers, the warning bulletin was sufficient,
as it provided a convenient way to justify chargebacks.
Hock was especially critical of this attitude in his speeches. At the American
Bankers Association’s national bankcard conference, he denounced the way the bul-
letins were being used in practice:
48‘Visa dial terminal pilot project final report’ (April 1982), p. 37.
49The importance of this fee is discussed in Chap. 3.
50The TIRF was not the first time Visa USA had offered a special incentive rate. In 1979, they
offered an Electronic Interchange Reimbursement Fee (EIRF) to merchants who used their elec-
tronic cash register systems to authorize all transactions and submit them electronically to their
processor within three days. This rate was originally developed to entice JC Penney, one of the
three largest retail chains in America, to accept Visa cards. The details of this deal, which became
highly controversial, will be discussed in Chap. 9.
Dialing for Dollars: The Merchant Dial Terminal Project 153
If you think carefully about warning bulletins, their functioning becomes apparent. They
permit a card issuing bank, for a small fee, to employ the collective power of Visa or Inter-
bank to force the merchant signing bank or the merchant to accept all losses which result
from failure to follow an impossible procedure, which, in turn, was imposed by the collec-
tive power of the organization.
Hock argued that, in the long run, this practice would ultimately hurt those it was
currently serving. Eventually, the promise of a guaranteed transaction would be un-
dermined, and merchants would begin to question why they were paying a discount
to accept something that was no better than a check. Consumers were also starting
to think twice about using their cards, as merchants tired of chargebacks were re-
quiring personal information such as phone numbers and home addresses from the
cardholders.
This difference in perspectives created a palpable tension. Hock saw terminals as
an important step toward a totally electronic value-exchange system, but the large
issuers were focusing on their individual programs. Visa’s CFO recalled that
Dee wanted to increase the Visa momentum and deliver the “knock out punch” to all of his
competitors and detractors . . . Dee had the industry lead, but he wanted everyone else to
believe that Visa had all of the answers, to choose anyone else would be suicidal.
But others were growing tired of Dee’s . . . big ideas . . . As for the typical banker stereotype
of the period, they were happy the system was “fixed,” they were all making money, they
all wished deregulation and competition would go away, and now they wanted to get back
to playing golf, not embark on the next grand plan that Dee had devised.51
This seems to have been a common theme throughout Visa’s early history: Hock
often had to resort to manipulation or tricks to get Board members to put aside
their own self-interests in order to improve the overall system. Although these im-
provements invariably benefited those who initially opposed them, it was difficult to
convince those members of such ahead of time.
Resolutions
Hock’s plan was to introduce a resolution that would commit the Visa USA members
to authorizing 80 percent of all interchange transactions within five years. Achieving
such a goal would require the mass-adoption of terminals, which in turn would re-
quire the TIRF. Hock knew this would be a controversial proposal, so he purposely
omitted it from the proposed agenda mailed to the Directors before the Board meet-
ing.52
The meeting for that year, 1982, was held in Bermuda, and in keeping with pre-
vious years, Visa invited and paid for spouses to attend. This was advantageous for
a number of reasons. First, and most important, the spouses were actually invited
to attend the Board meetings, primarily because, as Visa’s CFO put it, the Directors
51Cleveland (1999), p. 20.
52Cleveland (1999), p. 22.
154 7 Automating the Point of Sale: Encoding Standards and Merchant Dial Terminals
“would be more inclined to act civil, consider the good of Visa over their bank’s self
interest, and in other words, vote for whatever Dee wanted.”53 Second, the members
would also have an incentive to cooperate in order to end the meetings early so they
could spend time with their families. Third, with their spouses there, the Directors
would also have less time to meet with one another and discuss any opposition they
might have to Hock’s proposals.
Hock also knew that most Directors tended to leave the meetings early if they felt
that the final day’s topics were unimportant, so he kept the 80-percent authorization
goal off the agenda. Hock had learned the time of every Director’s return flight, and
as those who would oppose the resolution drifted out, he adjusted his mental vote
tally accordingly. After enough Directors had left, Hock switched topics and intro-
duced the resolution, which was well-received by those remaining, and unanimously
adopted. The larger issuers always wondered when they had ever voted for such a
goal, but as the terminals were installed by most merchants, the reduction in their
fraud losses convinced them that it was perhaps the right idea after all.54
Adoption and Consequences
Although the Board adopted the resolution, it actually took seven years to reach
the 80-percent authorization goal. Despite a set of economic incentives that enabled
the terminals to pay for themselves within weeks or months, the merchants did not
rush to install them. Bill Powar, who took over the POS business unit in 1982,
explained that medium- and large-scale merchants formulate and implement their
technical plans according to a multi-year cycle, and will not consider the adoption
of a new technology until the next planning stage. Although Visa members could
demonstrate that the terminals would provide a net benefit for their merchants, it
often took several years before the merchants were ready to purchase and install the
terminals in their stores.55
During this elongated adoption period, the terminal manufacturers continued to
enhance their devices. As noted earlier, the first dial terminals performed authoriza-
tion only; merchants were still required to complete and deposit paper sales drafts.
By the mid-1980s, most terminals also supported data capture, meaning they could
store the details of each transaction and transmit them electronically to the acquiring
processor each night. These types of terminals also featured printers that could au-
tomatically dispense cardholder and merchant receipts, completely eliminating the
need for the old multi-part paper sales drafts and card imprinters.56
53Cleveland (1999), p. 20.
54Cleveland (1999), pp. 22–23.
55Powar interview.
56Powar, Derman, and Fojtik interviews.
Conclusion 155
When manufacturers began offering these data capture terminals, Visa USA
again offered a special Terminal Interchange Reimbursement Fee (TIRF) for trans-
actions that were not only authorized through the terminal, but also cleared elec-
tronically within three days. Like the original TIRF, this new rate provided enough
incentive for acquirers and merchants to mass-adopt the data capture terminals, al-
though the pace was again gated by technology planning and implementation cy-
cles.57
As these terminals were installed, the paper largely disappeared from the system.
Merchants still retain the paper receipts printed by the terminals, but they no longer
deposit them with their acquiring bank. Just as with BASE II, the only time a mer-
chant is required to produce the paper is during a dispute, making the exchange of
paper the exception rather than the rule.58
But the adoption of data capture terminals altered the system in a more profound
and fundamental way than simply eliminating the paper. It transformed the way
the banks viewed the acquiring business, which now resembled data processing far
more than that it did banking. Banks had always justified their merchant discount
fees based on the costs of supplying sales drafts, imprinters, training, and draft pro-
cessing. The terminals reduced or eliminated most of these costs, and the TIRF
resulted in further downward pressure on the discount fees, changing the business
model into one completely based on scale. To survive, a merchant processor needed
to acquire as many transactions as possible, and by the mid to late 1980s, banks
found themselves either incapable or uninterested in providing the necessary com-
puting infrastructure. As a result, many banks decided to outsource this function to
more specialized firms such as First Data Resources (FDR), or exit the merchant
side of the business entirely. Throughout the 1970s and early 1980s, nearly every
bank was both an issuer and an acquirer, but by the late 1980s, members tended to
specialize in one function or another.