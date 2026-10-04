<?php
/**
 * Navbar Component for agri.my.id
 * Modern, responsive, local assets only
 */
?>
<!-- Top Notice Bar with Dayak Ethnic Strip -->
<div class="top-notice-bar d-none d-md-block">
  <div class="container d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center gap-3">
      <span><i class="bi bi-geo-alt-fill text-merah me-1"></i> Kota Palangka Raya, Kalimantan Tengah</span>
      <span class="text-secondary">|</span>
      <span><i class="bi bi-flag-fill text-kuning me-1"></i> Komitmen <strong>1.000 Website Kalimantan Tengah</strong></span>
    </div>
    <div class="d-flex align-items-center gap-3">
      <span><i class="bi bi-clock-history text-tosca-light me-1"></i> Pengalaman Sejak <strong>2018</strong></span>
      <span class="text-secondary">|</span>
      <a href="https://wa.me/6285249441182?text=Halo%20Mas%20Agri%20Apriliando,%20saya%20ingin%20berkonsultasi" target="_blank" class="fw-bold">
        <i class="bi bi-whatsapp text-success me-1"></i> 085249441182
      </a>
    </div>
  </div>
</div>

<!-- Dayak Decorative Top Line -->
<div class="dayak-ribbon"></div>

<!-- Main Sticky Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
  <div class="container">
    <!-- Brand Logo with Talawang Shield -->
    <a class="navbar-brand-logo" href="#hero">
      <div class="navbar-brand-icon">
        <img src="assets/ornaments/talawang-shield.svg" alt="Talawang Dayak" width="22" height="28">
      </div>
      <div class="d-flex flex-column">
        <span class="font-heading fs-5 fw-bold text-white lh-1">agri<span class="text-kuning">.my.id</span></span>
        <span class="text-tosca-light" style="font-size: 0.72rem; letter-spacing: 0.05em;">Agri Apriliando • Web Developer</span>
      </div>
    </a>

    <!-- Mobile Toggle Button -->
    <button class="navbar-toggler border-0 shadow-none text-kuning" type="button" data-bs-toggle="collapse" data-bs-target="#portfolioNav" aria-controls="portfolioNav" aria-expanded="false" aria-label="Toggle navigation">
      <i class="bi bi-list fs-1"></i>
    </button>

    <!-- Navigation Menu Items -->
    <div class="collapse navbar-collapse" id="portfolioNav">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-1">
        <li class="nav-item">
          <a class="nav-link active" href="#hero">Beranda</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#about">Tentang</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#portfolio">Portofolio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#services">Layanan</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#audio-service">
            <i class="bi bi-music-note-beamed text-kuning"></i> Sound & Pianis
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#faq">FAQ</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#contact">Kontak</a>
        </li>
        <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
          <a href="https://wa.me/6285249441182?text=Halo%20Mas%20Agri%20Apriliando,%20saya%20ingin%20konsultasi%20pembuatan/pemeliharaan%20website" target="_blank" class="btn-cta-kuning py-2 px-3 fs-6">
            <i class="bi bi-whatsapp"></i>
            <span>Konsultasi Gratis</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
