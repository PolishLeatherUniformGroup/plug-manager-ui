// i18n.js
import i18n from 'i18next';
import { join } from 'path';
import { initReactI18next } from 'react-i18next';

// Przykładowe tłumaczenia w formacie JSON
const resources = {
  en: {
    translation: {
      home_partners: "Our Partners",
      home_upcoming_events: "Upcoming Events",
      home_social_media: "Our Social Media",
      nav_association: "Association",
      nav_association_contact: "Contact",
      nav_association_join: "Join",
      nav_home: "Home",
      nav_events: "Events",
      nav_member_zone: "Member Zone",
      nav_user_logged_in: "Logged in as",
      nav_user_logout: "Logout",
      nav_user_messages: "Messages",
      nav_user_manage: "Manage",
      footer_security: "Security",
      footer_security_privacy: "Privacy Policy",
      footer_security_gdpr: "GDPR Compliance",
      footer_contact: "Contact",
      footer_contact_join: "Membership Declaration",
      footer_contact_form: "Contact Form",
      join_form_title: "Membership Declaration",
      join_form_given_name: "Given Name",
      join_form_family_name: "Family Name",
      join_form_email: "Email",
      join_form_phone: "Phone",
      join_form_address: "Address",
      join_form_birth_date: "Birth Date",
      join_form_country: "Country",
      join_form_city: "City",
      join_form_postal_code: "Postal Code",
      join_form_street: "Street",
      join_form_house_number: "House Number",
      join_form_apartment_number: "Apartment Number",
      join_form_region: "Region / State",
      join_form_recommendations: "Recommendations",
      join_form_recommender_1: "Recommender 1",
      join_form_recommender_2: "Recommender 2",
      join_form_send: "Send application",
      contact_form_title: "Contact Form",
      contact_form_category: "Category",
      contact_form_category_placeholder: "Choose category of your message",
      contact_form_subject: "Subject",
      contact_form_name: "Name",
      contact_form_email: "E-mail",
      contact_form_name_placeholder: "How we should address you?",
      contact_form_text: "Message",
      contact_form_send: "Send"
    },
  },
  pl: {
    translation: {
      home_partners: "Nasi Partnerzy",
      home_upcoming_events: "Nadchodzące Wydarzenia",
      home_social_media: "Nasze Media Społecznościowe",
      nav_association: "Stowarzyszenie",
      nav_association_contact: "Kontakt",
      nav_association_join: "Dołącz",
      nav_home: "Start",
      nav_events: "Wydarzenia",
      nav_member_zone: "Strefa Członkowska",
      nav_user_logged_in: "Zalogowany jako",
      nav_user_logout: "Wyloguj się",
      nav_user_messages: "Wiadomości",
      nav_user_manage: "Zarządzaj",
      footer_security: "Bezpieczeństwo",
      footer_security_privacy: "Polityka Prywatności",
      footer_security_gdpr: "Zgodność z RODO",
      footer_contact: "Kontakt",
      footer_contact_join: "Deklaracja Członkowska",
      footer_contact_form: "Formularz Kontaktowy",
      join_form_title: "Deklaracja Członkowska",
      join_form_given_name: "Imię",
      join_form_family_name: "Nazwisko",
      join_form_email: "Email",
      join_form_phone: "Telefon",
      join_form_address: "Adres korespondencyjny",
      join_form_birth_date: "Data Urodzenia",
      join_form_country: "Kraj",
      join_form_city: "Miasto",
      join_form_postal_code: "Kod Pocztowy",
      join_form_street: "Ulica",
      join_form_house_number: "Numer Domu",
      join_form_apartment_number: "Numer Mieszkania",
      join_form_region: "Województwo / Stan",
      join_form_recommendations: "Rekomendacje",
      join_form_recommender_1: "Członek rekomendujący 1",
      join_form_recommender_2: "Członek rekomendujący 2",
      join_form_send: "Wyślij wniosek",
      contact_form_title: "Formularz kontaktowy",
      contact_form_category: "Sprawa",
      contact_form_category_placeholder: "Wybierz kategorię sprawy w jakiej się kontaktujesz",
      contact_form_subject: "Temat",
      contact_form_name: "Imię",
      contact_form_email: "Email",
      contact_form_name_placeholder: "Jak mamy się do ciebie zwracać",
      contact_form_text: "Wiadomość",
      contact_form_send: "Wyślij"
    },
  },
};

// Inicjalizacja i18next
i18n.use(initReactI18next).init({
  resources,
  lng: 'pl', // Domyślny język
  fallbackLng: 'pl',
  interpolation: {
    escapeValue: false, // React automatycznie zabezpiecza przed XSS
  },
});

export default i18n;

