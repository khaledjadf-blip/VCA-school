export const visualAssets = {
  heroPractice: {
    // Foto via Unsplash (Unsplash-licentie, vrij te gebruiken).
    src: "/images/hero-vca-team.jpg",
    alt: "Team met helmen en veiligheidshesjes op een bouwplaats"
  },
  courseFolder: {
    src: "/images/vca-course-folder-detail.png",
    alt: "Cursusmap en checklist voor VCA voorbereiding"
  },
  planningTable: {
    src: "/images/vca-planning-table-detail.png",
    alt: "Planningstafel voor cursusdata en groepsaanmeldingen"
  },
  classroomTable: {
    src: "/images/vca-classroom-table-detail.png",
    alt: "Voorbereide klassikale VCA trainingstafel"
  },
  certificateProcessing: {
    src: "/images/vca-certificate-processing-detail.png",
    alt: "Diploma- en registratieverwerking na VCA examen"
  },
  forkliftCertificate: {
    src: "/images/vca-forklift-certificate.png",
    alt: "Heftruck met certificaat als visuele ondersteuning voor de cursus"
  },
  hoistCertificate: {
    src: "/images/vca-hoist-certificate.png",
    alt: "Hoogwerker certificaat als visuele ondersteuning voor veilig werken op hoogte"
  },
  bhvPhoto: {
    src: "/images/bhv-course-photo.png",
    alt: "BHV cursusfoto met hesjes als visuele ondersteuning voor bedrijfshulpverlening"
  }
} as const;

export type CourseImageInfo = {
  src: string;
  alt: string;
  position?: string;
  /** Alleen bij foto's met een CC-licentie: naam van de maker en licentie moeten zichtbaar zijn. */
  credit?: { author: string; license: string; url: string };
};

// Eén foto per cursus. Unsplash-foto's mogen zonder naamsvermelding gebruikt worden;
// Wikimedia-foto's (CC BY-SA) tonen de maker en licentie op de foto.
export const courseImages: Record<string, CourseImageInfo> = {
  "vca-basis": {
    src: "/images/courses/vca-basis.jpg",
    alt: "Bouwvakkers met helm en veiligheidshesje aan het werk op een bouwplaats"
  },
  "vca-vol": {
    src: "/images/courses/vca-vol.jpg",
    alt: "Leidinggevende bekijkt bouwtekeningen en plant het werk"
  },
  "vil-vcu": {
    src: "/images/courses/vil-vcu.jpg",
    alt: "Intercedent in gesprek met een kandidaat op kantoor"
  },
  "heftruck-opleiding": {
    src: "/images/courses/heftruck-opleiding.jpg",
    alt: "Heftruck in de praktijkruimte met pionnen voor de rijoefening",
    position: "50% 70%"
  },
  "orderpicker-opleiding": {
    src: "/images/courses/orderpicker-opleiding.jpg",
    alt: "Orderpicker tussen de stellingen in een magazijn"
  },
  "reachtruck-opleiding": {
    src: "/images/courses/reachtruck-opleiding.jpg",
    alt: "Reachtruck in een smalle gang tussen hoge stellingen",
    credit: {
      author: "Alex Blokha",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:JungHeinrich_forklift_in_Dnipro_(45106).jpg"
    }
  },
  "telehandler-opleiding": {
    src: "/images/courses/telehandler-opleiding.jpg",
    alt: "Telehandler (verreiker) met uitgeschoven giek en vorken",
    credit: {
      author: "BulldozerD11",
      license: "CC BY-SA 3.0",
      url: "https://commons.wikimedia.org/wiki/File:Manitou_MLT_627_T_telehandler_-_0179.jpg"
    }
  },
  "hoogwerker-opleiding": {
    src: "/images/courses/hoogwerker-opleiding.jpg",
    alt: "Medewerker met helm werkt op een omhoog gebrachte schaarhoogwerker",
    credit: {
      author: "Justinjkiss",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Hy-Brid_Lifts_PS-1930_scissor_lift_with_worker_working_while_elevated.jpg"
    }
  },
  "bhv-opleiding": {
    src: "/images/courses/bhv-opleiding.jpg",
    alt: "BHV cursusfoto met hesjes als visuele ondersteuning voor bedrijfshulpverlening"
  }
};
