import { courseImages } from "@/lib/visual-assets";

export const courses = [
  {
    slug: "vca-basis",
    title: "VCA Basis",
    category: "VCA Cursussen",
    summary: "Voor uitvoerende professionals die veilig en aantoonbaar volgens VCA-richtlijnen willen werken.",
    format: "Klassikaal of online",
    duration: "1 dag inclusief examen",
    priceExVat: 219,
    priceFrom: true,
    image: courseImages["vca-basis"],
    teacher: "Ervaren veiligheidsdocent met praktijkvoorbeelden uit bouw, techniek en industrie.",
    audience: "Uitvoerend medewerkers, monteurs, operators en starters.",
    highlights: ["SSVV-examen", "Nederlandstalig lesmateriaal", "CDR-registratie na slagen"],
    faqs: [
      {
        question: "Kan ik VCA Basis in 1 dag halen?",
        answer: "Ja. De gebruikelijke route is 1 cursusdag met aansluitend examen. Wie al ervaring heeft kan soms ook kiezen voor alleen examen."
      },
      {
        question: "Voor wie is VCA Basis bedoeld?",
        answer: "VCA Basis is bedoeld voor uitvoerende medewerkers die veilig moeten werken op locaties met risico's, bijvoorbeeld in bouw, techniek, industrie of logistiek."
      },
      {
        question: "Wat is het verschil tussen VCA Basis en VCA VOL?",
        answer: "VCA Basis is voor uitvoerende medewerkers. VCA VOL is voor leidinggevenden, supervisors, projectleiders en vaak zzp'ers die verantwoordelijkheid dragen voor veilig werken."
      },
      {
        question: "Krijg ik direct uitslag?",
        answer: "Bij digitale examens is de uitslag meestal snel bekend. Na slagen volgt correcte registratie volgens de examenroute."
      }
    ]
  },
  {
    slug: "vca-vol",
    title: "VCA VOL",
    category: "VCA Cursussen",
    summary: "Voor leidinggevenden en zzp'ers die verantwoordelijkheid dragen voor veilige uitvoering op de werkvloer.",
    format: "Klassikaal of online",
    duration: "1 dag inclusief examen",
    priceExVat: 249,
    priceFrom: true,
    image: courseImages["vca-vol"],
    teacher: "Senior docent veiligheid en leidinggeven op risicovolle werkplekken.",
    audience: "Voormannen, projectleiders, supervisors en zelfstandigen.",
    highlights: ["Leidinggevende focus", "Direct examenresultaat", "10 jaar geldig certificaat"],
    faqs: [
      {
        question: "Wanneer heb ik VCA VOL nodig?",
        answer: "VCA VOL is nodig wanneer u leiding geeft, toezicht houdt, werk organiseert of als zelfstandige verantwoordelijkheid draagt op een risicovolle werkplek."
      },
      {
        question: "Is VCA VOL moeilijker dan VCA Basis?",
        answer: "VCA VOL behandelt naast basisveiligheid ook leidinggeven, toezicht, werkvergunningen en verantwoordelijkheid. Goede voorbereiding maakt het goed haalbaar."
      },
      {
        question: "Is VCA VOL ook geschikt voor zzp'ers?",
        answer: "Ja. Veel opdrachtgevers vragen zzp'ers om VCA VOL omdat zij zelf verantwoordelijk zijn voor veilig werken en communicatie op locatie."
      },
      {
        question: "Hoe lang is een VCA VOL certificaat geldig?",
        answer: "Een VCA-diploma is normaal gesproken 10 jaar geldig. Controleer altijd de exacte diplomagegevens in de registratie."
      }
    ]
  },
  {
    slug: "vil-vcu",
    title: "VIL-VCU",
    category: "VCA Cursussen",
    summary: "Specifiek voor intercedenten en uitzendorganisaties die personeel verantwoord plaatsen.",
    format: "Klassikaal of online",
    duration: "1 dag inclusief examen",
    priceExVat: 259,
    priceFrom: true,
    image: courseImages["vil-vcu"],
    teacher: "Docent met kennis van VCU-processen, intake en risicobeheersing.",
    audience: "Intercedenten, planners en accountmanagers in de uitzendbranche.",
    highlights: ["VCU-praktijkcases", "SSVV-gecertificeerd examen", "Heldere voorbereiding"],
    faqs: [
      {
        question: "Voor wie is VIL-VCU bedoeld?",
        answer: "VIL-VCU is bedoeld voor intercedenten, planners en accountmanagers die uitzendkrachten plaatsen bij bedrijven waar veilig werken belangrijk is."
      },
      {
        question: "Is VIL-VCU hetzelfde als VCA VOL?",
        answer: "Nee. VCA VOL richt zich op leidinggeven op de werkvloer. VIL-VCU richt zich op veilig uitzenden, informatieplicht, intake en plaatsing van kandidaten."
      },
      {
        question: "Kan VIL-VCU klassikaal of online?",
        answer: "Ja, de voorbereiding kan klassikaal of online worden gepland. De juiste vorm hangt af van kandidaat, planning en examenroute."
      },
      {
        question: "Waarom is VIL-VCU belangrijk voor uitzendbureaus?",
        answer: "Omdat uitzendorganisaties kandidaten goed moeten informeren over risico's, benodigde certificaten en veilige inzet bij opdrachtgevers."
      }
    ]
  },
  {
    slug: "heftruck-opleiding",
    title: "Heftruck Opleiding",
    category: "Intern transport",
    summary: "Theorie en praktijk voor veilig rijden, heffen, laden en lossen met de heftruck, inclusief toetsing en certificaat.",
    format: "Praktijkgericht",
    duration: "1 dag basis of halve dag herhaling",
    priceExVat: 250,
    priceFrom: false,
    image: courseImages["heftruck-opleiding"],
    teacher: "Praktijkinstructeur intern transport met aandacht voor rijgedrag en werkplekveiligheid.",
    audience: "Beginners, ervaren chauffeurs en medewerkers die herhaling nodig hebben.",
    highlights: ["Praktijkruimte beschikbaar", "Beginners en herhaling", "Certificaat na voldoende resultaat"],
    faqs: [
      {
        question: "Is heftruck hetzelfde als VCA?",
        answer: "Nee. VCA gaat over veilig werken in brede zin. Heftruck opleiding is specifiek gericht op veilig rijden, laden, lossen en werken met intern transport."
      },
      {
        question: "Kan een beginner meedoen?",
        answer: "Ja. Beginners volgen theorie en praktijk met extra aandacht voor bediening, stabiliteit, omgeving en veilig rijgedrag."
      },
      {
        question: "Is er ook herhaling mogelijk?",
        answer: "Ja. Ervaren bestuurders kunnen een herhaling volgen wanneer kennis of certificering opgefrist moet worden."
      },
      {
        question: "Krijg ik een certificaat?",
        answer: "Na voldoende resultaat ontvangt de kandidaat een certificaat of bewijs van deelname volgens de gekozen opleiding."
      }
    ]
  },
  {
    slug: "orderpicker-opleiding",
    title: "Orderpicker Opleiding",
    category: "Intern transport",
    summary: "Veilig orders verzamelen met de orderpicker: bediening, rijden in smalle gangen, werken op hoogte en stabiliteit.",
    format: "Praktijkgericht",
    duration: "1 dag basis of halve dag herhaling",
    priceExVat: 170,
    priceFrom: false,
    image: courseImages["orderpicker-opleiding"],
    teacher: "Praktijkinstructeur intern transport met ervaring in magazijn en distributie.",
    audience: "Orderpickers, magazijnmedewerkers en uitzendkrachten in logistiek en distributie.",
    highlights: ["Laag- en hoogniveau orderpicker", "Veilig werken in smalle gangen", "Certificaat na voldoende resultaat"],
    faqs: [
      {
        question: "Wat is een orderpicker?",
        answer: "Een orderpicker is een elektrische magazijntruck waarmee u orders verzamelt uit stellingen. Bij een hoogniveau orderpicker staat u zelf op een platform dat mee omhoog gaat."
      },
      {
        question: "Is een orderpicker opleiding hetzelfde als een heftruck opleiding?",
        answer: "Nee. De bediening, de stabiliteit en het werken op hoogte zijn anders. Daarom is er een aparte opleiding voor de orderpicker."
      },
      {
        question: "Kan een beginner meedoen?",
        answer: "Ja. Beginners leren de bediening stap voor stap. Ervaren medewerkers kunnen een herhaling volgen."
      },
      {
        question: "Krijg ik een certificaat?",
        answer: "Na voldoende resultaat ontvangt de kandidaat een certificaat of bewijs van deelname volgens de gekozen opleiding."
      }
    ]
  },
  {
    slug: "reachtruck-opleiding",
    title: "Reachtruck Opleiding",
    category: "Intern transport",
    summary: "Veilig werken met de reachtruck: hoog stapelen in stellingen, mast bedienen, lasten zeker plaatsen en veilig rijden in het magazijn.",
    format: "Praktijkgericht",
    duration: "1 dag basis of halve dag herhaling",
    priceExVat: 250,
    priceFrom: false,
    image: courseImages["reachtruck-opleiding"],
    teacher: "Praktijkinstructeur intern transport met aandacht voor hoog stapelen en stellingveiligheid.",
    audience: "Magazijnmedewerkers en heftruckchauffeurs die met een reachtruck in hoge stellingen werken.",
    highlights: ["Hoog stapelen in stellingen", "Mast en vorken veilig bedienen", "Certificaat na voldoende resultaat"],
    faqs: [
      {
        question: "Wat is het verschil tussen een reachtruck en een heftruck?",
        answer: "Een reachtruck heeft een mast die naar voren schuift en is gemaakt voor hoge stellingen in smalle gangen. Een gewone heftruck wordt vaker gebruikt voor laden, lossen en buitenwerk."
      },
      {
        question: "Heb ik eerst een heftruck certificaat nodig?",
        answer: "Nee, dat is niet verplicht. Ervaring met een heftruck helpt wel. Beginners krijgen extra aandacht voor bediening en stabiliteit."
      },
      {
        question: "Wat leer ik tijdens de opleiding?",
        answer: "U leert de reachtruck controleren, veilig rijden, lasten hoog in de stelling plaatsen en weer uitnemen, en risico's in het magazijn herkennen."
      },
      {
        question: "Krijg ik een certificaat?",
        answer: "Na voldoende resultaat ontvangt de kandidaat een certificaat of bewijs van deelname volgens de gekozen opleiding."
      }
    ]
  },
  {
    slug: "telehandler-opleiding",
    title: "Telehandler Opleiding",
    category: "Intern transport",
    summary: "Veilig werken met de telehandler (verreiker): lastdiagram lezen, stabiliteit, heffen op hoogte en werken met verschillende aanbouwdelen.",
    format: "Praktijkgericht",
    duration: "1 dag basis of herhaling",
    priceExVat: 300,
    priceFrom: false,
    image: courseImages["telehandler-opleiding"],
    teacher: "Praktijkinstructeur met ervaring met verreikers in bouw, industrie en agrarische sector.",
    audience: "Medewerkers in bouw, industrie, agrarische sector en verhuur die een telehandler bedienen.",
    highlights: ["Lastdiagram en stabiliteit", "Werken met aanbouwdelen", "Certificaat na voldoende resultaat"],
    faqs: [
      {
        question: "Wat is een telehandler?",
        answer: "Een telehandler, ook verreiker genoemd, is een machine met een uitschuifbare giek. Daarmee tilt u lasten hoog en ver, bijvoorbeeld op een bouwplaats of boerderij."
      },
      {
        question: "Waarom is een aparte opleiding nodig?",
        answer: "Hoe verder de giek uitschuift, hoe minder de machine kan tillen. U leert het lastdiagram lezen, zodat de telehandler niet kantelt."
      },
      {
        question: "Kan een beginner meedoen?",
        answer: "Ja. Beginners volgen theorie en praktijk. Ervaren bestuurders kunnen een herhaling volgen."
      },
      {
        question: "Krijg ik een certificaat?",
        answer: "Na voldoende resultaat ontvangt de kandidaat een certificaat of bewijs van deelname volgens de gekozen opleiding."
      }
    ]
  },
  {
    slug: "hoogwerker-opleiding",
    title: "Hoogwerker Opleiding",
    category: "Hoogwerker Opleiding",
    summary: "Veilig werken met een hoogwerker, inclusief machinekennis, risicoherkenning en praktijkinstructie.",
    format: "Praktijkgericht",
    duration: "1 dag basis of herhaling",
    priceExVat: 300,
    priceFrom: true,
    image: courseImages["hoogwerker-opleiding"],
    teacher: "Instructeur met aandacht voor veilig werken op hoogte en machinecontrole.",
    audience: "Medewerkers die een hoogwerker gebruiken of hun kennis willen opfrissen.",
    highlights: ["Praktijk en toetsing", "Veilig werken op hoogte", "Herhaling mogelijk"],
    faqs: [
      {
        question: "Voor wie is een hoogwerker opleiding bedoeld?",
        answer: "Voor medewerkers die veilig met een hoogwerker moeten werken, bijvoorbeeld in onderhoud, bouw, montage of facilitaire inzet."
      },
      {
        question: "Is ervaring verplicht?",
        answer: "Nee. Beginners kunnen de basis volgen en ervaren gebruikers kunnen een herhaling of opfriscursus doen."
      },
      {
        question: "Wat leer ik tijdens de opleiding?",
        answer: "U leert veilig gebruik, controle vooraf, risico's herkennen, correcte opstelling en verantwoord werken op hoogte."
      },
      {
        question: "Krijg ik na afloop een bewijs?",
        answer: "Na voldoende resultaat ontvangt u een certificaat of bewijs van deelname volgens de gekozen opleiding."
      }
    ]
  },
  {
    slug: "bhv-opleiding",
    title: "BHV Opleiding",
    category: "BHV Opleiding",
    summary: "Praktische bedrijfshulpverlening voor eerste hulp, brand, ontruiming en alarmeren op de werkvloer.",
    format: "Praktijkgericht",
    duration: "1 dag basis of herhaling",
    priceExVat: 250,
    priceFrom: true,
    image: courseImages["bhv-opleiding"],
    teacher: "BHV-instructeur met aandacht voor handelen in noodsituaties en duidelijke procedures.",
    audience: "Medewerkers die BHV-taken uitvoeren of een herhaling nodig hebben binnen hun bedrijf.",
    highlights: ["Eerste hulp", "Brand en ontruiming", "BHV-rol op de werkvloer"],
    faqs: [
      {
        question: "Wat is BHV precies?",
        answer: "BHV staat voor bedrijfshulpverlening. Een BHV'er helpt bij eerste hulp, alarmeren, brandbestrijding in de beginfase en ontruiming van het gebouw."
      },
      {
        question: "Voor wie is BHV bedoeld?",
        answer: "Voor medewerkers die binnen een organisatie zijn aangewezen om bij noodsituaties te helpen en de veiligheid van collega's te bewaken."
      },
      {
        question: "Wat leer ik tijdens de BHV opleiding?",
        answer: "U oefent met eerste hulp, reanimatie- en alarmeringsstappen, brandbestrijding en veilig ontruimen volgens de werksituatie."
      },
      {
        question: "Is herhaling mogelijk?",
        answer: "Ja. BHV is vaak een jaarlijkse herhaling of opfrissing, zodat kennis en vaardigheden op peil blijven."
      }
    ]
  },
];

export const categories = [
  {
    title: "VCA Cursussen",
    description: "Basis, VOL en VIL-VCU voor uitvoerenden, leidinggevenden en uitzendorganisaties.",
    detail: "Klassikaal of online, altijd met erkend examen.",
    href: "/cursussen",
    icon: "book"
  },
  {
    title: "Intern transport",
    description: "Heftruck, orderpicker, reachtruck en telehandler: theorie en praktijk per machine.",
    detail: "Kies de opleiding die past bij de machine waarmee u werkt.",
    href: "/cursussen#heftruck-opleiding",
    icon: "forklift"
  },
  {
    title: "Hoogwerker Opleiding",
    description: "Veilig werken op hoogte met praktijkinstructie en toetsing.",
    detail: "Voor medewerkers die een hoogwerker gebruiken of opfrissing nodig hebben.",
    href: "/cursussen/hoogwerker-opleiding",
    icon: "lift"
  },
  {
    title: "BHV Opleiding",
    description: "Eerste hulp, brand, ontruiming en alarmeren op de werkvloer.",
    detail: "Voor medewerkers die BHV-taken uitvoeren of herhaling nodig hebben.",
    href: "/cursussen/bhv-opleiding",
    icon: "shield"
  },
] as const;

export const classes = [
  { course: "VCA Basis", day: "Maandag", time: "09:00", spots: 4, teacher: "M. de Vries", location: "Rotterdam Centrum" },
  { course: "Heftruck Praktijk", day: "Woensdag", time: "13:00", spots: 0, teacher: "A. Jansen", location: "Utrecht Practice Hub" },
  { course: "Hoogwerker Praktijk", day: "Woensdag", time: "15:00", spots: 6, teacher: "A. Jansen", location: "Utrecht Practice Hub" },
  { course: "VCA VOL", day: "Donderdag", time: "09:30", spots: 7, teacher: "S. Bakker", location: "Amsterdam Sloterdijk" },
  { course: "VIL-VCU", day: "Vrijdag", time: "10:00", spots: 5, teacher: "N. Kaya", location: "Online live klas" },
  { course: "VCA Basis Examen", day: "Zaterdag", time: "11:00", spots: 9, teacher: "Examenleider R. Meijer", location: "Eindhoven" }
];
