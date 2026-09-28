Expanding BASE I’s Capacity
The dependability of BASE I has always been a top priority for Visa’s computer
systems staff. Visa’s existence largely depends on their ability to offer a payment
service upon which cardholders, merchants, and members can rely, and the autho-
rization service is the primary and most common point of contact for those groups.
If BASE I is unavailable, or misbehaves in some way, customer confidence can
quickly erode, devaluing the card as a payment device. Visa employees call this the
“back of the wallet” effect—if a cardholder is improperly denied an authorization,
the cardholder typically moves that card to the back of the wallet, and will choose
other methods of payment for future transactions.39
39Elliott interview.
Expanding the Computer Systems 125
Capacity in Real-Time Systems
As discussed in Chap. 4, the design of the original BASE I included a few key mech-
anisms to ensure the availability of the authorization service. All critical telecom-
munications and computer hardware had redundant backups. The central switch also
had the ability to stand-in and approve transactions when the issuer’s host computer
or personnel did not respond. NBI could also stand-in for the acquirers, answering
authorization calls after the acquiring centers closed for the night.
There was another threat to availability, however, against which redundant hard-
ware and logic could not guard—overwhelming the system’s capacity. In any real-
time, transaction-processing system, there is a somewhat fixed number of transac-
tions the system can process at any given time. Once the concurrent transaction load
reaches this amount, the system cannot accept more, and becomes unavailable un-
til the existing transactions are processed. Often a queuing mechanism is used to
hold new transactions until they can be processed, but eventually the CPU spends
so much of its time switching between tasks and managing the queue that it simply
cannot accept more transactions. If the software developers anticipate this condi-
tion, the system will gracefully reject new transactions, asking the sender to try
again later; if they do not, the system often crashes.
For BASE I in particular, the floor limits provided a crude but effective mecha-
nism for tempering the transaction load. Each merchant had a limit under which the
transaction was automatically authorized. NBI also established interchange floor
limits for the acquirers, under which the acquirer could authorize the transaction
without contacting the issuer. But the interchange floor limits were removed shortly
after BASE I was put into production, and the merchant floor limits were reduced in
an effort to stem fraud. Thus, the transaction load began to increase.
It is important to emphasize, however, that the main threat to capacity is not the
aggregate transaction load experienced over a given period, but the peak. Authoriza-
tions in particular have a more or less predictable ebb and flow cycle, with dramatic
peaks occurring at certain times, and on certain days. But how high those peaks will
reach can only be estimated, and if the estimates are too low, the system will become
unavailable at the most inopportune time.
BASE I was just over a year old when the system capacity was exceeded by an
unexpectedly large peak:
. . . the day after Thanksgiving [1974] was the biggest shopping day of the year. Now over
time that’s changed a little, but for many years, the Friday after Thanksgiving was the vol-
ume day. Well anyway, BASE I died a horrible death; several times . . . they would have an
[acquirer] that would choke them to death and cause it to crash. Well instead of shutting
down the big users, bringing it back up and letting it start to breathe again, they just brought
it all back up and guess what? It went right back down again. That day was one of the most
horrible in Visa.40
An experienced systems developer named Frank Fojtik led a team to expand
BASE I’s capacity. Fojtik was exactly the sort of technical person Hock admired.
40Fojtik interview.
126 6 Expanding the System: Organizational and Technical Growth
Speaking with a no-nonsense Texan drawl, Fojtik remarked that his technical ex-
pertise was the result of “a whole lot of scars I got on my ass” while working with
cutting-edge technology, and he summarized the entire Visa mission by saying, “if
you can’t recognize [the card], it ain’t worth much; if it don’t work, it’s worth even
less.” Fojtik had been recently hired from Singer, where he had worked on elec-
tronic cash registers, and developed a number of networked, transaction-processing
computer systems.
DEC or IBM?
Fojtik and his team were able to reorganize the structure of BASE I to achieve
enough capacity to survive the 1975 Christmas shopping season, but they all knew
it was merely a temporary solution. After the ban on dual membership was lifted
in 1976, both the aggregate and peak volumes dramatically increased, and the sys-
tems group was now faced with a difficult decision: should they upgrade to the new
DEC PDP-11/70; or should they switch over to the IBM System/370 mainframe
line? Hock, in his usual style, declared that the decision would be made by all the
key technical staff after considering the arguments presented from both sides. But
instead of letting the IBM and DEC sales people in the room, he assigned members
of his own technical staff to make the case for each alternative, arguing that his own
staff would think in terms of what was best for Visa, and would ultimately need
to believe in the solution. Fojtik served as DEC’s champion, and Derman pitched
IBM.41
The argument for upgrading to the next PDP-11 was relatively easy to make,
as it featured the same type of architecture and thus required little change to the
BASE I software. DEC, however, was suspiciously vague about when another, more
powerful PDP-11 might be available, leading the technical staff to wonder about the
long-term prospects of that platform.
The argument for moving to the IBM System/370 line rested primarily on their
seamless upgradability. If their current mainframe ran out of capacity, it could be
replaced with another more powerful one without any changes to the application
software. IBM had a number of 370s already in production, and more planned for
the future. More importantly, IBM had become the standard in the banking world,
and would thus be easier to sell to the Board of Directors. But this approach also
required a re-implementation of the BASE I system, as the IBM environment was
completely different.
Hock held a lengthy meeting, listening to the arguments, pitting his staff against
one another, and challenging all their assumptions. But it was mostly a charade—
Hock had already made up his mind earlier, but wanted his staff to come to the same
conclusion. Chuck Russell conveyed how the decision was actually made:
41Information on the DEC vs. IBM decision comes from interviews with Derman, Fojtik, Peirce,
Schramm, and Russell. There is some disagreement as to who voted for which alternative, but as
we shall see, it mattered little in the end.
Expanding the Computer Systems 127
Dee was leaning toward re-upping with DEC, but before so doing, decided to give IBM one
more shot. He asked the SFO [San Francisco] IBM chief, Bob Irwin, to come in with his
right hand man, Roger Peirce, and meet with him and me to tell us why we should go with
IBM.
Now you have to understand that, at that time, SFO was considered Siberia by IBM . . . Bob
no longer “fit in” at IBM because he was considered “uncouth” by the then button-down
culture, which prevailed during the 70’s and 80’s at IBM . . . [So] Bob was banished to SFO
. . . [but Bob and Roger] were/are two of the brightest individuals I’ve ever worked with.
Get this picture. Bob and Roger walk into Dee’s office. Bob is reasonably well dressed, but
he’s wearing well-polished GI paratrooper boots! Roger has a button-down shirt on, but it
looks like he slept in it, and his hair apparently hadn’t seen a comb in weeks! This duet put
on a presentation right out of Tom [Watson] Sr.’s book. Blunt, honest, brief and to the point,
and not one ounce of BS or political correctness. It would have curdled the button-down
set’s milk!
At the end of their presentation, Dee, in his usual fashion, commenced hassling them. After
two or three minutes, Bob got up and said, “Look Dee, if you’re too f—— dumb to under-
stand the difference between what IBM brings to the table, vs. what DEC can do, you’re
wasting my time,” whereupon both he and Roger walked out of Dee’s office and slammed
the door behind themselves.
Dee, rarely at a loss for words, was speechless for a few moments, then he turned to me,
and said, “Hell, chief, if they feel that strongly, they are the people to go with.”
And that’s how the decision was made.42
Airline Control Program
Thus it was decided to re-implement BASE I on the IBM hardware platform, but this
resulted in a new dilemma: which operating system should they use? IBM offered a
few choices at this time, the most common being MVS, but this was designed pri-
marily for controlling batch-oriented applications, not real-time systems. In 1969,
IBM had released what became their most well-known transaction processing mon-
itor, called the Customer Information Control System (CICS).43 But Peirce thought
that it was not reliable enough at the time for Visa’s needs. It was also relatively
inefficient, and would have required an excess of powerful and expensive hardware
to achieve the necessary capacity.44
There was, however, another less well-known operating system offered by IBM
that Peirce thought would be perfect: the Airline Control Program (ACP). The
design of ACP was originally developed for the Sabre airline reservation system,
which was a joint project between IBM and American Airlines in the early 1960s.45
42Russell correspondence.
43This was actually one of IBM’s first software “products” sold independently of the hardware.
See Ceruzzi (1998), p. 106. Note that CICS is actually a subsystem designed to run on MVS, not a
full operating system itself.
44Peirce interview.
45For information on Sabre, see Copeland et al. (1995), Knight (1972), Head (2002), and
Campbell-Kelly (2003), pp. 41–45. For a detailed review of ACP/TPF, see Siwiec (1977), pp. 169–
195, and Scrutchin (1987), pp. 158–160. Additional information on ACP comes from interviews
with Peirce, Fojtik, Totten, Reid, vonGillern, and Boston. Although the name “Sabre” is often
written in all capitals, it was never an acronym, and was actually derived from the Buick LeSabre.
128 6 Expanding the System: Organizational and Technical Growth
After Sabre went into full production, IBM enhanced the system based on their ini-
tial experience, and repackaged it in a more generic form, known as Programmed
Airline Reservation System (PARS). PARS was adopted by most of the major US
airlines, and further enhanced based on its observed performance. The operating
system that controlled the PARS application programs, which comprised most of
the code base, was broken out and licensed separately as ACP beginning in 1972.46
It was eventually renamed Transaction Processing Facility (TPF), and it is still the
heart of most airline, hotel, and car rental reservation systems.
ACP is a rather unique operating system and database in one. It was specifically
designed for the airline reservation environment, meaning that it is extremely adept
at processing an unpredictably-large number of simultaneous transactions, each of
which require little CPU time and limited but specialized operating system services.
The goal of ACP was to enable the applications to process most transactions within
just a few seconds, allowing the reservations clerk to keep up a normal flow of
conversation with the customer.47 In fact, the ACP designers considered the reser-
vations clerk, as well as the system operators, to be crucial elements of an overall
system comprised of both humans and machines.48 This view led to a number of
features not commonly observed in other 1970s-era operating systems, nor even in
those existing today.
To ensure that the system met the needs of the reservations agent, it was designed
to do a few specific things as quickly as possible. The operating system itself was
small and light-weight, consuming little memory and CPU cycles for its own work.
Its network control routines were highly-tuned, imposing less than five percent over-
head on the CPU, compared to over 30 percent in other operating systems.49 It
also processed transactions in parallel using a cooperative “multiprogramming” ap-
proach.50 This was a kind of non-preemptive multitasking, which is usually quite
dangerous, as programs only yield when they need data from a peripheral device,
but since PARS and BASE I transactions are of short duration and always need to ac-
cess peripherals, this approach was satisfactory for the time. Whenever an existing
transaction needed data from a file or the network, ACP suspended that transac-
tion and began processing new ones until the requested data were fully read and
available in memory. This allowed ACP to process a large number of transactions
simultaneously.
ACP was also designed to help the operators keep the system up and running.
All normal maintenance could be performed while the system was still online. New
versions of the application programs could be loaded dynamically without shutting
down. All key system metrics could be constantly monitored, and all significant
46Siwiec (1977), p. 173.
47Knight (1972), pp. 1424–1425.
48Siwiec (1977), pp. 171–172.
49Knight (1972), p. 1426. One IBM developer noted that this came with a certain risk—the system
was not terribly protected, and one could easily write code that could bypass safeguards in order
to obtain the necessary performance.
50Knight (1972), p. 1427.
Expanding the Computer Systems 129
activity was both logged and streamed to a printer or terminal.51 Most ACP in-
stallations used multiple, redundant CPUs, and ACP could automatically switch
to the secondary when the primary failed or needed maintenance. The database
could also be mirrored onto redundant disks, allowing quick recovery. And since
no system is ever perfect, ACP was designed to restart after a crash in just a
few seconds, as opposed to the multiple minutes required by other operating sys-
tems.52
These technical features were no doubt appealing, but perhaps the main selling
point of ACP was that PARS provided a clear example of a working ACP system
that was already operating at a scale far beyond BASE I. The original capacity re-
quirement for BASE I was 3,500 authorizations per hour, and by 1976 this had
climbed to 50,000, or nearly 14 per second; in contrast, the existing PARS installa-
tions were processing 50 to 75 transactions per second.53 Furthermore, IBM’s test-
ing had shown that the transaction throughput was more or less linear with the CPU
speed, suggesting that capacity would continue to grow as IBM developed faster
processors.54 BASE I was also much simpler than PARS, and required far less disk
access per transaction.
The actual re-implementation of BASE I was accomplished by an IBM pro-
gramming team familiar with ACP, and was completed in less than a year.55 Fo-
jtik stressed that this was almost an entire re-design of the system, as there was
little documentation on the existing BASE I, and the ACP environment required a
completely different approach. Once the software was ready, Peirce installed two
IBM System/370 model 138 mainframes in the San Mateo center, one being a re-
dundant backup for the other. The authorization messages were cutover to the new
IBM system in late 1977, resulting in an estimated three-fold increase in capac-
ity.56
Beyond the initial increases, moving to the IBM platform also allowed Visa to
continue expanding their capacity without adjusting the software. The instruction
set for the IBM System/370 mainframes remained backwards compatible, allowing
one to run software developed for an earlier model on a later, more powerful model
without modification.
51This was also necessary in order to debug the system, as some logic errors may only occur under
certain timing-dependent conditions. The logged information could also be analyzed to determine
the actual usage of the system and tune it accordingly.
52Siwiec (1977), pp. 171–172.
53BASE I numbers come from Tootelian and Peirce interviews. PARS numbers come from Si-
wiec (1977), p. 172. For comparison, Visa claims that their average peak in February 2007 was
6,800 per second, and their peak capacity was 13,000 per second. See http://corporate.visa.com/
md/fs/corporate/visanet.jsp (accessed on 12 February 2007).
54Siwiec (1977), p. 174.
55Peirce interview.
56Peirce and Schramm interviews.
130 6 Expanding the System: Organizational and Technical Growth
Multiple Data Centers
Although moving to IBM and ACP would greatly enhance the capacity and depend-
ability of the BASE I installation at San Mateo, there was still only one data center,
and all interchange authorization traffic flowed through it. While BASE I was being
re-implemented on ACP, John Totten, who transferred to BASE I after BASE III was
canceled, expressed concern to Hock and Russell about this single point of failure:
I remember going in for some work on the budgeting numbers in December 1976, and I
said, “. . . here we are, providing the service off of one computer in one data center, which
is made out of wood, combustible wood, on a hillside that has dry grass, above a road where
a car could catch on fire; we’re right below a parking lot where kids are parking their cars,
and the cars could come off the edge and drop into the building; and not only that, we’re a
mile from the San Andreas fault! How many more threats could you take on? If your goal is
to run the credit card industry of the world, we really should have some sort of redundant,
parallel site.”
I went back in [on Monday] and Dee said, “you know, we thought about what you said, and
you’re right. You have a new job. Your new job is to go somewhere on the East Coast, find
a site and build a center.” Nothing more. No papers. Nothing more than, “we thought about
it, now let’s do it.” . . . and Dee said, “Oh, and by the way, this has to be up by July 1977.”
So we had six months to find a site, build it, and staff it.57
Selecting the Site
Totten returned to the San Mateo center and set about establishing the criteria by
which he would choose the site. First and foremost, they needed a highly-reliable
and secure telecommunications service, so the new site had to be wired for the
new digital communications system recently offered from AT&T. The new site also
needed to be in a location where a suitable workforce would want to live. Totten
toured the East Coast and came back with a recommendation. Unfortunately, he
neglected to consider the criteria that would be most important to Hock:
The city we recommended was Charlotte, North Carolina, not McLean. Because McLean
was much more expensive . . . so we came back and made the recommendation to Dee . . .
and he said “Charlotte—who knows about that kind of place? I’m in the process of making a
major move to take electronic banking into Europe, and I want to have the letter head, when
someone in Europe sees it, to know that it’s an important place. Now McLean, Virginia,
is that near DC?” And I said, “yeah, it’s right across the river.” He said, “could we use a
Washington DC address on our letterhead?” and Dave Hall [who joined Totten’s team] said,
“yes, I’ve already checked it out and there’s a box, we’ve already signed up for, out at Dulles
airport, which has a Washington DC address.” And Dee said, “well that’s it!”58
Hock was always conscious of Visa’s image, not only with the public, but also within
the banking industry. At this time, Visa’s headquarters were in San Francisco, the
banking capital of the West Coast, and Hock wanted Visa’s presence on the East
57Totten interview. Information on the creation of the East Coast data center comes from interviews
with Totten, Peirce, Derman, and Fojtik.
58Totten interview.
Expanding the Computer Systems 131
Coast to be in a similarly important place (presumably New York was not an option).
Although Visa eventually moved its headquarters to San Mateo and then Foster
City (smaller towns south of San Francisco), they still maintained a San Francisco
mailing address by renting a post office box at the nearby San Francisco Airport.59
Totten selected a site in McLean that was on the same telephone grid as the CIA,
something he felt would provide the security and reliability he wanted. He chose a
steel-framed building that was still under construction, and leased the top two floors,
which were then finished before the lower floors. When they moved in, the elevators
were not even working yet, so the employees had to climb the exposed stairs. Totten
remarked, “That was the typical way of Visa: we figured out every way to skin the
cat to get it done quicker.”
The new center was built and staffed by the July 1977 deadline, but Totten and
his staff were still awaiting their redundant pair of IBM mainframes as well as the
new BASE I software. Since they had a robust telecommunication system, they es-
tablished a merchant authorization call center, similar to the one in San Mateo, pro-
viding backup and off-hours coverage for the acquirers in the eastern half of the
country. Soon afterwards, the computers and the BASE I software arrived, and they
set about installing the first dual-site ACP system.60
Designing a Dual-Switch ACP System
The main goal of creating the second data center was to provide a full, redundant
backup system in another location. It would be somewhat wasteful, however, to
leave that system dormant until the primary system failed, which was the common
practice for redundant mainframes within a single center. Instead, while the IBM
programming team was re-implementing BASE I on ACP, they also added the fea-
tures necessary to run multiple, cooperative systems in parallel. This was rather
innovative at the time, as none of the airlines had ever run more than one concurrent
ACP installation.
To accomplish this, a new telecommunication circuit was run from the McLean
center to each end-point on the existing BASE I network. Each end-point had an
affinity to a primary data center where it sent all of its outgoing authorization re-
quests, but it could receive incoming authorizations from either center. If the pri-
mary center stopped responding, the end-point would automatically begin sending
requests to the secondary center.
Running parallel authorization systems, however, required more than just switch-
ing the network. Recall that BASE I has the ability to stand-in for issuers and au-
thorize transactions on their behalf when their systems are unavailable. The policies
that dictate how much BASE I may approve over how long a period, the authoriza-
tions it approves under these conditions, as well as the card numbers that should be
automatically denied, are all kept in the ACP database. These data, and changes to
59Cleveland (1999), p. 47.
60Totten and Fojtik interviews.
132 6 Expanding the System: Organizational and Technical Growth
them, also needed to be replicated between the centers to ensure that no information
was lost during an outage. To accommodate this, BASE I was enhanced to send data
change notification messages between the various installations.
The dual-switch approach provided Visa with not only some added protection
against regional threats, but also a convenient way to conduct major maintenance on
a center without shutting off the entire service. If they needed to shut down the San
Mateo center for any reason, all traffic could be switched to the McLean center in a
matter of minutes. Either center was capable of handling the entire load on its own.
The dual-switch concept proved to be so successful that Visa eventually added
major centers in England and Japan as well. All four centers run simultaneously,
handling the authorizations for their given area, but the centers in the US and Eng-
land can handle the entire world’s traffic alone if needed.61
Expanding Internationally
International Authorizations
Moving BASE I to IBM/ACP and opening the second data center gave Visa the
capacity it needed to handle the growing volume of domestic interchange authoriza-
tions. International authorizations, however, were still quite slow and cumbersome.
If a US cardholder made purchases in a foreign country, the acquirer needed to
telex the issuing bank to obtain an authorization. The process was just as inefficient
as domestic authorizations prior to BASE I, but suffered further due to the greater
difference in time zones.
The ultimate goal was to expand the online computer network internationally, but
in the 1970s this was not entirely practical, so Fojtik developed a rather ingenious
stopgap. Building on a similar system he had done for Singer, Fojtik wrote some
software that emulated a telex and provided a bridge to BASE I. When a foreign
bank needed an authorization on a US card, they telexed a new number in San Ma-
teo, which corresponded to a modem connected to one of the old PDP-11s. Fojtik’s
software then read the request, parsed it, reformatted it into a BASE I authorization
request message, and submitted it to the switch. A few seconds later, his program
received the response, which it then reformatted into a telex reply message. Because
the operating regulations stipulated the proper ordering of the telexed information,
it was rather easy to write the parsing software, and Fojtik remarked that it was ac-
tually quite forgiving. Because card numbers, expiration dates, and amounts were
all distinctly recognizable, the software allowed them to be in almost any order with
any amount of whitespace in between. Using this system, foreign acquirers could
now obtain international authorizations within a few seconds, at any time.62
61Sources indicated that a fifth center has been added in the US, but it is unclear if this new center
will replace one of the existing ones.
62Fojtik interview.
Expanding the Computer Systems 133
This “auto-telex” system was eventually replaced when the online computer net-
work was expanded into other countries. The first links were to the UK and Canada
in 1977, and within a decade, Visa had amassed enough leased lines and satellite
links to connect every member bank and processor on the planet.63
Multi-Currency Clearing and Settlement
BASE II also expanded outside the US, though it was not until the mid 1980s that
transactions were settled in multiple currencies, a necessary feature for the pay-
ment system to be considered truly “international.”64 From the early days of the
BankAmericard licensing program, it was agreed that foreign transactions would be
cleared and settled in US dollars only. The currency conversion was done by the
acquirer, and although the operating regulations established certain limits on how
and when this should be accomplished, most acquirers used this system to their own
advantage.
In the late 1970s, the international members began using BASE II for electronic
clearing and settlement, but transactions were still converted to US dollars by the
acquirer, who chose the most opportune time to perform the conversion. They also
typically increased the rate by a few percentage points in their favor to cover their
conversion costs. For highly-volatile currencies, this could result in substantial prof-
its for the acquirer. Cardholders were also confused when they received their bills,
as the amount was not expressed in the local currency, and the dollar amount was
converted at a different rate from the one in effect when the purchase was made.
The Eurocard system, which was affiliated with MasterCard in the US, began
offering multi-currency settlement to their European members in the early 1980s,
and MasterCard had announced that their US dollar members would also participate
in that scheme starting in 1986. A team at Visa, headed by a foreign exchange expert
named David Nordemann, was charged with developing a similar feature.
Nordemann devised an approach that would allow all members to clear and settle
with the Visa system in one of many supported currencies.65 Visa, as the central
clearinghouse, would then perform all currency conversions using the wholesale
exchange rates, plus a percentage fee that could be divided between the acquiring
and issuing regions. This fee was primarily designed to compensate the acquirers
who would now lose the income they gained from controlling the conversion rate.
Issuers were also allowed to add a few percentage points to foreign transactions,
provided it was allowed under local law. Many issuers today charge between one
and three percent for foreign currency transactions, and recent laws in the US now
63‘Visa verification net reaches UK, Canada’, American Banker (22 July 1977), p. 1.
64Information on multi-currency clearing and settlement comes from interviews with Nordemann
and Schonheyder.
65As of 2007, Visa clears in 172 currencies and settles in 16 (http://corporate.visa.com/md/fs/
corporate/visanet.jsp, accessed on 12 February 2007).
134 6 Expanding the System: Organizational and Technical Growth
require that this be made explicit, as it was previously buried in the exchange rate
reported on the bill.
The Board accepted the proposal, and multi-currency settlement began in 1986.
Implementing this in the BASE II software posed certain challenges, but finding
a bank that would commit to fixed currency exchange rates each day was even
more difficult. In order for multi-currency clearing and settlement to work, BASE
II needed a set of conversion rates that would remain constant from the moment the
data collection began to the final transfer of funds several hours later. During that
time, the currency exchange rates continued to fluctuate, so any bank willing to act
as Visa’s currency trader would be taking a significant risk. Eventually Barclay’s,
which had a large foreign exchange department, agreed to play this role, and was
able to mitigate the risk by closely monitoring the markets and quoting rates based
on their projections.
Multi-currency clearing and settlement is one of those quiet features that does
not get the appreciation it truly deserves. Extending the authorization network inter-
nationally was certainly important, but allowing members to clear and settle in their
own native currency established Visa as the premier worldwide payment system.
With the addition of this feature, Hock’s original vision of a global system for the
exchange of value was nearly fulfilled.
Conclusion
In this chapter, we examined the various ways in which the payment system was
expanded, both organizationally and technically, throughout the latter 1970s. The
organizational expansions touched off an explosive period of growth for Visa, estab-
lishing them as the dominant bankcard system. To understand this period correctly,
however, one must consider the changes to the organization and the computer sys-
tems together. The enhanced computer systems not only enabled Visa to handle the
dramatic growth, they also made the entire payment system even more attractive to
prospective members.
Nevertheless, there was one aspect of the payment system that still fell short of
Hock’s expectations: the point of sale. Most merchants were still grappling with
cumbersome hot card lists, paper sales drafts, and card imprinters. In order to
make the Visa system a common, and ultimately preferred method of payment, they
needed to eliminate the paper entirely, and capture the transaction electronically at
the point of sale, even at the smallest of merchants. It is to this story that we now
turn.