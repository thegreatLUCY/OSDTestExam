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
      sample: "Liebe Frau Weber,\nich bin Ihr neuer Nachbar. Ich möchte Sie gern zu Kaffee und Kuchen einladen. Am Samstag um 16 Uhr habe ich Zeit. Können Sie kommen?\nViele Grüße\nOmar"
    }),
    speaking: practiceSpeaking([
      "Sie sind am Bahnhof. Fragen Sie nach einer Fahrkarte nach Salzburg, der Uhrzeit und dem Preis.",
      "Beschreiben Sie ein Bild: Eine Person kauft Obst im Supermarkt."
    ], {
      task1: "assets/img/practice/exam-1/speaking-1.jpg",
      task2: "assets/img/practice/exam-1/speaking-2.jpg",
      task3: "assets/img/practice/exam-1/speaking-3.jpg"
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
            ["A", "Sie sind krank und brauchen heute Vormittag einen Arzt.", 1],
            ["B", "Sie möchten abends Deutsch lernen.", 2],
            ["C", "Sie suchen Arbeit am Samstag.", 3],
            ["D", "Ihr Laptop funktioniert schlecht.", 5],
            ["E", "Sie möchten schwimmen und Sport machen.", 6]
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
      sample: "Sehr geehrter Herr Berger,\nich bin krank und kann morgen leider nicht arbeiten. Ich gehe morgen früh zum Arzt. Am Freitag komme ich wieder ins Büro.\nMit freundlichen Grüßen\nLena Ali"
    }),
    speaking: practiceSpeaking([
      "Sie rufen beim Arzt an. Fragen Sie nach einem Termin und sagen Sie, was weh tut.",
      "Beschreiben Sie ein Bild: Zwei Personen sprechen in einem Büro."
    ])
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
      sample: "Lieber Ben,\nich feiere am Samstag um 17 Uhr meinen Geburtstag im Jugendzentrum Nord. Bitte bring etwas zu trinken mit. Ich freue mich auf dich!\nViele Grüße\nJulia"
    }),
    speaking: practiceSpeaking([
      "Sie möchten ein Hotelzimmer reservieren. Fragen Sie nach Preis, Frühstück und Anreisezeit.",
      "Beschreiben Sie ein Bild: Eine Familie sitzt im Park und isst."
    ])
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
      sample: "Sehr geehrte Frau Novak,\nentschuldigen Sie bitte, ich kann morgen nicht zum Deutschkurs kommen. Ich habe einen Termin im Krankenhaus. Am Mittwoch bin ich wieder da. Was sind die Hausaufgaben?\nViele Grüße\nSamir Youssef"
    }),
    speaking: practiceSpeaking([
      "Sie sind im Handyshop. Fragen Sie nach einer SIM-Karte, Internet und dem Preis.",
      "Beschreiben Sie ein Bild: Menschen kaufen auf einem Markt ein."
    ])
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
            ["A", "Sie müssen ein Paket abholen.", 1],
            ["B", "Sie möchten ein Konto eröffnen.", 2],
            ["C", "Ihre Waschmaschine ist kaputt.", 3],
            ["D", "Sie brauchen am Morgen frisches Brot.", 4],
            ["E", "Sie möchten ein Buch ausleihen.", 5]
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
      sample: "Liebe Sara,\nich gehe am Samstag in die Stadt. Ich muss zur Post und zur Bank. Um 10 Uhr habe ich Zeit. Möchtest du mitkommen?\nLiebe Grüße\nNadia"
    }),
    speaking: practiceSpeaking([
      "Sie sind bei der Post. Fragen Sie nach einem Paket, dem Preis und den Öffnungszeiten.",
      "Beschreiben Sie ein Bild: Eine Person steht am Bankschalter."
    ])
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
            ["A", "Sie haben Zahnschmerzen und brauchen einen frühen Termin.", 1],
            ["B", "Sie suchen eine kleine Wohnung.", 2],
            ["C", "In Ihrer Küche ist der Wasserhahn kaputt.", 3],
            ["D", "Sie brauchen am Abend ein Medikament.", 4],
            ["E", "Sie möchten einen ruhigen Sportkurs beginnen.", 6]
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
            ["A", "Ich muss zum Zahnarzt, mein Zahn tut weh.", 1],
            ["B", "Wir sehen am Montag eine neue Wohnung an.", 2],
            ["C", "Der Wasserhahn in der Küche ist kaputt.", 3],
            ["D", "Ich brauche ein Medikament aus der Apotheke.", 4],
            ["E", "Heute Abend mache ich Yoga.", 6]
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
      emailPrompt: "Sie sind krank und können heute nicht zum Yogakurs kommen. Schreiben Sie circa 30 Wörter: was Sie haben, wann Sie wieder kommen, und fragen Sie nach dem nächsten Termin.",
      checklist: ["Anrede", "Grund genannt", "Rückkehr genannt", "Frage nach Termin", "Gruß"],
      sample: "Sehr geehrte Frau Steiner,\nich bin heute krank und kann leider nicht zum Yogakurs kommen. Ich habe Fieber. Nächste Woche komme ich wieder. Wann ist der nächste Termin?\nViele Grüße\nBilal"
    }),
    speaking: practiceSpeaking([
      "Sie rufen beim Installateur an. Sagen Sie, was kaputt ist, und fragen Sie nach einem Termin.",
      "Beschreiben Sie ein Bild: Eine Person ist in der Apotheke."
    ])
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
            ["A", "Sie suchen eine Arbeit im Büro.", 1],
            ["B", "Sie möchten E-Mails am Computer schreiben lernen.", 2],
            ["C", "Sie suchen einen Kindergartenplatz.", 3],
            ["D", "Sie müssen Dokumente kopieren.", 4],
            ["E", "Sie möchten kostenlos Deutsch sprechen üben.", 6]
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
      emailPrompt: "Sie bewerben sich für eine Arbeit im Büro. Schreiben Sie circa 30 Wörter: wer Sie sind, wann Sie arbeiten können, und fragen Sie nach einem Termin.",
      checklist: ["Anrede", "Person vorgestellt", "Arbeitszeit genannt", "Frage nach Termin", "Gruß"],
      sample: "Sehr geehrte Damen und Herren,\nich heiße Maria Lopez und suche eine Arbeit im Büro. Ich kann am Vormittag arbeiten. Haben Sie nächste Woche einen Termin für ein Gespräch?\nMit freundlichen Grüßen\nMaria Lopez"
    }),
    speaking: practiceSpeaking([
      "Sie möchten sich für einen Computerkurs anmelden. Fragen Sie nach Zeit, Preis und Raum.",
      "Beschreiben Sie ein Bild: Personen sitzen in einem Kursraum."
    ])
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
            ["A", "Sie möchten am Samstag mit Kindern einen Film sehen.", 1],
            ["B", "Sie möchten Tiere sehen.", 2],
            ["C", "Sie brauchen einen Termin zum Haare schneiden.", 3],
            ["D", "Sie möchten einen Tisch für das Abendessen reservieren.", 4],
            ["E", "Sie möchten am Mittwoch kostenlos ins Museum.", 5]
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
            ["A", "Wir sehen heute einen Film im Kino.", 1],
            ["B", "Die Kinder möchten Tiere sehen.", 2],
            ["C", "Ich habe um 17 Uhr einen Termin beim Friseur.", 3],
            ["D", "Wir essen heute Pizza im Restaurant.", 4],
            ["E", "Im Museum ist heute der Eintritt frei.", 5]
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
      emailPrompt: "Sie laden eine Freundin ins Kino ein. Schreiben Sie circa 30 Wörter: welchen Film Sie sehen möchten, wann Sie gehen, und fragen Sie, ob sie Zeit hat.",
      checklist: ["Anrede", "Film/Kino genannt", "Tag/Uhrzeit genannt", "Frage", "Gruß"],
      sample: "Liebe Anna,\nich möchte am Samstag ins Kino Central gehen. Der Familienfilm beginnt um 16 Uhr. Hast du Zeit und möchtest du mitkommen?\nLiebe Grüße\nAmir"
    }),
    speaking: practiceSpeaking([
      "Sie möchten im Restaurant einen Tisch reservieren. Fragen Sie nach Uhrzeit, Personen und Terrasse.",
      "Beschreiben Sie ein Bild: Eine Familie ist im Zoo."
    ])
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
            ["A", "Sie sind umgezogen und müssen Ihre neue Adresse anmelden.", 1],
            ["B", "Sie haben Ihre Tasche im Bus verloren.", 2],
            ["C", "Sie brauchen ein Konto und eine Bankkarte.", 3],
            ["D", "Sie brauchen heute noch Passfotos und Kopien.", 4],
            ["E", "Sie haben Fragen zu Ihrer Krankenversicherung.", 5]
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
            ["A", "Ich warte im Rathaus. Ich möchte meine neue Adresse anmelden.", 1],
            ["B", "Meine Schlüssel sind weg. Vielleicht sind sie im Fundbüro.", 2],
            ["C", "Ich fülle ein Formular für ein neues Konto aus.", 3],
            ["D", "Für den Antrag brauche ich ein Passfoto und zwei Kopien.", 4],
            ["E", "Ich verstehe das Formular für die Versicherung nicht.", 5]
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
      emailPrompt: "Sie haben Ihre Tasche verloren und schreiben an das Fundbüro. Schreiben Sie circa 30 Wörter: was Sie verloren haben, wann/wo das war, und fragen Sie nach einer Antwort.",
      checklist: ["Anrede", "Sache beschrieben", "Zeit/Ort genannt", "Frage/Bitte", "Gruß"],
      sample: "Sehr geehrte Damen und Herren,\nich habe gestern im Bus 13 eine schwarze Tasche verloren. In der Tasche sind Schlüssel und ein Buch. Haben Sie die Tasche gefunden?\nMit freundlichen Grüßen\nLina Farah"
    }),
    speaking: practiceSpeaking([
      "Sie sind im Fundbüro. Fragen Sie nach Ihrer verlorenen Tasche, der Abholzeit und den Dokumenten.",
      "Beschreiben Sie ein Bild: Menschen warten in einem Amt."
    ])
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
            ["A", "Ihr Zug fällt aus und Sie brauchen ein neues Ticket.", 1],
            ["B", "Ihr Koffer ist kaputt und Sie möchten ihn reparieren lassen.", 2],
            ["C", "Sie kommen spät an und brauchen ein Hotelzimmer.", 3],
            ["D", "Sie wollen morgen wandern und brauchen Informationen zum Wetter.", 4],
            ["E", "Sie möchten die Altstadt mit einer Gruppe sehen.", 5]
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
            ["A", "Der Zug hat Verspätung. Viele Leute warten am Bahnsteig.", 1],
            ["B", "Ich suche am Flughafen den Bus in die Stadt.", 2],
            ["C", "Der Koffer ist schwer. Ich stelle ihn in ein Schließfach.", 3],
            ["D", "An der Rezeption bekomme ich die Zimmerkarte.", 4],
            ["E", "Es regnet stark. Für die Wanderung brauche ich eine Jacke.", 5]
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
      emailPrompt: "Ihr Zug hat Verspätung und Sie schreiben an das Hotel. Schreiben Sie circa 30 Wörter: warum Sie später kommen, wann Sie ankommen, und fragen Sie nach dem Schlüssel.",
      checklist: ["Anrede", "Grund genannt", "Ankunftszeit genannt", "Frage nach Schlüssel", "Gruß"],
      sample: "Sehr geehrte Damen und Herren,\nmein Zug hat heute Verspätung. Ich komme erst nach 22 Uhr im Hotel an. Liegt der Schlüssel an der Rezeption?\nMit freundlichen Grüßen\nDavid Novak"
    }),
    speaking: practiceSpeaking([
      "Sie sind am Bahnhof. Ihr Zug hat Verspätung. Fragen Sie nach einem neuen Ticket, dem Gleis und der Ankunftszeit.",
      "Beschreiben Sie ein Bild: Reisende warten mit Koffern am Bahnhof."
    ])
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
            ["A", "Ich stehe vor der Tür. Mein Schlüssel ist in der Wohnung.", 1],
            ["B", "Heute wasche ich im Keller. Ich habe mich in die Liste eingetragen.", 2],
            ["C", "Der Heizkörper bleibt kalt, obwohl es draußen sehr kalt ist.", 3],
            ["D", "Die Nachbarn feiern laut. Ich kann nicht schlafen.", 4],
            ["E", "Im Innenhof verkaufen wir am Samstag alte Sachen.", 5]
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
      emailPrompt: "Ihre Nachbarin feiert sehr laut. Schreiben Sie circa 30 Wörter: warum Sie schreiben, was das Problem ist, und bitten Sie um eine Lösung.",
      checklist: ["Anrede", "Grund genannt", "Problem beschrieben", "Bitte/Lösung", "Gruß"],
      sample: "Liebe Frau Berger,\nich schreibe wegen der Musik. Es ist spät und sehr laut. Mein Kind kann nicht schlafen. Können Sie die Musik bitte leiser machen?\nViele Grüße\nNora Klein"
    }),
    speaking: practiceSpeaking([
      "Sie rufen die Hausverwaltung an. Melden Sie eine kaputte Heizung und fragen Sie nach einem Termin.",
      "Beschreiben Sie ein Bild: Eine Person steht mit einem Schlüssel vor einer Wohnungstür."
    ])
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
            ["A", "Sie möchten Ihren Lebenslauf prüfen lassen und einen Termin buchen.", 1],
            ["B", "Sie haben einen Abholcode und möchten ein Paket bekommen.", 2],
            ["C", "Ihr Handyvertrag ist zu teuer und Sie brauchen Beratung.", 3],
            ["D", "Sie möchten lernen, wie man eine E-Mail und ein Online-Formular schreibt.", 4],
            ["E", "Sie müssen Ihre Bewerbung ausdrucken und Dokumente scannen.", 5]
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
            ["A", "Ich hole ein Paket mit einem Code ab.", 1],
            ["B", "Mein Termin ist online. Ich spreche am Computer mit der Beraterin.", 2],
            ["C", "Ich drucke meine Bewerbung und scanne ein Zeugnis.", 3],
            ["D", "Morgen habe ich ein Gespräch wegen einer Arbeit.", 4],
            ["E", "Im Handyshop kaufe ich eine neue SIM-Karte.", 5]
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
      emailPrompt: "Sie können nicht zum Computerkurs kommen. Schreiben Sie circa 30 Wörter: warum Sie nicht kommen, wann Sie wieder Zeit haben, und fragen Sie nach den Hausaufgaben.",
      checklist: ["Anrede", "Absage/Grund", "neuer Termin/Zeit", "Frage nach Hausaufgaben", "Gruß"],
      sample: "Liebe Frau Bauer,\nleider kann ich heute nicht zum Computerkurs kommen, weil ich krank bin. Am Montag habe ich wieder Zeit. Können Sie mir bitte die Hausaufgaben schicken?\nViele Grüße\nSami Yildiz"
    }),
    speaking: practiceSpeaking([
      "Sie haben einen Termin im Jobcenter. Fragen Sie nach dem Raum, den Unterlagen und einem neuen Termin.",
      "Beschreiben Sie ein Bild: Eine Person holt ein Paket an einer Paketstation ab."
    ])
  })
];

function practiceWriting({ formPrompt, fields, emailPrompt, checklist, sample }) {
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
        title: "Aufgabe 2: Persönliches E-Mail",
        prompt: emailPrompt,
        minWords: 30,
        checklist,
        sample
      }
    ]
  };
}

function practiceSpeaking([roleText, pictureText], images = {}) {
  return {
    minutes: 10,
    tasks: [
      {
        title: "Aufgabe 1: Über etwas sprechen (sich vorstellen)",
        prompt: "Wählen Sie 4 Themen aus und sprechen Sie zu jedem Thema ein paar Sätze.",
        image: images.task1,
        cards: ["Sprachen", "Hobbys", "Sport", "Familie", "Beruf", "Lieblingsessen"],
        model: "Beispiel: „Ich heiße … Ich komme aus … Ich spreche … Mein Hobby ist … Meine Familie …“"
      },
      {
        title: "Aufgabe 2: Über etwas sprechen (Situationen beschreiben)",
        prompt: pictureText + " Sagen Sie: Was sehen Sie? Wie viele Personen? Wo sind sie? Was machen sie?",
        image: images.task2,
        cards: ["Was?", "Wie viele Personen?", "Wo?", "Was machen sie?"],
        model: "Beispiel: „Ich sehe … Es sind … Personen. Sie sind … Sie … gerade.“"
      },
      {
        title: "Aufgabe 3: Miteinander sprechen (Alltagssituationen)",
        prompt: roleText,
        image: images.task3,
        cards: ["Begrüßung", "Wunsch / Frage", "Reaktion", "Abschluss"],
        model: "Beispiel: „Guten Tag! Ich möchte … Können Sie mir helfen? … Vielen Dank, auf Wiedersehen!“"
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
      modelOpen: parsed?.modelOpen || {}
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
    modelOpen: {}
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
  return {
    lesen: lesen.points,
    hoeren: hoeren.points,
    form: form.points,
    total: lesen.points + hoeren.points + form.points,
    max: 65
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

function init() {
  applyTheme(theme, false);
  examSelect.innerHTML = exams
    .map((exam) => `<option value="${exam.id}">${exam.official ? "★ " : ""}${exam.title}</option>`)
    .join("");
  examSelect.value = currentExam().id;
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
  scoreValue.textContent = `${score.total} / ${score.max}`;
  scoreMeter.style.width = `${Math.round((score.total / score.max) * 100)}%`;
  const lesenOk = score.lesen >= 6;
  const hoerenOk = score.hoeren >= 6;
  progressText.innerHTML =
    `Lesen <strong>${score.lesen}</strong>/30 ${lesenOk ? "✓" : "(min. 6)"} · ` +
    `Hören <strong>${score.hoeren}</strong>/30 ${hoerenOk ? "✓" : "(min. 6)"} · ` +
    `Schreiben A1 <strong>${score.form}</strong>/5.<br>` +
    `Schreiben A2 (10) und Sprechen (25) bewerten Sie mit Checkliste und Modell.`;
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
    ${renderPageHead("ÖSD ZA1 – kompletter Test", "Der erste Eintrag ist der offizielle ÖSD-ZA1-Modellsatz mit Originaltexten, Originalaudio und dem offiziellen Lösungsschlüssel. Danach folgen vier Übungssätze mit genau gleichem Aufbau.", null)}
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
          <div class="skill"><strong>Schreiben · 20 min</strong><p>A1: Formular (5 P., automatisch korrigiert). A2: persönliches E-Mail, ca. 30 Wörter (10 P.).</p></div>
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
    ${renderPageHead("Schreiben", "Aufgabe 1: Formular ausfüllen (5 Punkte, automatisch korrigiert). Aufgabe 2: persönliches E-Mail, ca. 30 Wörter (10 Punkte, Selbstkontrolle).", exam.writing.minutes)}
    ${exam.writing.tasks.map((task, index) => task.type === "form" ? renderFormTask(task, index) : renderTextTask(task, index)).join("")}
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
      <textarea class="writing-input" data-key="${textKey}" placeholder="Schreiben Sie hier Ihre Antwort ...">${escapeHtml(state.writing[textKey] || "")}</textarea>
      <div class="word-count">${words} Wörter ${task.minWords ? `/ Ziel ${task.minWords}+` : ""}</div>
      <div class="check-list">
        ${task.checklist.map((item, itemIndex) => {
          const key = keyFor("writing", `check-${index}-${itemIndex}`);
          return `
            <label class="check-row">
              <input class="check-input" type="checkbox" data-key="${key}" ${state.checks[key] ? "checked" : ""}>
              <span>${item}</span>
            </label>
          `;
        }).join("")}
      </div>
      ${renderModelButton(`writing-text-${index}`)}
      <div class="model-box ${state.modelOpen[`writing-text-${index}`] ? "" : "hidden"}">${escapeHtml(task.sample).replaceAll("\n", "<br>")}</div>
    </article>
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
  return `
    <article class="speaking-panel">
      <div class="task-head">
        <div>
          <h2>${task.title}</h2>
          <p class="instructions">${task.prompt}</p>
        </div>
        <span class="tag gold">Teil ${index + 1}</span>
      </div>
      ${task.image ? `<img class="task-image" src="${task.image}" alt="Originalseite Sprechen" loading="lazy">` : ""}
      ${task.cards ? `<div class="speaking-cards">${task.cards.map((card) => `<div class="speaking-card"><strong>${card}</strong><span class="muted">Ein paar einfache Sätze.</span></div>`).join("")}</div>` : ""}
      <div class="action-row">
        <button type="button" data-action="start-record" data-record="${recordId}">Aufnahme starten</button>
        <button class="ghost-btn" type="button" data-action="stop-record" data-record="${recordId}" disabled>Stopp</button>
      </div>
      <audio class="recording-player" controls data-player="${recordId}"></audio>
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
      const player = document.querySelector(`[data-player="${recordingTaskId}"]`);
      if (player) {
        player.src = URL.createObjectURL(blob);
        player.style.display = "block";
      }
      recordingStream?.getTracks().forEach((track) => track.stop());
      recordingStream = null;
      toggleRecordingButtons(recordingTaskId, false);
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
  if (action.dataset.action === "start-record") startRecording(action.dataset.record);
  if (action.dataset.action === "stop-record") stopRecording();
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
    if (!window.confirm("Alle Antworten und Notizen zurücksetzen?")) return;
    state = freshState();
    saveState();
    clearInterval(timerHandle);
    render();
    showToast("Alle Daten zurückgesetzt.");
  }
});

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
