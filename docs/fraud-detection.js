"use strict";

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginMessage = document.getElementById("loginMessage");
const securityMessage = document.getElementById("securityMessage");

const MAX_FAILED_ATTEMPTS = 3;
const LOCK_TIME_MS = 30000;

function getSecurityData() {
    const savedData = localStorage.getItem("loginSecurityData");

    if (!savedData) {
        return {
            failedAttempts: 0,
            lockUntil: 0
        };
    }

    try {
        return JSON.parse(savedData);
    } catch (error) {
        return {
            failedAttempts: 0,
            lockUntil: 0
        };
    }
}

function saveSecurityData(data) {
    localStorage.setItem(
        "loginSecurityData",
        JSON.stringify(data)
    );
}

function calculateRiskScore(email, password, failedAttempts) {
    let riskScore = 0;
    const reasons = [];

    if (failedAttempts >= 2) {
        riskScore += 40;
        reasons.push("multiple failed login attempts");
    }

    if (password.length < 8) {
        riskScore += 25;
        reasons.push("weak password");
    }

    if (!email.includes("@")) {
        riskScore += 20;
        reasons.push("invalid email format");
    }

    const currentHour = new Date().getHours();

    if (currentHour >= 1 && currentHour <= 4) {
        riskScore += 15;
        reasons.push("unusual login time");
    }

    return {
        riskScore,
        reasons
    };
}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const currentTime = Date.now();
    const securityData = getSecurityData();

    if (securityData.lockUntil > currentTime) {
        const secondsRemaining = Math.ceil(
            (securityData.lockUntil - currentTime) / 1000
        );

        loginMessage.textContent = "";

        securityMessage.textContent =
            `Security alert: Login is locked. Try again in ${secondsRemaining} seconds.`;

        securityMessage.className = "security-warning";
        return;
    }

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    const risk = calculateRiskScore(
        email,
        password,
        securityData.failedAttempts
    );

    const demoEmail = "customer@example.com";
    const demoPassword = "Secure123";

    const validLogin =
        email === demoEmail &&
        password === demoPassword;

    if (risk.riskScore >= 50) {
        loginMessage.textContent = "";

        securityMessage.textContent =
            `High-risk activity detected: ${risk.reasons.join(", ")}. Additional verification is required.`;

        securityMessage.className = "security-warning";
        return;
    }

    if (validLogin) {
        loginMessage.textContent = "Login successful.";
        loginMessage.className = "login-success";

        securityMessage.textContent =
            "Security check completed. No suspicious activity detected.";

        securityMessage.className = "security-safe";

        saveSecurityData({
            failedAttempts: 0,
            lockUntil: 0
        });

        return;
    }

    securityData.failedAttempts += 1;

    loginMessage.textContent = "Login unsuccessful.";
    loginMessage.className = "login-error";

    if (securityData.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        securityData.lockUntil =
            currentTime + LOCK_TIME_MS;

        securityMessage.textContent =
            "Suspicious activity detected. Login has been locked for 30 seconds.";

        securityMessage.className = "security-warning";
    } else {
        securityMessage.textContent =
            `Invalid login attempt ${securityData.failedAttempts} of ${MAX_FAILED_ATTEMPTS}.`;

        securityMessage.className = "security-warning";
    }

    saveSecurityData(securityData);
});