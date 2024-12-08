# Projet Jeu-Concours pour Furious Ducks et Thé Tip Top

# Démarrage du Projet

# Lancer le Backend
-Accédez au dossier src/backend : cd src/backend

-Compilez le code TypeScript en JavaScript pour générer les fichiers nécessaires à l’exécution puis lancez le serveur backend
npx tsc
mv ../dist/index.js ../dist/index.cjs
node ../dist/index.cjs


# Lancer le Frontend
Ouvrez un terminal et placez-vous dans le répertoire racine du projet.
Lancez le serveur de développement pour afficher l’application front-end avec:
yarn dev



Fonctionnalités du Site Jeu-Concours

# Pour les Participants
Création de comptes via Google, Facebook ou formulaire classique.
Saisie et validation des numéros de tickets pour participer au tirage au sort.
Historique des gains consultable en ligne.

# Pour les Administrateurs
Visualisation des statistiques en temps réel (tickets distribués, lots gagnés, données démographiques des participants).
Outils pour emailings à des fins marketing.
Grand tirage
Création d'un(e) employe(e)
Pour les Employés en Boutique
Export des en Excel
Gestion des utilisateurs

# Pour les employe(e)s
Vérification des gains associés à un ticket et possibilité de marquer les lots comme remis.

Conformité Technique et Légale
Accessibilité : Le site respecte les normes pour être consulté sur tous types de devices et navigateurs.
RGPD Friendly : Les données des participants sont gérées conformément aux réglementations européennes.
Éco-responsabilité : Toutes les technologies sélectionnées suivent une démarche respectueuse de l’environnement.
Gestion de Projet
Organisation

Un outil de suivi  est utilisé pour la planification des tâches et le suivi des livrables ( GitHub)
Livrables

Charte graphique modernisée pour Thé Tip Top.
Site responsive et optimisé pour le SEO.
Documentation technique pour faciliter la prise en main et la maintenance.
Méthodologie

Une gestion de projet en méthodologie Agile permet de livrer des incréments fonctionnels à chaque sprint, avec des ajustements itératifs selon les retours.
Déploiement
Le workflow de production est basé sur Docker pour garantir l’uniformité des environnements et une montée en charge facile, avec :

CI/CD via Jenkins.
Automatisation des sauvegardes pour garantir la sécurité des données.
Test coverage


# Une fonction PostgreSQL est configurée pour générer automatiquement des codes aléatoires de 10 caractères alphanumériques.
Pré-remplissage des Tickets

Une procédure est mise en place pour insérer jusqu’à 500 000 tickets dans la base de données, en respectant les pourcentages de répartition des lots :
60% : Infuseurs à thé.
20% : Boîtes de thé détox ou infusion.
10% : Boîtes de thé signature.
6% : Coffrets découverte (39€).
4% : Coffrets découverte (69€).

# La fonction pour générer un code aléatoire de 10 caractères
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
$$,



Réalisé par :
Abbad Mohamed
Atmani Anas
Safi Azzedine
Teffah Zakaria