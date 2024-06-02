# Komunikacja backend - frontend

## Zasady ogolne

### Autentykacja

1. Frontend uzywa komponentu Google do logowania.
2. Google po udanym logowaniu zwraca token JWT i zapisujemy go do local storage przegladarki.
3. Frontend wysyla token JWT do backendu:
    - przy kazdym requescie do REST API (wysylamy go w headerze)
    - przy handshake'u websocketowym. Moznaby nawet przy kazdym message'u wysylac ten JWT ale czy jest to konieczne?
4. Backend pyta Google czy ten token JWT jest dobry:
    - jesli jest dobry to normalnie obslugujemy request
    - jesli jest cos nie tak z JWT, to powinno zwrocic kod 401 Unauthorized i tutaj powinna byc jakas wiadomosc typu: "Zaloguj się ponownie, bo token ci wygasl". W nastepnej wersji mozemy zrobic odswiezanie tokenow w takiej sytuacji.

## REST API
1. CRUD do Whiteboardow
    - GET whiteboard/all, ktory zwraca wszystkie whiteboardy danego uzytkownika (UUID whiteboarda, nazwa, wszystkie obiekty). We wstepnej wersji nie przesylamy dataURLow (miniaturek whiteboardow), tylko generujemy wszystkie dataURLe dopiero po otrzymaniu response'a po stronie klienta. Czyli nie trzymamy dataURLow w bazie. 
    - GET do konkretnego whiteboarda gdy ktos go kliknie i zacznie prace z nim. Zwracamy obiekty z canvy i w tym momencie nawiazujemy tez handshake'a dla websocketow. 
    - POST do tworzenia whiteboarda musi zwrocic klientowi UUID wygenerowane na backendzie dla tego whiteboarda, aby dokleic go do URLa
    - PUT do edytowania whiteboarda. Wstepnie chyba tylko edycja nazwy, w nastepnej wersji mozemy sie pokusic o zarzadzanie uzytkownikami majacymi dostep do whiteboarda, ale do tego tez bedzie potrzebny bardziej skomplikowany system zapraszania uzytkownikow do boarda.
    - DELETE do usuwania whiteboarda.

2. Z REST API to chyba tyle. CRUD do whiteboardow powinien wystarczyc na ten moment :D

## Websockety (socket.io)
1. Informacje o obiektach z canvy - za kazdym razem wysylamy cala canve (jesli bedzie to za duzy narzut wydajnosciowy aby odswiezac za kazdym razem cala canve po stronie klienta, to wtedy pomyslimy nad wysylaniem tylko obieku ktory zostal aktualnie przez uzytkownika zmieniony)

2. Informacje o polozeniu kursorow uzytkownikow - podobna sytuacja, wysylamy za kazdym razem polozenie wszystkich kursorow klientow aktualnie pracujacych na danym whiteboardzie, w razie overkilla po stronie klienta, pomyslimy nad zmiana podobna jak przy pkt nr 1.
