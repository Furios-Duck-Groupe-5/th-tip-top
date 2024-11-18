# React + Vite

Bonjour :

Pour lancer le backend il faut :

aller au fichier backend -> cd/src/backend
npx tsc
puis lancer la commande  : node ../dist/index.js
we need to change this
Puis ouvrir un autre terminal:
aller à la racine du projet puis executer un :
yarn dev

npx tsc
mv ../dist/index.js ../dist/index.cjs
node ../dist/index.cjs


pour remplir la bdd :
-- Créer une fonction pour générer un code aléatoire de 10 caractères
CREATE OR REPLACE FUNCTION generate_random_code() RETURNS VARCHAR(10) AS $$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    code TEXT := '';
BEGIN
    FOR i IN 1..10 LOOP
        code := code || substr(chars, (random() * (length(chars)-1) + 1)::int, 1);
    END LOOP;
    RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Insérer les tickets avec les gains attribués
DO
$$
DECLARE
    total_tickets INT := 500000;
    infuseur_count INT := total_tickets * 60 / 100;
    detox_count INT := total_tickets * 20 / 100;
    signature_count INT := total_tickets * 10 / 100;
    coffret_39_count INT := total_tickets * 6 / 100;
    coffret_69_count INT := total_tickets * 4 / 100;
    code TEXT;
BEGIN
    FOR i IN 1..total_tickets LOOP
        code := generate_random_code();

        -- Insérer avec répartition des gains
        IF infuseur_count > 0 THEN
            INSERT INTO public.ticket (code_ticket, gain, status) VALUES (code, 'infuseur à thé', true);
            infuseur_count := infuseur_count - 1;
        ELSIF detox_count > 0 THEN
            INSERT INTO public.ticket (code_ticket, gain, status) VALUES (code, 'boîte de 100g thé détox ou infusion', true);
            detox_count := detox_count - 1;
        ELSIF signature_count > 0 THEN
            INSERT INTO public.ticket (code_ticket, gain, status) VALUES (code, 'boîte de 100g thé signature', true);
            signature_count := signature_count - 1;
        ELSIF coffret_39_count > 0 THEN
            INSERT INTO public.ticket (code_ticket, gain, status) VALUES (code, 'coffret découverte 39€', true);
            coffret_39_count := coffret_39_count - 1;
        ELSIF coffret_69_count > 0 THEN
            INSERT INTO public.ticket (code_ticket, gain, status) VALUES (code, 'coffret découverte 69€', true);
            coffret_69_count := coffret_69_count - 1;
        END IF;
    END LOOP;
END;
$$;
