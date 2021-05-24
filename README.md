Instruktion för att starta den lokala REST-API servern:

Kör detta kommando i terminalen: 

json-server --watch "data\courses.json"      (du ska stå i roten av huvudmappen)

---------------------------------

# ITHS.NET.Webbutveckling.Lab2
 
Denna lab ingick i kursen "Webbutveckling med .NET 60p" på IT-Högskolan i Göteborg som jag läste våren år 2021.

## Uppgiftsbeskrivningen för labben:
#### Steg 2 för Westcoast Education
Kunden är väldigt nöjd med vårt "proof of concept" och vill väldigt gärna fortsätta med oss som leverantör av deras nya utbildningsplattform.

Så i steg 2 vill kunden se följande två delar implementerade i vår lösning.

En kundvagn där kunden kan se vilka kunder de har valt i kurslistan, så det behövs ett sätta att lägga en kurs i kurslistan
Ett verktyg för kunden att kunna lägga till nya kurser
De har lite specifika krav när det gäller verktyget för att kunna lägga till en ny kurs. De vill att det är utfört som en modal dialogruta där de kan mata in uppgifterna:

Kursnummer
Kurs titel
Kurs beskrivning
Kursens längd
Så fort kursen är skapad skall den synas i kurslistan på presentations sidan

För kundvagnen vill kunden att efter det att kurs eller kurser är valda skall det gå att gå till kundvagnen och kunna se vilken eller vilka kurser som finns i kundvagnen. Det skall gå att ta bort kurs eller kurser ifrån kundvagnen. Det skall även finnas en knapp med titeln Köp. Kunden har ännu inte avslutat avtalet med den tredje parts leverantören av betalningshantering. Så vi kan inte lägga till någon logik bakom knappen ännu. Däremot vill kunden se att en modal dialogruta som bekräftar köpet.

#### Tips
Kundvagnen bör vara implementerad som en array

#### Krav
Lösningen skall vara implementerad med standard HTML, CSS och Vanilla JavaScript(standard ES JavaScript)
