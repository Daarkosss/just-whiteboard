# Komunikacja backend - frontend

## REST API
1. CRUD do Whiteboardow
  - W szczegolnosci GET whiteboard/all, ktory zwraca wszystkie whiteboardy danego uzytkownika (UUID whiteboarda, nazwa, wszystkie obiekty). We wstepnej wersji nie przesylamy dataURLow (miniaturek whiteboardow), tylko generujemy wszystkie dataURLe po otrzymaniu response'a po stronie klienta. Czyli nie trzymamy dataURLow w bazie.
  - POST do tworzenia whiteboarda musi zwrocic klientowi UUID wygenerowane na backendzie dla tego whiteboarda, aby dokleic go do URLa


## Websockety (socket.io)
1. Informacje o obiektach z canvy - za kazdym razem wysylamy cala canve (jesli bedzie to za duzy narzut wydajnosciowy aby odswiezac za kazdym razem cala canve po stronie klienta, to wtedy pomyslimy nad wysylaniem tylko obieku ktory zostal aktualnie przez uzytkownika zmieniony)

2. Informacje o polozeniu kursorow uzytkownikow - podobna sytuacja, wysylamy za kazdym razem polozenie wszystkich kursorow klientow aktualnie pracujacych na danym whiteboardzie, w razie overkilla po stronie klienta, pomyslimy nad zmiana podobna jak przy pkt nr 1.
