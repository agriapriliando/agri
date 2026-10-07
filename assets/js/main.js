/**
 * Main JavaScript for agri.my.id
 * Integrates Alpine.js and lightweight interactive animations
 * 100% Local assets - Zero CDN dependencies
 */

// Define portfolioApp factory globally so Alpine can access it either via Alpine.data or window.portfolioApp
function portfolioApp() {
	return {
		activeTab: "all",
		copiedContact: false,
		copiedText: "",

		// WhatsApp Message Generator
		waForm: {
			name: "",
			organization: "",
			service: "Pembuatan Website Baru",
			notes: "",
		},

		// Copy to clipboard helper
		copyToClipboard(text, label) {
			if (navigator.clipboard) {
				navigator.clipboard.writeText(text).then(() => {
					this.copiedText = label || text;
					this.copiedContact = true;
					setTimeout(() => {
						this.copiedContact = false;
					}, 3000);
				});
			} else {
				// Fallback
				const el = document.createElement("textarea");
				el.value = text;
				document.body.appendChild(el);
				el.select();
				document.execCommand("copy");
				document.body.removeChild(el);
				this.copiedText = label || text;
				this.copiedContact = true;
				setTimeout(() => {
					this.copiedContact = false;
				}, 3000);
			}
		},

		// Quick WhatsApp message sender
		sendWaMessage() {
			let msg = `Halo Agri Apriliando,\n\n`;
			msg += `Perkenalkan saya ${this.waForm.name || "Rekan"}`;
			if (this.waForm.organization) {
				msg += ` dari ${this.waForm.organization}`;
			}
			msg += `.\nSaya ingin mendiskusikan tentang: *${this.waForm.service}*.\n`;
			if (this.waForm.notes) {
				msg += `Detail kebutuhan: ${this.waForm.notes}\n`;
			}
			msg += `\nMohon info dan kesediaannya untuk berdiskusi. Terima kasih!`;

			const url = `https://wa.me/6285249441182?text=${encodeURIComponent(msg)}`;
			window.open(url, "_blank");
		},
	};
}

// Bind to window object for global fallback access
window.portfolioApp = portfolioApp;

// Register to Alpine when ready
if (window.Alpine) {
	window.Alpine.data("portfolioApp", portfolioApp);
} else {
	document.addEventListener("alpine:init", () => {
		window.Alpine.data("portfolioApp", portfolioApp);
	});
}

// Scroll Event Listeners (Back to Top & Scroll Spy)
document.addEventListener("DOMContentLoaded", () => {
	const backToTopBtn = document.getElementById("backToTopBtn");
	const navbar = document.querySelector(".navbar-custom");

	window.addEventListener("scroll", () => {
		// Back to top visibility
		if (window.scrollY > 400) {
			if (backToTopBtn) backToTopBtn.classList.add("show");
		} else {
			if (backToTopBtn) backToTopBtn.classList.remove("show");
		}

		// Navbar shadow on scroll
		if (window.scrollY > 50) {
			if (navbar) navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.4)";
		} else {
			if (navbar) navbar.style.boxShadow = "none";
		}
	});

	// Animated Counter on Scroll into view
	const counters = document.querySelectorAll(".counter-anim");
	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const target = entry.target;
						const endValue = parseInt(target.getAttribute("data-target"), 10);
						const suffix = target.getAttribute("data-suffix") || "";
						let startValue = 0;
						const duration = 1800;
						const startTime = performance.now();

						const updateCounter = (now) => {
							const progress = Math.min((now - startTime) / duration, 1);
							const current = Math.floor(progress * endValue);
							target.textContent = current.toLocaleString("id-ID") + suffix;
							if (progress < 1) {
								requestAnimationFrame(updateCounter);
							} else {
								target.textContent = endValue.toLocaleString("id-ID") + suffix;
							}
						};

						requestAnimationFrame(updateCounter);
						obs.unobserve(target);
					}
				});
			},
			{ threshold: 0.5 },
		);

		counters.forEach((counter) => observer.observe(counter));
	} else {
		counters.forEach((counter) => {
			const endValue = counter.getAttribute("data-target");
			const suffix = counter.getAttribute("data-suffix") || "";
			counter.textContent = endValue + suffix;
		});
	}

	// Floating Share Bar (WhatsApp & Salin Link)
	const shareWaBtn = document.getElementById("floatingShareWaBtn");
	const copyBtn = document.getElementById("floatingCopyLinkBtn");
	const copyText = document.getElementById("floatingCopyText");
	const copyIcon = document.getElementById("floatingCopyIcon");
	const shareToast = document.getElementById("floatingShareToast");

	if (shareWaBtn) {
		const currentUrl = window.location.href || "https://agri.my.id/";
		const shareText = `Lihat portofolio & layanan website Agri Apriliando - Programmer Palangka Raya: ${currentUrl}`;
		shareWaBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
	}

	if (copyBtn) {
		let copyTimeout = null;

		function fallbackCopy(text, callback) {
			try {
				const el = document.createElement("textarea");
				el.value = text;
				el.setAttribute("readonly", "");
				el.style.position = "absolute";
				el.style.left = "-9999px";
				document.body.appendChild(el);
				el.select();
				document.execCommand("copy");
				document.body.removeChild(el);
				if (typeof callback === "function") callback();
			} catch (err) {
				console.error("Gagal menyalin link:", err);
			}
		}

		function onCopySuccess() {
			copyBtn.classList.add("copied");
			if (copyIcon) copyIcon.className = "bi bi-check2";
			if (copyText) copyText.textContent = "Disalin!";
			if (shareToast) shareToast.classList.add("show");

			if (copyTimeout) clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => {
				copyBtn.classList.remove("copied");
				if (copyIcon) copyIcon.className = "bi bi-link-45deg";
				if (copyText) copyText.textContent = "Salin Link";
				if (shareToast) shareToast.classList.remove("show");
			}, 2500);
		}

		copyBtn.addEventListener("click", () => {
			const urlToCopy = window.location.href || "https://agri.my.id/";

			if (navigator.clipboard && window.isSecureContext) {
				navigator.clipboard
					.writeText(urlToCopy)
					.then(onCopySuccess)
					.catch(() => {
						fallbackCopy(urlToCopy, onCopySuccess);
					});
			} else {
				fallbackCopy(urlToCopy, onCopySuccess);
			}
		});
	}
});
