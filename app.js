const sections = [
  { id: "overview", label: "Überblick" },
  { id: "reading", label: "Lesen" },
  { id: "listening", label: "Hören" },
  { id: "writing", label: "Schreiben" },
  { id: "speaking", label: "Sprechen" },
  { id: "sources", label: "Original" }
];

const sourceLinks = [
  {
    title: "ÖSD Zertifikat A1 – offizielle Seite",
    url: "https://www.osd.at/die-pruefungen/osd-prufungen/oesd-zertifikat-a1/",
    note: "Modulstruktur, Dauer und Punkte des ÖSD ZA1."
  },
  {
    title: "ÖSD Downloads",
    url: "https://www.osd.at/downloads/",
    note: "Kostenloser Modellsatz-Download für ZA1."
  },
  {
    title: "ÖSD ZA1 Modellsatzbroschüre 2024",
    url: "https://www.osd.at/wp-content/uploads/2024/09/ZA1-Modellsatzbroschure_WEB.pdf",
    note: "Grundlage für den 1:1 nachgebauten offiziellen Modellsatz in diesem Test."
  }
];

// Verbatim transcripts of the official MP3s (Whisper, German; lightly cleaned).
const officialTranscripts = {
  a1:
    "Sie hören jetzt fünf verschiedene Texte zu den Fotos. Sie hören jeden Text einmal. Welcher Text passt zu welchem Foto? Achtung: Ein Bild ist zu viel.\n\n" +
    "Text 1: „Ist das schön hier – die Berge und der blaue Himmel, herrlich! Nur ganz schön weit, dieser Weg. Wie lange brauchen wir denn noch bis zum Gästehaus? Ich habe schon so einen großen Hunger.“ – „Ich denke, 20 Minuten werden wir noch brauchen.“\n\n" +
    "Text 2: „Wenn Sie hier auf den Computer schauen – Sie sehen viele verschiedene Bilder. Einige Bilder sollen Sie nehmen und in diese Datei geben.“ – „Sehr gut. Wie könnte ich die Farben bearbeiten?“\n\n" +
    "Text 3: „Das riecht ja gut. Sind die Kartoffeln schon fertig?“ – „Ja, die sind schon schön weich.“ – „Und das Fleisch?“ – „Das geht noch fünf Minuten. Dann fangen wir schon mal mit der Suppe an. Stellst du sie bitte auf den Tisch?“\n\n" +
    "Text 4: „Leider habe ich kein Kleingeld. Ich muss mit einem 50-Euro-Schein bezahlen.“ – „Das macht nichts. Ich habe genug Geld zum Wechseln.“\n\n" +
    "Text 5: „Und wie oft soll ich dieses Pulver nehmen?“ – „Schauen Sie, hier steht: 3-mal täglich vor dem Essen. Es ist auch wichtig, dass Sie dieses Pulver nicht gemeinsam mit den Tabletten nehmen.“ – „Also vor dem Essen das Pulver und dazu viel trinken.“",
  a2:
    "Sie hören folgende Nachricht. Schreiben Sie die wichtigsten Informationen auf das Notizblatt. Sie hören den Text zwei Mal.\n\n" +
    "„Guten Tag, Meier spricht hier. Ich rufe wegen dem Auto an, das Sie sich ansehen wollten. Ich habe am kommenden Dienstag, und zwar am Nachmittag, Zeit. Das ist der 12. Mai. Am besten gleich nach dem Mittagessen, um 14 Uhr – später kommen nämlich meine Kinder von der Schule nach Hause. Ich wohne in der Bernergasse 12 – ich buchstabiere: B, E, R, N, E, R, Gasse Nummer 12. Bitte sagen Sie mir, ob Sie am Dienstag kommen können. Meine Handynummer ist 0664 / 2582641. Da bin ich immer erreichbar. Also bis bald, auf Wiederhören!“",
  a3:
    "Sie hören jetzt 5 Personen, die befragt werden. Kreuzen Sie die richtigen Antworten an. Pro Person gibt es nur eine Antwort. Sie hören die Texte einmal. – „Entschuldigen Sie bitte, wir machen eine Umfrage. Sie sehen hier vier Bilder: Wo gefällt es Ihnen am besten?“\n\n" +
    "Text 1: „Vor drei Jahren habe ich angefangen, asiatische Sprachen zu lernen. So war ich schon einige Male in Asien und bin begeistert. Die Menschen sind zwar ganz anders als hier bei uns in Europa, aber Asien gefällt mir trotzdem besser.“\n\n" +
    "Text 2: „Europa, Amerika, Asien – nein, hier Afrika. Ich liebe Afrika. Jeden Sommer fliege ich dort hin zu meiner Freundin. Die wohnt direkt am Meer. Das ist herrlich dort – die Landschaft, das Klima. Zum Glück wird es nie so kalt wie in Europa.“\n\n" +
    "Text 3: „Einmal war ich auch in Amerika. Nur, ich weiß nicht – Europa finde ich noch immer am schönsten.“\n\n" +
    "Text 4: „Mein liebstes Land, das ist Amerika. Ein Land mit großen Städten, aber auch mit viel Natur und vor allem freundlichen Menschen. Ich war schon oft in Amerika und finde dieses Land einfach super.“\n\n" +
    "Text 5: „Ich mag eigentlich alle Länder und war auch schon überall – in Asien, in Europa sowieso. Aber am besten gefällt mir Afrika. Die Natur in Afrika, die muss man gesehen haben. Diese Pflanzen und Tiere – wunderschön. Afrika ist für mich ein Traum.“"
};

const officialReference = {
  pdf: "assets/pdf/osd-za1-official-sample-2024.pdf",
  audio: [
    { label: "Hören Aufgabe 1 (Original)", src: "assets/audio/official/za1-ms-a1.mp3" },
    { label: "Hören Aufgabe 2 (Original)", src: "assets/audio/official/za1-ms-a2.mp3" },
    { label: "Hören Aufgabe 3 (Original)", src: "assets/audio/official/za1-ms-a3.mp3" }
  ]
};

/* ---------- picture-sheet icons (original artwork for practice sets) ---------- */

const ICONS = {
  train: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="7" width="24" height="27" rx="4"/><line x1="12" y1="20" x2="36" y2="20"/><circle cx="18" cy="40" r="3"/><circle cx="30" cy="40" r="3"/><line x1="16" y1="34" x2="13" y2="40"/><line x1="32" y1="34" x2="35" y2="40"/></svg>',
  cart: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h5l5 22h22"/><path d="M15 24h24l3-12H12"/><circle cx="20" cy="38" r="3"/><circle cx="36" cy="38" r="3"/></svg>',
  euro: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="12" width="36" height="24" rx="3"/><path d="M30 20a7 7 0 1 0 0 8"/><line x1="17" y1="22" x2="27" y2="22"/><line x1="17" y1="26" x2="26" y2="26"/></svg>',
  speech: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 9h30a4 4 0 0 1 4 4v15a4 4 0 0 1-4 4H21l-9 7v-7H9a4 4 0 0 1-4-4V13a4 4 0 0 1 4-4z"/><text x="24" y="26" font-size="13" text-anchor="middle" fill="currentColor" stroke="none" font-family="sans-serif" font-weight="700">DE</text></svg>',
  pharmacy: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"><rect x="8" y="8" width="32" height="32" rx="6"/><path d="M24 16v16M16 24h16" stroke-linecap="round"/></svg>',
  desk: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="16" x2="41" y2="16"/><line x1="11" y1="16" x2="11" y2="37"/><line x1="37" y1="16" x2="37" y2="37"/><rect x="25" y="19" width="11" height="8"/></svg>',
  bike: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="32" r="7"/><circle cx="35" cy="32" r="7"/><path d="M13 32l8-14h10"/><path d="M21 18l7 14M28 18h6"/></svg>',
  cup: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h25v10a10 10 0 0 1-10 10h-5a10 10 0 0 1-10-10z"/><path d="M34 21h4a4 4 0 0 1 0 8h-4"/><path d="M16 9v4M22 8v5M28 9v4"/></svg>'
};

function renderAdLine(line) {
  if (typeof line === "string") return `<p class="ad-line">${line}</p>`;
  if (line.label) return `<p class="ad-line"><strong>${line.label}</strong>${line.text ? `<br>${line.text}` : ""}</p>`;
  return `<p class="ad-line">${line.text || ""}</p>`;
}

function renderSheet(sheet) {
  if (!sheet) return "";
  if (sheet.kind === "ads") {
    return `
      <div class="sheet sheet--paper">
        <div class="sheet-title">${sheet.title}</div>
        <div class="sheet-ads">
          ${sheet.items.map((item) => `
            <article class="ad ad--${item.variant || "plain"}">
              <span class="ad-num">${item.n}</span>
              <div class="ad-main">
                <h3 class="ad-title">${item.title}</h3>
                ${item.sub ? `<p class="ad-sub">${item.sub}</p>` : ""}
                ${(item.body || []).map(renderAdLine).join("")}
              </div>
              ${item.foot ? `<p class="ad-foot">${item.foot}</p>` : ""}
            </article>
          `).join("")}
        </div>
      </div>
    `;
  }
  return `
    <div class="sheet sheet--paper">
      <div class="sheet-title">${sheet.title}</div>
      <div class="sheet-tiles">
        ${sheet.items.map((item) => `
          <figure class="tile">
            <span class="tile-no">${item.label}</span>
            ${item.img
              ? `<img class="tile-img" src="${item.img}" alt="" loading="eager">`
              : `<span class="tile-ico">${ICONS[item.icon] || ""}</span>`}
          </figure>
        `).join("")}
      </div>
    </div>
  `;
}

/* ---------- task builders ---------- */

function matchTask({ title, points = 10, instructions, image, sheet, options, rows, prefix, extra, prompt, audio, transcriptKey, transcript }) {
  const opts = options.map((label, index) => ({ value: String(index + 1), label }));
  if (extra) opts.push({ value: "-", label: extra });
  return {
    title,
    points,
    instructions,
    image,
    sheet,
    prompt,
    audio,
    transcriptKey,
    transcript,
    options: opts,
    questions: rows.map(([label, text, answer], index) => ({
      id: `${prefix}${index}`,
      label,
      text,
      answer: String(answer)
    }))
  };
}

function jaNeinTask({ title, points = 10, instructions, prompt, rows, prefix }) {
  return {
    title,
    points,
    instructions,
    prompt,
    options: [
      { value: "ja", label: "JA" },
      { value: "nein", label: "NEIN" }
    ],
    questions: rows.map(([label, text, answer], index) => ({
      id: `${prefix}${index}`,
      label,
      text,
      answer
    }))
  };
}

function notesTask({ title, points = 10, instructions, audio, transcriptKey, transcript, rows }) {
  return {
    title,
    points,
    instructions,
    audio,
    transcriptKey,
    transcript,
    questions: rows.map(([id, label, answer, accepted]) => ({
      id,
      label,
      text: label,
      answer,
      accepted,
      answerType: "text"
    }))
  };
}

function matrixTask({ title, points = 10, instructions, prompt, audio, transcriptKey, transcript, columns, rows }) {
  return {
    title,
    points,
    instructions,
    prompt,
    audio,
    transcriptKey,
    transcript,
    options: columns.map((column) => ({ value: column.toLowerCase(), label: column })),
    questions: rows.map(([label, stimulus, answer], index) => ({
      id: `m${index}`,
      label,
      text: label,
      stimulus,
      answer: String(answer).toLowerCase()
    }))
  };
}

/* ---------- exams ---------- */

const officialExam = {
  id: "exam-official",
  official: true,
  title: "Offizieller ÖSD ZA1 Modellsatz",
  theme: "Der echte Modellsatz: Originaltexte, Originalaudio (za1-ms-a1/a2/a3) und der offizielle Lösungsschlüssel.",
  reading: {
    minutes: 25,
    tasks: [
      matchTask({
        title: "Aufgabe 1",
        instructions: "Situation: Sie suchen verschiedene Dinge in der Zeitung. Finden Sie zu jeder Situation (A–E) die passende Anzeige (Nr. 1–6). Achtung: Eine Anzeige ist zu viel. Die Originalanzeigen sehen Sie unten.",
        image: "assets/img/official/page-03.png",
        options: [
          "Sekretärin/Sekretär gesucht – Internationale Firma sucht Sekretär/in mit Berufserfahrung (Vollzeit): telefonische Kundenbetreuung, organisatorische Tätigkeiten. info@personalvermittlung-holzer.de",
          "Fitnesscenter Olymp – 120 Geräte für Kraft- und Fitnesstraining, Rückengymnastik, Beratung durch geprüfte Trainer. Burggasse 10, 1070 Wien, täglich 10–22 Uhr",
          "Buchhandlung Steiner – Bücher zum halben Preis: „Richtig telefonieren“, „Gesund essen im Büro“, „100 Jahre Sportfotografie“, Kinderbücher. Gültig bis Ende Mai",
          "Die ganze Welt um wenig Geld! Günstige Auslandsanrufe ab 1,9 Cent/Minute weltweit – www.weltweitanrufen.de",
          "Sie suchen jemanden, der Ihre Wäsche wäscht und bügelt, beim Saubermachen oder bei der Gartenarbeit hilft? Petra Maier, Tel. 0676 55 68 987",
          "Feinkost Klement – Delikatessengeschäft: hausgemachte Salate, Brötchen mit Ei- und Curryaufstrich, Schinken und Käse aus der Region. Petersgasse 8, 4051 Basel, Mo–Sa 9–18 Uhr"
        ],
        rows: [
          ["A", "Sie haben viele Freunde in anderen Ländern und möchten billig mit ihnen telefonieren.", 4],
          ["B", "Sie sollen für ein Fest etwas zum Essen mitbringen. Sie haben keine Zeit zum Kochen.", 6],
          ["C", "Sie suchen einen Job. Sie wollen in einem Büro arbeiten.", 1],
          ["D", "Sie haben eine große Wohnung. Sie brauchen Hilfe bei der Hausarbeit.", 5],
          ["E", "Sie arbeiten viel am Computer. In Ihrer Freizeit möchten Sie Sport machen.", 2]
        ],
        prefix: "r1"
      }),
      jaNeinTask({
        title: "Aufgabe 2",
        instructions: "Situation: Sie lesen drei Anzeigen. Dazu gibt es je 2 Fragen. Antworten Sie mit JA oder NEIN.",
        prompt:
          "<strong>1 · Schönes-Wochenende-Ticket:</strong> gültig ab Samstag 0 Uhr bis Montag 3 Uhr für Reisen in Deutschland; für Gruppen bis zu fünf Personen und für Einzelreisende. Preis: 39 Euro im Internet, 41 Euro im Reisezentrum an Ihrem Bahnhof.<br><br>" +
          "<strong>2 · Lesen im Park:</strong> Im Sommer gibt es in Grazer Parks wieder Bücherkisten mit vielen Kinderbüchern – zum Lesen vor Ort oder zum Mit-nach-Hause-Nehmen. Weitere Aktivitäten: Bastel- und Malgruppen; Papier und Stifte haben wir für dich.<br><br>" +
          "<strong>3 · 3-Zimmer-Wohnung:</strong> Neu renovierte Wohnung (63 m²) ab 1. August zu vermieten. Gesamtmiete: CHF 1.200,–. Sie haben noch Fragen? Schreiben Sie eine E-Mail an info@immobilien-heiss.ch. Termine zur Wohnungsbesichtigung: 15. Juli, 11.00 Uhr | 18. Juli, 15.00 Uhr",
        rows: [
          ["1", "Kann man am Freitagabend mit dem Ticket fahren?", "nein"],
          ["2", "Kostet das Ticket beim Kauf am Bahnhof mehr?", "ja"],
          ["3", "Darf man die Bücher nur im Park lesen?", "nein"],
          ["4", "Müssen die Kinder Papier und Stifte mitbringen?", "nein"],
          ["5", "Kann man telefonisch Informationen bekommen?", "nein"],
          ["6", "Kann man die Wohnung am Vormittag sehen?", "ja"]
        ],
        prefix: "r2"
      }),
      matchTask({
        title: "Aufgabe 3",
        instructions: "Situation: Sie lesen 5 kurze Texte (A–E). Welches Bild (1–6) passt zu welchem Text? Achtung: Ein Bild ist zu viel. Die Originalbilder sehen Sie unten.",
        image: "assets/img/official/page-06.png",
        prompt: "Ordnen Sie jedem Text die passende Bildnummer (1–6) zu.",
        options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
        rows: [
          ["A", "Liebe Besucherinnen und Besucher! Im Krankenhaus ist das Telefonieren mit Handy verboten. Bitte schalten Sie Ihr Handy während Ihres Besuchs bei uns aus.", 5],
          ["B", "Gasthaus Neuwirth – leichte regionale Küche, frische Salate vom Buffet, günstige Mittagsmenüs. Mo–Sa: 9–22 Uhr | Sonntag Ruhetag", 4],
          ["C", "Liebe Kolleginnen und Kollegen! In den Büroräumen ist das Rauchen verboten. Bitte nützen Sie die Raucherzonen im Erdgeschoss.", 1],
          ["D", "Liebe Hundebesitzer! Wir bitten Sie, im Interesse aller Parkbenützer Ihren Hund an die Leine zu nehmen.", 6],
          ["E", "Der Flughafen-Bus bringt Sie schnell und bequem ins Stadtzentrum. Nützen Sie das Angebot! Fahrplanauskünfte am Flughafen Graz: +43 (316) 2902 172", 3]
        ],
        prefix: "r3"
      })
    ]
  },
  listening: {
    minutes: 25,
    tasks: [
      matchTask({
        title: "Aufgabe 1",
        instructions: "Sehen Sie sich die Bilder (A–F) gut an. Sie hören jetzt fünf verschiedene Texte zu den Fotos. Sie hören jeden Text ein Mal. Welcher Text passt zu welchem Foto? Achtung: Ein Bild ist zu viel.",
        image: "assets/img/official/page-07.png",
        prompt: "Schreiben Sie zu jedem Foto die Nummer des passenden Textes (1–5) oder „Kein Text“.",
        audio: "assets/audio/official/za1-ms-a1.mp3",
        transcriptKey: "a1",
        options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
        extra: "Kein Text",
        rows: [
          ["A", "Foto A", 5],
          ["B", "Foto B", "-"],
          ["C", "Foto C", 2],
          ["D", "Foto D", 4],
          ["E", "Foto E", 1],
          ["F", "Foto F", 3]
        ],
        prefix: "l1"
      }),
      notesTask({
        title: "Aufgabe 2",
        instructions: "Sie hören folgende Nachricht. Hören Sie gut zu und schreiben Sie die wichtigsten Informationen auf das Notizblatt. Sie hören den Text zwei Mal.",
        audio: "assets/audio/official/za1-ms-a2.mp3",
        transcriptKey: "a2",
        rows: [
          ["l2a", "Was?", "Auto ansehen", ["auto ansehen", "auto", "das auto ansehen"]],
          ["l2b", "Wann? (Tag)", "Dienstag", ["dienstag", "di", "am dienstag"]],
          ["l2c", "Datum und Uhrzeit (… Mai, um … Uhr)", "12. Mai, 14 Uhr", ["12 mai 14 uhr", "12 mai um 14 uhr", "12 mai 1400 uhr", "12 mai 1400", "12 5 14 uhr", "12 mai 2 uhr", "12 mai um 2 uhr", "12 mai 14", "12 mai 2 uhr nachmittag"]],
          ["l2d", "Wo? (in der …gasse 12)", "Bernergasse 12", ["bernergasse 12", "bernergasse", "berner", "in der bernergasse 12"]],
          ["l2e", "Telefonnummer (0664 / …)", "2582641", ["2582641", "258 2641", "0664 2582641", "0664 258 2641"]]
        ]
      }),
      matrixTask({
        title: "Aufgabe 3",
        instructions: "Sie hören jetzt 5 Personen, die befragt werden. Frage: „Wo gefällt es Ihnen am besten?“ Hören Sie gut zu und wählen Sie die richtige Antwort. Pro Person gibt es nur eine Antwort. Sie hören die Texte ein Mal.",
        prompt: "Wählen Sie für jede Person (Text 1–5): Wo gefällt es ihr am besten?",
        audio: "assets/audio/official/za1-ms-a3.mp3",
        transcriptKey: "a3",
        columns: ["Afrika", "Amerika", "Asien", "Europa"],
        rows: [
          ["Text 1", "Person 1", "Asien"],
          ["Text 2", "Person 2", "Afrika"],
          ["Text 3", "Person 3", "Europa"],
          ["Text 4", "Person 4", "Amerika"],
          ["Text 5", "Person 5", "Afrika"]
        ]
      })
    ]
  },
  writing: {
    minutes: 20,
    tasks: [
      {
        type: "form",
        title: "Aufgabe 1: Formular",
        prompt:
          "Situation: Ihr Freund Ricardo Torres will im September mit seiner Freundin Urlaub in der Schweiz machen. Sie fahren mit dem Zug und brauchen ein Zimmer für zwei Personen mit Frühstück. Sie möchten schwimmen und wandern. Die Reise zahlt Ricardo mit Kreditkarte. Er ist am 26. November 1979 geboren. Helfen Sie Ihrem Freund und füllen Sie das Formular aus (Reiseangebote www.auf-und-weg.com). Nachname ist vorgegeben: Torres.",
        image: "assets/img/official/page-09.png",
        fields: [
          { label: "Vorname", answer: "Ricardo", accepted: ["ricardo"] },
          { label: "Geburtsdatum", answer: "26. November 1979", accepted: ["26 november 1979", "26.11.1979", "26 11 1979", "26111979", "26 nov 1979"] },
          { label: "Urlaubsland", answer: "Schweiz", accepted: ["schweiz", "die schweiz", "in die schweiz"] },
          { label: "Monat", answer: "September", accepted: ["september", "sept"] },
          { label: "Zimmer", answer: "Doppelzimmer", accepted: ["doppelzimmer", "doppel"] },
          { label: "Frühstück", answer: "Ja", accepted: ["ja"] },
          { label: "Anreise mit", answer: "Zug", accepted: ["zug", "mit dem zug", "bahn", "dem zug"] },
          { label: "Sport (zwei Antworten)", answer: "Wandern, Schwimmen", accepted: ["wandern schwimmen", "schwimmen wandern", "wandern und schwimmen", "schwimmen und wandern"], both: ["wandern", "schwimmen"] },
          { label: "Bezahlung", answer: "Kreditkarte", accepted: ["kreditkarte", "kredit", "mit kreditkarte"] }
        ]
      },
      {
        type: "text",
        title: "Aufgabe 2: Persönliches E-Mail",
        prompt:
          "Ihre Freundin Rafaela wohnt in Berlin und hat Sie eingeladen. Sie bekommen dieses E-Mail:<br><br>" +
          "<em>Von: m.rafaela@gmx.net — Betreff: Deine Reise nach Berlin</em><br>" +
          "„Hallo! Du schreibst, du möchtest bald zu mir nach Berlin kommen. Ich freue mich schon sehr! Du kannst auch gerne jemanden von deiner Familie oder Freunde mitbringen. Schreib mir bitte: An welchem Tag und um wie viel Uhr kommst du? Wie lange möchtest du bleiben? Wen bringst du mit? Liebe Grüße, Rafaela“<br><br>" +
          "Antworten Sie Rafaela. Schreiben Sie circa 30 Wörter. Beantworten Sie alle Fragen und schreiben Sie am Ende einen Gruß. Beginnen Sie mit: „Liebe Rafaela, vielen Dank für dein E-Mail. Hier die wichtigsten Informationen zu meiner Berlin-Reise:“",
        minWords: 30,
        checklist: [
          "Anrede „Liebe Rafaela“",
          "An welchem Tag und um wie viel Uhr du kommst",
          "Wie lange du bleibst",
          "Wen du mitbringst",
          "Gruß am Ende"
        ],
        sample:
          "Liebe Rafaela,\nvielen Dank für dein E-Mail. Hier die wichtigsten Informationen zu meiner Berlin-Reise: Ich komme am Samstag, dem 12. Juli, um 16 Uhr. Ich möchte fünf Tage bleiben. Ich bringe meinen Bruder mit. Bis bald!\nLiebe Grüße\n(Dein Name)"
      }
    ]
  },
  speaking: {
    minutes: 10,
    tasks: [
      {
        title: "Aufgabe 1: Über etwas sprechen (sich vorstellen)",
        prompt: "Ihre Gesprächspartnerin/Ihr Gesprächspartner möchte Sie kennenlernen. Wählen Sie 4 Themen aus und sprechen Sie zu jedem Thema ein paar Sätze. Die Partnerin/der Partner kann Ihnen auch Fragen stellen.",
        image: "assets/img/official/page-11.png",
        cards: ["Sprachen", "Hobbys", "Sport", "Familie", "Beruf", "Lieblingsessen"],
        model: "Beispiel: „Ich heiße … und komme aus … Ich spreche … Mein Hobby ist … In meiner Familie sind wir … Personen. Mein Lieblingsessen ist …“"
      },
      {
        title: "Aufgabe 2: Über etwas sprechen (Situationen beschreiben)",
        prompt: "Sie bekommen drei Bilder. Wählen Sie ein Bild aus und sprechen Sie darüber: Was sehen Sie? Wie viele Personen sehen Sie? Wo sind diese Personen? Was machen diese Personen?",
        image: "assets/img/official/page-12.png",
        cards: ["Was sehen Sie?", "Wie viele Personen?", "Wo sind sie?", "Was machen sie?"],
        model: "Beispiel: „Auf dem Bild sehe ich … Ich sehe … Personen. Sie sind … Sie … gerade.“"
      },
      {
        title: "Aufgabe 3: Miteinander sprechen (Alltagssituationen)",
        prompt: "Sie sind nun in der Situation des gewählten Bildes (aus Aufgabe 2). Spielen Sie diese Situation mit Ihrer Gesprächspartnerin/Ihrem Gesprächspartner.",
        image: "assets/img/official/page-12.png",
        cards: ["Begrüßung", "Wunsch / Frage", "Reaktion", "Abschluss"],
        model: "Beispiel: „Guten Tag! Ich möchte … Können Sie mir bitte helfen? … Vielen Dank, auf Wiedersehen!“"
      }
    ]
  }
};

function practiceExam({ id, title, theme, reading, listening, writing, speaking }) {
  return { id, official: false, title, theme, reading, listening, writing, speaking };
}

const speakingTask1TopicSamples = {
  sprachen: [
    "Ich spreche Arabisch.\nIch lerne Deutsch seit sechs Monaten.\nIch spreche auch ein bisschen Englisch.",
    "Meine Muttersprache ist Türkisch.\nIch spreche zu Hause Türkisch.\nIm Kurs lerne ich Deutsch.",
    "Ich spreche Spanisch und Englisch.\nDeutsch lerne ich in der Schule.\nDeutsch ist interessant.",
    "Ich spreche Kurdisch.\nMit meinen Freunden spreche ich Deutsch.\nIch möchte noch besser sprechen.",
    "Ich spreche Russisch.\nIch verstehe auch ein wenig Deutsch.\nJeden Tag übe ich neue Wörter.",
    "Ich spreche Französisch.\nIch lerne Deutsch für die Arbeit.\nDer Deutschkurs macht mir Spaß."
  ],
  hobbys: [
    "Ich höre gern Musik.\nIch höre jeden Abend Musik.\nDas macht mich ruhig.",
    "Ich koche gern.\nAm Wochenende koche ich oft.\nMeine Familie isst gern mit mir.",
    "Ich lese gern Bücher.\nIch lese oft im Bus.\nEinfache Geschichten finde ich interessant.",
    "Ich treffe gern Freunde.\nWir gehen oft ins Café.\nWir sprechen viel und lachen.",
    "Ich sehe gern Filme.\nAm Abend sehe ich oft einen Film.\nKomödien mag ich sehr.",
    "Ich spiele gern Computerspiele.\nIch spiele oft nach der Schule.\nDas macht Spaß."
  ],
  beruf: [
    "Ich bin Student.\nIch studiere Informatik.\nIch arbeite auch als Apotheker.\nMein Beruf macht mir Spaß.",
    "Ich arbeite im Büro.\nIch arbeite von Montag bis Freitag.\nMeine Kollegen sind nett.",
    "Ich habe noch keinen Beruf.\nIch bin Schüler.\nIch lerne Deutsch und Englisch.",
    "Ich bin Apotheker.\nIch arbeite in einer Apotheke.\nIch helfe gern Menschen.\nMeine Arbeit ist interessant.",
    "Ich arbeite als Verkäufer.\nIch arbeite jeden Tag mit Kunden.\nMeine Kollegen sind freundlich.",
    "Ich bin Ingenieur.\nIch arbeite in einer Firma.\nMeine Arbeit macht Spaß."
  ],
  sport: [
    "Ich mache gern Sport.\nIch spiele Fußball.\nIch trainiere dreimal pro Woche.",
    "Ich gehe gern spazieren.\nIch gehe auch ins Fitnessstudio.\nSport ist gesund.",
    "Ich mache nicht viel Sport.\nAber ich schwimme manchmal.\nDas macht Spaß.",
    "Ich fahre gern Fahrrad.\nAm Wochenende fahre ich oft im Park.\nDas ist gesund.",
    "Ich gehe gern schwimmen.\nIm Sommer schwimme ich oft.\nDas macht mir Spaß.",
    "Ich mache gern Sport.\nIch spiele Fußball.\nIch trainiere dreimal pro Woche."
  ],
  familie: [
    "Meine Familie ist klein.\nIch habe eine Mutter und einen Bruder.\nWir wohnen zusammen.",
    "Meine Familie ist groß.\nIch habe zwei Schwestern und einen Bruder.\nAm Sonntag essen wir zusammen.",
    "Ich bin verheiratet.\nMeine Frau und ich wohnen in Wien.\nWir haben ein Kind.",
    "Meine Eltern leben in Syrien.\nIch telefoniere oft mit ihnen.\nIch vermisse meine Familie.",
    "Ich habe keine Kinder.\nIch wohne allein.\nMeine Freunde sind sehr wichtig für mich.",
    "Ich lebe mit meinem Mann.\nWir haben zwei Kinder.\nAm Wochenende spielen wir zusammen."
  ],
  lieblingsessen: [
    "Mein Lieblingsessen ist Pizza.\nIch esse Pizza gern am Wochenende.\nDazu trinke ich Wasser.",
    "Ich esse gern Reis mit Hähnchen.\nMeine Mutter kocht das sehr gut.\nDas Essen schmeckt mir.",
    "Mein Lieblingsessen ist Pasta.\nIch esse sie oft mit Tomatensoße.\nDas ist einfach und lecker.",
    "Ich mag Gemüse und Suppe.\nAm Abend esse ich gern etwas Warmes.\nDas ist gesund.",
    "Ich esse gern Fisch.\nIm Sommer esse ich Fisch mit Salat.\nDas schmeckt sehr gut.",
    "Mein Lieblingsessen ist Kuchen.\nIch esse Kuchen gern mit Kaffee.\nAber ich esse nicht jeden Tag Kuchen."
  ],
  name: [
    "Ich heiße Sara.\nMein Familienname ist Ahmadi.\nMan nennt mich Sari.",
    "Mein Name ist Marco.\nMein Vorname ist Marco, mein Nachname Rossi.\nIch komme aus Italien.",
    "Ich heiße Ling.\nMein Nachname ist Wang.\nMeine Freunde sagen Ling zu mir.",
    "Mein Name ist Omar.\nIch buchstabiere: O-M-A-R.\nIch freue mich, Sie kennenzulernen.",
    "Ich heiße Anna.\nMein Familienname ist Novak.\nIch bin neu hier.",
    "Mein Name ist David.\nMein Nachname ist Schmidt.\nAlle nennen mich Dave."
  ],
  alter: [
    "Ich bin 25 Jahre alt.\nMein Geburtstag ist im Mai.\nIch bin noch jung.",
    "Ich bin 30 Jahre alt.\nIch habe im Juli Geburtstag.\nIch fühle mich gut.",
    "Ich bin 19 Jahre alt.\nIch bin noch Student.\nMein Geburtstag ist im Winter.",
    "Ich bin 42 Jahre alt.\nIch habe zwei Kinder.\nMein Geburtstag ist im März.",
    "Ich bin 28 Jahre alt.\nIch wohne schon lange hier.\nMein Geburtstag ist im Herbst.",
    "Ich bin 35 Jahre alt.\nMein Geburtstag ist im Dezember.\nDann feiere ich mit der Familie."
  ],
  land: [
    "Ich komme aus Syrien.\nMeine Heimatstadt ist Aleppo.\nJetzt lebe ich in Österreich.",
    "Ich komme aus der Türkei.\nIch bin in Istanbul geboren.\nDeutschland ist jetzt mein Zuhause.",
    "Ich komme aus Spanien.\nMeine Familie lebt in Madrid.\nIch besuche sie im Sommer.",
    "Ich komme aus dem Iran.\nIch bin in Teheran geboren.\nIch lebe seit zwei Jahren in Wien.",
    "Ich komme aus Indien.\nMeine Heimat ist sehr groß.\nHier ist das Wetter kälter.",
    "Ich komme aus der Ukraine.\nMeine Stadt heißt Kyjiw.\nJetzt wohne ich in Österreich."
  ],
  wohnort: [
    "Ich wohne in Wien.\nMeine Adresse ist Hauptstraße 10.\nDie Stadt ist groß und schön.",
    "Ich wohne in Graz.\nIch habe eine kleine Wohnung.\nDas Zentrum ist nah.",
    "Ich wohne in Linz.\nMein Haus ist neben dem Park.\nIch wohne gern dort.",
    "Ich wohne in Salzburg.\nMeine Wohnung ist im dritten Stock.\nDie Berge sind sehr schön.",
    "Ich wohne in einem Dorf.\nEs ist ruhig und klein.\nMeine Nachbarn sind nett.",
    "Ich wohne im Zentrum.\nAlles ist in der Nähe.\nIch gehe oft zu Fuß."
  ],
  tagesablauf: [
    "Ich stehe um sieben Uhr auf.\nIch frühstücke und gehe zum Kurs.\nAm Abend lese ich ein Buch.",
    "Ich wache früh auf.\nAm Vormittag arbeite ich.\nNach dem Essen mache ich eine Pause.",
    "Ich stehe um halb acht auf.\nIch trinke Kaffee und fahre zur Arbeit.\nAm Abend koche ich.",
    "Am Morgen mache ich Sport.\nDann gehe ich in die Schule.\nAm Abend treffe ich Freunde.",
    "Ich stehe spät auf.\nAm Nachmittag lerne ich Deutsch.\nIn der Nacht schlafe ich gut.",
    "Ich beginne den Tag um sechs Uhr.\nIch arbeite bis zum Nachmittag.\nDann gehe ich spazieren."
  ],
  wochenende: [
    "Am Wochenende schlafe ich lange.\nIch treffe meine Freunde.\nWir gehen ins Café.",
    "Am Samstag kaufe ich ein.\nAm Sonntag besuche ich meine Familie.\nWir essen zusammen.",
    "Am Wochenende mache ich Sport.\nIch spiele Fußball im Park.\nDanach ruhe ich mich aus.",
    "Am Samstag putze ich die Wohnung.\nAm Sonntag sehe ich einen Film.\nDas ist entspannend.",
    "Am Wochenende gehe ich spazieren.\nManchmal fahre ich in die Berge.\nDie Natur ist schön.",
    "Am Wochenende koche ich gern.\nIch lade Freunde ein.\nWir reden und lachen viel."
  ]
};

const practiceExams = [
  practiceExam({
    id: "exam-1",
    title: "Übungssatz 1: Ankommen in Wien",
    theme: "Gleiche Struktur wie der Modellsatz – neue Inhalte (Bibliothek, Kurse, Wohnen).",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Situation: Sie suchen verschiedene Dinge in der Zeitung. Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "logo", title: "Sprachcafé", sub: "Deutsch sprechen & Leute treffen", body: ["Jeden Mittwochabend, 18:30 Uhr", "Stadtbibliothek Wien", "Alle Niveaus willkommen!"], foot: "Eintritt frei · ohne Anmeldung" },
              { n: 2, variant: "logo", title: "Möbelmarkt NORD", sub: "Gebrauchte Büromöbel", body: ["Schreibtische & Stühle", "sehr günstig – Lieferung möglich"], foot: "Mo–Sa · Industriestraße 4" },
              { n: 3, variant: "classified", title: "Zimmer frei", body: ["WG-Zimmer, Nähe Zentrum", "380 Euro warm, ab sofort", "Nur an Nichtraucher"], foot: "Tel. 0699 12 34 567" },
              { n: 4, variant: "list", title: "Fahrkartenbüro", body: [{ label: "Tickets:", text: "Bahn & Bus, In- und Ausland" }, { label: "Beratung:", text: "Ausflüge & Reisen" }], foot: "Täglich 7–19 Uhr · am Hauptplatz" },
              { n: 5, variant: "contact", title: "Fahrrad kaputt?", sub: "Fahrradservice am Markt", body: ["Reparatur AUCH am Samstag", "ohne Termin – schnell & günstig"], foot: "Marktgasse 7" },
              { n: 6, variant: "plain", title: "Kinderbetreuung", body: ["Am Nachmittag, Mo–Fr", "im Familienzentrum", "Erfahrene Betreuerinnen"], foot: "Anmeldung: familienzentrum.at" }
            ]
          },
          options: [
            "Sprachcafé: Deutsch sprechen am Mittwochabend, 18:30 Uhr, Stadtbibliothek.",
            "Möbelmarkt Nord: gebrauchte Schreibtische und Stühle, Mo–Sa, sehr günstig.",
            "Zimmer frei in einer WG, Nähe Zentrum, 380 Euro, ab sofort.",
            "Fahrkartenbüro: Tickets für Bahn und Bus, täglich 7–19 Uhr.",
            "Fahrradservice am Markt: Reparatur auch am Samstag, ohne Termin.",
            "Kinderbetreuung am Nachmittag, Mo–Fr, im Familienzentrum."
          ],
          rows: [
            ["A", "Sie möchten am Abend Deutsch sprechen üben.", 1],
            ["B", "Sie suchen ein Zimmer in der Nähe vom Zentrum.", 3],
            ["C", "Sie brauchen einen billigen Schreibtisch.", 2],
            ["D", "Ihr Fahrrad ist kaputt und Sie haben nur am Samstag Zeit.", 5],
            ["E", "Sie möchten eine Fahrkarte nach Salzburg kaufen.", 4]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Stadtbibliothek Wien:</strong> Anmeldung Mo–Fr 9–18 Uhr. Bitte einen Ausweis mitbringen.<br><br>" +
            "<strong>2 · Deutschkurs A1:</strong> Beginn Dienstag 17 Uhr, Raum 2. Das Buch kostet 18 Euro.<br><br>" +
            "<strong>3 · Fahrradservice Marktgasse:</strong> Reparaturen ohne Termin, jeden Samstag 8–13 Uhr.",
          rows: [
            ["1", "Kann man sich am Samstag in der Bibliothek anmelden?", "nein"],
            ["2", "Braucht man für die Anmeldung einen Ausweis?", "ja"],
            ["3", "Beginnt der Deutschkurs am Dienstag?", "ja"],
            ["4", "Ist das Buch kostenlos?", "nein"],
            ["5", "Braucht man am Samstag einen Termin für den Fahrradservice?", "nein"],
            ["6", "Hat der Fahrradservice am Samstag bis 18 Uhr offen?", "nein"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt zu welchem Text? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", icon: "cart", img: "assets/img/practice/exam-1/l3-1.jpg" },
              { label: "2", icon: "euro", img: "assets/img/practice/exam-1/l3-2.jpg" },
              { label: "3", icon: "train", img: "assets/img/practice/exam-1/l3-3.jpg" },
              { label: "4", icon: "speech", img: "assets/img/practice/exam-1/l3-4.jpg" },
              { label: "5", icon: "pharmacy", img: "assets/img/practice/exam-1/pharmacy.jpg" },
              { label: "6", icon: "desk", img: "assets/img/practice/exam-1/l3-6.jpg" }
            ]
          },
          options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
          rows: [
            ["A", "Ich brauche Geld. Ich gehe zuerst zum Automaten und dann kaufe ich Brot.", 2],
            ["B", "Heute Abend spreche ich Deutsch mit anderen Leuten in der Bibliothek.", 4],
            ["C", "Mein Tisch ist kaputt. Ich suche einen gebrauchten Schreibtisch.", 6],
            ["D", "Ich habe Kopfschmerzen und brauche Tabletten.", 5],
            ["E", "Ich fahre morgen nach Salzburg und brauche eine Fahrkarte.", 3]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sehen Sie sich die Bilder (A–F) gut an. Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Foto? Achtung: Ein Bild ist zu viel.",
          prompt: "Schreiben Sie zu jedem Foto die Nummer des passenden Textes (1–5) oder „Kein Text“.",
          audio: "assets/audio/generated/exam-1-task-1.mp3",
          transcript:
            "Text 1: Achtung am Bahnsteig – der Zug nach Salzburg fährt heute von Gleis 4 ab. Bitte einsteigen.\n\n" +
            "Text 2: „Entschuldigung, wo finde ich Milch und Brot?“ – „Die Milch ist links, das Brot beim Eingang.“\n\n" +
            "Text 3: „Guten Tag, ich habe starke Kopfschmerzen. Haben Sie etwas dagegen?“ – „Ja, nehmen Sie diese Tabletten, dreimal täglich – nur hier in der Apotheke.“\n\n" +
            "Text 4: „Mein Fahrrad ist kaputt, hinten ist das Rad platt.“ – „Kein Problem, wir reparieren es. Auch am Samstag, ohne Termin.“\n\n" +
            "Text 5: „Kommst du am Mittwoch ins Sprachcafé? Wir sprechen Deutsch in der Stadtbibliothek, um halb sieben.“ – „Ja, gern!“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", icon: "pharmacy", img: "assets/img/practice/exam-1/pharmacy.jpg" },
              { label: "B", icon: "train", img: "assets/img/practice/exam-1/l1-A.jpg" },
              { label: "C", icon: "speech", img: "assets/img/practice/exam-1/l1-E.jpg" },
              { label: "D", icon: "cart", img: "assets/img/practice/exam-1/l1-B.jpg" },
              { label: "E", icon: "bike", img: "assets/img/practice/exam-1/l1-D.jpg" },
              { label: "F", icon: "cup", img: "assets/img/practice/exam-1/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Foto A", 3],
            ["B", "Foto B", 1],
            ["C", "Foto C", 5],
            ["D", "Foto D", 2],
            ["E", "Foto E", 4],
            ["F", "Foto F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht der Sprachschule. Schreiben Sie die wichtigsten Informationen auf das Notizblatt. Sie hören den Text zwei Mal.",
          audio: "assets/audio/generated/exam-1-task-2.mp3",
          transcript:
            "„Guten Tag, hier ist die Sprachschule Wien. Ich rufe wegen Ihrem Deutschkurs an. Der Deutschkurs beginnt am Dienstag, dem 12. Mai, um 8:30 Uhr. Der Kurs ist in der Bernergasse 12. Bitte rufen Sie uns bei Fragen an: 0664 / 2582641. Auf Wiederhören.“ (Sie hören den Text zwei Mal.)",
          rows: [
            ["p1l2a", "Was?", "Deutschkurs", ["deutschkurs", "kurs", "sprachkurs"]],
            ["p1l2b", "Wann? (Tag)", "Dienstag", ["dienstag", "di"]],
            ["p1l2c", "Datum und Uhrzeit", "12. Mai, 8:30 Uhr", ["12 mai 830 uhr", "12 mai 830", "12 mai 8 30 uhr", "12 mai 8 30", "12 mai um 830 uhr", "12 mai halb neun", "12 5 830 uhr", "12 5 830"]],
            ["p1l2d", "Wo?", "Bernergasse 12", ["bernergasse 12", "bernergasse", "berner"]],
            ["p1l2e", "Telefonnummer", "0664 2582641", ["0664 2582641", "2582641"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören jetzt 5 Personen, die befragt werden. Wählen Sie pro Person eine Antwort. Sie hören die Texte einmal.",
          prompt: "Frage: Wo machen Sie Urlaub?",
          audio: "assets/audio/generated/exam-1-task-3.mp3",
          transcript:
            "Frage: Wo machen Sie Urlaub?\n\n" +
            "Person 1: „Ich habe nicht viel Geld. Ich bleibe zu Hause und entspanne mich in meiner Wohnung.“\n\n" +
            "Person 2: „Ich liebe das Wasser. Ich fahre ans Meer und schwimme dort jeden Tag.“\n\n" +
            "Person 3: „Ich bleibe in Österreich. Ich besuche meine Familie in Graz.“\n\n" +
            "Person 4: „Ich fliege ins Ausland, nach Spanien. Das ist mein erster Flug.“\n\n" +
            "Person 5: „Ich habe keinen Urlaub. Ich bleibe zu Hause und lerne Deutsch für die Prüfung.“",
          columns: ["zu Hause", "Ausland", "Österreich", "Meer"],
          rows: [
            ["Text 1", "Person 1", "zu hause"],
            ["Text 2", "Person 2", "meer"],
            ["Text 3", "Person 3", "österreich"],
            ["Text 4", "Person 4", "ausland"],
            ["Text 5", "Person 5", "zu hause"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie möchten einen Ausweis für die Stadtbibliothek bekommen. Angaben: Omar Hassan, geboren am 12.03.1997, Favoritenstraße 45, 1100 Wien, Telefon +43 660 1234567, omar.hassan@example.com, Muttersprache Arabisch.",
      fields: [
        ["Familienname", "Hassan", ["hassan"]],
        ["Vorname", "Omar", ["omar"]],
        ["Geburtsdatum", "12.03.1997", ["12 03 1997", "12.03.1997", "12031997"]],
        ["Straße", "Favoritenstraße", ["favoritenstraße", "favoritenstrasse"]],
        ["Hausnummer", "45", ["45"]],
        ["PLZ", "1100", ["1100"]],
        ["Ort", "Wien", ["wien"]],
        ["Telefon", "+43 660 1234567", ["43 660 1234567", "0660 1234567"]],
        ["E-Mail", "omar.hassan@example.com", ["omar.hassan@example.com"]],
        ["Muttersprache", "Arabisch", ["arabisch"]]
      ],
      emailPrompt:
        "Ihre Nachbarin schreibt Ihnen. Antworten Sie und schreiben Sie circa 30 Wörter: warum Sie schreiben, wann Sie Zeit haben, und fragen Sie, ob sie kommen kann.",
      checklist: ["Anrede", "Grund genannt", "Tag/Uhrzeit genannt", "Frage am Ende", "Gruß"],
      sample: "Liebe Frau Weber,\nich bin Omar. Ich bin Ihr neuer Nachbar und wohne in Wohnung 5. Ich möchte Sie am Samstag um 16 Uhr zu Kaffee und Kuchen einladen. Können Sie kommen?\nViele Grüße\nOmar"
    }),
    speaking: practiceSpeaking([
      "Sie sind am Bahnhof. Fragen Sie nach einer Fahrkarte nach Salzburg, der Uhrzeit und dem Preis.",
      "Beschreiben Sie ein Bild: Eine Person kauft Obst im Supermarkt."
    ], {
      task1: "assets/img/practice/exam-1/speaking-1.jpg",
      task2: "assets/img/practice/exam-1/speaking-2.jpg",
      task3: "assets/img/practice/exam-1/speaking-3.jpg",
      sprachenSample: 5,
      hobbysSample: 3,
      berufSample: 4,
      sportSample: 2,
      familieSample: 1,
      lieblingsessenSample: 6,
      nameSample: 1,
      alterSample: 2,
      landSample: 3,
      wohnortSample: 4,
      tagesablaufSample: 5,
      wochenendeSample: 6,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe einen Supermarkt.“<br><strong>Wie viele Personen?</strong> „Eine Person, eine Frau.“<br><strong>Wo?</strong> „Sie steht vor dem Obst.“<br><strong>Was machen sie?</strong> „Sie kauft Äpfel und Bananen und legt sie in den Einkaufskorb.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag!“<br><strong>Wunsch / Frage:</strong> „Ich möchte eine Fahrkarte nach Salzburg. Wann fährt der nächste Zug? Was kostet die Fahrkarte?“<br><strong>Reaktion:</strong> „Aha, gut. Dann nehme ich bitte eine Karte um 9 Uhr.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiedersehen!“"
    })
  }),
  practiceExam({
    id: "exam-2",
    title: "Übungssatz 2: Termine und Alltag",
    theme: "Arzt, Arbeit, Kurse, Termine – gleicher Aufbau wie der Modellsatz.",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "contact", title: "Praxis Dr. Klein", sub: "Allgemeinmedizin", body: ["Offene Sprechstunde", "Mo–Fr 8–11 Uhr", "Bitte Versicherungskarte mitbringen"], foot: "Parkstraße 8 · Tel. 01 / 2354" },
              { n: 2, variant: "logo", title: "VHS Mitte", sub: "Deutsch A1 Abendkurs", body: ["Dienstag & Donnerstag", "18–20 Uhr", "kleine Gruppen"], foot: "Anmeldung im Büro, 2. Stock" },
              { n: 3, variant: "classified", title: "Minijob im Café", body: ["Samstagvormittag 8–12 Uhr", "Service und Küche", "Deutsch A1 genügt"], foot: "Bitte Frau Meier anrufen" },
              { n: 4, variant: "plain", title: "2-Zimmer-Wohnung", body: ["mit Balkon, ab Juli", "Nähe U-Bahn", "ruhige Lage"], foot: "Besichtigung nach Termin" },
              { n: 5, variant: "list", title: "Computerhilfe", body: [{ label: "Laptop langsam?", text: "Reparatur & Beratung" }, { label: "Service:", text: "auch Hausbesuch" }], foot: "Mo–Sa · schnell erreichbar" },
              { n: 6, variant: "logo", title: "Sportclub Süd", sub: "Schwimmen & Fitness", body: ["Probetraining kostenlos", "Trainerberatung inklusive"], foot: "Täglich 9–21 Uhr" }
            ]
          },
          options: [
            "Praxis Dr. Klein: Allgemeinmedizin, offene Sprechstunde Mo–Fr 8–11 Uhr.",
            "Deutsch A1 Abendkurs, Di & Do 18–20 Uhr, VHS Mitte.",
            "Minijob im Café: Samstagvormittag, Deutsch A1 genügt.",
            "Wohnung mit Balkon, zwei Zimmer, ab Juli, Nähe U-Bahn.",
            "Computerhilfe: Laptop langsam? Reparatur und Beratung, auch Hausbesuch.",
            "Sportclub Süd: Schwimmen und Fitness, Probetraining kostenlos."
          ],
          rows: [
            ["A", "Sie suchen Arbeit am Samstag.", 3],
            ["B", "Sie möchten schwimmen und Sport machen.", 6],
            ["C", "Sie sind krank und brauchen heute Vormittag einen Arzt.", 1],
            ["D", "Ihr Laptop funktioniert schlecht.", 5],
            ["E", "Sie möchten abends Deutsch lernen.", 2]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Praxis Dr. Klein:</strong> Offene Sprechstunde Mo–Fr 8–11 Uhr. Bitte Versicherungskarte mitbringen.<br><br>" +
            "<strong>2 · VHS Mitte:</strong> Abendkurs Deutsch A1 beginnt Donnerstag 18 Uhr. Büro im zweiten Stock.<br><br>" +
            "<strong>3 · Café Bella</strong> sucht Hilfe für Samstag 8–12 Uhr. Bitte Frau Meier anrufen.",
          rows: [
            ["1", "Ist die offene Sprechstunde am Vormittag?", "ja"],
            ["2", "Muss man eine Versicherungskarte mitbringen?", "ja"],
            ["3", "Beginnt der Kurs am Donnerstagabend?", "ja"],
            ["4", "Ist das Büro im Erdgeschoss?", "nein"],
            ["5", "Ist die Arbeit im Café am Samstagvormittag?", "ja"],
            ["6", "Soll man eine E-Mail schreiben?", "nein"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", img: "assets/img/practice/exam-2/l3-1.jpg" },
              { label: "2", img: "assets/img/practice/exam-2/l3-2.jpg" },
              { label: "3", img: "assets/img/practice/exam-2/l3-3.jpg" },
              { label: "4", img: "assets/img/practice/exam-2/l3-4.jpg" },
              { label: "5", img: "assets/img/practice/exam-2/l3-5.jpg" },
              { label: "6", img: "assets/img/practice/exam-2/l3-6.jpg" }
            ]
          },
          options: [
            "Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"
          ],
          rows: [
            ["A", "Ich habe heute Fieber und brauche einen Termin.", 1],
            ["B", "Mein Laptop ist sehr langsam und ich brauche Hilfe.", 6],
            ["C", "Ich möchte am Abend einen A1-Kurs besuchen.", 2],
            ["D", "Wir haben morgen um zehn Uhr eine Besprechung.", 3],
            ["E", "Ich suche Arbeit am Samstagvormittag im Café.", 4]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Bild? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Bild (A–F) die Textnummer (1–5) oder „Kein Text“ zu.",
          audio: "assets/audio/generated/exam-2-task-1.mp3",
          transcript:
            "Text 1: „Guten Tag, Praxis Dr. Klein. Heute ist die Praxis nur bis zwölf Uhr geöffnet. Morgen sind wir wieder ab acht Uhr da.“\n\n" +
            "Text 2: „Die Besprechung beginnt in zehn Minuten. Bitte kommen Sie alle in Raum drei. Die Unterlagen liegen schon auf dem Tisch.“\n\n" +
            "Text 3: „Der Bus Nummer sieben kommt heute zehn Minuten später. Bitte warten Sie an der Haltestelle.“\n\n" +
            "Text 4: „Heute gibt es in der Kantine Suppe und Salat. Das Menü kostet sechs Euro fünfzig.“\n\n" +
            "Text 5: „Entschuldigung, wo ist der Kopierer?“ – „Geradeaus und dann links, neben der Küche.“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", img: "assets/img/practice/exam-2/l1-D.jpg" },
              { label: "B", img: "assets/img/practice/exam-2/l1-A.jpg" },
              { label: "C", img: "assets/img/practice/exam-2/l1-E.jpg" },
              { label: "D", img: "assets/img/practice/exam-2/l1-C.jpg" },
              { label: "E", img: "assets/img/practice/exam-2/l1-B.jpg" },
              { label: "F", img: "assets/img/practice/exam-2/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Bild A", 4],
            ["B", "Bild B", 1],
            ["C", "Bild C", 5],
            ["D", "Bild D", 3],
            ["E", "Bild E", 2],
            ["F", "Bild F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht aus der Arztpraxis zwei Mal. Schreiben Sie die wichtigsten Informationen auf das Notizblatt.",
          audio: "assets/audio/generated/exam-2-task-2.mp3",
          transcript:
            "Guten Tag Frau Ali, hier ist die Praxis Dr. Klein. Ihr Termin ist am Mittwoch, dem fünften Juni, um elf Uhr. Die Praxis ist in der Parkstraße acht. Bitte bringen Sie Ihre Versicherungskarte mit. Unsere Telefonnummer ist null eins, dreiundzwanzig, vierundfünfzig. Auf Wiederhören. (Sie hören den Text zwei Mal.)",
          rows: [
            ["p2l2a", "Was?", "Arzttermin", ["arzttermin", "termin"]],
            ["p2l2b", "Wann? (Tag)", "Mittwoch", ["mittwoch", "mi"]],
            ["p2l2c", "Datum und Uhrzeit", "5. Juni, 11 Uhr", ["5 juni 11 uhr", "5. juni 11 uhr", "5 juni 11", "fünfter juni elf uhr"]],
            ["p2l2d", "Wo?", "Parkstraße 8", ["parkstraße 8", "parkstrasse 8", "parkstraße"]],
            ["p2l2e", "Telefonnummer", "01 2354", ["01 2354", "012354"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören fünf kurze Interviews einmal. Wählen Sie pro Person eine Antwort.",
          prompt: "Was macht die Person heute/morgen?",
          audio: "assets/audio/generated/exam-2-task-3.mp3",
          transcript:
            "Frage: Was machen Sie heute oder morgen?\n\n" +
            "Text 1: „Ich kann heute nicht ins Büro kommen. Ich bin krank und gehe zum Arzt.“\n\n" +
            "Text 2: „Am Abend lerne ich Deutsch in der VHS. Der Kurs beginnt um achtzehn Uhr.“\n\n" +
            "Text 3: „Ich arbeite am Samstag im Café. Ich komme schon um acht Uhr.“\n\n" +
            "Text 4: „Nach dem Kurs kaufe ich Milch, Brot und Äpfel.“\n\n" +
            "Text 5: „Morgen habe ich um elf Uhr einen Termin in der Praxis.“",
          columns: ["Arbeit", "Arzt", "Kurs", "Einkaufen"],
          rows: [
            ["Text 1", "Person 1", "arzt"],
            ["Text 2", "Person 2", "kurs"],
            ["Text 3", "Person 3", "arbeit"],
            ["Text 4", "Person 4", "einkaufen"],
            ["Text 5", "Person 5", "arzt"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie melden sich für einen Kochkurs an. Angaben: Lena Ali, geboren am 08.11.1995, Müllerstraße 9, 1200 Wien, Telefon +43 699 778899, Kurs „Kochen A1“, Donnerstag 18 Uhr, vegetarisch: ja, 1 Person, Bezahlung bar.",
      fields: [
        ["Name", "Lena Ali", ["lena ali"]],
        ["Geburtsdatum", "08.11.1995", ["08 11 1995", "08.11.1995", "08111995"]],
        ["Adresse", "Müllerstraße 9, 1200 Wien", ["müllerstraße 9 1200 wien", "muellerstrasse 9 1200 wien"]],
        ["Telefon", "+43 699 778899", ["43 699 778899", "0699 778899"]],
        ["Kurs", "Kochen A1", ["kochen a1", "kochkurs a1", "kochkurs"]],
        ["Wochentag", "Donnerstag", ["donnerstag", "do"]],
        ["Uhrzeit", "18 Uhr", ["18 uhr", "18", "18:00", "achtzehn uhr"]],
        ["Vegetarisch", "Ja", ["ja"]],
        ["Personen", "1", ["1", "eine person", "1 person"]],
        ["Bezahlung", "bar", ["bar"]]
      ],
      emailPrompt: "Sie sind krank und können morgen nicht arbeiten. Schreiben Sie Ihrem Chef circa 30 Wörter: Sie sind krank, Sie gehen zum Arzt, Sie kommen am Freitag wieder.",
      checklist: ["Anrede", "Grund (krank)", "Arzt genannt", "Rückkehr genannt", "Gruß"],
      sample: "Sehr geehrter Herr Berger,\nich bin krank und kann morgen leider nicht arbeiten. Ich habe Fieber. Morgen gehe ich zum Arzt. Am Freitag komme ich wieder ins Büro.\nMit freundlichen Grüßen\nLena Ali"
    }),
    speaking: practiceSpeaking([
      "Sie rufen beim Arzt an. Fragen Sie nach einem Termin und sagen Sie, was weh tut.",
      "Beschreiben Sie ein Bild: Zwei Personen sprechen in einem Büro."
    ], { sprachenSample: 2, hobbysSample: 6, berufSample: 1, sportSample: 5, familieSample: 4, lieblingsessenSample: 3, nameSample: 2, alterSample: 3, landSample: 4, wohnortSample: 5, tagesablaufSample: 6, wochenendeSample: 1,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe ein Büro.“<br><strong>Wie viele Personen?</strong> „Zwei Personen, ein Mann und eine Frau.“<br><strong>Wo?</strong> „Sie stehen am Schreibtisch.“<br><strong>Was machen sie?</strong> „Sie sprechen über die Arbeit. Auf dem Tisch sind ein Computer und Papiere.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag, hier ist Frau Ali.“<br><strong>Wunsch / Frage:</strong> „Mein Kopf tut sehr weh. Ich brauche bitte einen Termin. Wann haben Sie Zeit?“<br><strong>Reaktion:</strong> „Ja, morgen um 10 Uhr passt mir gut.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiederhören!“" })
  }),
  practiceExam({
    id: "exam-3",
    title: "Übungssatz 3: Familie und Freizeit",
    theme: "Wochenende, Geburtstag, Schwimmbad, Hotel – gleicher Aufbau wie der Modellsatz.",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "classified", title: "Partyraum im Jugendzentrum", body: ["für Geburtstage", "bis 30 Personen", "Samstag frei"], foot: "Reservierung: Jugendzentrum Nord" },
              { n: 2, variant: "contact", title: "Fundbüro", sub: "Etwas verloren?", body: ["Handy, Schlüssel, Tasche", "Mo–Fr 9–17 Uhr", "Ausweis bitte mitbringen"], foot: "Rathausplatz 3" },
              { n: 3, variant: "logo", title: "Schwimmbad West", sub: "Sonntag Familientag", body: ["Familienkarte nur 12 Euro", "Kinder unter 6 Jahren frei"], foot: "Geöffnet 9–19 Uhr" },
              { n: 4, variant: "plain", title: "Gitarrenunterricht", body: ["für Anfängerinnen und Anfänger", "erste Stunde gratis", "auch am Abend möglich"], foot: "Musikschule Klang · Tel. 0676 55 44" },
              { n: 5, variant: "list", title: "Hotel Sonnblick", body: [{ label: "Zimmer:", text: "Doppelzimmer mit Frühstück" }, { label: "Lage:", text: "nahe am See" }], foot: "Check-in ab 14 Uhr" },
              { n: 6, variant: "plain", title: "Bäckerei sucht Hilfe", body: ["Montag bis Freitag", "15–19 Uhr", "Verkauf und Küche"], foot: "Bitte persönlich vorbeikommen" }
            ]
          },
          options: [
            "Partyraum im Jugendzentrum: für Geburtstage, bis 30 Personen, Samstag frei.",
            "Fundbüro: Handy gefunden? Mo–Fr 9–17 Uhr.",
            "Schwimmbad West: Familienkarte am Sonntag nur 12 Euro.",
            "Gitarrenunterricht für Anfänger, erste Stunde gratis.",
            "Hotel Sonnblick: Doppelzimmer mit Frühstück, nahe See.",
            "Bäckerei sucht Hilfe am Nachmittag, 15–19 Uhr."
          ],
          rows: [
            ["A", "Sie möchten am Sonntag mit der Familie schwimmen gehen.", 3],
            ["B", "Sie suchen einen Raum für eine Geburtstagsparty.", 1],
            ["C", "Sie haben Ihr Handy verloren.", 2],
            ["D", "Sie möchten Gitarre lernen.", 4],
            ["E", "Sie suchen ein Zimmer für zwei Personen am See.", 5]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Schwimmbad West:</strong> Kinder unter 6 Jahren zahlen keinen Eintritt. Familienkarte am Sonntag 12 Euro.<br><br>" +
            "<strong>2 · Hotel Sonnblick:</strong> Frühstück täglich 7–10 Uhr. Check-in ab 14 Uhr.<br><br>" +
            "<strong>3 · Jugendzentrum Nord:</strong> Partyraum für Geburtstage, Samstag frei. Bitte keine Musik nach 22 Uhr.",
          rows: [
            ["1", "Können kleine Kinder kostenlos hinein?", "ja"],
            ["2", "Kostet die Familienkarte am Sonntag 20 Euro?", "nein"],
            ["3", "Kann man um 8 Uhr frühstücken?", "ja"],
            ["4", "Ist Check-in ab 10 Uhr?", "nein"],
            ["5", "Ist der Partyraum am Samstag frei?", "ja"],
            ["6", "Darf man nach 22 Uhr laute Musik machen?", "nein"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", img: "assets/img/practice/exam-3/l3-1.jpg" },
              { label: "2", img: "assets/img/practice/exam-3/l3-2.jpg" },
              { label: "3", img: "assets/img/practice/exam-3/l3-3.jpg" },
              { label: "4", img: "assets/img/practice/exam-3/l3-4.jpg" },
              { label: "5", img: "assets/img/practice/exam-3/l3-5.jpg" },
              { label: "6", img: "assets/img/practice/exam-3/l3-6.jpg" }
            ]
          },
          options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
          rows: [
            ["A", "Ich habe mein Handy verloren. Vielleicht ist es dort.", 4],
            ["B", "Am Sonntag gehe ich mit meiner Familie schwimmen.", 1],
            ["C", "Ich brauche ein Zimmer für zwei Personen mit Frühstück.", 2],
            ["D", "Ich feiere meinen Geburtstag mit vielen Freunden.", 3],
            ["E", "Ich lerne Gitarre und habe heute Probe.", 5]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Bild? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Bild (A–F) die Textnummer (1–5) oder „Kein Text“ zu.",
          audio: "assets/audio/generated/exam-3-task-1.mp3",
          transcript:
            "Text 1: „Am Sonntag ist Familientag im Schwimmbad West. Die Familienkarte kostet nur zwölf Euro.“\n\n" +
            "Text 2: „Heute Abend zeigen wir im Kino den neuen Familienfilm. Beginn ist um achtzehn Uhr.“\n\n" +
            "Text 3: „Treffen wir uns um drei im Parkcafé? Dort können wir draußen sitzen und Kaffee trinken.“\n\n" +
            "Text 4: „Guten Tag, Ihr Doppelzimmer im Hotel Sonnblick ist fertig. Das Frühstück ist morgen ab sieben Uhr.“\n\n" +
            "Text 5: „Meine Geburtstagsparty beginnt am Samstag um siebzehn Uhr im Jugendzentrum. Bitte bring etwas zu trinken mit.“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", img: "assets/img/practice/exam-3/l1-D.jpg" },
              { label: "B", img: "assets/img/practice/exam-3/l1-A.jpg" },
              { label: "C", img: "assets/img/practice/exam-3/l1-E.jpg" },
              { label: "D", img: "assets/img/practice/exam-3/l1-C.jpg" },
              { label: "E", img: "assets/img/practice/exam-3/l1-B.jpg" },
              { label: "F", img: "assets/img/practice/exam-3/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Bild A", 4],
            ["B", "Bild B", 1],
            ["C", "Bild C", 5],
            ["D", "Bild D", 3],
            ["E", "Bild E", 2],
            ["F", "Bild F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht vom Hotel zwei Mal. Schreiben Sie die wichtigsten Informationen auf das Notizblatt.",
          audio: "assets/audio/generated/exam-3-task-2.mp3",
          transcript:
            "Guten Tag Frau Müller, hier ist das Hotel Sonnblick. Ihr Doppelzimmer ist ab Freitag, dem vierzehnten Juni, reserviert. Das Zimmer kostet achtzig Euro pro Nacht. Das Hotel ist in der Seestraße neun. Auf Wiederhören. (Sie hören den Text zwei Mal.)",
          rows: [
            ["p3l2a", "Was?", "Doppelzimmer", ["doppelzimmer", "zimmer"]],
            ["p3l2b", "Wann? (Tag)", "Freitag", ["freitag", "fr"]],
            ["p3l2c", "Datum", "14. Juni", ["14 juni", "14. juni", "14 6"]],
            ["p3l2d", "Preis", "80 Euro", ["80 euro", "80", "achtzig euro"]],
            ["p3l2e", "Wo?", "Seestraße 9", ["seestraße 9", "seestrasse 9", "seestraße"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören fünf kurze Interviews einmal. Wählen Sie pro Person eine Antwort.",
          prompt: "Worüber spricht die Person?",
          audio: "assets/audio/generated/exam-3-task-3.mp3",
          transcript:
            "Frage: Worüber sprechen Sie?\n\n" +
            "Text 1: „Am Samstag feiere ich meinen Geburtstag. Viele Freunde kommen ins Jugendzentrum.“\n\n" +
            "Text 2: „Wir fahren an den See und schlafen zwei Nächte im Hotel Sonnblick.“\n\n" +
            "Text 3: „Am Sonntag gehe ich mit den Kindern ins Schwimmbad. Die Familienkarte ist günstig.“\n\n" +
            "Text 4: „Ich lerne Gitarre. Heute Abend habe ich meine erste Stunde in der Musikschule.“\n\n" +
            "Text 5: „Für die Party brauche ich noch Getränke und einen Kuchen.“",
          columns: ["Party", "Hotel", "Schwimmen", "Musik"],
          rows: [
            ["Text 1", "Person 1", "party"],
            ["Text 2", "Person 2", "hotel"],
            ["Text 3", "Person 3", "schwimmen"],
            ["Text 4", "Person 4", "musik"],
            ["Text 5", "Person 5", "party"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie reservieren ein Hotelzimmer. Angaben: Julia Müller, Anreise 14.06., Abreise 16.06., zwei Personen, Doppelzimmer, Frühstück ja, Anreise mit Auto, Telefon +43 650 112233, Bezahlung bar.",
      fields: [
        ["Familienname", "Müller", ["müller", "mueller"]],
        ["Vorname", "Julia", ["julia"]],
        ["Anreise", "14.06.", ["14 06", "14.06", "14.6"]],
        ["Abreise", "16.06.", ["16 06", "16.06", "16.6"]],
        ["Personen", "2", ["2", "zwei"]],
        ["Zimmer", "Doppelzimmer", ["doppelzimmer", "doppel"]],
        ["Frühstück", "Ja", ["ja"]],
        ["Anreise mit", "Auto", ["auto", "mit dem auto"]],
        ["Telefon", "+43 650 112233", ["43 650 112233", "0650 112233"]],
        ["Bezahlung", "bar", ["bar"]]
      ],
      emailPrompt: "Sie laden einen Freund zu Ihrem Geburtstag ein. Schreiben Sie circa 30 Wörter: wann die Party ist, wo sie ist, was er mitbringen soll.",
      checklist: ["Anrede", "Tag und Uhrzeit", "Ort", "Bitte etwas mitbringen", "Gruß"],
      sample: "Lieber Ben,\nich feiere am Samstag um 17 Uhr Geburtstag. Die Party ist im Jugendzentrum Nord. Bitte bring etwas zu trinken mit. Hast du Zeit? Ich freue mich auf dich!\nViele Grüße\nJulia"
    }),
    speaking: practiceSpeaking([
      "Sie möchten ein Hotelzimmer reservieren. Fragen Sie nach Preis, Frühstück und Anreisezeit.",
      "Beschreiben Sie ein Bild: Eine Familie sitzt im Park und isst."
    ], { sprachenSample: 4, hobbysSample: 2, berufSample: 6, sportSample: 1, familieSample: 6, lieblingsessenSample: 5, nameSample: 3, alterSample: 4, landSample: 5, wohnortSample: 6, tagesablaufSample: 1, wochenendeSample: 2,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe einen Park.“<br><strong>Wie viele Personen?</strong> „Vier Personen, eine Familie mit zwei Kindern.“<br><strong>Wo?</strong> „Sie sitzen auf einer Decke unter einem Baum.“<br><strong>Was machen sie?</strong> „Sie essen zusammen ein Picknick. Das Wetter ist sonnig.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag!“<br><strong>Wunsch / Frage:</strong> „Ich möchte ein Doppelzimmer reservieren. Was kostet eine Nacht? Ist das Frühstück inklusive?“<br><strong>Reaktion:</strong> „Sehr gut. Ich komme am Freitag um 18 Uhr an.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiederhören!“" })
  }),
  practiceExam({
    id: "exam-4",
    title: "Übungssatz 4: Unterwegs und Einkaufen",
    theme: "Reise, Markt, Museum, Sprachschule – gleicher Aufbau wie der Modellsatz.",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "logo", title: "Reisebüro am Bahnhof", sub: "Tagesausflüge", body: ["Graz, Linz und Salzburg", "Beratung gratis", "Tickets sofort buchbar"], foot: "Mo–Fr 9–18 Uhr" },
              { n: 2, variant: "plain", title: "Museum der Stadt", body: ["Eintritt frei", "jeden Mittwoch ab 16 Uhr", "Fotografieren ohne Blitz erlaubt"], foot: "Altstadtplatz 2" },
              { n: 3, variant: "classified", title: "Wochenmarkt", body: ["frisches Gemüse", "Käse und Brot", "Samstag 7–13 Uhr"], foot: "Zahlung nur in bar" },
              { n: 4, variant: "contact", title: "Kleiderbörse", sub: "Alles günstig", body: ["Winterjacken und Schuhe", "nur Barzahlung", "viele Größen"], foot: "Marktgasse 10" },
              { n: 5, variant: "list", title: "Handyshop", body: [{ label: "Neu:", text: "SIM-Karte mit Internet" }, { label: "Beratung:", text: "Deutsch und Englisch" }], foot: "im Einkaufszentrum" },
              { n: 6, variant: "plain", title: "Notaufnahme Krankenhaus", body: ["täglich geöffnet", "24 Stunden", "bei akuten Notfällen"], foot: "Eingang B" }
            ]
          },
          options: [
            "Reisebüro am Bahnhof: Tagesausflüge nach Graz, Linz und Salzburg, Beratung gratis.",
            "Museum der Stadt: Eintritt frei jeden Mittwoch ab 16 Uhr.",
            "Wochenmarkt: frisches Gemüse, Käse und Brot, Samstag 7–13 Uhr.",
            "Kleiderbörse: Winterjacken und Schuhe günstig, nur Barzahlung.",
            "Handyshop: neue SIM-Karte, Beratung in Deutsch und Englisch.",
            "Notaufnahme Krankenhaus: täglich 24 Stunden geöffnet."
          ],
          rows: [
            ["A", "Sie möchten am Mittwoch kostenlos ins Museum.", 2],
            ["B", "Sie brauchen eine SIM-Karte für Ihr Handy.", 5],
            ["C", "Sie suchen frisches Gemüse am Samstag.", 3],
            ["D", "Sie möchten eine billige Winterjacke kaufen.", 4],
            ["E", "Sie planen einen Tagesausflug.", 1]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Museum der Stadt:</strong> Eintritt frei jeden Mittwoch ab 16 Uhr. Fotografieren ohne Blitz erlaubt.<br><br>" +
            "<strong>2 · Wochenmarkt:</strong> Frisches Gemüse, Käse und Brot, Samstag 7–13 Uhr. Zahlung nur in bar.<br><br>" +
            "<strong>3 · Sprachschule:</strong> Beratung heute 14–18 Uhr, Raum 2. Bitte Ausweis mitbringen.",
          rows: [
            ["1", "Bezahlt man am Mittwoch ab 16 Uhr keinen Eintritt?", "ja"],
            ["2", "Darf man mit Blitz fotografieren?", "nein"],
            ["3", "Ist der Markt am Samstagvormittag geöffnet?", "ja"],
            ["4", "Kann man am Markt mit Karte zahlen?", "nein"],
            ["5", "Ist die Beratung in Raum 2?", "ja"],
            ["6", "Muss man einen Ausweis mitbringen?", "ja"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", img: "assets/img/practice/exam-4/l3-1.jpg" },
              { label: "2", img: "assets/img/practice/exam-4/l3-2.jpg" },
              { label: "3", img: "assets/img/practice/exam-4/l3-3.jpg" },
              { label: "4", img: "assets/img/practice/exam-4/l3-4.jpg" },
              { label: "5", img: "assets/img/practice/exam-4/l3-5.jpg" },
              { label: "6", img: "assets/img/practice/exam-4/l3-6.jpg" }
            ]
          },
          options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
          rows: [
            ["A", "Ich brauche eine neue SIM-Karte und Internet.", 3],
            ["B", "Ich möchte frisches Gemüse kaufen und kann bar zahlen.", 2],
            ["C", "Ich möchte heute Bilder ansehen und keinen Eintritt zahlen.", 1],
            ["D", "Mein Zug nach Linz fährt um elf Uhr vierzig.", 4],
            ["E", "Ich suche eine billige Winterjacke.", 6]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Bild? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Bild (A–F) die Textnummer (1–5) oder „Kein Text“ zu.",
          audio: "assets/audio/generated/exam-4-task-1.mp3",
          transcript:
            "Text 1: „Heute ist Mittwoch. Im Museum der Stadt ist der Eintritt ab sechzehn Uhr frei. Fotografieren ohne Blitz ist erlaubt.“\n\n" +
            "Text 2: „Auf dem Wochenmarkt bekommen Sie heute frisches Gemüse, Käse und Brot. Bitte bezahlen Sie bar.“\n\n" +
            "Text 3: „Der Bus zur Tagesfahrt nach Graz fährt am Sonntag um acht Uhr ab. Bitte warten Sie an der Haltestelle vor dem Bahnhof.“\n\n" +
            "Text 4: „Guten Tag, ich brauche eine neue SIM-Karte mit Internet.“ – „Kein Problem, wir beraten Sie gern.“\n\n" +
            "Text 5: „Die Beratung in der Sprachschule ist heute von vierzehn bis achtzehn Uhr in Raum zwei. Bitte bringen Sie Ihren Ausweis mit.“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", img: "assets/img/practice/exam-4/l1-D.jpg" },
              { label: "B", img: "assets/img/practice/exam-4/l1-A.jpg" },
              { label: "C", img: "assets/img/practice/exam-4/l1-E.jpg" },
              { label: "D", img: "assets/img/practice/exam-4/l1-B.jpg" },
              { label: "E", img: "assets/img/practice/exam-4/l1-C.jpg" },
              { label: "F", img: "assets/img/practice/exam-4/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Bild A", 4],
            ["B", "Bild B", 1],
            ["C", "Bild C", 5],
            ["D", "Bild D", 2],
            ["E", "Bild E", 3],
            ["F", "Bild F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht zur Tagesfahrt zwei Mal. Schreiben Sie die wichtigsten Informationen auf das Notizblatt.",
          audio: "assets/audio/generated/exam-4-task-2.mp3",
          transcript:
            "Guten Tag, hier ist das Reisebüro am Bahnhof. Die Tagesfahrt nach Graz ist am Sonntag. Wir fahren um acht Uhr ab. Der Preis ist achtundzwanzig Euro. Bitte melden Sie sich bis Freitag an. Auf Wiederhören. (Sie hören den Text zwei Mal.)",
          rows: [
            ["p4l2a", "Was?", "Tagesfahrt", ["tagesfahrt", "fahrt", "ausflug"]],
            ["p4l2b", "Wohin?", "Graz", ["graz", "nach graz"]],
            ["p4l2c", "Wann? (Tag)", "Sonntag", ["sonntag", "so"]],
            ["p4l2d", "Uhrzeit", "8 Uhr", ["8 uhr", "8", "acht uhr", "08:00"]],
            ["p4l2e", "Preis", "28 Euro", ["28 euro", "28", "achtundzwanzig euro"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören fünf kurze Interviews einmal. Wählen Sie pro Person eine Antwort.",
          prompt: "Was plant die Person?",
          audio: "assets/audio/generated/exam-4-task-3.mp3",
          transcript:
            "Frage: Was planen Sie?\n\n" +
            "Text 1: „Ich gehe am Mittwoch ins Museum. Ab sechzehn Uhr kostet der Eintritt nichts.“\n\n" +
            "Text 2: „Am Samstag kaufe ich auf dem Markt Gemüse, Käse und Brot.“\n\n" +
            "Text 3: „Am Sonntag mache ich eine Tagesfahrt nach Graz. Der Bus fährt um acht Uhr ab.“\n\n" +
            "Text 4: „Ich brauche eine neue SIM-Karte mit Internet für mein Handy.“\n\n" +
            "Text 5: „Morgen fahre ich mit dem Zug nach Salzburg. Ich kaufe die Fahrkarte am Bahnhof.“",
          columns: ["Museum", "Markt", "Reise", "Handy"],
          rows: [
            ["Text 1", "Person 1", "museum"],
            ["Text 2", "Person 2", "markt"],
            ["Text 3", "Person 3", "reise"],
            ["Text 4", "Person 4", "handy"],
            ["Text 5", "Person 5", "reise"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie melden sich für eine Tagesfahrt an. Angaben: Samir Youssef, geboren am 03.02.1998, Mariahilfer Straße 22, 1060 Wien, Telefon +43 676 456789, samir.youssef@example.com, Ziel Graz, Datum 21.07., Abfahrt 8 Uhr, eine Person, Bezahlung bar.",
      fields: [
        ["Name", "Samir Youssef", ["samir youssef"]],
        ["Geburtsdatum", "03.02.1998", ["03 02 1998", "03.02.1998", "03021998"]],
        ["Adresse", "Mariahilfer Straße 22, 1060 Wien", ["mariahilfer straße 22 1060 wien", "mariahilfer strasse 22 1060 wien"]],
        ["Telefon", "+43 676 456789", ["43 676 456789", "0676 456789"]],
        ["E-Mail", "samir.youssef@example.com", ["samir.youssef@example.com"]],
        ["Ziel", "Graz", ["graz"]],
        ["Datum", "21.07.", ["21 07", "21.07", "21.7"]],
        ["Abfahrt", "8 Uhr", ["8 uhr", "8", "08:00", "acht uhr"]],
        ["Personen", "1", ["1", "eine", "eins"]],
        ["Bezahlung", "bar", ["bar"]]
      ],
      emailPrompt: "Sie können morgen nicht zum Deutschkurs kommen. Schreiben Sie circa 30 Wörter: warum nicht, wann Sie wieder kommen, und fragen Sie nach den Hausaufgaben.",
      checklist: ["Anrede", "Grund", "Rückkehr genannt", "Frage nach Hausaufgaben", "Gruß"],
      sample: "Sehr geehrte Frau Novak,\nleider kann ich morgen nicht zum Deutschkurs kommen. Ich habe einen Termin im Krankenhaus. Am Mittwoch bin ich wieder da. Können Sie mir bitte die Hausaufgaben schicken?\nViele Grüße\nSamir Youssef"
    }),
    speaking: practiceSpeaking([
      "Sie sind im Handyshop. Fragen Sie nach einer SIM-Karte, Internet und dem Preis.",
      "Beschreiben Sie ein Bild: Menschen kaufen auf einem Markt ein."
    ], { sprachenSample: 1, hobbysSample: 5, berufSample: 2, sportSample: 4, familieSample: 3, lieblingsessenSample: 2, nameSample: 4, alterSample: 5, landSample: 6, wohnortSample: 1, tagesablaufSample: 2, wochenendeSample: 3,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe einen Markt im Freien.“<br><strong>Wie viele Personen?</strong> „Viele Personen, ungefähr zehn.“<br><strong>Wo?</strong> „Sie sind zwischen den Marktständen.“<br><strong>Was machen sie?</strong> „Sie kaufen Obst und Gemüse. Eine Frau verkauft Tomaten, ein Mann bezahlt mit Geld.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag!“<br><strong>Wunsch / Frage:</strong> „Ich brauche eine SIM-Karte. Wie viel Internet bekomme ich pro Monat? Was kostet das?“<br><strong>Reaktion:</strong> „Okay, das ist günstig. Ich nehme die Karte mit zehn Gigabyte.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiedersehen!“" })
  }),
  practiceExam({
    id: "exam-5",
    title: "Übungssatz 5: Post, Bank und Erledigungen",
    theme: "Post, Bank, Wäsche, Bibliothek und kleine Wege in der Stadt.",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "contact", title: "Post am Markt", sub: "Briefe und Pakete", body: ["Paket abholen", "Briefmarken kaufen", "Mo–Fr 8–18 Uhr"], foot: "Ausweis bitte mitbringen" },
              { n: 2, variant: "logo", title: "Bank Nord", sub: "Konto & Beratung", body: ["Beratung ohne Termin", "Geldautomat rund um die Uhr"], foot: "Hauptstraße 18" },
              { n: 3, variant: "plain", title: "Waschsalon Blitz", body: ["Waschen und Trocknen", "täglich 7–22 Uhr", "Münzen am Automaten"], foot: "Bahnhofstraße 4" },
              { n: 4, variant: "classified", title: "Bäckerei Früh", body: ["frisches Brot ab 6 Uhr", "Kaffee zum Mitnehmen", "Sonntag geschlossen"], foot: "Kirchengasse 2" },
              { n: 5, variant: "list", title: "Stadtbibliothek", body: [{ label: "Bücher:", text: "gratis ausleihen" }, { label: "Internet:", text: "30 Minuten kostenlos" }], foot: "Mo–Sa geöffnet" },
              { n: 6, variant: "logo", title: "Schuhservice", sub: "Reparatur schnell", body: ["Absätze und Sohlen", "auch Schlüsselservice"], foot: "Abholung am nächsten Tag" }
            ]
          },
          options: [
            "Post am Markt: Briefe, Pakete und Briefmarken, Mo–Fr 8–18 Uhr.",
            "Bank Nord: Konto und Beratung, Geldautomat rund um die Uhr.",
            "Waschsalon Blitz: waschen und trocknen, täglich 7–22 Uhr.",
            "Bäckerei Früh: frisches Brot ab 6 Uhr, Kaffee zum Mitnehmen.",
            "Stadtbibliothek: Bücher ausleihen und kostenloses Internet.",
            "Schuhservice: Schuhe und Schlüssel, Abholung am nächsten Tag."
          ],
          rows: [
            ["A", "Sie brauchen am Morgen frisches Brot.", 4],
            ["B", "Sie müssen ein Paket abholen.", 1],
            ["C", "Sie möchten ein Buch ausleihen.", 5],
            ["D", "Ihre Waschmaschine ist kaputt.", 3],
            ["E", "Sie möchten ein Konto eröffnen.", 2]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Post am Markt:</strong> Paketabholung nur mit Ausweis. Samstag geschlossen.<br><br>" +
            "<strong>2 · Bank Nord:</strong> Geldautomat 24 Stunden geöffnet. Beratung Mo–Fr 9–16 Uhr.<br><br>" +
            "<strong>3 · Waschsalon Blitz:</strong> Täglich 7–22 Uhr. Waschmittel bekommen Sie am Automaten.",
          rows: [
            ["1", "Kann man ein Paket ohne Ausweis abholen?", "nein"],
            ["2", "Ist die Post am Samstag geöffnet?", "nein"],
            ["3", "Kann man nachts Geld abheben?", "ja"],
            ["4", "Gibt es Bankberatung am Sonntag?", "nein"],
            ["5", "Ist der Waschsalon jeden Tag geöffnet?", "ja"],
            ["6", "Muss man Waschmittel selbst von zu Hause mitbringen?", "nein"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", img: "assets/img/practice/exam-5/l3-1.jpg" },
              { label: "2", img: "assets/img/practice/exam-5/l3-2.jpg" },
              { label: "3", img: "assets/img/practice/exam-5/l3-3.jpg" },
              { label: "4", img: "assets/img/practice/exam-5/l3-4.jpg" },
              { label: "5", img: "assets/img/practice/exam-5/l3-5.jpg" },
              { label: "6", img: "assets/img/practice/exam-5/l3-6.jpg" }
            ]
          },
          options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
          rows: [
            ["A", "Ich muss heute meine Wäsche waschen.", 3],
            ["B", "Ich hole ein Paket bei der Post ab.", 1],
            ["C", "Ich brauche Geld vom Automaten.", 2],
            ["D", "Ich kaufe Brot und Kaffee.", 4],
            ["E", "Ich lese ein Buch und benutze den Computer.", 5]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Bild? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Bild (A–F) die Textnummer (1–5) oder „Kein Text“ zu.",
          audio: "assets/audio/generated/exam-5-task-1.mp3",
          transcript:
            "Text 1: „Guten Tag, ich möchte dieses Paket abholen. Hier ist mein Ausweis.“ – „Danke, einen Moment bitte.“\n\n" +
            "Text 2: „Der Geldautomat ist leider kaputt. Bitte gehen Sie in die Bank, dort hilft Ihnen eine Mitarbeiterin.“\n\n" +
            "Text 3: „Die Waschmaschine Nummer vier ist frei. Waschmittel bekommen Sie vorne am Automaten.“\n\n" +
            "Text 4: „Guten Morgen! Ich hätte gern zwei Brötchen und einen Kaffee zum Mitnehmen.“\n\n" +
            "Text 5: „Ihr Bibliotheksausweis ist fertig. Sie können heute drei Bücher mitnehmen.“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", img: "assets/img/practice/exam-5/l1-D.jpg" },
              { label: "B", img: "assets/img/practice/exam-5/l1-A.jpg" },
              { label: "C", img: "assets/img/practice/exam-5/l1-E.jpg" },
              { label: "D", img: "assets/img/practice/exam-5/l1-B.jpg" },
              { label: "E", img: "assets/img/practice/exam-5/l1-C.jpg" },
              { label: "F", img: "assets/img/practice/exam-5/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Bild A", 4],
            ["B", "Bild B", 1],
            ["C", "Bild C", 5],
            ["D", "Bild D", 2],
            ["E", "Bild E", 3],
            ["F", "Bild F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht von der Bank zwei Mal. Schreiben Sie die wichtigsten Informationen auf das Notizblatt.",
          audio: "assets/audio/generated/exam-5-task-2.mp3",
          transcript:
            "Guten Tag, hier ist die Bank Nord. Ihr Beratungstermin ist am Donnerstag, dem zehnten Juli, um fünfzehn Uhr dreißig. Die Bank ist in der Hauptstraße achtzehn. Bitte bringen Sie Ihren Pass mit. Unsere Telefonnummer ist null drei eins sechs, vier vier fünf fünf sechs sechs. Auf Wiederhören. (Sie hören den Text zwei Mal.)",
          rows: [
            ["p5l2a", "Was?", "Beratungstermin", ["beratungstermin", "termin", "banktermin"]],
            ["p5l2b", "Wann? (Tag)", "Donnerstag", ["donnerstag", "do"]],
            ["p5l2c", "Datum und Uhrzeit", "10. Juli, 15:30 Uhr", ["10 juli 1530 uhr", "10 juli 15 30 uhr", "10. juli 15:30", "10 juli halb vier"]],
            ["p5l2d", "Wo?", "Hauptstraße 18", ["hauptstraße 18", "hauptstrasse 18", "hauptstraße"]],
            ["p5l2e", "Telefonnummer", "0316 445566", ["0316 445566", "0316445566", "445566"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören fünf kurze Interviews einmal. Wählen Sie pro Person eine Antwort.",
          prompt: "Wohin geht die Person?",
          audio: "assets/audio/generated/exam-5-task-3.mp3",
          transcript:
            "Frage: Wohin gehen Sie heute?\n\n" +
            "Text 1: „Ich brauche Geld und meine Karte funktioniert nicht. Ich gehe zur Bank.“\n\n" +
            "Text 2: „Ich muss einen Brief nach Deutschland schicken. Ich gehe zur Post.“\n\n" +
            "Text 3: „Ich kaufe Brot für das Frühstück. Die Bäckerei ist gleich um die Ecke.“\n\n" +
            "Text 4: „Ich möchte ein Buch für meine Tochter ausleihen. Wir gehen in die Bibliothek.“\n\n" +
            "Text 5: „Ich habe morgen einen Termin für ein neues Konto bei der Bank.“",
          columns: ["Bank", "Post", "Bibliothek", "Bäckerei"],
          rows: [
            ["Text 1", "Person 1", "bank"],
            ["Text 2", "Person 2", "post"],
            ["Text 3", "Person 3", "bäckerei"],
            ["Text 4", "Person 4", "bibliothek"],
            ["Text 5", "Person 5", "bank"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie eröffnen ein Konto. Angaben: Nadia Karim, geboren am 19.04.1996, Postgasse 7, 4020 Linz, Telefon +43 664 778899, nadia.karim@example.com, Beruf Verkäuferin, Kontoart Girokonto, Karte ja, Termin Donnerstag 10.07.",
      fields: [
        ["Name", "Nadia Karim", ["nadia karim"]],
        ["Geburtsdatum", "19.04.1996", ["19 04 1996", "19.04.1996", "19041996"]],
        ["Adresse", "Postgasse 7, 4020 Linz", ["postgasse 7 4020 linz"]],
        ["Telefon", "+43 664 778899", ["43 664 778899", "0664 778899"]],
        ["E-Mail", "nadia.karim@example.com", ["nadia.karim@example.com"]],
        ["Beruf", "Verkäuferin", ["verkäuferin", "verkaeuferin"]],
        ["Kontoart", "Girokonto", ["girokonto"]],
        ["Karte", "Ja", ["ja"]],
        ["Termin", "Donnerstag", ["donnerstag", "do"]],
        ["Datum", "10.07.", ["10 07", "10.07", "10.7"]]
      ],
      emailPrompt: "Sie möchten Ihrer Freundin schreiben, dass Sie am Samstag in die Stadt gehen. Schreiben Sie circa 30 Wörter: wohin Sie gehen, wann Sie Zeit haben, und fragen Sie, ob sie mitkommen möchte.",
      checklist: ["Anrede", "Ort genannt", "Tag/Uhrzeit genannt", "Frage", "Gruß"],
      sample: "Liebe Sara,\nam Samstag gehe ich in die Stadt. Ich muss zur Post und zur Bank. Um 10 Uhr habe ich Zeit. Möchtest du mitkommen? Danach können wir Kaffee trinken.\nLiebe Grüße\nNadia"
    }),
    speaking: practiceSpeaking([
      "Sie sind bei der Post. Fragen Sie nach einem Paket, dem Preis und den Öffnungszeiten.",
      "Beschreiben Sie ein Bild: Eine Person steht am Bankschalter."
    ], { sprachenSample: 6, hobbysSample: 1, berufSample: 5, sportSample: 3, familieSample: 2, lieblingsessenSample: 4, nameSample: 5, alterSample: 6, landSample: 1, wohnortSample: 2, tagesablaufSample: 3, wochenendeSample: 4,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe eine Bank.“<br><strong>Wie viele Personen?</strong> „Eine Person, ein Mann.“<br><strong>Wo?</strong> „Er steht am Bankschalter.“<br><strong>Was machen sie?</strong> „Er spricht mit der Bankangestellten und hat seine Karte in der Hand.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag!“<br><strong>Wunsch / Frage:</strong> „Ich möchte dieses Paket nach Italien schicken. Was kostet das? Wann hat die Post am Samstag offen?“<br><strong>Reaktion:</strong> „Aha, gut. Dann komme ich am Samstag um zehn Uhr.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiedersehen!“" })
  }),
  practiceExam({
    id: "exam-6",
    title: "Übungssatz 6: Gesundheit und Wohnen",
    theme: "Arzt, Apotheke, Wohnung, Reparatur und Sport im Alltag.",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "contact", title: "Zahnarzt Dr. Berger", sub: "Termine auch früh", body: ["Mo–Fr ab 7 Uhr", "Notfälle bitte anrufen"], foot: "Tel. 01 / 7788" },
              { n: 2, variant: "classified", title: "Wohnung gesucht?", body: ["1-Zimmer-Wohnung", "ab September", "Nähe Straßenbahn"], foot: "Besichtigung Montag" },
              { n: 3, variant: "plain", title: "Installateur Schnell", body: ["Wasserhahn kaputt?", "Bad und Küche", "24-Stunden-Notdienst"], foot: "Tel. 0676 900 800" },
              { n: 4, variant: "logo", title: "Apotheke im Zentrum", sub: "Nachtdienst heute", body: ["Medikamente und Beratung", "bis 22 Uhr geöffnet"], foot: "Ringstraße 5" },
              { n: 5, variant: "list", title: "Möbeltransporte", body: [{ label: "Service:", text: "tragen und fahren" }, { label: "Preis:", text: "ab 35 Euro pro Stunde" }], foot: "Auch am Samstag" },
              { n: 6, variant: "logo", title: "Yoga am Abend", body: ["Anfänger willkommen", "Dienstag 19 Uhr", "erste Stunde gratis"], foot: "Gesundheitszentrum Süd" }
            ]
          },
          options: [
            "Zahnarzt Dr. Berger: Termine ab 7 Uhr, Notfälle telefonisch.",
            "1-Zimmer-Wohnung ab September, Nähe Straßenbahn.",
            "Installateur Schnell: Wasserhahn, Bad, Küche, Notdienst.",
            "Apotheke im Zentrum: Nachtdienst, bis 22 Uhr geöffnet.",
            "Möbeltransporte: tragen und fahren, auch am Samstag.",
            "Yoga am Abend: Anfänger, Dienstag 19 Uhr."
          ],
          rows: [
            ["A", "Sie suchen eine kleine Wohnung.", 2],
            ["B", "Sie möchten einen ruhigen Sportkurs beginnen.", 6],
            ["C", "In Ihrer Küche ist der Wasserhahn kaputt.", 3],
            ["D", "Sie haben Zahnschmerzen und brauchen einen frühen Termin.", 1],
            ["E", "Sie brauchen am Abend ein Medikament.", 4]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Zahnarzt Dr. Berger:</strong> Termine Mo–Fr ab 7 Uhr. Bitte Versicherungskarte mitbringen.<br><br>" +
            "<strong>2 · Wohnung:</strong> 1 Zimmer, ab September, Besichtigung Montag um 17 Uhr.<br><br>" +
            "<strong>3 · Apotheke im Zentrum:</strong> Heute Nachtdienst bis 22 Uhr. Beratung kostenlos.",
          rows: [
            ["1", "Kann man vor 8 Uhr zum Zahnarzt gehen?", "ja"],
            ["2", "Muss man eine Versicherungskarte mitbringen?", "ja"],
            ["3", "Ist die Wohnung ab Juli frei?", "nein"],
            ["4", "Kann man die Wohnung am Montag sehen?", "ja"],
            ["5", "Ist die Apotheke heute bis 22 Uhr offen?", "ja"],
            ["6", "Kostet die Beratung in der Apotheke Geld?", "nein"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", img: "assets/img/practice/exam-6/l3-1.jpg" },
              { label: "2", img: "assets/img/practice/exam-6/l3-2.jpg" },
              { label: "3", img: "assets/img/practice/exam-6/l3-3.jpg" },
              { label: "4", img: "assets/img/practice/exam-6/l3-4.jpg" },
              { label: "5", img: "assets/img/practice/exam-6/l3-5.jpg" },
              { label: "6", img: "assets/img/practice/exam-6/l3-6.jpg" }
            ]
          },
          options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
          rows: [
            ["A", "Heute Abend mache ich Yoga.", 6],
            ["B", "Ich muss zum Zahnarzt, mein Zahn tut weh.", 1],
            ["C", "Der Wasserhahn in der Küche ist kaputt.", 3],
            ["D", "Ich brauche ein Medikament aus der Apotheke.", 4],
            ["E", "Wir sehen am Montag eine neue Wohnung an.", 2]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Bild? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Bild (A–F) die Textnummer (1–5) oder „Kein Text“ zu.",
          audio: "assets/audio/generated/exam-6-task-1.mp3",
          transcript:
            "Text 1: „Praxis Dr. Berger, guten Morgen. Ihr Zahnarzttermin ist morgen um sieben Uhr dreißig.“\n\n" +
            "Text 2: „Die Wohnungsbesichtigung ist am Montag um siebzehn Uhr. Bitte warten Sie vor dem Haus.“\n\n" +
            "Text 3: „Nehmen Sie diese Tropfen bitte dreimal täglich nach dem Essen.“\n\n" +
            "Text 4: „Der Installateur kommt heute zwischen zwölf und vierzehn Uhr. Der Wasserhahn wird repariert.“\n\n" +
            "Text 5: „Der Yogakurs beginnt heute um neunzehn Uhr. Bitte bringen Sie bequeme Kleidung mit.“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", img: "assets/img/practice/exam-6/l1-D.jpg" },
              { label: "B", img: "assets/img/practice/exam-6/l1-A.jpg" },
              { label: "C", img: "assets/img/practice/exam-6/l1-E.jpg" },
              { label: "D", img: "assets/img/practice/exam-6/l1-C.jpg" },
              { label: "E", img: "assets/img/practice/exam-6/l1-B.jpg" },
              { label: "F", img: "assets/img/practice/exam-6/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Bild A", 4],
            ["B", "Bild B", 1],
            ["C", "Bild C", 5],
            ["D", "Bild D", 3],
            ["E", "Bild E", 2],
            ["F", "Bild F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht zur Wohnungsbesichtigung zwei Mal. Schreiben Sie die wichtigsten Informationen auf das Notizblatt.",
          audio: "assets/audio/generated/exam-6-task-2.mp3",
          transcript:
            "Guten Tag, hier ist Frau Steiner. Sie möchten die Wohnung ansehen. Die Besichtigung ist am Montag, dem dritten August, um siebzehn Uhr. Die Wohnung ist im Gartenweg vier. Bitte rufen Sie mich an, wenn Sie später kommen. Meine Nummer ist null sechs sieben sieben, acht acht neun neun null null. Auf Wiederhören. (Sie hören den Text zwei Mal.)",
          rows: [
            ["p6l2a", "Was?", "Wohnungsbesichtigung", ["wohnungsbesichtigung", "besichtigung", "wohnung ansehen"]],
            ["p6l2b", "Wann? (Tag)", "Montag", ["montag", "mo"]],
            ["p6l2c", "Datum und Uhrzeit", "3. August, 17 Uhr", ["3 august 17 uhr", "3. august 17 uhr", "3 august 17", "3 8 17 uhr"]],
            ["p6l2d", "Wo?", "Gartenweg 4", ["gartenweg 4", "gartenweg"]],
            ["p6l2e", "Telefonnummer", "0677 889900", ["0677 889900", "0677889900", "889900"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören fünf kurze Interviews einmal. Wählen Sie pro Person eine Antwort.",
          prompt: "Was braucht die Person?",
          audio: "assets/audio/generated/exam-6-task-3.mp3",
          transcript:
            "Frage: Was brauchen Sie heute?\n\n" +
            "Text 1: „Mein Zahn tut sehr weh. Ich brauche einen Termin beim Zahnarzt.“\n\n" +
            "Text 2: „Ich suche seit Wochen eine kleine Wohnung in der Nähe der Straßenbahn.“\n\n" +
            "Text 3: „Ich habe Husten und brauche ein Medikament aus der Apotheke.“\n\n" +
            "Text 4: „Ich suche eine günstige Wohnung in der Nähe von der Straßenbahn.“\n\n" +
            "Text 5: „In meiner Küche ist Wasser auf dem Boden. Ich brauche einen Installateur.“",
          columns: ["Arzt", "Wohnung", "Apotheke", "Reparatur"],
          rows: [
            ["Text 1", "Person 1", "arzt"],
            ["Text 2", "Person 2", "wohnung"],
            ["Text 3", "Person 3", "apotheke"],
            ["Text 4", "Person 4", "wohnung"],
            ["Text 5", "Person 5", "reparatur"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie melden sich für eine Wohnungsbesichtigung an. Angaben: Bilal Aydin, geboren am 02.12.1994, Neubaugasse 30, 1070 Wien, Telefon +43 650 334455, bilal.aydin@example.com, Wohnung 1 Zimmer, Termin Montag 03.08., Uhrzeit 17 Uhr, Personen 1.",
      fields: [
        ["Name", "Bilal Aydin", ["bilal aydin"]],
        ["Geburtsdatum", "02.12.1994", ["02 12 1994", "02.12.1994", "02121994"]],
        ["Adresse", "Neubaugasse 30, 1070 Wien", ["neubaugasse 30 1070 wien"]],
        ["Telefon", "+43 650 334455", ["43 650 334455", "0650 334455"]],
        ["E-Mail", "bilal.aydin@example.com", ["bilal.aydin@example.com"]],
        ["Wohnung", "1 Zimmer", ["1 zimmer", "ein zimmer"]],
        ["Termin", "Montag", ["montag", "mo"]],
        ["Datum", "03.08.", ["03 08", "03.08", "3.8"]],
        ["Uhrzeit", "17 Uhr", ["17 uhr", "17", "17:00"]],
        ["Personen", "1", ["1", "eine person"]]
      ],
      emailPrompt: "Sie möchten Ihre Mitgliedschaft im Sportstudio ändern. Schreiben Sie einen Brief von mindestens 30 Wörtern an das Studio: erklären Sie, warum Sie schreiben, was Sie ändern möchten, ab wann, und bitten Sie um eine schriftliche Bestätigung.",
      checklist: ["Formelle Anrede", "Grund / Anliegen", "Änderung beschrieben", "Bitte um Bestätigung", "Formeller Gruß + Name"],
      sample: "Sehr geehrte Damen und Herren,\nich möchte meine Mitgliedschaft ändern. Ab dem 1. März möchte ich das kleine Paket. Ich habe wenig Zeit für Sport. Bitte schicken Sie mir eine Bestätigung.\nMit freundlichen Grüßen\nBilal Aydin",
      textTitle: "Aufgabe 2: Brief"
    }),
    speaking: practiceSpeaking([
      "Sie rufen beim Installateur an. Sagen Sie, was kaputt ist, und fragen Sie nach einem Termin.",
      "Beschreiben Sie ein Bild: Eine Person ist in der Apotheke."
    ], { sprachenSample: 3, hobbysSample: 4, berufSample: 3, sportSample: 6, familieSample: 5, lieblingsessenSample: 1, nameSample: 6, alterSample: 1, landSample: 2, wohnortSample: 3, tagesablaufSample: 4, wochenendeSample: 5,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe eine Apotheke.“<br><strong>Wie viele Personen?</strong> „Eine Person, eine Frau.“<br><strong>Wo?</strong> „Sie steht am Apothekenschalter.“<br><strong>Was machen sie?</strong> „Sie kauft Medikamente. Die Apothekerin gibt ihr eine Packung.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag, hier ist Herr Becker.“<br><strong>Wunsch / Frage:</strong> „Meine Dusche ist kaputt. Das Wasser ist immer kalt. Können Sie bitte kommen? Wann haben Sie Zeit?“<br><strong>Reaktion:</strong> „Morgen am Vormittag passt mir sehr gut.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiederhören!“" })
  }),
  practiceExam({
    id: "exam-7",
    title: "Übungssatz 7: Lernen und Arbeit",
    theme: "Kurs, Büro, Bewerbung, Kopieren und Kinderbetreuung.",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "classified", title: "Bürohilfe gesucht", body: ["20 Stunden pro Woche", "Telefon und E-Mail", "Deutsch A1/A2"], foot: "Bewerbung an office@firma.at" },
              { n: 2, variant: "logo", title: "Computerkurs", sub: "für Anfänger", body: ["Dienstag 18 Uhr", "Word und E-Mail", "kleine Gruppe"], foot: "VHS Raum 4" },
              { n: 3, variant: "contact", title: "Kindergarten Sonnenhaus", body: ["Plätze ab September", "Mo–Fr 7–17 Uhr", "Anmeldung im Büro"], foot: "Tel. 0316 / 778899" },
              { n: 4, variant: "plain", title: "Copyshop City", body: ["kopieren und drucken", "Bewerbungsfotos", "Mo–Sa geöffnet"], foot: "Studentenrabatt" },
              { n: 5, variant: "list", title: "Kantine Plus", body: [{ label: "Mittag:", text: "Suppe und Menü" }, { label: "Preis:", text: "ab 6 Euro" }], foot: "11–14 Uhr" },
              { n: 6, variant: "logo", title: "Sprach-Tandem", body: ["Deutsch sprechen üben", "jeden Freitag", "kostenlos"], foot: "Treffpunkt Bibliothek" }
            ]
          },
          options: [
            "Bürohilfe gesucht: 20 Stunden, Telefon und E-Mail.",
            "Computerkurs für Anfänger, Dienstag 18 Uhr, VHS Raum 4.",
            "Kindergarten Sonnenhaus: Plätze ab September, Mo–Fr.",
            "Copyshop City: kopieren, drucken und Bewerbungsfotos.",
            "Kantine Plus: Mittagessen 11–14 Uhr.",
            "Sprach-Tandem: Deutsch sprechen, Freitag, kostenlos."
          ],
          rows: [
            ["A", "Sie suchen einen Kindergartenplatz.", 3],
            ["B", "Sie müssen Dokumente kopieren.", 4],
            ["C", "Sie suchen eine Arbeit im Büro.", 1],
            ["D", "Sie möchten kostenlos Deutsch sprechen üben.", 6],
            ["E", "Sie möchten E-Mails am Computer schreiben lernen.", 2]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Bürohilfe:</strong> 20 Stunden pro Woche. Bewerbung bitte per E-Mail.<br><br>" +
            "<strong>2 · Computerkurs:</strong> Beginn Dienstag 18 Uhr, Raum 4. Der Kurs kostet 35 Euro.<br><br>" +
            "<strong>3 · Copyshop City:</strong> Mo–Sa geöffnet. Bewerbungsfotos sofort zum Mitnehmen.",
          rows: [
            ["1", "Ist die Arbeit Vollzeit?", "nein"],
            ["2", "Soll man die Bewerbung per E-Mail schicken?", "ja"],
            ["3", "Beginnt der Computerkurs am Dienstag?", "ja"],
            ["4", "Ist der Kurs kostenlos?", "nein"],
            ["5", "Ist der Copyshop am Samstag geöffnet?", "ja"],
            ["6", "Muss man auf Bewerbungsfotos eine Woche warten?", "nein"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", img: "assets/img/practice/exam-7/l3-1.jpg" },
              { label: "2", img: "assets/img/practice/exam-7/l3-2.jpg" },
              { label: "3", img: "assets/img/practice/exam-7/l3-3.jpg" },
              { label: "4", img: "assets/img/practice/exam-7/l3-4.jpg" },
              { label: "5", img: "assets/img/practice/exam-7/l3-5.jpg" },
              { label: "6", img: "assets/img/practice/exam-7/l3-6.jpg" }
            ]
          },
          options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
          rows: [
            ["A", "Ich schreibe meine Bewerbung am Computer.", 2],
            ["B", "Meine Tochter geht ab September in den Kindergarten.", 3],
            ["C", "Ich mache Kopien für die Arbeit.", 4],
            ["D", "Heute esse ich in der Kantine.", 5],
            ["E", "Ich habe morgen ein Gespräch im Büro.", 1]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Bild? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Bild (A–F) die Textnummer (1–5) oder „Kein Text“ zu.",
          audio: "assets/audio/generated/exam-7-task-1.mp3",
          transcript:
            "Text 1: „Ihr Bewerbungsgespräch ist morgen um neun Uhr im Büro. Bitte bringen Sie Ihren Lebenslauf mit.“\n\n" +
            "Text 2: „Der Computerkurs beginnt heute in Raum vier. Wir lernen E-Mail und Word.“\n\n" +
            "Text 3: „Im Kindergarten Sonnenhaus gibt es ab September noch zwei freie Plätze.“\n\n" +
            "Text 4: „Kopieren Sie die Unterlagen bitte zweimal und legen Sie sie auf meinen Tisch.“\n\n" +
            "Text 5: „In der Kantine gibt es heute Reis mit Gemüse und eine Suppe.“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", img: "assets/img/practice/exam-7/l1-D.jpg" },
              { label: "B", img: "assets/img/practice/exam-7/l1-A.jpg" },
              { label: "C", img: "assets/img/practice/exam-7/l1-E.jpg" },
              { label: "D", img: "assets/img/practice/exam-7/l1-B.jpg" },
              { label: "E", img: "assets/img/practice/exam-7/l1-C.jpg" },
              { label: "F", img: "assets/img/practice/exam-7/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Bild A", 4],
            ["B", "Bild B", 1],
            ["C", "Bild C", 5],
            ["D", "Bild D", 2],
            ["E", "Bild E", 3],
            ["F", "Bild F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht von der VHS zwei Mal. Schreiben Sie die wichtigsten Informationen auf das Notizblatt.",
          audio: "assets/audio/generated/exam-7-task-2.mp3",
          transcript:
            "Guten Tag, hier ist die VHS Mitte. Ihr Computerkurs beginnt am Dienstag, dem neunten September, um achtzehn Uhr. Der Kurs ist in Raum vier und kostet fünfunddreißig Euro. Bitte bringen Sie einen Laptop mit. Unsere Telefonnummer ist null eins, drei drei vier vier fünf fünf. Auf Wiederhören. (Sie hören den Text zwei Mal.)",
          rows: [
            ["p7l2a", "Was?", "Computerkurs", ["computerkurs", "kurs"]],
            ["p7l2b", "Wann? (Tag)", "Dienstag", ["dienstag", "di"]],
            ["p7l2c", "Datum und Uhrzeit", "9. September, 18 Uhr", ["9 september 18 uhr", "9. september 18 uhr", "9 september 18", "9 9 18 uhr"]],
            ["p7l2d", "Raum", "Raum 4", ["raum 4", "4"]],
            ["p7l2e", "Preis", "35 Euro", ["35 euro", "35", "fünfunddreißig euro"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören fünf kurze Interviews einmal. Wählen Sie pro Person eine Antwort.",
          prompt: "Worum geht es?",
          audio: "assets/audio/generated/exam-7-task-3.mp3",
          transcript:
            "Frage: Worum geht es bei Ihnen heute?\n\n" +
            "Text 1: „Ich habe morgen ein Bewerbungsgespräch und muss meinen Lebenslauf ausdrucken.“\n\n" +
            "Text 2: „Ich lerne heute Abend am Computer. Der Kurs ist für Anfänger.“\n\n" +
            "Text 3: „Ich bringe mein Kind jeden Morgen um sieben in den Kindergarten.“\n\n" +
            "Text 4: „Ich brauche zehn Kopien von diesem Formular.“\n\n" +
            "Text 5: „Ich suche eine Arbeit im Büro, am liebsten vormittags.“",
          columns: ["Arbeit", "Kurs", "Kinder", "Kopieren"],
          rows: [
            ["Text 1", "Person 1", "arbeit"],
            ["Text 2", "Person 2", "kurs"],
            ["Text 3", "Person 3", "kinder"],
            ["Text 4", "Person 4", "kopieren"],
            ["Text 5", "Person 5", "arbeit"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie melden sich für einen Computerkurs an. Angaben: Maria Lopez, geboren am 15.09.1999, Schulgasse 12, 8010 Graz, Telefon +43 699 123987, maria.lopez@example.com, Kurs Computer Anfänger, Dienstag 18 Uhr, Raum 4, Bezahlung bar.",
      fields: [
        ["Name", "Maria Lopez", ["maria lopez"]],
        ["Geburtsdatum", "15.09.1999", ["15 09 1999", "15.09.1999", "15091999"]],
        ["Adresse", "Schulgasse 12, 8010 Graz", ["schulgasse 12 8010 graz"]],
        ["Telefon", "+43 699 123987", ["43 699 123987", "0699 123987"]],
        ["E-Mail", "maria.lopez@example.com", ["maria.lopez@example.com"]],
        ["Kurs", "Computer Anfänger", ["computer anfänger", "computer anfaenger", "computerkurs"]],
        ["Wochentag", "Dienstag", ["dienstag", "di"]],
        ["Uhrzeit", "18 Uhr", ["18 uhr", "18", "18:00"]],
        ["Raum", "Raum 4", ["raum 4", "4"]],
        ["Bezahlung", "bar", ["bar"]]
      ],
      emailPrompt: "Sie bewerben sich für eine Stelle als Bürokraft. Schreiben Sie einen Brief von mindestens 30 Wörtern: stellen Sie sich kurz vor, sagen Sie, wann Sie arbeiten können, warum Sie sich bewerben, und fragen Sie nach einem Vorstellungstermin.",
      checklist: ["Formelle Anrede", "Person vorgestellt", "Arbeitszeit genannt", "Frage nach Vorstellungstermin", "Formeller Gruß + Name"],
      sample: "Sehr geehrte Damen und Herren,\nich heiße Maria Lopez. Ich bewerbe mich für die Stelle als Bürokraft. Ich kann ab Montag am Vormittag arbeiten. Haben Sie einen Termin für ein Gespräch?\nMit freundlichen Grüßen\nMaria Lopez",
      textTitle: "Aufgabe 2: Brief"
    }),
    speaking: practiceSpeaking([
      "Sie möchten sich für einen Computerkurs anmelden. Fragen Sie nach Zeit, Preis und Raum.",
      "Beschreiben Sie ein Bild: Personen sitzen in einem Kursraum."
    ], { sprachenSample: 6, hobbysSample: 2, berufSample: 1, sportSample: 5, familieSample: 3, lieblingsessenSample: 5, nameSample: 1, alterSample: 2, landSample: 3, wohnortSample: 4, tagesablaufSample: 5, wochenendeSample: 6,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe einen Kursraum.“<br><strong>Wie viele Personen?</strong> „Acht Personen und eine Lehrerin.“<br><strong>Wo?</strong> „Sie sitzen an Tischen, die Lehrerin steht vor der Tafel.“<br><strong>Was machen sie?</strong> „Die Lehrerin schreibt an die Tafel; die Personen schreiben in ihre Hefte und lernen Deutsch.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag!“<br><strong>Wunsch / Frage:</strong> „Ich möchte mich für den Computerkurs anmelden. Wann beginnt der Kurs? Was kostet er? In welchem Raum ist er?“<br><strong>Reaktion:</strong> „Super, ich nehme den Kurs am Dienstag.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiedersehen!“" })
  }),
  practiceExam({
    id: "exam-8",
    title: "Übungssatz 8: Freizeit und Besuch",
    theme: "Kino, Zoo, Restaurant, Museum und Verabredungen.",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "logo", title: "Kino Central", sub: "Familienfilm", body: ["Samstag 16 Uhr", "Tickets online oder an der Kasse"], foot: "Kinder zahlen 6 Euro" },
              { n: 2, variant: "plain", title: "Zoo am Fluss", body: ["täglich 9–18 Uhr", "Fütterung um 14 Uhr", "Familienkarte erhältlich"], foot: "Bus 5 bis Zoo" },
              { n: 3, variant: "contact", title: "Friseur Mona", body: ["Damen und Herren", "Termine telefonisch", "auch Freitagabend"], foot: "Tel. 0660 445566" },
              { n: 4, variant: "classified", title: "Restaurant Roma", body: ["Pizza und Pasta", "Tisch reservieren", "Terrasse im Sommer"], foot: "Geöffnet 11–23 Uhr" },
              { n: 5, variant: "list", title: "Museum modern", body: [{ label: "Eintritt:", text: "Mittwoch frei" }, { label: "Führung:", text: "15 Uhr" }], foot: "Fotografieren ohne Blitz" },
              { n: 6, variant: "logo", title: "Bahnticket Aktion", body: ["Wochenendticket", "für zwei Personen", "nur online"], foot: "gültig Samstag und Sonntag" }
            ]
          },
          options: [
            "Kino Central: Familienfilm am Samstag um 16 Uhr.",
            "Zoo am Fluss: täglich geöffnet, Fütterung um 14 Uhr.",
            "Friseur Mona: Termine telefonisch, auch Freitagabend.",
            "Restaurant Roma: Pizza, Pasta und Reservierung.",
            "Museum modern: Mittwoch frei, Führung 15 Uhr.",
            "Bahnticket Aktion: Wochenendticket für zwei Personen."
          ],
          rows: [
            ["A", "Sie möchten Tiere sehen.", 2],
            ["B", "Sie möchten einen Tisch für das Abendessen reservieren.", 4],
            ["C", "Sie möchten am Mittwoch kostenlos ins Museum.", 5],
            ["D", "Sie möchten am Samstag mit Kindern einen Film sehen.", 1],
            ["E", "Sie brauchen einen Termin zum Haare schneiden.", 3]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Kino Central:</strong> Familienfilm Samstag 16 Uhr. Karten gibt es online und an der Kasse.<br><br>" +
            "<strong>2 · Zoo am Fluss:</strong> Täglich 9–18 Uhr. Tierfütterung um 14 Uhr.<br><br>" +
            "<strong>3 · Restaurant Roma:</strong> Geöffnet 11–23 Uhr. Reservierung telefonisch möglich.",
          rows: [
            ["1", "Beginnt der Film am Samstag um 16 Uhr?", "ja"],
            ["2", "Kann man Karten nur online kaufen?", "nein"],
            ["3", "Ist der Zoo jeden Tag geöffnet?", "ja"],
            ["4", "Ist die Fütterung am Vormittag?", "nein"],
            ["5", "Hat das Restaurant bis 23 Uhr geöffnet?", "ja"],
            ["6", "Kann man telefonisch einen Tisch reservieren?", "ja"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", img: "assets/img/practice/exam-8/l3-1.jpg" },
              { label: "2", img: "assets/img/practice/exam-8/l3-2.jpg" },
              { label: "3", img: "assets/img/practice/exam-8/l3-3.jpg" },
              { label: "4", img: "assets/img/practice/exam-8/l3-4.jpg" },
              { label: "5", img: "assets/img/practice/exam-8/l3-5.jpg" },
              { label: "6", img: "assets/img/practice/exam-8/l3-6.jpg" }
            ]
          },
          options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
          rows: [
            ["A", "Wir essen heute Pizza im Restaurant.", 4],
            ["B", "Die Kinder möchten Tiere sehen.", 2],
            ["C", "Im Museum ist heute der Eintritt frei.", 5],
            ["D", "Wir sehen heute einen Film im Kino.", 1],
            ["E", "Ich habe um 17 Uhr einen Termin beim Friseur.", 3]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Bild? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Bild (A–F) die Textnummer (1–5) oder „Kein Text“ zu.",
          audio: "assets/audio/generated/exam-8-task-1.mp3",
          transcript:
            "Text 1: „Der Familienfilm im Kino Central beginnt heute um sechzehn Uhr. Es gibt noch Karten an der Kasse.“\n\n" +
            "Text 2: „Bitte kommen Sie um vierzehn Uhr zur Fütterung der Tiere. Treffpunkt ist beim Eingang.“\n\n" +
            "Text 3: „Friseur Mona, guten Tag. Ihr Termin ist am Freitag um siebzehn Uhr dreißig.“\n\n" +
            "Text 4: „Guten Abend, ich möchte einen Tisch für vier Personen reservieren, bitte für Samstag um neunzehn Uhr.“\n\n" +
            "Text 5: „Die Führung im Museum beginnt in zehn Minuten. Bitte fotografieren Sie ohne Blitz.“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", img: "assets/img/practice/exam-8/l1-D.jpg" },
              { label: "B", img: "assets/img/practice/exam-8/l1-A.jpg" },
              { label: "C", img: "assets/img/practice/exam-8/l1-E.jpg" },
              { label: "D", img: "assets/img/practice/exam-8/l1-C.jpg" },
              { label: "E", img: "assets/img/practice/exam-8/l1-B.jpg" },
              { label: "F", img: "assets/img/practice/exam-8/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Bild A", 4],
            ["B", "Bild B", 1],
            ["C", "Bild C", 5],
            ["D", "Bild D", 3],
            ["E", "Bild E", 2],
            ["F", "Bild F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht vom Restaurant zwei Mal. Schreiben Sie die wichtigsten Informationen auf das Notizblatt.",
          audio: "assets/audio/generated/exam-8-task-2.mp3",
          transcript:
            "Guten Tag, hier ist das Restaurant Roma. Wir bestätigen Ihre Reservierung für Samstag, den neunzehnten September, um neunzehn Uhr. Der Tisch ist für vier Personen. Unsere Adresse ist Theaterplatz zwei. Bei Fragen rufen Sie bitte null sechs sechs null, vier vier fünf fünf sechs sechs. Auf Wiederhören. (Sie hören den Text zwei Mal.)",
          rows: [
            ["p8l2a", "Was?", "Reservierung", ["reservierung", "tischreservierung", "tisch"]],
            ["p8l2b", "Wann? (Tag)", "Samstag", ["samstag", "sa"]],
            ["p8l2c", "Datum und Uhrzeit", "19. September, 19 Uhr", ["19 september 19 uhr", "19. september 19 uhr", "19 september 19", "19 9 19 uhr"]],
            ["p8l2d", "Personen", "4", ["4", "vier", "4 personen"]],
            ["p8l2e", "Wo?", "Theaterplatz 2", ["theaterplatz 2", "theaterplatz"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören fünf kurze Interviews einmal. Wählen Sie pro Person eine Antwort.",
          prompt: "Was macht die Person am Wochenende?",
          audio: "assets/audio/generated/exam-8-task-3.mp3",
          transcript:
            "Frage: Was machen Sie am Wochenende?\n\n" +
            "Text 1: „Am Samstag gehe ich mit meinen Kindern ins Kino. Wir sehen einen Familienfilm.“\n\n" +
            "Text 2: „Wir fahren am Sonntag in den Zoo. Meine Tochter liebt Tiere.“\n\n" +
            "Text 3: „Am Abend essen wir im Restaurant Roma. Ich habe schon reserviert.“\n\n" +
            "Text 4: „Ich besuche am Mittwoch das Museum, weil der Eintritt frei ist.“\n\n" +
            "Text 5: „Nach dem Zoo essen wir Pizza im Restaurant.“",
          columns: ["Kino", "Zoo", "Restaurant", "Museum"],
          rows: [
            ["Text 1", "Person 1", "kino"],
            ["Text 2", "Person 2", "zoo"],
            ["Text 3", "Person 3", "restaurant"],
            ["Text 4", "Person 4", "museum"],
            ["Text 5", "Person 5", "restaurant"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie reservieren einen Tisch im Restaurant. Angaben: Amir Saleh, Telefon +43 660 445566, E-Mail amir.saleh@example.com, Restaurant Roma, Samstag 19.09., 19 Uhr, vier Personen, Terrasse ja, Anlass Geburtstag, Bezahlung Karte.",
      fields: [
        ["Name", "Amir Saleh", ["amir saleh"]],
        ["Telefon", "+43 660 445566", ["43 660 445566", "0660 445566"]],
        ["E-Mail", "amir.saleh@example.com", ["amir.saleh@example.com"]],
        ["Restaurant", "Roma", ["roma", "restaurant roma"]],
        ["Wochentag", "Samstag", ["samstag", "sa"]],
        ["Datum", "19.09.", ["19 09", "19.09", "19.9"]],
        ["Uhrzeit", "19 Uhr", ["19 uhr", "19", "19:00"]],
        ["Personen", "4", ["4", "vier"]],
        ["Terrasse", "Ja", ["ja"]],
        ["Bezahlung", "Karte", ["karte", "mit karte"]]
      ],
      emailPrompt: "Sie möchten einen Deutschkurs besuchen. Schreiben Sie einen Brief von mindestens 30 Wörtern an die Sprachschule: wer Sie sind, welchen Kurs Sie möchten, wann Sie Zeit haben, und fragen Sie nach Preis und Beginn.",
      checklist: ["Formelle Anrede", "Person vorgestellt", "Kurs gewünscht", "Frage nach Preis / Beginn", "Formeller Gruß + Name"],
      sample: "Sehr geehrte Damen und Herren,\nich heiße Anton Klein. Ich möchte einen Deutschkurs A1 besuchen. Ich habe am Abend Zeit. Wann beginnt der Kurs? Wie viel kostet er?\nMit freundlichen Grüßen\nAnton Klein",
      textTitle: "Aufgabe 2: Brief"
    }),
    speaking: practiceSpeaking([
      "Sie möchten im Restaurant einen Tisch reservieren. Fragen Sie nach Uhrzeit, Personen und Terrasse.",
      "Beschreiben Sie ein Bild: Eine Familie ist im Zoo."
    ], { sprachenSample: 1, hobbysSample: 3, berufSample: 4, sportSample: 2, familieSample: 6, lieblingsessenSample: 2, nameSample: 2, alterSample: 3, landSample: 4, wohnortSample: 5, tagesablaufSample: 6, wochenendeSample: 1,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe einen Zoo.“<br><strong>Wie viele Personen?</strong> „Drei Personen, eine Familie mit einem Kind.“<br><strong>Wo?</strong> „Sie stehen vor dem Käfig der Elefanten.“<br><strong>Was machen sie?</strong> „Sie schauen die Elefanten an. Das Kind zeigt mit der Hand. Das Wetter ist warm.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag!“<br><strong>Wunsch / Frage:</strong> „Ich möchte einen Tisch reservieren. Für vier Personen, bitte. Können wir um 19 Uhr kommen? Haben Sie einen Platz auf der Terrasse?“<br><strong>Reaktion:</strong> „Wunderbar, dann reservieren wir einen Tisch auf der Terrasse.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiederhören!“" })
  }),
  practiceExam({
    id: "exam-9",
    title: "Übungssatz 9: Amt, Bank und Fundbüro",
    theme: "Mehr Details, ähnliche Alltagssituationen: Adresse anmelden, Konto, Dokumente, verlorene Sachen.",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "contact", title: "Bürgerservice Rathaus", sub: "Meldezettel & Auskunft", body: ["Adresse anmelden", "Mo, Mi, Fr 8–12 Uhr", "Pass und Mietvertrag mitbringen"], foot: "Rathausplatz 3 · Zimmer 12" },
              { n: 2, variant: "plain", title: "Fundbüro Zentrum", body: ["Schlüssel, Taschen, Dokumente", "Abholung mit Ausweis", "Online suchen möglich"], foot: "Di und Do 14–18 Uhr" },
              { n: 3, variant: "logo", title: "Stadtbank", sub: "Neues Konto", body: ["Kontoeröffnung kostenlos", "Bankkarte per Post", "Beratung auf Deutsch und Englisch"], foot: "Termin online buchen" },
              { n: 4, variant: "classified", title: "Foto & Kopie Express", body: ["Passfotos sofort", "Kopien und Scan", "Formulare ausdrucken"], foot: "Hauptstraße 18 · bis 19 Uhr" },
              { n: 5, variant: "list", title: "Versicherungsberatung", body: [{ label: "Krankenversicherung:", text: "Fragen und Formulare" }, { label: "Termine:", text: "auch am Abend" }], foot: "Kostenlose Erstberatung" },
              { n: 6, variant: "logo", title: "Deutschberatung", sub: "Lernen und Arbeiten", body: ["Kurse finden", "Bewerbung prüfen", "jeden Dienstag"], foot: "Beratungsstelle Nord" }
            ]
          },
          options: [
            "Bürgerservice Rathaus: Adresse anmelden, Mo/Mi/Fr 8–12 Uhr.",
            "Fundbüro Zentrum: verlorene Sachen abholen, Di und Do 14–18 Uhr.",
            "Stadtbank: neues Konto eröffnen, Termin online buchen.",
            "Foto & Kopie Express: Passfotos, Kopien und Formulare.",
            "Versicherungsberatung: Krankenversicherung, Formulare und Abendtermine.",
            "Deutschberatung: Kurse und Bewerbung, jeden Dienstag."
          ],
          rows: [
            ["A", "Sie haben Fragen zu Ihrer Krankenversicherung.", 5],
            ["B", "Sie brauchen ein Konto und eine Bankkarte.", 3],
            ["C", "Sie sind umgezogen und müssen Ihre neue Adresse anmelden.", 1],
            ["D", "Sie brauchen heute noch Passfotos und Kopien.", 4],
            ["E", "Sie haben Ihre Tasche im Bus verloren.", 2]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Bürgerservice Rathaus:</strong> Für den Meldezettel brauchen Sie einen Pass und den Mietvertrag. Ohne Termin können Sie nur vormittags kommen.<br><br>" +
            "<strong>2 · Fundbüro Zentrum:</strong> Gefundene Sachen bleiben sechs Wochen im Fundbüro. Bringen Sie bitte einen Ausweis mit.<br><br>" +
            "<strong>3 · Stadtbank:</strong> Ein neues Konto kostet nichts. Die Bankkarte kommt nach sieben Tagen mit der Post.",
          rows: [
            ["1", "Braucht man für den Meldezettel einen Pass?", "ja"],
            ["2", "Kann man ohne Termin am Nachmittag zum Bürgerservice kommen?", "nein"],
            ["3", "Bleiben gefundene Sachen sechs Wochen im Fundbüro?", "ja"],
            ["4", "Muss man im Fundbüro einen Ausweis zeigen?", "ja"],
            ["5", "Kostet die Kontoeröffnung Geld?", "nein"],
            ["6", "Bekommt man die Bankkarte sofort am Schalter?", "nein"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", img: "assets/img/practice/exam-9/l3-1.jpg" },
              { label: "2", img: "assets/img/practice/exam-9/l3-2.jpg" },
              { label: "3", img: "assets/img/practice/exam-9/l3-3.jpg" },
              { label: "4", img: "assets/img/practice/exam-9/l3-4.jpg" },
              { label: "5", img: "assets/img/practice/exam-9/l3-5.jpg" },
              { label: "6", img: "assets/img/practice/exam-9/l3-6.jpg" }
            ]
          },
          options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
          rows: [
            ["A", "Ich fülle ein Formular für ein neues Konto aus.", 3],
            ["B", "Ich warte im Rathaus. Ich möchte meine neue Adresse anmelden.", 1],
            ["C", "Ich verstehe das Formular für die Versicherung nicht.", 5],
            ["D", "Meine Schlüssel sind weg. Vielleicht sind sie im Fundbüro.", 2],
            ["E", "Für den Antrag brauche ich ein Passfoto und zwei Kopien.", 4]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Bild? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Bild (A–F) die Textnummer (1–5) oder „Kein Text“ zu.",
          audio: "assets/audio/generated/exam-9-task-1.mp3",
          transcript:
            "Text 1: „Für den Antrag brauchen Sie ein Passfoto und zwei Kopien. Der Kopierer steht gleich neben der Tür.“\n\n" +
            "Text 2: „Guten Tag, hier ist das Fundbüro. Wir haben einen schwarzen Schlüsselbund mit drei Schlüsseln gefunden.“\n\n" +
            "Text 3: „Ihre neue Bankkarte ist da. Sie können sie morgen ab neun Uhr am Schalter abholen.“\n\n" +
            "Text 4: „Bitte kommen Sie mit Pass und Mietvertrag ins Rathaus. Dann können wir Ihre neue Adresse eintragen.“\n\n" +
            "Text 5: „Die Straßenbahn Linie 6 fährt heute nicht bis zum Hauptplatz. Bitte nehmen Sie den Ersatzbus.“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", img: "assets/img/practice/exam-9/l1-D.jpg" },
              { label: "B", img: "assets/img/practice/exam-9/l1-A.jpg" },
              { label: "C", img: "assets/img/practice/exam-9/l1-E.jpg" },
              { label: "D", img: "assets/img/practice/exam-9/l1-B.jpg" },
              { label: "E", img: "assets/img/practice/exam-9/l1-C.jpg" },
              { label: "F", img: "assets/img/practice/exam-9/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Bild A", 1],
            ["B", "Bild B", 4],
            ["C", "Bild C", 5],
            ["D", "Bild D", 2],
            ["E", "Bild E", 3],
            ["F", "Bild F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht vom Bürgerservice zwei Mal. Schreiben Sie die wichtigsten Informationen auf das Notizblatt.",
          audio: "assets/audio/generated/exam-9-task-2.mp3",
          transcript:
            "Guten Tag, hier ist der Bürgerservice Rathaus. Ihr Termin für den Meldezettel ist am Donnerstag, dem dritten Juni, um zehn Uhr fünfzehn. Bitte kommen Sie in Zimmer zwölf, Rathausplatz drei. Bringen Sie Ihren Pass und den Mietvertrag mit. Bei Fragen rufen Sie null eins, acht acht fünf sieben zwei eins an. Auf Wiederhören. (Sie hören den Text zwei Mal.)",
          rows: [
            ["p9l2a", "Was?", "Meldezettel", ["meldezettel", "adresse anmelden", "anmeldung"]],
            ["p9l2b", "Wann? (Tag)", "Donnerstag", ["donnerstag", "do"]],
            ["p9l2c", "Datum und Uhrzeit", "3. Juni, 10:15 Uhr", ["3 juni 1015 uhr", "3. juni 10:15 uhr", "3 juni 10 15", "3 6 1015 uhr"]],
            ["p9l2d", "Wo?", "Zimmer 12, Rathausplatz 3", ["zimmer 12 rathausplatz 3", "rathausplatz 3", "zimmer 12"]],
            ["p9l2e", "Mitbringen", "Pass und Mietvertrag", ["pass und mietvertrag", "pass mietvertrag", "mietvertrag und pass"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören fünf kurze Interviews einmal. Wählen Sie pro Person eine Antwort.",
          prompt: "Was braucht die Person?",
          audio: "assets/audio/generated/exam-9-task-3.mp3",
          transcript:
            "Frage: Was brauchen Sie heute?\n\n" +
            "Text 1: „Ich bin neu in der Stadt. Ich muss meine Adresse im Rathaus anmelden.“\n\n" +
            "Text 2: „Mein Rucksack ist weg. Ich frage heute im Fundbüro.“\n\n" +
            "Text 3: „Ich möchte ein Konto eröffnen und brauche später eine Bankkarte.“\n\n" +
            "Text 4: „Für mein Formular brauche ich ein neues Passfoto.“\n\n" +
            "Text 5: „Meine Geldkarte funktioniert nicht. Ich gehe zur Bank.“",
          columns: ["Meldezettel", "Fundbüro", "Bank", "Passfoto"],
          rows: [
            ["Text 1", "Person 1", "meldezettel"],
            ["Text 2", "Person 2", "fundbüro"],
            ["Text 3", "Person 3", "bank"],
            ["Text 4", "Person 4", "passfoto"],
            ["Text 5", "Person 5", "bank"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie melden Ihre neue Adresse an. Angaben: Lina Farah, geboren am 04.06.1996, Staatsangehörigkeit Syrien, alte Adresse Marktgasse 8, 8020 Graz, neue Adresse Rathausplatz 3, 1010 Wien, Einzug 01.06., Telefon +43 677 885721, E-Mail lina.farah@example.com.",
      fields: [
        ["Name", "Lina Farah", ["lina farah"]],
        ["Geburtsdatum", "04.06.1996", ["04 06 1996", "04.06.1996", "04061996"]],
        ["Staatsangehörigkeit", "Syrien", ["syrien", "syrisch"]],
        ["Alte Adresse", "Marktgasse 8, 8020 Graz", ["marktgasse 8 8020 graz"]],
        ["Neue Adresse", "Rathausplatz 3, 1010 Wien", ["rathausplatz 3 1010 wien"]],
        ["Einzug", "01.06.", ["01 06", "01.06", "1 6", "1.6"]],
        ["Telefon", "+43 677 885721", ["43 677 885721", "0677 885721"]],
        ["E-Mail", "lina.farah@example.com", ["lina.farah@example.com"]],
        ["Dokument", "Pass", ["pass", "reisepass"]],
        ["Grund", "Umzug", ["umzug", "adresse anmelden"]]
      ],
      emailPrompt: "Sie haben Ihre Tasche im Bus verloren. Schreiben Sie einen Brief von mindestens 30 Wörtern an das Fundbüro: was Sie verloren haben, wann und wo das war, wie die Tasche aussieht, und fragen Sie, wann Sie sie abholen können.",
      checklist: ["Formelle Anrede", "Sache beschrieben", "Zeit und Ort genannt", "Frage nach Abholung", "Formeller Gruß + Name"],
      sample: "Sehr geehrte Damen und Herren,\nich habe gestern im Bus 13 meine schwarze Tasche verloren. In der Tasche sind Schlüssel und ein Buch. Wann kann ich die Tasche abholen?\nMit freundlichen Grüßen\nLina Farah",
      textTitle: "Aufgabe 2: Brief"
    }),
    speaking: practiceSpeaking([
      "Sie sind im Fundbüro. Fragen Sie nach Ihrer verlorenen Tasche, der Abholzeit und den Dokumenten.",
      "Beschreiben Sie ein Bild: Menschen warten in einem Amt."
    ], { sprachenSample: 3, hobbysSample: 6, berufSample: 2, sportSample: 4, familieSample: 5, lieblingsessenSample: 1, nameSample: 3, alterSample: 4, landSample: 5, wohnortSample: 6, tagesablaufSample: 1, wochenendeSample: 2,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe ein Amt.“<br><strong>Wie viele Personen?</strong> „Ungefähr sechs Personen.“<br><strong>Wo?</strong> „Sie sitzen auf Stühlen im Wartezimmer.“<br><strong>Was machen sie?</strong> „Sie warten. Eine Frau liest die Zeitung, ein Mann schaut auf sein Handy.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag!“<br><strong>Wunsch / Frage:</strong> „Ich habe meine Tasche im Bus verloren. Sie ist schwarz. Haben Sie sie gefunden? Wann kann ich sie abholen? Welche Dokumente brauche ich?“<br><strong>Reaktion:</strong> „Gut, ich komme morgen mit meinem Pass.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiedersehen!“" })
  }),
  practiceExam({
    id: "exam-10",
    title: "Übungssatz 10: Reise, Wetter und Gepäck",
    theme: "Reisen mit kleinen Problemen: Verspätung, Gepäck, Hotel, Wetter und Wegbeschreibung.",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "logo", title: "Reisezentrum Bahnhof", sub: "Tickets & Beratung", body: ["Zug, Bus, Flughafenbus", "Umbuchung am Schalter", "täglich 6–20 Uhr"], foot: "Nummern ziehen am Eingang" },
              { n: 2, variant: "plain", title: "Koffer-Service", body: ["Rollen kaputt?", "Schloss reparieren", "Gepäckaufbewahrung 4 Euro/Tag"], foot: "Beim Gleis 1" },
              { n: 3, variant: "contact", title: "Hotel Stadtblick", sub: "Nähe Bahnhof", body: ["Einzel- und Doppelzimmer", "Frühstück ab 6:30 Uhr", "späte Anreise möglich"], foot: "Rezeption 24 Stunden" },
              { n: 4, variant: "list", title: "Wetter & Wandern", body: [{ label: "Heute:", text: "Regen am Nachmittag" }, { label: "Morgen:", text: "Sonne und 18 Grad" }], foot: "Toureninfo im Büro" },
              { n: 5, variant: "classified", title: "Stadtführung", body: ["Altstadt zu Fuß", "Start 10:00 und 15:00 Uhr", "Treffpunkt Tourist-Info"], foot: "Deutsch und Englisch" },
              { n: 6, variant: "logo", title: "Fahrradverleih See", body: ["E-Bikes und Kinderhelme", "Rückgabe bis 19 Uhr", "Ausweis mitbringen"], foot: "Nur bei gutem Wetter" }
            ]
          },
          options: [
            "Reisezentrum Bahnhof: Tickets, Bus, Zug und Umbuchung.",
            "Koffer-Service: Reparatur und Gepäckaufbewahrung am Gleis 1.",
            "Hotel Stadtblick: Zimmer mit Frühstück, späte Anreise möglich.",
            "Wetter & Wandern: Regen, Sonne und Toureninfo.",
            "Stadtführung: Altstadt zu Fuß, Start 10 und 15 Uhr.",
            "Fahrradverleih See: E-Bikes, Rückgabe bis 19 Uhr."
          ],
          rows: [
            ["A", "Sie wollen morgen wandern und brauchen Informationen zum Wetter.", 4],
            ["B", "Sie möchten die Altstadt mit einer Gruppe sehen.", 5],
            ["C", "Ihr Koffer ist kaputt und Sie möchten ihn reparieren lassen.", 2],
            ["D", "Sie kommen spät an und brauchen ein Hotelzimmer.", 3],
            ["E", "Ihr Zug fällt aus und Sie brauchen ein neues Ticket.", 1]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Reisezentrum:</strong> Wegen Bauarbeiten fahren heute keine Züge nach Linz. Sie können am Schalter kostenlos umbuchen.<br><br>" +
            "<strong>2 · Hotel Stadtblick:</strong> Frühstück gibt es ab 6:30 Uhr. Bei Anreise nach 22 Uhr bitte vorher anrufen.<br><br>" +
            "<strong>3 · Koffer-Service:</strong> Gepäckaufbewahrung kostet 4 Euro pro Tag. Reparaturen dauern meistens einen Tag.",
          rows: [
            ["1", "Fahren heute Züge nach Linz?", "nein"],
            ["2", "Kann man kostenlos umbuchen?", "ja"],
            ["3", "Beginnt das Frühstück um halb sieben?", "ja"],
            ["4", "Muss man bei später Anreise vorher anrufen?", "ja"],
            ["5", "Kostet die Gepäckaufbewahrung vier Euro pro Stunde?", "nein"],
            ["6", "Dauern Reparaturen meistens eine Woche?", "nein"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", img: "assets/img/practice/exam-10/l3-1.jpg" },
              { label: "2", img: "assets/img/practice/exam-10/l3-2.jpg" },
              { label: "3", img: "assets/img/practice/exam-10/l3-3.jpg" },
              { label: "4", img: "assets/img/practice/exam-10/l3-4.jpg" },
              { label: "5", img: "assets/img/practice/exam-10/l3-5.jpg" },
              { label: "6", img: "assets/img/practice/exam-10/l3-6.jpg" }
            ]
          },
          options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
          rows: [
            ["A", "Es regnet stark. Für die Wanderung brauche ich eine Jacke.", 5],
            ["B", "Ich suche am Flughafen den Bus in die Stadt.", 2],
            ["C", "An der Rezeption bekomme ich die Zimmerkarte.", 4],
            ["D", "Der Zug hat Verspätung. Viele Leute warten am Bahnsteig.", 1],
            ["E", "Der Koffer ist schwer. Ich stelle ihn in ein Schließfach.", 3]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Bild? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Bild (A–F) die Textnummer (1–5) oder „Kein Text“ zu.",
          audio: "assets/audio/generated/exam-10-task-1.mp3",
          transcript:
            "Text 1: „Achtung am Bahnsteig vier: Der Zug nach Linz hat heute dreißig Minuten Verspätung.“\n\n" +
            "Text 2: „Den Flughafenbus finden Sie vor dem Ausgang B. Er fährt alle zwanzig Minuten in die Innenstadt.“\n\n" +
            "Text 3: „Willkommen im Hotel Stadtblick. Ihr Zimmer ist im zweiten Stock, Frühstück gibt es ab halb sieben.“\n\n" +
            "Text 4: „Bitte lassen Sie Ihr Gepäck nicht allein. Schließfächer finden Sie unten neben der Treppe.“\n\n" +
            "Text 5: „Für heute Nachmittag melden wir starken Regen und Wind. Bitte bleiben Sie nicht lange draußen.“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", img: "assets/img/practice/exam-10/l1-D.jpg" },
              { label: "B", img: "assets/img/practice/exam-10/l1-A.jpg" },
              { label: "C", img: "assets/img/practice/exam-10/l1-E.jpg" },
              { label: "D", img: "assets/img/practice/exam-10/l1-C.jpg" },
              { label: "E", img: "assets/img/practice/exam-10/l1-B.jpg" },
              { label: "F", img: "assets/img/practice/exam-10/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Bild A", 4],
            ["B", "Bild B", 1],
            ["C", "Bild C", 5],
            ["D", "Bild D", 3],
            ["E", "Bild E", 2],
            ["F", "Bild F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht vom Hotel zwei Mal. Schreiben Sie die wichtigsten Informationen auf das Notizblatt.",
          audio: "assets/audio/generated/exam-10-task-2.mp3",
          transcript:
            "Guten Abend, hier ist das Hotel Stadtblick. Wir bestätigen Ihre Reservierung für Dienstag, den zwölften August. Sie haben ein Doppelzimmer für zwei Nächte. Sie kommen nach zweiundzwanzig Uhr an, deshalb liegt der Schlüssel an der Rezeption. Unsere Adresse ist Bahnhofstraße acht. Bei Fragen rufen Sie null eins, sieben neun vier drei eins zwei an. Auf Wiederhören. (Sie hören den Text zwei Mal.)",
          rows: [
            ["p10l2a", "Was?", "Reservierung", ["reservierung", "hotelreservierung", "zimmer"]],
            ["p10l2b", "Wann? (Tag)", "Dienstag", ["dienstag", "di"]],
            ["p10l2c", "Datum", "12. August", ["12 august", "12. august", "12 8"]],
            ["p10l2d", "Zimmer", "Doppelzimmer für zwei Nächte", ["doppelzimmer zwei nächte", "doppelzimmer für zwei nächte", "doppelzimmer 2 nächte"]],
            ["p10l2e", "Wo?", "Bahnhofstraße 8", ["bahnhofstraße 8", "bahnhofstrasse 8", "bahnhofstraße"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören fünf kurze Interviews einmal. Wählen Sie pro Person eine Antwort.",
          prompt: "Was ist das Problem?",
          audio: "assets/audio/generated/exam-10-task-3.mp3",
          transcript:
            "Frage: Was ist Ihr Problem?\n\n" +
            "Text 1: „Mein Zug kommt viel später. Ich warte schon lange am Bahnsteig.“\n\n" +
            "Text 2: „Ich finde mein Hotel nicht. Die Straße ist nicht auf meinem Plan.“\n\n" +
            "Text 3: „Mein Koffer ist im Zug geblieben. Ich gehe zur Information.“\n\n" +
            "Text 4: „Es regnet sehr stark. Die Wanderung ist heute nicht gut.“\n\n" +
            "Text 5: „Ich weiß nicht, wo der Bus zum Flughafen abfährt.“",
          columns: ["Zug", "Hotel", "Gepäck", "Wetter"],
          rows: [
            ["Text 1", "Person 1", "zug"],
            ["Text 2", "Person 2", "hotel"],
            ["Text 3", "Person 3", "gepäck"],
            ["Text 4", "Person 4", "wetter"],
            ["Text 5", "Person 5", "zug"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie buchen ein Zimmer im Hotel Stadtblick. Angaben: David Novak, geboren am 18.02.1988, Telefon +43 676 794312, E-Mail david.novak@example.com, Anreise 12.08., Abreise 14.08., Doppelzimmer, zwei Personen, Frühstück ja, Ankunft nach 22 Uhr.",
      fields: [
        ["Name", "David Novak", ["david novak"]],
        ["Geburtsdatum", "18.02.1988", ["18 02 1988", "18.02.1988", "18021988"]],
        ["Telefon", "+43 676 794312", ["43 676 794312", "0676 794312"]],
        ["E-Mail", "david.novak@example.com", ["david.novak@example.com"]],
        ["Anreise", "12.08.", ["12 08", "12.08", "12.8"]],
        ["Abreise", "14.08.", ["14 08", "14.08", "14.8"]],
        ["Zimmer", "Doppelzimmer", ["doppelzimmer"]],
        ["Personen", "2", ["2", "zwei"]],
        ["Frühstück", "Ja", ["ja"]],
        ["Ankunft", "nach 22 Uhr", ["nach 22 uhr", "22 uhr", "nach 22"]]
      ],
      emailPrompt: "Ihr Zug hat Verspätung und Sie kommen später ins Hotel. Schreiben Sie einen Brief von mindestens 30 Wörtern an das Hotel: warum Sie später kommen, wann Sie ungefähr ankommen, was Sie wegen des Schlüssels brauchen, und bitten Sie um eine Bestätigung.",
      checklist: ["Formelle Anrede", "Grund genannt", "Ankunftszeit genannt", "Bitte zum Schlüssel", "Formeller Gruß + Name"],
      sample: "Sehr geehrte Damen und Herren,\nmein Zug hat heute Verspätung. Ich komme erst um 23 Uhr im Hotel an. Bitte legen Sie den Schlüssel an die Rezeption. Können Sie mir das bestätigen?\nMit freundlichen Grüßen\nDavid Novak",
      textTitle: "Aufgabe 2: Brief"
    }),
    speaking: practiceSpeaking([
      "Sie sind am Bahnhof. Ihr Zug hat Verspätung. Fragen Sie nach einem neuen Ticket, dem Gleis und der Ankunftszeit.",
      "Beschreiben Sie ein Bild: Reisende warten mit Koffern am Bahnhof."
    ], { sprachenSample: 5, hobbysSample: 1, berufSample: 6, sportSample: 1, familieSample: 2, lieblingsessenSample: 4, nameSample: 4, alterSample: 5, landSample: 6, wohnortSample: 1, tagesablaufSample: 2, wochenendeSample: 3,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe einen Bahnhof.“<br><strong>Wie viele Personen?</strong> „Viele Reisende, ungefähr fünfzehn Personen.“<br><strong>Wo?</strong> „Sie stehen auf dem Bahnsteig.“<br><strong>Was machen sie?</strong> „Sie warten auf den Zug. Sie haben Koffer und Taschen. Eine Frau liest die Anzeigetafel.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag!“<br><strong>Wunsch / Frage:</strong> „Mein Zug hat Verspätung. Ich brauche bitte ein neues Ticket. Von welchem Gleis fährt der nächste Zug? Wann komme ich in Wien an?“<br><strong>Reaktion:</strong> „Aha, gut. Dann fahre ich um 15 Uhr.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiedersehen!“" })
  }),
  practiceExam({
    id: "exam-11",
    title: "Übungssatz 11: Wohnen, Nachbarn und Reparaturen",
    theme: "Wohnhaus-Alltag mit genauen Regeln: Schlüssel, Waschküche, Heizung, Lärm und Hausverwaltung.",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "contact", title: "Hausverwaltung Grünhof", sub: "Miete & Reparaturen", body: ["Schäden online melden", "Sprechstunde Mittwoch 16–18 Uhr", "Notfälle telefonisch"], foot: "hausverwaltung-gruenhof.at" },
              { n: 2, variant: "logo", title: "Schlüsseldienst 24", body: ["Tür zu? Schlüssel weg?", "Tag und Nacht erreichbar", "Preis vor Ort"], foot: "Tel. 0800 22 44 66" },
              { n: 3, variant: "classified", title: "Heizung & Wasser", body: ["Service für Heizkörper", "kleine Reparaturen im Bad", "Termin auch am Samstag"], foot: "Firma Kern · schnell im Bezirk" },
              { n: 4, variant: "plain", title: "Waschküche Haus B", body: ["Waschen nur mit Liste", "Mo–Sa 7–21 Uhr", "Sonntag geschlossen"], foot: "Bitte sauber verlassen" },
              { n: 5, variant: "list", title: "Nachbarschaftsflohmarkt", body: [{ label: "Wann:", text: "Samstag 10–14 Uhr" }, { label: "Wo:", text: "Innenhof" }], foot: "Tische bitte selbst mitbringen" },
              { n: 6, variant: "logo", title: "Gemeinschaftsgarten", sub: "Mitmachen im Hof", body: ["Pflanzen, gießen, ernten", "Treffen jeden Freitag 17 Uhr"], foot: "Kinder willkommen" }
            ]
          },
          options: [
            "Hausverwaltung Grünhof: Schäden melden, Sprechstunde Mittwoch.",
            "Schlüsseldienst 24: Tür zu, Schlüssel weg, Tag und Nacht.",
            "Heizung & Wasser: Heizkörper und Bad, Termine auch Samstag.",
            "Waschküche Haus B: Liste, Mo–Sa 7–21 Uhr.",
            "Nachbarschaftsflohmarkt: Samstag 10–14 Uhr im Innenhof.",
            "Gemeinschaftsgarten: Pflanzen und gießen, Freitag 17 Uhr."
          ],
          rows: [
            ["A", "Ihre Wohnungstür ist zu und der Schlüssel liegt in der Wohnung.", 2],
            ["B", "Ihre Heizung ist kalt und Sie brauchen am Samstag Hilfe.", 3],
            ["C", "Sie möchten wissen, wann Sie Wäsche waschen dürfen.", 4],
            ["D", "Im Badezimmer ist etwas kaputt und Sie wollen es melden.", 1],
            ["E", "Sie möchten alte Möbel am Samstag im Hof verkaufen.", 5]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Waschküche Haus B:</strong> Bitte tragen Sie sich in die Liste ein. Waschen ist Montag bis Samstag von 7 bis 21 Uhr erlaubt.<br><br>" +
            "<strong>2 · Hausverwaltung:</strong> Der Aufzug ist am Donnerstag von 8 bis 13 Uhr außer Betrieb. Bitte benutzen Sie die Treppe.<br><br>" +
            "<strong>3 · Ruhezeiten:</strong> Im Haus ist von 22 bis 6 Uhr Nachtruhe. Musik bitte nur leise.",
          rows: [
            ["1", "Muss man sich für die Waschküche in eine Liste eintragen?", "ja"],
            ["2", "Darf man am Sonntag Wäsche waschen?", "nein"],
            ["3", "Funktioniert der Aufzug am Donnerstagvormittag nicht?", "ja"],
            ["4", "Soll man am Donnerstag die Treppe benutzen?", "ja"],
            ["5", "Beginnt die Nachtruhe um 21 Uhr?", "nein"],
            ["6", "Soll Musik nachts leise sein?", "ja"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", img: "assets/img/practice/exam-11/l3-1.jpg" },
              { label: "2", img: "assets/img/practice/exam-11/l3-2.jpg" },
              { label: "3", img: "assets/img/practice/exam-11/l3-3.jpg" },
              { label: "4", img: "assets/img/practice/exam-11/l3-4.jpg" },
              { label: "5", img: "assets/img/practice/exam-11/l3-5.jpg" },
              { label: "6", img: "assets/img/practice/exam-11/l3-6.jpg" }
            ]
          },
          options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
          rows: [
            ["A", "Heute wasche ich im Keller. Ich habe mich in die Liste eingetragen.", 2],
            ["B", "Ich stehe vor der Tür. Mein Schlüssel ist in der Wohnung.", 1],
            ["C", "Die Nachbarn feiern laut. Ich kann nicht schlafen.", 4],
            ["D", "Im Innenhof verkaufen wir am Samstag alte Sachen.", 5],
            ["E", "Der Heizkörper bleibt kalt, obwohl es draußen sehr kalt ist.", 3]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Bild? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Bild (A–F) die Textnummer (1–5) oder „Kein Text“ zu.",
          audio: "assets/audio/generated/exam-11-task-1.mp3",
          transcript:
            "Text 1: „Wegen einer Reparatur gibt es am Montag von acht bis zwölf Uhr kein warmes Wasser im Haus B.“\n\n" +
            "Text 2: „Schlüsseldienst, guten Abend. Wir kommen in zwanzig Minuten und öffnen die Tür.“\n\n" +
            "Text 3: „Bitte benutzen Sie die Waschmaschine Nummer zwei heute nicht. Sie ist kaputt.“\n\n" +
            "Text 4: „Der Aufzug funktioniert wieder. Sie können ihn ab dreizehn Uhr benutzen.“\n\n" +
            "Text 5: „Bitte machen Sie die Musik leiser. Es ist nach zweiundzwanzig Uhr.“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", img: "assets/img/practice/exam-11/l1-D.jpg" },
              { label: "B", img: "assets/img/practice/exam-11/l1-A.jpg" },
              { label: "C", img: "assets/img/practice/exam-11/l1-E.jpg" },
              { label: "D", img: "assets/img/practice/exam-11/l1-B.jpg" },
              { label: "E", img: "assets/img/practice/exam-11/l1-C.jpg" },
              { label: "F", img: "assets/img/practice/exam-11/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Bild A", 4],
            ["B", "Bild B", 1],
            ["C", "Bild C", 5],
            ["D", "Bild D", 2],
            ["E", "Bild E", 3],
            ["F", "Bild F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht von der Hausverwaltung zwei Mal. Schreiben Sie die wichtigsten Informationen auf das Notizblatt.",
          audio: "assets/audio/generated/exam-11-task-2.mp3",
          transcript:
            "Guten Tag, hier ist die Hausverwaltung Grünhof. Am Montag, dem vierzehnten Januar, reparieren wir die Wasserleitung in Haus B. Von acht bis zwölf Uhr gibt es kein warmes Wasser. Die Reparatur ist im Keller neben der Waschküche. Bei Fragen rufen Sie bitte null eins, zwei zwei vier vier sechs sechs an. Vielen Dank. (Sie hören den Text zwei Mal.)",
          rows: [
            ["p11l2a", "Was?", "Reparatur der Wasserleitung", ["reparatur der wasserleitung", "reparatur wasserleitung", "wasserleitung", "reparatur"]],
            ["p11l2b", "Wann? (Tag)", "Montag", ["montag", "mo"]],
            ["p11l2c", "Datum und Uhrzeit", "14. Januar, 8 bis 12 Uhr", ["14 januar 8 bis 12 uhr", "14. januar 8 12 uhr", "14 januar 8 12", "14 1 8 bis 12"]],
            ["p11l2d", "Haus", "Haus B", ["haus b", "b"]],
            ["p11l2e", "Wo?", "Keller neben der Waschküche", ["keller neben der waschküche", "keller neben waschküche", "keller waschküche"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören fünf kurze Interviews einmal. Wählen Sie pro Person eine Antwort.",
          prompt: "Worum geht es?",
          audio: "assets/audio/generated/exam-11-task-3.mp3",
          transcript:
            "Frage: Worum geht es bei Ihnen im Haus?\n\n" +
            "Text 1: „Ich komme nicht in die Wohnung. Mein Schlüssel liegt drinnen.“\n\n" +
            "Text 2: „Ich möchte heute waschen, aber die Maschine ist besetzt.“\n\n" +
            "Text 3: „Der Heizkörper ist kalt. Ich rufe die Hausverwaltung an.“\n\n" +
            "Text 4: „Die Nachbarn sind sehr laut. Mein Kind kann nicht schlafen.“\n\n" +
            "Text 5: „Im Bad kommt nur kaltes Wasser. Das ist ein Problem.“",
          columns: ["Schlüssel", "Waschen", "Heizung", "Lärm"],
          rows: [
            ["Text 1", "Person 1", "schlüssel"],
            ["Text 2", "Person 2", "waschen"],
            ["Text 3", "Person 3", "heizung"],
            ["Text 4", "Person 4", "lärm"],
            ["Text 5", "Person 5", "heizung"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie melden einen Schaden bei der Hausverwaltung. Angaben: Nora Klein, Wohnung 12, Haus B, Grünhofgasse 7, 8020 Graz, Telefon +43 664 224466, E-Mail nora.klein@example.com, Schaden: kein warmes Wasser, Raum Bad, seit 14.01., Terminwunsch Mittwoch 16 Uhr.",
      fields: [
        ["Name", "Nora Klein", ["nora klein"]],
        ["Wohnung", "12", ["12"]],
        ["Haus", "Haus B", ["haus b", "b"]],
        ["Adresse", "Grünhofgasse 7, 8020 Graz", ["grünhofgasse 7 8020 graz", "gruenhofgasse 7 8020 graz"]],
        ["Telefon", "+43 664 224466", ["43 664 224466", "0664 224466"]],
        ["E-Mail", "nora.klein@example.com", ["nora.klein@example.com"]],
        ["Schaden", "kein warmes Wasser", ["kein warmes wasser", "warmes wasser kaputt"]],
        ["Raum", "Bad", ["bad", "badezimmer"]],
        ["Seit", "14.01.", ["14 01", "14.01", "14.1"]],
        ["Terminwunsch", "Mittwoch 16 Uhr", ["mittwoch 16 uhr", "mi 16 uhr", "mittwoch 16"]]
      ],
      emailPrompt: "Ihre Nachbarn sind sehr laut. Schreiben Sie einen Brief von mindestens 30 Wörtern an die Hausverwaltung: was das Problem ist, wann es passiert, was Sie schon versucht haben, und bitten Sie um Hilfe.",
      checklist: ["Formelle Anrede", "Problem beschrieben", "Zeit genannt", "Bitte um Hilfe", "Formeller Gruß + Name"],
      sample: "Sehr geehrte Damen und Herren,\nich wohne in Wohnung 12. Meine Nachbarn hören jeden Abend nach 22 Uhr laute Musik. Ich habe schon freundlich gefragt. Bitte helfen Sie mir.\nMit freundlichen Grüßen\nNora Klein",
      textTitle: "Aufgabe 2: Brief"
    }),
    speaking: practiceSpeaking([
      "Sie rufen die Hausverwaltung an. Melden Sie eine kaputte Heizung und fragen Sie nach einem Termin.",
      "Beschreiben Sie ein Bild: Eine Person steht mit einem Schlüssel vor einer Wohnungstür."
    ], { sprachenSample: 2, hobbysSample: 4, berufSample: 3, sportSample: 6, familieSample: 4, lieblingsessenSample: 6, nameSample: 5, alterSample: 6, landSample: 1, wohnortSample: 2, tagesablaufSample: 3, wochenendeSample: 4,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe eine Wohnungstür.“<br><strong>Wie viele Personen?</strong> „Eine Person, ein junger Mann.“<br><strong>Wo?</strong> „Er steht im Flur vor der Tür.“<br><strong>Was machen sie?</strong> „Er hat einen Schlüssel in der Hand und möchte die Tür öffnen.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag, hier ist Frau Sahin.“<br><strong>Wunsch / Frage:</strong> „Meine Heizung ist kaputt. Die Wohnung ist sehr kalt. Können Sie bitte einen Techniker schicken? Wann kommt er?“<br><strong>Reaktion:</strong> „Okay, morgen am Nachmittag passt mir gut.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiederhören!“" })
  }),
  practiceExam({
    id: "exam-12",
    title: "Übungssatz 12: Arbeit, Kurs und digitale Termine",
    theme: "A1 mit modernerem Alltag: Paketstation, Online-Termin, Bewerbung, Handy und Computerkurs.",
    reading: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Finden Sie zu jeder Situation (A–E) die passende Anzeige (1–6). Achtung: Eine Anzeige ist zu viel.",
          sheet: {
            title: "Anzeigen",
            kind: "ads",
            items: [
              { n: 1, variant: "contact", title: "Jobcenter Plus", sub: "Termine & Bewerbung", body: ["Lebenslauf prüfen", "Online-Termin buchen", "Beratung vormittags"], foot: "Ausweis bitte mitbringen" },
              { n: 2, variant: "logo", title: "Paketpunkt City", body: ["Pakete abholen und zurückgeben", "Code und Ausweis nötig", "Mo–Sa bis 20 Uhr"], foot: "Neben der U-Bahn" },
              { n: 3, variant: "plain", title: "Handyshop Connect", body: ["SIM-Karte, Vertrag, Reparatur", "Daten übertragen", "Beratung ohne Termin"], foot: "Mariahilfer Straße 44" },
              { n: 4, variant: "classified", title: "Computerkurs A1", body: ["E-Mail, Formular, Video-Termin", "für Anfängerinnen und Anfänger", "Montag 18 Uhr"], foot: "VHS Raum 5" },
              { n: 5, variant: "list", title: "Druck & Scan", body: [{ label: "Service:", text: "Bewerbung drucken" }, { label: "Extra:", text: "Dokumente scannen" }], foot: "10 Cent pro Seite" },
              { n: 6, variant: "logo", title: "Freiwillig helfen", sub: "Treffpunkt Sozialküche", body: ["Essen ausgeben", "Deutsch sprechen", "Samstag 9–12 Uhr"], foot: "Anmeldung per E-Mail" }
            ]
          },
          options: [
            "Jobcenter Plus: Bewerbung prüfen und Online-Termin buchen.",
            "Paketpunkt City: Pakete abholen und zurückgeben, Code nötig.",
            "Handyshop Connect: SIM-Karte, Vertrag, Reparatur.",
            "Computerkurs A1: E-Mail, Formular, Video-Termin, Montag 18 Uhr.",
            "Druck & Scan: Bewerbung drucken und Dokumente scannen.",
            "Freiwillig helfen: Sozialküche, Samstag 9–12 Uhr."
          ],
          rows: [
            ["A", "Sie möchten lernen, wie man eine E-Mail und ein Online-Formular schreibt.", 4],
            ["B", "Ihr Handyvertrag ist zu teuer und Sie brauchen Beratung.", 3],
            ["C", "Sie möchten Ihren Lebenslauf prüfen lassen und einen Termin buchen.", 1],
            ["D", "Sie müssen Ihre Bewerbung ausdrucken und Dokumente scannen.", 5],
            ["E", "Sie haben einen Abholcode und möchten ein Paket bekommen.", 2]
          ],
          prefix: "r1"
        }),
        jaNeinTask({
          title: "Aufgabe 2",
          instructions: "Lesen Sie drei Anzeigen. Antworten Sie mit JA oder NEIN.",
          prompt:
            "<strong>1 · Paketpunkt City:</strong> Für die Abholung brauchen Sie den Code und einen Ausweis. Pakete bleiben sieben Tage im Paketpunkt.<br><br>" +
            "<strong>2 · Computerkurs A1:</strong> Der Kurs beginnt Montag um 18 Uhr. Bitte bringen Sie einen Laptop oder ein Tablet mit.<br><br>" +
            "<strong>3 · Jobcenter Plus:</strong> Termine gibt es nur online. Zur Beratung bringen Sie bitte Ihren Lebenslauf mit.",
          rows: [
            ["1", "Braucht man für das Paket einen Ausweis?", "ja"],
            ["2", "Bleiben Pakete sieben Tage im Paketpunkt?", "ja"],
            ["3", "Beginnt der Computerkurs am Montagabend?", "ja"],
            ["4", "Muss man zum Kurs ein Fahrrad mitbringen?", "nein"],
            ["5", "Kann man beim Jobcenter telefonisch einen Termin buchen?", "nein"],
            ["6", "Soll man zur Beratung den Lebenslauf mitbringen?", "ja"]
          ],
          prefix: "r2"
        }),
        matchTask({
          title: "Aufgabe 3",
          instructions: "Lesen Sie 5 kurze Texte (A–E). Welches Bild (1–6) passt? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Text die passende Bildnummer zu. Die Bilder sehen Sie unten.",
          sheet: {
            title: "Bilder",
            kind: "tiles",
            items: [
              { label: "1", img: "assets/img/practice/exam-12/l3-1.jpg" },
              { label: "2", img: "assets/img/practice/exam-12/l3-2.jpg" },
              { label: "3", img: "assets/img/practice/exam-12/l3-3.jpg" },
              { label: "4", img: "assets/img/practice/exam-12/l3-4.jpg" },
              { label: "5", img: "assets/img/practice/exam-12/l3-5.jpg" },
              { label: "6", img: "assets/img/practice/exam-12/l3-6.jpg" }
            ]
          },
          options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6"],
          rows: [
            ["A", "Ich drucke meine Bewerbung und scanne ein Zeugnis.", 3],
            ["B", "Mein Termin ist online. Ich spreche am Computer mit der Beraterin.", 2],
            ["C", "Im Handyshop kaufe ich eine neue SIM-Karte.", 5],
            ["D", "Morgen habe ich ein Gespräch wegen einer Arbeit.", 4],
            ["E", "Ich hole ein Paket mit einem Code ab.", 1]
          ],
          prefix: "r3"
        })
      ]
    },
    listening: {
      minutes: 25,
      tasks: [
        matchTask({
          title: "Aufgabe 1",
          instructions: "Sie hören fünf kurze Texte einmal. Welcher Text passt zu welchem Bild? Achtung: Ein Bild ist zu viel.",
          prompt: "Ordnen Sie jedem Bild (A–F) die Textnummer (1–5) oder „Kein Text“ zu.",
          audio: "assets/audio/generated/exam-12-task-1.mp3",
          transcript:
            "Text 1: „Ihr Paket liegt im Paketpunkt City. Bitte bringen Sie den Abholcode und Ihren Ausweis mit.“\n\n" +
            "Text 2: „Der Computerkurs beginnt heute um achtzehn Uhr in Raum fünf. Bitte nehmen Sie Ihren Laptop mit.“\n\n" +
            "Text 3: „Ihr Termin im Jobcenter ist morgen um neun Uhr vierzig. Bringen Sie bitte den Lebenslauf mit.“\n\n" +
            "Text 4: „Im Handyshop können wir Ihre alte Nummer auf die neue SIM-Karte übertragen.“\n\n" +
            "Text 5: „Wir treffen uns am Samstag um neun Uhr in der Sozialküche und helfen beim Frühstück.“",
          sheet: {
            title: "Fotos",
            kind: "tiles",
            items: [
              { label: "A", img: "assets/img/practice/exam-12/l1-D.jpg" },
              { label: "B", img: "assets/img/practice/exam-12/l1-A.jpg" },
              { label: "C", img: "assets/img/practice/exam-12/l1-E.jpg" },
              { label: "D", img: "assets/img/practice/exam-12/l1-B.jpg" },
              { label: "E", img: "assets/img/practice/exam-12/l1-C.jpg" },
              { label: "F", img: "assets/img/practice/exam-12/l1-F.jpg" }
            ]
          },
          options: ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"],
          extra: "Kein Text",
          rows: [
            ["A", "Bild A", 4],
            ["B", "Bild B", 1],
            ["C", "Bild C", 5],
            ["D", "Bild D", 2],
            ["E", "Bild E", 3],
            ["F", "Bild F", "-"]
          ],
          prefix: "l1"
        }),
        notesTask({
          title: "Aufgabe 2",
          instructions: "Sie hören eine Nachricht vom Jobcenter zwei Mal. Schreiben Sie die wichtigsten Informationen auf das Notizblatt.",
          audio: "assets/audio/generated/exam-12-task-2.mp3",
          transcript:
            "Guten Tag, hier ist das Jobcenter Plus. Ihr Beratungstermin ist am Freitag, dem zweiundzwanzigsten November, um neun Uhr vierzig. Sie sprechen mit Frau Berger in Raum sieben. Bitte bringen Sie Ihren Ausweis und den Lebenslauf mit. Unsere Adresse ist Neubaugasse fünf. Bei Fragen rufen Sie null eins, drei sechs acht neun fünf null an. Auf Wiederhören. (Sie hören den Text zwei Mal.)",
          rows: [
            ["p12l2a", "Was?", "Beratungstermin", ["beratungstermin", "termin", "jobcenter termin"]],
            ["p12l2b", "Wann? (Tag)", "Freitag", ["freitag", "fr"]],
            ["p12l2c", "Datum und Uhrzeit", "22. November, 9:40 Uhr", ["22 november 940 uhr", "22. november 9:40 uhr", "22 november 9 40", "22 11 940 uhr"]],
            ["p12l2d", "Person/Raum", "Frau Berger, Raum 7", ["frau berger raum 7", "berger raum 7", "raum 7"]],
            ["p12l2e", "Mitbringen", "Ausweis und Lebenslauf", ["ausweis und lebenslauf", "ausweis lebenslauf", "lebenslauf und ausweis"]]
          ]
        }),
        matrixTask({
          title: "Aufgabe 3",
          instructions: "Sie hören fünf kurze Interviews einmal. Wählen Sie pro Person eine Antwort.",
          prompt: "Worum geht es?",
          audio: "assets/audio/generated/exam-12-task-3.mp3",
          transcript:
            "Frage: Worum geht es heute?\n\n" +
            "Text 1: „Ich habe eine Nachricht bekommen. Mein Paket ist da und ich brauche den Code.“\n\n" +
            "Text 2: „Ich lerne heute, wie ich ein Online-Formular ausfülle.“\n\n" +
            "Text 3: „Morgen habe ich einen Termin im Jobcenter wegen meiner Bewerbung.“\n\n" +
            "Text 4: „Mein Handy ist alt. Ich brauche eine neue SIM-Karte.“\n\n" +
            "Text 5: „Ich möchte meine Bewerbung ausdrucken, aber der Drucker ist besetzt.“",
          columns: ["Paket", "Kurs", "Arbeit", "Handy"],
          rows: [
            ["Text 1", "Person 1", "paket"],
            ["Text 2", "Person 2", "kurs"],
            ["Text 3", "Person 3", "arbeit"],
            ["Text 4", "Person 4", "handy"],
            ["Text 5", "Person 5", "arbeit"]
          ]
        })
      ]
    },
    writing: practiceWriting({
      formPrompt: "Sie buchen einen Beratungstermin im Jobcenter. Angaben: Sami Yildiz, geboren am 22.11.1994, Telefon +43 681 368950, E-Mail sami.yildiz@example.com, Thema Bewerbung, Termin Freitag 22.11., 9:40 Uhr, Beraterin Frau Berger, Raum 7, Mitbringen Ausweis und Lebenslauf.",
      fields: [
        ["Name", "Sami Yildiz", ["sami yildiz"]],
        ["Geburtsdatum", "22.11.1994", ["22 11 1994", "22.11.1994", "22111994"]],
        ["Telefon", "+43 681 368950", ["43 681 368950", "0681 368950"]],
        ["E-Mail", "sami.yildiz@example.com", ["sami.yildiz@example.com"]],
        ["Thema", "Bewerbung", ["bewerbung", "arbeit"]],
        ["Wochentag", "Freitag", ["freitag", "fr"]],
        ["Datum", "22.11.", ["22 11", "22.11", "22.11."]],
        ["Uhrzeit", "9:40 Uhr", ["9 40 uhr", "940 uhr", "9:40"]],
        ["Beraterin/Raum", "Frau Berger, Raum 7", ["frau berger raum 7", "berger raum 7", "raum 7"]],
        ["Mitbringen", "Ausweis und Lebenslauf", ["ausweis und lebenslauf", "ausweis lebenslauf"]]
      ],
      emailPrompt: "Sie haben eine neue Adresse. Schreiben Sie einen Brief von mindestens 30 Wörtern an Ihre Versicherung: wer Sie sind, Ihre alte und neue Adresse, ab wann die neue Adresse gilt, und bitten Sie um eine schriftliche Bestätigung.",
      checklist: ["Formelle Anrede", "Person vorgestellt", "Alte und neue Adresse", "Datum ab wann", "Formeller Gruß + Name"],
      sample: "Sehr geehrte Damen und Herren,\nich heiße Sami Yildiz. Ich habe eine neue Adresse. Meine alte Adresse war Lindenstraße 4 in Wien. Ab dem 1. Mai wohne ich in der Marktgasse 9 in Graz. Bitte schicken Sie mir eine Bestätigung.\nMit freundlichen Grüßen\nSami Yildiz",
      textTitle: "Aufgabe 2: Brief"
    }),
    speaking: practiceSpeaking([
      "Sie haben einen Termin im Jobcenter. Fragen Sie nach dem Raum, den Unterlagen und einem neuen Termin.",
      "Beschreiben Sie ein Bild: Eine Person holt ein Paket an einer Paketstation ab."
    ], { sprachenSample: 4, hobbysSample: 5, berufSample: 5, sportSample: 3, familieSample: 1, lieblingsessenSample: 3, nameSample: 6, alterSample: 1, landSample: 2, wohnortSample: 3, tagesablaufSample: 4, wochenendeSample: 5,
      task2Model: "Beispiel:<br><strong>Was?</strong> „Ich sehe eine Paketstation.“<br><strong>Wie viele Personen?</strong> „Eine Person, eine Frau.“<br><strong>Wo?</strong> „Sie steht vor der Paketstation.“<br><strong>Was machen sie?</strong> „Sie holt ein Paket ab und gibt eine Nummer in das Display ein.“",
      task3Model: "Beispiel:<br><strong>Begrüßung:</strong> „Guten Tag!“<br><strong>Wunsch / Frage:</strong> „Ich habe heute einen Termin. In welchem Raum ist der Termin? Welche Unterlagen brauche ich? Können wir auch einen neuen Termin machen?“<br><strong>Reaktion:</strong> „Aha, Raum sieben. Ich komme nächste Woche noch einmal.“<br><strong>Abschluss:</strong> „Vielen Dank, auf Wiedersehen!“" })
  })
];

function practiceWriting({ formPrompt, fields, emailPrompt, checklist, sample, textTitle = "Aufgabe 2: E-Mail" }) {
  return {
    minutes: 20,
    tasks: [
      {
        type: "form",
        title: "Aufgabe 1: Formular",
        prompt: formPrompt,
        fields: fields.map(([label, answer, accepted]) => ({ label, answer, accepted }))
      },
      {
        type: "text",
        // Exams 1-5 use the default "E-Mail" title; exams 6-12 pass "Aufgabe 2: Brief".
        title: textTitle,
        prompt: emailPrompt,
        minWords: 30,
        checklist,
        sample
      }
    ]
  };
}

function modelLinesToHtml(text) {
  return text
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("<br>");
}

function getSpeakingTopicSample(topic, sampleNumber) {
  const samples = speakingTask1TopicSamples[topic] || [];
  return samples[sampleNumber - 1] || samples[0] || "";
}

function practiceSpeakingTask1Model({
  nameSample = 1,
  alterSample = 1,
  landSample = 1,
  wohnortSample = 1,
  familieSample = 1,
  berufSample = 1,
  sprachenSample = 1,
  hobbysSample = 1,
  sportSample = 1,
  lieblingsessenSample = 1,
  tagesablaufSample = 1,
  wochenendeSample = 1
} = {}) {
  return [
    ["Name", "name", nameSample],
    ["Alter", "alter", alterSample],
    ["Land", "land", landSample],
    ["Wohnort", "wohnort", wohnortSample],
    ["Familie", "familie", familieSample],
    ["Beruf", "beruf", berufSample],
    ["Sprachen", "sprachen", sprachenSample],
    ["Hobbys", "hobbys", hobbysSample],
    ["Sport", "sport", sportSample],
    ["Lieblingsessen", "lieblingsessen", lieblingsessenSample],
    ["Tagesablauf", "tagesablauf", tagesablaufSample],
    ["Wochenende", "wochenende", wochenendeSample]
  ]
    .map(([label, topic, sampleNumber]) => `<strong>${label}</strong><br>${modelLinesToHtml(getSpeakingTopicSample(topic, sampleNumber))}`)
    .join("<br><br>");
}

function practiceSpeaking([roleText, pictureText], images = {}) {
  return {
    minutes: 10,
    tasks: [
      {
        title: "Aufgabe 1: Über etwas sprechen (sich vorstellen)",
        prompt: "Wählen Sie 4 Themen aus und sprechen Sie zu jedem Thema ein paar Sätze.",
        image: images.task1,
        cards: ["Name", "Alter", "Land", "Wohnort", "Familie", "Beruf", "Sprachen", "Hobbys", "Sport", "Lieblingsessen", "Tagesablauf", "Wochenende"],
        model: practiceSpeakingTask1Model(images)
      },
      {
        title: "Aufgabe 2: Über etwas sprechen (Situationen beschreiben)",
        prompt: pictureText + " Sagen Sie: Was sehen Sie? Wie viele Personen? Wo sind sie? Was machen sie?",
        image: images.task2,
        cards: ["Was?", "Wie viele Personen?", "Wo?", "Was machen sie?"],
        // The full per-exam sample answer (structured by the four cards) is
        // passed in from each practiceExam call; this generic line is a fallback.
        model: images.task2Model || "Beispiel: „Ich sehe … Es sind … Personen. Sie sind … Sie … gerade.“"
      },
      {
        title: "Aufgabe 3: Miteinander sprechen (Alltagssituationen)",
        prompt: roleText,
        image: images.task3,
        cards: ["Begrüßung", "Wunsch / Frage", "Reaktion", "Abschluss"],
        model: images.task3Model || "Beispiel: „Guten Tag! Ich möchte … Können Sie mir helfen? … Vielen Dank, auf Wiedersehen!“"
      },
      {
        // Extra practice, NOT part of the official ÖSD exam. A free A1 conversation
        // with the AI tutor (chat mode). It opens with a fixed question, then
        // follows a rotating set of A1 everyday situations so the questions stay
        // useful and do not loop around the same personal-info pattern.
        title: "Aufgabe 4: Gesprächstraining (Extra-Übung)",
        prompt: "Führen Sie ein kurzes Gespräch mit dem KI-Tutor. Antworten Sie mit einfachen A1-Sätzen. Sie können am Ende auch „Und du?“ sagen. Diese Aufgabe ist kein Teil der echten Prüfung.",
        mode: "chat",
        opener: "Hallo! Ich bin dein Gesprächspartner. Wie heißt du und wo wohnst du?",
        model: "Tipp: Antworten Sie mit 2-3 einfachen Sätzen. Beispiel: „Ich heiße … Ich wohne in … Und du?“"
      }
    ]
  };
}

const exams = [officialExam, ...practiceExams];

/* ---------- state ---------- */

const storageKey = "osd-a1-practice-v4";
const themeStorageKey = "osd-a1-theme";
let state = loadState();
let theme = loadTheme();
let timerHandle = null;
let mediaRecorder = null;
let recordingStream = null;
let recordingChunks = [];
let recordingTaskId = null;
// Guided speaking loop: which card (by index) the learner should speak about next.
// Keyed by recordId, e.g. "exam-3-speaking-0". Transient (not saved to storage).
const speakingCardProgress = {};
// Free-chat loop (Aufgabe 4): remembers the tutor's last question so the next
// answer is corrected in context. Keyed by recordId.
const chatPrevQuestion = {};
// Rotating A1 situations for Aufgabe 4. The visible button list lets the learner
// jump to any situation; after that, the tutor continues through this sequence.
const A1_CHAT_SITUATIONS = [
  {
    title: "Kennenlernen",
    opener: "Hallo! Ich bin dein Gesprächspartner. Wie heißt du und wo wohnst du?",
    detail: "Name, Alter, Herkunft, Wohnort, Adresse, Telefonnummer, einfache Rückfragen"
  },
  {
    title: "Hobbys",
    opener: "Was machst du gern in deiner Freizeit?",
    detail: "Musik, Lesen, Kochen, Freunde treffen, Filme, Wochenende, wie oft"
  },
  {
    title: "Sport",
    opener: "Machst du gern Sport? Welchen Sport magst du?",
    detail: "Fußball, Schwimmen, Fitnessstudio, Fahrrad, Spaziergang, Training, gesund"
  },
  {
    title: "Supermarkt",
    opener: "Du bist im Supermarkt. Was kaufst du gern ein?",
    detail: "Preis fragen, Obst, Brot, Milch, ein Kilo, Tasche, Kasse, bar oder Karte"
  },
  {
    title: "Café / Restaurant",
    opener: "Du bist im Café. Was möchtest du trinken oder essen?",
    detail: "bestellen, Speisekarte, Wasser, Kaffee, Rechnung, Tisch reservieren"
  },
  {
    title: "Wegbeschreibung",
    opener: "Du bist neu in der Stadt. Wohin möchtest du gehen?",
    detail: "nach dem Weg fragen, Bahnhof, Apotheke, Supermarkt, links, rechts, geradeaus"
  },
  {
    title: "Um Hilfe bitten",
    opener: "Brauchst du manchmal Hilfe? Wobei brauchst du Hilfe?",
    detail: "Formular, Handy, Tasche tragen, langsam sprechen, wiederholen, Tür öffnen"
  },
  {
    title: "Termin",
    opener: "Wann hast du diese Woche Zeit?",
    detail: "Arzt, Deutschkurs, Büro, Tag, Uhrzeit, Termin machen, Termin absagen"
  },
  {
    title: "Familie",
    opener: "Erzähl kurz von deiner Familie. Ist deine Familie groß oder klein?",
    detail: "Eltern, Geschwister, Kinder, verheiratet, wohnen zusammen, besuchen"
  },
  {
    title: "Arbeit / Kurs",
    opener: "Arbeitest du oder lernst du? Was machst du?",
    detail: "Beruf, Firma, Büro, Arbeitszeit, Deutschkurs, Raum, Hausaufgaben"
  },
  {
    title: "Wohnen",
    opener: "Wie wohnst du? Wohnst du allein oder mit Familie?",
    detail: "Wohnung, Zimmer, Miete, Adresse, Nachbarn, Schlüssel, Reparatur"
  },
  {
    title: "Verkehr",
    opener: "Fährst du oft mit Bus, U-Bahn oder Zug?",
    detail: "Ticket, Haltestelle, Gleis, Verspätung, Abfahrt, Ankunft, Preis"
  },
  {
    title: "Kleidung kaufen",
    opener: "Du kaufst Kleidung. Welche Farbe und Größe brauchst du?",
    detail: "Größe, Farbe, Hose, Jacke, Schuhe, anprobieren, Preis, bezahlen"
  },
  {
    title: "Gesundheit",
    opener: "Wie geht es dir heute? Tut dir etwas weh?",
    detail: "Kopfweh, Fieber, Apotheke, Arzttermin, Tabletten, krank, gesund"
  },
  {
    title: "Einladung",
    opener: "Möchtest du jemanden einladen? Wohin möchtet ihr gehen?",
    detail: "Kino, Kaffee, Spaziergang, mitkommen, Zeit haben, Treffpunkt"
  },
  {
    title: "Geburtstag",
    opener: "Du hast Geburtstag. Wen möchtest du einladen?",
    detail: "Freund einladen, Party, Datum, Uhrzeit, Ort, Geschenk, etwas mitbringen"
  },
  {
    title: "Regeln / Rauchen verboten",
    opener: "Du siehst ein Schild: Rauchen verboten. Was sagst du?",
    detail: "nicht rauchen, leise sein, Handy aus, hier verboten, draußen erlaubt, höflich bitten"
  },
  {
    title: "Post / Bank / Amt",
    opener: "Du musst etwas erledigen. Gehst du zur Post, zur Bank oder zum Amt?",
    detail: "Paket schicken, Konto, Formular, Ausweis, Adresse anmelden, Öffnungszeiten"
  },
  {
    title: "Schule / Kinder",
    opener: "Lernst du Deutsch in einem Kurs? Wann ist dein Kurs?",
    detail: "Kurs, Schule, Kindergarten, Kinderbetreuung, Lehrer, Hausaufgaben, Raum"
  },
  {
    title: "Tagesablauf",
    opener: "Was machst du morgens zuerst?",
    detail: "aufstehen, frühstücken, arbeiten, lernen, einkaufen, schlafen, Uhrzeiten"
  },
  {
    title: "Wetter / Pläne",
    opener: "Wie ist das Wetter heute? Was machst du am Wochenende?",
    detail: "warm, kalt, Regen, Sonne, Wochenende, Park, zu Hause bleiben"
  },
  {
    title: "Hotel / Reise",
    opener: "Du bist auf Reise. Was brauchst du im Hotel?",
    detail: "Zimmer, Frühstück, Schlüssel, Ankunft, Koffer, Stadtplan, bezahlen"
  },
  {
    title: "Telefon / Online",
    opener: "Benutzt du oft dein Handy? Wofür brauchst du es?",
    detail: "anrufen, Nachricht schreiben, Online-Termin, E-Mail, App, WLAN"
  },
  {
    title: "Höflich sprechen",
    opener: "Wie fragst du höflich, wenn du etwas nicht verstehst?",
    detail: "bitte, danke, Entschuldigung, langsam sprechen, wiederholen, kein Problem"
  }
];
const chatTurnIndex = {};
const chatPromptSituationIndex = {};

const app = document.querySelector("#app");
const examSelect = document.querySelector("#examSelect");
const sectionNav = document.querySelector("#sectionNav");
const scoreValue = document.querySelector("#scoreValue");
const scoreMeter = document.querySelector("#scoreMeter");
const progressText = document.querySelector("#progressText");
const toast = document.querySelector("#toast");
const themeToggle = document.querySelector("#themeToggle");

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey));
    return {
      examId: parsed?.examId || exams[0].id,
      section: parsed?.section || "overview",
      answers: parsed?.answers || {},
      writing: parsed?.writing || {},
      checks: parsed?.checks || {},
      notes: parsed?.notes || {},
      submitted: parsed?.submitted || {},
      modelOpen: parsed?.modelOpen || {},
      // AI score for Schreiben Aufgabe 2 (E-Mail/Brief), keyed by exam id.
      writingScores: parsed?.writingScores || {},
      // Sprechen Aufgabe 1 "Prüfungsmodus": the 4 cards the learner chose, keyed by recordId.
      speakingExamCards: parsed?.speakingExamCards || {},
      // Transcripts collected during a scored speaking task, keyed by recordId.
      speakingRecords: parsed?.speakingRecords || {},
      // AI scores for Sprechen Aufgaben 1/2/3, keyed by recordId.
      speakingScores: parsed?.speakingScores || {}
    };
  } catch {
    return freshState();
  }
}

function freshState() {
  return {
    examId: exams[0].id,
    section: "overview",
    answers: {},
    writing: {},
    checks: {},
    notes: {},
    submitted: {},
    modelOpen: {},
    writingScores: {},
    speakingExamCards: {},
    speakingRecords: {},
    speakingScores: {}
  };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function loadTheme() {
  try {
    const saved = localStorage.getItem(themeStorageKey);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // Fall back below when storage is unavailable.
  }
  const pageTheme = document.documentElement.dataset.theme;
  if (pageTheme === "dark" || pageTheme === "light") return pageTheme;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(nextTheme, persist = true) {
  theme = nextTheme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  if (persist) {
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {
      // The UI can still switch theme for this session.
    }
  }

  if (!themeToggle) return;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Helles Design aktivieren" : "Dunkles Design aktivieren");
  const label = themeToggle.querySelector(".theme-toggle-text");
  if (label) label.textContent = isDark ? "Hell" : "Dunkel";
}

function currentExam() {
  return exams.find((exam) => exam.id === state.examId) || exams[0];
}

function keyFor(section, id) {
  return `${currentExam().id}:${section}:${id}`;
}

function submitKey(section) {
  return `${currentExam().id}:${section}`;
}

function getQuestions(exam, section) {
  return exam[section].tasks.flatMap((task) => task.questions || []);
}

function answeredCount(exam, section) {
  return getQuestions(exam, section).filter((question) => state.answers[`${exam.id}:${section}:${question.id}`]).length;
}

const OSD6 = { 0: 0, 1: 0, 2: 2, 3: 4, 4: 6, 5: 8, 6: 10 };

function osdTaskPoints(correct, total) {
  if (total >= 6) return OSD6[Math.min(correct, 6)] ?? 0;
  return Math.max(0, Math.min(10, correct * 2));
}

function taskPoints(task, examId, section) {
  const questions = task.questions || [];
  if (!questions.length) return 0;
  const correct = questions.filter((question) => isQuestionCorrect(question, state.answers[`${examId}:${section}:${question.id}`])).length;
  return osdTaskPoints(correct, questions.length);
}

function sectionScore(exam, section) {
  const tasks = exam[section].tasks;
  const correct = tasks.reduce((sum, task) => sum + (task.questions || []).filter((question) => isQuestionCorrect(question, state.answers[`${exam.id}:${section}:${question.id}`])).length, 0);
  const total = tasks.reduce((sum, task) => sum + (task.questions || []).length, 0);
  const points = tasks.reduce((sum, task) => sum + taskPoints(task, exam.id, section), 0);
  const maxPoints = tasks.reduce((sum, task) => sum + (task.points || 0), 0);
  return { correct, total, points, maxPoints };
}

function formScore(exam) {
  const formTask = exam.writing.tasks.find((task) => task.type === "form");
  if (!formTask) return { solution: 0, max: 10, points: 0 };
  let solution = 0;
  let max = 0;
  formTask.fields.forEach((field, index) => {
    const weight = field.both ? 2 : 1;
    max += weight;
    const value = normalizeAnswer(state.writing[keyFor("writing", `form-0-${index}`)] || "");
    if (!value) return;
    if (field.both) {
      const hits = field.both.filter((needle) => value.includes(normalizeAnswer(needle))).length;
      solution += hits >= 2 ? 2 : hits;
    } else if ([field.answer, ...(field.accepted || [])].some((answer) => normalizeAnswer(answer) === value)) {
      solution += 1;
    }
  });
  const table = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5];
  return { solution, max, points: table[Math.min(solution, 10)] ?? 0 };
}

function autoScore(exam) {
  const lesen = sectionScore(exam, "reading");
  const hoeren = sectionScore(exam, "listening");
  const form = formScore(exam);
  // AI-graded Schreiben Aufgabe 2 score (0-10), if the learner has run the
  // checker on this exam yet. Defaults to 0 so the running total starts low.
  const writing2 = Math.max(0, Math.min(10, Number(state.writingScores?.[exam.id] || 0)));
  // AI-graded Sprechen scores. Real ÖSD weights: Aufgabe 1 = 5, Aufgabe 2 = 10,
  // Aufgabe 3 = 10. Aufgabe 4 is extra practice and not scored.
  const speakingScore = (taskIndex) => {
    const recordId = `${exam.id}-speaking-${taskIndex}`;
    const max = SPEAKING_TASK_MAX[taskIndex] || 0;
    const raw = Number(state.speakingScores?.[recordId]?.score || 0);
    return Math.max(0, Math.min(max, raw));
  };
  const sprechen1 = speakingScore(0);
  const sprechen2 = speakingScore(1);
  const sprechen3 = speakingScore(2);
  const sprechen = sprechen1 + sprechen2 + sprechen3; // max 25
  return {
    lesen: lesen.points,
    hoeren: hoeren.points,
    form: form.points,
    writing2,
    schreiben: form.points + writing2, // combined Schreiben (max 15)
    sprechen1,
    sprechen2,
    sprechen3,
    sprechen,
    total: lesen.points + hoeren.points + form.points + writing2 + sprechen,
    max: 100
  };
}

function optionLabel(question, task, value) {
  const options = question.options || task.options || [];
  return options.find((option) => option.value === value)?.label || value || "keine Antwort";
}

function normalizeAnswer(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replaceAll(".", "")
    .replaceAll(",", "")
    .replaceAll(":", "")
    .replaceAll("/", " ")
    .replaceAll("-", " ")
    .replace(/\s+/g, " ");
}

function isQuestionCorrect(question, value) {
  if (question.answerType === "text") {
    const normalized = normalizeAnswer(value);
    if (!normalized) return false;
    return (question.accepted || [question.answer]).some((answer) => normalizeAnswer(answer) === normalized);
  }
  return value === question.answer;
}

// ============================================================================
// Vocabulary feature
// ----------------------------------------------------------------------------
// When the "Übersetzen" toggle is on, clicking a word inside the main content
// area calls /api/translate-word. The word + its English meaning + two A1
// example sentences are auto-saved to a localStorage deck. The "Wörter" button
// in the top bar opens a modal with two tabs:
//   - "Lernen": flip cards (front = German, back = English + examples), rate
//                with Nochmal / Gut / Leicht (no scheduling - just review).
//   - "Alle Wörter": full list with delete buttons.
// ============================================================================

const VOCAB_KEY = "osd-a1-vocab";
let vocab = loadVocab();
let translateMode = false;
let translatePopover = null;
let vocabModalEl = null;
let vocabTab = "lernen"; // "lernen" | "alle"
// Flashcard session state - rebuilt every time the Lernen tab opens.
let flashDeck = [];
let flashIndex = 0;
let flashFront = true;

function loadVocab() {
  try { return JSON.parse(localStorage.getItem(VOCAB_KEY) || "[]"); }
  catch { return []; }
}
function saveVocab() {
  try { localStorage.setItem(VOCAB_KEY, JSON.stringify(vocab)); }
  catch { /* storage full - ignore */ }
}

// Idempotent: if the word already exists (case-insensitive), refresh missing
// fields instead of creating a duplicate.
function addVocab({ german, english, examples }) {
  const key = german.toLowerCase();
  const existing = vocab.find((c) => c.german.toLowerCase() === key);
  if (existing) {
    if (!existing.english && english) existing.english = english;
    if ((!existing.examples || !existing.examples.length) && examples?.length) existing.examples = examples;
    saveVocab();
    return existing;
  }
  const card = {
    id: `v_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    german,
    english: english || "",
    examples: Array.isArray(examples) ? examples : [],
    addedAt: Date.now()
  };
  vocab.push(card);
  saveVocab();
  return card;
}
function removeVocab(id) {
  vocab = vocab.filter((c) => c.id !== id);
  saveVocab();
}
function updateVocabCountBadge() {
  const el = document.getElementById("vocabCount");
  if (el) el.textContent = vocab.length;
}

// ----- Text-to-speech for vocab words ---------------------------------------
// Calls the backend /api/tts-word endpoint, which proxies to OpenRouter's
// OpenAI TTS model (gpt-4o-mini-tts). The returned MP3 is cached per word in
// a Map of object URLs so re-clicking the same word doesn't hit the API again.

const ttsAudioCache = new Map(); // word (lowercased) -> object URL
let ttsCurrentAudio = null;      // the currently playing HTMLAudioElement, if any

async function speakWord(word) {
  if (!word) return;
  const key = word.toLowerCase();

  // Stop anything still playing so quick clicks feel snappy.
  if (ttsCurrentAudio) {
    try { ttsCurrentAudio.pause(); } catch { /* ignore */ }
    ttsCurrentAudio = null;
  }

  try {
    let url = ttsAudioCache.get(key);
    if (!url) {
      const response = await fetch("/api/tts-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word })
      });
      if (!response.ok) {
        // Try to read the error body for a useful toast.
        let msg = "TTS-Fehler.";
        try { const data = await response.json(); msg = data.error || msg; } catch { /* ignore */ }
        showToast(msg);
        return;
      }
      const blob = await response.blob();
      url = URL.createObjectURL(blob);
      ttsAudioCache.set(key, url);
    }
    const audio = new Audio(url);
    ttsCurrentAudio = audio;
    audio.addEventListener("ended", () => { if (ttsCurrentAudio === audio) ttsCurrentAudio = null; });
    await audio.play();
  } catch (error) {
    showToast(`TTS-Fehler: ${error.message}`);
  }
}

// Build a small speaker-icon button that plays the given word when clicked.
function makeSpeakerButton(word) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "speaker-btn";
  btn.title = "Aussprechen";
  btn.setAttribute("aria-label", `Aussprechen: ${word}`);
  btn.innerHTML = `<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M8 1.5L4.2 4.5H1.5v7h2.7L8 14.5z" fill="currentColor"/>
    <path d="M10.2 5.2a3.2 3.2 0 0 1 0 5.6M11.8 2.8a6 6 0 0 1 0 10.4" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`;
  btn.addEventListener("click", (e) => {
    // Don't trigger parent click handlers (e.g. flashcard flip).
    e.stopPropagation();
    speakWord(word);
  });
  return btn;
}

function renderSpeakerButtonHtml(text, action = "speak-chat-prompt") {
  return `
    <button type="button" class="speaker-btn" data-action="${action}" data-speak-text="${escapeAttr(text)}" title="Aussprechen" aria-label="Aussprechen">
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d="M8 1.5L4.2 4.5H1.5v7h2.7L8 14.5z" fill="currentColor"/>
        <path d="M10.2 5.2a3.2 3.2 0 0 1 0 5.6M11.8 2.8a6 6 0 0 1 0 10.4" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      </svg>
    </button>
  `;
}

// ----- Translate mode toggle ------------------------------------------------

function setTranslateMode(on) {
  translateMode = Boolean(on);
  const btn = document.getElementById("translateToggle");
  if (btn) {
    btn.setAttribute("aria-pressed", translateMode ? "true" : "false");
    btn.textContent = `Übersetzen: ${translateMode ? "an" : "aus"}`;
    btn.classList.toggle("is-on", translateMode);
  }
  document.body.classList.toggle("translate-mode", translateMode);
  if (!translateMode) closeTranslatePopover();
}

// ----- Click-to-translate ---------------------------------------------------

// Pull the word at a screen position out of the underlying text node. Returns
// {word, context} or null if the click wasn't on actual letter content.
function extractWordAtPoint(x, y) {
  // Prefer the standard, fall back for Firefox-style implementations.
  let textNode = null;
  let offset = 0;
  if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(x, y);
    if (range && range.startContainer.nodeType === 3) {
      textNode = range.startContainer;
      offset = range.startOffset;
    }
  } else if (document.caretPositionFromPoint) {
    const pos = document.caretPositionFromPoint(x, y);
    if (pos && pos.offsetNode?.nodeType === 3) {
      textNode = pos.offsetNode;
      offset = pos.offset;
    }
  }
  if (!textNode) return null;

  const text = textNode.nodeValue || "";
  if (!text) return null;

  // Letter test that includes German Umlauts and ß plus Unicode letters.
  const letter = /[\p{L}]/u;
  let i = Math.max(0, Math.min(offset, text.length - 1));
  if (!letter.test(text[i] || "")) {
    // Click landed on a space/punct: try the char to the left.
    if (i > 0 && letter.test(text[i - 1])) i -= 1;
    else return null;
  }
  let start = i, end = i + 1;
  while (start > 0 && letter.test(text[start - 1])) start--;
  while (end < text.length && letter.test(text[end])) end++;
  const word = text.slice(start, end);
  if (!word || word.length < 2) return null; // ignore single letters

  const ctxStart = Math.max(0, start - 80);
  const ctxEnd = Math.min(text.length, end + 80);
  return { word, context: text.slice(ctxStart, ctxEnd).trim() };
}

// Should this element accept translate-clicks? We want to leave interactive
// controls (inputs, buttons, audio, etc.) alone.
function isTranslatableTarget(el) {
  if (!el || !(el instanceof Element)) return false;
  // Must live inside the main content area.
  if (!el.closest("#app")) return false;
  // Skip interactive controls, form fields, and anything that already has its
  // own click behavior (overview cards via data-exam, etc.).
  if (el.closest("input, textarea, select, button, label, audio, a, [data-action], [data-exam], [data-section], [contenteditable]")) return false;
  return true;
}

function handleTranslateClick(event) {
  if (!translateMode) return;
  if (!isTranslatableTarget(event.target)) return;
  // Grab coords synchronously - the event object is short-lived.
  const cx = event.clientX;
  const cy = event.clientY;
  // We're handling this click; don't let it propagate to other app handlers.
  event.preventDefault();
  event.stopPropagation();
  // 200 ms grace lets a drag-selection finish committing so window.getSelection()
  // is populated before we decide between phrase and single-word mode.
  setTimeout(() => {
    const selText = (window.getSelection()?.toString() || "").trim();
    const isMulti = selText.length > 0 && /\s/.test(selText);
    if (isMulti) {
      // Multi-word selection -> one-off lookup. NOT saved to the vocab deck.
      openTranslatePopover(cx, cy, selText, "", { mode: "phrase", save: false });
    } else {
      // Single click on a word -> normal flow (translate + auto-save).
      const found = extractWordAtPoint(cx, cy);
      if (!found) return;
      openTranslatePopover(cx, cy, found.word, found.context, { mode: "word", save: true });
    }
  }, 200);
}

function openTranslatePopover(x, y, text, context, opts = {}) {
  const mode = opts.mode === "phrase" ? "phrase" : "word";
  const save = opts.save !== false; // default true (word mode)
  closeTranslatePopover();
  const el = document.createElement("div");
  el.className = "translate-popover";
  el.setAttribute("role", "dialog");
  if (mode === "phrase") el.classList.add("is-phrase");
  el.innerHTML = `
    <div class="translate-head">
      <strong class="translate-word"></strong>
      <button type="button" class="translate-close" aria-label="Schließen">×</button>
    </div>
    <div class="translate-body">Übersetzen …</div>
  `;
  el.querySelector(".translate-word").textContent = text;
  // Speaker icon right after the title (works for both word and phrase).
  el.querySelector(".translate-word").after(makeSpeakerButton(text));
  document.body.append(el);

  // Position near the click but keep it on screen.
  const rect = el.getBoundingClientRect();
  const left = Math.max(8, Math.min(x, window.innerWidth - rect.width - 8));
  const top = Math.min(y + 12, window.innerHeight - rect.height - 8);
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;

  translatePopover = el;

  // Click X to close.
  el.querySelector(".translate-close").addEventListener("click", closeTranslatePopover);

  // Fetch translation. In word mode we auto-save; in phrase mode it's a one-off.
  fetch("/api/translate-word", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word: text, context, mode })
  })
    .then(async (r) => {
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Fehler.");
      return data;
    })
    .then((data) => {
      if (save) {
        const card = addVocab({ german: text, english: data.translation, examples: data.examples });
        renderTranslatePopoverBody(el, card);
        updateVocabCountBadge();
        if (vocabModalEl) renderVocabModalBody();
      } else {
        // One-off: render translation only, no save footer, no vocab side-effects.
        renderTranslatePopoverOneOff(el, data);
      }
    })
    .catch((err) => {
      const body = el.querySelector(".translate-body");
      body.textContent = `Fehler: ${err.message}`;
    });
}

function renderTranslatePopoverBody(el, card) {
  const body = el.querySelector(".translate-body");
  body.innerHTML = "";
  const en = document.createElement("p");
  en.className = "translate-en";
  en.textContent = card.english || "(keine Übersetzung)";
  body.append(en);
  if (card.examples?.length) {
    const ul = document.createElement("ul");
    ul.className = "translate-examples";
    for (const s of card.examples) {
      const li = document.createElement("li");
      li.textContent = s;
      ul.append(li);
    }
    body.append(ul);
  }
  const status = document.createElement("div");
  status.className = "translate-status";
  const saved = document.createElement("span");
  saved.className = "muted";
  saved.textContent = "Gespeichert ✓ ";
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "link-btn";
  removeBtn.textContent = "Entfernen";
  removeBtn.addEventListener("click", () => {
    removeVocab(card.id);
    updateVocabCountBadge();
    closeTranslatePopover();
    if (vocabModalEl) renderVocabModalBody();
  });
  status.append(saved, removeBtn);
  body.append(status);
}

// One-off renderer used for multi-word selections. Shows the translation only,
// no example list, and no "Gespeichert / Entfernen" footer because the lookup
// is intentionally not added to the vocab deck.
function renderTranslatePopoverOneOff(el, data) {
  const body = el.querySelector(".translate-body");
  body.innerHTML = "";
  const en = document.createElement("p");
  en.className = "translate-en";
  en.textContent = data.translation || "(keine Übersetzung)";
  body.append(en);
  const note = document.createElement("div");
  note.className = "translate-status muted";
  note.textContent = "Einmalige Übersetzung – nicht gespeichert.";
  body.append(note);
}

function closeTranslatePopover() {
  if (translatePopover) translatePopover.remove();
  translatePopover = null;
}

// ----- Vocab modal ----------------------------------------------------------

function openVocabModal() {
  if (vocabModalEl) return;
  vocabTab = "lernen";
  startFlashSession();
  const wrap = document.createElement("div");
  wrap.className = "vocab-modal-backdrop";
  wrap.innerHTML = `
    <div class="vocab-modal" role="dialog" aria-label="Meine Wörter">
      <div class="vocab-modal-head">
        <strong>Meine Wörter</strong>
        <button type="button" class="translate-close" data-action="close-vocab" aria-label="Schließen">×</button>
      </div>
      <div class="vocab-tabs">
        <button type="button" class="vocab-tab" data-vocab-tab="lernen">Lernen</button>
        <button type="button" class="vocab-tab" data-vocab-tab="alle">Alle Wörter</button>
      </div>
      <div class="vocab-modal-body"></div>
    </div>
  `;
  document.body.append(wrap);
  vocabModalEl = wrap;
  renderVocabModalBody();
  // Click backdrop (outside dialog) to close.
  wrap.addEventListener("click", (e) => { if (e.target === wrap) closeVocabModal(); });
}

function closeVocabModal() {
  if (vocabModalEl) vocabModalEl.remove();
  vocabModalEl = null;
}

function renderVocabModalBody() {
  if (!vocabModalEl) return;
  // Tab active state
  vocabModalEl.querySelectorAll(".vocab-tab").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.vocabTab === vocabTab);
  });
  const body = vocabModalEl.querySelector(".vocab-modal-body");
  body.innerHTML = "";
  if (vocabTab === "lernen") body.append(renderFlashView());
  else body.append(renderAllView());
}

function startFlashSession() {
  // Shuffle a copy of vocab so the order changes each session.
  flashDeck = [...vocab].sort(() => Math.random() - 0.5);
  flashIndex = 0;
  flashFront = true;
}

function renderFlashView() {
  const frag = document.createElement("div");
  frag.className = "flash-view";

  if (!vocab.length) {
    frag.innerHTML = `<p class="muted">Noch keine Wörter. Schalten Sie <strong>„Übersetzen"</strong> in der Kopfleiste ein und klicken Sie auf ein Wort im Text – es wird automatisch gespeichert.</p>`;
    return frag;
  }
  if (flashIndex >= flashDeck.length) {
    const done = document.createElement("p");
    done.className = "flash-done";
    done.textContent = "Fertig! Sie haben alle Karten gesehen.";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ghost-btn";
    btn.textContent = "Noch einmal";
    btn.addEventListener("click", () => { startFlashSession(); renderVocabModalBody(); });
    frag.append(done, btn);
    return frag;
  }

  const card = flashDeck[flashIndex];

  const head = document.createElement("p");
  head.className = "flash-progress";
  head.textContent = `Karte ${flashIndex + 1} / ${flashDeck.length}`;
  frag.append(head);

  const cardEl = document.createElement("div");
  cardEl.className = "flash-card";
  if (flashFront) {
    const word = document.createElement("p");
    word.className = "flash-word";
    word.textContent = card.german;
    word.append(" ", makeSpeakerButton(card.german));
    const hint = document.createElement("p");
    hint.className = "muted";
    hint.textContent = "Tippen zum Umdrehen";
    cardEl.append(word, hint);
    cardEl.addEventListener("click", () => { flashFront = false; renderVocabModalBody(); });
  } else {
    const word = document.createElement("p");
    word.className = "flash-word";
    word.textContent = card.german;
    word.append(" ", makeSpeakerButton(card.german));
    const en = document.createElement("p");
    en.className = "flash-en";
    en.textContent = card.english || "(keine Übersetzung)";
    cardEl.append(word, en);
    if (card.examples?.length) {
      const ex = document.createElement("ul");
      ex.className = "flash-examples";
      for (const s of card.examples) {
        const li = document.createElement("li");
        li.textContent = s;
        ex.append(li);
      }
      cardEl.append(ex);
    }
  }
  frag.append(cardEl);

  if (!flashFront) {
    const row = document.createElement("div");
    row.className = "flash-actions";
    const makeBtn = (label, cls, onClick) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `ghost-btn ${cls}`;
      b.textContent = label;
      b.addEventListener("click", onClick);
      return b;
    };
    row.append(
      makeBtn("Nochmal", "flash-again", () => {
        // Put this card back at the end of the session deck.
        flashDeck.push(card);
        flashIndex += 1;
        flashFront = true;
        renderVocabModalBody();
      }),
      makeBtn("Gut", "flash-good", () => {
        flashIndex += 1;
        flashFront = true;
        renderVocabModalBody();
      }),
      makeBtn("Leicht", "flash-easy", () => {
        flashIndex += 1;
        flashFront = true;
        renderVocabModalBody();
      })
    );
    frag.append(row);
  }

  return frag;
}

function renderAllView() {
  const wrap = document.createElement("div");
  wrap.className = "vocab-all";

  if (!vocab.length) {
    wrap.innerHTML = `<p class="muted">Noch keine Wörter gespeichert.</p>`;
    return wrap;
  }

  const list = document.createElement("ul");
  list.className = "vocab-list";
  // Newest first.
  const sorted = [...vocab].sort((a, b) => b.addedAt - a.addedAt);
  for (const card of sorted) {
    const li = document.createElement("li");
    li.className = "vocab-row";
    const text = document.createElement("div");
    const g = document.createElement("strong");
    g.textContent = card.german;
    const e = document.createElement("span");
    e.className = "muted";
    e.textContent = card.english ? ` – ${card.english}` : "";
    text.append(g, " ", makeSpeakerButton(card.german), e);
    const rm = document.createElement("button");
    rm.type = "button";
    rm.className = "link-btn";
    rm.textContent = "Löschen";
    rm.addEventListener("click", () => {
      removeVocab(card.id);
      updateVocabCountBadge();
      // Also drop it from the current flash session deck.
      flashDeck = flashDeck.filter((c) => c.id !== card.id);
      renderVocabModalBody();
    });
    li.append(text, rm);
    list.append(li);
  }
  wrap.append(list);
  return wrap;
}

// ----- Wire up top-level event handlers (vocab + translate) -----------------

document.addEventListener("click", (event) => {
  // Tabs inside the modal.
  const tab = event.target.closest("[data-vocab-tab]");
  if (tab) {
    vocabTab = tab.dataset.vocabTab;
    renderVocabModalBody();
    return;
  }
  // Action buttons in the top bar / modal.
  const action = event.target.closest("[data-action]");
  if (!action) return;
  if (action.dataset.action === "open-vocab") openVocabModal();
  if (action.dataset.action === "close-vocab") closeVocabModal();
  if (action.dataset.action === "toggle-translate") setTranslateMode(!translateMode);
});

// Translate-click on the content area. Listen on the document so it works no
// matter how the inner DOM gets re-rendered.
document.addEventListener("click", handleTranslateClick, true);

// Esc closes whatever is open.
document.addEventListener("keydown", (event) => {
  // Esc closes the popover or vocab modal, whichever is open.
  if (event.key === "Escape") {
    if (translatePopover) { closeTranslatePopover(); return; }
    if (vocabModalEl) { closeVocabModal(); return; }
    return;
  }
  // Alt/Option + T toggles translate mode. We use event.code (KeyT) instead of
  // event.key because on macOS Option+T produces the dead-key "†".
  if (event.altKey && event.code === "KeyT" && !event.ctrlKey && !event.metaKey) {
    // Don't hijack the shortcut while the user is typing in a field.
    const t = event.target;
    if (t && (t.matches("input, textarea, select, [contenteditable='true']"))) return;
    event.preventDefault();
    setTranslateMode(!translateMode);
    showToast(`Übersetzen ${translateMode ? "an" : "aus"}`);
  }
});

function init() {
  applyTheme(theme, false);
  examSelect.innerHTML = exams
    .map((exam) => `<option value="${exam.id}">${exam.official ? "★ " : ""}${exam.title}</option>`)
    .join("");
  examSelect.value = currentExam().id;
  updateVocabCountBadge();
  setTranslateMode(false);
  render();
}

function render() {
  const exam = currentExam();
  examSelect.value = exam.id;
  renderNav(exam);
  renderScore(exam);

  if (state.section === "overview") renderOverview(exam);
  if (state.section === "reading") renderAutoSection(exam, "reading");
  if (state.section === "listening") renderAutoSection(exam, "listening");
  if (state.section === "writing") renderWriting(exam);
  if (state.section === "speaking") renderSpeaking(exam);
  if (state.section === "sources") renderSources(exam);
}

function renderNav(exam) {
  sectionNav.innerHTML = sections.map((section) => {
    let count = "";
    if (section.id === "reading" || section.id === "listening") {
      count = `${answeredCount(exam, section.id)}/${getQuestions(exam, section.id).length}`;
    }
    if (section.id === "writing") count = exam.writing.tasks.length;
    if (section.id === "speaking") count = exam.speaking.tasks.length;
    return `
      <button type="button" class="${state.section === section.id ? "active" : ""}" data-section="${section.id}">
        <span>${section.label}</span>
        ${count ? `<span class="nav-count">${count}</span>` : ""}
      </button>
    `;
  }).join("");
}

function renderScore(exam) {
  const score = autoScore(exam);
  // Show up to 2 decimals; trim trailing zeros. 1.25 should stay 1.25, not 1.3.
  const fmt = (n) => {
    const num = Number(n) || 0;
    if (Number.isInteger(num)) return String(num);
    return num.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  };
  scoreValue.textContent = `${fmt(score.total)} / ${score.max}`;
  scoreMeter.style.width = `${Math.round((score.total / score.max) * 100)}%`;
  const lesenOk = score.lesen >= 6;
  const hoerenOk = score.hoeren >= 6;
  progressText.innerHTML =
    `Lesen <strong>${score.lesen}</strong>/30 ${lesenOk ? "✓" : "(min. 6)"} · ` +
    `Hören <strong>${score.hoeren}</strong>/30 ${hoerenOk ? "✓" : "(min. 6)"} · ` +
    `Schreiben <strong>${fmt(score.schreiben)}</strong>/15 ` +
    `<span class="muted">(Formular ${score.form}/5 + Aufgabe 2 ${fmt(score.writing2)}/10)</span> · ` +
    `Sprechen <strong>${fmt(score.sprechen)}</strong>/25 ` +
    `<span class="muted">(${fmt(score.sprechen1)}/5 + ${fmt(score.sprechen2)}/10 + ${fmt(score.sprechen3)}/10)</span>.`;
}

function renderPageHead(title, description, minutes) {
  return `
    <header class="page-head">
      <div>
        <span class="eyebrow">${currentExam().title}</span>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
      ${minutes ? `
        <div class="timer-box">
          <span class="timer" id="timerDisplay">${String(minutes).padStart(2, "0")}:00</span>
          <button type="button" data-action="start-timer" data-minutes="${minutes}">Timer starten</button>
        </div>
      ` : ""}
    </header>
  `;
}

function renderOverview(exam) {
  app.innerHTML = `
    ${renderPageHead("ÖSD ZA1 – kompletter Test", "Der erste Eintrag ist der offizielle ÖSD-ZA1-Modellsatz mit Originaltexten, Originalaudio und dem offiziellen Lösungsschlüssel. Danach folgen zwölf Übungssätze mit gleichem Prüfungsaufbau.", null)}
    <div class="overview-grid">
      ${exams.map((item) => `
        <article class="exam-card ${item.id === exam.id ? "active" : ""}" data-exam="${item.id}" tabindex="0" role="button" aria-label="${item.title} öffnen">
          <div class="tag-row">
            <span class="tag ${item.official ? "green" : ""}">${item.official ? "Offiziell" : "Übung"}</span>
            <span class="tag">A1</span>
          </div>
          <h2>${item.title}</h2>
          <p>${item.theme}</p>
        </article>
      `).join("")}
    </div>

    <section class="overview-strip">
      <div>
        <span class="eyebrow">In jedem Satz</span>
        <div class="skill-grid">
          <div class="skill"><strong>Lesen · 25 min · 30 P.</strong><p>A1: 5 Situationen → 6 Anzeigen. A2: 3 Texte, 6× JA/NEIN. A3: 5 Texte → 6 Bilder.</p></div>
          <div class="skill"><strong>Hören · ca. 25 min · 30 P.</strong><p>A1: 5 Hörtexte → 6 Fotos. A2: Notizblatt (2×). A3: 5 Kurzinterviews.</p></div>
          <div class="skill"><strong>Schreiben · 20 min</strong><p>A1: Formular (5 P., automatisch korrigiert). A2: E-Mail oder Brief, ca. 30 Wörter (10 P.).</p></div>
          <div class="skill"><strong>Sprechen · ca. 10 min · 25 P.</strong><p>Sich vorstellen (4 Themen), ein Bild beschreiben, Rollenspiel zur Bildsituation.</p></div>
        </div>
      </div>
      <div class="visual-panel" aria-label="ÖSD A1"><span>ÖSD&nbsp;ZA1</span></div>
    </section>
  `;
}

function renderAutoSection(exam, section) {
  const data = exam[section];
  const isSubmitted = Boolean(state.submitted[submitKey(section)]);
  const title = section === "reading" ? "Lesen" : "Hören";
  const points = sectionScore(exam, section).points;
  const description = section === "reading"
    ? "Drei Aufgaben, 25 Minuten, 30 Punkte. Bearbeiten Sie die Aufgaben und prüfen Sie dann Ihre Antworten."
    : "Drei Aufgaben, ca. 25 Minuten, 30 Punkte. Spielen Sie das Audio, antworten Sie, dann prüfen (Transkript wird danach sichtbar).";

  app.innerHTML = `
    ${renderPageHead(title, description, data.minutes)}
    ${isSubmitted ? `<div class="feedback ok" style="margin:0 0 16px">Ergebnis: <strong>${points} / 30 Punkte</strong> · Bestehensgrenze: mindestens 6 Punkte.</div>` : ""}
    ${data.tasks.map((task, taskIndex) => renderTask(task, section, taskIndex, isSubmitted)).join("")}
    <div class="action-row">
      <button type="button" data-action="submit-section" data-section-name="${section}">${isSubmitted ? "Erneut prüfen" : "Antworten prüfen"}</button>
      <button class="ghost-btn" type="button" data-action="reset-section" data-section-name="${section}">${title} zurücksetzen</button>
    </div>
  `;
}

function renderTask(task, section, taskIndex, isSubmitted) {
  return `
    <article class="task">
      <div class="task-head">
        <div>
          <h2>${task.title}</h2>
          <p class="instructions">${task.instructions || "Hören Sie und wählen Sie die richtige Antwort."}</p>
        </div>
        <span class="tag gold">${task.points || 10} Punkte</span>
      </div>

      ${task.audio ? `
        <div class="audio-panel">
          <audio controls preload="metadata" src="${task.audio}"></audio>
        </div>
      ` : ""}

      ${task.prompt ? `<div class="prompt-box">${task.prompt}</div>` : ""}
      ${task.image ? `<img class="task-image" src="${task.image}" alt="Originalseite aus dem ÖSD-Modellsatz" loading="lazy">` : ""}
      ${task.sheet ? renderSheet(task.sheet) : ""}
      ${task.options && !task.prompt && !task.sheet ? renderOptions(task.options) : ""}

      <div class="question-list">
        ${task.questions.map((question) => renderQuestion(question, task, section, isSubmitted)).join("")}
      </div>

      ${renderTranscript(task, isSubmitted)}
    </article>
  `;
}

function renderTranscript(task, isSubmitted) {
  if (!isSubmitted) return "";
  const text = task.transcriptKey ? officialTranscripts[task.transcriptKey] : task.transcript;
  if (!text) {
    return task.audio
      ? `<p class="instructions" style="margin-top:12px">Transkript: Hören Sie den Originaltext im Audio oben.</p>`
      : "";
  }
  return `<details class="transcript-box"><summary>Transkript anzeigen</summary>${escapeHtml(text).replaceAll("\n", "<br>")}</details>`;
}

function renderOptions(options) {
  return `
    <div class="options-box">
      <ul class="options-list">
        ${options.map((option) => `<li><strong>${option.value}.</strong> ${option.label}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderQuestion(question, task, section, isSubmitted) {
  const key = keyFor(section, question.id);
  const value = state.answers[key] || "";
  const options = question.options || task.options || [];
  const isChoice = options.length <= 3 && !task.options?.some((option) => option.value === "1");
  const feedback = isSubmitted ? renderFeedback(question, task, value) : "";

  return `
    <div class="question">
      <div>
        <strong>${renderQuestionTitle(question)}</strong>
        ${question.stimulus ? `<p>${question.stimulus}</p>` : ""}
      </div>
      <div>
        ${question.answerType === "text" ? renderAnswerText(key, value, isSubmitted) : (isChoice ? renderRadios(question, options, key, value, isSubmitted) : renderSelect(options, key, value, isSubmitted))}
      </div>
      ${feedback}
    </div>
  `;
}

function renderQuestionTitle(question) {
  const label = String(question.label || "").trim();
  const text = String(question.text || "").trim();
  if (!text || text === label) return label;
  return `${label}. ${text}`;
}

function renderAnswerText(key, value, isSubmitted) {
  return `<input class="answer-input" data-key="${key}" value="${escapeAttr(value)}" ${isSubmitted ? "disabled" : ""} autocomplete="off" placeholder="Antwort eingeben">`;
}

function renderSelect(options, key, value, isSubmitted) {
  return `
    <select class="answer-input" data-key="${key}" ${isSubmitted ? "disabled" : ""}>
      <option value="">Bitte wählen</option>
      ${options.map((option) => `<option value="${escapeAttr(option.value)}" ${value === option.value ? "selected" : ""}>${formatSelectOption(option)}</option>`).join("")}
    </select>
  `;
}

function formatSelectOption(option) {
  if (/^\d+$/.test(String(option.value))) return `${option.value}. ${option.label}`;
  return option.label;
}

function renderRadios(question, options, key, value, isSubmitted) {
  return `
    <div class="radio-group" role="radiogroup" aria-label="${escapeAttr(question.text)}">
      ${options.map((option) => `
        <label class="radio-pill">
          <input class="answer-input" type="radio" name="${key}" data-key="${key}" value="${option.value}" ${value === option.value ? "checked" : ""} ${isSubmitted ? "disabled" : ""}>
          <span>${option.label}</span>
        </label>
      `).join("")}
    </div>
  `;
}

function renderFeedback(question, task, value) {
  const ok = isQuestionCorrect(question, value);
  const correct = question.answerType === "text" ? question.answer : optionLabel(question, task, question.answer);
  return `<div class="feedback ${ok ? "ok" : "bad"}">${ok ? "Richtig" : `Lösung: ${correct}`}</div>`;
}

function renderWriting(exam) {
  app.innerHTML = `
    ${renderPageHead("Schreiben", "Aufgabe 1: Formular ausfüllen (5 Punkte, automatisch korrigiert). Aufgabe 2: E-Mail oder Brief, mindestens 30 Wörter (10 Punkte, Selbstkontrolle).", exam.writing.minutes)}
    ${exam.writing.tasks.map((task, index) => task.type === "form" ? renderFormTask(task, index) : renderTextTask(task, index)).join("")}
  `;
}

const WRITING_SENTENCE_BANKS = {
  informalEmail: {
    label: "Persönliches E-Mail",
    register: "informell",
    note: "Für Freunde, Freundinnen und Personen mit „du“.",
    groups: [
      ["Anrede", ["Liebe Sara,", "Lieber Ben,", "Hallo Anna,"]],
      ["Start", ["vielen Dank für dein E-Mail.", "ich schreibe dir, weil ...", "ich möchte dich einladen."]],
      ["Grund", ["Leider kann ich nicht kommen.", "Ich bin krank.", "Ich habe am Samstag Zeit.", "Ich möchte dich sehen.", "Ich habe ein kleines Problem.", "Ich brauche deine Hilfe."]],
      ["Zeit / Ort", ["Am Samstag um 16 Uhr habe ich Zeit.", "Wir treffen uns vor dem Bahnhof.", "Die Party ist bei mir zu Hause."]],
      ["Frage / Bitte", ["Hast du Zeit?", "Möchtest du mitkommen?", "Kannst du bitte etwas mitbringen?", "Kannst du mir bitte antworten?", "Passt dir das?", "Bitte sag mir Bescheid."]],
      ["Gruß", ["Viele Grüße", "Liebe Grüße", "Bis bald"]]
    ]
  },
  politeEmail: {
    label: "Höfliches E-Mail",
    register: "formell / höflich",
    note: "Für Chef, Kursleitung, Nachbarn oder Personen mit „Sie“.",
    groups: [
      ["Anrede", ["Sehr geehrter Herr Berger,", "Sehr geehrte Frau Novak,", "Liebe Frau Weber,"]],
      ["Start", ["ich schreibe Ihnen, weil ...", "leider kann ich morgen nicht kommen.", "ich habe eine Frage."]],
      ["Grund", ["Ich bin krank.", "Ich gehe morgen zum Arzt.", "Ich habe einen wichtigen Termin.", "Ich kann leider nicht kommen.", "Ich habe ein Problem.", "Ich brauche Ihre Hilfe."]],
      ["Zeit / Ort", ["Am Freitag komme ich wieder.", "Am Samstag um 16 Uhr habe ich Zeit.", "Ich bin am Mittwoch wieder im Kurs."]],
      ["Frage / Bitte", ["Können Sie mir bitte antworten?", "Können Sie mir bitte die Hausaufgaben schicken?", "Können Sie kommen?", "Können Sie mir bitte helfen?", "Ist das möglich?", "Bitte sagen Sie mir Bescheid."]],
      ["Gruß", ["Mit freundlichen Grüßen", "Viele Grüße", "Vielen Dank"]]
    ]
  },
  formalLetter: {
    label: "Formeller Brief",
    register: "formell",
    note: "Für Firmen, Ämter, Hotels, Versicherungen und offizielle Stellen.",
    groups: [
      ["Anrede", ["Sehr geehrte Damen und Herren,", "Sehr geehrte Frau Müller,", "Sehr geehrter Herr Müller,"]],
      ["Start", ["ich schreibe Ihnen, weil ...", "ich möchte ...", "ich habe eine Frage zu ..."]],
      ["Information", ["Mein Name ist ...", "Meine Adresse ist ...", "Der Termin ist am ..."]],
      ["Grund / Problem", ["Ich habe meine Tasche verloren.", "Mein Zug hat Verspätung.", "Ich habe eine neue Adresse.", "Ich habe ein Problem.", "Ich brauche Ihre Hilfe.", "Der Termin passt mir leider nicht."]],
      ["Bitte / Frage", ["Bitte schicken Sie mir eine Bestätigung.", "Können Sie mir bitte helfen?", "Ich freue mich auf Ihre Antwort.", "Können Sie mir bitte antworten?", "Können Sie mir bitte Informationen schicken?", "Bitte rufen Sie mich an."]],
      ["Gruß", ["Mit freundlichen Grüßen", "(Name)"]]
    ]
  }
};

const WRITING_CONTEXT_SENTENCES = {
  "exam-1": {
    reason: ["Ich bin Ihr neuer Nachbar.", "Ich möchte Sie kennenlernen.", "Ich möchte Sie zu Kaffee und Kuchen einladen."],
    request: ["Können Sie am Samstag kommen?", "Passt Ihnen 16 Uhr?", "Bitte sagen Sie mir Bescheid."]
  },
  "exam-2": {
    reason: ["Ich bin krank und kann morgen nicht arbeiten.", "Ich habe Fieber.", "Morgen gehe ich zum Arzt."],
    request: ["Soll ich Ihnen eine Bestätigung schicken?", "Können Sie mir bitte antworten?", "Am Freitag komme ich wieder ins Büro."]
  },
  "exam-3": {
    reason: ["Ich feiere am Samstag Geburtstag.", "Die Party ist im Jugendzentrum Nord.", "Es kommen Freunde aus dem Deutschkurs."],
    request: ["Bitte bring etwas zu trinken mit.", "Kommst du zur Party?", "Hast du am Samstag Zeit?"]
  },
  "exam-4": {
    reason: ["Ich kann morgen nicht zum Deutschkurs kommen.", "Ich habe einen Termin im Krankenhaus.", "Am Mittwoch bin ich wieder im Kurs."],
    request: ["Können Sie mir bitte die Hausaufgaben schicken?", "Was machen wir morgen im Kurs?", "Vielen Dank für Ihre Hilfe."]
  },
  "exam-5": {
    reason: ["Ich gehe am Samstag in die Stadt.", "Ich muss zur Post und zur Bank.", "Danach möchte ich Kaffee trinken."],
    request: ["Möchtest du mitkommen?", "Hast du um 10 Uhr Zeit?", "Bitte sag mir Bescheid."]
  },
  "exam-6": {
    reason: ["Ich habe wenig Zeit für Sport.", "Ich möchte ab dem 1. März das kleine Paket.", "Meine Mitgliedschaft ist zu teuer."],
    request: ["Bitte ändern Sie meine Mitgliedschaft.", "Bitte schicken Sie mir eine Bestätigung.", "Können Sie mir bitte den neuen Preis schreiben?"]
  },
  "exam-7": {
    reason: ["Ich bewerbe mich für die Stelle als Bürokraft.", "Ich arbeite gern im Büro.", "Ich kann am Vormittag arbeiten."],
    request: ["Haben Sie einen Termin für ein Gespräch?", "Wann kann ich mich vorstellen?", "Können Sie mir bitte antworten?"]
  },
  "exam-8": {
    reason: ["Ich möchte Deutsch A1 lernen.", "Ich habe am Abend Zeit.", "Ich brauche den Kurs für die Arbeit."],
    request: ["Wann beginnt der Kurs?", "Wie viel kostet der Kurs?", "Können Sie mir bitte Informationen schicken?"]
  },
  "exam-9": {
    reason: ["Ich habe meine Tasche im Bus verloren.", "Die Tasche ist schwarz und klein.", "In der Tasche sind Schlüssel und ein Buch."],
    request: ["Haben Sie meine Tasche gefunden?", "Wann kann ich die Tasche abholen?", "Können Sie mich bitte anrufen?"]
  },
  "exam-10": {
    reason: ["Mein Zug hat Verspätung.", "Ich komme erst um 23 Uhr im Hotel an.", "Ich brauche den Zimmerschlüssel spät."],
    request: ["Bitte legen Sie den Schlüssel an die Rezeption.", "Können Sie mir das bestätigen?", "Ist die Rezeption um 23 Uhr offen?"]
  },
  "exam-11": {
    reason: ["Meine Nachbarn sind jeden Abend laut.", "Die Musik ist nach 22 Uhr sehr laut.", "Ich kann nachts nicht schlafen."],
    request: ["Können Sie mir bitte helfen?", "Bitte sprechen Sie mit meinen Nachbarn.", "Was kann ich machen?"]
  },
  "exam-12": {
    reason: ["Ich habe eine neue Adresse.", "Ab dem 1. Mai wohne ich in Graz.", "Meine alte Adresse ist Lindenstraße 4."],
    request: ["Bitte ändern Sie meine Adresse.", "Bitte schicken Sie mir eine Bestätigung.", "Brauchen Sie noch Informationen?"]
  }
};

function writingProfile(task) {
  const text = `${task.title || ""} ${task.prompt || ""} ${(task.checklist || []).join(" ")}`.toLowerCase();
  const isLetter = text.includes("brief") || text.includes("formelle anrede") || text.includes("formeller gruß");
  if (isLetter) return { kind: "formalLetter", format: "Brief", register: "formell" };
  const informal = /\bfreund\b|\bfreundin\b|\bfreunden\b|lieber|liebe sara|lieber ben|du\b|dich\b|dein\b/.test(text);
  if (informal) return { kind: "informalEmail", format: "E-Mail", register: "informell" };
  return { kind: "politeEmail", format: "E-Mail", register: "formell / höflich" };
}

function writingChecklistQuestion(item) {
  const lower = item.toLowerCase();
  if (lower.includes("anrede")) return "Passt die Anrede zur Person?";
  if (lower.includes("gruß")) return "Gibt es einen passenden Schluss?";
  if (lower.includes("frage") || lower.includes("bitte") || lower.includes("bestätigung") || lower.includes("abholung")) return "Stelle ich klar eine Frage oder Bitte?";
  if (lower.includes("tag") || lower.includes("uhr") || lower.includes("zeit") || lower.includes("termin") || lower.includes("datum") || lower.includes("rückkehr") || lower.includes("ab wann")) return "Nenne ich Tag, Uhrzeit, Datum oder Termin?";
  if (lower.includes("ort") || lower.includes("adresse") || lower.includes("raum")) return "Nenne ich Ort, Adresse oder Raum?";
  if (lower.includes("grund") || lower.includes("problem") || lower.includes("sache") || lower.includes("person") || lower.includes("kurs") || lower.includes("änderung")) return "Sage ich klar, warum ich schreibe?";
  return "Ist dieser Punkt klar im Text?";
}

function writingSentenceItem(sentence, contextual = false) {
  if (typeof sentence === "string") return { text: sentence, contextual };
  return {
    text: sentence?.text || "",
    contextual: Boolean(sentence?.contextual || contextual)
  };
}

function writingGroupsForTask(bank) {
  const context = WRITING_CONTEXT_SENTENCES[currentExam().id] || {};
  return bank.groups.map(([title, sentences]) => {
    const additions =
      title === "Grund" || title === "Grund / Problem"
        ? context.reason || []
        : title === "Frage / Bitte" || title === "Bitte / Frage"
          ? context.request || []
          : [];
    const contextualSentences = additions.slice(0, 2);
    return [
      title,
      [
        ...sentences.map((sentence) => writingSentenceItem(sentence)),
        ...contextualSentences.map((sentence) => writingSentenceItem(sentence, true))
      ]
    ];
  });
}

function writingTrainerColumns(groups) {
  const byTitle = new Map(groups);
  const pick = (titles) => titles.map((title) => {
    const sentences = byTitle.get(title);
    return sentences ? [title, sentences] : null;
  }).filter(Boolean);
  return [
    pick(["Anrede", "Start", "Gruß"]),
    pick(["Information", "Grund", "Grund / Problem", "Zeit / Ort"]),
    pick(["Frage / Bitte", "Bitte / Frage"])
  ].filter((column) => column.length);
}

function renderWritingTrainer(task, textKey) {
  const profile = writingProfile(task);
  const bank = WRITING_SENTENCE_BANKS[profile.kind];
  if (!bank) return "";
  const columns = writingTrainerColumns(writingGroupsForTask(bank));
  return `
    <section class="writing-trainer">
      <div class="writing-trainer-head">
        <div>
          <span class="eyebrow">Schreiben-Trainer</span>
          <h3>${bank.label}</h3>
          <p>${bank.note}</p>
        </div>
        <span class="tag">${profile.register}</span>
      </div>
      <div class="writing-bank-grid">
        ${columns.map((column) => `
          <div class="writing-bank-column">
            ${column.map(([title, sentences]) => `
              <div class="writing-bank-group">
                <strong>${title}</strong>
                <div class="writing-bank-buttons">
                  ${sentences.map((sentence) => `
                    <button type="button" class="${sentence.contextual ? "context-sentence" : ""}" data-action="insert-writing-sentence" data-key="${escapeAttr(textKey)}" data-sentence="${escapeAttr(sentence.text)}">
                      ${sentence.contextual ? `<span class="writing-context-label">Aufgabe</span>` : ""}
                      <span>${escapeHtml(sentence.text)}</span>
                    </button>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderFormTask(task, index) {
  const checked = Boolean(state.submitted[`${currentExam().id}:writing-form`]);
  const score = formScore(currentExam());
  return `
    <article class="writing-panel">
      <div class="task-head">
        <div>
          <h2>${task.title}</h2>
          <p class="instructions">${task.prompt}</p>
        </div>
        <span class="tag gold">5 Punkte</span>
      </div>
      ${task.image ? `<img class="task-image" src="${task.image}" alt="Originalformular" loading="lazy">` : ""}
      <div class="writing-grid">
        ${task.fields.map((field, fieldIndex) => {
          const key = keyFor("writing", `form-0-${fieldIndex}`);
          let cls = "";
          if (checked) {
            const value = normalizeAnswer(state.writing[key] || "");
            let ok = false;
            if (field.both) ok = field.both.filter((n) => value.includes(normalizeAnswer(n))).length >= 2;
            else ok = Boolean(value) && [field.answer, ...(field.accepted || [])].some((a) => normalizeAnswer(a) === value);
            cls = ok ? "field-ok" : "field-bad";
          }
          return `
            <label class="field-group ${cls}">
              <span>${field.label}</span>
              <input class="writing-input" data-key="${key}" value="${escapeAttr(state.writing[key] || "")}" ${checked ? "disabled" : ""}>
              ${checked ? `<small class="field-solution">Lösung: ${field.answer}</small>` : ""}
            </label>
          `;
        }).join("")}
      </div>
      <div class="action-row">
        <button type="button" data-action="check-form">${checked ? "Erneut prüfen" : "Formular prüfen"}</button>
        <button class="ghost-btn" type="button" data-action="reset-form">Zurücksetzen</button>
      </div>
      ${checked ? `<div class="feedback ${score.points >= 2 ? "ok" : "bad"}">Lösungspunkte: ${score.solution}/${score.max} → <strong>${score.points} / 5 Punkte</strong> (ÖSD-Umrechnung)</div>` : ""}
    </article>
  `;
}

function renderTextTask(task, index) {
  const textKey = keyFor("writing", `text-${index}`);
  const words = countWords(state.writing[textKey] || "");
  return `
    <article class="writing-panel">
      <div class="task-head">
        <div>
          <h2>${task.title}</h2>
          <p class="instructions">${task.prompt}</p>
        </div>
        <span class="tag gold">10 Punkte</span>
      </div>
      ${!currentExam().official ? renderWritingTrainer(task, textKey) : ""}
      <textarea class="writing-input" data-key="${textKey}" placeholder="Schreiben Sie hier Ihre Antwort ...">${escapeHtml(state.writing[textKey] || "")}</textarea>
      <div class="word-count">${words} Wörter ${task.minWords ? `/ Ziel ${task.minWords}+` : ""}</div>
      <div class="check-list">
        ${task.checklist.map((item, itemIndex) => {
          const key = keyFor("writing", `check-${index}-${itemIndex}`);
          return `
            <label class="check-row">
              <input class="check-input" type="checkbox" data-key="${key}" ${state.checks[key] ? "checked" : ""}>
              <span><strong>${escapeHtml(item)}</strong><small>${escapeHtml(writingChecklistQuestion(item))}</small></span>
            </label>
          `;
        }).join("")}
      </div>
      ${!currentExam().official ? renderWritingAiPanel(index) : ""}
      ${renderModelButton(`writing-text-${index}`)}
      <div class="model-box ${state.modelOpen[`writing-text-${index}`] ? "" : "hidden"}">${escapeHtml(task.sample).replaceAll("\n", "<br>")}</div>
    </article>
  `;
}

// Static skeleton for the AI writing checker. On click, app.js sends the text +
// checklist to the backend and fills in the result area below.
function renderWritingAiPanel(textIndex) {
  return `
    <div class="ai-writing" data-writing-feedback="${textIndex}">
      <div class="action-row">
        <button class="ghost-btn" type="button" data-action="check-email" data-text-index="${textIndex}">KI-Korrektur holen</button>
        <span class="muted">Die KI prüft Ihre E-Mail / Ihren Brief und sagt, welche Punkte aus der Liste enthalten sind.</span>
      </div>
      <div class="ai-writing-status hidden" data-writing-status="${textIndex}"></div>
      <div class="ai-writing-result hidden" data-writing-result="${textIndex}"></div>
    </div>
  `;
}

function renderModelButton(key) {
  return `
    <div class="action-row">
      <button class="ghost-btn" type="button" data-action="toggle-model" data-model="${key}">
        ${state.modelOpen[key] ? "Modelllösung verbergen" : "Modelllösung zeigen"}
      </button>
    </div>
  `;
}

function renderSpeaking(exam) {
  app.innerHTML = `
    ${renderPageHead("Sprechen", "Ca. 10 Minuten, max. 25 Punkte. Drei Aufgaben: sich vorstellen, ein Bild beschreiben, Alltagssituation spielen. Nehmen Sie sich zur Übung auf.", exam.speaking.minutes)}
    ${exam.speaking.tasks.map((task, index) => renderSpeakingTask(task, index)).join("")}
  `;
}

function renderSpeakingTask(task, index) {
  const noteKey = keyFor("speaking", `task-${index}`);
  const recordId = `${currentExam().id}-speaking-${index}`;
  // The AI tutor is only offered on the authored practice exams, never on the
  // official OSD model set (which must stay 1:1 with the original material).
  const showTutor = !currentExam().official;
  // Aufgabe 4 (chat) is extra practice, not part of the 3 Teile - skip the tag.
  const showTeilTag = task.mode !== "chat";
  // Aufgabe 1 has > 4 cards: each card becomes a checkbox so the learner can
  // pick exactly 4 for "Prüfungsmodus". Aufgaben 2/3 stay as fixed grids.
  const selectable = !!task.cards && task.cards.length > 4 && showTutor;
  const selected = selectable ? (state.speakingExamCards?.[recordId] || []) : [];
  const selectedCount = selected.length;
  return `
    <article class="speaking-panel">
      <div class="task-head">
        <div>
          <h2>${task.title}</h2>
          <p class="instructions">${task.prompt}</p>
        </div>
        ${showTeilTag ? `<span class="tag gold">Teil ${index + 1}</span>` : ""}
      </div>
      ${task.image ? `<img class="task-image" src="${task.image}" alt="Originalseite Sprechen" loading="lazy">` : ""}
      ${selectable ? `
        <div class="exam-mode-hint">
          <strong>Prüfungsmodus:</strong> wählen Sie genau 4 Themen aus
          <span class="exam-mode-count ${selectedCount === 4 ? "is-ready" : ""}">(${selectedCount}/4)</span>
          ${selectedCount > 0 ? `<button type="button" class="link-btn" data-action="clear-exam-cards" data-record="${recordId}">Auswahl zurücksetzen</button>` : ""}
        </div>
      ` : ""}
      ${task.cards ? `<div class="speaking-cards${selectable ? " is-selectable" : ""}">${task.cards.map((card) => {
        const isOn = selectable && selected.includes(card);
        return selectable
          ? `<label class="speaking-card selectable ${isOn ? "is-selected" : ""}"><input type="checkbox" data-action="toggle-exam-card" data-record="${recordId}" data-card="${escapeAttr(card)}" ${isOn ? "checked" : ""}><strong>${card}</strong><span class="muted">Ein paar einfache Sätze.</span></label>`
          : `<div class="speaking-card"><strong>${card}</strong><span class="muted">Ein paar einfache Sätze.</span></div>`;
      }).join("")}</div>` : ""}
      <div class="action-row">
        <button type="button" data-action="start-record" data-record="${recordId}">Aufnahme starten</button>
        <button class="ghost-btn" type="button" data-action="stop-record" data-record="${recordId}" disabled>Stopp</button>
      </div>
      <audio class="recording-player" controls data-player="${recordId}"></audio>
      ${showTutor ? renderTutorPanel(recordId, task) : ""}
      <label class="field-group full">
        <span>Notizen</span>
        <textarea class="notes-input" data-key="${noteKey}" placeholder="Nützliche Sätze oder Selbst-Feedback ...">${escapeHtml(state.notes[noteKey] || "")}</textarea>
      </label>
      ${renderModelButton(`speaking-${index}`)}
      <div class="model-box ${state.modelOpen[`speaking-${index}`] ? "" : "hidden"}">${task.model}</div>
    </article>
  `;
}

function renderSources(exam) {
  app.innerHTML = `
    ${renderPageHead("Originalmaterial", "Der offizielle Modellsatz dieses Tests stammt 1:1 aus der ÖSD-ZA1-Modellsatzbroschüre. Hier sehen Sie das Original-PDF und hören die Originalaudios.", null)}
    ${renderOfficialReference()}
    <section class="source-panel">
      <h2>Quellen</h2>
      <ul class="source-list">
        ${sourceLinks.map((source) => `
          <li>
            <a href="${source.url}" target="_blank" rel="noreferrer">${source.title}</a>
            <p class="instructions">${source.note}</p>
          </li>
        `).join("")}
      </ul>
    </section>
  `;
}

function renderOfficialReference() {
  return `
    <section class="official-panel">
      <div class="task-head">
        <div>
          <h2>Offizieller ÖSD ZA1 Modellsatz (Original)</h2>
          <p class="instructions">Vergleichen Sie den interaktiven Test jederzeit mit dem Original-PDF und den Originalaudios.</p>
        </div>
        <a class="tag green" href="${officialReference.pdf}" target="_blank">PDF öffnen</a>
      </div>
      <div class="official-grid">
        <object class="pdf-frame" data="${officialReference.pdf}" type="application/pdf">
          <p><a href="${officialReference.pdf}" target="_blank">Original-PDF öffnen</a></p>
        </object>
        <div class="audio-list">
          ${officialReference.audio.map((audio) => `
            <div>
              <strong>${audio.label}</strong>
              <audio controls preload="metadata" src="${audio.src}"></audio>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function startTimer(minutes) {
  clearInterval(timerHandle);
  let remaining = Number(minutes) * 60;
  const display = document.querySelector("#timerDisplay");
  if (!display) return;

  updateTimer(display, remaining);
  timerHandle = setInterval(() => {
    remaining -= 1;
    updateTimer(display, remaining);
    if (remaining <= 0) {
      clearInterval(timerHandle);
      showToast("Die Zeit ist um.");
    }
  }, 1000);
}

function updateTimer(display, seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const rest = safeSeconds % 60;
  display.textContent = `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function countWords(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function escapeAttr(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

// Static skeleton for the AI speaking tutor. The "current" area shows which card
// to speak about now (guided mode) or a chat hint (Aufgabe 4). The status/result
// areas are filled after each recording from the backend response.
function renderTutorPanel(recordId, task) {
  const isChat = task.mode === "chat";
  const hint = isChat
    ? "Freies Gespräch: Sprechen Sie, die KI antwortet mit einer neuen Frage."
    : "Geführte Übung: Sprechen Sie zu jeder Karte. Die KI korrigiert und geht zur nächsten Karte.";
  return `
    <div class="ai-tutor" data-feedback="${recordId}">
      <div class="ai-tutor-head">
        <strong>KI-Sprechtutor</strong>
        <span class="muted">${hint}</span>
      </div>
      <div class="ai-tutor-current" data-feedback-current="${recordId}">
        ${renderCurrentCard(recordId, task)}
      </div>
      <div class="ai-tutor-status hidden" data-feedback-status="${recordId}"></div>
      <div class="ai-tutor-result hidden" data-feedback-result="${recordId}"></div>
    </div>
  `;
}

// How far through the cards this task is (which card to do next).
function currentCardIndex(recordId) {
  return speakingCardProgress[recordId] ?? 0;
}

// Recover the task object from a recordId like "exam-3-speaking-1".
function speakingTaskFromRecordId(recordId) {
  const index = Number(recordId.split("-speaking-")[1]);
  return currentExam().speaking?.tasks?.[index] || {};
}

// Which task index is this recordId (0..3)?
function speakingTaskIndex(recordId) {
  return Number(recordId.split("-speaking-")[1]);
}

// Real ÖSD weights for Sprechen Aufgaben 1/2/3 (Aufgabe 4 is extra, not scored).
const SPEAKING_TASK_MAX = [5, 10, 10, 0];
function speakingTaskMax(recordId) {
  return SPEAKING_TASK_MAX[speakingTaskIndex(recordId)] || 0;
}

// The card deck the guided loop should walk for this task.
// - Aufgabe 1 (12 cards) in exam mode -> the 4 selected cards (in selection order).
// - Aufgabe 1 in practice mode -> all 12 cards (no scoring).
// - Aufgaben 2 and 3 -> their fixed 4 cards.
function activeCardsFor(recordId, task) {
  const cards = task?.cards || [];
  if (!cards.length) return [];
  if (cards.length > 4) {
    const sel = state.speakingExamCards?.[recordId];
    if (Array.isArray(sel) && sel.length === 4) return sel.slice();
    return cards;
  }
  return cards;
}

// Is this task currently configured to receive an AI score at the end?
// - Chat (Aufgabe 4): never.
// - Aufgabe 1: only when exam mode is active (4 cards chosen).
// - Aufgaben 2 + 3: always.
function isSpeakingTaskScored(recordId, task) {
  if (!task || task.mode === "chat") return false;
  if (!task.cards || task.cards.length === 0) return false;
  if (task.cards.length > 4) {
    const sel = state.speakingExamCards?.[recordId];
    return Array.isArray(sel) && sel.length === 4;
  }
  return true;
}

function normalizedChatIndex(index) {
  const total = A1_CHAT_SITUATIONS.length;
  return ((Number(index) || 0) % total + total) % total;
}

function chatSituationAt(index) {
  return A1_CHAT_SITUATIONS[normalizedChatIndex(index)];
}

function chatSituationInstruction(index) {
  const situation = chatSituationAt(index);
  return `${situation.title}: ${situation.detail}`;
}

function chatNextSituationIndex(recordId) {
  return normalizedChatIndex(chatTurnIndex[recordId] ?? 1);
}

function chatPromptIndex(recordId) {
  return normalizedChatIndex(chatPromptSituationIndex[recordId] ?? 0);
}

function setChatSituation(recordId, index) {
  const idx = normalizedChatIndex(index);
  chatPromptSituationIndex[recordId] = idx;
  chatTurnIndex[recordId] = normalizedChatIndex(idx + 1);
  chatPrevQuestion[recordId] = chatSituationAt(idx).opener;
}

function renderChatSituationPicker(recordId) {
  const activeIndex = chatPromptIndex(recordId);
  return `
    <div class="chat-situation-picker" aria-label="Gesprächsthema wählen">
      <p class="ai-current-label">Thema wählen</p>
      <div class="chat-situation-list">
        ${A1_CHAT_SITUATIONS.map((situation, index) => `
          <button type="button" class="chat-situation-btn ${index === activeIndex ? "active" : ""}" data-action="choose-chat-situation" data-record="${recordId}" data-chat-index="${index}">
            ${escapeHtml(situation.title)}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

// The "what to do now" prompt. In guided mode it names the current card and
// shows progress (e.g. "Karte 3 / 12"); when the cards run out it shows a
// "done" message with a restart button. Chat mode (Aufgabe 4) shows a hint.
function renderCurrentCard(recordId, task) {
  if (task.mode === "chat") {
    // Before the first answer, show the fixed opener; afterwards, the tutor's
    // latest short partner reply + question.
    const question = chatPrevQuestion[recordId] || task.opener || "";
    const prompt = question
      ? `<div class="ai-current-label-row"><p class="ai-current-label">KI sagt</p>${renderSpeakerButtonHtml(question)}</div><p class="ai-current-card">„${escapeHtml(question)}“</p>`
      : `<p class="muted">Starten Sie das Gespräch: Stellen Sie sich kurz vor.</p>`;
    return `${prompt}${renderChatSituationPicker(recordId)}`;
  }
  const cards = activeCardsFor(recordId, task);
  if (!cards.length) return "";
  const idx = currentCardIndex(recordId);
  if (idx >= cards.length) {
    // Task done. If it's scored, show the score block (or a loading
    // placeholder until the /api/speaking-score response lands); otherwise
    // just a "fertig" message. The restart button is always available.
    const scored = isSpeakingTaskScored(recordId, task);
    const scoreData = state.speakingScores?.[recordId];
    let body = "";
    if (scored) {
      if (scoreData) {
        body = renderSpeakingScoreHtml(scoreData, recordId);
      } else {
        body = `<p class="muted">Wird bewertet …</p>`;
      }
    } else {
      body = `<p class="ai-current-done"><strong>Alle Karten fertig – gut gemacht!</strong></p>`;
    }
    return `${body}<button type="button" class="ghost-btn" data-action="restart-cards" data-record="${recordId}">Von vorne beginnen</button>`;
  }
  return `
    <p class="ai-current-label">Karte ${idx + 1} / ${cards.length}</p>
    <p class="ai-current-card">Sprechen Sie zu: „${escapeHtml(cards[idx])}“</p>
  `;
}

// Renders the Sprechen score block (HTML string) for the current-card area.
function renderSpeakingScoreHtml(scoreData, recordId) {
  const max = Number(scoreData.maxScore) || speakingTaskMax(recordId);
  const score = Number(scoreData.score) || 0;
  const cls = score >= max * 0.6 ? "ok" : "low";
  const perCard = Array.isArray(scoreData.perCard) ? scoreData.perCard : [];
  const rows = perCard.map((c) => {
    const flags = [
      `${c.sentences >= 2 ? "✓" : "✗"} ≥ 2 Sätze`,
      `${c.grammarOk ? "✓" : "✗"} Grammatik`,
      `${c.onTopic ? "✓" : "✗"} im Thema`
    ].join(" · ");
    const perCardMaxStr = (max / perCard.length).toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    return `<li><strong>${escapeHtml(c.topic || "")}</strong> – ${c.points}/${perCardMaxStr}<br><span class="muted">${flags}${c.note ? ` · ${escapeHtml(c.note)}` : ""}</span></li>`;
  }).join("");
  return `
    <div class="ai-writing-score ${cls}">
      <span class="ai-block-label">Punkte (KI)</span>
      <strong>${score} / ${max}</strong>
    </div>
    ${rows ? `<ul class="speaking-score-cards">${rows}</ul>` : ""}
    ${scoreData.summary ? `<p class="ai-writing-overall">${escapeHtml(scoreData.summary)}</p>` : ""}
  `;
}

// Re-render just the "current card" area (after advancing, or after restart).
function updateCurrentCardDisplay(recordId) {
  const el = document.querySelector(`[data-feedback-current="${recordId}"]`);
  if (el) el.innerHTML = renderCurrentCard(recordId, speakingTaskFromRecordId(recordId));
}

// Turn a recorded audio Blob into a base64 string (without the "data:...," prefix).
// OpenRouter's Whisper endpoint wants the raw base64, and FileReader handles
// large blobs more reliably than btoa(String.fromCharCode(...)).
function blobToBase64(blob) {
  return new Promise((resolvePromise, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = String(reader.result); // e.g. "data:audio/webm;base64,AAAA..."
      resolvePromise(dataUrl.split(",")[1] || "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

// Called automatically when a practice-exam recording stops. Sends the audio to
// our local server, then shows the transcript and the tutor's correction.
// Guided mode (Aufgaben 1-3): corrects the answer to the current card, then
// auto-advances to the next card. Chat mode (Aufgabe 4): free conversation.
async function requestSpeakingFeedback(recordId, blob) {
  const statusEl = document.querySelector(`[data-feedback-status="${recordId}"]`);
  const resultEl = document.querySelector(`[data-feedback-result="${recordId}"]`);
  // If this recording isn't a tutor-enabled task (e.g. official set), do nothing.
  if (!statusEl || !resultEl) return;

  const task = speakingTaskFromRecordId(recordId);
  // Use the deck currently being walked (4 selected cards in Aufgabe 1 exam
  // mode, otherwise all task.cards).
  const cards = task.mode === "chat" ? [] : activeCardsFor(recordId, task);
  const isChat = task.mode === "chat";
  const idx = currentCardIndex(recordId);
  const nextChatIndex = isChat ? chatNextSituationIndex(recordId) : 0;
  const chatSituation = isChat ? chatSituationInstruction(nextChatIndex) : "";

  // Guided mode: if every card is already done, nudge the learner to restart
  // instead of sending another recording.
  if (!isChat && cards.length && idx >= cards.length) {
    statusEl.classList.remove("hidden", "error");
    statusEl.textContent = "Alle Karten sind fertig. Klicken Sie „Von vorne beginnen“.";
    return;
  }

  // Loading state.
  resultEl.classList.add("hidden");
  resultEl.innerHTML = "";
  statusEl.classList.remove("hidden", "error");
  statusEl.textContent = "Wird ausgewertet … (Transkription + Korrektur)";

  try {
    const audio = await blobToBase64(blob);
    const response = await fetch("/api/speaking-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        audio,
        format: "webm",
        mode: isChat ? "chat" : "guided",
        taskTitle: task.title || "",
        taskPrompt: task.prompt || "",
        // In guided mode we tell the tutor which card the learner is answering.
        cardTopic: !isChat ? cards[idx] || "" : "",
        // In chat mode we send the previous question (or the fixed opener on the
        // first turn) so the correction is judged in context.
        previousQuestion: isChat ? chatPrevQuestion[recordId] || task.opener || "" : "",
        // In chat mode we also send the target situation for the next turn. This
        // keeps Aufgabe 4 varied while staying inside A1 everyday situations.
        chatSituation
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Serverfehler.");
    }

    statusEl.classList.add("hidden");
    // The "what to do next" prompt (next card or next question) is shown in the
    // current-card area above, so the feedback itself only covers the answer.
    showSpeakingFeedback(resultEl, data);

    if (isChat) {
      // Remember the new question so the next answer is corrected in context.
      chatPrevQuestion[recordId] = data.nextQuestion || "";
      chatPromptSituationIndex[recordId] = nextChatIndex;
      chatTurnIndex[recordId] = normalizedChatIndex(nextChatIndex + 1);
      updateCurrentCardDisplay(recordId);
    } else {
      // Save the transcript so partial progress survives navigation.
      if (data.transcript) {
        if (!state.speakingRecords[recordId]) state.speakingRecords[recordId] = [];
        state.speakingRecords[recordId][idx] = {
          topic: cards[idx] || "",
          transcript: data.transcript
        };
      }
      // Per-card score: criteria come back inside the feedback response, so
      // we can grade this card immediately without a second API call.
      let cardScore = null;
      if (isSpeakingTaskScored(recordId, task)) {
        cardScore = recordCardScore(recordId, task, idx, cards, data);
      }
      saveState();
      // Show the per-card evaluation alongside the correction.
      if (cardScore) showCardScoreBlock(resultEl, cardScore, recordId);
      // Move to the next card and update the prompt above (will also show the
      // total + breakdown once this is the last card).
      const next = idx + 1;
      speakingCardProgress[recordId] = next;
      updateCurrentCardDisplay(recordId);
      // Refresh the top score so the running Sprechen total ticks up.
      renderScore(currentExam());
    }
  } catch (error) {
    statusEl.classList.add("error");
    statusEl.textContent = `Fehler: ${error.message} Läuft der Server (node server.mjs)?`;
  }
}

// Build the feedback display. We use textContent for anything that came from the
// API so model output can never inject HTML into the page.
function showSpeakingFeedback(resultEl, data) {
  resultEl.innerHTML = "";

  const addBlock = (label, value, className = "") => {
    if (!value) return;
    const block = document.createElement("div");
    block.className = `ai-block ${className}`.trim();
    const head = document.createElement("span");
    head.className = "ai-block-label";
    head.textContent = label;
    const body = document.createElement("p");
    body.textContent = value;
    block.append(head, body);
    resultEl.append(block);
  };

  addBlock("Das haben Sie gesagt", data.transcript, "ai-transcript");

  // Korrektur (A1) - include a speaker icon next to the label so the learner
  // can hear the corrected sentence in proper German pronunciation.
  if (data.corrected) {
    const block = document.createElement("div");
    block.className = "ai-block ai-corrected";
    const head = document.createElement("div");
    head.className = "ai-block-head";
    const lbl = document.createElement("span");
    lbl.className = "ai-block-label";
    lbl.textContent = "Korrektur (A1)";
    head.append(lbl, makeSpeakerButton(data.corrected));
    const body = document.createElement("p");
    body.textContent = data.corrected;
    block.append(head, body);
    resultEl.append(block);
  }

  // Mistakes is a list; show a friendly note when there are none.
  const mistakesBlock = document.createElement("div");
  mistakesBlock.className = "ai-block ai-mistakes";
  const mLabel = document.createElement("span");
  mLabel.className = "ai-block-label";
  mLabel.textContent = "Hinweise";
  mistakesBlock.append(mLabel);
  if (Array.isArray(data.mistakes) && data.mistakes.length) {
    const list = document.createElement("ul");
    for (const item of data.mistakes) {
      const li = document.createElement("li");
      li.textContent = item;
      list.append(li);
    }
    mistakesBlock.append(list);
  } else {
    const ok = document.createElement("p");
    ok.textContent = "Keine Fehler – sehr gut!";
    mistakesBlock.append(ok);
  }
  resultEl.append(mistakesBlock);

  addBlock("Englisch", data.translation, "ai-translation");

  resultEl.classList.remove("hidden");
}

// ---------- AI writing checker (Schreiben Aufgabe 2) ----------
// Sends the student's email + the checklist to the backend, then renders
// per-item "covered/missing" results, an overall note, and a corrected version.
async function requestWritingFeedback(textIndex) {
  const statusEl = document.querySelector(`[data-writing-status="${textIndex}"]`);
  const resultEl = document.querySelector(`[data-writing-result="${textIndex}"]`);
  if (!statusEl || !resultEl) return;

  const task = currentExam().writing?.tasks?.[textIndex];
  if (!task || task.type !== "text") return;
  const profile = writingProfile(task);

  const textKey = keyFor("writing", `text-${textIndex}`);
  const emailText = (state.writing[textKey] || "").trim();
  if (!emailText) {
    statusEl.classList.remove("hidden");
    statusEl.classList.add("error");
    statusEl.textContent = "Bitte schreiben Sie zuerst Ihre E-Mail / Ihren Brief.";
    resultEl.classList.add("hidden");
    return;
  }

  resultEl.classList.add("hidden");
  resultEl.innerHTML = "";
  statusEl.classList.remove("hidden", "error");
  statusEl.textContent = "Wird geprüft …";

  try {
    const response = await fetch("/api/writing-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailText,
        prompt: task.prompt || "",
        checklist: task.checklist || [],
        format: profile.format,
        register: profile.register
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Serverfehler.");
    statusEl.classList.add("hidden");
    showWritingFeedback(resultEl, data);
    // Persist the AI score so it contributes to the running total at the top
    // of the page and survives navigation.
    if (typeof data.score === "number") {
      state.writingScores[currentExam().id] = data.score;
      saveState();
      renderScore(currentExam());
    }
  } catch (error) {
    statusEl.classList.add("error");
    statusEl.textContent = `Fehler: ${error.message} Läuft der Server (node server.mjs)?`;
  }
}

// Build the writing-feedback display safely (textContent for API strings).
function showWritingFeedback(resultEl, data) {
  resultEl.innerHTML = "";

  // Big "Punkte: X / 10" headline so the score is the first thing the learner sees.
  if (typeof data.score === "number") {
    const scoreEl = document.createElement("div");
    const max = data.maxScore || 10;
    scoreEl.className = `ai-writing-score ${data.score >= 6 ? "ok" : "low"}`;
    scoreEl.innerHTML = `<span class="ai-block-label">Punkte (KI)</span>`;
    const big = document.createElement("strong");
    big.textContent = `${data.score} / ${max}`;
    scoreEl.append(big);
    resultEl.append(scoreEl);
  }

  // Word-count line (deterministic, computed by the server).
  if (typeof data.wordCount === "number") {
    const count = document.createElement("div");
    const ok = Boolean(data.wordCountOk);
    count.className = `ai-writing-item ${ok ? "ai-ok" : "ai-missing"}`;
    const icon = document.createElement("span");
    icon.className = "ai-writing-icon";
    icon.textContent = ok ? "✓" : "✗";
    const text = document.createElement("div");
    const label = document.createElement("strong");
    label.textContent = `Wörter: ${data.wordCount} / ${data.minWords || 30}`;
    const note = document.createElement("span");
    note.className = "muted";
    note.textContent = ok ? " – Mindestlänge erreicht." : " – Schreiben Sie noch ein paar Sätze mehr.";
    text.append(label, note);
    count.append(icon, text);
    resultEl.append(count);
  }

  // Per-item checklist results.
  const list = document.createElement("ul");
  list.className = "ai-writing-items";
  for (const item of data.items || []) {
    const li = document.createElement("li");
    li.className = `ai-writing-item ${item.covered ? "ai-ok" : "ai-missing"}`;
    const icon = document.createElement("span");
    icon.className = "ai-writing-icon";
    icon.textContent = item.covered ? "✓" : "✗";
    const text = document.createElement("div");
    const label = document.createElement("strong");
    label.textContent = item.label;
    const note = document.createElement("span");
    note.className = "muted";
    note.textContent = item.note ? ` – ${item.note}` : "";
    text.append(label, note);
    li.append(icon, text);
    list.append(li);
  }
  resultEl.append(list);

  // Grammar / capitalization issues from the AI.
  if (Array.isArray(data.grammar) && data.grammar.length) {
    const block = document.createElement("div");
    block.className = "ai-block ai-mistakes";
    const head = document.createElement("span");
    head.className = "ai-block-label";
    head.textContent = "Grammatik & Großschreibung";
    const ul = document.createElement("ul");
    for (const note of data.grammar) {
      const li = document.createElement("li");
      li.textContent = note;
      ul.append(li);
    }
    block.append(head, ul);
    resultEl.append(block);
  }

  // Overall comment.
  if (data.overall) {
    const overall = document.createElement("p");
    overall.className = "ai-writing-overall";
    overall.textContent = data.overall;
    resultEl.append(overall);
  }

  // Corrected/improved A1 version.
  if (data.corrected) {
    const block = document.createElement("div");
    block.className = "ai-block ai-corrected";
    const head = document.createElement("span");
    head.className = "ai-block-label";
    head.textContent = "Korrigierte Version";
    const body = document.createElement("p");
    body.textContent = data.corrected;
    block.append(head, body);
    resultEl.append(block);
  }

  resultEl.classList.remove("hidden");
}

function insertWritingSentence(key, sentence) {
  if (!key || !sentence) return;
  const current = state.writing[key] || "";
  state.writing[key] = current.trim()
    ? `${current.trimEnd()}\n${sentence}`
    : sentence;
  saveState();
  render();
  showToast("Satz eingefügt.");
}

// Grade the just-recorded card from criteria the tutor returned, update the
// running score, and persist. Per-card points = (criteria-met / 3) * (max / n).
// Returns the per-card entry it just saved so the caller can display it.
function recordCardScore(recordId, task, idx, cards, data) {
  const maxScore = speakingTaskMax(recordId);
  if (!maxScore || !cards.length) return null;
  const perCardMax = maxScore / cards.length;
  const sentences = Number.isFinite(data.sentences) ? data.sentences : 0;
  const grammarOk = Boolean(data.grammarOk);
  // onTopic defaults true so that empty cardTopic doesn't penalize the learner.
  const onTopic = typeof data.onTopic === "boolean" ? data.onTopic : true;
  const met = (sentences >= 2 ? 1 : 0) + (grammarOk ? 1 : 0) + (onTopic ? 1 : 0);
  // Round to 2 decimals to keep exact values like 1.25 intact - rounding to 1
  // decimal would push 1.25 to 1.3 because Math.round(12.5) === 13 in JS.
  const points = Math.round((met / 3) * perCardMax * 100) / 100;

  const store = state.speakingScores[recordId] || { maxScore, perCard: [], score: 0, summary: "" };
  store.maxScore = maxScore;
  store.perCard = store.perCard || [];
  store.perCard[idx] = {
    topic: cards[idx] || "",
    transcript: data.transcript || "",
    sentences,
    grammarOk,
    onTopic,
    points,
    perCardMax,
    note: data.mistakes?.join(" ") || ""
  };
  // Running total = sum of recorded card points so far. 2-decimal rounding
  // again so partial scores like 1.25 + 1.25 stay exact.
  store.score = Math.round(store.perCard.reduce((s, c) => s + (c?.points || 0), 0) * 100) / 100;
  state.speakingScores[recordId] = store;
  return store.perCard[idx];
}

// Tiny header block shown above each per-card correction with the immediate
// criteria check and points earned for THIS card.
function showCardScoreBlock(resultEl, card, recordId) {
  const max = card.perCardMax || (speakingTaskMax(recordId) / 4);
  const fmt = (n) => (Number.isInteger(n) ? `${n}` : Number(n).toFixed(2).replace(/0+$/, "").replace(/\.$/, ""));
  const ok = card.points >= max * 0.5;
  const block = document.createElement("div");
  block.className = `ai-writing-score ${ok ? "ok" : "low"}`;
  block.innerHTML = `<span class="ai-block-label">Karte – Punkte</span>`;
  const strong = document.createElement("strong");
  strong.textContent = `${fmt(card.points)} / ${fmt(max)}`;
  block.append(strong);
  const flags = document.createElement("p");
  flags.className = "muted";
  flags.style.margin = "4px 0 0";
  flags.textContent = `${card.sentences >= 2 ? "✓" : "✗"} ≥ 2 Sätze · ${card.grammarOk ? "✓" : "✗"} Grammatik · ${card.onTopic ? "✓" : "✗"} im Thema`;
  block.append(flags);
  // Keep the score line at the very top of the panel so it's the first thing
  // the learner sees after each card.
  resultEl.prepend(block);
}

async function startRecording(recordId) {
  if (!navigator.mediaDevices?.getUserMedia) {
    showToast("Aufnahme ist in diesem Browser nicht verfügbar.");
    return;
  }

  if (mediaRecorder?.state === "recording") {
    await stopRecording();
  }

  try {
    recordingStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordingChunks = [];
    recordingTaskId = recordId;
    mediaRecorder = new MediaRecorder(recordingStream);
    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size) recordingChunks.push(event.data);
    });
    mediaRecorder.addEventListener("stop", () => {
      const blob = new Blob(recordingChunks, { type: "audio/webm" });
      const finishedTaskId = recordingTaskId;
      const player = document.querySelector(`[data-player="${finishedTaskId}"]`);
      if (player) {
        player.src = URL.createObjectURL(blob);
        player.style.display = "block";
      }
      recordingStream?.getTracks().forEach((track) => track.stop());
      recordingStream = null;
      toggleRecordingButtons(finishedTaskId, false);
      // On practice exams the speaking panel has an AI tutor area; send the
      // audio there for transcription + correction. (No-op on the official set.)
      if (blob.size && document.querySelector(`[data-feedback="${finishedTaskId}"]`)) {
        requestSpeakingFeedback(finishedTaskId, blob);
      }
    });
    mediaRecorder.start();
    toggleRecordingButtons(recordId, true);
    showToast("Aufnahme gestartet.");
  } catch {
    showToast("Mikrofon-Zugriff wurde nicht erlaubt.");
  }
}

async function stopRecording() {
  if (mediaRecorder?.state === "recording") {
    mediaRecorder.stop();
    showToast("Aufnahme gestoppt.");
  }
}

function toggleRecordingButtons(recordId, active) {
  document.querySelectorAll(`[data-record="${recordId}"]`).forEach((button) => {
    if (button.dataset.action === "start-record") button.disabled = active;
    if (button.dataset.action === "stop-record") button.disabled = !active;
  });
}

examSelect.addEventListener("change", (event) => {
  state.examId = event.target.value;
  state.section = "overview";
  saveState();
  render();
});

sectionNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-section]");
  if (!button) return;
  state.section = button.dataset.section;
  saveState();
  clearInterval(timerHandle);
  render();
  app.focus({ preventScroll: true });
});

app.addEventListener("click", (event) => {
  const examCard = event.target.closest("[data-exam]");
  if (examCard) {
    state.examId = examCard.dataset.exam;
    state.section = "overview";
    saveState();
    render();
    return;
  }

  const action = event.target.closest("[data-action]");
  if (!action) return;

  if (action.dataset.action === "start-timer") startTimer(action.dataset.minutes);
  if (action.dataset.action === "submit-section") {
    state.submitted[submitKey(action.dataset.sectionName)] = true;
    saveState();
    render();
    showToast("Antworten geprüft.");
  }
  if (action.dataset.action === "reset-section") {
    const section = action.dataset.sectionName;
    Object.keys(state.answers).forEach((key) => {
      if (key.startsWith(`${currentExam().id}:${section}:`)) delete state.answers[key];
    });
    delete state.submitted[submitKey(section)];
    saveState();
    render();
    showToast(`${section === "reading" ? "Lesen" : "Hören"} zurückgesetzt.`);
  }
  if (action.dataset.action === "check-form") {
    state.submitted[`${currentExam().id}:writing-form`] = true;
    saveState();
    render();
    showToast("Formular geprüft.");
  }
  if (action.dataset.action === "reset-form") {
    Object.keys(state.writing).forEach((key) => {
      if (key.startsWith(`${currentExam().id}:writing:form-0-`)) delete state.writing[key];
    });
    delete state.submitted[`${currentExam().id}:writing-form`];
    saveState();
    render();
    showToast("Formular zurückgesetzt.");
  }
  if (action.dataset.action === "toggle-model") {
    const key = action.dataset.model;
    state.modelOpen[key] = !state.modelOpen[key];
    saveState();
    render();
  }
  if (action.dataset.action === "check-email") requestWritingFeedback(Number(action.dataset.textIndex));
  if (action.dataset.action === "insert-writing-sentence") insertWritingSentence(action.dataset.key, action.dataset.sentence);
  if (action.dataset.action === "speak-chat-prompt") speakWord(action.dataset.speakText || "");
  if (action.dataset.action === "choose-chat-situation") {
    setChatSituation(action.dataset.record, Number(action.dataset.chatIndex));
    updateCurrentCardDisplay(action.dataset.record);
  }
  if (action.dataset.action === "start-record") startRecording(action.dataset.record);
  if (action.dataset.action === "stop-record") stopRecording();
  if (action.dataset.action === "restart-cards") {
    const recordId = action.dataset.record;
    speakingCardProgress[recordId] = 0;
    // Wipe the collected transcripts and AI score so the next attempt is fresh.
    if (state.speakingRecords) delete state.speakingRecords[recordId];
    if (state.speakingScores) delete state.speakingScores[recordId];
    // Also clear the Aufgabe 1 exam selection so the user can pick anew.
    if (state.speakingExamCards) delete state.speakingExamCards[recordId];
    saveState();
    render();
    renderScore(currentExam());
  }
  if (action.dataset.action === "clear-exam-cards") {
    const recordId = action.dataset.record;
    if (state.speakingExamCards) delete state.speakingExamCards[recordId];
    // Also reset any partial run that depended on the old selection.
    if (state.speakingRecords) delete state.speakingRecords[recordId];
    if (state.speakingScores) delete state.speakingScores[recordId];
    speakingCardProgress[action.dataset.record] = 0;
    saveState();
    render();
    renderScore(currentExam());
  }
});

// Aufgabe 1 card selection: each card is a checkbox; toggle adds/removes the
// card from the recordId's selection list. Capped at 4; clicking a 5th is
// ignored (the checkbox snaps back unchecked).
document.addEventListener("change", (event) => {
  const cb = event.target.closest("[data-action='toggle-exam-card']");
  if (!cb) return;
  const recordId = cb.dataset.record;
  const card = cb.dataset.card;
  const list = state.speakingExamCards[recordId] ? state.speakingExamCards[recordId].slice() : [];
  if (cb.checked) {
    if (list.length >= 4) {
      cb.checked = false;
      showToast("Sie haben schon 4 Themen ausgewählt. Entfernen Sie zuerst eines.");
      return;
    }
    if (!list.includes(card)) list.push(card);
  } else {
    const i = list.indexOf(card);
    if (i >= 0) list.splice(i, 1);
  }
  state.speakingExamCards[recordId] = list;
  // Changing the selection invalidates any in-progress run for this task.
  speakingCardProgress[recordId] = 0;
  if (state.speakingRecords) delete state.speakingRecords[recordId];
  if (state.speakingScores) delete state.speakingScores[recordId];
  saveState();
  render();
});

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  if (!action) return;

  if (action.dataset.action === "toggle-theme") {
    applyTheme(theme === "dark" ? "light" : "dark");
    showToast(theme === "dark" ? "Dunkles Design aktiviert." : "Helles Design aktiviert.");
  }
  if (action.dataset.action === "print") window.print();
  if (action.dataset.action === "reset-all") {
    const exam = currentExam();
    if (!window.confirm(`„${exam.title}" zurücksetzen? Andere Tests bleiben unverändert.`)) return;
    resetExamProgress(exam.id);
    saveState();
    clearInterval(timerHandle);
    render();
    showToast(`${exam.title} zurückgesetzt.`);
  }
});

// Wipe every per-exam piece of state for one exam (answers, writing, notes,
// AI scores, speaking selections + records, recording progress). Leaves the
// other 12 exams' data alone.
function resetExamProgress(examId) {
  const matches = (key) =>
    typeof key === "string" && (key === examId || key.startsWith(`${examId}:`) || key.startsWith(`${examId}-`));

  const prune = (obj) => {
    if (!obj) return;
    for (const k of Object.keys(obj)) if (matches(k)) delete obj[k];
  };

  prune(state.answers);
  prune(state.writing);
  prune(state.checks);
  prune(state.notes);
  prune(state.submitted);
  // writingScores is keyed by exam id directly.
  if (state.writingScores) delete state.writingScores[examId];
  // These three are keyed by recordId ("<examId>-speaking-N").
  prune(state.speakingExamCards);
  prune(state.speakingRecords);
  prune(state.speakingScores);
  // In-memory recording session state.
  prune(speakingCardProgress);
  prune(chatPrevQuestion);
  prune(chatTurnIndex);
  prune(chatPromptSituationIndex);
}

document.addEventListener("change", (event) => {
  if (event.target.matches(".answer-input")) {
    state.answers[event.target.dataset.key] = event.target.value;
    saveState();
    renderScore(currentExam());
    renderNav(currentExam());
  }
  if (event.target.matches(".check-input")) {
    state.checks[event.target.dataset.key] = event.target.checked;
    saveState();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches(".answer-input") && event.target.type !== "radio") {
    state.answers[event.target.dataset.key] = event.target.value;
    saveState();
    renderScore(currentExam());
    renderNav(currentExam());
  }
  if (event.target.matches(".writing-input")) {
    state.writing[event.target.dataset.key] = event.target.value;
    saveState();
    if (event.target.tagName === "TEXTAREA") {
      const counter = event.target.nextElementSibling;
      if (counter?.classList.contains("word-count")) {
        const target = counter.textContent.match(/Ziel (\d+)\+/)?.[1];
        counter.textContent = `${countWords(event.target.value)} Wörter${target ? ` / Ziel ${target}+` : ""}`;
      }
    }
  }
  if (event.target.matches(".notes-input")) {
    state.notes[event.target.dataset.key] = event.target.value;
    saveState();
  }
});

document.addEventListener("keydown", (event) => {
  const card = event.target.closest("[data-exam]");
  if (!card) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    state.examId = card.dataset.exam;
    state.section = "overview";
    saveState();
    render();
  }
});

init();
