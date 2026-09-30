/**
 * Main JavaScript for agri.my.id
 * Integrates Alpine.js and lightweight interactive animations
 * 100% Local assets - Zero CDN dependencies
 */

document.addEventListener("alpine:init", () => {
	// Alpine.js store for global state & interactive forms
	Alpine.data("portfolioApp", () => ({
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

		// Project Estimator state
		estimator: {
			category: "sekolah_kampus",
			urgency: "standar",
			hasDomainHosting: "belum",
			getEstimatedTimeline() {
				if (this.category === "pemeliharaan") return "1 - 3 Hari Kerja";
				if (this.category === "sound_pianis")
					return "Sesuai Jadwal Ibadah / Acara";
				if (this.category === "sistem_kustom") return "3 - 6 Minggu";
				return "2 - 4 Minggu";
			},
			getRecommendation() {
				switch (this.category) {
					case "sekolah_kampus":
						return "Website Profil Modern + Modul PPDB + Portal Informasi Terintegrasi";
					case "instansi":
						return "Portal Resmi Instansi + Publikasi Berita + Keamanan Tingkat Lanjut";
					case "gereja_sosial":
						return "Aplikasi Pelayanan Jemaat (Integrasi jemaatku.com) + Warta Digital & Transparansi";
					case "sistem_kustom":
						return "Sistem Informasi Berbasis Laravel & Livewire sesuai kebutuhan spesifik";
					case "pemeliharaan":
						return "Audit Keamanan, Optimasi Kecepatan, Backup & Maintenance Berkala";
					case "sound_pianis":
						return "Rental Sound System Profesional & Pelayanan Pianis Berpengalaman";
					default:
						return "Konsultasi Kustom dengan Agri Apriliando";
				}
			},
			getWaLink() {
				const text =
					`Halo Agri Apriliando (agri.my.id),\nSaya ingin konsultasi estimasi proyek:\n` +
					`• Layanan: ${this.getRecommendation()}\n` +
					`• Estimasi Waktu: ${this.getEstimatedTimeline()}\n` +
					`• Kesiapan Domain/Hosting: ${this.hasDomainHosting === "sudah" ? "Sudah ada" : "Belum ada (butuh panduan)"}\n\n` +
					`Bisa diskusikan lebih lanjut Mas? Terima kasih.`;
				return `https://wa.me/6285249441182?text=${encodeURIComponent(text)}`;
			},
		},

		// Interactive Audio Simulation for Pianist / Sound System
		audioPlayer: {
			isPlaying: false,
			currentTrack: "Iringan Pianis Ibadah Palangka Raya",
			togglePlay() {
				this.isPlaying = !this.isPlaying;
			},
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
	}));
});

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
});
