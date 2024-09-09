// i18n.js
import i18n from 'i18next';
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
      contact_form_send: "Send",
      admin_members_import_title: "Members import",
      admin_members_fee_override_title: "Override member fee",
      admin_members_suspend_title: "Member suspension",
      admin_members_suspend_suspension_date: "Suspension date",
      admin_members_suspend_suspension_end: "Suspension end date",
      admin_members_suspend_suspension_reason: "Suspension reason",
      admin_members_suspend_suspension_apeal_deadline: "Final appeal date",
      admin_members_suspend_card_number: "Card number",
      admin_members_suspend_warning: "Member suspension is critical operation. Typ your card number, to confirm your action.",
      modal_button_save: "Save",
      modal_button_cancel: "Cancel",
      admin_members_expell_title: "Member's expulsion",
      admin_members_expell_expulsion_date: "Expulsiuon date",
      admin_members_expell_expulsion_reason: "Expulsion reason",
      admin_members_expell_expulsion_apeal_deadline: "Final appeal date",
      admin_members_expell_card_number: "Card No.",
      admin_members_expell_warning: "Member's excludion is critical operation. Type your card number to confirm your action.",
      admin_members_terminate_title: "Member's termination",
      admin_members_terminate_termination_date: "Data wykluczenia",
      admin_members_terminate_warning: "Member's termination ir irreversible. Type your card number to confirm your action.",
      admin_members_empty: "No Members to display",
      admin_members_counts: "Members count",
      table_rows_per_page: "Rows per page",
      members_card: "Card No.",
      members_name: "Member",
      members_join: "Join date",
      members_status: "Status",
      members_actions: "Actions",
      admin_applicants_empty: "No applications to display",
      admin_applicants_counts: "Applications count",
      applicants_name: "Applicant",
      applicants_date: "Apply date",
      applicants_status: "Status",
      applicants_actions: "Actions",
      applicant_status_0: "New",
      applicant_status_2: "Recommendation",
      applicant_status_3: "Not paid",
      applicant_status_4: "Waiting",
      applicant_status_5: "Accepted",
      applicant_status_6: "Rejected",
      applicant_status_7: "In appeal",
      applicant_status_8: "Cancelled",
      admin_sections_empty: "no sections to display",
      admin_sections_counts: "Sections count",
      sections_slug: "Slug",
      sections_visibility: "Visibility",
      sections_published: "Published",
      sections_actions: "Actions",
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
      contact_form_send: "Wyślij",
      admin_members_import_title: "Import członków",
      admin_members_fee_override_title: "Nadpisanie składki członkowskiej",
      admin_members_suspend_title: "Zawieszenie członka",
      admin_members_suspend_suspension_date: "Data zawieszenia",
      admin_members_suspend_suspension_end: "Koniec zawieszenia",
      admin_members_suspend_suspension_reason: "Powód zawieszenia",
      admin_members_suspend_suspension_apeal_deadline: "TOstateczny termin odwołania",
      admin_members_suspend_card_number: "Numer karty",
      admin_members_suspend_warning: "Zawieszenie członka jest operacją krytyczną. Wpisz numer swojej karty aby potwierdzić zawieszenie.",
      modal_button_save: "Zapisz",
      modal_button_cancel: "Anuluj",
      admin_members_expell_title: "Wykluczenie członka",
      admin_members_expell_expulsion_date: "Data wykluczenia",
      admin_members_expell_expulsion_reason: "Powód wykluczenia",
      admin_members_expell_expulsion_apeal_deadline: "Ostateczny termin odwołania",
      admin_members_expell_card_number: "Numer karty",
      admin_members_expell_warning: "Wykluczenie członka jest operacją krytyczną. Wpisz numer swojej karty aby potwierdzić wykluczenie.",
      admin_members_terminate_title: "Wykluczenie członka",
      admin_members_terminate_termination_date: "Data wykluczenia",
      admin_members_terminate_warning: "Wygaszenie członka jest operacją nieodwracalaną. Wpisz numer swojej karty aby potwierdzić wygaszenie.",
      admin_members_empty: "Brak członków do wyświetlenia",
      admin_members_counts: "Liczba członków",
      table_rows_per_page: "Wierszy na stronę",
      members_card: "Nr karty",
      members_name: "Członek",
      members_join: "Data dołączenia",
      members_status: "Status",
      members_actions: "Akcje",
      admin_applicants_empty: "Brak wniosków do wyświetlenia",
      admin_applicants_counts: "Liczba wniosków",
      applicants_name: "Kandydat",
      applicants_date: "Data wniosku",
      applicants_status: "Status",
      applicants_actions: "Akcje",
      applicant_status_0: "Nowy",
      applicant_status_2: "Rekomendacja",
      applicant_status_3: "Nieopłacony",
      applicant_status_4: "Oczekuje",
      applicant_status_5: "Zaakceptowany",
      applicant_status_6: "Odrzucony",
      applicant_status_7: "W odwołaniu",
      applicant_status_8: "Anulowany",
      admin_sections_empty: "Brak sekcji do wyświetlenia",
      admin_sections_counts: "Liczba sekcji",
      sections_slug: "Slug",
      sections_visibility: "Widoczność",
      sections_published: "Opublikowanie",
      sections_actions: "Akcje",
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

