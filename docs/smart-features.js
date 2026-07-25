"use strict";

/* =====================================
   MULTI-LANGUAGE SUPPORT
===================================== */

const translations = {
    en: {
        languageLabel: "Select Language:",
        searchLabel: "Search Products:",
        laptop: "Laptop",
        smartphone: "Smartphone",
        headphones: "Headphones",
        chatTitle: "Live Support",
        onlineStatus: "Online",
        welcomeMessage: "Hello! How can we help you today?",
        sendButton: "Send",
        searchPlaceholder: "Search for a product",
        chatPlaceholder: "Type your message"
    },

    ne: {
        languageLabel: "भाषा छान्नुहोस्:",
        searchLabel: "उत्पादन खोज्नुहोस्:",
        laptop: "ल्यापटप",
        smartphone: "स्मार्टफोन",
        headphones: "हेडफोन",
        chatTitle: "प्रत्यक्ष सहायता",
        onlineStatus: "अनलाइन",
        welcomeMessage: "नमस्कार! हामी तपाईंलाई कसरी मद्दत गर्न सक्छौँ?",
        sendButton: "पठाउनुहोस्",
        searchPlaceholder: "उत्पादन खोज्नुहोस्",
        chatPlaceholder: "आफ्नो सन्देश लेख्नुहोस्"
    },

    es: {
        languageLabel: "Seleccionar idioma:",
        searchLabel: "Buscar productos:",
        laptop: "Portátil",
        smartphone: "Teléfono inteligente",
        headphones: "Auriculares",
        chatTitle: "Soporte en vivo",
        onlineStatus: "En línea",
        welcomeMessage: "¡Hola! ¿Cómo podemos ayudarle hoy?",
        sendButton: "Enviar",
        searchPlaceholder: "Buscar un producto",
        chatPlaceholder: "Escriba su mensaje"
    }
};

const languageSelect = document.getElementById("languageSelect");
const productSearch = document.getElementById("productSearch");
const chatInput = document.getElementById("chatInput");

function changeLanguage(language) {
    const selectedTranslations =
        translations[language] || translations.en;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-translate]").forEach((element) => {
        const translationKey = element.dataset.translate;

        if (selectedTranslations[translationKey]) {
            element.textContent = selectedTranslations[translationKey];
        }
    });

    productSearch.placeholder =
        selectedTranslations.searchPlaceholder;

    chatInput.placeholder =
        selectedTranslations.chatPlaceholder;

    localStorage.setItem("preferredLanguage", language);
}

languageSelect.addEventListener("change", (event) => {
    changeLanguage(event.target.value);
});

const savedLanguage =
    localStorage.getItem("preferredLanguage") || "en";

languageSelect.value = savedLanguage;
changeLanguage(savedLanguage);


/* =====================================
   ACCESSIBILITY MODE
===================================== */

const accessibilityButton =
    document.getElementById("accessibilityButton");

const increaseTextButton =
    document.getElementById("increaseTextButton");

const resetAccessibilityButton =
    document.getElementById("resetAccessibilityButton");

accessibilityButton.addEventListener("click", () => {
    document.body.classList.toggle("accessibility-mode");

    const isEnabled =
        document.body.classList.contains("accessibility-mode");

    localStorage.setItem(
        "accessibilityMode",
        String(isEnabled)
    );
});

increaseTextButton.addEventListener("click", () => {
    document.body.classList.toggle("large-text");

    const isEnabled =
        document.body.classList.contains("large-text");

    localStorage.setItem(
        "largeTextMode",
        String(isEnabled)
    );
});

resetAccessibilityButton.addEventListener("click", () => {
    document.body.classList.remove(
        "accessibility-mode",
        "large-text"
    );

    localStorage.removeItem("accessibilityMode");
    localStorage.removeItem("largeTextMode");
});

if (localStorage.getItem("accessibilityMode") === "true") {
    document.body.classList.add("accessibility-mode");
}

if (localStorage.getItem("largeTextMode") === "true") {
    document.body.classList.add("large-text");
}


/* =====================================
   PRODUCT SEARCH
===================================== */

const productCards =
    document.querySelectorAll(".demo-product");

function filterProducts(searchValue) {
    const cleanedSearch = searchValue
        .trim()
        .toLowerCase();

    productCards.forEach((productCard) => {
        const productKeywords =
            productCard.dataset.product.toLowerCase();

        const productMatches =
            productKeywords.includes(cleanedSearch);

        productCard.classList.toggle(
            "hidden-product",
            !productMatches
        );
    });
}

productSearch.addEventListener("input", (event) => {
    filterProducts(event.target.value);
});


/* =====================================
   VOICE SEARCH
===================================== */

const voiceSearchButton =
    document.getElementById("voiceSearchButton");

const voiceSearchStatus =
    document.getElementById("voiceSearchStatus");

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    recognition.lang = "en-AU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    voiceSearchButton.addEventListener("click", () => {
        voiceSearchStatus.textContent =
            "Listening... Please say a product name.";

        recognition.start();
    });

    recognition.addEventListener("result", (event) => {
        const spokenText =
            event.results[0][0].transcript;

        productSearch.value = spokenText;
        filterProducts(spokenText);

        voiceSearchStatus.textContent =
            `You searched for: ${spokenText}`;
    });

    recognition.addEventListener("error", (event) => {
        voiceSearchStatus.textContent =
            `Voice search error: ${event.error}`;
    });

    recognition.addEventListener("end", () => {
        if (
            voiceSearchStatus.textContent ===
            "Listening... Please say a product name."
        ) {
            voiceSearchStatus.textContent =
                "No voice input was detected.";
        }
    });
} else {
    voiceSearchButton.disabled = true;

    voiceSearchStatus.textContent =
        "Voice search is not supported by this browser.";
}


/* =====================================
   LIVE CHAT DEMONSTRATION
===================================== */

const chatToggleButton =
    document.getElementById("chatToggleButton");

const chatWindow =
    document.getElementById("chatWindow");

const closeChatButton =
    document.getElementById("closeChatButton");

const chatForm =
    document.getElementById("chatForm");

const chatMessages =
    document.getElementById("chatMessages");

function openChat() {
    chatWindow.classList.add("chat-open");
    chatInput.focus();
}

function closeChat() {
    chatWindow.classList.remove("chat-open");
}

chatToggleButton.addEventListener("click", openChat);
closeChatButton.addEventListener("click", closeChat);

function addChatMessage(message, messageType) {
    const messageElement =
        document.createElement("div");

    messageElement.className =
        `chat-message ${messageType}`;

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAutomatedReply(customerMessage) {
    const message = customerMessage.toLowerCase();

    if (
        message.includes("delivery") ||
        message.includes("shipping")
    ) {
        return "Standard delivery normally takes 3–5 business days.";
    }

    if (
        message.includes("return") ||
        message.includes("refund")
    ) {
        return "Please keep your receipt and contact our support team for return assistance.";
    }

    if (
        message.includes("open") ||
        message.includes("hours")
    ) {
        return "Our online store is available 24 hours a day.";
    }

    if (
        message.includes("product") ||
        message.includes("stock")
    ) {
        return "Please provide the product name and our team will check its availability.";
    }

    return "Thank you for your message. A support team member will respond shortly.";
}

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const customerMessage = chatInput.value.trim();

    if (!customerMessage) {
        return;
    }

    addChatMessage(customerMessage, "user-message");
    chatInput.value = "";

    window.setTimeout(() => {
        const reply =
            getAutomatedReply(customerMessage);

        addChatMessage(reply, "support-message");
    }, 700);
});