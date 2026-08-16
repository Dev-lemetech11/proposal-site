// logger.js
// Reusable audit-log writer. Import { logEvent } from "./logger.js" on any page.

import { db } from "./firebase-init.js";
import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Gives each visitor a stable id (stored in localStorage) so their events
// can be grouped together in the log without needing a login system.
function getSessionId() {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        sessionId = "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
        localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
}

/**
 * Writes one event to the "auditLog" Firestore collection.
 *
 * @param {string} eventType - short label, e.g. "page_view", "name_entered", "no_button_click"
 * @param {object} [details] - any extra data you want attached to the event
 * @returns {Promise<void>}
 */
export async function logEvent(eventType, details = {}) {
    try {
        await addDoc(collection(db, "auditLog"), {
            eventType,
            details,
            name: localStorage.getItem("userName") || null,
            sessionId: getSessionId(),
            page: window.location.pathname.split("/").pop() || "index",
            userAgent: navigator.userAgent,
            timestamp: serverTimestamp()
        });
    } catch (err) {
        // Never let a logging failure break the page the visitor is on.
        console.error("logEvent failed:", err);
    }
}